<template>
<div class='card' v-if="item && !item.deleted && !hide">    
  <div class='card-header'>
    <span>
      {{index+1}}. {{item.title}}&nbsp;<a v-bind:href="item.url" v-if="item.url">({{ item.url.split('/')[2] }})</a>
    </span>       
    <button type='button' class='close' aria-label='Close' @click='item.deleted = true; hide = true'>
      <span aria-hidden='true'>&times;</span>
    </button>
  </div>
  <div class='card-body'>    
    <p class='card-text'>        
        {{item.score}} point by <b>{{item.by}}</b> 
        {{item.time | timeAgo}} -&nbsp;
        <button type='button' v-if="!justVote" class='btn btn-sm myBtn' @click='item.score = item.score + 1; justVote = true'>
          Vote          
        </button>
        <button type='button' v-if="justVote" class='btn btn-sm myBtn' @click='item.score = item.score - 1; justVote = false'>
            Unvote          
        </button>
        <button type='button' class='btn btn-sm myBtn'>
            <router-link :to="'/item/'+item.id">
            <span v-if='!item.descendants'>Discuss</span>
            <span v-if='item.descendants'>
              {{item.descendants}} Comment<span v-if="item.descendants>1">s</span>
            </span>
            </router-link>
        </button>
    </p>
  </div>      
</div>
</template>

<script>
import {getIdData} from '../mixin/getdata.js'

export default {
    props : ['id', 'index'],
    mixins : [getIdData],
    data: function() {
        return {
            justVote: false,
            hide: false,
            item: undefined
        }
    },
    mounted: async function() { this.item = await this.getIdData(this.id) }    
}
</script>

<style scoped>
.card {    
    margin-bottom: 15px;
    border-color: #e25a00;
}

.card-header {    
    background-color: rgb(246, 246, 239);
    color: #e25a00;
    font-weight: 700;
    border-color: #e25a00;
}

.card-text {
    color:#222222;
    font-size: 14px;
}

.close, a, a:hover {
    color:  #e25a00;
    opacity: 1;
    text-decoration: none;
}

.myBtn {
    color: #e25a00;
    font-weight: 700;
    background-color: rgb(246, 246, 239);
    margin-right: 5px;
    
}
</style>


