<template>
<div class='listContainer'>    
    <div class='itemList' v-for="(id, index) in ids" :key="index">  
        <ItemsDetail :id="id" :index="index"/>
    </div>
</div>    
</template>

<script>
import ItemsDetail from './ItemDetail.vue'
import { getIdsData } from '../mixin/getdata.js'


export default {
    props: ['typeList'],
    mixins : [getIdsData],
    components: {
        ItemsDetail
    },
    data: function() {
        return {
            ids: []
        }
    },
    methods: {
        updateList: function()  {
            this.ids = this.dowloadIds(this.typeList).then( (data) => {this.ids = data.slice(0,30)});            
        }
    },
    created: function() {
        this.updateList()
    },
    watch: {
        typeList: function() { 
            this.updateList()
        }
    }
}
</script>

<style scoped>
.listContainer {
    margin-left: 15%;
    margin-right: 15%;
    margin-top: 30px;  
}
</style>


