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
        updateList: async function()  {
            this.ids = (await this.dowloadIds(this.typeList)).slice(0,30);            
        }
    },
    created: function() {
        this.updateList();
    },
    watch: {
        typeList: function() { 
            this.ids = [];
            this.updateList();
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


