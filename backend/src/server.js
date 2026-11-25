
// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const postsRouter = require("./routes/posts");
// const reviewRoutes = require("./routes/reviewRoutes");

// const app = express();
// const PORT = process.env.PORT || 5000;

// const allowedOrigins = (
//   process.env.CLIENT_ORIGIN || "http://localhost:5173"
// )
//   .split(",")
//   .map((origin) => origin.trim())
//   .filter(Boolean);

// app.use(
//   cors({
//     origin(origin, callback) {
//       // Allow Postman and server-to-server requests.
//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error(`CORS blocked origin: ${origin}`));
//     },
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
//   })
// );

// app.use(express.json({ limit: "1mb" }));
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Sprint 11 BlogSpace API is running!",
//     endpoints: {
//       posts: "/posts",
//       reviews: "/posts/:id/reviews",
//       health: "/health"
//     }
//   });
// });

// app.get("/health", (req, res) => {
//   res.status(200).json({
//     success: true,
//     status: "healthy",
//     database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
//   });
// });

// // Blog APIs
// app.use("/posts", postsRouter);

// // Review APIs: GET and POST /posts/:id/reviews
// app.use(reviewRoutes);

// // Error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack || err);

//   if (err.message?.startsWith("CORS blocked origin:")) {
//     return res.status(403).json({
//       success: false,
//       message: err.message
//     });
//   }

//   if (err.name === "MulterError") {
//     return res.status(400).json({
//       success: false,
//       message: err.message
//     });
//   }

//   return res.status(500).json({
//     success: false,
//     message: "Internal server error",
//     error:
//       process.env.NODE_ENV === "production"
//         ? undefined
//         : err.message
//   });
// });

// async function startServer() {
//   if (!process.env.MONGO_URI) {
//     console.error("MONGO_URI is missing from environment variables.");
//     process.exit(1);
//   }

//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Atlas connected successfully.");

//     app.listen(PORT, "0.0.0.0", () => {
//       console.log(`BlogSpace API running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("MongoDB connection failed:", error.message);
//     process.exit(1);
//   }
// }

// startServer();






require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const postsRouter = require("./routes/posts");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (
  process.env.CLIENT_ORIGIN || "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim().replace(/\/+$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman and server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/+$/, "");

      // Allow explicitly configured frontend domains.
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      // Allow this project's Vercel preview deployments.
      const isVercelPreview =
        /^https:\/\/blogspace-[a-z0-9-]+-niranjan17\.vercel\.app$/.test(
          normalizedOrigin
        );

      if (isVercelPreview) {
        return callback(null, true);
      }

      console.log("Blocked CORS origin:", origin);

      return callback(
        new Error(`CORS blocked origin: ${origin}`)
      );
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sprint 11 BlogSpace API is running!",
    endpoints: {
      posts: "/posts",
      reviews: "/posts/:id/reviews",
      health: "/health"
    }
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected"
  });
});

// Blog APIs
app.use("/posts", postsRouter);

// Review APIs
app.use(reviewRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err);

  if (err.message?.startsWith("CORS blocked origin:")) {
    return res.status(403).json({
      success: false,
      message: err.message
    });
  }

  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "production"
        ? undefined
        : err.message
  });
});

async function startServer() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI is missing from environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Atlas connected successfully.");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`BlogSpace API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

startServer();
