import React from 'react'
import { useState } from 'react'
import { TextField, Grid, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Button } from '@mui/material'
// import API from '../api'

function MovieF({ onSubmit }) {
    const [form, setForm] = useState({
        title: '', director: '', genre: '', platform: '', status: 'wishlist', is_tv: false, total_episodes: 0, episodes_watched: 0, rating: 0, review: ''
    })
    const handle = (k, v) => setForm({ ...form, [k]: v })
    const submit = (e) => {
        e.preventDefault()
        onSubmit(form)
        setForm({ title: '', director: '', genre: '', platform: '', status: 'wishlist', is_tv: false, total_episodes: 0, episodes_watched: 0, rating: 0, review: '' })
    }
    return (
        <>
            <form onSubmit={submit}>
                <Grid container spacing={2} mt={1}>
                    <Grid item xs={12} sm={6}><TextField fullWidth required label="Title" value={form.title} onChange={e => handle('title', e.target.value)} /></Grid>
                    <Grid item xs={12} sm={6}><TextField fullWidth label="Director" value={form.director} onChange={e => handle('director', e.target.value)} /></Grid>
                    <Grid item xs={12} sm={6}><TextField fullWidth label="Genre" value={form.genre} onChange={e => handle('genre', e.target.value)} /></Grid>
                    <Grid item xs={12} sm={6}><TextField fullWidth label="Platform" value={form.platform} onChange={e => handle('platform', e.target.value)} /></Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth size="small" sx={{ minWidth: 120 }}>
                            <InputLabel shrink>Status</InputLabel>
                            <Select value={form.status} label="Status" onChange={e => handle('status', e.target.value)}>
                                <MenuItem value="wishlist">Wishlist</MenuItem>
                                <MenuItem value="watching">Watching</MenuItem>
                                <MenuItem value="completed">Completed</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel control={<Checkbox checked={form.is_tv} onChange={e => handle('is_tv', e.target.checked)} />} label="TV Show?" />
                    </Grid>
                    {form.is_tv && (
                        <>
                            <Grid item xs={12} sm={6}><TextField fullWidth label="Total Episodes" type="number" value={form.total_episodes} onChange={e => handle('total_episodes', Number(e.target.value))} /></Grid>
                            <Grid item xs={12} sm={6}><TextField fullWidth label="Episodes Watched" type="number" value={form.episodes_watched} onChange={e => handle('episodes_watched', Number(e.target.value))} /></Grid>
                        </>
                    )}
                    <Grid item xs={12}><Button variant="contained" type="submit">Add</Button></Grid>
                </Grid>
            </form>
        </>
    )
}

export default MovieF