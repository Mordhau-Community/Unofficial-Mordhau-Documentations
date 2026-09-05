# Acteurs {#actors}

Un **acteur** (Actor) est tout ce qui existe dans un niveau : un mur, une lumière, un point d'apparition, un point de capture, un cheval. Si vous pouvez le sélectionner dans la fenêtre de rendu et qu'il possède une position, une rotation et une échelle, c'est un acteur.

L'éditeur est Unreal Engine 4, donc la majeure partie de ce que vous placez est du UE4 standard — maillages, lumières, volumes, navmesh — et n'importe quel tutoriel UE4 s'y applique tel quel. Ce qu'aucun tutoriel UE4 ne couvre, c'est la poignée de classes que Triternion a écrites pour les cartes de Mordhau. C'est le sujet de cette page, parce que c'est la partie que vous ne trouverez nulle part ailleurs.

::: warning
Les noms et propriétés ci-dessous proviennent des classes de Mordhau telles qu'elles sont exposées aux moddeurs. Triternion change des choses d'un patch à l'autre, et votre Content Browser fait toujours autorité : si quelque chose ici ne correspond pas à ce que l'éditeur vous montre, faites confiance à l'éditeur et [dites-le-nous](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) pour que nous corrigions la page.
:::

## Placer et configurer un acteur {#placing-and-configuring-one}

Deux façons d'entrer, toutes deux standard sous Unreal :

- Le panneau **Place Actors** — pour les primitives du moteur : lumières, volumes, géométrie, caméras.
- Le **Content Browser** — pour tout ce que Mordhau fournit. Cherchez la classe ou le Blueprint, puis glissez-le dans la fenêtre de rendu.

Une fois dans le niveau, sélectionnez-le : le panneau **Details** à droite liste ses propriétés. Y modifier une valeur ne change *que cette copie placée* — l'instance, pas la classe. C'est tout le principe des objectifs : vous placez le même `ControlPoint` cinq fois et donnez à chaque copie un nom, une zone de capture et une liste de prérequis différents.

Si vous voulez qu'un changement s'applique partout où l'acteur est utilisé, vous ne configurez plus une instance : il vous faut une [sous-classe Blueprint](/fr/mordhauSDK-guide/blueprints).

::: danger Vérifiez dans quel niveau vous placez
Une carte Mordhau est un niveau de base plus un sous-niveau par mode de jeu. Dans la fenêtre **Levels**, le niveau surligné en bleu est celui que vous éditez, et tout ce que vous déposez dans la scène y atterrit.

Placer les points de capture de Frontline alors que le niveau de base est sélectionné est l'erreur classique du débutant — les objectifs existent alors dans tous les modes qui chargent la carte de base. Un clic droit dans la scène → **Move Selected Actors to Level** corrige le tir après coup. La [structure en sous-niveaux](/fr/mordhauSDK-guide/blueprints#sublevels) est décrite sur la page Blueprints.
:::

## Points d'apparition — `MordhauPlayerStart` {#spawns-mordhauplayerstart}

Le remplaçant du `PlayerStart` d'UE4. Toute carte en a besoin, dans chaque sous-niveau de mode.

| Propriété | Rôle |
| --- | --- |
| `Team` | Quelle équipe peut utiliser ce point. Un entier ; la valeur par défaut de la classe est `5`. Pour savoir quels nombres un mode attend, ouvrez une carte officielle et regardez. |
| `bIsSpawnDisabled` | Désactive le point. Les modes à objectifs basculent cette valeur en cours de partie, à mesure que la ligne de front bouge. |
| `Token` | Une étiquette de regroupement. `ControlPoint` possède des valeurs `SpawnsTeam` et `SpawnsToken` correspondantes : c'est ainsi qu'un point capturé prend possession d'un groupe entier de points d'apparition d'un coup. |

Il expose aussi deux événements que vous pouvez implémenter dans une sous-classe Blueprint :

- `IsAllowedSpawnFor(Controller)` — renvoie si ce joueur a le droit d'utiliser ce point
- `GetSpawnPreferenceFor(Controller)` — renvoie un score ; le mode préfère les points au score le plus élevé

