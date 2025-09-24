import React from 'react'
import { Grid } from '@mui/material'
import MovieC from './MovieC'

function MovieL({movies}) {
    return (
        <>
           <Grid container spacing={2}>
      {movies.map(m=>(
        <Grid item xs={12} sm={6} md={4} lg={3} key={m.id}>
          <MovieC movie={m}/>
        </Grid>
      ))}
    </Grid>
        </>
    )
}

export default MovieL