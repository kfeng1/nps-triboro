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
            {{formatDate(handleLastContact())}}
        </td>
        <td>
            {{formatDate(handleNextContact())}}
        </td>
        <td>
            {{handlePriority()}}
        </td>
        <td>
            {{handleContactCount()}}
        </td>
        <button class="button is-primary" @click="contacted">
            Contacted
        </button>
        <button class="button is-link" @click="edit">
            Edit
        </button>
        <EditContact :class="{'is-active': showModal}" :contact = "contact.custom" :funcs ="funcs"></EditContact>
    </tr>
</template>

<script>
    import moment from 'moment';
    import EditContact from './EditContact.vue';

    export default {
        data() {
            return {
                showModal: false,
                funcs: {
                    cc: this.handleContactCount,
                    p: this.handlePriority,
                    nc: this.handleNextContact,
                    lc: this.handleLastContact

                },
            }
        },

        methods: {
            contacted(){
                this.contact.custom.last_contact_date = moment().format('YYYY-MM-DD');
                this.contact.custom.contact_count ++;
                this.$parent.$emit('change', this.contact);
            },
            edit() {
                this.showModal = true
            },
            handleContactCount(){
                if(this.contact.custom==null) return 0;
                if(!this.contact.custom.hasOwnProperty('contact_count')) return 0;
                if(this.contact.custom.contact_count==null) return 0;
                return this.contact.custom.contact_count;

            },
            handlePriority(){
                if(this.contact.custom==null) return 0;
                if(!this.contact.custom.hasOwnProperty('priority')) return 0;
                if(this.contact.custom.priority==null) return 0;
                return this.contact.custom.priority;
            },
            handleNextContact() {
                if(this.contact.custom==null) return "Not Set";
                if(!this.contact.custom.hasOwnProperty('next_contact_date')) return "Not Set";
                if(this.contact.custom.next_contact_date==null) return "Not Set";
                return moment(this.contact.custom.next_contact_date).format('YYYY-MM-DD');
            },
            handleLastContact() {
                let date = moment(this.contact.modification_date).format('YYYY-MM-DD');
                if(this.contact.custom==null) return date
                if(!this.contact.custom.hasOwnProperty('last_contact_date')) return date
                if(this.contact.custom.last_contact_date==null) return date
                return moment(this.contact.custom.last_contact_date).format('YYYY-MM-DD');
            },
            formatDate(date){
                if(date =="Not Set"||date=="Invalid date"){
                    return "Not Set"
                }
                return moment(date).format('ll');
            }

        },
        computed:{



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
                this.contact.custom = edit;
                this.$parent.$emit('change', this.contact);
                //send to parent for post/new get request
            });
        }


    }
</script>


<style>

</style>


