import express from "express"
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

const SPOTIFY_API_URL = process.env.SPOTIFY_API_URL;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const songOne = {
        name: "Song Name",  
        artists: [{ name: "Artist name" }],
        album: {
            images: [{ url: "/images/cover-unavailable.jpeg" }]
        }
    };

    res.render("home", { songOne,lyrics: "" }); // Send songOne to EJS
});


// app.post("/submit", async (req, res) => {
//     try {
//         console.log(req.body.songname); 
//         const result = await axios.get(`${SPOTIFY_API_URL}?q=${req.body.songname}&type=track`);
//         console.log("API Response:", result.data); // Debugging
//         const songData = result.data;
        
//         if (!songData.tracks.items.length) {
//             return res.render("home", { songOne: null });
//         }

//         const one = songData.tracks.items[0];
//         res.render("home", { songOne: one }); // Pass `songOne` to EJS
//     } catch (error) {
//         console.error("Error fetching song:", error);
//         res.render("home", { songOne: null });
//     }
// });

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

        // Fetch lyrics from Lyrics.ovh
        let lyrics = null;
        try {
            const lyricsResponse = await axios.get(`https://api.lyrics.ovh/v1/${one.artists[0].name}/${one.name}`);
            lyrics = lyricsResponse.data.lyrics;
        } catch (err) {
            console.error("Error fetching lyrics:", err.message);
            lyrics = "Lyrics not available.";
        }

        // Render home.ejs with song data and lyrics
        res.render("home", { songOne: one, lyrics });
    } catch (error) {
        console.error("Error fetching song:", error);
        res.render("home", { songOne: null, lyrics: null });
    }
});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


