<template>
    <section class="comments">
        <h3 class="comments__title">Список комментариев</h3>

        <ul class="comments__list">
            <li
                class="comments__item"
                v-for="(comment, index) in commentsList"
                :key="index"
            >
                <comment :comment="comment"></comment>
            </li>
        </ul>
    </section>
</template>

<script>
import comment from "./comment.vue";

export default {
    name: 'comments-list',
    props: {
        commentsList: {
            type: Array,
            required: true,
        }
    },
    components: {
        comment
    },
}
</script>

<style lang="scss" scoped>
.comments {
    &__title {
        font-weight: 700;
    }

    &__list {
        padding: 0;
        list-style: none;
    }

    &__item:not(:last-child) {
        margin-bottom: 20px;
    }
}
</style>
