# MordhauSDK Guide {#mordhausdk-guide}

L'**Éditeur Mordhau** est l'outil officiel permettant de créer des cartes et des modes de jeu personnalisés pour Mordhau.Il s'agit d'une version de Unreal Engine avec les ressources et le code du jeu de Mordhau chargés, vous travaillez donc avec les armes, les personnages et le gameplay réels plutôt qu'avec des approximations.

Triternion l'a publié le 14 décembre 2021. Les membres de la communauté l'appellent généralement le SDK.

::: warning
Cette page est une orientation et non un didacticiel complet.Le modding Mordhau n’est bien documenté nulle part, ce qui est exactement la lacune que ce site existe pour combler – mais pour le remplir correctement, il faut des personnes qui ont réellement expédié une carte.Si tel est votre cas, [Veuillez contribuer](/fr/contributing/methods).Nous préférons publier vos notes brutes plutôt qu'une page soignée écrite par quelqu'un qui devine.
:::

## Ce que vous pouvez créer {#what-you-can-make}

- **Cartes** — nouveaux niveaux pour les modes existants
- **Modes de jeu** — règles et objectifs personnalisés
- **Cosmétiques et actifs** — modèleset les matériaux introduits dans le jeu.

Les mods sont distribués via **mod.io**, qui est également ce que lit le navigateur de mods du jeu.Les joueurs s'y abonnent et le jeu télécharge le contenu.

## Comment l'obtenir {#getting-it}

Vous devez posséder Mordhau.L'éditeur est un téléchargement distinct qui apparaît dans votre bibliothèque Steam sous **Outils** : remplacez le filtre de bibliothèque par Outils ou recherchez "Mordhau" avec les outils inclus et installez-le à partir de là.

::: tip
Il est grand.Il s'agit d'un éditeur Unreal Engine complet ainsi que de la bibliothèque d'actifs du jeu, doncprévoyez beaucoup plus d'espace disque que le jeu lui-même n'en prend et attendez-vous à ce que le premier lancement reste longtemps à compiler des shaders.C'est normal et c'est plus rapide ensuite.
:::

## Avant de commencer {#before-you-start}

L'éditeur est Unreal Engine.Presque tout ce que vous devez apprendre est une connaissance générale d'Unreal, et non des connaissances spécifiques à Mordhau : l'éditeur de niveau, le système matériel, l'éclairage, les plans et le fonctionnement de l'emballage sont tous standard.

C'est une bonne nouvelle : il existe une énorme quantité de documents Unreal Engine, et la plupart d'entre eux s'appliquent.La partie spécifique au Mordhau est relativement petite : savoir sur quelles classes existantes du jeu s'appuyer et comment créer un package pour mod.io.

Les outils de la communauté ont généralement suivi **Unreal Engine 4.26**, donc lorsque vous recherchez des didacticiels, le matériel UE4 correspondra bien mieux à ce que vous voyez que le matériel UE5.

Si vous n'avez jamais ouvert Unreal auparavant, suivez d'abord un didacticiel général de conception de niveaux pour débutants.Apprendre le moteur et apprendre les spécificités du Mordhau en même temps est une mauvaise expérience.

## Un flux de travail approximatif {#a-rough-workflow}

En gros, la création d'une carte se déroule comme suit :

1. Installez l'éditeur à partir des outils Steam et laissez-le terminer son premier lancement.
2. Créez un nouveau niveau ou ouvrez l'une des cartes fournies pour voir comment il est assemblé.
3. Construisez votre géométrie, votre éclairage et vos points d'apparition.
4. Configurez le mode de jeu et les objectifs pour les modes que vous souhaitez qu'il prenne en charge.
5. Testez-le localement.
6. Emballez-le et téléchargez-le sur mod.io.
7. Chargez-le sur un [serveur dédié](/fr/dedicated-server-guide/) pour que d'autres personnes puissent y jouer.

Ouvrir les cartes officielles est véritablement le moyen le plus rapide d'apprendre.Il s'agit de la meilleure documentation qui existe sur la façon dont un niveau Mordhau est censé être assemblé.

## Où obtenir de l'aide {#where-to-get-help}

Parce que si peu de choses sont écrites, la plupart des connaissances sur le modding Mordhau se trouvent dans les conversations.

- La **communauté de modding **Mordhau sur Discord** est l'endroit où parlent les personnes qui créent réellement des cartes.Demandez là.
- [Mordhau Série de tutoriels Mapping & Modding](https://www.youtube.com/watch?v=kA_BYvN4cfA) sur YouTube — une série de vidéos communautaires couvrant les bases
- [mod.io](https://mod.io) — parcourez ce que d'autres personnes ont publié et regardez comment ils décrivent leurs configurations
- [Unreal Engine documentation](https://dev.epicgames.com/documentation/en-us/unreal-engine) — pour tout ce qui est vraiment une question de moteur plutôt qu'uneQuestion Mordhau
- Notre propre [Discord](https://discord.gg/zuX58yRV84)

## Aidez-nous à terminer cette page {#help-us-finish-this-page}

L'état honnête des choses : personne n'a écrit un modding Mordhau approprié de bout en boutguide, et cette page n’en est pas encore une.

Si vous avez réalisé une carte, même mauvaise, vous savez des choses qui ne sont écrites nulle part.Les paramètres exacts de l'emballage.De quelle classe hériter pour un mode personnalisé.Ce que fait l'éditeur en cas d'échec et pourquoi.Tout cela vaut plus qu’un autre aperçu.

Ouvrez un [Numéro](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) ou collez-le dans le Discord et nous vous aiderons à le transformer en page.Les notes brutes sont très bien – nous nous occuperons du formatage.
