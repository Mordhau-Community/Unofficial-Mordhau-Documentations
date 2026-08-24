# Solutions et erreurs {#solutions-and-errors}

Choses qui tournent mal et ce qui les corrige généralement.Problèmes de serveur d’abord, puisque c’est de là que viennent la plupart des questions.

::: tip
Avant toute chose, lisez le journal.La plupart du temps, il indique exactement ce qui ne va pas.

- **Serveur :** `Mordhau/Saved/Logs/` dans votre serveur, installez
- **Client (Windows) :** `%LOCALAPPDATA%\Mordhau\Saved\Logs\`

Démarrez le serveur avec`-log` et il s'imprime sur la console au fur et à mesure, ce qui est beaucoup plus facile que de lire un fichier après coup.
:::

## Problèmes de serveur {#server-problems}

### Le serveur n'apparaît pas dans le navigateur {#the-server-does-not-appear-in-the-browser}

De loin le plus courant, et il s'agit presque toujours du **port de balise ou de requête**.

Le passage du port de jeu n'est pas suffisant.Les trois ports UDP doivent être ouverts et transférés :

|Port |Protocole |Conséquence en cas de blocage |
|--- |--- |--- |
|7777 |UDP |Personne ne peut se connecter |
|15000 |UDP |Le serveur n'apparaît pas dans le navigateur |
|27015 |UDP |Le serveur n'apparaît pas ou apparaît sans information |

Parcourez-le dans cet ordre :

1. Le serveur est-il réellement en cours d'exécution ?Vérifiez la sortie de la console.
2. Le pare-feu de la machine elle-même le permet-il ?Le pare-feu Windows bloque le serveur au premier lancement et l'invite est facile à ignorer sans lecture.
3. Les trois ports du routeur sont-ils redirigés, en tant que **UDP**, vers la bonne adresse IP interne ?
4. L'adresse IP locale de la machine a-t-elle changé ?DHCPréaffecte les adresses et les règles de transfert ne pointent alors vers rien.Donnez au serveur une adresse IP locale statique ou une réservation DHCP.

Si cela fonctionne sur votre propre réseau mais pas de l'extérieur et que le transfert est définitivement correct, votre FAI peut vous mettre derrière CGNAT.Vous ne pouvez pas héberger via cela, et aucune configuration ne le changera – vous avez besoin d’un VPS.

### Les modifications de configuration ne font rien {#config-changes-do-nothing}

Vous avez modifié `Game.ini` pendant que le serveur était en cours d'exécution.

Mordhau conserve sa configuration en mémoire et la réécrit à l'arrêt, écrasant votre fichier avec ce qu'il avait chargé au démarrage.Arrêtez le serveur, modifiez, puis démarrez-le.

### Le serveur se ferme immédiatement après le démarrage {#the-server-closes-immediately-after-starting}

Lire le journal.Généralement l'un des éléments suivants :

- **Port déjà utilisé.** Un autre serveur ou une instance précédente qui ne s'est pas fermée.Recherchez un processus parasite ou déplacez-vous vers des ports différents.
- **Fichiers manquants.** Réexécutez la commande SteamCMD avec `validate` à la fin.
- **`Game.ini` mal formé.** Une faute de frappe dans un en-tête de section ou une valeur là où un nombre était attendu.

### Personne ne peut se connecter, mais le serveur est répertorié {#nobody-can-connect-but-the-server-is-listed}

Le port du jeu, 7777 UDP.Mêmes contrôles que ci-dessus.

S'il est répertorié et que les connexions démarrent mais s'interrompent immédiatement, vérifiez si `ServerPassword` est défini sur quelque chose que vous avez oublié.

### Les commandes d'administration sont rejetées {#admin-commands-are-rejected}

Tapez `adminlogin` et le mot de passe de `AdminPassword` en premier.Rien d'autre ne fonctionne avant cela.

S'il refuse toujours,vous avez modifié le mot de passe pendant que le serveur était en cours d'exécution et il a été écrasé.Voir ci-dessus.

### RCON ne se connectera pas {#rcon-will-not-connect}

**Connexion refusée** — RCON n'écoute pas.`RconPort` doit être défini dans `Game.ini` et le serveur redémarré.

**Expiration du délai de connexion** — pare-feu.Notez que le port RCON est **TCP**, contrairement aux trois autres, donc une règle qui couvre les ports de jeu ne le couvrira pas.

**Échec de l'authentification** — mot de passe erroné.Si vous avez laissé `RconPassword` vide, le serveur en a généré un aléatoire au démarrage que vous n'avez aucun moyen de connaître.Définissez-le explicitement et redémarrez.

Plus de détails sur le [Page RCON](/fr/rcon-guide/).

### Le serveur exécute une ancienne version {#the-server-is-running-an-old-build}

Mordhau Les clients ne peuvent pas rejoindre un serveur sur une version différente.Après un correctif, réexécutez :

```bash
./steamcmd.sh +force_install_dir ~/mordhau-server +login anonymous +app_update 629800 validate +quit
```

`+force_install_dir` doit apparaître avant que `+login` ou SteamCMD l'ignore et mette à jour le mauvais dossier.

### Les performances sont mauvaises avec un serveur complet {#performance-is-bad-with-a-full-server}

Vérifiez `NetServerMaxTickRate` dans `Engine.ini`.S'il est réglé à une valeur supérieure à ce que le matériel peut supporter, le serveur prend du retard et tout le monde est mis à l'écart - un 60 stable se sent bien mieux qu'un 120 instable.

Mordhau est en grande partie lié à un seul thread, donc la vitesse d'horloge d'un seul cœur compte plus que le nombre de cœurs.Un VPS bon marché avec de nombreux cœurs lents ne convient pas.

## Problèmes clients {#client-problems}

::: info
Cette section est plus fine que celle du serveur, car la plupart d'entre nous ici exécutent des serveurs plutôt que de prendre en chargeclients.Si vous avez corrigé quelque chose qui n'est pas répertorié, [ajouter](/fr/contributing/methods).
:::

### Le jeu ne démarre pas {#the-game-will-not-start}

1. Vérifiez les fichiers du jeu via Steam — cliquez avec le bouton droit sur Mordhau, Propriétés, Fichiers installés, Vérifier l'intégrité.
2. Mettez à jour vos pilotes graphiques.
3. Redémarrez.En réalité, pour les problèmes anti-triche, cela résout le problème plus souvent qu'il ne le devrait.

### Erreurs anti-triche {#anti-cheat-errors}

Mordhau utilise Easy Anti-Cheat et la plupart des échecs de lancement y remontent.

- Exécutez à nouveau le programme d'installation EAC dans le dossier du jeu.
- Essayez de lancer Steam en tant qu'administrateur.
- Vérifiez que votre antivirus n'a pas mis le jeu ou l'EAC en quarantaine.Il est courant que les logiciels de sécurité confondent l’anti-triche avec les logiciels malveillants, car ils se comportent de la même manière.

### Déconnecté lors d'un match {#disconnected-during-a-match}

- S'il s'agit d'un serveur spécifique, c'est ce serveur, pas vous.
- S'il s'agit de tous les serveurs, testez votre connexion de manière générale.Le Wi-Fi est un coupable fréquent – essayez un câble si vous le pouvez.
- La perte de paquets se manifeste sous la forme d'un élastique et de hits qui ne sont pas enregistrés avant d'apparaître comme une déconnexion.

### Mauvaise fréquence d'images {#poor-frame-rate}

Réduisez les ombres et la distance de vue en premier, elles coûtent le plus cher pour la moindre différence visuelle.Frontline avec un serveur complet est le pire des cas du jeu : s'il ne fait que bégayer, c'est la charge, pas un défaut.

## Toujours bloqué {#still-stuck}

Apportez-le au [Discord](https://discord.gg/zuX58yRV84).Pour obtenir rapidement une réponse utile, incluez :

- Ce que vous faisiez etque s'est-il passé
- Votre plate-forme et s'il s'agit d'un problème de client ou de serveur
- La partie pertinente du journal, pas une capture d'écran
- Ce que vous avez déjà essayé

Si vous trouvez le correctif, revenez et ajoutez-le ici.Presque tout sur cette page est ici parce que c'est arrivé à quelqu'un et qu'il l'a écrit.
