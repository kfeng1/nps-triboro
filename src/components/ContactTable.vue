<template>
    <div>
        <button class="button" @click="putContact(0)">Test Put</button>
        <table class="table is-striped" id="myTable">
            <thead>
            <tr>
                <th style="width: 200px" @click="sortBy(0)">Name
                    <span class="arrow" :class="sortOrders[0] > 0 ? 'asc' : 'dsc'"></span>
                </th>
                <th style="width: 400px">Email</th>
                <th>Phone</th>
                <th @click="sortBy(1)">Last Contact Date
                    <span class="arrow" :class="sortOrders[1] > 0 ? 'asc' : 'dsc'"></span>
                </th>
                <th @click="sortBy(2)">Next Contact Date
                    <span class="arrow" :class="sortOrders[2] > 0 ? 'asc' : 'dsc'"></span>
                </th>
                <th @click="sortBy(3)">Contact Priority
                    <span class="arrow" :class="sortOrders[3] > 0 ? 'asc' : 'dsc'"></span>
                </th>
                <th @click="sortBy(4)">Contact Count
                    <span class="arrow" :class="sortOrders[4] > 0 ? 'asc' : 'dsc'"></span>
                </th>
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
    import Vue from 'vue';

    export default {
        data() {
            return {
                sortKey: '',
                columns: [],
                sortOrders: [1, 1, 1, 1, 1],
                contacts: null

            }
        },
        computed: {

        },
        methods: {
            sortBy(index) {
                this.sortKey = index;
                Vue.set(this.sortOrders, index, this.sortOrders[index] * -1);
            },
            putContact(index) {
                let contact = this.contacts[index];
                let id = this.contacts[index].id;
                let route = 'http://localhost:3000/contacts/' + id;
                console.log(route);
                axios.put(route, contact)
                    .then(resp => {
                        console.log(resp);
                    })
            },

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

            axios.get('http://localhost:3000/contacts')
                .then((resp) => {
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

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid black;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid black;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    th {
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }


</style>