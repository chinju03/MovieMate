import React from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

function FilterBar({ filters, setFilters }) {
    const handle = (k, v) => setFilters({ ...filters, [k]: v })

    const selectStyles = {
        color: 'white',
        '.MuiSvgIcon-root': { color: 'white' },
        '.MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#bbb' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90caf9' },
        bgcolor: '#2a2a2a'
    }
    return (
        <>
            <Box display="flex" gap={2}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: 'white' }}>Genre</InputLabel>
                    <Select value={filters.genre} label="Genre" onChange={e => handle('genre', e.target.value)} sx={selectStyles}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Sci-Fi">Sci-Fi</MenuItem>
                        <MenuItem value="Action">Action</MenuItem>
                        <MenuItem value="Drama">Drama</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: 'white' }}>Platform</InputLabel>
                    <Select value={filters.platform} label="Platform" onChange={e => handle('platform', e.target.value)} sx={selectStyles}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Netflix">Netflix</MenuItem>
                        <MenuItem value="Prime">Prime</MenuItem>
                        <MenuItem value="Disney+">Disney+</MenuItem>
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: 'white' }}>Status</InputLabel>
                    <Select value={filters.status} label="Status" onChange={e => handle('status', e.target.value)}  sx={selectStyles}>
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="watching">Watching</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                        <MenuItem value="wishlist">Wishlist</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </>
    )
}

export default FilterBar