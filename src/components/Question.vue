<template>
    <article class="card ls-feature-card">
        <div class="card-content" >
            <div class="media-content has-text-centered"><h3 class="title is-5 has-text-weight-bold"><a
                    href="/" class="has-text-dark" title="">{{questionData.text[index]}}</a>
            </h3>
            </div>
            <br>
            <nav class="pagination is-rounded is-large" aria-label="pagination">
                <ul class="pagination-list" v-for = "n in 11">
                    <li><a class="pagination-link" :class="{'is-current': isCurrent[n-1]<1}"
                           style="border-color: #BFDCE7" :style="{'background-color': bgColor(n-1)}"
                           @click = select(n-1)>{{n-1}}</a></li>
                </ul>
            </nav>
        </div>
        <br>
        <span>
            <p style="float:left">Not {{questionData.labels[index]}}</p>
            <p style="float:right">Very {{questionData.labels[index]}}</p>
        </span>
    </article>
</template>

<script>
    export default {
        data(){
            return{
                current: -1
            }

        },
        computed:{
            isCurrent(){
               let arr = [1,1,1,1,1,1,1,1,1,1,1];
               if(this.current>=0)arr[this.current] = -1;
               return arr;
            },

        },
        methods: {
            select(num) {
                this.current=num;
                this.$parent.$emit('select', num, this.index);
            },
            bgColor(num) {
                if (this.isCurrent[num]==1) return "white";
            }

        },
        props: ['questionData', 'index']
    }
</script>

<style>

</style>