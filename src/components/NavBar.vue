<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand">
        <img src="y18.gif" width="30" height="30" class="d-inline-block align-top" alt="">
        Hacker News
    </a>   
    <div>
        <ul class="navbar-nav">
        <li class="nav-item" :class="{ 'active' : item.value===typeList}" v-for="item in navItems" :key="item.label">
            <a class="nav-link" @click="updateTypeList(item.value)">{{item.label}}</a>
        </li>     
        </ul>
    </div>
    </nav>
</template>

<script>
export default {
    name: "NavBar",
    props: [ 'typeList' ],
    data: function() {
        return {
            navItems: [
                { label: 'Top Stories', value: 'top' },
                { label: 'Best Stories', value: 'best' },
                { label: 'New Stories', value: 'new' },
                { label: 'Ask Stories', value: 'ask' },
                { label: 'Show Stories', value: 'show' },
                { label: 'Job Stories', value: 'job' },
            ]
        }
    },
    methods: {
    updateTypeList: function(value) {
      this.$emit('update:typeList', value);
    }
  }    
}
</script>

<style scoped>
.nav-item.active a{
    color: #e25a00 !important;
    font-weight: 700;
}

.navbar {
    border-bottom: solid;
    border-width: 2px;
    border-color: #e25a00;
}

.nav-item {
    cursor: pointer;
}
</style>


