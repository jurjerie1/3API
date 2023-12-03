import express from "express";
import { connectDB } from "./utils/connectDB";
import "dotenv/config";
import cors from "cors";

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// app.get("/post", getPost);
// app.post("/post",getAuthor, postPost);
// app.patch("/post/:id", patchPost);
// app.delete("/post/:id", deletePost);

app.listen(5000, () => console.log("server on port 5000"));
