<template>
    <div class="sort">
        <h3 class="sort__title">Сортировка</h3>
        <button
            @click="changeSortMethod(SORT_METHODS.byId)"
            class="sort__button"
            :class="{'sort__button--active': sortMethod === SORT_METHODS.byId}"
        >
            По айди
        </button>

        <button
            @click="changeSortMethod(SORT_METHODS.byDate)"
            class="sort__button"
            :class="{'sort__button--active': sortMethod === SORT_METHODS.byDate}"
        >
            По дате
        </button>

<!--        <div class="sort__buttons-wrapper">-->
            <button
                :disabled="!sortMethod"
                class="sort__button sort__button--text"
                :class="{'sort__button--active': sortDirection === SORT_DIRECTIONS.desc}"
                @click="changeSortDirection(SORT_DIRECTIONS.desc)"
            >
                По убыванию
            </button>

            <button
                :disabled="!sortMethod"
                class="sort__button sort__button--text"
                :class="{'sort__button--active': sortDirection === SORT_DIRECTIONS.asc}"
                @click="changeSortDirection(SORT_DIRECTIONS.asc)"
            >
                По возрастанию
            </button>
<!--        </div>-->
    </div>
</template>

<script>
import {SORT_METHODS, SORT_DIRECTIONS} from "../constants/sortingConstants";

export default {
    name: 'sortButtons',
    computed: {
        SORT_METHODS() {
            return SORT_METHODS
        },
        SORT_DIRECTIONS() {
            return SORT_DIRECTIONS
        }
    },
    data() {
        return {
            sortDirection: '',
            sortMethod: '',
        }
    },
    watch: {
        sortDirection() {
            if (!this.sortMethod) return;

            this.$emit('change-sort-method', {direction: this.sortDirection, method: this.sortMethod});
        }
    },
    methods: {
        changeSortDirection(direction) {
            this.sortDirection = direction;
        },
        changeSortMethod(method) {
            this.sortMethod = method;

            if (!this.sortDirection) {
                this.sortDirection = SORT_DIRECTIONS.desc;
            }

            this.$emit('change-sort-method', {direction: this.sortDirection, method: this.sortMethod});
        },
    }
}
</script>

<style lang="scss" scoped>
.sort {
    &__title {
       font-weight: 700;
    }

    &__buttons-wrapper {
        margin: 10px 0;
    }

    &__button {
        $self: &;

        font-size: 16px;
        font-weight: 600;
        padding: 10px 20px;
        border: none;
        border-radius: 10px;
        margin-right: 10px;

        &:disabled {
            opacity: 0.3;
        }

        &--active {
            background-color: #206dd0;
            color: white;
        }

        &--text {
            padding: 10px 0;
            background-color: transparent;
            text-decoration: underline;
        }

        &--text#{$self}--active {
            color: #206dd0;
            background-color: transparent;
        }
    }
}
</style>
