<template>
    <form class="comment-form" @submit.prevent="addComment">
        <h3 class="comment-form__title">Новый комментарий</h3>
        <div class="comment-form__field-wrapper field">
            <label for="name" class="field__label">Имя*</label>
            <input type="text" id="name" class="field__input" v-model="formData.name" required>
        </div>

        <div class="comment-form__field-wrapper field">
            <label for="comment" class="field__label">Текст комментария*</label>
            <textarea type="text" id="comment" class="field__input field__input--textarea" v-model="formData.text" required></textarea>
        </div>

        <div class="comment-form__field-wrapper field">
            <date-picker v-model="formData.date" valueType="format"></date-picker>
        </div>

        <button class="comment-form__button" type="submit" :disabled="isDisabled">Добавить</button>
    </form>
</template>

<script>
import {mapState} from "vuex";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    name: 'add-comment-form',
    components: {
        DatePicker
    },
    data() {
        return {
            formData: {
                name: '',
                text: '',
                date: '',
            },
            isDisabled: true,
        }
    },
    watch: {
        formData: {
            deep: true,
            handler() {
                this.checkFields();
            }
        }
    },
    mounted() {
        this.checkFields();
    },
    computed: mapState(['comments/comments']),
    methods: {
        clearData () {
            Object.keys(this.formData).forEach(key => {
                this.formData[key] = '';
            });
        },
        checkFields() {
            if (this.formData.name && this.formData.text && this.formData.date) {
                this.isDisabled = false;
            } else {
                this.isDisabled = true;
            }
        },
        addComment() {
            if (!this.isDisabled) {
                this.$store.dispatch('comments/CREATE_COMMENT', this.formData).then(() => this.clearData())
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.comment-form {
    max-width: 300px;
    padding: 20px 0;

    &__title {
        font-weight: 700;
    }

    &__field-wrapper {
        margin: 20px 0;
    }

    &__button {
        font-size: 16px;
        font-weight: 600;
        background-color: #206dd0;
        padding: 10px 20px;
        border: none;
        border-radius: 10px;
        color: white;
        width: 100%;

        &:disabled {
            opacity: 0.2;
        }
    }
}

.field {
    &__label {
        font-weight: 400;
    }

    &__input {
        display: block;
        width: 100%;
        padding: 10px;
        border-radius: 10px;
        outline: none;
        border: 1px solid #837e7e;

        &--textarea {
            resize: none;
            min-height: 130px;
        }
    }
}
</style>
