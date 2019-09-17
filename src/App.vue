<template>
  <div id="app">
    <FeedbackForm></FeedbackForm>
  </div>
</template>

<script>
import FeedbackForm from './components/FeedbackForm.vue'


export default {
  name: 'app',
  components: {
    FeedbackForm
  }
}
</script>

<style>
  @import './../public/styles.css';
</style>
