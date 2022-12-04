import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store/index.js'
import { Typography, Paper, Box } from '@mui/material';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function PublishedSongListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { songs } = props;
    store.history = useHistory();
    let page;

    //if(store.currentList) {
        page = 
            <Paper 
                id="published-playlist-card" 
                sx={{ pd: 5, left: '2.5%', height: '100%', width: '95%' }}
            >
                {
                    songs.map((song, index) => (
                        <Typography sx={{ pl: 1, py: 0.5, width: '100%', fontSize: 24, fontWeight: 'bold', bgcolor: '#528AAE', color: 'white' }}>
                            {index + 1}.
                            {song.title} by {song.artist}
                        </Typography>
                    ))  
                }
            </Paper>            

    return (
        page
    )
}

export default PublishedSongListCard;