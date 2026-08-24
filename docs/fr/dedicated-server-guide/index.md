# Guide d'hébergement de serveur dédié {#dedicated-server-hosting-guide}

Vous découvrirez ci-dessous comment héberger un serveur dédié Mordhau sur Windows et sur Linux.

Cela suppose en grande partie que vous hébergez vous-même le serveur, soit sur une machine de votre réseau domestique, soit sur un VPS ou un boîtier dédié que vous louez.Si vous préférez ne rien gérer, il existe une liste de [fournisseurs de serveur de jeu dédiés](/fr/dedicated-server-guide/dedicated-game-server-providers) qui en créeront une pour vous et vous fourniront un panneau de contrôle à la place.

Bien que ce guide s'efforce d'être aussi complet que possible, le Discord du propriétaire du serveur Mordhau reste le meilleur endroit pour obtenir de l'aide sur un problème spécifique à votre configuration.

## Avant de commencer {#before-you-start}

Vous aurez besoin de :

- Une machine qui reste allumée.Un serveur qui se déconnecte lorsque vous fermez le jeu ne sert à rien.
- **SteamCMD**, l'outil de ligne de commande de Valve pour télécharger les fichiers du serveur.
- La possibilité de transférer des ports sur votre routeur, si vous hébergez depuis chez vous.

Vous n'avez **pas** besoin de posséder Mordhau sur le compte que vous utilisez.Le serveur dédié est un téléchargement gratuit distinct et s'installe via une connexion anonyme Steam.

::: tip
Le binaire du serveur est l'application Steam **629800**.C'est différent du jeu lui-même, qui porte le numéro 629760. Télécharger le mauvais jeu est l'erreur la plus courante que font les gens ici.
:::

## Installation de SteamCMD {#installing-steamcmd}

::: groupe de codes

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
SteamCMD est un programme 32 bits.Sur une installation Linux 64 bits, il ne démarrera pas tant que les bibliothèques de support 32 bits ne seront pas présentes, ce à quoi sert `lib32gcc-s1`.Sur les anciennes distributions, ce package s'appelle `lib32gcc1`.
:::

## Téléchargement du serveur {#downloading-the-server}

::: code-group

```powershell [Windows]
.\steamcmd.exe +force_install_dir C:\mordhau-server +login anonymous +app_update 629800 validate +quit
```

```bash [Linux]
./steamcmd.sh +force_install_dir ~/mordhau-server +login anonymous +app_update 629800 validate +quit
```

:::

Cela fait quelques gigaoctets, alors laissez-lui du temps.Exécutez à nouveau exactement la même commande chaque fois que vous souhaitez mettre à jour le serveur après un correctif.

::: warning
Mettre `+force_install_dir` **avant** `+login`.SteamCMD traite les arguments dans l'ordre, et si la connexion arrive en premier, il ignore votre répertoire d'installation et télécharge dans son propre dossier à la place.
:::

## Premier lancement {#first-launch}

Démarrez le serveur une fois sans argument.Il ne sera pas encore jouable – le fait est qu’il écrit ses fichiers de configuration, puis vous l’arrêtez.

::: groupe de codes

```powershell [Windows]
cd C:\mordhau-server
.\MordhauServer.exe
```

```bash [Linux]
cd ~/mordhau-server
./MordhauServer.sh
```

:::

Laissez-le finir de démarrer, puis éteignez-le.

## Configuration {#configuration}

Les fichiers de configuration existent désormais à l'adresse :

