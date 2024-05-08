import CommentsApi from '../../api/Comments';

export default {
    namespaced: true,

    state: {
        comments: [],
    },

    mutations: {
        SET_COMMENTS (state, payload) {
            state.comments = payload;
        },
        ADD_COMMENT (state, payload) {
            state.comments.push(payload);
        },
        DELETE_COMMENT(state, id) {
            const commentIndex = state.comments.findIndex(comment => comment.id === id);

            if (commentIndex !== -1) {
                state.comments.splice(commentIndex, 1);
            }
        },
    },

    actions: {
        GET_LIST (context, config) {
            return CommentsApi.getComments()
                .then(comments => {
                    context.commit('SET_COMMENTS', comments)
                })
                .catch(error => console.error(error))
        },
        CREATE_COMMENT (context, payload) {
            return CommentsApi.createComment(payload)
                .then(comment => {
                    context.commit('ADD_COMMENT', comment.data)
                })
                .catch(error => console.error(error))
        },
        DELETE_COMMENT (context, id) {
            return CommentsApi.deleteComment(id)
                .then(comment => {
                    context.commit('DELETE_COMMENT', id)
                })
                .catch(error => console.error(error))
        }
    }
}
