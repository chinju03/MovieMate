import React, { useState } from "react";
import { TextField, Button, Box, MenuItem } from "@mui/material";
import MovieC from "./MovieC";

const OMDB_KEY = "738cde02";
const statusOptions = ["wishlist", "watching", "completed"];

export default function SearchAndAddMovie({ onAdd }) {
    const [query, setQuery] = useState("");
    const [movie, setMovie] = useState(null);
    const [status, setStatus] = useState("wishlist");

    const search = async () => {
        if (!query.trim()) return;
        const res = await fetch(
            `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${OMDB_KEY}`
        );
        const data = await res.json();
        if (data.Response === "True") {
            const m = {
                id: data.imdbID,
                title: data.Title,
                director: data.Director,
                genre: data.Genre,
                poster: data.Poster !== "N/A" ? data.Poster : "",
                is_tv: data.Type === "series",
                platform: "",
                status: status,
                total_episodes: 0,
                episodes_watched: 0,
                rating: 0,
                review: ""
            };
            setMovie(m);
        } else {
            alert(data.Error);
            setMovie(null);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", textAlign: "center", mb: 5 }}>
            <TextField
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                label="Movie Title"
                variant="outlined"
                size="small"
                sx={{
                    mr: 2,
                    width: "60%",
                    input: { color: 'white' }, // text color
                    label: { color: 'white' }, // label color
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'white', // outline color
                        },
                        '&:hover fieldset': {
                            borderColor: 'white', // outline color on hover
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: 'white', // outline color when focused
                        },
                    },
                }}
            />
            <Button
                variant="contained"
                onClick={search}
                sx={{
                    background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                    fontWeight: "bold",
                    color: "#fff",
                    textTransform: "none"
                }}
            >
                Search
            </Button>

            {/* status selector */}
            <TextField
                select
                size="small"
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{
                    mt: 2,
                    minWidth: 160,
                    input: { color: "white" },
                    label: { color: "white" },
                    "& .MuiSelect-select": { color: "white" },
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "white" },
                        "&:hover fieldset": { borderColor: "white" },
                        "&.Mui-focused fieldset": { borderColor: "white" }
                    }
                }}
            >
                {statusOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </MenuItem>
                ))}
            </TextField>

            {movie && (
                <Box sx={{ mt: 3, mb: 3 }}>
                    <MovieC movie={movie} onUpdate={() => { }} onDelete={() => { }} />
                    <Button
                        variant="outlined"
                        sx={{ mt: 2, borderColor: "#90caf9", color: "#90caf9" }}
                        onClick={() => {
                            onAdd && onAdd(movie); // call parent addMovie()
                            setMovie(null);
                            setQuery("");
                        }}
                    >
                        Add to My List
                    </Button>
                </Box>
            )}
        </Box>
    );
}
