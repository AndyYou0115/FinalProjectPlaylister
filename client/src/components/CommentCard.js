import { Paper, Box, Typography, Link } from '@mui/material';
import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';

function CommentCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const { comment } = props;

    function handleLoadUser(event) {
        console.log("loaduser")
        store.loadUser(auth.user.email, comment.by);
    }

    return (
        <Paper sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', my: 1, width: '100%', height: '25%', bgcolor: '#FFAE42' }}>
           <Box sx={{ pl: 2, fontSize: 20 }}>
           {<Link  
                component='button'
                onClick={handleLoadUser}
                sx={{ fontSize: 20 }}
            >
                {comment.by}
            </Link>}
            </Box>
           <Typography sx={{ pt: 1, pl: 3, fontSize: 23 }}>{comment.comment}</Typography> 
        </Paper>
    );
}

export default CommentCard;