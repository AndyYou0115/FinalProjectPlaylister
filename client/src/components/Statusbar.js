import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import { Button, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    let content = <Typography variant="h4" style={{ fontSize: 20 }}> By: Andy You </Typography>;

    function handleCreateNewList() {
        store.createNewList();
    }

    if (auth.loggedIn) {
        content = 
            <Button 
                aria-label="add"
                id="add-button"
                style={{ color: "#000000" }}
                onClick={handleCreateNewList}
            >
                <AddIcon style={{ fontSize: 50 }}/>
            </Button>
    }
    if (store.currentList) {
        content = 
            <Button 
                aria-label="add"
                id="add-button"
                style={{ color: "#000000" }}
                onClick={handleCreateNewList}
            >
                <AddIcon style={{ fontSize: 50 }}/>
                <Typography variant="h4" style={{ fontSize: 20 }}> {store.currentList.name} </Typography>;
            </Button>
    }

    return (
        <div id="playlister-statusbar">
            {content}
        </div>
    );
}

export default Statusbar;