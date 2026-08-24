# Comment utiliser Markdown {#how-to-use-markdown}

Tout dans le [page précédente](/fr/contributing/whats-markdown) fonctionne ici.Cette page couvre les extras que VitePress ajoute en haut et les conventions que nous suivons dans ce référentiel.

## Frontmatter {#frontmatter}

Le bloc tout en haut d'un fichier, entouré de trois tirets, est le frontmatter.Il configure la page plutôt que d'y apparaître, et doit être la première chose du fichier :

```md
---
layout: doc
sidebar: false
aside: false
---

# My Page
```

Les clés à connaître :

|Clé |Effet |
|--- |--- |
|`layout` |`doc` pour une page normale, `home` pour une page de destination |
|`sidebar` |`false` masque la navigation de gauche |
|`aside` |`false` masque la table des matières sur la page à droite |
|`title` |Remplace le titre de l'onglet du navigateur |

La plupart des pages n'ont besoin d'aucune préface.Ajoutez-le uniquement lorsque vous souhaitez désactiver quelque chose.

## Zones de légende {#callout-boxes}

Ce sont les panneaux colorés utilisés sur tout le site.Ouvrez avec trois deux-points et tapez, fermez avec trois deux-points :

```md
::: tip
Handy but optional advice.
:::

::: warning
Something the reader can get wrong.
:::

::: danger
Something that will break their server or lose their data.
:::

::: info
Extra background that is not needed to follow the steps.
:::
```

Vous pouvez donner à chacun d'entre eux un titre personnalisé en mettant du texte après le type :

```md
::: tip RECOMMENDED
This shows "RECOMMENDED" as the box title instead of "TIP".
:::
```

Utilisez-les avec parcimonie.Une page où un paragraphe sur deux se trouve dans une case colorée est plus difficile à lire qu’une page sans aucun paragraphe.

## Blocs de code {#code-blocks}

Nommez toujours la langue après les guillemets d'ouverture.Il active la coloration syntaxique et indique au lecteur de quoi il s'agit.en regardant :

````md
```bash
steamcmd + connexion anonyme + app_update 629800 valider + quitter
```
````

`bash`, `ini`, `json`, `md`, `js` et `ts` couvrent presque tout dans ces documents.

### Mise en surbrillance de lignes spécifiques {#highlighting-specific-lines}

Mettez les numéros de ligne entre accolades pour attirer l'attention sur une partie d'un bloc :

````md
```ini{2}
[/Script/Mordhau.MordhauGameSession]
MaxSlots=64
ServerName=Mon serveur
```
````

### Windows et Linux côte à côte {#windows-and-linux-side-by-side}

Lorsqu'une étape diffère selon la plateforme, utilisez un groupe de codes plutôt que d'écrire la section deux fois :

````md
::: code-group

```powershell [Windows]
.\steamcmd.exe + connexion anonyme + app_update 629800 valider + quitter
```

```bash [Linux]
./steamcmd.sh + connexion anonyme+app_update 629800 validate +quit
```

:::
````

Le lecteur obtient les onglets et ne voit que celui dont il a besoin.

## Liens entre les pages {#links-between-pages}

Les liens internes partent du dossier de langue et laissent de côté le `.md` :

```md
[Required Tools](/en/contributing/tools)
[RCON Guide](/en/rcon-guide/)
```

Un chemin se terminant par `/` pointe vers le `index.md` de ce dossier.

::: warning
Écrivez des liens internes avec le chemin complet à partir de la racine du site, et non des liens relatifs comme `../tools`.Les liens relatifs se brisent dès qu'une page bouge, et ils se comportentdifféremment dans l’aperçu GitHub que sur le site.
:::

Lorsque vous créez un lien vers une page dans une section traduite, gardez le lecteur dans sa langue.À partir d'une page française, lien vers `/fr/rcon-guide/`, et non vers `/en/rcon-guide/`.

## Images {#images}

Mettez le fichier dans le même dossier que la page qui l'utilise et liez-le depuis la racine du site :

```md
![Server browser showing a custom server](/en/dedicated-server-guide/browser.webp)
```

Enregistrez les captures d'écran sous `.webp` lorsque vous le pouvez.Ils représentent une fraction de la taille du PNG avec la même qualité, et ce référentiel est déjà suffisamment grand.

## Ajout d'une nouvelle page {#adding-a-new-page}

La création du fichier ne représente que la moitié du processus : une page vers laquelle personne ne peut accéder pourrait tout aussi bien ne pas exister.

1. Créez le fichier `.md` dans le dossier de droite sous `docs/`.
2. Ouvrez `.vitepress/config.mts`.
3. Recherchez les paramètres régionaux auxquels vous ajoutez et ajoutez une entrée à son `nav` ou `sidebar` pointant vers votre page.
4. Exécutez `npm run docs:dev` et cliquez dessus.

Si votre page appartient à toutes les langues, ajoutez d'abord celle en anglais et laissez les autres aux traducteurs.Une page vide est pire qu'une page manquante.

## Style maison {#house-style}

- Un en-tête `#` par page, en haut, et il doit correspondre à ce que la barre latérale appelle la page.
- Ne sautez pas les niveaux de titre : un `###` doit se trouver sous un `##`, et non directement sous le `#`.
- Insérez une ligne vierge avant et après les en-têtes, les listes, les blocs de code et les légendes.Markdown pardonne cela jusqu'à ce que tout à coup ce ne soit plus le cas.
- Utilisez des backticks pour les noms de fichiers, les commandes, les clés de configuration et les valeurs.`Game.ini`, et non « Game.ini ».
- Laissez Prettier gérer l'enroulement des lignes.N'ajoutez pas de sauts de ligne manuels pour garder les lignes courtes.
