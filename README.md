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

# FeedPulse Backend

FeedPulse is a real-time platform for centralizing and analyzing customer feedback from multiple sources (emails, forms, social networks, Google Reviews, etc.). It enables companies to quickly identify expressed sentiments, discussed themes, and the most used channels, while triggering alerts on critical points.

---

## 🚀 Features

- Secure authentication (JWT)
- Connect external feedback streams via URL
- Automatic polling of providers
- Sentiment analysis (score between -1 and 1)
- Theme extraction
- User dashboard with metrics visualization
- REST API documented with Swagger
- Sentry integration for error monitoring

---

## 🧱 Tech Stack

- **Backend:** NestJS (TypeScript)
- **Database:** MongoDB
- **Frontend:** Next.js (see separate repo)
- **Deployment:** Render (API) & Netlify (Frontend)
- **AI:** DeepSeek API for sentiment analysis and theme extraction
- **Monitoring:** Sentry

---

## 🔗 Links

- 🔗 Demo (Frontend): https://feedpulse.netlify.app
- 🔗 API Backend: https://feed-pulse-backend.onrender.com
- 📚 Swagger Backend: https://feed-pulse-backend.onrender.com/api/docs

---

## 📦 Project Structure

```
src/
├── ai/
├── auth/
├── feedbacks/
├── metrics/
├── polling/
├── providers/
├── sentry/
├── users/
├── app.module.ts
└── main.ts
```

---

## ⚙️ Setup & Usage

### 1. Clone & Install

```bash
git clone https://github.com/ynov-2025-m1-team4/feedpulse-backend.git
cd feedpulse-backend
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/feedpulse
JWT_SECRET=your_secret_key
AI_API_KEY=your_deepseek_api_key
```

### 3. Start the App

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

### 4. Run with Local Database

Edit `docker-compose.yaml` if needed, then:

```bash
docker compose -f docker-compose.yaml --env-file <your_env> up -d
```

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 📚 API Documentation

- Swagger UI: [`/api/docs`](https://feed-pulse-backend.onrender.com/api/docs)
- Auth: `/auth/register`, `/auth/login`
- Providers: `/providers` (CRUD)
- Feedbacks: `/feedbacks`, `/feedbacks/user`, `/feedbacks/provider/:providerId`, `/feedbacks/:id`
- Metrics: `/metrics/channels`, `/metrics/themes`, `/metrics/daily-rate`, `/metrics/sentiments`
- Sentry: `/sentry/debug-sentry`

---

## 🗃️ Database Models (MongoDB)

```json
// User
{
  _id: ObjectId,
  email: string,
  password: string,
  createdAt: Date
}
// Provider
{
  _id: ObjectId,
  userId: ObjectId,
  name: string,
  url: string,
  createdAt: Date,
  lastPolledAt: Date
}
// Feedback
{
  _id: ObjectId,
  providerId: ObjectId,
  userId: ObjectId,
  date: Date,
  channel: string,
  text: string,
  sentimentScore: number,
  themes: [string]
}
```

---

## 🔁 Polling Workflow

1. User registers a provider with a URL.
2. System periodically polls the URL (e.g., every 60 seconds).
3. Provider returns raw feedbacks:
   ```json
   {
     "id": "fb_001",
     "date": "2025-04-14T10:30:00Z",
     "channel": "twitter",
     "text": "Le support client est lent mais sympathique."
   }
   ```
4. DeepSeek API is called for enrichment:
   ```json
   {
     "sentiment": 0.2,
     "themes": ["support client", "temps de réponse"]
   }
   ```
5. Enriched feedback is saved to the database.

---

## 📝 Sprint 2 Progress (June 19, 2025)

**What was accomplished:**

- Updated Swagger documentation for better readability and easier API testing
- Implemented unit tests and updated performance tests using k6
- Created a Render staging environment for pre-production testing
- Updated CI workflow to run tests only on the staging environment
- Metrics endpoints now return only the current user's feedbacks
- Improved password validation for greater security and robustness
- Integrated Sentry with issue tracking, tracing, and automatic issue creation on GitHub

---

## 🌐 Example Producer URL

- https://feedback-producer.onrender.com/feedbacks

---

## ✍️ Author

- Project by Ynov 2025 M1 Team 4
- Stack: NestJS, MongoDB, Render, Netlify, DeepSeek

---

## 📄 License

GNU GPL v3 © 2025
