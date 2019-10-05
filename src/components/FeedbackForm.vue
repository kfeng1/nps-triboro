<template>
    <div>
        <section class="section ls-features-cards">
            <div class="container">
                <div class="column is-8-desktop is-offset-2-desktop" style="padding-bottom: 0">
                    <div class="ls-section-content has-text-centered"><h3 class="title has-text-dark is-size-2">
                        Thank you for your business with Triboro!</h3>
                        <p class="content has-text-grey is-size-5">
                            We'd like to ask you a couple questions about your experience with us.
                        </p>
                    </div>
                </div>
                <hr>
                <br>
                <div v-for="(rating, index) in ratings">
                    <Question :questionData="questionData" :index="index" :type="questionType[index]"></Question>
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
                id: "test2",
                sent: false,
                questionData: {
                    text: [
                        "Did you receive a confirmation call for your order?",
                        "If you received delivery, how would you rate our service? (Leave blank if you did not receive delivery)",
                        "How easy to use was our website?",
                        "Were you able to find everything you were looking for?",

                    ],
                    labels: [null, {left: "Not Good", right: "Very Good"}, {
                        left: "Not Easy",
                        right: "Very Easy"
                    }, null],


                },
                questionType: ["yesNo", "0-10", "yesNo", "0-10"],
                ratings: [null, null, null, null],  //confirmation, delivery, website, lookingFor,
                comments: ""
            }
        },
        methods: {
            submit() {
                if (!this.sent) {
                    axios.post(`${process.env.VUE_APP_API_ENDPOINT}/submit`, {
                        id: this.id,
                        ratings: this.ratings,
                        comments: this.comments,

                    }).then((resp) => {
                        this.sent = true;
                        console.log(resp);
                        //router.push('/thank-you')
                    }).catch((err) => {
                        console.log(err);
                        //error message
                    });
                }
                console.log("already sent")//TODO: Make this something better/have a success/failure page after submit
            }


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


