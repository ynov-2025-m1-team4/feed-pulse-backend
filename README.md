<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description
A template for our next NestJs projects.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test with a local database
Just update the `docker-compose.yaml` and run the following command:
```bash
docker compose -f docker-compose.yaml --env-file <your_env> up -d
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# 📊 FeedPulse

FeedPulse est une plateforme de centralisation et d’analyse en temps réel des retours clients provenant de différentes sources (emails, formulaires, réseaux sociaux, Google Reviews, etc.). Elle permet aux entreprises d’identifier rapidement les sentiments exprimés, les thématiques abordées et les canaux les plus utilisés, tout en déclenchant des alertes sur des points critiques.

🔗 Démo : https://feedpulse.netlify.app  
🔗 API Backend : https://feed-pulse-backend.onrender.com  
🔗 API Producer : https://feedback-producer.onrender.com/feedbacks  
📚 Swagger Backend : https://feed-pulse-backend.onrender.com/api/docs  
📚 Swagger Producer : https://feedback-producer.onrender.com/api  

---

## 🚀 Fonctionnalités

- Authentification sécurisée (JWT)
- Connexion de flux de feedback externes via URL
- Polling automatique
- Analyse de sentiment (score entre -1 et 1)
- Extraction des thèmes évoqués
- Dashboard utilisateur avec visualisation des métriques

---

## 🧱 Stack technique

- Backend : NestJS
- Base de données : MongoDB
- Frontend : Next.js
- Déploiement : Render (API) + Netlify (Frontend)
- IA : DeepSeek API pour sentiment analysis et extraction de thèmes

---

## 🗃️ Structure de la base de données

```json
// Users
{
  _id: ObjectId,
  email: string,
  password: string,
  createdAt: Date
}

// Providers
{
  _id: ObjectId,
  userId: ObjectId,
  name: string, // ex: "Twitter API"
  url: string,
  createdAt: Date,
  lastPolledAt: Date
}

// Feedbacks
{
  _id: ObjectId,
  providerId: ObjectId,
  userId: ObjectId,
  date: Date,
  channel: string, // ex: "twitter"
  text: string,
  sentimentScore: number, // entre -1 et 1
  themes: [string]
}
````

---

## 📡 API REST

### 🔐 Auth

* `POST /auth/register` : crée un utilisateur
* `POST /auth/login` : génère un JWT

### 🔌 Providers

* `POST /providers` : { name, url } → ajoute un provider
* `GET /providers` : liste les flux connectés
* `DELETE /providers/:id` : supprime un provider

### 💬 Feedbacks

* `GET /feedbacks` : tous les feedbacks (filtrable par provider, date, canal)
* `GET /feedbacks/:id` : détail d’un feedback

### 📊 Metrics

* `GET /metrics/channels`
* `GET /metrics/themes`
* `GET /metrics/dailyRate`
* `GET /metrics/sentiments`

---

## 🔁 Polling – fonctionnement

1. L’utilisateur enregistre un provider avec une URL.
2. Le système appelle périodiquement cette URL (ex. toutes les 60 secondes).
3. Le provider retourne des feedbacks bruts :

   ```json
   {
     "id": "fb_001",
     "date": "2025-04-14T10:30:00Z",
     "channel": "twitter",
     "text": "Le support client est lent mais sympathique."
   }
   ```
4. Un appel est fait à l’API DeepSeek :

   ```json
   {
     "sentiment": 0.2,
     "themes": ["support client", "temps de réponse"]
   }
   ```
5. Le feedback enrichi est enregistré dans la base.

---

## ⚙️ Lancement local

Prérequis : Node.js, MongoDB (local ou Atlas)

```bash
git clone https://github.com/ynov-2025-m1-team4/feedpulse-backend.git
cd feedpulse-backend
npm install

cp .env.example .env
# Modifier les variables : Mongo URI, JWT, API Key...

npm run start:dev
```

---

## 📁 .env.example

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/feedpulse
JWT_SECRET=your_secret_key
AI_API_KEY=your_deepseek_api_key
```

---

## 📂 Arborescence backend

```
src/
├── auth/
├── feedbacks/
├── providers/
├── metrics/
├── polling/
├── users/
├── app.module.ts
└── main.ts
```

---

## ✍️ Auteur

* Projet réalisé dans le cadre d’un MVP
* Stack : NestJS, MongoDB, Render, Netlify, DeepSeek

---

## 📄 Licence

MIT © 2025
