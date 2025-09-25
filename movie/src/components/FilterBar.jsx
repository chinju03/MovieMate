import React from 'react'
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material'

function FilterBar({ filters, setFilters, genres = [], platforms = [], statuses = [] }) {
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

                {/* Genre Filter */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: 'white' }}>Genre</InputLabel>
                    <Select value={filters.genre} label="Genre" onChange={e => setFilters({ ...filters, genre: e.target.value })} sx={selectStyles}>
                        <MenuItem value="">All</MenuItem>
                        {genres.map(g => <MenuItem key={g} value={g}>{g}</MenuItem>)}
                    </Select>
                </FormControl>

                {/* Platform Filter */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: 'white' }}>Platform</InputLabel>
                    <Select value={filters.platform} label="Platform" onChange={e => setFilters({ ...filters, platform: e.target.value })} sx={selectStyles}>
                        <MenuItem value="">All</MenuItem>
                        {platforms.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                    </Select>
                </FormControl>

                {/* Status Filter  */}
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel sx={{ color: 'white' }}>Status</InputLabel>
                    <Select value={filters.status} label="Status" onChange={e => setFilters({ ...filters, status: e.target.value })} sx={selectStyles}>
                        <MenuItem value="">All</MenuItem>
                        {statuses.map(s => <MenuItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
        </>
    )
}

export default FilterBar