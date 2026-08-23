# Glossary

Mordhau's community vocabulary, plus the server and modding terms that turn up across this site. If you have read something here or in Discord and had no idea what it meant, start here.

Combat terms are explained properly in [Combat Mechanics](/en/combat-mechanics/) — these are the short versions.

## Combat

**Accel** — Turning into a swing so it connects earlier than the animation suggests, beating the parry.

**Ballerina** — Someone spinning wildly mid-swing to disguise when the hit lands. Effective, widely disliked.

**Chamber** — Meeting an incoming attack with your own along the same angle, deflecting it and continuing into a strike.

**Drag** — Turning away from a swing so it lands as late as possible, after the parry has expired.

**Feint** — Cancelling an attack during windup so the opponent parries nothing.

**Flinch** — Being interrupted mid-attack by taking a hit.

**Footwork** — Managing distance with movement rather than with your weapon. Underrated by almost everyone.

**Hyper armour** — Frames during which you cannot be flinched. Ripostes have it.

**Kick** — Breaks a held parry. Slow, and punished if it whiffs.

**Morph** — Turning a strike into a stab mid-windup, or the reverse.

**Overhead** — An attack that comes down from above.

**Parry** — The block. Right click, short window, costs stamina.

**Recovery** — The phase after an attack where you are stuck and vulnerable.

**Release** — The phase where a weapon can actually damage someone.

**Riposte** — The fast attack you get after a successful parry. Cannot be feinted or morphed.

**Stab** — A thrust. Narrow, quick, fits through gaps.

**Stamina** — The resource behind parries, feints, morphs and misses. Hit zero and you are disarmed.

**Strike** — A horizontal swing.

**Turtle** — Someone who sits behind their parry and never attacks. Kick them.

**Whiff** — A missed attack. Costs stamina and leaves you in recovery.

**Windup** — The phase where the weapon is drawing back, before it can hurt anyone.

## Game modes

**BR** — Battle Royale.

**FFA** — Free for all. Everyone against everyone.

**Frontline** — Objective mode with pushing capture points and respawn waves.

**Horde** — Co-operative, waves of AI.

**Invasion** — Attackers work through a sequence of objectives against defenders.

**Skirmish (SKM)** — Round-based team mode with no respawns.

**TDM** — Team deathmatch.

Server map names combine the mode prefix with the map, so `FFA_Grad` is Grad in free for all and `TDM_Camp` is Camp in team deathmatch.

## Equipment

**Loadout** — A character build. You spend a fixed point budget across weapons, armour and perks.

**Perks** — Passive traits bought out of the same budget as your gear. More perks means less armour.

**Points** — The budget a loadout is built from. Everything competes for the same pool.

**Toolbox** — Lets you build spikes and repair objects. Common on Frontline.

## Servers

**Beacon port** — UDP 15000 by default. How the server browser reaches your server. Block it and your server runs fine and is invisible.

**Game port** — UDP 7777 by default. Actual gameplay traffic.

**Query port** — UDP 27015 by default. How the browser reads your player count and server name.

**Game.ini** — The main server config file, under `Saved/Config/WindowsServer/` or `Saved/Config/LinuxServer/`.

**Engine.ini** — Engine-level settings, notably tick rate.

**MaxSlots** — Player capacity.

**Map rotation** — The list of maps the server cycles through, one `MapRotation` line each.

**Playfab ID** — The player identifier Mordhau uses for admin commands. Not a Steam ID. Get them with `playerlist`.

**RCON** — Remote console. Send commands to the server over the network without being in the game. See the [RCON guide](/en/rcon-guide/).

**SteamCMD** — Valve's command line tool. How you download and update the server files.

**Tick rate** — How often the server updates the world, in Hz. Higher is smoother and costs more CPU.

**App 629800** — The dedicated server on Steam. The game itself is 629760, and confusing the two is the classic first mistake.

## Modding

**mod.io** — The platform Mordhau uses to distribute mods.

**Mordhau Editor** — The official map and mod creation tool, a build of Unreal Engine. See the [SDK guide](/en/mordhauSDK-guide/).

**SDK** — Software development kit. In Mordhau conversation it usually means the Editor.

**UE4** — Unreal Engine 4, what Mordhau is built on.

## Community

**Triternion** — The studio that makes Mordhau.

**Duel server** — A server set up for one-on-one fights, usually with etiquette rules about not interrupting.

**Rank 200** — The level cap. Signals hours played rather than skill, though the two correlate.

::: tip
Something missing? This page is a good first contribution — one file, one entry, and no way to break the build. See [contribution methods](/en/contributing/methods).
:::
