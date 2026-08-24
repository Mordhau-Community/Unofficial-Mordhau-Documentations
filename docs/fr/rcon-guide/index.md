# Guide RCON {#rcon-guide}

RCON signifie *console à distance*.Il vous permet d'envoyer des commandes à votre serveur Mordhau via le réseau, depuis l'extérieur du jeu. Vous pouvez ainsi modifier la carte, expulser quelqu'un ou vérifier qui est dessus, sans lancer Mordhau et rejoindre d'abord.

Si vous exécutez un serveur, c'est l'outil que vous utiliserez le plus.

::: info
Cette page suppose que vous disposez déjà d'un serveur en cours d'exécution.Si ce n'est pas le cas, commencez par le [guide du serveur dédié](/fr/dedicated-server-guide/).
:::

## Commandes d'administration vs RCON {#admin-commands-vs-rcon}

Les deux vous permettent d'exécuter les mêmes commandes, mais elles sont accessibles différemment.

**Les commandes d'administration du jeu** sont saisies dans la console pendant que vous jouez.Vous vous authentifiez avec `adminlogin` et le mot de passe administrateur de `Game.ini`.Pratique lorsque vous êtes déjà sur le serveur.

**RCON** se connecte via TCP à partir de n'importe quel client RCON.Aucun jeu n'est nécessaire et il continue de fonctionner lorsque le serveur est plein ou lorsque quelque chose ne va pas suffisamment pour que vous ne puissiez pas le rejoindre.

La liste des commandes est la même dans les deux cas.

## Activation de RCON sur {#turning-rcon-on}

RCON est configuré dans `Game.ini`, dans la même section que les autres paramètres de votre serveur :

|Plateforme |Chemin |
|--- |--- |
|Windows |`Mordhau\Saved\Config\WindowsServer\Game.ini` |
|Linux |`Mordhau/Saved/Config/LinuxServer/Game.ini` |

Ajoutez ces deux clés :

```ini
[/Script/Mordhau.MordhauGameSession]
ServerName=My Mordhau Server
MaxSlots=32
AdminPassword=changethis
RconPassword=a-different-long-password
RconPort=7778
```

::: danger
Arrêtez le serveur avant de modifier`Game.ini`.Il réécrit le fichier depuis la mémoire à l'arrêt, donc les modifications sont apportéespendant qu'il fonctionne sont jetés.
:::

::: warning
Si vous laissez `RconPassword` vide, le serveur en génère un aléatoire au démarrage, ce qui signifie que vous ne le saurez pas.Réglez-le vous-même.

Ne réutilisez pas votre `AdminPassword` ici et n'utilisez rien de court.RCON est un protocole non crypté : toute personne disposant du mot de passe et pouvant accéder au port a le contrôle total de votre serveur.
:::

Redémarrez le serveur.Vous pouvez également remplacer le port sur la ligne de commande si vous préférez :

```bash
./MordhauServer.sh Mordhau FFA_ThePit -Port=7777 -BeaconPort=15000 -QueryPort=27015 -RconPort=7778 -log
```

## Ouverture du port {#opening-the-port}

Le port RCON est **TCP**, contrairement aux ports de jeu, de balise et de requête.qui sont tous UDP.Une règle de pare-feu qui couvre les trois autres ne couvrira pas celle-ci.

Ne le transférez que si vous avez réellement besoin d'atteindre RCON depuis l'extérieur de la machine.Si vous administrez quand même le serveur via SSH, laissez le port fermé à Internet et connectez-vous à `127.0.0.1` depuis la boîte – c'est strictement plus sûr et ne vous coûte rien.

## Connexion {#connecting}

