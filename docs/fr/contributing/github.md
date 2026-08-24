# Qu'est-ce que GitHub ? {#what-is-github}

GitHub est un site Web qui héberge des référentiels Git.Il stocke le projet en ligne afin que tout le monde travaille sur la même copie, et il ajoute les éléments sur lesquels Git lui-même n'a aucune opinion : le suivi des problèmes, la révision du code et les demandes d'extraction.

La source de ce site réside à [Mordhau-Communauté/Non officiel-Mordhau-Documentations](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations).Chaque page que vous lisez ici est un fichier Markdown dans ce référentiel.

Si la différence entre Git et GitHub n'est pas encore claire, lisez d'abord [Qu'est-ce que Git ?](/fr/contributing/git).

## Obtenir un compte {#getting-an-account}

Gratuit.Inscrivez-vous sur [github.com](https://github.com) avec une adresse e-mail et un nom d'utilisateur – le nom d'utilisateur est public et apparaît sur tout ce que vous contribuez, alors choisissez-en un par lequel vous êtes heureux d'être connu.

Activez l'authentification à deux facteurs lorsque vous êtes dans les paramètres.GitHub l'exige de toute façon pour les contributeurs.

## Fork, branch, pull request {#fork-branch-pull-request}

Il s'agit du flux de travail sur lequel l'ensemble du site s'exécute, et il est le même partout sur GitHub.

### 1. Fork {#1-fork}

Vous n'êtes pas autorisé à pousser directement vers le référentiel principal, et c'est délibéré.En cliquant sur **Fork**, vous obtenez votre propre copie complète sous votre propre compte avec laquelle vous pouvez faire ce que vous voulez.

### 2. Apportez vos modifications {#2-make-your-changes}

Soit dans le navigateur, soit en clonant votre fork et en travaillant localement.Mettez-les sur une branche plutôt que directement sur `main`.

### 3. Ouvrez une demande d'extraction {#3-open-a-pull-request}

Une demande d'extraction est une demande visant à extraire vos modifications dans le référentiel d'origine.GitHubmontre exactement ce que vous avez modifié, ligne par ligne, et donne à chacun un endroit pour en discuter avant que quoi que ce soit ne soit fusionné.

Rédigez une description indiquant ce que vous avez modifié et pourquoi.Si cela résout un problème, mentionnez le numéro du problème – l’écriture de `Fixes #42` ferme automatiquement ce problème une fois la demande d’extraction fusionnée.

### 4. Répondre à l'avis {#4-respond-to-review}

Quelqu'un le lira.Ils peuvent demander des changements.Poussez un autre commit vers la même branche et la demande d'extraction se met à jour d'elle-même - vous n'en ouvrez pas une nouvelle.

Une fois approuvé et fusionné, Netlify reconstruit le site et votre modification est active en quelques minutes.

## Édition sans rien de tout cela {#editing-without-any-of-that}

Pour une faute de frappe, vous n'avez rien à faire.Chaque page ici comporte un lien **Modifier cette page** en bas.Il ouvre l'éditeur de GitHub sur ce fichier précis, et lorsque vous enregistrez, GitHub effectue silencieusement le fork et la pull request pour vous.

## Problèmes {#issues}

Le [Tracker d'émission](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) est l'endroit où les problèmes sont signalés et le travail est planifié.Ouvrez-en un si vous avez trouvé quelque chose qui ne va pas et que vous n'allez pas le réparer vous-même, si vous souhaitez suggérer une page qui n'existe pas ou si vous ne savez pas si une idée vaut la peine d'être mise en œuvre avant d'y consacrer du temps.

Recherchez d'abord les problèmes existants.Quelqu'un l'a peut-être déjà soulevé.

## Surveillance du référentiel {#watching-the-repository}

Le bouton **Regarder** en haut du référentiel vous enverra un e-mail lorsque des événements se produisent.**Personnalisé → Problèmes** est généralement le bon paramètre si vous souhaitez aider mais ne souhaitez pas de notification pour chaque validation.

## En savoir plus {#learning-more}

Le GitHub de [Démarrer rapidement](https://docs.github.com/en/get-started/quickstart) est vraiment bon et prend environ quinze minutes.GitHub Skills propose également un cours gratuit [Introduction à GitHub](https://github.com/skills/introduction-to-github) qui vous guide dans l'ouverture d'une véritable pull request.
