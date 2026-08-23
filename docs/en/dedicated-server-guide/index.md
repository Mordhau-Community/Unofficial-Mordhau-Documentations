# Dedicated Server Hosting Guide

Below you will find how to host a Mordhau dedicated server on Windows and on Linux.

Much of this assumes you are hosting the server yourself, either on a machine on your home network or on a VPS or dedicated box you rent. If you would rather not manage any of it, there is a list of [dedicated game server providers](/en/dedicated-server-guide/dedicated-game-server-providers) who will set one up for you and give you a control panel instead.

While this guide tries to be as complete as we can make it, the Mordhau Server Owner's Discord is still the best place to get help with a problem specific to your setup.

## Before you start

You will need:

- A machine that stays on. A server that goes offline when you close the game is not much use to anyone.
- **SteamCMD**, Valve's command line tool for downloading server files.
- The ability to forward ports on your router, if you are hosting from home.

You do **not** need to own Mordhau on the account you use. The dedicated server is a separate free download and installs through an anonymous Steam login.

::: tip
The server binary is Steam app **629800**. That is different from the game itself, which is 629760. Downloading the wrong one is the most common mistake people make here.
:::

## Installing SteamCMD

::: code-group

```powershell [Windows]
# Download steamcmd.zip from
# https://steamcdn-a.akamaihd.net/client/installer/steamcmd.zip
# and extract it somewhere sensible, for example C:\steamcmd
```

```bash [Linux]
sudo apt update
sudo apt install lib32gcc-s1
mkdir -p ~/steamcmd && cd ~/steamcmd
curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -
```

:::

::: warning
SteamCMD is a 32-bit program. On a 64-bit Linux install it will not start until the 32-bit support libraries are present, which is what `lib32gcc-s1` is for. On older distributions that package is called `lib32gcc1`.
:::

## Downloading the server

::: code-group

```powershell [Windows]
.\steamcmd.exe +force_install_dir C:\mordhau-server +login anonymous +app_update 629800 validate +quit
```

```bash [Linux]
./steamcmd.sh +force_install_dir ~/mordhau-server +login anonymous +app_update 629800 validate +quit
```

:::

It is a few gigabytes, so give it time. Run the exact same command again whenever you want to update the server after a patch.

::: warning
Put `+force_install_dir` **before** `+login`. SteamCMD processes arguments in order, and if the login comes first it ignores your install directory and downloads into its own folder instead.
:::

## First launch

Start the server once with no arguments. It will not be playable yet — the point is that it writes out its config files, and then you stop it.

::: code-group

```powershell [Windows]
cd C:\mordhau-server
.\MordhauServer.exe
```

```bash [Linux]
cd ~/mordhau-server
./MordhauServer.sh
```

:::

Let it finish starting, then shut it down.

## Configuration

The config files now exist at:

| Platform | Path |
| --- | --- |
| Windows | `Mordhau\Saved\Config\WindowsServer\` |
| Linux | `Mordhau/Saved/Config/LinuxServer/` |

The one you care about is `Game.ini`.

::: danger
Only edit these files while the server is stopped. Mordhau holds its configuration in memory and writes it back out on shutdown, so anything you change while it is running is overwritten the moment you close it.
:::

### Game.ini

```ini
[/Script/Mordhau.MordhauGameSession]
ServerName=My Mordhau Server
MaxSlots=32
ServerPassword=
AdminPassword=changethis
BannedPlayers=()

