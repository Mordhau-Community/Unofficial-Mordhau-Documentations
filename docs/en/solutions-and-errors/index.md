# Solutions and Errors

Things that commonly go wrong, and what usually fixes them. Server problems first, since that is where most of the questions come from.

::: tip
Before anything else, read the log. Most of the time it says exactly what is wrong.

- **Server:** `Mordhau/Saved/Logs/` in your server install
- **Client (Windows):** `%LOCALAPPDATA%\Mordhau\Saved\Logs\`

Start the server with `-log` and it prints to the console as it goes, which is far easier than reading a file after the fact.
:::

## Server problems

### The server does not appear in the browser

By far the most common one, and it is almost always the **beacon or query port**.

The game port getting through is not enough. All three UDP ports have to be open and forwarded:

| Port | Protocol | Consequence if blocked |
| --- | --- | --- |
| 7777 | UDP | Nobody can connect |
| 15000 | UDP | Server does not appear in the browser |
| 27015 | UDP | Server does not appear, or appears with no information |

Work through it in this order:

1. Is the server actually running? Check the console output.
2. Is the firewall on the machine itself allowing it? Windows Firewall blocks the server on first launch and the prompt is easy to dismiss without reading.
3. Are all three ports forwarded on the router, as **UDP**, to the right internal IP?
4. Did the machine's local IP change? DHCP reassigns addresses and the forwarding rules then point at nothing. Give the server a static local IP or a DHCP reservation.

If it works on your own network but not from outside, and the forwarding is definitely right, your ISP may have you behind CGNAT. You cannot host through that, and no amount of configuration will change it — you need a VPS.

### Config changes do nothing

You edited `Game.ini` while the server was running.

Mordhau keeps its configuration in memory and writes it back out on shutdown, overwriting your file with what it had loaded at startup. Stop the server, edit, then start it.

### The server closes immediately after starting

Read the log. Usually one of:

- **Port already in use.** Another server, or a previous instance that did not exit. Check for a stray process, or move to different ports.
- **Missing files.** Re-run the SteamCMD command with `validate` on the end.
- **Malformed `Game.ini`.** A typo in a section header, or a value where a number was expected.

### Nobody can connect, but the server is listed

The game port, 7777 UDP. Same checks as above.

If it is listed and connections start but drop immediately, check whether `ServerPassword` is set to something you have forgotten about.

### Admin commands are rejected

Type `adminlogin` and the password from `AdminPassword` first. Nothing else works before that.

If it still refuses, you edited the password while the server was running and it got overwritten. See above.

### RCON will not connect

**Connection refused** — RCON is not listening. `RconPort` needs to be set in `Game.ini` and the server restarted.

**Connection times out** — firewall. Note the RCON port is **TCP**, unlike the other three, so a rule that covers the game ports will not cover it.

**Authentication failed** — wrong password. If you left `RconPassword` blank the server generated a random one at startup that you have no way of knowing. Set it explicitly and restart.

More detail on the [RCON page](/en/rcon-guide/).

### The server is running an old build

Mordhau clients cannot join a server on a different version. After a patch, re-run:

```bash
./steamcmd.sh +force_install_dir ~/mordhau-server +login anonymous +app_update 629800 validate +quit
```

`+force_install_dir` has to come before `+login` or SteamCMD ignores it and updates the wrong folder.

### Performance is bad with a full server

Check `NetServerMaxTickRate` in `Engine.ini`. If it is set higher than the hardware can sustain, the server falls behind and everyone gets rubber-banding — a stable 60 feels much better than an unstable 120.

Mordhau is largely single-thread bound, so single-core clock speed matters more than core count. A cheap VPS with many slow cores is a poor fit.

## Client problems

::: info
This section is thinner than the server one, because most of us here run servers rather than support clients. If you have fixed something that is not listed, [add it](/en/contributing/methods).
:::

### The game will not start

1. Verify the game files through Steam — right click Mordhau, Properties, Installed Files, Verify integrity.
2. Update your graphics drivers.
3. Reboot. Genuinely, for anti-cheat problems this fixes it more often than it should.

### Anti-cheat errors

Mordhau uses Easy Anti-Cheat, and most launch failures trace back to it.

- Run the EAC installer in the game folder again.
- Try launching Steam as administrator.
- Check that your antivirus has not quarantined the game or EAC. Security software mistaking anti-cheat for malware is common, because they behave similarly.

### Disconnected during a match

- If it is one specific server, it is that server, not you.
- If it is every server, test your connection generally. Wi-Fi is a frequent culprit — try a cable if you can.
- Packet loss shows up as rubber-banding and hits that do not register before it shows up as a disconnect.

### Poor frame rate

Lower shadows and view distance first, they cost the most for the least visual difference. Frontline with a full server is the worst case in the game — if it only stutters there, that is the load, not a fault.

## Still stuck

Bring it to the [Discord](https://discord.gg/zuX58yRV84). To get a useful answer quickly, include:

- What you were doing and what happened
- Your platform, and whether it is a client or server problem
- The relevant part of the log, not a screenshot of it
- What you have already tried

If you work out the fix, come back and add it here. Nearly everything on this page is here because it happened to someone and they wrote it down.
