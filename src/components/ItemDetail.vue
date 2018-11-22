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

<style scoped lang="scss">

.card {    
    margin-bottom: 15px;
    border-color: $primaryColor;
}

.card-header {    
    background-color: $backgroundColor;
    color: $primaryColor;
    font-weight: 700;
    border-color: $primaryColor;
}

.card-text {
    color:#222222;
    font-size: 14px;
}

.close {
    color:  $primaryColor;
    opacity: 1;
    text-decoration: none;
    &:hover {
        background-color: transparent;
    }
}
</style>


