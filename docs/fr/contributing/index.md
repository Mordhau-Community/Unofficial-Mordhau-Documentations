# Contribuer {#contributing}

Ce site est écrit par les personnes qui l'utilisent.Chaque page commençait par
quelqu'un qui travaille sur quelque chose et prend ensuite le temps de l'écrire.

Cette page est la configuration locale, du début à la fin.Vous n'en avez pas besoin pour réparer
une faute de frappe ou signaler quelque chose qui ne va pas - [méthodes de contribution](/fr/contributing/methods) couvre les itinéraires les plus rapides, et aucun d'entre eux
implique un terminal.Lire le [termes et règles](/fr/contributing/terms-rules)
avant d'ouvrir une pull request de toute façon.

## Ce dont vous avez besoin {#what-you-need}

- [Node.js](https://nodejs.org/en) 18 ou version ultérieure
- [Git](https://git-scm.com/downloads)
- Un compte [GitHub](https://github.com)
- Un éditeur — le référentiel est configuré pour [VS Code](https://code.visualstudio.com/)

[Outils nécessaires](/fr/contributing/tools) contient les notes d'installation et le
configuration de première exécution pour chacun d’eux.

## Installer localement {#set-up-locally}

Fourche [le dépôt](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations)
sur GitHub, puis clonez votre fork et installez :

```bash
git clone https://github.com/YOUR-USERNAME/Unofficial-Mordhau-Documentations.git
cd Unofficial-Mordhau-Documentations
npm install
```

Démarrez le serveur de développement :

```bash
npm run docs:dev
```

Il imprime l'adresse à laquelle il sert, généralement `http://localhost:5173`.Partir
il est en cours d'exécution : les pages se rechargent au fur et à mesure que vous enregistrez.

## Faites votre changement {#make-your-change}

Travailler sur une branche, jamais sur `main` :

```bash
git checkout -b fix-rcon-ports
```

Les pages vivent sous `docs/<language>/`, donc une page en anglais appartient à `docs/en/`.
Une nouvelle page nécessite également une entrée dans `.vitepress/config.mts`, ou rien sur le
des liens vers celui-ci.

[Comment utiliser Markdown](/fr/contributing/how-to-use-markdown) couvre le fichier
les conventions et le style de la maison.[Ce qui est VitePress](/fr/contributing/vitepress)
couvre le fichier de configuration et la manière dont le projet s'articule.

## Vérifiez-le avant de l'envoyer {#check-it-before-you-send-it}

```bash
npm run docs:build
```

La construction échoue en raison de liens internes rompus.C'est l'erreur la plus simple à commettre
et le plus facile à manquer dans un aperçu, donc cela vaut la peine de courir même pendant un certain temps.
changement d'une ligne.S'il réussit, `npm run docs:preview` sert exactement ce que le
construction produite.

## Envoyez-le {#send-it}

```bash
git add .
git commit -m "Correct the RCON port numbers"
git push origin fix-rcon-ports
```

GitHub propose d'ouvrir une pull request de cette succursale lors de votre prochaine visite
le référentiel.Dites ce qui a changé et pourquoi.

Si l'avis revient pour demander quelque chose, poussez un autre commit vers le même
branch - la demande d'extraction se met à jour d'elle-même.Une fois fusionné, Netlify reconstruit
et publie le site, ce qui prend une minute ou deux.
