<template>
<transition name="index-fade">
<div>
    <nv-search></nv-search>
    <nv-list></nv-list>

  </div>
  </transition>
</template>

<script>
import nvList from './components/list.vue';
import nvAdd from './components/add.vue';
import nvSearch from './components/search.vue';

export default {
  // name: 'app',
  data () {
    return {
      
    }
  },
  components:{
    nvList,
    nvAdd,
    nvSearch
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


h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
