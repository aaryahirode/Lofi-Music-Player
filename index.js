import express from "express"
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const SPOTIFY_API_URL = process.env.SPOTIFY_API_URL;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    const songOne = {
        name: "Song Name",  
        artists: [{ name: "Artist name" }],
        album: {
            images: [{ url: "/images/cover-unavailable.jpeg" }]
        }
    };

    res.render("home", { songOne,lyrics: "" });
});


app.post("/submit", async (req, res) => {
    try {
        console.log(req.body.songname);
        const result = await axios.get(`${SPOTIFY_API_URL}?q=${req.body.songname}&type=track`);
        console.log("API Response:", result.data);

        const songData = result.data;

        if (!songData.tracks.items.length) {
            return res.render("home", { songOne: null, lyrics: null });
        }

        const one = songData.tracks.items[0];

        let lyrics = null;
        try {
            const lyricsResponse = await axios.get(`https://api.lyrics.ovh/v1/${one.artists[0].name}/${one.name}`);
            lyrics = lyricsResponse.data.lyrics;
        } catch (err) {
            console.error("Error fetching lyrics:", err.message);
            lyrics = "Lyrics not available.";
        }

        res.render("home", { songOne: one, lyrics });
    } catch (error) {
        console.error("Error fetching song:", error);
        res.render("home", { songOne: null, lyrics: null });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app; 
