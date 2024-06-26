
  

# learning-campus-rent

  

Projet d'API de location de voiture en Node pour la formation learning campus

  
  
  
  

#Spécifications fonctionnelles :

  
  
  

## Interface prestataire (API) :

  
  
  

- List item

  

- Inscription/Connexion sécurisée.

  

- Ajout, modification, et suppression de véhicules à louer.

  

- Classification des véhicules par catégories (ex. : voiture, moto, vélo).

  
  
  

## Interface locataire (API) :

  
  
  

- Inscription/Connexion sécurisée.

  

- Consultation des véhicules disponibles, organisés par catégories.

  

- Consultation des détails d'un véhicule et ajout des commentaires

  

- Demande de location

  
  
  

## Fonctionnalités Backend :

  
  
  

- Gestion sécurisée des utilisateurs et des sessions via JWT (JSON Web Tokens).

  

- Interface administrateur pour la supervision des utilisateurs et des annonces.

  

- Notifications pour les demandes de location et les mises à jour des statuts.

  

## Contraintes :

  

- Utilisation obligatoire de Node.js pour le backend et MongoDB pour la base de données.

  

- Authentification et gestion des sessions via JWT.

  

- Le service doit être conçu pour être testé avec Insomnia ou Postman (sans interface front-end).

  

- Veiller à la sécurité des données utilisateurs.

  

## Installation :

  

1. Cloner le projet

2. Installer les dépendences : `npm install``

3. Ajouter un fichier `.env` à la racine puis y ajouter les informations nécéssaires :
````
DB_NAME="nom_de_la_bdd_mangodb"

DB_PWD="mdp_de_la_bdd"

TOKEN_KEY="cle_pour_les_jwt"
````

## Notes :

- Lien du diagramme de classes : https://drive.google.com/file/d/1RPqaFBwR6dgRnyoH1iLkOzkTCbq8nlXQ/view?usp=sharing
- Pour créer un administrateur, attribuer {status: 1} à l'utilisateur en base
- url prod : https://learning-campus-rent.onrender.com (note : si le serveur est en idle, la première requête peut prendre jusqu'à une minute)
- url doc swagger : https://learning-campus-rent.onrender.com/api-docs/
