# *Zonzon's project management*

> The English version of this README file is available [here (external link to GitHub)](https://github.com/rifts-obsidian-laboratory/plugin-zonzons-project-management/blob/main/README.en.md).

*Zonzon's project management* est une extension pour ordinateur ajoutant un système de création et de gestion de projets avec des méthodologies traditionnelles et agiles. Elle permet de créer des projets avec un fichier de vue d'ensemble (`.md`), un tableau de bord (`.base`), ainsi que deux dossiers dédiés aux épopées et aux récits utilisateur dans le cas d'une gestion de projet agile.

## Installation

L'extension s'installe depuis la place de marché Obsidian comme toute autre extension.

Il est également possible de télécharger le dossier compressé `zonzons-project-management` dans la dernière *release* disponible sur le dépôt GitHub du projet. Une fois téléchargé, vous pouvez décompresser ce dossier et transférer le dossier décompressé le dossier `plugin/` dans votre coffre Obsidian. Actualiser ou redémarrer ensuite l'application Obsidian pour voir et activer l'extension.

## Démarrage

Les premiers pas pour prendre en main *Zonzon's project management* se font entièrement dans les paramètres de l'extension. Les paramètres sont découpés en quatre sections.

- Général ;
- Gestion de projet traditionnelle ;
- Gestion de projet agile ;
- Projets enregistrés.

Les paramètres mentionnés dans cette section ne sont pas exhaustifs, d'autres sont à découvrir. :3

### Général

#### Dossier de projets

Pour utiliser l'extension, il vous faudra choisir le dossier dans lequel vos projets seront entreposés grâce au paramètre « **Chemin du dossier de projets** ».

#### Fichier de vue d'ensemble d'un projet

*Zonzon's project management* vous permet également de créer automatiquement un fichier de vue d'ensemble (format `.md`) pour chaque nouveau projet. Pour utiliser cette fonctionnalité, il faut spécifier dans le champ adéquat le modèle à utiliser pour générer le fichier.

Le paramètre concerné est « **Chemin du modèle de vue d'ensemble du projet** ».

Depuis la version `2.0.0`, le paramètre « **Nom du fichier de vue d'ensemble du projet** » n'est plus disponible. Chaque fichier de vue d'ensemble généré a pour nom le nom du projet auquel il appartient. Cette modification a permis l'implémentation du système de rétroliens, sans cette dernière, les rétroliens pouvaient ne pas fonctionner correctement entre les projets : Ils pouvaient rediriger vers la note de vue d'ensemble d'un autre projet.

### Gestion de projet traditionnelle

#### Tableau de bord

Pour chaque nouveau projet ayant une gestion traditionnelle, il est possible de créer automatiquement un fichier de tableau de bord (format `.base`). Pour utiliser cette fonctionnalité, il faut spécifier dans les champs adéquats le nom du fichier, ainsi que le modèle à utiliser pour générer le fichier.

Les deux paramètres concernés sont « **Nom du fichier de tableau de bord** » et « **Chemin du modèle de tableau de bord** ».

### Gestion de projet agile

#### Tableau de bord

Pour chaque nouveau projet ayant une gestion agile, il est possible de créer automatiquement un fichier de tableau de bord (format `.base`). Pour utiliser cette fonctionnalité, il faut spécifier dans les champs adéquats le nom du fichier, ainsi que le modèle à utiliser pour générer le fichier.

Les deux paramètres concernés sont « **Nom du fichier de tableau de bord** » et « **Chemin du modèle de tableau de bord** ».

#### Épopées

Dans le cadre de la gestion de projet agile, *Zonzon's project management* permet de créer facilement des épopées (« *epics* » en anglais).

Pour utiliser cette fonctionnalité, il vous faudra choisir le dossier dans lequel les épopées d'un projet seront entreposées grâce au paramètre « **Nom du dossier des épopées** ».

Grâce au paramètre « **Chemin du modèle d'épopée** », il est possible de renseigner un modèle à utiliser pour générer l'épopée.

#### Récits utilisateur

Dans le cadre de la gestion de projet agile, *Zonzon's project management* permet de créer facilement des récits utilisateur (« *user stories* » en anglais).

Pour utiliser cette fonctionnalité, il vous faudra choisir le dossier dans lequel les récits utilisateur d'un projet seront entreposées grâce au paramètre « **Nom du dossier des récits utilisateur** ».

Grâce au paramètre « **Chemin du modèle de récit utilisateur** », il est possible de renseigner un modèle à utiliser pour générer le récit utilisateur.

### Identifiant de contenu

Initialement présent pour codifier les contenus en gestion de projet agile, *Zonzon's project management* implémente un système d'identifiant de contenu. 

Pour utiliser cette fonctionnalité, il vous faudra définir grâce au paramètre « **Nom de la propriété de l'identifiant** la propriété dans laquelle sera entreposé l'identifiant définit.

Il existe trois types d'identifiant. Les identifiants de projet doivent être uniques et sont choisis par l'utilisateur lorsqu'il crée un projet. Les identifiants d'épopée et de récit utilisateur sont générés automatiquement. Ils se basent sur le nombre d'épopées ou de récits utilisateur déjà présent dans un projet.

Ces derniers peuvent être préfixés à la volonté de l'utilisateur. Il vous faudra définir ces préfixes grâce aux paramètres « **Préfixe de l'identifiant de l'épopée** » et « **Préfixe de l'identifiant du récit utilisateur** ».

### Liens de contenu

*Zonzon's project management* permet de lier automatiquement les contenus entre eux à leurs créations respectives.

Pour utiliser cette fonctionnalité, il vous faudra définir les propriétés dans lesquelles doivent être entreposées les rétroliens générés. Les paramètres concernés sont « **Nom de la propriété de lien d'un projet** » et « **Nom de la propriété de lien d'une épopée**.

Un fichier de vue d'ensemble d'un projet sera lié dans chaque épopée et chaque récit utilisateur qui appartiennent audit projet. Une épopée sera quant à elle liée à chaque récit utilisateur qui appartient à ladite épopée.

### Projets enregistrés

Afin de garder une trace du type de chaque projet (agile ou traditionnel), ceux-ci sont enregistrés et affichés dans cette section des paramètres. Chaque élément de la liste est un projet et permet de modifier le type du projet, mais aussi de le supprimer. Pour éviter des suppressions accidentelles, une fenêtre modale s'ouvrira pour confirmer la suppression un projet.

### Marques substitutives

Afin de garder des modèles et de rendre des notes compréhensibles, détaillés et propres, *Zonzon's project management* ajoute plusieurs marques substitutives vous permettant d'utiliser certaines données de vos projets.

- `{{ epic-identifier }}` permet d'écrire automatiquement l'identifiant de l'épopée. ;
- `{{ project-identifier }}` permet d'écrire automatiquement l'identifiant du projet ;
- `{{ project-name }}` permet d'écrire automatiquement le nom du projet ;
- `{{ title }}` permet d'écrire automatiquement le titre. Par défaut, il utilise le nom du fichier, mais si un titre dans le texte est renseigné, celui-ci sera priorisé ;
- `{{ user-story-identifier }}` permet d'écrire automatiquement l'identifiant du récit utilisateur.

*Zonzon's project management* prend également en charge un type d'encadré particulier, *template-help*, celui-ci s'utilise comme un encadré classique :

```markdown
> [!template-help] Est-ce que les loutres sont mignonnes ?
> Oui. Sans aucun débat possible, elles le sont !
```

La seule différence avec un encadré classique, c'est que l'extension ne le recopiera pas dans les fichiers générés à partir d'un modèle le contenant. Il sert donc à inscrire des indications à propos de certaines sections de vos notes (Usages, valeurs par défaut, etc.). Utiles pour partager vos modèles ou y jeter un œil deux mois après les avoir écrits, parce que vous avez un doute.

## Licence & Compléments

Ce projet est maintenu sous la licence MIT.

Merci d'avoir lu jusqu'ici, j'ai développé cette extension en quelque jours pour répondre à un besoin personnel. Je l'ai rendu publique, parce que vous en avez peut-être besoin. N'hésitez pas à me faire des suggestions de fonctionnalité et à me rapporter d'éventuels bogues. Je ne garantis pas ajouter les fonctionnalités suggérées, dans la mesure où cette extension est avant tout là pour répondre à mes besoins personnels. J'espère que *Zonzon's project management* saura vous aider.
