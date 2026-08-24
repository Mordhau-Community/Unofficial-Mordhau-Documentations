# Qu'est-ce que VitePress ? {#what-is-vitepress}

VitePress est ce qui transforme ce référentiel en un site Web.Vous écrivez des fichiers Markdown, VitePress les restitue dans des pages HTML avec navigation, recherche et un thème déjà attaché.

Vous n'avez pas besoin de le comprendre pour rédiger de la documentation.Cette page existe lorsque vous souhaitez modifier quelque chose de structurel : ajoutez une page à la barre latérale, ajoutez une langue ou déterminez pourquoi le serveur de développement se plaint.

## Comment le projet s'articule {#how-the-project-fits-together}

```
.vitepress/
  config.mts        the whole site configuration: nav, sidebar, languages
  theme/            styling overrides
docs/
  en/               English pages
  ar/  fr/  ja/     translations, mirroring the English structure
  ru/  zh/
  public/           images and files copied to the site root as they are
package.json        dependencies and the npm scripts
netlify.toml        build and redirect settings for the live site
```

Chaque fichier `.md` sous `docs/` devient une page.L'URL suit le chemin du fichier, donc `docs/en/rcon-guide/index.md` est diffusé sur `/docs/en/rcon-guide/`.

## Les trois commandes {#the-three-commands}

```bash
npm run docs:dev      # local server with live reload, use this while writing
npm run docs:build    # produce the static site in .vitepress/dist/docs
npm run docs:preview  # serve what the build produced, to check it before pushing
```

`docs:dev` est celle que vous utiliserez.Il recharge la page dans votre navigateur à chaque fois que vous enregistrez un fichier.

::: tip
Le serveur de développement imprime l'adresse sur laquelle il écoute lorsqu'il démarre, généralement `http://localhost:5173`.Utilisez ce qu'il imprime plutôt que de supposer un port - il en choisit un autre si ce port est pris.
:::

## Le fichier de configuration {#the-config-file}

`.vitepress/config.mts` est le seul fichier où vous devez être prudent, car une erreur de syntaxe y empêche la construction de tout le site plutôt que de casser une page.

Les parties que vous êtes le plus susceptible de toucher :

**`themeConfig.nav`** — les liens sur la barre supérieure.

**`themeConfig.sidebar`** — la navigation de gauche.Il est saisi par préfixe de chemin, de sorte que le bloc `"/en/contributing/"` ne s'affiche que sur les pages situées sous ce chemin.

**`locales`** — une entrée par langue.Chacun a ses propres `nav` et `sidebar`, plus un `dir` de `ltr` ou `rtl`.

L'ajout d'une page à la barre latérale ressemble à ceci :

```ts
{
  text: "What people see in the sidebar",
  link: "/en/contributing/my-new-page",
}
```

Le `link` est l'URL, pas le chemin du fichier - nonPréfixe `docs/` et pas de `.md` à la fin.

::: warning
Enregistrez la configuration pendant que le serveur de développement est en cours d'exécution et qu'il se redémarre.S'il s'arrête avec une erreur, lisez les dernières lignes – il s'agit presque toujours d'une virgule manquante ou d'un crochet non fermé, et il vous indique le numéro de ligne.
:::

## Langues de droite à gauche {#right-to-left-languages}

Les paramètres régionaux arabes définissent `dir: "rtl"` et `postcss-rtl` reflète automatiquement la feuille de style au moment de la construction.Vous n'avez pas besoin d'écrire du CSS séparé pour cela.

## Que se passe-t-il lorsque votre modification est fusionnée {#what-happens-when-your-change-is-merged}

Netlify surveille la branche `main`.Une fusion déclenche `npm run docs:build` et le site généré est publié.Cela prend une minute ou deux.

La sortie de construction va dans `.vitepress/dist/` et n'est délibérément pas validée - elle est régénérée à partir du Markdown à chaque fois, donc sa validation ne ferait que créer des conflits.

## En savoir plus {#learning-more}

Le [VitePress documentation](https://vitepress.dev) est complet et lisible.La page [Extensions Markdown](https://vitepress.dev/guide/markdown) en particulier en répertorie plus que ce que nous utilisons ici – si vous voulez une fonctionnalité et vous demandez si elle existe, elle se trouve probablement sur cette page.
