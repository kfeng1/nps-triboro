<template>
    <div>
        <section class="section ls-features-cards">
            <div class="container">
                <div class="column is-8-desktop is-offset-2-desktop" style="padding-bottom: 0">
                    <div class="ls-section-content has-text-centered"><h3 class="title has-text-dark is-size-2">
                        Thank you for your business with Triboro!</h3>
                        <p class="content has-text-grey is-size-5">
                            We'd like to ask you a couple questions about your experience with us.
                        </p></div>
                </div>
                <hr>
                <br>
                <div v-for="i in 2">
                    <Question :questionData="questionData" :index="i-1"></Question>
                    <br><br>
                </div>
                <hr>
                <br>
                <h3 class="content has-text-dark is-size-5">
                    Any additional comments, feedback, or improvements you would like to see?
                </h3>
                <div class="field is-horizontal">
                    <div class="field-body">
                        <div class="field">
                            <div class="control"><label class="screen-reader-text"></label><textarea
                                    class="textarea" rows="10" v-model=comments></textarea></div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="control">
                    <a class="button is-medium ls-button is-primary" @click="submit()" style="float:right">Submit</a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Question from './Question';
    import axios from 'axios';

    export default {
        data() {
            return {
                questionData: {
                    text: [
                        "How likely are you to recommend Triboro to a friend?",
                        "How would you rate your experience with Triboro's website and delivery services?"
                    ],
                    labels: ["likely", "good"],

                },
                ratings: [null, null],
                comments: ""
            }
        },
        methods: {
            submit() {
                axios.post(`${process.env.VUE_APP_API_ENDPOINT}/submit`, {
                    ratings: this.ratings,
                    comments: this.comments,
                    id: 'test'
                }).then((resp) => {
                    console.log(resp);
                    //some sort of thank you
                }).catch((err) => {
                    console.log(err);
                    //error message
                });
            },

        },
        components: {
            Question
        },
        created() {
            this.$on('select', (num, index) => {
                this.ratings[index] = num;
            });
        }
    }
</script>


