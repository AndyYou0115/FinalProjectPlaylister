import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function SongListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { songs } = props;
    store.history = useHistory();
    let page;

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    //if(store.currentList) {
        page = 
        <Box>
            <List 
                id="playlist-cards" 
                sx={{ pd: 5, left: '2.5%', height: '100%', width: '95%', bgcolor: '#eeeeedd'  }}
            >
                {
                    songs.map((song, index) => (
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                        />
                    ))  
                }
            </List>
            {modalJSX}
         </Box>            
    //} else {
        //page =<div></div>
   //}

    return (
        page
    )
}

export default SongListCard;