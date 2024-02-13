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
- **dossier api**: récupération des routes de l'api-back. Permet de communiquer avec le serveur back-end afin d'accéder et de manipuler les données.
- **dossier assets**: les polices, logo et les images d'illustartions du front
- **dossier components**: utilisé pour organiser et regrouper les différents composants réutilisables de l'interface utilisateur. Chaque composant représente généralement une partie de l'interface utilisateur.
**article-product.jsx** permet d'afficher la description de chaque bière et permet de rajouter la quantité que l'on souhaite dans le panier.
**checkout-form.jsx** stocke la fonction de gestion du paiement via stripe.
**popup.jsx** va servir à afficher les popup lors de l'ajout d'une bière.
- **dossier containers**: utilisé pour regrouper les composants qui sont chargés de la logique d'interaction avec les données via des appels à l'API ou à un état global (Redux).
- **dossier helpers**: regroupe les fonctions utilitaires communes à différentes parties de l'application. On y retrouve le fichier **require-data-auth.jsx** qui est utilisée pour vérifier si un utilisateur est authentifié avant de lui permettre l'accès à certaines parties de l'application. Elles encapsulent donc la logique d'authentification.
- **dossier slices**: regroupe les "slices" ou les tranches de l'état global de l'application géré par Redux et le **store.jsx** qui centralise et gére l'état global de l'application.
**userSlice.jsx** permettent de gérer les informations sur l'utilisateur ou administrateur connecté, y compris les actions pour se connecter, se déconnecter, mettre à jour les informations utilisateur ou administrateur, etc.
**beerSlice.jsx** permet de gérer les produits.
**basketSlice** gère l'état global spécifique au panier. Ce fichier est ensuite importé dans le store Redux de l'application pour être inclus dans l'état global et utilisé par les composants pour gérer l'état du panier. Le fichier basketSlice.jsx va être utilisé pour le panier et dans le Header (pour afficher le nombre de bières à côté de l'icône panier) 
- **config.js**: stocke l'URL de base de l'API et l'URL API pour afficher les images
- **App.js**: c'est le point d'entrée principal de l'application. On y retrouve la structure de base de l'application, y compris les routes.

**ORGANISATION DU SITE :**

**Espace utilisateur :**

- Home: la page d'accueil.
- produits: liste de tout les produits disponibles.
- Il faut s'enregister ou de se connecter à son compte utilisateur afin de pouvoir passer commande.
- Ajout d'un produits: si la quantité en stock n'est pas suffisante un message s'affiche: "Veuillez choisir une quantitée inférieur ou égale à (la quantité en stock)".
- Une fois qu'on a terminé nos achats, on peut passer au paiement en validant le panier. Il faudra donc saisir le numéro de carte bancaire.

**Espace administrateur du site :**  
- Espace admin: espace de celui qui gère le site. Il peut ajouter, modifier ou supprimer une bière.

**QUELQUES CAPTURES D'ECRAN**

PAGE D'ACCUEIL(non connecté)
![accueil](https://github.com/Manuella81/beer4you/assets/101250152/c3a6fbc5-5e00-49a0-b975-c83e519b1ca1)

LISTE DES BIERES
![produits](https://github.com/Manuella81/beer4you/assets/101250152/3c1a956d-7518-45de-af94-596880c466a9)

FORMULAIRE D'ENREGISTREMENT D'UN NOUVEL UTILISATEUR
![s_enregistrer](https://github.com/Manuella81/beer4you/assets/101250152/010b7ce9-a2c4-4064-b99d-6a12919dd905)

FORMULAIRE DE CONNECTION
![se_connecter](https://github.com/Manuella81/beer4you/assets/101250152/a3ae1612-a6d6-4399-8d43-eaf1f25d4e35)

PAGE D'ACCUEIL(connecté)
![home_connected](https://github.com/Manuella81/beer4you/assets/101250152/898a437e-f456-4ea5-9f93-d118a71bdff2)

RAJOUTER UNE BIERE DANS SON PANIER
![add_beer](https://github.com/Manuella81/beer4you/assets/101250152/5552959f-6fcb-477d-a325-28e23c982754)

PANIER
![panier](https://github.com/Manuella81/beer4you/assets/101250152/7625ffa2-5dfa-4b8c-8d8b-9e10017a9bc4)

PAIEMENT
![payment](https://github.com/Manuella81/beer4you/assets/101250152/c07180a4-4d57-41d8-94d8-7d10545cba19)

ESPACE ADMINISTRATEUR
![admin](https://github.com/Manuella81/beer4you/assets/101250152/90e62ef0-43dc-4dbf-97bc-20a303f4dc3e)

RAJOUTER UNE BIERE
![admin_add_beer](https://github.com/Manuella81/beer4you/assets/101250152/027e5e70-e73a-4627-b9ac-1f2f7637d5cd)

MODIFIER UNE BIERE
![edit_beer](https://github.com/Manuella81/beer4you/assets/101250152/fa78462f-da60-4e58-ad48-05d78cb1adaf)



