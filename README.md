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
- **Java 17 & Spring Boot**
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
Book Browsing: Pagination and search functionality.

Loan Management: Check out books and view current loans (dynamic availability tracking).

History: Review past borrowed books.

Review System: Leave star ratings and text reviews.

Payment: (Integration in progress) Pay late fees via Stripe.

🛡️ Admin Features
Secure Access: Protected routes requiring Admin role claims in JWT.

Inventory Control: Add new books, update quantities, or delete items.

Real-time Updates: Changes are immediately reflected in search results.

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

Bash

git clone [https://github.com/huangkouhou/library-app.git](https://github.com/huangkouhou/library-app.git)
cd library-app
Configure Environment Create a .env file or update docker-compose.yml with your Auth0 and Database credentials.

Run with Docker

Bash

docker-compose up -d --build
Access the App

Frontend: http://localhost:3000 (or configured port)

Backend API: http://localhost:8080/api

**Developed by [Peng Huang](https://github.com/huangkouhou)**
