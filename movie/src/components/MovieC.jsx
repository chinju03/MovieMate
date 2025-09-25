
import React, { useState } from 'react'
import {
  Card, CardContent, Typography, LinearProgress, Box, Button,
  Rating, Chip, Dialog, DialogTitle, DialogContent, TextField, DialogActions
} from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import TvIcon from '@mui/icons-material/Tv'

function MovieC({ movie, onUpdate, onDelete }) {
  const [rating, setRating] = useState(movie.rating || 0)
  const [review, setReview] = useState(movie.review || "")
  const [openReview, setOpenReview] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [form, setForm] = useState({
    episodes_watched: movie.episodes_watched || 0,
    total_episodes: movie.total_episodes || 0,
    platform: movie.platform || "",
    poster: movie.poster || ""
  })

  const handleRatingChange = async (newVal) => {
    setRating(newVal)
    await onUpdate(movie.id, { rating: newVal })
  }

  const handleSaveReview = async () => {
    await onUpdate(movie.id, { review })
    setOpenReview(false)
  }

  const handleEditSave = async () => {
    await onUpdate(movie.id, form)
    setOpenEdit(false)
  }

  const handleDelete = async () => {
    if (window.confirm(`Delete "${movie.title}"?`)) {
      await onDelete(movie.id)
    }
  }

  return (
    <>
      <Card
        sx={{
          height: '100%',
          bgcolor: '#1e1e1e',
          color: 'white',
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
          transition: "transform 0.3s, box-shadow 0.3s",
          '&:hover': { transform: 'scale(1.03)', boxShadow: 6 }
        }}
      >
        {/* Poster */}
        <Box sx={{ position: "relative" }}>
          {movie.poster && (
            <img src={movie.poster} alt={movie.title}
              style={{ width: "100%", height: "240px", objectFit: "cover", borderRadius: "4px", objectPosition: "center" }} />
          )}
          {movie.status && (
            <Box sx={{
              position: "absolute", top: 8, right: 8, px: 1, borderRadius: 1,
              fontSize: "0.75rem", fontWeight: "bold",
              bgcolor: movie.status === 'completed' ? '#388e3c'
                : movie.status === 'watching' ? '#f57c00' : '#555'
            }}>
              {movie.status.toUpperCase()}
            </Box>
          )}
        </Box>

        {/* Card Content */}
        <CardContent sx={{ p: 2 }}>
          <Box display="flex" alignItems="center" mb={1}>
            {movie.is_tv ? <TvIcon sx={{ mr: 1 }} /> : <MovieIcon sx={{ mr: 1 }} />}
            <Typography variant="h6" fontWeight="bold" noWrap>{movie.title}</Typography>
          </Box>

          {movie.director && (
            <Typography variant="body2" sx={{ color: "#ccc", mb: 1 }}>
              Directed by {movie.director}
            </Typography>
          )}

          {/* Genre + Platform */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
            {movie.genre && (
              <Chip label={movie.genre} size="small"
                sx={{ bgcolor: "#90caf9", fontWeight: "bold" }} />
            )}
            {movie.platform && (
              <Chip label={movie.platform} size="small"
                sx={{ bgcolor: "#f48fb1", fontWeight: "bold" }} />
            )}
          </Box>

          {/* Episodes Progress */}
          {movie.is_tv && (
            <Box>
              <Typography variant="caption">
                Episodes: {movie.episodes_watched}/{movie.total_episodes}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={movie.total_episodes > 0
                  ? (movie.episodes_watched / movie.total_episodes) * 100 : 0}
                sx={{ mt: 1, height: 8, borderRadius: 5 }}
              />
            </Box>
          )}

          {/* Actions */}
          <Box mt={2} display="flex" gap={1}>
            <Rating value={rating} onChange={(e, newVal) => handleRatingChange(newVal)} sx={{
              color: '#ffb400', // gold for filled stars
              '& .MuiRating-iconEmpty': { color: 'white' },
            }} />
            <Button size="small" variant="outlined" onClick={() => setOpenReview(true)}>
              Review
            </Button>
            <Button size="small" variant="outlined" onClick={() => setOpenEdit(true)}>
              Edit
            </Button>
            <Button size="small" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>

          {movie.review && (
            <Typography variant="body2" sx={{ mt: 1, fontStyle: 'italic' }}>
              “{movie.review}”
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={openReview} onClose={() => setOpenReview(false)} fullWidth maxWidth="sm">
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <TextField fullWidth multiline minRows={3}
            value={review} onChange={e => setReview(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReview(false)} color="error">Cancel</Button>
          <Button onClick={handleSaveReview} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit {movie.title}</DialogTitle>
        <DialogContent>
          {movie.is_tv && (
            <>
              <TextField fullWidth type="number" margin="dense"
                label="Episodes Watched"
                value={form.episodes_watched}
                onChange={e => setForm({ ...form, episodes_watched: Number(e.target.value) })}
              />
              <TextField fullWidth type="number" margin="dense"
                label="Total Episodes"
                value={form.total_episodes}
                onChange={e => setForm({ ...form, total_episodes: Number(e.target.value) })}
              />
            </>
          )}
          <TextField fullWidth margin="dense" label="Platform"
            value={form.platform}
            onChange={e => setForm({ ...form, platform: e.target.value })} />
          <TextField fullWidth margin="dense" label="Poster URL"
            value={form.poster}
            onChange={e => setForm({ ...form, poster: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} color="error">Cancel</Button>
          <Button onClick={handleEditSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default MovieC
