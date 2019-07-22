<template>
  <div class="content-head">
    <el-breadcrumb separator="/" style="margin:25px 0">
      <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
    <h1 style="border-bottom:2px solid #ccc;padding-bottom:25px">{{postDetail.title}}</h1>
    <el-row class="time">
      <span>攻略：{{postDetail.updated_at}}&nbsp;&nbsp;&nbsp;阅读： {{postDetail.watch}}</span>
    </el-row>
    <el-row v-html="postDetail.content" class="content"></el-row>
    <el-row type="flex" justify="center" class="share">
      <el-col>
        <i class="iconfont iconpinglun"></i>
        <span>评论()</span>
      </el-col>
      <el-col>
        <i class="iconfont iconstar1" @click="collect(postDetail.id)"></i>
        <span>收藏</span>
      </el-col>
      <el-col>
        <i class="iconfont iconfenxiang"></i>
        <span>分享</span>
      </el-col>
      <el-col>
        <i class="iconfont iconding" @click="like(postDetail.id)"></i>
        <span>点赞()</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      postDetail: {
        updated_at: ""
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //点击收藏按钮触发的事件
    collect(id) {
      this.$axios({
        url: "/posts/star",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        params: {
          id: id
        }
      }).then(res => {
        // console.log(res);
      });
    },
    like(id) {
      this.$axios({
        url: "/posts/like",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        params:{
          id:id
        }
      });
    },
    getData() {
      const { query } = this.$route;
      // console.log(query.id);
      this.$axios({
        url: "/posts",
        params: {
          id: query.id
        }
      }).then(res => {
        this.postDetail = res.data.data[0];
        console.log(this.postDetail);
        this.postDetail.updated_at = res.data.data[0].updated_at;
        console.log(this.postDetail.updated_at);
        this.postDetail.updated_at = moment(this.postDetail.updated_at).format(
          "YYYY-MM-DD HH:mm"
        );
      });
    }
  },
  watch: {
    $route() {
      this.getData();
    }
  }
};
</script>
<style lang="less" scoped>
.time {
  position: relative;
  height: 50px;
  line-height: 50px;
  span {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 16px;
    color: #666;
  }
}
.content-head {
  font-size: 16px;
  word-spacing: 1px;
  line-height: 1.5;
  /deep/ img {
    max-width: 100%;
    max-height: 100%;
  }
}
.share {
  width: 400px;
  margin: 30px auto;
  div {
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    i {
      color: orange;
      font-size: 40px;
      margin: 0 auto;
    }
    span {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin-left: auto;
      margin-right: auto;
    }
  }
}
</style>