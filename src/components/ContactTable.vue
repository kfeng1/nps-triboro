<template>
    <div>
        <table class="table is-striped">
            <thead>
            <tr>
                <th style="width: 200px">Name</th>
                <th style="width: 400px">Email</th>
                <th>Phone</th>
                <th>Last Contact Date</th>
                <th>Next Contact Date</th>
                <th>Contact Priority</th>
                <th>Contact Count</th>
            </tr>
            </thead>
            <tbody>
            <template v-for="contact in contacts">
                <Contact :contact="contact"></Contact>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Contact from './Contact.vue';
    import axios from 'axios';

    export default {
        data() {
            return {
                contacts: null

            }
        },
        methods: {
            tableSort() {

            }
        },
        components: {
            Contact
        },
        mounted() {

            /**let config = {
                headers: {'Authorization': "bearer " + '0R7-U9bSZHr7z6EF4jBMHb-yCgWGZGfKvzPg6BvoCdK2s'}
            };
            axios.get('https://api.salesflare.com/contacts', config)
                .then((resp) => {
                    this.contacts = resp.data;
                });**/

            axios.get('http://localhost:3000/getData')
                .then((resp)=>{
                    this.contacts = resp.data.contacts
                })
        }
    }
</script>

<style>
    #colWrap {
        word-wrap: break-word;
        max-width: 150px;
    }

</style>