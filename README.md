**BEER4YOU**

Bienvenue dans le projet beer4you. Il s'agit de'un site de vente de bières fictif avec possibilité de paiement en ligne.
Le code respecte l'architecture MVC. Utilisation de react.js en front et de node.js pour le back. Connection à une base de données mysql.
Utilisation de react redux pour la gestion des tranches de l'état globale de l'application.

**ORGANISATION DU CODE :**

Le dossier api-back gère le backend:
- Le serveur Express est configuré dans le fichier **server.js**. Il permet de démarrer le serveur et configurer les routes et les middlewares nécessaires pour répondre aux requêtes des clients.
- Dans le **dossier public** on a un dossier images qui contient toutes les bières. Ce sont les ressources statiques.
- Le **dossier models** contient les fichiers qui gèrent toutes les interactions avec la base de données. Ces fichiers encapsulent les logiques d'accès aux données. Manipulation des données avec le CRUD (Create, Read, Update, Delete)
- Le **dossier routes** contient toutes les routes qui va permettre à mon API de répondre à mes requêtes HTTP. Ces routes définissent quelles actions doivent être prises en réponse à différentes méthodes HTTP telles que GET, POST, PUT, DELETE, etc. Elles définissent donc les points d'entrée de l'API et spécifient comment les requêtes HTTP entrantes doivent être gérées par le serveur.
- Utilisation du middlewares **withAuth.js** pour les routes protégées, c'est à dire lorsque l'utilisateur doit être connecté. Elle permet donc de définir et gérer les routes liées à la gestion des utilisateurs de l'API.
- Dans **config.js** et **config.exemple** sont stockés les variables de configuration de la base de données.


Le dossier b4y-front gère tout le front:

**ORGANISATION DU SITE :**

**ESPACE ADMINISTRATEUR DU SITE :**

**QUELQUES CAPTURES D'ECRAN**