[/Script/Mordhau.MordhauGameMode]
PlayerRespawnTime=5.000000
BallistaRespawnTime=30.000000
CatapultRespawnTime=30.000000
HorseRespawnTime=30.000000
DamageFactor=1.000000
TeamDamageFactor=0.500000
MapRotation=FFA_ThePit
MapRotation=TDM_Camp
MapRotation=SKM_Grad
```

**`[/Script/Mordhau.MordhauGameSession]`**

| Key | What it does |
| --- | --- |
| `ServerName` | The name shown in the in-game browser |
| `MaxSlots` | Player capacity |
| `ServerPassword` | Leave empty for a public server |
| `AdminPassword` | What admins type with `adminlogin` in the console |
| `Admins` | One Playfab ID. Repeat the line once per admin |
| `BannedPlayers` | Managed by the `ban` command, you rarely edit this by hand |

**`[/Script/Mordhau.MordhauGameMode]`**

Respawn times are in seconds. `DamageFactor` scales all damage, where `1.0` is normal and `2.0` doubles it. `TeamDamageFactor` scales friendly fire separately, so the default `0.5` means teammates take half damage from each other.

### Map rotation

Add one `MapRotation` line per map. The order is the order they are played in, and the list also controls what shows up in the in-game map vote.

Map names are the mode prefix plus the map name:

| Prefix | Mode |
| --- | --- |
| `FFA_` | Free for all |
| `TDM_` | Team deathmatch |
| `SKM_` | Skirmish |

The stock maps are `ThePit`, `Camp`, `Grad`, `Contraband`, `Tourney`, `MountainPeak` and `Taiga`, which gives you names like `FFA_Grad` or `TDM_MountainPeak`.

### Engine.ini

Optional. The setting most owners end up touching is the tick rate:

```ini
[/Script/OnlineSubsystemUtils.IpNetDriver]
NetServerMaxTickRate=60
```

Higher is smoother and costs more CPU. Do not raise it unless you know the machine can keep up — a server that cannot hold its tick rate feels considerably worse than a lower one that is stable.

## Starting the server properly

Now start it with a map and the ports:

::: code-group

```powershell [Windows]
.\MordhauServer.exe Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

```bash [Linux]
./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

:::

Put that in a `.bat` file on Windows or a shell script on Linux so you are not retyping it every time.

| Parameter | Purpose |
| --- | --- |
| `-Port` | Game traffic |
| `-BeaconPort` | How the server browser reaches your server |
| `-QueryPort` | Steam query, how the browser reads your player count |
| `-MultiHome` | Bind to one specific local IP, if the machine has several |
| `-RconPort` | RCON listener, see the [RCON guide](/en/rcon-guide/) |
| `-log` | Print to the console rather than only to a file |

On Linux, run it under `screen` or `tmux` — or better, write a systemd unit — so it survives you closing the SSH session:

```bash
screen -dmS mordhau ./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

## Ports

| Port | Protocol | What for |
| --- | --- | --- |
| 7777 | UDP | Game |
| 15000 | UDP | Beacon |
| 27015 | UDP | Steam query |
| your RCON port | TCP | Remote console, only if you enable it |

All three UDP ports have to be open and forwarded, not just the game port. If the beacon or query port is blocked, your server runs perfectly well and simply never appears in the browser — which is the single most common thing people ask about.

Running more than one server on the same machine? Give each its own set, spaced apart:

```bash
-Port=7779 -BeaconPort=15002 -QueryPort=27018
```

## Checking it worked

Look for your server name in the in-game browser. If it is not there, work through this in order:

**Nothing in the browser at all.** Almost always the beacon or query port. Check your forwarding rules, and check the firewall on the machine itself — Windows Firewall blocks the server on first run and the prompt is easy to click past.

**Visible, but nobody can connect.** The game port. Same checks, port 7777.

**Fine on the local network, invisible outside.** Your router is not forwarding, or your ISP has you behind CGNAT — in which case you cannot host from that connection at all and will need a VPS.

**Config changes did nothing.** You edited the file while the server was running. Stop it, edit, start.

**Server starts and immediately closes.** Read the log in `Mordhau/Saved/Logs/`. A port already in use is the usual cause.

## Next steps

- Set up [RCON](/en/rcon-guide/) so you can moderate the server without being in the game
- Have a look at the [providers list](/en/dedicated-server-guide/dedicated-game-server-providers) if managing this yourself turns out not to be your idea of fun
