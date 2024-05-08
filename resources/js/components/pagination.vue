<template>
    <ul class="pagination">
        <li v-for="i in totalPages">
            <button
                class="pagination__button"
                :class="{'pagination__button--current': currentPage === i}"
                @click="changeCurrentPage(i)"
            >
                {{ i }}
            </button>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'pagination',
    props: {
        totalPages: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
    },
    methods: {
        changeCurrentPage(pageNumber) {
            this.$emit('change-current-page', pageNumber);
        }
    }
}
</script>

<style lang="scss" scoped>
.pagination {
    display: flex;
    column-gap: 10px;

    &__button {
        font-size: 16px;
        font-weight: 600;
        padding: 10px 20px;
        border: none;
        border-radius: 10px;
        transition: all 0.3ms ease-in;

        &--current {
            background-color: #206dd0;
            color: white;
        }
    }
}
</style>
