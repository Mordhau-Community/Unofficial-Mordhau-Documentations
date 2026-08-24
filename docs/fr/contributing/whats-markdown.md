# Qu'est-ce que Markdown {#what-is-markdown}

Markdown est un langage de balisage léger utilisé pour formater le texte de manière simple et efficace.Il a été créé en 2004 par John Gruber et Aaron Swartz, dans le but de rendre les documents en texte brut visuellement attrayants et facilement convertibles en formats structurés comme HTML.Markdown est largement utilisé dans la documentation, les blogs, les e-mails et les référentiels de code comme GitHub.

Ce langage de balisage n'a aucun lien avec le jeu Mordhau, son développement ou la création de mods pour celui-ci.Il s’agit simplement d’un domaine de connaissances qui existe de manière indépendante et qui a de multiples utilisations dans divers domaines.Nous l'expliquons ici uniquement parce que nous l'utilisons pour contribuer à la documentation du jeu Mordhau, à travers lequel vous lisez cette page.

::: info
**Informations pour ceux qui ne sont pas familiers avec la programmation ou les sites Web :**
<br>
HTML est également un langage de balisage et constitue la structure de base de tous les sites Web.Sur cette page, vous n'êtes pas obligé de l'apprendre ou de le comprendre si votre intention est uniquement de contribuer à la documentation Mordhau.Vous devez simplement apprendre Markdown, qui est finalement converti en code HTML.
<br><br>
Notre objectif n'est pas d'expliquer les complexités de la programmation ni de vous plonger dans un monde plein de détails techniques.Notre seul objectif est de vous concentrer uniquement sur la contribution à la documentation Mordhau !Que vous soyez débutant en langages de programmation ou que vous n'en ayez aucune connaissance, nous nous efforçons de simplifier les choses au maximum pour faciliter votre cheminement vers la contribution.
:::

## Où le Markdown est-il utilisé ? {#where-is-markdown-used}

Markdown est utilisé dans divers contextes en raison de sa simplicité et de sa polyvalence.Voici quelques domaines courants dans lesquels Markdown est appliqué :

1. **Documentation technique :**<br> Markdown est largement utilisé pour écrire des fichiers README dans des référentiels tels que GitHub, GitLab et Bitbucket.
2. **Plateformes de blogs :**<br> De nombreuses plates-formes, telles que Medium ou Jekyll, prennent en charge Markdown pour créer facilement des articles bien formatés.
3. **Systèmes de gestion de contenu (CMS) :**<br> Markdown est souvent utilisé dans les générateurs de sites statiques comme Hugo et Gatsby.
4. **E-mail et messagerie :**<br> Markdown aide à formater des e-mails ou des messages de chat propres et professionnels, en particulier dans des outils comme Slack ou Discord.
5. **Applications de prise de notes :**<br> Des outils populaires tels que Notion, Obsidian et Evernote prennent en charge Markdown pour une organisation efficace des notes.
6. **Plateformes éducatives :**<br> Markdown est utilisé dans les wikis et les didacticiels pour présenter des informations claires et structurées.

## Comment fonctionne Markdown ? {#how-does-markdown-work}

Markdown utilise une syntaxe de texte brut avec des caractères spéciaux pour définir le formatage.Voici quelques exemples :

### 1- Titres : {#1-headings}

```md
# Heading 1

## Heading 2

### Heading 3
```

Un titre est une ligne commençant par un à six caractères `#`.Un `#` est le titre de la page, `##` est une section, `###` est une sous-section.Laissez une ligne vide après.

### 2- Accentuation : {#2-emphasis}

```md
*italic* or _italic_
**bold** or __bold__
***bold italic***
~~struck through~~
```

### 3- Listes : {#3-lists}

```md
- first item
- second item
  - a nested item, indented by two spaces

1. numbered
2. list
3. of things
```

Les listes numérotées se renumérotent elles-mêmes, vous pouvez donc écrire `1.` sur chaque ligne etMarkdown comptera toujours correctement.

### 4- Liens : {#4-links}

```md
[text people click](https://example.com)
```

### 5- Images : {#5-images}

```md
![description of the image](/path/to/image.webp)
```

La description entre crochets est ce que les lecteurs d'écran annoncent et ce qui s'affiche si l'image ne se charge pas, alors écrivez quelque chose de réel ici.

### 6- Code : {#6-code}

Enveloppez quelques mots dans des guillemets simples pour les marquer comme code - utile pour les noms de fichiers, les commandes et les clés de configuration.Pour toute période plus longue, utilisez trois guillemets et nommez la langue :

````md
```bash
node -v
```
````

### 7- Citations : {#7-quotes}

```md
> Anything after a > is a quote block.
```

### 8- Tableaux : {#8-tables}

```md
| Setting | Meaning |
| --- | --- |
| MaxSlots | How many players fit on the server |
| ServerName | The name shown in the browser |
```

Les tirets sur la deuxième ligne la transforment en tableau.Il n'est pas nécessaire que les colonnes soient alignées dans la source.

## Ce que Markdown ne fait pas {#what-markdown-does-not-do}

Markdown n'a délibérément aucune syntaxe pour les couleurs, les polices, l'alignement du texte ou la mise en page.C'est le but : le document décrit sa structure et le site décide de l'apparence de la structure.Si vous vous retrouvez à le combattre, vous essayez généralement de faire quelque chose que le thème devrait gérer à la place.

## Suivant {#next}

La syntaxe ci-dessus est standard Markdown et fonctionne partout.Ce site ajoute également une poignée dedes extras par-dessus : des zones de légende, des blocs de code à onglets, une page de couverture.Ceux-ci sont couverts dans [Comment utiliser Markdown](/fr/contributing/how-to-use-markdown).
