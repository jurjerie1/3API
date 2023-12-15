# Installation de l'API RailRoad

Suivez ces étapes pour installer l'API RailRoad sur votre machine.

## Sommaire

1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Utilisation](#utilisation)
5. [Documentation Swagger](#documentation-swagger)
6. [Contributeurs](#contributeurs)
7. [Licence](#licence)

## Prérequis

- Node.js
- npm

## Installation

1. Clonez RailRoad sur votre machine

    ```bash
    git clone https://github.com/jurjerie1/3API.git
    ```

2. Naviguez vers le répertoire du projet :

    ```bash
    cd 3API
    ```

3. Installez les dépendances du projet :

    ```bash
    npm install
    ```

## Configuration

1. Configurez les paramètres de l'API :

    - Ouvrez le fichier `config.js` dans le répertoire principal du projet.
    - Mettez à jour les options de configuration nécessaires telles que les détails de connexion à la base de données, les clés API, etc.

2. Lancez le serveur de l'API :

    ```bash
    npm start
    ```

3. L'API RailRoad devrait maintenant fonctionner sur `http://localhost:5000`.

## Utilisation

Pour utiliser l'API RailRoad, vous pouvez effectuer des requêtes HTTP aux points d'accès disponibles. Consultez la documentation Swagger de l'API pour plus de détails sur les routes disponibles et les formats de requête/réponse.

## Documentation Swagger

Accédez à la documentation Swagger en utilisant l'URL suivante : [http://localhost:5000/api-docs/](http://localhost:5000/api-docs/)

## Contributeurs

- Léonard Trève ([GitHub](https://github.com/Maddogos))
- Pierre Van Maele ([GitHub](https://github.com/jurjerie1))

## Licence

L'API RailRoad est open source et publiée sous la [Licence MIT](./LICENSE).
