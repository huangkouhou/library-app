# 📚 Peng's Library  
**Full-Stack Library Management System**

![CI/CD Status](https://img.shields.io/badge/build-passing-brightgreen)
![Docker](https://img.shields.io/badge/container-Docker-blue)
![Cloud](https://img.shields.io/badge/deployment-Oracle_Cloud-orange)

🌐 **Live Demo:**  
👉 https://library.penghuang.dev

---

## 📖 Overview

**Peng's Library** is a production-ready, full-stack library management system that supports book discovery, borrowing, reviews, admin management, and secure payments.

The project is designed with real-world architecture in mind, featuring containerization, role-based access control, CI/CD automation, and cloud deployment.

---

## ✨ Key Highlights

- ☁️ **Cloud Deployment (OCI)**  
  Deployed on Oracle Cloud Infrastructure (Oracle Linux) for a real production environment.

- 🐳 **Full Containerization**  
  Frontend, backend, database, and gateway are fully containerized and orchestrated via **Docker Compose**.

- 🌐 **Nginx Reverse Proxy & API Gateway**  
  - HTTPS termination (Let’s Encrypt)
  - `/` → Frontend, `/api` → Backend routing
  - Solves CORS cleanly and improves performance

- 🔄 **CI/CD with GitHub Actions**  
  - Triggered on push to `main`
  - Builds & pushes Docker images to Docker Hub
  - Automatically deploys to OCI via SSH

- 🔐 **Enterprise-grade Security**
  - OAuth2 / OIDC authentication (Okta)
  - JWT-based authorization with **Role-Based Access Control (RBAC)**
  - Admin role enforced at API level

---

## 🛠️ Tech Stack

### Frontend
- React.js (Hooks, Router)
- TypeScript
- Bootstrap (Responsive UI)

### Backend
- Java 21 & Spring Boot
- Spring Security (OAuth2 Resource Server)
- Spring Data JPA & Hibernate
- Spring Data REST
- Stripe API (Payments)

### Infrastructure & DevOps
- Docker & Docker Compose
- Nginx (Reverse Proxy & Gateway)
- MySQL 8
- Oracle Cloud Infrastructure (OCI)
- GitHub Actions (CI/CD)
- Certbot (HTTPS)

---

## 🏗️ System Architecture

```text
Browser
  ↓
Nginx (HTTPS / Reverse Proxy)
  ├── React Frontend
  └── Spring Boot API (/api)
          ↓
        MySQL


👤 User Features
📖 Book Browsing & Search

Browse catalog with pagination

Keyword-based search

Responsive UI optimized for large datasets

📦 Loan Management

Borrow available books

Real-time availability tracking

View current loans with clear status indicators

🕒 Borrowing History

Review past borrowed books

Improves transparency and accountability

⭐ Reviews & Ratings

Star ratings with written reviews

Reviews visible to all users

Encourages community engagement

💳 Payments (In Progress)

Late fee payments via Stripe

Secure checkout flow

Designed for future extensions (invoices, refunds)

🛡️ Admin Features
🔐 Secure Admin Access

Admin-only protected routes

JWT role claims enforced at backend

Strict RBAC implementation

📚 Inventory Management

Add new books

Update stock quantities

Remove unavailable items

Real-time inventory consistency

⚡ Real-time Updates

Immediate reflection of changes

No manual refresh required

Smooth admin workflow

💬 User Q&A Management

View pending user questions

Respond directly from admin dashboard

Improves support and communication

📸 Screenshots
1️⃣ Landing Page
<img width="1761" alt="Landing Page" src="https://github.com/user-attachments/assets/729062c4-e803-45cf-93cd-d52f47446717" />
2️⃣ Search & Filter
<img width="1751" alt="Search & Filter" src="https://github.com/user-attachments/assets/df0a76be-3ed8-45c4-9878-266890048f3b" />
3️⃣ Secure Admin Dashboard
<img width="1763" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/c20c4062-b9fe-410a-a7dd-f50efde5f401" />
🚀 Getting Started (Docker)

This project runs entirely with Docker Compose.

📦 Prerequisites

Docker (v20+)

Docker Compose (v2+)

Domain name (for HTTPS in production)

Optional: Let’s Encrypt certificates

🔐 Environment Variables

Create a .env file in the root directory:

# Database
SPRING_DATASOURCE_PASSWORD=your_mysql_root_password

# Stripe
STRIPE_KEY_SECRET=your_stripe_secret_key

# Okta OAuth
OKTA_OAUTH2_ISSUER=https://your-okta-domain/oauth2/default
OKTA_OAUTH2_CLIENT_ID=your_okta_client_id


⚠️ Do not commit .env to version control.

▶️ Run the Application
git clone https://github.com/huangkouhou/library-app.git
cd library-app
docker compose up -d --build

🌐 Access

Frontend: http://localhost

Backend API: http://localhost/api

🔮 Future Improvements

Book reservation system

Notification service (email / in-app)

Recommendation engine

Payment history dashboard

Admin analytics

👨‍💻 Author

Peng Huang
https://github.com/huangkouhou
