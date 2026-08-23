# RCON Guide

RCON stands for *remote console*. It lets you send commands to your Mordhau server over the network, from outside the game — so you can change the map, kick someone, or check who is on, without launching Mordhau and joining first.

If you run a server, this is the tool you will end up using most.

::: info
This page assumes you already have a server running. If you do not, start with the [dedicated server guide](/en/dedicated-server-guide/).
:::

## Admin commands vs RCON

Both let you run the same commands, but they are reached differently.

**In-game admin commands** are typed into the console while you are playing. You authenticate with `adminlogin` and the admin password from `Game.ini`. Convenient when you are already in the server.

**RCON** connects over TCP from any RCON client. No game needed, and it keeps working when the server is full or when something has gone wrong enough that you cannot join.

The command list is the same either way.

## Turning RCON on

RCON is configured in `Game.ini`, in the same section as your other server settings:

| Platform | Path |
| --- | --- |
| Windows | `Mordhau\Saved\Config\WindowsServer\Game.ini` |
| Linux | `Mordhau/Saved/Config/LinuxServer/Game.ini` |

Add these two keys:

```ini
[/Script/Mordhau.MordhauGameSession]
ServerName=My Mordhau Server
MaxSlots=32
AdminPassword=changethis
RconPassword=a-different-long-password
RconPort=7778
```

::: danger
Stop the server before you edit `Game.ini`. It rewrites the file from memory on shutdown, so edits made while it is running are thrown away.
:::

::: warning
If you leave `RconPassword` empty the server generates a random one at startup, which means you will not know it. Set it yourself.

Do not reuse your `AdminPassword` here, and do not use anything short. RCON is an unencrypted protocol — anyone who has the password and can reach the port has full control of your server.
:::

Restart the server. You can also override the port on the command line if you prefer:

```bash
./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -RconPort=7778 -log
```

## Opening the port

The RCON port is **TCP**, unlike the game, beacon and query ports which are all UDP. A firewall rule that covers the other three will not cover this one.

Only forward it if you actually need to reach RCON from outside the machine. If you administer the server over SSH anyway, leave the port closed to the internet and connect to `127.0.0.1` from on the box — that is strictly safer, and costs you nothing.

## Connecting

Any client that speaks the Source RCON protocol works. [`mcrcon`](https://github.com/Tiiffi/mcrcon) is small, has no dependencies and runs on both Windows and Linux:

```bash
mcrcon -H 127.0.0.1 -P 7778 -p your-rcon-password
```

That drops you into an interactive prompt. To fire a single command and exit:

```bash
mcrcon -H 127.0.0.1 -P 7778 -p your-rcon-password "playerlist"
```

Graphical clients exist too if you would rather have a window than a terminal — most of the general purpose Source RCON tools work fine against Mordhau.

## Commands

Player identifiers are **Playfab IDs**, not Steam IDs. Get them with `playerlist`.

### Players

| Command | What it does |
| --- | --- |
| `playerlist` | Everyone on the server, with their IDs |
| `kick <name or PlayfabID> <reason>` | Removes a player, they can rejoin |
| `ban <name or PlayfabID> <minutes> <reason>` | Bans for a duration in minutes |
| `unban <name or PlayfabID>` | Lifts a ban |
| `banlist` | Everyone currently banned |
| `mute <name or PlayfabID> <minutes>` | Mutes voice and text |
| `cancelvotekick` | Stops a votekick in progress |

### Admins

| Command | What it does |
| --- | --- |
| `adminlogin` | Authenticate in-game before using any other command |
| `adminlist` | Current admins |
| `adminadd <PlayfabID>` | Grants admin |
| `removeadmin <PlayfabID>` | Revokes admin |

### The match

| Command | What it does |
| --- | --- |
| `changelevel <map name>` | Switches map, for example `changelevel FFA_Grad` |
| `restartlevel` | Restarts the current map |
| `addbots <number>` | Adds bots |
| `addbots team <number> <0 or 1>` | Adds bots to a team, 0 is red and 1 is blue |
| `removebots <number>` | Removes bots |
| `slomo <value>` | Changes game speed, `0.5` is half and `2` is double |

::: tip
`slomo` affects everyone on the server. It is entertaining exactly once, and then people leave.
:::

## Everyday things

**Find someone's ID before you act on them**

```
playerlist
```

**Ban for a day**

```
ban 1A2B3C4D5E6F7890 1440 Griefing
```

Durations are minutes, so an hour is `60`, a day is `1440`, a week is `10080`.

**Rotate the map early**

```
changelevel TDM_Camp
```

**Fill a quiet server**

```
addbots 8
```

## When it will not connect

**Connection refused.** RCON is not listening. Check `RconPort` is set in `Game.ini`, and that you restarted the server after editing it — with `-log` you will see RCON start up in the console output.

**Connection times out.** A firewall is eating it. Remember the port is TCP.

**Authentication failed.** Wrong password. If you left `RconPassword` blank the server invented one at startup, so set it explicitly and restart.

**Commands run but nothing happens.** Check the syntax and the argument order. `ban` in particular wants the duration before the reason, and getting them the wrong way round fails quietly.

**Your edits keep disappearing.** The server was running when you saved. Stop it first.

## Security

Worth repeating, because people get this wrong and lose servers over it:

- RCON is unencrypted. The password crosses the network in a form that anyone on the path can read.
- Use a long, unique password. Not your admin password, not your Steam password.
- Do not expose the port publicly unless you have to. Localhost, or an SSH tunnel, or a firewall rule limited to your own IP.
- Change the password if you ever paste it into a Discord message, a support ticket, or a screenshot.
