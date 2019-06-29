<template>
    <div>
        <table class="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Last Contact Date</th>
                <th>Next Contact Date </th>
                <th>Contact Priority</th>
            </tr>
            </thead>
            <tbody v-for="contact in contacts">
                <contact :contact = "contact"></contact>
            </tbody>
        </table>
    </div>
</template>

<script>
    import Contact from './Contact.vue'
    export default{
        data(){
           return{
                contacts: [{name: "test1", email: "a"}, {name:"test2", email:"b"}]
           }
        },
        methods: {
            tableSort(){

            }
        },
        components: {
            Contact
        }
    }
</script>