# Outils requis {#required-tools}

Vous n'avez pas besoin de grand-chose pour travailler sur ces documents.Tout ce qui est répertorié ici est gratuit et fonctionne sur Windows, macOS et Linux.

## Node.js {#nodejs}

VitePress s'exécute sur Node, celui-ci n'est donc pas facultatif.Téléchargez la version **LTS** à partir de [nodejs.org](https://nodejs.org/en) — tout ce qui fonctionne à partir du nœud 18 et supérieur.

Une fois le programme d'installation terminé, ouvrez un terminal et vérifiez-le :

```bash
node -v
npm -v
```

Si les deux impriment un numéro de version, vous êtes bon.Si le terminal vous indique que la commande n'a pas été trouvée, fermez-le et ouvrez-en un nouveau.Le programme d'installation ajoute uniquement Node à votre PATH pour les terminaux ouverts après son exécution.

## Git {#git}

Git est ce que vous utilisez pour télécharger le référentiel et renvoyer vos modifications.Obtenez-le auprès de [git-scm.com](https://git-scm.com/downloads).

Lors d'une nouvelle installation, vous devez indiquer à Git qui vous êtes, sinon vos commits n'auront aucun auteur :

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Utilisez la même adresse e-mail que votreLe compte GitHub ou GitHub ne connectera pas les commits à votre profil.

## Visual Studio Code {#visual-studio-code}

N'importe quel éditeur de texte fera l'affaire, mais le référentiel est configuré pour [VS Code](https://code.visualstudio.com/) et le reste de ce guide suppose que vous l'utilisez.

Lorsque vous ouvrez le dossier du projet pour la première fois, VS Code affichera une notification vous demandant si vous souhaitez installer les extensions recommandées.Dis oui.La liste se trouve dans `.vscode/extensions.json` et elle est courte :

|Rallonge |Ce qu'il fait |
|--- |--- |
|Plus joli |Formate Markdown pour que les fichiers de tout le monde se ressemblent |
|Markdown Aperçu amélioré |Aperçu côte à côte pendant que vous tapez |
|TOML encore meilleur |Mise en évidence de la syntaxe pour `netlify.toml` |
|Arbre à tâches |Rassemble chaque `TODO:` du projet dans un seul panneau |

::: tip
Activez **Formater lors de l'enregistrement** dans les paramètres VS Code.Prettier nettoiera ensuite votre Markdown à chaque fois que vous cliquerez sur Enregistrer et vous n'aurez plus jamais à penser à l'espacement.
:::

## Un compte GitHub {#a-github-account}

Gratuit, et vous en avez besoin pour ouvrir une pull request.Inscrivez-vous sur [github.com](https://github.com).

Si vous envisagez d'effectuer des opérations push depuis votre ordinateur plutôt que de modifier dans le navigateur, configurez également une clé SSH - le [son propre parcours](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) de GitHub le couvre mieux que nous.

## Ce dont vous n'avez pas besoin {#what-you-do-not-need}

Vous écrivez Markdown, pas du code.Vous n'avez pas besoin de connaître Vue, TypeScript ou quoi que ce soit sur le fonctionnement interne de VitePress.Si vous pouvez écrire un message sur le forum, vous pouvez écrire une page ici.
