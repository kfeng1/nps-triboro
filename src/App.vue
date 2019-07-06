<template>
  <div id="app">
    <ContactTable></ContactTable>
  </div>
</template>

<script>
import ContactTable from './components/ContactTable.vue'


export default {
  name: 'app',
  components: {
    ContactTable,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
