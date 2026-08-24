# Qu'est-ce que Git ? {#what-is-git}

Git conserve l'historique d'un dossier.Chaque fois que vous enregistrez un point de contrôle – un *commit* – il enregistre ce qui a changé, quand et qui l'a fait.Vous pouvez revenir à n'importe quel point de contrôle antérieur et deux personnes peuvent travailler sur le même dossier en même temps sans s'écraser mutuellement.

Cela n'a rien à voir avec Mordhau.Il s'agit d'un outil général, utilisé pour presque tous les projets logiciels existants, et nous l'utilisons ici car ces documents sont un dossier de fichiers texte que de nombreuses personnes modifient.

::: info
Git et GitHub sont deux choses différentes.Git est le programme sur votre ordinateur.GitHub est un site Web qui stocke les référentiels Git en ligne.Vous pouvez utiliser Git sans GitHub.Voir [Qu'est-ce que GitHub?](/fr/contributing/github).
:::

## Les mots {#the-words}

Vous rencontrerez constamment ce vocabulaire, il vaut donc la peine de vous y prendre tôt.

**Dépôt** (ou dépôt) — le dossier du projet, ainsi que l'intégralité de son historique.Ce site est un référentiel.

**Clone** — téléchargez une copie d'un référentiel, de l'historique et tout.

**Commit** — un point de contrôle enregistré, avec un message décrivant ce que vous avez modifié.

**Branche** — une ligne de travail distincte.Vous effectuez vos modifications sur votre propre branche afin que la branche principale continue de fonctionner pendant que vous êtes à mi-chemin.

**Push** — envoyez vos commits depuis votre machine jusqu'à GitHub.

**Pull** — annule les engagements pris par d'autres personnes.

**Fusionner** — combinez une branche dans une autre.

## Les cinq commandes dont vous avez réellement besoin {#the-five-commands-you-actually-need}

Vous n'avez pas besoin d'apprendre correctement Git pour contribuer ici.C'est toute la boucle :

```bash
# 1. Get the project onto your machine, once
git clone https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations.git
cd Unofficial-Mordhau-Documentations

# 2. Start a branch for what you are about to do
git checkout -b fix-rcon-ports

# 3. Edit files in your editor, then check what Git noticed
git status

# 4. Save a checkpoint
git add .
git commit -m "Correct the default RCON port"

# 5. Send it to GitHub
git push origin fix-rcon-ports
```

Ensuite, vous ouvrez une pull request sur le site Web, qui est couverte par [Qu'est-ce que GitHub?](/fr/contributing/github).

## Deux habitudes qui valent la peine d'être prises {#two-habits-worth-having}

**Écrivez des messages de validation qui signifient quelque chose.** "Corrigé" ne dit rien à personne six mois plus tard."Corrigez le port de la balise dans le guide du serveur" le fait.

**Démarrez une nouvelle branche pour chaque élément sur lequel vous travaillez.** Cela coûte une commande et cela signifie que vous pouvez avoir deux correctifs sans rapport en vol sans qu'ils s'emmêlent.

## Garder votre copie à jour {#keeping-your-copy-current}

Si vous avez cloné il y a quelque temps, d'autres personnes ont changé les choses depuis.Avant de commencer un nouveau travail :

```bash
git checkout main
git pull
git checkout -b my-new-branch
```

## Si vous êtes bloqué, {#if-you-get-stuck}

Les messages d'erreur Git sont notoirement inutiles.Rien de ce que vous faites localement n’est irrécupérable tant que vous n’avez pas supprimé le dossier, alors ne paniquez pas.

- [Le livre officiel Git](https://git-scm.com/book/en/v2) — gratuit, et les deux premiers chapitres couvrent tout ce qui précède plus en profondeur
- [Oh merde, Git !?!](https://ohshitgit.com/) — réponses courtes à « J'ai fait quelque chose de mal, comment puis-je l'annuler »

Ou demandez dans le[Discord](https://discord.gg/zuX58yRV84).Quelqu'un a rencontré la même erreur.
