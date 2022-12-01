import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import { Button, TextField, Tabs, Tab, List} from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SortIcon from '@mui/icons-material/Sort';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

/*
    This React component lists all the lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        store.loadIdNamePairs();
    }, [])

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id='primary-search-account-menu'
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Name &#40;A - Z&#41;</MenuItem>
            <MenuItem onClick={handleMenuClose}>Publish Date &#40;Newest&#41;</MenuItem>
            <MenuItem onClick={handleMenuClose}>Listens &#40;High - Low&#41;</MenuItem>
            <MenuItem onClick={handleMenuClose}>Likes &#40;High - Low&#41;</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dislikes &#40;High - Low&#41;</MenuItem>
        </Menu>
    );

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ left: '1%', bottom: '1%', height: '100%', width: '100%', bgcolor: '#eeeeedd' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </List>;
    }

    return (
        <div id="homescreen">
            <div id="homescreen-heading">
                <Button 
                    aria-label="home"
                    id="home-button"
                    style={{ color: "#000000" }}
                    //onClick={}
                >
                    <HomeOutlinedIcon style={{ fontSize: 50 }}/>
                </Button>
                <Button 
                    aria-label="all-list"
                    id="all-list-button"
                    style={{ color: "#000000" }}
                    //onClick={}
                >
                    <PeopleAltOutlinedIcon style={{ fontSize: 50 }}/>
                </Button>
                <Button 
                    aria-label="users"
                    id="users-button"
                    style={{ color: "#000000" }}
                    //onClick={}
                >
                    <PersonOutlineOutlinedIcon style={{ fontSize: 50 }}/>
                </Button>
                <TextField 
                    id="outlined-basic" 
                    label="Search" 
                    variant="outlined" 
                    sx={{ ml: 10, width: 700, backgroundColor: 'white'}}
                /> 
                <Button
                    size="large"
                    edge="end"
                    aria-label="sort by"
                    aria-controls='primary-search-account-menu'
                    aria-haspopup="true"
                    onClick={handleMenuOpen}
                    color="inherit"
                    endIcon={<SortIcon/>}
                    sx={{ ml: 40, fontSize: 20, fontWeight: 'bold'}}
                > 
                    Sort By
                </Button>
                {menu}
            </div>
            <div id="homescreen-sections">
                <div id="playlist-selector-list">
                    {listCard}
                </div>
                <div id="player-comment-tab">
                    <Tabs>
                        <Tab label="Player"/>
                        <Tab label="Comments"/>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;