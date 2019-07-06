<template>
    <tr>
        <td style="word-break: break-word">
            {{contact.name}}
        </td>
        <td style="word-break: break-word">
            {{contact.email}}
        </td>
        <td>
            {{contact.phone_number}}
        </td>
        <td>
            {{formatDate.lastContact}}
        </td>
        <td>
            {{contactInfo.nextContact==null?"Not Set":formatDate.nextContact}}
        </td>
        <td>
            {{contact.custom.priority}}
        </td>
        <td>
            {{contact.custom.contact_count==null?0:contact.custom.contact_count}}
        </td>
        <button class="button is-primary" @click="contacted">
            Contacted
        </button>
        <button class="button is-link" @click="edit">
            Edit
        </button>
        <EditContact :class="{'is-active': showModal}" :info = "contactInfo"></EditContact>
    </tr>
</template>

<script>
    import moment from 'moment';
    import EditContact from './EditContact.vue';

    export default {
        data() {
            return {
                contactInfo: {
                    lastContact: moment(this.contact.modification_date).format('YYYY-MM-DD'),
                    nextContact: null,
                    contactPriority: 1,
                    contactCount: 0,
                },
                showModal: false
            }
        },
        methods: {
            contacted(){
                this.contactInfo.lastContact = moment().format('YYYY-MM-DD');
                this.contactInfo.contactCount++;
            },
            edit() {
                this.showModal = true
            }
        },
        computed:{
            formatDate(){
                return{
                    lastContact: moment(this.contactInfo.lastContact).format('ll'),
                    nextContact: moment(this.contactInfo.nextContact).format('ll')
                }
            }
        },
        components: {
            EditContact
        },
        props: ['contact'],
        created() {
            this.$on('close', () => {
                this.showModal = false
            });
            this.$on('edit', (edit)=>{
                this.contactInfo = edit;
            });
        }


    }
</script>


<style>

</style>