C'est le mode de jeu qui les appelle, via ses propres `IsSpawnpointAllowed` et `GetSpawnpointPreference`. Si vous voulez une logique d'apparition inhabituelle — apparaître près de son escouade, loin des ennemis — c'est dans ces deux événements qu'elle se met.

## Objectifs de capture — `ControlPoint` {#capture-objectives-controlpoint}

L'acteur derrière les points de Frontline et d'Invasion. Il contient déjà l'essentiel de la logique d'objectif ; l'auteur de la carte remplit surtout des propriétés.

| Propriété | Rôle |
| --- | --- |
| `Name` | Le libellé affiché aux joueurs sur le point et dans la barre supérieure |
| `CaptureArea` | Le composant de collision dans lequel il faut se tenir pour capturer |
| `bIsCapturable` | S'il peut être pris — utile pour les points décoratifs ou scriptés |
| `bIsHiddenPoint` | Le retire de l'interface tout en le gardant fonctionnel |
| `Team1PrerequisitePoints` / `Team2PrerequisitePoints` | Tableaux d'autres `ControlPoint` à posséder d'abord. C'est ainsi qu'une ligne de Frontline est ordonnée, et qu'on empêche une équipe de sauter directement au dernier point |
| `SpawnPoints` | Les `MordhauPlayerStart` que ce point transfère quand il change de main |
| `SpawnsTeam`, `SpawnsToken` | Quelle équipe et quel groupe d'apparition le point contrôle |
| `bPreventSpawningIfContested` | Empêche l'apparition sur un point tant que des ennemis s'y trouvent |
| `CaptureSpeedCurve`, `NeutralizeSpeedCurve`, `UncaptureSpeed` | La vitesse de capture, sous forme de courbe dépendant du nombre de joueurs présents |
| `AwardScoreCapturing`, `AwardScoreCaptured`, `AwardScoreNeutralizing`, `AwardScoreNeutralized`, `AwardScoreInterval` | Points accordés pour le travail d'objectif |
| `Banners` | Les acteurs `CapturePointBanner` qui changent visuellement de camp avec le point |

`CapturePointBanner` existe en version static mesh et skeletal mesh (`StaticMeshCapturePointBanner`, `SkeletalMeshCapturePointBanner`). Placez-les, puis ajoutez-les au tableau `Banners` du point — ils s'animent avec la progression de capture, sauf si vous cochez `bBannersDoNotAnimateCaptureProgress`.

## Objectifs à pousser — `PushableActor` {#push-objectives-pushableactor}

Le chariot, le bélier, tout ce qu'une équipe pousse le long d'un chemin.

| Propriété | Rôle |
| --- | --- |
| `PushArea` | Le volume dans lequel il faut se trouver pour pousser |
| `Team1PushSpeedByPushers` / `Team2PushSpeedByPushers` | Courbes : vitesse en fonction du nombre de pousseurs |
| `bIsPushingAllowed`, `bIsPullingAllowed` | Quelles directions sont autorisées, selon la phase |
| `bStopPushingIfContested` | Le fige quand les deux équipes sont dessus |
| `bAutoMoveIfAlone`, `AutoMoveSpeed` | Le laisse avancer tout seul |
| `Progress` | 0–1 le long de son chemin ; `SetProgress` le déplace depuis un script |
| `ProgressStepToAwardScoreFor`, `ScoreAwardedPerProgressStep` | Score accordé pour la poussée |

## Des maillages qui se comportent comme ceux de Mordhau — la famille `MordhauActor` {#meshes-that-behave-like-mordhaus-the-mordhauactor-family}

`MordhauActor` est la base des props qui participent au combat. Par rapport à un `AActor` classique, il ajoute un `DamageableComponent` et les propriétés de son d'impact (`ThudSound`, avec ses plages de hauteur et de volume) qui font qu'un coup sonne comme dans Mordhau plutôt que comme rien du tout.

