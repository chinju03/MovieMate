import React from 'react'
import { useState } from 'react'
import { Card, CardContent, Typography, LinearProgress, Box, Button, Rating, Chip, Dialog, DialogTitle, DialogContent, TextField, DialogActions  } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import TvIcon from '@mui/icons-material/Tv'
import api from '../api'

function MovieC({ movie, onUpdated, }) {
  const [rating, setRating] = useState(movie.rating || 0)
  const [openReview, setOpenReview] = useState(false)
  const [review, setReview] = useState(movie.review || "")

  const handleRatingChange = async (newVal) => {
    setRating(newVal)
    await api.put(`movies/${movie.id}/`, { ...movie, rating: newVal })
    onUpdated()
  }

  const handleSaveReview = async () => {
    await api.put(`movies/${movie.id}/`, { ...movie, review })
    setOpenReview(false)
    onUpdated()
  }

  return (
    <>
      <Card sx={{
        height: '100%',
        bgcolor: '#1e1e1e',
        color: 'white',
        borderRadius: 3,
        boxShadow: 3,
        transition: '0.3s',
        '&:hover': { transform: 'scale(1.03)', boxShadow: 6 }
      }}>
        <CardContent>
          <Box display="flex" alignItems="center" mb={1}>
            {movie.is_tv ? <TvIcon sx={{ mr: 1, color: 'white' }} /> : <MovieIcon sx={{ mr: 1, color: 'white' }} />}
            <Typography variant="h6" noWrap>{movie.title}</Typography>
          </Box>

          <Typography variant="body2" sx={{ opacity: 0.7 }}>{movie.director}</Typography>

          <Box mt={1} display="flex" gap={1} flexWrap="wrap">
            <Chip label={movie.genre} size="small" sx={{ bgcolor: '#2a2a2a', color: 'white' }} />
            <Chip label={movie.platform} size="small" sx={{ bgcolor: '#2a2a2a', color: 'white' }} />
            <Chip
              label={movie.status}
              size="small"
              sx={{
                bgcolor:
                  movie.status === 'completed'
                    ? '#388e3c'
                    : movie.status === 'watching'
                      ? '#f57c00'
                      : '#555',
                color: 'white'
              }}
            />
          </Box>

          {movie.is_tv && (
            <Box mt={2}>
              <Typography variant="caption">
                Episodes: {movie.episodes_watched}/{movie.total_episodes}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(movie.episodes_watched / movie.total_episodes) * 100}
                sx={{ mt: 1, height: 8, borderRadius: 5, backgroundColor: '#333', '& .MuiLinearProgress-bar': { backgroundColor: '#90caf9' } }}
              />
            </Box>
          )}

          <Box mt={2} display="flex" alignItems="center">
            <Rating value={rating} onChange={(e, newVal) => handleRatingChange(newVal)} sx={{ color: '#ffb400', '& .MuiRating-iconEmpty': { color: 'white' } }} />
            <Button size="small" variant="outlined" onClick={() => setOpenReview(true)} sx={{ ml: 2, color: 'white', borderColor: 'white', '&:hover': { borderColor: '#90caf9', color: '#90caf9' } }}>Review</Button>
          </Box>

          {/* Show saved review if available */}
          {movie.review && (
            <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', opacity: 0.8 }}>
              “{movie.review}”
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={openReview} onClose={() => setOpenReview(false)} fullWidth maxWidth="sm">
        <DialogTitle>Write a Review</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            minRows={3}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your thoughts..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenReview(false)} color="error">Cancel</Button>
          <Button onClick={handleSaveReview} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default MovieC