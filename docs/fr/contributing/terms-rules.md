# Conditions et règles de contribution {#contribution-terms-rules}

Rien ici n'est compliqué.Il s'agit principalement d'une liste de choses qui évitent aux personnes qui examinent votre demande de tirage d'avoir à demander.

## Écriture {#writing}

**Écrivez pour quelqu'un qui n'a jamais fait cela auparavant.** La raison pour laquelle ce projet existe est que la documentation Mordhau existante suppose que vous connaissez déjà la réponse.Si une étape nécessite un prérequis, dites-le.

**Soyez précis.** "Modifier le fichier de configuration" n'est pas utile."Ouvrir `Mordhau/Saved/Config/LinuxServer/Game.ini`" est.

**Dites lorsque vous n'êtes pas sûr.** Une note indiquant qu'une valeur n'a pas été testée est bien meilleure qu'un mauvais chiffre sûr.Quelqu'un viendra le confirmer.

**Conservez la structure existante.** Si une section a déjà un modèle, suivez-le plutôt que d'en inventer un nouveau sur votre page.

## Précision {#accuracy}

Testez ce que vous écrivez.Si vous documentez une commande, exécutez-la.Si vous documentez une clé de configuration, placez-la dans un vrai `Game.ini` et démarrez le serveur.

Si vous avez obtenu les informations ailleurs (un autre site, un message Discord, la base de connaissances d'un fournisseur d'hébergement), associez-les.À la fois pour que les lecteurs puissent approfondir et pour que la personne suivante puisse dire à quel point il est obsolète.

Les mises à jour du jeu rompent la documentation.Si vous remarquez une page décrivant quelque chose qui ne correspond plus au jeu, la corriger compte comme une contribution.

## Contenu {#content}

- Ne copiez et ne collez pas de texte provenant d'autres sites.Créez un lien vers eux ou écrivez-le dans vos propres mots.
- Pas de triche, d'exploit ou quoi que ce soit qui enfreigne les conditions de service du jeu.
- Pas de publicité.La liste des fournisseurs de serveurs existe parce que la communauté utilise ces hôtes, et non parce que quelqu'un a payé pour un emplacement.
- Les captures d'écran sont les bienvenues.Recadrez tout ce qui est personnel avant de télécharger.

## Pull request {#pull-requests}

Conserver une pull request sur un sujet.Un PR qui corrige une faute de frappe et réécrit également la page RCON est difficile à réviser et difficile à revenir.

Donnez-lui un titre qui indique ce qui a changé."Mise à jour" ne dit rien au critique.

Exécutez le site localement avant de le soumettre :

```bash
npm run docs:dev
```

Vérifiez que votre page s'affiche, que vos liens vont là où vous pensez qu'ils vont et que rien d'autre n'est cassé.

Si la révision revient avec des demandes de modification, il ne s'agit pas d'un rejet.Poussez un autre commit vers la même branche et la demande d'extraction se met à jour d'elle-même.

## Comportement {#behaviour}

Soyez civil.Les gens ici sont des bénévoles qui rédigent la documentation d'un jeu pendant leur temps libre, dans une langue qui n'est souvent pas leur langue maternelle.Corrigez le contenu, pas la personne.

## Licence {#licence}

Vous conservez les droits d'auteur sur ce que vous écrivez.En contribuant, vous accordez une licence, à ce projet et à tous les autres, sous [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), et votre crédit est enregistré dans l'historique des validations.

Ne contribuez pas à quelque chose que vous n'avez pas le droit de publier.
