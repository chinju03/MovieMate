import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography, LinearProgress, Box } from '@mui/material'

function MovieD({ open, onClose, movie }) {
  if (!movie) return null
  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>{movie.title}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" color="text.secondary">
            Directed by {movie.director}
          </Typography>
          <Typography variant="body2">
            Genre: {movie.genre} • Platform: {movie.platform}
          </Typography>
          <Typography variant="body2">Status: {movie.status}</Typography>
          {movie.is_tv && (
            <Box mt={1}>
              <Typography variant="caption">
                Progress: {movie.episodes_watched}/{movie.total_episodes}
              </Typography>
              <LinearProgress variant="determinate"
                value={(movie.episodes_watched / movie.total_episodes) * 100} />
            </Box>
          )}
          <Typography variant="body2" sx={{ mt: 2 }}>
            {/* You can show notes/reviews here */}
            No reviews yet. (later wire to backend)
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default MovieD