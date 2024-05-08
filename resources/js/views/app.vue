<template>
    <div class="container comments">
        <sort-buttons @change-sort-method="(sortObj) => sortComments(sortObj)" />

        <comments-list :comments-list="currentCommentsList"/>

        <pagination
            :total-pages="totalPages"
            :current-page="currentPage"
            @change-current-page="(pageNumber) => changeCurrentPage(pageNumber)"
        />

        <add-comment-form />
    </div>
</template>
<script>
import addCommentForm from "../components/addCommentForm.vue";
import commentsList from "../components/commentsList.vue";
import { mapState } from "vuex";
import pagination from "../components/pagination.vue";
import SortButtons from "../components/sortButtons.vue";
import {SORT_METHODS, SORT_DIRECTIONS} from "../constants/sortingConstants";

const default_layout = "default";

export default {
    name: 'app',
    data() {
        return {
            comments : [],
            totalPages: 1,
            currentPage: 1,
            commentsPerPage: 3,
        }
    },
    computed: {
        ...mapState(['comments/comments']),

        currentCommentsList() {
            const start = (this.currentPage - 1) * this.commentsPerPage;
            const end = start + this.commentsPerPage;

            return this.comments.slice(start, end);
        }
    },
    components: {SortButtons, addCommentForm, commentsList, pagination},
    mounted() {
        this.$store.dispatch('comments/GET_LIST')
            .then(() => {
                this.comments = this.$store.state.comments.comments;
            });
    },
    watch: {
        comments() {
            this.totalPages = Math.ceil(this.comments.length / this.commentsPerPage);
        },
    },
    methods: {
        changeCurrentPage(pageNumber) {
            this.currentPage = pageNumber;
        },
        sortById(sortDirection) {
            if (sortDirection === SORT_DIRECTIONS.desc) {
                this.comments.sort((a, b) => b.id - a.id);
                return;
            }

            this.comments.sort((a, b) => a.id - b.id);
        },
        sortByDate(sortDirection) {
            if (sortDirection === SORT_DIRECTIONS.desc) {
                this.comments.sort((a, b) => new Date(b.date) - new Date(a.date));
                return;
            }

            this.comments.sort((a, b) => new Date(a.date) - new Date(b.date));
        },
        sortComments(sortObj) {
            if (sortObj.method === SORT_METHODS.byId) {
                this.sortById(sortObj.direction);
                return;
            }

            this.sortByDate(sortObj.direction);
        }
    }
};
</script>

<style lang="scss" scoped>
.container {
    margin: 20px auto;
    max-width: 600px;
}

.pagination {
    padding: 0;
    list-style: none;
}
</style>
