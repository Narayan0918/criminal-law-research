# Full-Stack Website for the Centre for Criminal Law Research

![Project Status](https://img.shields.io/badge/status-complete-green)

This repository contains the complete source code for a full-stack, decoupled website built for a law research centre. The project features a robust backend API, a secure admin panel for content management, and a modern, fast public-facing website to display the content.

---

## ## Features 🚀

-   **Complete Content Management:** Full CRUD (Create, Read, Update, Delete) capabilities for three distinct content types: **Blogs**, **Publications**, and **Events**.
-   **Multi-Admin System:** A role-based access control (RBAC) system with a **Super Admin** and **Editor** roles.
-   **Admin Approval Workflow:** New admin registrations require approval from a Super Admin before they can log in and manage content.
-   **Secure API:** The backend API is secured with JSON Web Token (JWT) authentication for all content-modifying and admin-management endpoints.
-   **Rich Text Editing:** A modern WYSIWYG editor (TipTap) is integrated for creating and formatting blog posts.
-   **Decoupled Architecture:** The backend, admin panel, and public site are three separate applications, allowing for independent development, deployment, and scaling.
-   **Styled & Animated Frontend:** The public site is styled with Tailwind CSS and includes subtle page transition animations with Framer Motion for a polished user experience.

---

## ## Tech Stack 🛠️

This project is built with a modern MERN-like stack:

-   **Backend:**
    -   **Runtime:** Node.js
    -   **Framework:** Express.js
    -   **Database:** MongoDB (with Mongoose ODM)
    -   **Authentication:** JWT (jsonwebtoken), bcryptjs
-   **Frontend (Admin & Public):**
    -   **Framework:** Next.js
    -   **Library:** React
    -   **Styling:** Tailwind CSS
    -   **Animation:** Framer Motion
    -   **API Communication:** Axios
-   **Deployment:**
    -   **Database:** MongoDB Atlas
    -   **Backend API:** Render
    -   **Frontends:** Vercel

---

## ## Project Structure

The project is structured as a monorepo with three main parts located in the root directory:

-   `/` (Root): Contains the backend API server (`server.js`) and its configuration.
-   `/client`: The Next.js application for the secure Admin Panel.
-   `/public-site`: The Next.js application for the public-facing website.

---

## ## Local Setup and Installation

Follow these steps to get the entire project running on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later)
-   [npm](https://www.npmjs.com/)
-   [Git](https://git-scm.com/)
-   A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.

### 1. Clone the Repository

bash
git clone <URL_to_this_repository>
cd criminal-law-research

2. Configure the Database
Create a new, free cluster on MongoDB Atlas.

Create a database user and securely note the password.

Under "Network Access," add your current IP address.

Get the database connection string.

3. Set Up Environment Variables
In the project root, create a file named .env.

Copy the content from the example below and paste it into your new file, replacing the placeholder values.

# .env.example - Copy this into a new .env file

# Your MongoDB Atlas connection string. Replace <password> with your DB user's password.
MONGO_URI="mongodb+srv://your_username:<password>@cluster0.xxxxx.mongodb.net/researchCentreDB?retryWrites=true&w=majority"

# A long, random, secret string for signing security tokens.
JWT_SECRET="generate_a_strong_random_secret_string_for_production"
4. Install Dependencies
You must install dependencies for all three parts of the project.

From the root folder, run:

Bash

# Install backend dependencies
npm install

# Install admin panel dependencies
npm install --prefix client

# Install public site dependencies
npm install --prefix public-site
## Running the Project
A single command from the root folder will start the backend, admin panel, and public site concurrently.

Bash

npm run dev
The applications will be available at:

Backend API: http://localhost:5001

Public Website: http://localhost:3000

Admin Panel: http://localhost:3001

## Admin Management Workflow
This application features a multi-admin system with an approval workflow.

Creating the Super Admin: The very first user to register via the /register page on the admin panel will automatically be designated as the super-admin and will be auto-approved.

Registering New Admins: All subsequent users who register will be assigned the editor role and will have their account set to "Pending" (isApproved: false).

Approving Admins: The Super Admin can log in, navigate to the "Manage Admins" section in the dashboard, and approve or delete pending or existing editor accounts.

Login: Editors cannot log in until their account has been approved by the Super Admin.

## Deployment Guide
This project must be deployed as three separate services.

1. Backend API (Recommended: Render)
Sign up for Render with your GitHub account.

Create a new "Web Service" and connect your repository.

Use the following settings:

Runtime: Node

Build Command: npm install

Start Command: node server.js

In the "Environment" tab, add your MONGO_URI and JWT_SECRET as environment variables.

Deploy the service and copy the provided live URL (e.g., https://your-api.onrender.com).

2. Frontend Apps (Recommended: Vercel)
Deploy both the client and public-site folders as separate projects on Vercel.

For the Admin Panel:

Import your GitHub repository on Vercel.

When configuring the project, set the Root Directory to client.

Add an Environment Variable:

NEXT_PUBLIC_API_URL: The URL of your live backend API on Render.

For the Public Site:

Create another new project on Vercel from the same repository.

Set the Root Directory to public-site.

Add the same Environment Variable:

NEXT_PUBLIC_API_URL: The URL of your live backend API.

3. Final Configuration
After deploying both frontend apps, take the live URL of your admin panel (e.g., https://your-admin-panel.vercel.app).

Update the "Admin Login" link in the public-site/app/layout.tsx file to point to this live URL, and redeploy the public site.