- `StaticMeshMordhauActor` — un static mesh qui peut subir des dégâts. Utilisez-le, et non un `StaticMeshActor` nu, dès que les joueurs doivent pouvoir frapper ou détruire l'objet.
- `SkeletalMeshMordhauActor` — la même chose pour les skeletal meshes.
- `LODStaticMeshActor` — un static mesh utilisant le composant LOD de Mordhau. Bon à connaître quand une carte commence à coûter des images par seconde.

## Des props qui bougent — `EnvironmentMovable` {#props-that-move-environmentmovable}

Le balancement des bannières, enseignes suspendues, cordes et tout ce qui ne doit pas paraître rigide. Vous lui donnez un `SwayingComponent`, puis des vecteurs `Frequency`, `Magnitude` et `Speed` en roulis/tangage/lacet — ou vous appelez `InitializeMovable` pour tout régler d'un coup.

## Zones temporisées — `MasterField` et `SubField` {#timed-areas-masterfield-and-subfield}

Un `MasterField` possède un ensemble de volumes `SubField` et les pilote comme un tout : `FieldLifeTime`, `FieldDeactivationTime`, `FieldFadeOutTime`, un `CollisionFilter` de classes qui l'intéressent, et les événements `CreateField`, `BeginFieldDeactivation`, `DeactivateAndDestroyField`. `FieldSpawnComponent` est la pièce qui place des choses à l'intérieur d'un champ, avec accrochage au sol (`bSnapLocationToGround`, `SnapGroundRadius`, `MaxAllowedRotation`) et un test de ligne de vue optionnel.

C'est la mécanique derrière les zones qui apparaissent, rétrécissent et expirent au chronomètre. C'est aussi le coin le moins documenté du SDK — si vous vous en êtes servi pour de vrai, vos notes nous intéressent beaucoup.

## Véhicules et engins de siège {#vehicles-and-siege-equipment}

`Horse`, `Catapult` et `Turret` (la baliste) sont des acteurs plaçables, mais **leur temps de réapparition ne vit pas sur l'acteur** : il vit sur le mode de jeu, sous les noms `HorseRespawnTime`, `CatapultRespawnTime` et `BallistaRespawnTime`. Les administrateurs de serveur les reconnaissent, car ce sont exactement les valeurs que l'on met dans [`Game.ini`](/fr/dedicated-server-guide/).

## Les bots ont besoin d'un navmesh {#bots-need-a-nav-mesh}

Tout ce qui contient de l'IA — Horde en particulier — a besoin d'un `NavMeshBoundsVolume` couvrant la zone jouable, puis d'un passage **Build Paths**. C'est de l'Unreal ordinaire, mais c'est la première raison pour laquelle les bots restent plantés sur une carte personnalisée.

## Le reste, en bref {#the-rest-briefly}

| Classe | En gros |
| --- | --- |
| `ProgressActor`, `ProgressDriver`, `SlaveProgressDriver` | Acteurs pilotés par une valeur de progression d'objectif ; portes, herses et objectifs par étapes |
| `MapCameraActor` | Caméra pour les vues de carte plutôt que pour le jeu |
| `ParticleSystemActor`, `GoreActor` | Acteurs d'effets que le jeu fait apparaître |
| `MordhauEquipment`, `MordhauWeapon`, `MordhauShield`, `MordhauProjectile`, `Quiver` | Tout ce qu'un joueur peut tenir — voir [Blueprints](/fr/mordhauSDK-guide/blueprints#weapons-equipment-and-bots) |
| `BuildingSystemComponent` et les classes `Buildable*Trace` | Le système de construction de la boîte à outils |

## Aidez-nous à finir cette page {#help-us-finish-this-page}

Cette page est assemblée à partir des classes exposées du jeu, des outils communautaires et des cartes officielles — pas d'un manuel, puisqu'il n'y en a pas. Si vous avez construit des objectifs dans l'éditeur et que vous savez quelles valeurs un mode attend réellement, ce savoir vaut plus que tout ce qui est écrit ici. [Ouvrez une issue](https://github.com/Mordhau-Community/Unofficial-Mordhau-Documentations/issues) ou déposez vos notes sur le [Discord](https://discord.gg/zuX58yRV84), nous nous chargeons de la mise en forme.
