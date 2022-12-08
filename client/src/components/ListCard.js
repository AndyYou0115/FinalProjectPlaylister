import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Accordion, AccordionDetails, AccordionSummary, Button, Paper, Link } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import PublishIcon from '@mui/icons-material/Publish';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import SongListCard from './SongListCard';
import EditToolbar from './EditToolbar';
import MUIDeleteModal from './MUIDeleteModal'
import PublishedSongListCard from './PublishedSongListCard';
import AuthContext from '../auth';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair } = props;
    let upcolor = '#ADD8E6';
    let pcolor = '#FFAE42';

    if(store.currentList) {
        if(store.currentList._id === idNamePair._id) {
            if(idNamePair.publishDate !== "N/A") {
                pcolor = 'white';
            }
            else {
                upcolor = 'white';
            }
        }
        else {
            upcolor = '#ADD8E6';
            pcolor = '#FFAE42';
        }
    }

    function handleOpen() {
        store.setOpen(idNamePair.name);
    }

    function handleClose() {
        if(store.currentOpen === idNamePair.name) {
            store.setClose();
        }
    }

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.addCommentLikeDislikeListen('none', 'none', false, false, true, id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }

    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleLikeDislikeListen(event, type) {
        event.stopPropagation();
        if(type === 1) {
            store.addCommentLikeDislikeListen('none', 'none', true, false, false, idNamePair._id);
        }
        else if(type === 2) {
            store.addCommentLikeDislikeListen('none', 'none', false, true, false, idNamePair._id);
        }
    }

    function handleDupe() {
        store.createNewList(idNamePair.name, idNamePair.songs);
    }

    function handlePublish() {
        store.publishList(idNamePair._id);
    }

    // function handleLoadUser() {
    //     store.loadIdNamePair();
    // }

    let dislikeButton =
    <Button 
        aria-label="dislike"
        id="dislike-button"
        sx={{ color: "#000000", mr: 5 }}
        startIcon={<ThumbDownAltOutlinedIcon style={{fontSize:'24pt'}} />}
        onClick={(event) => handleLikeDislikeListen(event, 2)}
    >
        {idNamePair.dislikes}
    </Button>;
    let likeButton =
        <Button 
            aria-label="like"
            id="like-button"
            sx={{ color: "#000000", ml: 40, mr: 5}}
            startIcon={<ThumbUpAltOutlinedIcon style={{fontSize:'24pt'}} />}
            onClick={(event) => handleLikeDislikeListen(event, 1)}
        >
            {idNamePair.likes}
        </Button>;
    let dupeButton;
    let deleteButton;
    if(auth.guest) {
        likeButton =
        <Button 
            aria-label="like"
            id="like-button"
            sx={{ color: "#000000", ml: 40, mr: 5}}
            startIcon={<ThumbUpAltOutlinedIcon style={{fontSize:'24pt'}} />}
            onClick={(event) => handleLikeDislikeListen(event, 1)}
            disabled={true}
        >
            {idNamePair.likes}
        </Button>;

        dislikeButton =
        <Button 
            aria-label="dislike"
            id="dislike-button"
            sx={{ color: "#000000", mr: 5 }}
            startIcon={<ThumbDownAltOutlinedIcon style={{fontSize:'24pt'}} />}
            onClick={(event) => handleLikeDislikeListen(event, 2)}
            disabled={true}
        >
            {idNamePair.dislikes}
        </Button>;

        dupeButton =
        <IconButton 
            onClick={handleDupe} 
            aria-label='duplicate'>
            <FileCopyIcon style={{fontSize:'32pt'}} />
        </IconButton>;

    }

    if(auth.user.email === idNamePair.owner && !auth.guest) {
        deleteButton = 
        <IconButton 
            onClick={(event) => {handleDeleteList(event, idNamePair._id)}} 
            aria-label='delete'>
            <DeleteIcon style={{fontSize:'32pt'}} />
        </IconButton>;
    }

    function handleLoadUser(event) {
        console.log("loaduser")
        event.stopPropagation();
        store.loadUser(auth.user.email, idNamePair.by);
    }
    
    let cardElement;
    if(idNamePair.publishDate === "N/A") {
        cardElement =
        <Paper 
            id={idNamePair._id}
            sx={{ margin: '10px', width: '95%', borderRadius: '5px' }}
        > 
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ height: '20%', p: 1, flexWrap: 'wrap', bgcolor: upcolor, "&:hover":{ bgcolor: upcolor }, borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }}
                button
                onDoubleClick={handleToggleEdit}
                onClick={(event) => {handleLoadList(event, idNamePair._id)} }
            >
                <Box sx={{ pr: 10, pl: 1, fontSize: 30, fontWeight: 'bold', width: '100%' }}>{idNamePair.name}</Box>
                <Box sx={{ pl: 1, fontSize: 20, width: '55%'}}>By: 
                    {<Link  
                        component='button'
                        onClick={handleLoadUser}
                        sx={{ fontSize: 20 }}
                    >
                        {idNamePair.by}
                    </Link>}
                </Box>
                <Box sx={{ fontSize: 20, width: '25%'}}>Published: {idNamePair.publishDate}</Box>
                <Box sx={{ fontSize: 20, width: '15%'}}>Listens: {idNamePair.listens}</Box>
            </ListItem>
            <Accordion   
                id={idNamePair._id}              
                sx={{ bgcolor: upcolor, '&:before': {display: 'none'} }} 
                elevation={0}
                disableGutters
                expanded={store.currentOpen === idNamePair.name}
                onClick={handleClose}
                onChange={handleOpen}
            >
                <AccordionSummary 
                    expandIcon={ 
                        <KeyboardDoubleArrowDownIcon 
                            style={{ fontSize: 30, color: 'black' }} 
                        /> 
                    }/>
                <AccordionDetails sx={{ maxHeight: 400, overflowY: 'auto' }}>
                    <SongListCard
                        songs={idNamePair.songs}
                    />
                    <EditToolbar/>
                    <MUIDeleteModal/>
                    <IconButton 
                        onClick={(event) => {handleDeleteList(event, idNamePair._id)}} 
                        aria-label='delete'>
                        <DeleteIcon style={{fontSize:'32pt'}} />
                    </IconButton>
                    <IconButton 
                        onClick={handlePublish} 
                        aria-label='publish'>
                        <PublishIcon style={{fontSize:'32pt'}} />
                    </IconButton>
                    <IconButton 
                        onClick={handleDupe} 
                        aria-label='duplicate'>
                        <FileCopyIcon style={{fontSize:'32pt'}} />
                    </IconButton>
                </AccordionDetails>
            </Accordion>
        </Paper>
    }
    else {
        cardElement =
        <Paper 
            id={idNamePair._id}
            sx={{ margin: '10px', width: '95%', borderRadius: '5px' }}
        > 
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ height: '20%', p: 1, flexWrap: 'wrap', bgcolor: pcolor, "&:hover":{ bgcolor: pcolor }, borderTopRightRadius: '5px', borderTopLeftRadius: '5px' }}
                button
                onClick={(event) => {handleLoadList(event, idNamePair._id)} }
                //onDoubleClick={handleToggleEdit}
            >
                <Box sx={{ pr: 10, pl: 1, fontSize: 30, fontWeight: 'bold' }}>{idNamePair.name}</Box>
                {likeButton}
                {dislikeButton}
                <Box sx={{ pl: 1, fontSize: 20, width: '55%'}}>By: 
                    {<Link  
                        component='button'
                        onClick={handleLoadUser}
                        sx={{ fontSize: 20 }}
                    >
                        {idNamePair.by}
                    </Link>}
                </Box>
                <Box sx={{ fontSize: 20, width: '25%'}}>Published: {idNamePair.publishDate}</Box>
                <Box sx={{ fontSize: 20, width: '15%'}}>Listens: {idNamePair.listens}</Box>
            </ListItem>
            <Accordion   
                id={idNamePair._id}              
                sx={{ bgcolor: pcolor, '&:before': {display: 'none'} }} 
                elevation={0}
                disableGutters
                expanded={store.currentOpen === idNamePair.name}
                onClick={handleClose}
                onChange={handleOpen}
            >
                <AccordionSummary 
                    expandIcon={ 
                        <KeyboardDoubleArrowDownIcon 
                            style={{ fontSize: 30, color: 'black' }} 
                        /> 
                    }/>
                <AccordionDetails sx={{ maxHeight: 400, overflowY: 'auto' }}>
                    <PublishedSongListCard
                        songs={idNamePair.songs}
                        >
                    </PublishedSongListCard>
                    <MUIDeleteModal/>
                    {deleteButton}
                    {dupeButton}
                </AccordionDetails>
            </Accordion>
        </Paper>;
    }

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                width='100%'
                id={"list-" + idNamePair._id}
                label='Search'
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;