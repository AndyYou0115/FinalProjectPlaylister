import { Box, Paper, Typography, IconButton } from '@mui/material'
import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import FastRewindIcon from '@mui/icons-material/FastRewind';
import FastForwardIcon from '@mui/icons-material/FastForward';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import YouTube from 'react-youtube';

const YoutubePlayer = () => {
    const { store } = useContext(GlobalStoreContext);
    const [currentSong, setCurrentSong] = useState(0);
 

    // THIS WILL STORE OUR YOUTUBE PLAYER
    //let player;
    //let PLAYER_NAME = 'youtube_player';

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [
        "mqmxkGjow1A",
        "8RbXIMZmVv8",
        "8UbNbor3OqQ"
    ];

    // // DYNAMICALLY LOAD THE YOUTUBE API FOR USE
    // let tag = document.createElement('script');
    // tag.src = "https://www.youtube.com/iframe_api";
    // let firstScriptTag = document.getElementsByTagName('script')[0];
    // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // // THE onYouTubeIframeAPIReady FUNCTION IS GLOBAL AND GETS CALLED
    // // WHEN WHEN THE YOUTUBE API HAS BEEN LOADED AS A RESULT OF
    // // OUR DYNAMICALLY LOADING INTO OUR PAGE'S SCRIPT
    // function onYouTubeIframeAPIReady() {
    //     // START OUR PLAYLIST AT THE BEGINNING
    //     currentSong = 0;

    //     // NOW MAKE OUR PLAYER WITH OUR DESIRED PROPERTIES
    //     if (currentSong >= 0) {
    //         player = new window.YT.Player(PLAYER_NAME, {
    //             height: '390',
    //             width: '640',
    //             playerVars: {
    //                 'playsinline': 1,
    //                 'origin': "https://www.youtube.com"
    //             },
    //             events: {
    //                 // NOTE OUR EVENT HANDLER FUNCTIONS HERE
    //                 'onReady': onPlayerReady,
    //                 'onStateChange': onPlayerStateChange
    //             }
    //         });
    //     }
    // }

    // THIS EVENT HANDLER GETS CALLED ONCE THE PLAYER IS CREATED
    function onPlayerReady(event) {
        //loadAndPlayCurrentSong();
        event.target.playVideo();
    }

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    // function loadAndPlayCurrentSong() {
    //     let song = playlist[currentSong];
    //     player.loadVideoById(song);
    //     player.playVideo();
    // }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        let i=currentSong+1;
        setCurrentSong(i);
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.target.getPlayerState();

        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            //loadAndPlayCurrentSong();
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
        // if (color) {
        //     document.getElementById(PLAYER_NAME).style.borderColor = color;
        // }
    }

    return(
        <div>
            <YouTube
                key={playlist[currentSong]}
                videoId={playlist[currentSong]}
                opts = {{
                    height: 290,
                    width: '100%',
                    playerVars: {
                        playsinline: 1,
                        autoplay: 1,
                        origin: "https://www.youtube.com"
                    }
                }}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange}
            />
            <Paper
                id="player-info"
                sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', bgcolor: '#ADD8E6' }}
            >
                <Typography sx={{ pl: 1, pt: 1, fontWeight: 'bold' }}>Playlist:&#32;{ "" ?? store.currentList.name}</Typography> 
                <Typography sx={{ pl: 1, fontWeight: 'bold' }}>Song&#32;#:&#32;{ "" ?? store.currentSongIndex}</Typography>  
                <Typography sx={{ pl: 1, fontWeight: 'bold' }}>Title:&#32;{ "" ?? store.currentSong.title}</Typography>  
                <Typography sx={{ pl: 1, fontWeight: 'bold' }}>Artist:&#32;{ "" ?? store.currentSong.artist}</Typography>
                <Box 
                    display="flex" 
                    alignItems="center"
                    justifyContent="center"
                > 
                    <IconButton
                        id='prev-song-button'
                        sx={{bgColor: 'transparent', mx: 1}}
                        //onClick={handleAddNewSong}
                        variant="contained">
                        <FastRewindIcon sx={{ fontSize: 30 }}/>
                    </IconButton>
                    <IconButton 
                        id='stop-song-button'
                        sx={{bgColor: 'transparent', mx: 1}}
                        //onClick={handleUndo}
                        variant="contained">
                            <StopIcon sx={{ fontSize: 30 }}/>
                    </IconButton>
                    <IconButton 
                        id='play-song-button'
                        sx={{bgColor: 'transparent', mx: 1}}
                        //onClick={handleRedo}
                        variant="contained">
                            <PlayArrowIcon sx={{ fontSize: 30 }}/>
                    </IconButton>
                    <IconButton 
                        id='next-song-button'
                        sx={{bgColor: 'transparent', mx: 1}}
                        //onClick={handleClose}
                        variant="contained">
                            <FastForwardIcon sx={{ fontSize: 30 }}/>
                    </IconButton>
                </Box>
            </Paper>
        </div>
    );
}

export default YoutubePlayer;