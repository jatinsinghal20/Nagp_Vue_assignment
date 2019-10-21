<template>
  <div>
    <div v-if="comment">
      <div class="well">
        <div class="row">
          <div class="col-12">{{comment.body}}</div>
        </div>
        <hr />
        <div class="row">
          <div class="col-6">
            <em>{{comment.author.username}}</em>
            <br />
            <small class="text-muted">{{comment.createdAt | date}}</small>
          </div>
          <div class="col-6">
            <div v-if="isUserComment" style="float:right">
              <button type="button" @click="deleteComment" class="btn btn-outline-danger ml-2">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Article from "../Common/Models/Article";
import UsersModule from "@/store/Modules/users";
import ArticlesModule from "@/store/Modules/articles";
import Comment from "../Common/Models/Comment";

@Component
export default class ArticlesComment extends Vue {
  @Prop() private comment?: Comment;

  //verify if users comment or not
  get isUserComment() {
    if (this.comment) {
      return this.comment.author.username === UsersModule.username;
    }
    return false;
  }

  //delete comment of user
  deleteComment() {
    if (this.comment) {
      ArticlesModule.deleteComment(this.comment.id);
    }
  }
}
</script>

<style>
.well {
  min-height: 20px;
  padding: 19px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  border: 1px solid #e3e3e3;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
}
</style>
