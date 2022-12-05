/*
    This is our http api, which we use to send requests to
    our back-end API. Note we`re using the Axios library
    for doing this, which is an easy to use AJAX-based
    library. We could (and maybe should) use Fetch, which
    is a native (to browsers) standard, but Axios is easier
    to use when sending JSON back and forth and it`s a Promise-
    based API which helps a lot with asynchronous communication.
    
    @author McKilla Gorilla
*/

import axios from 'axios'
axios.defaults.withCredentials = true;
const api = axios.create({
    baseURL: 'http://localhost:4000/api',
})

// THESE ARE ALL THE REQUESTS WE`LL BE MAKING, ALL REQUESTS HAVE A
// REQUEST METHOD (like get) AND PATH (like /top5list). SOME ALSO
// REQUIRE AN id SO THAT THE SERVER KNOWS ON WHICH LIST TO DO ITS
// WORK, AND SOME REQUIRE DATA, WHICH WE WE WILL FORMAT HERE, FOR WHEN
// WE NEED TO PUT THINGS INTO THE DATABASE OR IF WE HAVE SOME
// CUSTOM FILTERS FOR QUERIES
export const createPlaylist = (newListName, newSongs, newComments, userEmail, userName) => {
    return api.post(`/playlist/`, {
        // SPECIFY THE PAYLOAD
        name: newListName,
        by: userName, 
        ownerEmail: userEmail,
        likes: 0,
        dislikes: 0,
        listens: 0,
        publishDate: "N/A",
        songs: newSongs,
        comments: newComments,
        likedDislikedUsers: [] 
    })
}
export const deletePlaylistById = (id) => api.delete(`/playlist/${id}`)
export const getPlaylistById = (id, email) => api.get(`/playlist/${id}/${email}`)
export const getPlaylistPairs = () => api.get(`/playlistpairs/`)
export const updatePlaylistById = (id, playlist) => {
    return api.put(`/playlist/${id}`, {
        // SPECIFY THE PAYLOAD
        playlist : playlist
    })
}
export const addCommentLikeDislikeListenById = (userName, comment, like, dislike, listen, id, email) => {
    return api.put(`/playlist/comment/${id}/${email}`, {
        // SPECIFY THE PAYLOAD
        userName: userName,
        comment: comment,
        like: like,
        dislike: dislike,
        listen: listen
    })
}
export const publishPlaylistById = (id) => {
    return api.put(`/playlist/publish/${id}`)
}
export const getPlaylistPairsByName = (criteria, email) => api.get(`/playlistpairs/name/${criteria}/${email}`)
export const getPlaylistPairsByUser = (criteria, email) => api.get(`/playlistpairs/user/${criteria}/${email}`)
export const getAllPublishedPlaylistPairs = () => api.get(`/playlistpairs/published/`)

const apis = {
    createPlaylist,
    deletePlaylistById,
    getPlaylistById,
    getPlaylistPairs,
    updatePlaylistById,
    addCommentLikeDislikeListenById,
    publishPlaylistById,
    getPlaylistPairsByName,
    getPlaylistPairsByUser,
    getAllPublishedPlaylistPairs
}

export default apis
