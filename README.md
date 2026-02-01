# 📚 Peng's Library - Full-Stack Library Management System

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Docker](https://img.shields.io/badge/container-Docker-blue)
![Cloud](https://img.shields.io/badge/deployment-Oracle_Cloud-orange)
![License](https://img.shields.io/badge/license-MIT-green)

> **A production-ready, cloud-native library management system.**

🌐 **Live Demo:** [https://library.penghuang.dev](https://library.penghuang.dev)

---

## 📖 Overview

**Peng's Library** is a robust full-stack application designed to handle book discovery, borrowing operations, user reviews, and secure administration. 

Unlike simple CRUD demos, this project mimics a **real-world enterprise architecture**. It features full containerization, strict Role-Based Access Control (RBAC), automated CI/CD pipelines, and is deployed on a live cloud infrastructure with a secure Nginx gateway.

---

## ✨ Key Highlights

* **☁️ Cloud Deployment (OCI)**
    * Deployed on **Oracle Cloud Infrastructure** (Oracle Linux) simulating a real production environment.
* **🐳 Full Containerization**
    * Frontend, Backend, Database, and Gateway are orchestrated via **Docker Compose** for consistent environments.
* **🌐 Nginx Reverse Proxy & Gateway**
    * Handles **SSL/HTTPS** termination (Let’s Encrypt).
    * Routes traffic (`/` → Frontend, `/api` → Backend) to elegantly solve CORS issues.
* **🔄 CI/CD Automation**
    * **GitHub Actions** workflow triggers on push to `main`.
    * Auto-builds & pushes Docker images to Docker Hub.
    * Auto-deploys to OCI via SSH with zero manual intervention.
* **🔐 Enterprise Security**
    * **OAuth2 / OIDC** authentication via Okta/Auth0.
    * **JWT-based Authorization** with strict RBAC (Role-Based Access Control).
    * Admin routes are protected at the API level using custom JWT claims.

---

## 🏗️ System Architecture
🛠️ Tech Stack
Category,Technologies
Frontend,"React.js (Hooks), TypeScript, Bootstrap 5, Axios"
Backend,"Java 21, Spring Boot, Spring Security, Spring Data JPA/REST"
Database,MySQL 8
DevOps,"Docker, Docker Compose, Nginx, GitHub Actions, OCI"
Security,"OAuth2 (Okta), JWT, HTTPS (Certbot)"

# Payment
STRIPE_KEY_SECRET=your_stripe_secret_key

# Authentication (Okta/Auth0)
OKTA_OAUTH2_ISSUER=[https://your-domain.okta.com/oauth2/default](https://your-domain.okta.com/oauth2/default)
OKTA_OAUTH2_CLIENT_ID=your_client_id
3. Run the ApplicationBash# Clone the repository
git clone [https://github.com/huangkouhou/library-app.git](https://github.com/huangkouhou/library-app.git)
cd library-app

# Start services
docker compose up -d --build
4. AccessFrontend: http://localhostBackend API: http://localhost/api

👨‍💻 AuthorPeng Huang
