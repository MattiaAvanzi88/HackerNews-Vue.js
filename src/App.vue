<template>
  <div id="app">  
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import ItemsList from './components/ItemsList.vue'

export default {
  name: 'app',
  data: function() {
    return {
      typeList: 'top'
    }    
  },
  components: {
    NavBar,
    ItemsList
  }
}
</script>

<style>
</style>
