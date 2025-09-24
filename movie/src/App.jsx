import { useState, useEffect } from 'react'
import MovieL from './components/MovieL'
import MovieF from './components/MovieF'
import FilterBar from './components/FilterBar'
import { Box, CssBaseline, Drawer, List, ListItem, ListItemText, Typography, Button, Dialog, DialogTitle, DialogContent, } from '@mui/material'
import api from './api'

const drawerWidth = 260

function App() {
  const [movies, setMovies] = useState([])
  const [filters, setFilters] = useState({ genre: '', platform: '', status: '' })
  const [openForm, setOpenForm] = useState(false)

  // Fetch movies
  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    const res = await api.get('')
    setMovies(res.data)
  }

  const addMovie = async (data) => {
    await api.post('', data)
    fetchMovies()
  }


  return (
    <>
      <Box sx={{ display: 'flex', bgcolor: '#121212', minHeight: '100vh', color: 'white' }}>
        <CssBaseline />

        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: '#1e1e1e',
              color: 'white',
              borderRight: '1px solid #333'
            },
          }}
        >
          <Box p={2}>
            <Typography variant="h5" gutterBottom>Watchlist</Typography>
            <List>
              <ListItem><ListItemText primary="The Last of Us (2023)" /></ListItem>
              <ListItem><ListItemText primary="Teen Wolf: The Movie" /></ListItem>
              <ListItem><ListItemText primary="Independence Day" /></ListItem>
              <ListItem><ListItemText primary="Dune" /></ListItem>
              <ListItem><ListItemText primary="Prey" /></ListItem>
              <ListItem><ListItemText primary="Edge of Tomorrow" /></ListItem>
              <ListItem><ListItemText primary="Breaking Bad (Series)" /></ListItem>
            </List>

            <Typography variant="h6" sx={{ mt: 3 }}>By Type</Typography>
            <List>
              <ListItem><ListItemText primary="Watchlist" /></ListItem>
              <ListItem><ListItemText primary="Series" /></ListItem>
              <ListItem><ListItemText primary="Trilogy" /></ListItem>
              <ListItem><ListItemText primary="Genre" /></ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">🎬 MovieMate</Typography>
            <Box display="flex" gap={2}>
              <FilterBar filters={filters} setFilters={setFilters} />
              <Button variant="contained" onClick={() => setOpenForm(true)}>Add Movie/Show</Button>
            </Box>
          </Box>

          <MovieL movies={movies.filter(m =>
            (!filters.genre || m.genre === filters.genre) &&
            (!filters.platform || m.platform === filters.platform) &&
            (!filters.status || m.status === filters.status)
          )} />

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
