# Gestion des Recettes Kebab 🍖

Bienvenue dans le projet **"Gestion des Recettes Kebab"**. Cette application permet de gérer des recettes, de lancer des commandes, et de suivre les commandes en cuisine dans un environnement moderne et interactif.

---

## Fonctionnalités 🛠️

### 1️⃣ Ajouter une recette
- L'utilisateur peut ajouter une recette en entrant :
  - Le **nom de la recette**.
  - Les **ingrédients** (séparés par des virgules).
- Les recettes ajoutées sont affichées dans une liste et sauvegardées dans le navigateur.

### 2️⃣ Visualiser et supprimer une recette
- Les recettes ajoutées s'affichent dans une section dédiée.
- L'utilisateur peut supprimer une recette en cliquant sur un bouton.

### 3️⃣ Envoyer une commande en cuisine
- L'utilisateur peut sélectionner une recette existante et une sauce, puis envoyer la commande en cuisine.
- L'heure exacte de la commande est récupérée via une API d'heure (TimeAPI).
- Si l'API est indisponible, l'application utilise l'heure locale comme solution de repli.

### 4️⃣ Visualiser et valider une commande
- Les commandes envoyées sont affichées avec :
  - Le **nom de la recette**.
  - Les **ingrédients**.
  - La **sauce sélectionnée**.
  - L'**heure exacte de la commande**.
  - Un **chronomètre** qui affiche le temps écoulé depuis l'envoi.
- Un bouton permet de valider une commande pour la retirer de la liste.

### 5️⃣ Changer de thème (sombre/clair)
- Un bouton permet de basculer entre le **thème sombre** (par défaut) et le **thème clair**.
- Le choix du thème est sauvegardé dans le navigateur pour être appliqué au prochain chargement.

---

## Installation 🚀

1. **Télécharger le projet :**
   - Clone le dépôt ou télécharge les fichiers sources.

2. **Ouvrir le projet :**
   - Ouvre le fichier `index.html` dans ton navigateur pour exécuter l'application.

---

## Utilisation 📝

### 1. Ajouter une recette
- Remplis le nom et les ingrédients dans le formulaire de la section **"Ajouter une recette"**.
- Clique sur le bouton **"Ajouter"**.

### 2. Envoyer une commande
- Sélectionne une recette dans le menu déroulant.
- Saisis une sauce, puis clique sur **"Envoyer"**.

### 3. Valider une commande
- Consulte les commandes dans la section **"Commandes en cuisine"**.
- Clique sur **"✅ Valider"** pour marquer une commande comme terminée.

### 4. Changer de thème
- Clique sur le bouton en bas à droite pour basculer entre le **thème sombre** et le **thème clair**.

---

## Démo 🎥

Ajoute ici des captures d'écran ou un lien vers une vidéo/une démo du projet pour illustrer son fonctionnement.

---

## API utilisée 🌐

### TimeAPI
- URL : [https://timeapi.io](https://timeapi.io)
- Fonction utilisée : Récupérer l'heure exacte pour une commande via `Europe/Paris`.

---

## Améliorations possibles 🛠️

1. Ajouter une base de données pour sauvegarder les recettes et commandes sur le long terme.
2. Implémenter un système d'authentification pour gérer les utilisateurs (par exemple, un chef cuisinier).
3. Ajouter des animations pour rendre l'application encore plus interactive.
4. Améliorer l'accessibilité (prise en charge des lecteurs d'écran, navigation au clavier).

---

## Auteur 👨‍💻
- **Ton Prénom Nom**
- Contact : [Ton Email](mailto:tonemail@example.com)
- GitHub : [https://github.com/ton-repo](https://github.com/ton-repo)

---
