# medium-project
 

## IMPORTANT NOTE: Root Path is Signup
Please note that the root path of this application is set to the **`/signup`** route. If you face any issues or cannot see the website, please make sure to visit the **`/signup`** route to create an account, or go to the **`/signin`** route if you already have an account.

---

This project is a **Medium-like blog application** built using **React** for the frontend and **Cloudflare Workers** for the serverless backend. The UI is inspired by the look and feel of Medium, with features to write, read, and manage blogs. The frontend is hosted on **Vercel**, and the backend runs on **Cloudflare Workers**.

## Features
- Sign up and sign in functionality
- Create, edit, and delete blog posts
- User profile management
- Responsive UI with a modern design using **Tailwind CSS**
- Real-time data fetching using **React**

## Technologies Used

### Frontend:
- **React** - The frontend is built with React for creating an interactive user interface.
- **Tailwind CSS** - Tailwind is used for building a responsive and modern design.
- **Vercel** - The frontend is hosted on Vercel for fast deployment and scaling.

### Backend:
- **Cloudflare Workers** - The backend is built using serverless functions powered by **Cloudflare Workers**.
- **Hono.js** - A fast web framework used for handling HTTP requests in Cloudflare Workers.
- **PostgreSQL** - The application uses PostgreSQL for storing user data, blog posts, and other necessary information.
- **Prisma ORM** - Prisma is used as the ORM to interact with the PostgreSQL database efficiently.

### Other Dependencies:
- **Wrangler** - The tool for deploying and managing Cloudflare Workers.
- **Axios** - For making HTTP requests from the frontend to the backend.

## Setup and Installation

### Prerequisites
- Node.js (v14 or later)
- NPM or Yarn
- Cloudflare Account
- Vercel Account
- PostgreSQL Database

### Local Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/medium-project.git
   cd medium-project

