import axios from "axios";

export default {
    getComments (){
        return axios.get('/comments/')
            .then(response => {
                return response.data
            })
    },

    createComment (payload) {
        return axios.post('/comments/', payload);
    },

    deleteComment (id) {
        return axios.delete(`/comments/${id}`);
    }
}
