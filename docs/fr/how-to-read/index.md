---
layout: doc
sidebar: false
aside: false
---

# Comment lire nos guides {#how-to-read-our-guides}

Une courte page sur la façon dont ce site est conçu, afin que vous puissiez trouver des informations rapidement et savoir ce que signifient les cases et les onglets.

## Comment c'est organisé {#how-it-is-organised}

La barre supérieure se divise en deux moitiés.

**Les informations** concernent le projet : qui nous sommes, pourquoi Mordhau en avait besoin et comment contribuer.

**Guides** est la documentation elle-même, et elle est regroupée selon à qui elle est destinée.Les guides du joueur couvrent le jeu.Les guides des développeurs et des moddeurs couvrent les serveurs en cours d'exécution, RCON, le SDK et ce qu'il faut faire en cas de panne.

La barre latérale de gauche apparaît sur les pages appartenant à une série, comme la section contributive.S'il n'y a pas de barre latérale, la page est autonome.

À droite, le plan répertorie les titres de la page en cours.Sur une longue page comme le guide du serveur, c'est le moyen le plus rapide d'accéder à la pièce dont vous avez besoin.

## Recherche {#search}

La loupe dans la barre supérieure, ou <kbd>Ctrl</kbd> + <kbd>K</kbd>, recherche le texte intégral de chaque pagedans la langue que vous lisez actuellement.Si vous connaissez le nom d'une clé de configuration ou d'une commande, recherchez-la directement.

## Langues {#languages}

L'icône de langue change de langue.Toutes les pages n'existent pas encore dans toutes les langues : l'anglais est le plus complet et les autres sont complétées au fur et à mesure que les gens les traduisent.Si une page n'a pas été traduite, vous reviendrez sur la version anglaise.

Combler l'une de ces lacunes est véritablement utile, et [contribuer à une traduction](/fr/contributing/methods)ne nécessite aucune connaissance technique autre que parler la langue.

## Mode lecture {#read-mode}

Le bouton **Mode lecture** sous la barre supérieure masque la barre, la barre latérale et le contour
, ne laissant que l'article.Appuyez à nouveau pour les ramener.

## Signification des cases {#what-the-boxes-mean}

Des panneaux colorés apparaissent tout au long des guides et ne constituent pas une décoration : la couleur vous indique l'attention à accorder.

::: info
Contexte.Utile à savoir, mais vous pouvez continuer sans.
:::

::: tip
Conseils.Généralement un raccourci, ou la façon dont nous le ferions.
:::

::: warning
Lisez celui-ci.Il marque les endroits où les gens se trompent généralement.
:::

::: danger
Quelque chose qui brisera votre serveur, perdra votre configuration ou l'exposera à des inconnus.Ne survolez pas une case rouge.
:::

## Blocs de code {#code-blocks}

Tout ce qui est dans un bloc gris doit être tapé ou collé exactement tel qu'écrit :

```bash
./steamcmd.sh +login anonymous +app_update 629800 validate +quit
```

Lorsqu'une étape est différente sur Windows et Linux, vous obtenez des onglets.Cliquez sur celui qui correspond à votre machine : les onglets ne sont pas deux moitiés de la même instruction, ce sont la même instruction écrite deux fois.

::: groupe de codes

```powershell [Windows]
.\MordhauServer.exe
```

```bash [Linux]
./MordhauServer.sh
```

:::

Les valeurs que vous devez remplacer sont nommées pour ce qu'elles sont.`RconPassword=a-different-long-password` signifie mettre le vôtremot de passe là-bas, pas cette chaîne littérale.

`Inline code` marque les noms de fichiers, les clés de configuration, les commandes et les chemins – tout ce où les caractères exacts comptent.

## Suivant un guide {#following-a-guide}

Travaillez de haut en bas.Le guide du serveur en particulier s'appuie sur lui-même : il installe SteamCMD, puis télécharge le serveur, puis le démarre une fois pour générer la configuration, puis édite cette configuration.Passer à la section de configuration ne fonctionnera pas, car le fichier n'existe pas encore.

Si une étape ne fait pas ce que la page indique, consultez la section de dépannage en bas avant de supposer que vous l'avez mal fait.La plupart des entrées existent parce que c'est arrivé à l'un de nous.

## Lorsqu'une page est erronée {#when-a-page-is-wrong}

Cela arrive.Mordhau est corrigé, les hôtes modifient leurs panneaux et les pages deviennent obsolètes.

Si quelque chose ici ne correspond pas à la réalité, dites-le-nous.Le lien **Modifier cette page** au bas de chaque page l'ouvre directement dans GitHub, ou vous pouvez ouvrir un [Numéro](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) ou dire quelque chose dans le [Discord](https://discord.gg/zuX58yRV84).Une correction de la part de quelqu'un qui vient de rencontrer le problème vaut plus que tout ce que nous pourrions deviner.