Tout client qui parle le protocole Source RCON fonctionne.[`mcrcon`](https://github.com/Tiiffi/mcrcon) est petit, n'a aucune dépendance et s'exécute à la fois sur Windows et Linux :

```bash
mcrcon -H 127.0.0.1 -P 7778 -p your-rcon-password
```

Cela vous amène à une invite interactive.Pour lancer une seule commande et quitter :

```bash
mcrcon -H 127.0.0.1 -P 7778 -p your-rcon-password "playerlist"
```

Des clients graphiques existent également si vous préférez avoir une fenêtre plutôt qu'un terminal - la plupart des outils Source RCON à usage général fonctionnent correctement avec Mordhau.

## Commandes {#commands}

sont des **ID Playfab**, et non des ID Steam.Obtenez-les avec `playerlist`.

### Joueurs {#players}

|Commande |Ce qu'il fait |
|--- |--- |
|`playerlist` |Tout le monde sur le serveur, avec ses identifiants |
|`kick <name or PlayfabID> <reason>` |Supprime un joueur, il peut rejoindre |
|`ban <name or PlayfabID> <minutes> <reason>` |Interdictions pour une durée en minutes |
|`unban <name or PlayfabID>` |lève une interdiction |
|`banlist` |Tout le monde est actuellement banni |
|`mute <name or PlayfabID> <minutes>` |Coupe la voix et le texte |
|`cancelvotekick` |Arrête un votekick en cours |

### Administrateurs {#admins}

|Commande |Ce qu'il fait |
|--- |--- |
|`adminlogin` |Authentifiez-vous dans le jeu avant d'utiliser toute autre commande |
|`adminlist` |Administrateurs actuels |
|`adminadd <PlayfabID>` |Administrateur des subventions |
|`removeadmin <PlayfabID>` |Révoque l'administrateur |

### Le match {#the-match}

|Commande |Ce qu'il fait |
|--- |--- |
|`changelevel <map name>` |Carte des commutateurs, par exemple `changelevel FFA_Grad` |
|`restartlevel` |Redémarre la carte actuelle |
|`addbots <number>` |Ajoute des robots |
|`addbots team <number> <0 or 1>` |Ajoute des robots à une équipe, 0 est rouge et 1 est bleu |
|`removebots <number>` |Supprime les robots |
|`slomo <value>` |Modifie la vitesse de jeu, `0.5` est la moitié et `2` est le double |

::: tip
`slomo` affecte tout le monde sur le serveur.C'est divertissant exactement une fois, puis les gens s'en vont.
:::

## Choses du quotidien {#everyday-things}

**Trouvez l'identité de quelqu'un avant d'agir sur cette personne**

```
playerlist
```

**Interdiction d'un jour**

```
ban 1A2B3C4D5E6F7890 1440 Griefing
```

Les durées sont en minutes, donc une heure équivaut à `60`, un jour à `1440`, une semaine à `10080`.

**Faites pivoter la carte plus tôt**

```
changelevel TDM_Camp
```

**Remplir un serveur silencieux**

```
addbots 8
```

## Lorsqu'il ne se connecte pas {#when-it-will-not-connect}

**Connexion refusée.** RCON n'écoute pas.Vérifiez que `RconPort` est défini dans `Game.ini` et que vous avez redémarré le serveur après l'avoir modifié. Avec `-log`, vous verrez RCON démarrer dans la sortie de la console.

**La connexion expire.** Un pare-feu le mange.N'oubliez pas que le port est TCP.

**L'authentification a échoué.** Mot de passe incorrect.Si vous avez laissé `RconPassword` vide, le serveur en a inventé un au démarrage, alors définissez-le explicitement et redémarrez.

**Les commandes s'exécutent mais rien ne se passe.** Vérifiez la syntaxe et l'ordre des arguments.`ban` en particulier veut la durée avant la raison, et les inverser échoue tranquillement.

**Vos modifications continuent de disparaître.** Le serveur était en cours d'exécution lorsque vous avez enregistré.Arrêtez-le d'abord.

## Sécurité {#security}

Cela vaut la peine de le répéter, car les gens se trompent et perdent des serveurs à cause de cela :

- RCON n'est pas crypté.Le mot de passe traverse le réseau sous une forme que toute personne se trouvant sur le chemin peut lire.
- Utilisez un mot de passe long et unique.Pas votre mot de passe administrateur, pas votreMot de passe Steam.
- N'exposez pas le port publiquement, sauf si vous y êtes obligé.Localhost, ou un tunnel SSH, ou une règle de pare-feu limitée à votre propre IP.
- Modifiez le mot de passe si jamais vous le collez dans un message Discord, un ticket d'assistance ou une capture d'écran.
