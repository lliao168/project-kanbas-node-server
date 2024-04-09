// const express = require('express');
import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./Users/routes.js";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
mongoose.connect("mongodb://localhost:27017/kanbas");
import "dotenv/config";
import session from "express-session";
const app = express();
app.use(
    cors({
        credentials: true,
        origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
        // origin: "http://localhost:3000",
      })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
  };
  if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }  
  app.use(
    session(sessionOptions)
  );  
app.use(express.json());
const port = process.env.PORT || 4000;
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Hello(app);
Lab5(app);

app.listen(process.env.PORT || 4000);