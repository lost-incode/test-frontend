<template>
    <div class="comment" v-if="comment">
        <div class="comment__content-wrapper">
            <p class="comment__id">id: {{ comment.id }}</p>

            <button class="comment__delete-button" @click="deleteComment(comment.id)">Удалить</button>
        </div>

        <p class="comment__date">Дата: {{ comment.date }}</p>
        <p class="comment__name">Имя: {{ comment.name }}</p>
        <p class="comment__text">Текст комментария: {{ comment.text }}</p>
    </div>
</template>

<script>

export default {
    name: 'comment',
    props: {
        comment: {
            type: Object,
            required: true,
        }
    },
    methods: {
        deleteComment(id) {
            this.$store.dispatch('comments/DELETE_COMMENT', id);
        }
    }
}
</script>

<style lang="scss" scoped>
.comment {
    padding: 24px;
    border: 2px solid #206dd0;
    border-radius: 16px;

    &__content-wrapper {
        display: flex;
        justify-content: space-between;
    }

    &__delete-button {
        font-size: 14px;
        font-weight: 600;
        padding: 7px 10px;
        border: none;
        border-radius: 10px;
        transition: all 0.3ms ease-in;

        &:hover {
            background-color: #206dd0;
            color: white;
        }
    }
}
</style>
