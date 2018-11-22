<template>
<div v-if='item' class='container'>
    <div class='row'>                 
        <div class='col-12'>
            <div class='row titleItem'>{{item.title}}&nbsp;
                <a v-if='item.url' v-bind:href="item.url">({{item.url.split('/')[2]}})</a>
            </div>          
            <div class='row'>
                <div class='subtitleItem'>
                    {{item.score}} point by <b>{{item.by}}</b> {{item.time | timeAgo}}
                </div>                    
            </div>        
        </div>
    </div>
    <div class='row textItem' v-html="item.text"></div>
    <div class='row replyBox'>
        <span v-if='item.descendants'>
            {{item.descendants}} comment<span v-if="item.descendants>1">s</span>
        </span>
        <button type='button' v-if="!justVote" class='btn' @click='item.score = item.score + 1; justVote = true'>
                Vote          
              </button>
              <button type='button' v-if="justVote" class='btn' @click='item.score = item.score - 1; justVote = false'>
                  Unvote          
        </button>
        <button class='btn' v-if='!openForm' @click="openForm=true;">Reply</button>
    </div>
    <div class='row' v-if='openForm'>        
        <textarea v-model="newComment"></textarea>
    </div>  
    <div class='row' v-if='openForm'>
        <button class='btn' @click="addComment();openForm=false;">Add comment</button>
        <button class='btn closeBtn' @click="newComment=undefined;openForm=false;">Close</button>
    </div>
    <div  v-for="comment in comments" :key="comment.time">
        <Comment :comment='comment'/>
    </div>
</div>    
</template>

<script>
import {getIdData, Item} from '../mixin/getdata.js'
import Comment from './Comment.vue'

export default {
    name: 'discuss-item',
    mixins : [getIdData],
    components: { 
        Comment 
    },
    data: function() {
        return {
            justVote: false,
            openForm: false,
            hide: false,
            id: undefined,
            item: undefined,
            newComment: undefined,
            comments: []
        }
    },
    methods: {
        addComment: function() {
            const item = new Item();
            item.text = this.newComment;
            this.comments.unshift(item);
            this.newComment = undefined;
            this.openForm = close;
        }
    },
    mounted: async function() { 
        this.id = this.$route.params.id;
        this.item = await this.getIdData(this.id);
        if( this.item.kids && this.item.kids.length) {
            for(let kid of this.item.kids) {
                this.comments.push(await this.getIdData(kid));                
            }        
        } 
    }          
}
</script>

<style lang="scss" scoped>
.container {
    background-color: $backgroundColor;
    padding: 50px;   
    border: solid;
    border-width: 2px;
    border-color: $primaryColor;
    margin-top: 15px;
}

.titleItem {
    font-size: 22px;
    font-weight: 700;
    color: $primaryColor;
}

.subtitleItem {
    color: grey;
}

.textItem {
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
}

.replyBox {
    color: #757575;
    font-style: italic;
    font-weight: 700;
    margin-top: 20px;
    margin-left: 5px;
}

textarea {    
    margin: 20px;
}

button {
    @extend %myBtn;
}

.closeBtn {
    margin-left: 10px;
}
</style>

