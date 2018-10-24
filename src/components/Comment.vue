<template>
<div class="commentContainer" v-if="comment && !comment.deleted && !deleted">
    <div class='commentBox'>
        <div class='row author'>            
            <b>{{comment.by}}</b>&nbsp;{{ comment.time | timeAgo }}
            <button v-if='checkAuthor' @click='onEditMode=!onEditMode;' class='btn'>
                <span v-if='!onEditMode'>Edit</span>
                <span v-if='onEditMode'>Save</span>
            </button>
            <button v-if='checkAuthor && !onEditMode' @click='comment.deleted=true;deleted=true' class='btn'>Delete</button>            
        </div>           
        <div v-if='!onEditMode' class='row' v-html="comment.text"></div>        
        <div class='row' v-if='onEditMode'>
            <textarea v-model='comment.text'></textarea>
        </div>
        <div class='row' v-if='!onEditMode'>
            <button class='btn replyButton' v-if='!openForm' @click='openForm=true;'>Reply</button>
        </div>        
    </div>  
    <div class='replyTextArea' v-if='openForm'>
        <textarea v-model="newComment"></textarea>
        <div class='row replyTextArea'>
            <button class='btn' @click="addSubComment()">Add comment</button>
            <button class='btn closeBtn' @click="newComment='';openForm=false;">Close</button>
        </div>
    </div> 
    <div class='subCommentsBox' v-if="(comment.kids && comment.kids.length)">            
        <div  v-for='com in subComments' :key='com.time'>            
            <Comment :comment='com' />
        </div>
    </div>
</div>



</template>

<script>
import { getIdData, Item } from '../mixin/getdata.js'

export default {
    name: 'Comment',
    props: ['comment'],
    mixins: [ getIdData ],
    data: function() {
        return {
            onEditMode: undefined,
            checkAuthor: undefined,
            openForm: undefined,
            newComment: undefined,
            deleted: false,
            subComments: []
        }
    },
    methods: {
        addSubComment() {                   
            const item = new Item();
            if(!this.subComments.length) {
                this.comment.kids = [item.id];
            }
            item.text = this.newComment;
            this.subComments.unshift(item);
            this.openForm = false;
            this.newComment = undefined;
        }
    },
    mounted: async function() {
        this.checkAuthor = this.comment.by === 'MattiaAvanzi';
        if(this.comment && this.comment.kids && this.comment.kids.length) {
                for (let kid of this.comment.kids) {                
                    this.subComments.push(await this.getIdData(kid))
        };        
      }
    }
}
</script>

<style scoped>
.subCommentsBox {
    margin-left: 5%;
}

.commentBox {
    border: solid;
    border-width: 1px;
    border-radius: 20px;
    margin-top: 20px;
    padding-left: 45px;
    padding-right: 45px;
    padding-bottom: 20px;
    padding-top: 20px;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    max-width: 100%;
    background-color: rgba(216,105,31,0.1)
}

.author {
    margin-bottom: 15px;
    color: #757575;
}

textarea {
    width: 100%;
    border-radius: 20px;
    resize: none;
    padding: 22px;
}

button {
    position: relative;
    top: -5px;
    left: 20px;
    margin-right: 5px;
    color: #e25a00;
    font-weight: 700;
    background-color: #cecece;
}

.replyTextArea {
    margin-top: 20px;
}

.replyButton {
    margin-top: 10px;
    position: initial;
}  
</style>


