<template>
  <div id="home">  
    <NavBar :typeList.sync="typeList"/>
    <ItemsList v-bind:typeList="typeList"/>
  </div>
</template>

<script>
import NavBar from './NavBar.vue'
import ItemsList from './ItemsList.vue'

export default {
  name: 'home',
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