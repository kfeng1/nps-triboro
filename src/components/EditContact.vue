<template>
    <div class="modal" id="myModal">
        <div class="modal-background" @click = "savePost"></div>
        <div class="modal-content">
            <div class="box">
                <h1 class="title is-3" style="text-align: center;"> Edit Contact </h1>
                <div class="control">
                    Contact Priority (1-5)
                    <select class = "select" v-model="newInfo.contactPriority">
                        <option value="1">  1 </option>
                        <option value="2"> 2 </option>
                        <option value="3"> 3 </option>
                        <option value="4"> 4 </option>
                        <option value="5"> 5 </option>
                    </select>
                </div>
                <br>
                <div class="control">
                    Last Contact Date
                    <input class="input" type="date" placeholder="Last Contact Date"  v-model="newInfo.lastContact">
                </div>
                <br>
                <div class="control">
                    Next Contact Date
                    <input class="input" type="date" placeholder="Next Contact Date" v-model="newInfo.nextContact">
                </div>
                <br>
                <div class="control">
                    Contact Count
                    <input class="input" type="text" placeholder="Contact Count" v-model="newInfo.contactCount">
                </div>


            </div>
        </div>
        <button class="modal-close is-large" aria-label="close" @click = "savePost"></button>
    </div>
</template>


<script>
    import moment from 'moment';
    export default {
        props: ['info'],
        data(){
            return{


            }
        },
        computed:{
            newInfo(){
                return{
                    lastContact: this.info.lastContact,
                    nextContact: this.info.nextContact,
                    contactPriority: this.info.contactPriority,
                    contactCount: this.info.contactCount
                }

            }
        },
        methods: {
            close: function () {
                this.$parent.$emit('close');
            },
            savePost: function () {
                this.$parent.$emit('edit', this.newInfo)
                this.close();
            }
        }
    }
</script>
