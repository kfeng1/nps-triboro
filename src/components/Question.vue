<template>
    <article class="card ls-feature-card">
        <div class="card-content">
            <div class="media-content has-text-centered"><h3 class="title is-5 has-text-weight-bold"><a
                    href="/" class="has-text-dark" title="">{{questionData.text[index]}}</a>
            </h3>
            </div>
            <br>
            <div v-if="type=='0-10'">
                <nav class="pagination is-rounded is-large" aria-label="pagination">
                    <ul class="pagination-list" v-for="n in 11">
                        <li><a class="pagination-link" :class="{'is-current': isCurrent[n-1]<1}"
                               style="border-color: #BFDCE7" :style="{'background-color': bgColor(n-1)}"
                               @click=select(n-1)>{{n-1}}</a></li>
                    </ul>
                </nav>
                <br>
                <span>
                    <p style="float:left">{{questionData.labels[index].left}}</p>
                    <p style="float:right">{{questionData.labels[index].right}}</p>
                </span>
            </div>
            <div v-if = "type=='yesNo'">
                <span>
                    <div style="padding-left:20%">
                        <a class="button is-medium" :class="{'is-link': isCurrent[0]<1}"
                                style="float:left;border-color: #BFDCE7"
                                @click = select(0)>Yes</a>
                    </div>
                    <div style="padding-right: 20%">
                        <a class = "button is-medium" :class="{'is-link': isCurrent[1]<1}"
                                style="float:right;border-color: #BFDCE7"
                                @click = select(1)>No</a>
                    </div>
                </span>
                <br>
                <br>
            </div>
        </div>
    </article>
</template>

<script>
    export default {
        data() {
            return {
                current: -1,
            }

        },
        computed: {
            isCurrent() {
                let arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
                if (this.type == 0) arr = [1, 1];//for yes/no vs 0-10 questions
                if (this.current >= 0) arr[this.current] = -1;
                return arr;
            },

        },
        methods: {
            select(num) {
                this.current = num;
                if(this.type==0)num = num==0;//return boolean for yes/no questions
                this.$parent.$emit('select', num, this.index);
            },
            bgColor(num) {
                if (this.isCurrent[num] == 1) return "white";
            }

        },
        props: ['questionData', 'index', 'type']
    }
</script>

<style>

</style>