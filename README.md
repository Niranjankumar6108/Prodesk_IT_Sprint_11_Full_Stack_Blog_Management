# BlogSpace – Blog Data Hub

**ProDesk IT | Sprint 11 | Track B**

A full-stack blog management application built using React, Node.js, Express.js and MongoDB Atlas. BlogSpace allows users to create, publish, read, edit and delete blog articles through a clean, responsive interface.

## Project Overview

BlogSpace is a modern blogging platform where users can share knowledge, ideas and experiences through articles.

The application provides a professional blog interface with a navigation bar, live article search, article cards, full article reading view and a publishing form.

## Features

### Frontend
- Responsive and professional UI.
- Modern navigation bar.
- Live search functionality.
- Create and publish blog posts.
- Read full articles.
- Edit existing articles.
- Delete articles.
- Article cover image preview.
- Automatic reading-time calculation.
- Loading and error states.
- Mobile, tablet and desktop support.

### Backend
- RESTful API using Express.js.
- MongoDB Atlas database integration.
- Create, Read, Update and Delete (CRUD).
- Image upload support through Cloudinary (if configured).
- JSON and multipart form-data handling.

## Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend |
| Vite | Development server |
| JavaScript | Application logic |
| CSS3 | Responsive UI |
| Node.js | Backend runtime |
| Express.js | REST API |
| MongoDB Atlas | Database |
| Cloudinary | Image hosting |
| Git & GitHub | Version control |

## Project Structure

```text
BlogSpace/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
│   └── index.html
│
├── backend/
│   ├── src/
│   ├── .env
│   └── package.json
│
├── README.md
└── Prompts.md
```

*Note: Adjust the folder structure above to match your actual project.*

## Installation and Setup

### 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd BlogSpace
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000
```

Start frontend:

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

### 3. Backend Setup

Open another terminal:

```bash
cd backend
npm install
```

Configure backend environment variables in `.env` according to your backend implementation:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

Never upload `.env` files or secret credentials to GitHub.

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get a single post (if implemented) |
| POST | `/posts` | Create a post |
| PUT | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

## Application Workflow

1. Open the BlogSpace website.
2. Browse all published articles.
3. Search articles using the navbar search.
4. Click **Write a Post** to open the publishing form.
5. Enter the title, author and article content.
6. Upload an optional cover image.
7. Publish the article.
8. Read, edit or delete published articles.

## Database

MongoDB Atlas stores the blog posts and their associated information.

Example post fields:

- `_id`
- `title`
- `content`
- `author`
- `imageUrl`
- `createdAt`

The actual database schema depends on the backend implementation.

## Deployment

Frontend can be deployed using Vercel.

Backend can be deployed using Render.

For production deployment, configure:
- Frontend `VITE_API_URL` with the deployed backend URL.
- MongoDB Atlas connection string.
- Cloudinary credentials if image upload is enabled.
- Backend CORS configuration for the frontend domain.

## Security

- Keep database credentials private.
- Use environment variables for secrets.
- Configure CORS for trusted origins.
- Validate uploaded images on the backend.
- Never commit `.env` files.

## Future Improvements

- User authentication and authorization.
- User profiles.
- Article categories and tags.
- Comments and likes.
- Pagination.
- Rich-text editor.
- Admin dashboard.

## Author

**Niranjan Kumar**

Project: BlogSpace – Blog Data Hub  
Organization: ProDesk IT  
Sprint: 11  
Track: B – Backend Architecture

---

**BlogSpace – A space where every idea deserves a story.**