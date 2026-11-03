# AI Development Prompts – BlogSpace

**Project:** BlogSpace – Blog Data Hub  
**Sprint:** ProDesk IT Sprint 11  
**Track:** Track B

This document contains the AI prompts used as development references while planning, building, improving and debugging the BlogSpace application.

## Prompt 1: Project Planning

I want to build a full-stack Blog Data Hub application using React.js, Node.js, Express.js and MongoDB Atlas.

The application should support creating, reading, updating and deleting blog posts.

Provide a clear project architecture and explain the development steps.

## Prompt 2: Backend API Development

Create a RESTful Blog API using Node.js and Express.js.

Requirements:
- Connect the application to MongoDB Atlas.
- Create a blog post model.
- Implement GET `/posts`.
- Implement GET `/posts/:id`.
- Implement POST `/posts`.
- Implement PUT `/posts/:id`.
- Implement DELETE `/posts/:id`.
- Add proper error handling and response messages.
- Organize the backend code into maintainable modules.

## Prompt 3: React Frontend Development

Build a responsive blog management application using React and Vite.

Requirements:
- Create a professional homepage.
- Display published blog posts.
- Add a form to create new posts.
- Implement edit and delete functionality.
- Connect the frontend to the Express API.
- Use a clean and maintainable component structure.

## Prompt 4: Professional UI Design

Design a modern blogging website inspired by professional editorial websites.

Requirements:
- Elegant green and white color palette.
- Responsive navigation bar.
- Attractive hero section.
- Beautiful blog cards.
- Consistent spacing and typography.
- Responsive mobile and desktop layouts.
- Clean buttons and interactive elements.

## Prompt 5: Navbar and Search

Create a professional navigation bar containing:

- BlogSpace logo.
- Home.
- Articles.
- Discover.
- Search stories input.
- Write a Post button.

Search should filter articles by title, content and author.

Keep only one search input in the navbar. Do not display a duplicate search bar below the hero section.

## Prompt 6: Create and Edit Blog Posts

Implement a blog publishing form.

Fields:
- Article title.
- Author name.
- Article content.
- Optional cover image.

Requirements:
- Validate required fields.
- Support image preview.
- Support editing existing posts.
- Submit data using FormData.
- Display success and error messages.
- Connect to the backend API.

## Prompt 7: Blog Cards and Read More

Create professional blog cards with:

- Cover image.
- Publishing date.
- Estimated reading time.
- Article title.
- Content preview.
- Author information.
- Read Full Article button.
- Edit and Delete actions.

Show complete article content when the user clicks Read Full Article.

## Prompt 8: Responsive Design

Make the application responsive for:
- Desktop.
- Laptop.
- Tablet.
- Mobile devices.

Use CSS Grid and Flexbox. Ensure that navigation, search, publishing form and article cards fit different screen sizes.

## Prompt 9: API Integration and Debugging

Connect the React frontend to the Express backend.

Requirements:
- Fetch all published articles.
- Create new articles.
- Update existing articles.
- Delete articles.
- Handle API errors.
- Display loading indicators.
- Refresh the article list after successful changes.

## Prompt 10: Image Upload

Implement optional blog cover image uploading.

Requirements:
- Accept image files only.
- Restrict image size to 5 MB.
- Preview selected images.
- Submit images through multipart/form-data.
- Use Cloudinary for image hosting when configured.

## Prompt 11: Documentation

Generate professional project documentation.

Include:
- Project overview.
- Technology stack.
- Project structure.
- Installation instructions.
- Environment variables.
- API endpoints.
- Features.
- Deployment instructions.
- Author information.

---

## Development Note

AI-generated suggestions were used as development assistance. The final application code, configuration and functionality should be reviewed and tested before submission.

**Project:** BlogSpace – Blog Data Hub  
**Developer:** Niranjan Kumar