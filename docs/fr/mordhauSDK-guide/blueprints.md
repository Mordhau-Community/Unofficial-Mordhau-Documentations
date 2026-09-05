# Blueprints {#blueprints}

Un **Blueprint** est le scripting visuel d'Unreal : une classe que vous construisez dans un graphe plutôt qu'en C++. Dans l'éditeur de Mordhau, vous en écrivez rarement un depuis zéro. Vous sous-classez quelque chose que le jeu fournit déjà et vous modifiez la partie qui vous intéresse.

C'est le modèle mental à avoir avant d'ouvrir quoi que ce soit :

- **Les classes C++** — écrites par Triternion, compilées dans le jeu. `MordhauGameMode`, `ControlPoint`, `MordhauPlayerStart`, `MordhauWeapon`. Vous ne pouvez pas les modifier.
- **Les assets Blueprint** — dans `/Game/Mordhau/Blueprints/…` du Content Browser, ce sont eux que les cartes et les modes officiels utilisent réellement. Nommés `BP_Quelquechose`.
- **Vos Blueprints** — des sous-classes des leurs, rangées dans votre propre dossier de mod. C'est tout ce que vous créez.

Garder votre travail dans votre propre dossier n'est pas qu'une question de rangement. Modifier les Blueprints du jeu sur place produit un mod qui entre en conflit avec tous les autres mods ayant fait pareil.

::: warning
Les chemins et noms de propriétés ci-dessous proviennent des classes du jeu, des outils communautaires et des fichiers de configuration serveur. Les patchs déplacent les choses. Vérifiez tout ce qui compte dans votre propre Content Browser, et [dites-le-nous](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) quand quelque chose a changé.
:::

## Le mode de jeu est le premier Blueprint que vous toucherez {#the-game-mode-is-the-first-blueprint-you-will-touch}

Chaque mode est une paire : un **GameMode** qui détient les règles et tourne sur le serveur, et un **GameState** qui porte ce que tous les clients doivent voir — le chronomètre, les scores, l'état des objectifs.

| Mode | Blueprints, sous `/Game/Mordhau/Blueprints/GameModes/` |
| --- | --- |
| Deathmatch | `BP_DeathmatchGameMode` + `BP_DeathmatchGameState` |
| Team Deathmatch | `BP_TeamDeathmatchGameMode` + `BP_TeamDeathmatchGameState` |
| Skirmish | `BP_SkirmishGameMode` + `BP_SkirmishGameState` |
| Frontline | `Battle/BP_FrontlineGameMode` |
| Horde | `Horde/BP_HordeGameMode` |

Les autres suivent le même nommage `BP_<Mode>GameMode` / `BP_<Mode>GameState` — allez voir le dossier plutôt que de deviner.

Ce sont les mêmes classes qu'un administrateur édite dans `Game.ini`, ce qui explique pourquoi `[/Game/Mordhau/Blueprints/GameModes/BP_DeathmatchGameMode.BP_DeathmatchGameMode_C]` vous semblera familier si vous avez lu le [guide du serveur dédié](/fr/dedicated-server-guide/). Les clés de configuration et les propriétés Blueprint sont les mêmes propriétés.

### Ce dont vous héritez de `MordhauGameMode` {#what-you-inherit-from-mordhaugamemode}

Quel que soit le mode que vous sous-classez, tout ceci vient avec. Ce sont les leviers que la plupart des modes personnalisés actionnent réellement :

| Propriété | Effet |
| --- | --- |
| `PlayerRespawnTime`, `bPlayersSpawnInWaves`, `bUsesSlowPlayerSpawning` | Cadence de réapparition, et si elle se fait par vagues |
| `SpawnProtectionDuration` | Fenêtre d'invulnérabilité après l'apparition |
| `DamageFactor`, `TeamDamageFactor`, `TeamDamageFlinch` | Mise à l'échelle globale des dégâts, tir allié compris |
| `bDisableDamage`, `bDisableStamina` | Couper les systèmes de combat — la base de la plupart des modes non combattants |
| `bPlayersDropAllGearOnDeath`, `bEquipmentDoesNotDespawn`, `OverrideEquipmentDespawnTime` | Comportement du butin |
| `KillScoreChange`, `KillTeamScoreChange`, `TeamKillScoreChange`, `AssistScoreFactor`, `bIsScoringDisabled` | Score |
| `AutoKickOnTeamKillAmount` | Sanction des tirs alliés |
| `HorseRespawnTime`, `CatapultRespawnTime`, `BallistaRespawnTime` | Réapparition des véhicules et engins de siège |
| `MapRotation`, `MapVoteMaps` | Ce qui vient après le match |

