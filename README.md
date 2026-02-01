# 📚 Peng's Library - Full Stack Library Management System

![CI/CD Status](https://img.shields.io/badge/build-passing-brightgreen)
![Docker](https://img.shields.io/badge/container-Docker-blue)
![Cloud](https://img.shields.io/badge/deployment-Oracle_Cloud-orange)


**Live Demo:** [https://library.penghuang.dev](https://library.penghuang.dev)

## 📖 Introduction

**Peng's Library** is a comprehensive, full-stack library management application designed to handle book borrowing, returning, and inventory management. 

* **☁️ Cloud Deployment (OCI):** Hosted on a remote Oracle Linux instance, moving away from local development environments.
* **🐳 Full Containerization:** Wrote custom `Dockerfile`s for both Frontend and Backend, orchestrated via `docker-compose` to manage the React, Spring Boot, and MySQL services as a cohesive unit.
* **🔄 Nginx Reverse Proxy:** Implemented Nginx as an API Gateway to:
    * Handle SSL termination (HTTPS via Let's Encrypt).
    * Route traffic (`/` to Frontend, `/api` to Backend) to solve CORS issues effectively.
    * Serve static React assets efficiently.
* **⚙️ CI/CD Pipeline (GitHub Actions):** Designed an automated workflow that:
    * Triggers on push to `main`.
    * Builds Docker images and pushes them to Docker Hub.
    * SSHs into the OCI server to pull the latest images and restart containers automatically.
* **🔐 Security Hardening:** * Configured **Auth0** with custom Actions to inject `Admin` roles into JWT Access Tokens.
    * Secured backend endpoints ensuring strict Role-Based Access Control (RBAC).

## 🛠️ Tech Stack

### Frontend
- **React.js** (Hooks, Router)
- **TypeScript**
- **Bootstrap** (Responsive UI)

### Backend
- **Java 21 & Spring Boot**
- **Spring Security** (OAuth2 Resource Server)
- **Spring Data JPA & Hibernate**
- **Spring Data REST**
- **Stripe API** (Payment Processing)

### Infrastructure & DevOps
- **Docker & Docker Compose**
- **Nginx** (Reverse Proxy & Web Server)
- **Oracle Cloud Infrastructure (OCI)** (Compute Instance)
- **GitHub Actions** (CI/CD)
- **Certbot** (SSL/TLS Certificate Management)
- **MySQL** (Persistence)

## 🏗️ Architecture

✨ Features

👤 User Features
📖 Book Browsing & Search

Browse the library catalog with pagination support

Search books by title and keywords

Clean and responsive UI for smooth navigation across large datasets

📦 Loan Management

Check out available books directly from the catalog

Real-time availability tracking prevents double borrowing

View all currently borrowed books in one place

Clear status indicators for loaned and available items

🕒 Borrowing History

Access a complete history of previously borrowed books

Helps users track reading activity and past loans

Improves transparency and user accountability

⭐ Review & Rating System

Leave star ratings and written reviews for books

Reviews are visible to other users to support better reading choices

Encourages community interaction and engagement

💳 Payment System (In Progress)

Late fee payment via Stripe integration

Secure and user-friendly checkout experience

Designed for future extensibility (invoices, payment history, refunds)

🌱 Designed for Scalability

Modular feature structure for future expansion

Clear separation between user and admin responsibilities

Ready for enhancements such as notifications, reservations, and recommendations


🛡️ Admin Features
🔐 Secure Access

Admin-only access enforced through protected routes

Authorization based on JWT role claims

Prevents unauthorized users from accessing management functions

📚 Inventory Management

Add new books to the library catalog

Update stock quantities for existing books

Remove books that are no longer available

Ensures accurate and up-to-date inventory control

⚡ Real-time Updates

All inventory changes are reflected immediately

Search results and book listings update without page reload

Provides a seamless and responsive admin experience

💬 User Q&A Management

View pending questions submitted by users

Read user details (email, title, question content)

Submit official admin responses directly from the dashboard

Helps maintain clear communication and user support

📸 
1. Landing Page
   <img width="1761" height="930" alt="截屏2026-01-29 14 46 57" src="https://github.com/user-attachments/assets/729062c4-e803-45cf-93cd-d52f47446717" />

2. Search & Filter
   <img width="1751" height="922" alt="截屏2026-01-29 14 47 37" src="https://github.com/user-attachments/assets/df0a76be-3ed8-45c4-9878-266890048f3b" />

3. Secure Admin Dashboard
   <img width="1763" height="791" alt="截屏2026-01-29 14 48 56" src="https://github.com/user-attachments/assets/c20c4062-b9fe-410a-a7dd-f50efde5f401" />
   

🚀 Getting Started (Local with Docker)
You can run the entire infrastructure locally using Docker Compose without installing Java manually.

Clone the repository
git clone [https://github.com/huangkouhou/library-app.git](https://github.com/huangkouhou/library-app.git)
cd library-app
Configure Environment Create a .env file or update docker-compose.yml with your Auth0 and Database credentials.

Run with Docker
docker-compose up -d --build
Access the App

Frontend: http://localhost:3000 (or configured port)

Backend API: http://localhost:8080/api

💻 Getting Started

This project is fully containerized and runs using Docker Compose, including frontend, backend, database, and Nginx gateway.

📦 Prerequisites

Make sure you have the following installed on your machine or server:

Docker (v20+)

Docker Compose (v2+)

A valid domain name (for HTTPS in production)

(Optional) Let’s Encrypt SSL certificates for HTTPS

📁 Project Structure (Simplified)
.
├── docker-compose.yml
├── .env
├── db-init/
│   └── init.sql
├── nginx/
│   ├── nginx.conf
│   └── react.conf
└── 03-frontend/
    └── react-library/

🔐 Environment Variables

Create a .env file in the root directory:

# Database
SPRING_DATASOURCE_PASSWORD=your_mysql_root_password

# Stripe (Payment)
STRIPE_KEY_SECRET=your_stripe_secret_key

# Okta Authentication
OKTA_OAUTH2_ISSUER=https://your-okta-domain/oauth2/default
OKTA_OAUTH2_CLIENT_ID=your_okta_client_id

**Developed by [Peng Huang](https://github.com/huangkouhou)**
