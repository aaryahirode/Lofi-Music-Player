import express from "express"
import axios from "axios";

const app = express();
const PORT = 3000;

const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY; // Secure API Key

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    const songOne = {
        name: "Song Name",  
        artists: [{ name: "Artist name" }],
        album: {
            images: [{ url: "/images/cover-unavailable.png" }]
        }
    };

    res.render("home", { songOne }); // Send songOne to EJS
});


app.post("/submit", async (req, res) => {
    try {
        console.log(req.body.songname); 
        const result = await axios.get(`https://v1.nocodeapi.com/blueskies_7/spotify/kONOGccGlvvUnnvv/search?q=${req.body.songname}&type=track`);
        console.log("API Response:", result.data); // Debugging
        const songData = result.data;
        
        if (!songData.tracks.items.length) {
            return res.render("home", { songOne: null });
        }

        const one = songData.tracks.items[0];
        res.render("home", { songOne: one }); // Pass `songOne` to EJS
    } catch (error) {
        console.error("Error fetching song:", error);
        res.render("home", { songOne: null });
    }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