Et les fonctions et événements à connaître, parce que ce sont les points d'accroche des comportements personnalisés :

- `IsSpawnpointAllowed(PlayerStart, Controller)` et `GetSpawnpointPreference(PlayerStart, Controller)` — la sélection du point d'apparition, en tandem avec les événements de [`MordhauPlayerStart`](/fr/mordhauSDK-guide/actors#spawns-mordhauplayerstart)
- `OnAfterLogin`, `OnBeforeLogout` — arrivées et départs des joueurs
- `OnMessageBroadcasted`, `OnRconStringCommand` — chat et RCON, utiles si votre mode doit réagir à des commandes d'admin
- `GetNextMap`, `GetNextMaps`, `VoteLevel` — rotation et vote

## Sous-niveaux — un niveau par mode de jeu {#sublevels}

Une carte Mordhau n'est pas un seul niveau. C'est un **niveau de base** qui porte la géométrie, et un **sous-niveau par mode de jeu** qui porte les points d'apparition et les objectifs de ce mode. C'est le préfixe du nom du sous-niveau qui indique au jeu de quel mode il s'agit.

| Préfixe | Mode |
| --- | --- |
| `BR_` | Battle Royale |
| `FFA_` | Deathmatch |
| `FL_` | Frontline |
| `HRD_` | Horde |
| `INV_` | Invasion |
| `SG_` | Sword Game |
| `SKM_` | Skirmish |
| `TDM_` | Team Deathmatch |

Le déroulé du travail, dans l'éditeur :

1. Construisez la carte elle-même comme un niveau ordinaire — géométrie, éclairage, props.
2. Créez un niveau vide par mode, préfixe d'abord : `SKM_CabbageLand`.
3. Ouvrez-le, ouvrez la fenêtre **Levels**, et passez la méthode de streaming du niveau persistant sur **Always Loaded**. Elle revient à Blueprint-only à chaque nouveau sous-niveau, donc refaites-le à chaque fois.
4. **Add Existing** → votre carte de base, pour que le sous-niveau charge la géométrie en dessous.
5. Double-cliquez sur le niveau persistant pour qu'il repasse en bleu — le bleu est ce que vous éditez — et verrouillez le niveau de base pour ne pas l'éditer par accident.
6. Placez le mode de jeu, les points d'apparition et les objectifs de ce mode.

Ensuite, `changemap SKM_CabbageLand` le charge.

Cette structure est précisément la raison pour laquelle l'[avertissement sur le placement](/fr/mordhauSDK-guide/actors) compte autant : des objectifs déposés dans le niveau de base au lieu du sous-niveau apparaissent dans tous les modes à la fois.

