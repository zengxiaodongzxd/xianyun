<template>
  <div class="container">
    <div class="detailHeader">
      <el-row class="postInfo" type="flex" justify="content">
        <el-col :span="16">
          <el-breadcrumb separator="/" style="margin:25px 0">
            <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
            <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
          </el-breadcrumb>
          <h1 style="border-bottom:2px solid #ccc;padding-bottom:25px">{{postDetail.title}}</h1>
          <el-row class="time">
            <span>攻略：{{postDetail.updated_at}}&nbsp;&nbsp;&nbsp;阅读： {{postDetail.watch}}</span>
          </el-row>
          <el-row v-html="postDetail.content" class="content"></el-row>
        </el-col>
        <!-- 侧边栏数据 -->
        <el-col :span="8"></el-col>
      </el-row>
    </div> 
    <div class="comments">评论部分</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      postDetail: {}
    };
  },
  mounted() {
    const { query } = this.$route;
    console.log(query.id);
    this.$axios({
      url: "/posts",
      params: {
        id: query.id
      }
    }).then(res => {
      this.postDetail = res.data.data[0];
      console.log(this.postDetail);
    });
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  .detailHeader {
    width: 1000px;
  }
}
.time {
  position: relative;
  height: 50px;
  line-height: 50px;
  span {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 16px;
    color: #ccc;
  }
}
.content {
  font-size: 16px;
  word-spacing: 1px;
  line-height: 1.5;
  /deep/ img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
