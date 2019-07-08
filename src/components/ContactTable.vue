<template>
    <div>
        <div class="inline">
            <div class="control inline">
                <label class="label" style="">Search Contacts or Tags: </label>
                <input class="input" v-model="name" placeholder="Enter a Name/Tag">
            </div>
            <div class="control inline">
                <button class="button is-link" @click="page=1,getRequest()">Search</button>
            </div>
        </div>
        <div class="inline">
            <a class="button" @click="prevPage()" :class="{disabled:page<=1}">
                <span class="icon is-small"><i class="fas fa-angle-left"></i></span>
            </a>
        </div>
        <div class="inline">
            <h1 class="title is-4 "> Page {{page}}</h1></div>
        <div class="inline">
            <a class="button" @click="nextPage()" :class="{disabled:(!next||name!='')}">
                <span class="icon is-small"><i class="fas fa-angle-right"></i></span>
            </a>
        </div>
        <div class="inline">
            <div class="control inline">
                <label class="label">Go to Page:</label>
                <input class="input" v-model="newPage" placeholder="Page Number">
            </div>
            <div class="control inline">
                <button class="button is-link" @click="page=newPage, getRequest()"> Go </button>
            </div>

        </div>
        <table class="table is-striped" id="myTable">
            <thead>
            <tr>
                <th style="width: 200px" @click="sortBy(0)">Name
                    <span class="arrow" :class="sortOrders[0] > 0 ? 'asc' : 'dsc'"></span>
                </th>
                <th style="width: 400px">Email</th>
                <th>Phone</th>
                <th @click="sortBy(3)">Last Contact Date
                    <span class="arrow" :class="sortOrders[3] > 0 ? 'asc' : 'dsc'"></span>
                </th>
                <th @click="sortBy(4)">Next Contact Date
                    <span class="arrow" :class="sortOrders[4] > 0 ? 'asc' : 'dsc'"></span>
                </th>
                <th @click="sortBy(5)">Contact Priority
                    <span class="arrow" :class="sortOrders[5] > 0 ? 'asc' : 'dsc'"></span>
                </th>
                <th @click="sortBy(6)">Contact Count
                    <span class="arrow" :class="sortOrders[6] > 0 ? 'asc' : 'dsc'"></span>
                </th>
            </tr>
            </thead>
            <tbody>
            <template v-for="contact in contacts">
                <Contact :contact="contact"></Contact>
            </template>
            <br>
            </tbody>
        </table>
        <div v-if="contacts.length<1">
            <h1 class="title is-5">No Contacts Found</h1>
        </div>
    </div>
</template>

<script>
    import Contact from './Contact.vue';
    import axios from 'axios';
    import Vue from 'vue';
    import moment from 'moment';

    export default {
        data() {
            return {
                sortOrders: [1, 1, 1, 1, 1, 1, 1],
                contacts: "",
                newPage: 1,
                page: 1,
                name: "",
                next: true

            }
        },
        watch:{
            name: function(){
                if(this.name ==""){
                    this.page = 1;
                    this.newPage=1;
                    this.getRequest()
                }
            }
        },
        computed: {},
        methods: {
            sortBy(index) {
                Vue.set(this.sortOrders, index, this.sortOrders[index] * -1);
                this.sortTable(index);
            },
            putRequest(contact) {
                let id = contact.id;
                let route = 'http://localhost:3000/contacts/' + id;
                console.log(contact);
                console.log(route);
                axios.post(route, {
                    'id': contact.id,
                    'custom': contact.custom
                })
                    .then(resp => {
                        console.log(resp);
                    })
            },
            getRequest() {
                let route = 'http://localhost:3000/contacts?limit=50&offset=' + (this.page - 1) * 50;
                let next = 'http://localhost:3000/contacts?limit=50&offset=' + (this.page) * 50;
                let tagroute = route + '&tag.name=' + this.name;
                let nexttag = next + '&tag.name=' + this.name;
                if (this.name != "") {
                    route += '&name=' + this.name;
                    next += '&name=' + this.name;
                }
                console.log(route);
                axios.get(route)
                    .then((resp) => {
                        this.contacts = resp.data.contacts;
                        if (this.contacts.length < 1) {
                            (console.log('?'));
                            axios.get(tagroute).then((resp) => {
                                this.contacts = resp.data.contacts;
                                next = nexttag;
                            })
                        }
                    });
                axios.get(next)
                    .then((resp) => {
                        if (resp.data.contacts.length < 1) {
                            this.next = false;
                        }
                        if (this.name == '') {
                            this.next = true;
                        }
                    });
            },

            nextPage() {
                this.page++;
                this.newPage++;
                this.getRequest();
            },
            prevPage() {
                this.newPage--;
                this.page--;
                this.getRequest();
            },
            sortTable(col) {
                var table = document.getElementById("myTable");
                var reverse = this.sortOrders[col] < 0;
                var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
                    tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
                    i;
                reverse = -((+reverse) || -1);
                tr = tr.sort(this.sortFunction(reverse, col));
                for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
            },
            sortFunction(reverse, col) {
                if (col == 3 || col == 4) {
                    return function (a, b) {
                        let first = a.cells[col].textContent.trim();
                        let second = b.cells[col].textContent.trim();
                        if (first == "Not Set") {
                            return 1;
                        }
                        let before = moment(first).isBefore(second);
                        return reverse * (before ? -1 : 1);
                    }
                }
                return function (a, b) { // sort rows
                    return reverse // `-1 *` if want opposite order
                        * (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                                .localeCompare(b.cells[col].textContent.trim())
                        );
                }
            }

        },
        components: {
            Contact
        },
        created() {
            this.getRequest();
            this.$on('change', (contact) => {
                this.putRequest(contact);
            });
        },
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

    .inline {
        display: inline-block;
        padding: 1rem;
    }

    a.disabled {
        pointer-events: none;
        cursor: default;
        color: grey;
    }
</style>

