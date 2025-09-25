import { useState, useEffect } from 'react'
import MovieL from './components/MovieL'
import MovieF from './components/MovieF'
import FilterBar from './components/FilterBar'
import SearchAndAddMovie from './components/SearchAndAddMovie'
import { Box, CssBaseline, Drawer, List, ListItem, ListItemText, Typography, Button, Dialog, DialogTitle, DialogContent, } from '@mui/material'
import "@fontsource/poppins";
import api from './api'
import './App.css'


const drawerWidth = 260

function App() {
  const [movies, setMovies] = useState([])
  const [filters, setFilters] = useState({ genre: '', platform: '', status: '' })
  const [openForm, setOpenForm] = useState(false)
  const [loading, setLoading] = useState(false)

  // Fetch movies
  useEffect(() => {
    fetchMovies()
  }, [])

  // Fetch all movies from backend
  const fetchMovies = async () => {
    setLoading(true)
    try {
      const res = await api.get('') // Calls baseURL: http://127.0.0.1:8000/api/playground/
      setMovies(res.data)
    } catch (err) {
      console.error("Failed to fetch movies:", err)
    } finally {
      setLoading(false)
    }
  }

  const addMovie = async (data) => {
    console.log("Posting movie:", data);
    try {
      await api.post('', data)  // backend saves it
      fetchMovies()            // reload fresh list from backend
    } catch (err) {
      console.error("Error adding movie:", err)
    }
  }
  // Update movie
  const updateMovie = async (id, updatedData) => {
    try {
      await api.patch(`${id}/`, updatedData)
      fetchMovies()
    } catch (err) {
      console.error("Error updating movie:", err)
    }
  }

  const deleteMovie = async (id) => {
    try {
      await api.delete(`${id}/`)
      fetchMovies()
    } catch (err) {
      console.error("Error deleting movie:", err)
    }
  }

  const uniqueGenres = [...new Set(movies.map(m => m.genre).filter(g => g))].sort()
  const uniquePlatforms = [...new Set(movies.map(m => m.platform).filter(p => p))].sort()
  const statusOptions = ['wishlist', 'watching', 'completed']

  return (
    <>

      <header className="header">
        <div className="overlay">

          <Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4" sx={{ color: "white" }}>🎬 MovieMate</Typography>
            <Box display="flex" gap={2} sx={{
              ml: 12,
              p: 2,
              bgcolor: 'rgba(255,255,255,0.05)',
              borderRadius: 2,
              backdropFilter: 'blur(6px)',
              alignContent: "end"
            }} >
              <FilterBar
                filters={filters}
                setFilters={setFilters}
                genres={uniqueGenres}
                platforms={uniquePlatforms}
                statuses={statusOptions}
              />
              <Button variant="contained" sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                color: '#fff',
                fontWeight: 'bold'
              }} onClick={() => setOpenForm(true)}>Add Movie/Show</Button>
            </Box>
          </Box>
        </div>
      </header>


      <Box sx={{ display: 'flex', bgcolor: '#121212', minHeight: '100vh', color: 'white' }}>
        <CssBaseline />


        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>


          {/* Search box that fetches from OMDb */}
          <SearchAndAddMovie onAdd={(addMovie)} />

          <MovieL movies={movies.filter(m =>
            (!filters.genre || m.genre.toLowerCase().includes(filters.genre.toLowerCase())) &&
            (!filters.platform || m.platform.toLowerCase().includes(filters.platform.toLowerCase())) &&
            (!filters.status || m.status.toLowerCase() === filters.status.toLowerCase())
          )} loading={loading} onUpdate={updateMovie} onDelete={deleteMovie} />

          {/* Dialog */}
          <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
            <DialogTitle>Add Movie/TV Show</DialogTitle>
            <DialogContent>
              <MovieF onSubmit={(data) => {
                addMovie(data)
                setOpenForm(false)
              }} />
            </DialogContent>
          </Dialog>
        </Box>
      </Box>
    </>
  )
}

export default App