|Plateforme |Chemin |
|--- |--- |
|Windows |`Mordhau\Saved\Config\WindowsServer\` |
|Linux |`Mordhau/Saved/Config/LinuxServer/` |

Celui qui vous tient à cœur est `Game.ini`.

::: danger
Modifiez ces fichiers uniquement lorsque le serveur est arrêté.Mordhau conserve sa configuration en mémoire et la réécrit à l'arrêt, de sorte que tout ce que vous modifiez pendant son exécution est écrasé au moment où vous le fermez.
:::

### Game.ini {#gameini}

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

|Clé |Ce qu'il fait |
|--- |--- |
|`ServerName` |Le nom affiché dans le navigateur du jeu |
|`MaxSlots` |Capacité du joueur |
|`ServerPassword` |Laisser vide pour un serveur public |
|`AdminPassword` |Ce que les administrateurs saisissent avec `adminlogin` dans la console |
|`Admins` |Un identifiant Playfab.Répétez la ligne une fois par administrateur |
|`BannedPlayers` |Géré par la commande `ban`, vous le modifiez rarement à la main |

**`[/Script/Mordhau.MordhauGameMode]`**

Les temps de réapparition sont en secondes.`DamageFactor` augmente tous les dégâts, où `1.0` est normal et `2.0` les double.`TeamDamageFactor` adapte les tirs amis séparément, donc le `0.5` par défaut signifie que les coéquipiers subissent la moitié des dégâts les uns des autres.

### Rotation de la carte {#map-rotation}

Ajoutez une ligne `MapRotation` par carte.L'ordre est l'ordre dans lequel ils sont joués, et la liste contrôle également ce qui apparaît dans le vote de la carte en jeu.

Les noms de carte sont le préfixe de mode plus le nom de la carte :

|Préfixe |Mode |
|--- |--- |
|`FFA_` |Gratuit pour tous |
|`TDM_` |Match à mort par équipe |
|`SKM_` |Escarmouche |

Les cartes de stock sont `ThePit`, `Camp`, `Grad`,`Contraband`, `Tourney`, `MountainPeak` et `Taiga`, qui vous donnent des noms comme `FFA_Grad` ou `TDM_MountainPeak`.

### Engine.ini {#engineini}

En option.Le paramètre que la plupart des propriétaires finissent par toucher est le taux de tick :

```ini
[/Script/OnlineSubsystemUtils.IpNetDriver]
NetServerMaxTickRate=60
```

Plus élevé est plus fluide et coûte plus cher en CPU.Ne l'augmentez pas à moins que vous sachiez que la machine peut suivre le rythme : un serveur qui ne peut pas maintenir son taux de tick est bien pire qu'un serveur inférieur et stable.

## Démarrer correctement le serveur {#starting-the-server-properly}

Démarrez-le maintenant avec une carte et les ports :

::: code-group

```powershell [Windows]
.\MordhauServer.exe Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

```bash [Linux]
./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

:::

Mettez cela dans un fichier `.bat` sur Windows ou unscript shell sur Linux afin que vous ne le retapiez pas à chaque fois.

|Paramètre |Objectif |
|--- |--- |
|`-Port` |Trafic de jeu |
|`-BeaconPort` |Comment le navigateur du serveur atteint votre serveur |
|`-QueryPort` |Requête Steam, comment le navigateur lit votre nombre de joueurs |
|`-MultiHome` |Se lier à une adresse IP locale spécifique, si la machine en possède plusieurs |
|`-RconPort` |Écouteur RCON, voir le [Guide RCON](/fr/rcon-guide/) |
|`-log` |Imprimez sur la console plutôt que uniquement dans un fichier |

Sur Linux, exécutez-le sous `screen` ou `tmux` — ou mieux, écrivez une unité systemd — pour qu'il survive à la fermeture de la session SSH :

```bash
screen -dmS mordhau ./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -log
```

## Ports {#ports}

|Port |Protocole |Pourquoi |
|--- |--- |--- |
|7777 |UDP |Jeu |
|15000 |UDP |Balise |
|27015 |UDP |Requête Steam |
|votre port RCON |TCP |Console distante, uniquement si vous l'activez |

Les trois ports UDP doivent être ouverts et transférés, pas seulement le port de jeu.Si la balise ou le port de requête est bloqué, votre serveur fonctionne parfaitement et n’apparaît tout simplement jamais dans le navigateur – ce qui est la question la plus courante que les gens posent.

Vous exécutez plusieurs serveurs sur la même machine ?Donnez à chacun son propre ensemble, espacé :

```bash
-Port=7779 -BeaconPort=15002 -QueryPort=27018
```

## Vérifier que cela a fonctionné {#checking-it-worked}

Recherchez le nom de votre serveur dans le navigateur du jeu.S'il n'y est pas, procédez comme suit :

**Rien du tout dans le navigateur.** Presque toujours la balise ou le port de requête.Vérifiez vos règles de transfert et vérifiez le pare-feu sur la machine elle-même : le pare-feu Windows bloque le serveur lors de la première exécution et il est facile de cliquer sur l'invite.

**Visible, mais personne ne peut se connecter.** Le port de jeu.Mêmes vérifications, port 7777.

**Très bien sur le réseau local, invisible à l'extérieur.** Votre routeur ne transmet pas, ou votre FAI vous a derrière CGNAT — auquel cas vous ne pouvez pas du tout héberger à partir de cette connexion et vous aurez besoin d'un VPS.

**Les modifications de configuration n'ont rien fait.** Vous avez modifié le fichier pendant que le serveur était en cours d'exécution.Arrêtez-le, modifiez, démarrez.

**Le serveur démarre et se ferme immédiatement.** Lisez le journal dans `Mordhau/Saved/Logs/`.Un port déjà utilisé est la cause habituelle.

## Suivantétapes {#next-steps}

- Configurez [RCON](/fr/rcon-guide/) pour pouvoir modérer le serveur sans être dans le jeu
- Jetez un œil au [liste des fournisseurs](/fr/dedicated-server-guide/dedicated-game-server-providers) si gérer cela vous-même s'avère ne pas être votre idée du plaisir
