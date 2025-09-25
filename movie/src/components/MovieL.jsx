import React from 'react'
import { Grid, CircularProgress, Box } from '@mui/material'
import MovieC from './MovieC'

function MovieL({ movies, loading, onUpdate, onDelete }) {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 5 }}>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <>
      <Grid container spacing={3}>
        {movies.map(m => (
          <Grid item xs={12} sm={6} md={4}  key={m.id}>
            <MovieC movie={m} onUpdate={onUpdate} onDelete={onDelete} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default MovieL