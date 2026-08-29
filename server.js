import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import contactRoutes from "./routes/contactRoutes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

// Serve the frontend (home.html, add_contact.html, change_contact.html)
app.use(express.static(path.join(__dirname, "public")));

// All contact CRUD/search/sort/pagination endpoints live under /contacts
app.use("/contacts", contactRoutes);

// 404 handler for unknown API routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Centralized fallback error handler (in case something throws outside try/catch)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Something went wrong on the server" });
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});
