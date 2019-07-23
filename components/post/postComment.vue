<template>
  <div class="comments">
    <p class="avatar">
      <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
    </p>
    <span class="nickname">{{comment.account.nickname}}</span>
    <span class="time">{{comment.updated_at | formatDate}}</span>
    <!-- <div class="pics" v-for="(v,i) in comment.pics" :key="i"> -->
    <!-- <img :src="v.url" alt /> -->
    <p>{{ comment.content }}</p>
    <!-- <div>{{comment.content.type}}</div> -->
    <p class="comment_pic">
      <img src="http://157.122.54.189:9095/uploads/e156b37192f94d91b7af0e8583fcdd4c.jpg" alt />
    </p>
    <!-- </div> -->
    <ParentComments v-if="comment.parent" :comment="comment.parent" />
  </div>
</template>
<script>
import { formatDate } from "assets/js/date.js";
export default {
  name: "ParentComments",
  data() {
    return {
      total: 50,
      currentPage: 1,
      pageSize: 10,
      commentsList: ""
    };
  },
  props: {
    comment: {
      type: Object,
      default: {}
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);

      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  methods: {
    // 获取页面的数据
  }
};
</script>
<style lang="less" scoped>
.comments{
  border:1px solid #ccc;
}
.comments div {
  margin-left: 20px;
  border:1px solid #ccc;
}
.comment_pic {
  padding-left: 50px;
  width: 80px;
  /deep/ img {
    width: 100%;
    border: 1px dashed #666;
  }
}
.avatar {
  width: 20px;
  vertical-align: middle;
  display: inline-block;
  /deep/ img {
    width: 100%;
  }
}
p{
  padding-left: 50px;
  margin: 8px 0;
}
.nickname{
  font-size: 12px;
  color: #666
}
.time{
  color: #ccc;
  font-size: 10px;
}
</style>
