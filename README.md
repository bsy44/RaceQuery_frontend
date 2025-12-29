# 🏎️ Race Query

Race Query est une petite app web permettant de suivre les saisons de Formule 1 de 2022 jusqu'à aujourd'hui. Que vous soyez un passionné, un néophyte ou tout simplement curieux, Race Query transforme la complexité des données de course en analyses visuelles intuitives et accessibles à tous.

## ⚙️ Fonctionnalités
- **Classement championnat Pilote et Constructeur** : Suivez l'évolution des points et des positions de la saison.
- **Calendrier et résultat** : Accès aux résultats des séances ou aux programmes des week-end (Essais libres, Qualification, Sprint et Grand-Prix).
- **Statistiques** : Fiches détaillées de la saison des pilotes et des écuries (résultats des courses des pilotes, nombre de pole position, de victoire etc..).

## 🔜 Fonctionnalités à venir
- **Face à Face Pilotes** : Comparaison des statistiques de la saison entre deux pilotes (Qui est meilleur en course, en qualif etc...).
- **Evolution au classement** : Graphique permettant de visualiser l'évolution au classement course après course.
- **Stratégie de course** : Analyse et comparaison des différentes stratégies de course (visualisation des relais de course,analyse du rythme...).
- **What if** : Supprimez un pilote ou une écurie et voyez si l'issue du championnat reste la même.

## 🛠️ Stack Technique
- **Frontend** : Angular 20+, TypeScript, HTML, CSS
- **Backend** : Flask (Python), FastF1 API, Pandas

## 🚀 Installation et Démarrage
### Prérequis
- **Node.js (v20+)**
- **Python 3.11+**

### Lancement du Frontend
1. Clôner le dépôt :

   ```bash
   git clone https://github.com/bsy44/RaceQuery_frontend.git
   ```
2. Installer les dépendances du frontend :

   ```bash
   npm install
   ```
3. Lancement du serveur en local :

   ```bash
   ng serve
   ```
Une fois que le serveur est en cours d’exécution, ouvrez votre navigateur et accédez à `http://localhost:4200/`. L’application se rechargera automatiquement chaque fois que vous modifiez l’un des fichiers sources.

## ⚠️ Important
Le site se lancera correctement mais il manquera les données qui se trouvent dans le Backend sur ce [dépôt](https://github.com/bsy44/RaceQuery). Suivez les instructions du Readme et assurez vous de configurez l'URL de votre API locale dans les fichiers d'environnements `src/environments/environment.ts` pour établir la liaison.

Par défaut, le frontend cherche l'API sur `http://127.0.0.1:5000`.

---

## 📄 Licence & Données
Projet réalisé dans un cadre pédagogique. Les données sont issues de la librairie [FastF1](https://docs.fastf1.dev/index.html).