::: tip
Pour des modes hors de cette liste de préfixes, le [MetaMod](https://mod.io/g/mordhau/m/metamod) communautaire étend ce qu'une carte peut prendre en charge. Le déroulé ci-dessus est condensé depuis le [Mordhau Modding Wiki](https://github.com/Net-Slayer/MordhauModsWiki), qui a les captures d'écran.
:::

## Métadonnées — comment le jeu sait ce qu'est votre carte {#metadata-how-the-game-knows-what-your-map-is}

Deux petites classes Blueprintables portent tout ce que les menus affichent. On les oublie facilement, et la carte se retrouve alors sans nom ni image.

**`MapMetaData`**

| Propriété | Contenu |
| --- | --- |
| `Name`, `Description` | Ce que les joueurs voient dans le navigateur |
| `BaseMap` | Le niveau de base |
| `GameModeMaps` | Les sous-niveaux de mode qui appartiennent à cette carte |
| `Thumbnail`, `BackgroundImages`, `ForegroundImages` | Visuels de menu et d'écran de chargement |
| `Tips` | Astuces d'écran de chargement |

**`GameModeMetadata`**

| Propriété | Contenu |
| --- | --- |
| `Prefix` | Le préfixe de sous-niveau du tableau ci-dessus — c'est ici que cette convention est définie |
| `Name`, `Description`, `Thumbnail`, `Tips` | Présentation du mode |

Créer un mode réellement nouveau implique donc une sous-classe de `GameModeMetadata` avec votre propre préfixe, en plus de votre GameMode et de votre GameState.

## Le Level Blueprint {#the-level-blueprint}

Chaque niveau en a un, et dans Mordhau il dérive de `MordhauLevelScriptActor`. C'est le bon endroit pour le scripting qui n'appartient qu'à *cette carte* — une porte qui s'ouvre à un certain score, un pont qui s'effondre quand un point tombe.

C'est aussi là que démarrent les systèmes propres à la carte. Le [système d'apparition aléatoire](https://github.com/WaGi-Coding/TakiRandomSpawnForMordhau) communautaire, par exemple, s'installe en déposant son contrôleur dans le Level Blueprint et en le reliant à `Event BeginPlay`.

Tout ce que vous voulez réutiliser d'une carte à l'autre doit plutôt être une vraie classe Blueprint : un Level Blueprint ne peut pas servir de parent.

## Armes, équipement et bots {#weapons-equipment-and-bots}

| Quoi | Par où commencer |
| --- | --- |
| Personnages | `BP_MordhauCharacter`, dans `/Game/Mordhau/Blueprints/Characters/` |
| Armes | `MordhauWeapon` et `MordhauEquipment`, plus `MordhauShield`, `FistsWeapon`, `KickWeapon` |
| Armes à distance | `MordhauProjectile` et `Quiver` |
| Timing d'attaque | `AttackMotion` et les classes de motion — windup, release, feinte, parade, riposte en ont chacune une |
| Animation | `MeleeWeaponAnimationProfile` — l'`AnimationProfile` que pointe une arme |
| Bots | `BotProfile` et `BotBehaviorProfile`, avec `BTTask_MeleeAttack`, `BTTask_MeleeDefend`, `BTTask_RangedAttack` et consorts comme nœuds d'arbre de comportement |

Une arme personnalisée est surtout un exercice de chiffres une fois que vous en avez dupliqué une existante : windup, release, tableaux de dégâts par type d'armure, coûts d'endurance, recul. La [page des variables d'arme du Mordhau Modding Wiki](https://github.com/Net-Slayer/MordhauModsWiki/blob/main/docs/modding/custom-content/creating-custom-weapons/weapon-variables.md) est la meilleure référence écrite sur ce que fait chacune, et mérite d'être lue avant de toucher la moindre valeur.

## Si vous n'en apprenez que cinq {#if-you-only-learn-five}

1. **Votre Blueprint de mode de jeu** — sous-classé depuis le mode officiel le plus proche
2. **`MordhauPlayerStart`** — pas de points d'apparition, pas de carte
3. **`ControlPoint`** et ses bannières — toute la couche objectif de Frontline et d'Invasion
4. **`MapMetaData` et `GameModeMetadata`** — comment votre carte se présente
5. **Le Level Blueprint** — pour le scripting ponctuel qui rend une carte unique

## Aidez-nous à finir cette page {#help-us-finish-this-page}

Personne n'a écrit de manuel de modding Mordhau de bout en bout, et cette page est une carte du territoire plutôt que le guide pas-à-pas qu'elle devrait être. Si vous avez publié un mode ou une carte, ce que vous savez — quelles propriétés comptent vraiment, ce qui casse au packaging, ce que font les cartes officielles et qui n'a rien d'évident — est exactement ce qui manque. [Ouvrez une issue](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues), ou collez vos notes brutes sur le [Discord](https://discord.gg/zuX58yRV84) : nous ferons la mise en forme.
