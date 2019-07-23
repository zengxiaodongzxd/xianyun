<template>
  <div>
    <div class="continaer">
      <div class="title">
        <h2>{{data.title}}</h2>
      </div>
      <div class="main">
        <div class="reader">
          <div class="time">
            <span>攻略:</span>
            <span>{{data.time}}</span>
            <span>&nbsp;&nbsp;&nbsp;阅读: {{data.watch}}</span>
          </div>
        </div>
        <div class="postContent">
          <!-- 主题内容 -->
          <div v-html="data.content"></div>
        </div>
        <!-- 评论点赞 -->
        <div class="postCtrl">
          <el-row type="flex" align="center" justify="center">
            <div class="ctrl-item">
              <i class="iconfont iconpinglun"></i>
              <span>评论(100)</span>
            </div>
            <div class="ctrl-item" @click="handlestar">
              <i class="iconfont iconstar1"></i>
              <span>收藏</span>
            </div>
            <div class="ctrl-item">
              <i class="iconfont iconfenxiang"></i>
              <span>分享</span>
            </div>
            <div class="ctrl-item" @click="handlelikes">
              <i class="iconfont iconding"></i>
              <span>点赞({{data.like}})</span>
            </div>
          </el-row>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  computed:{
      
  },
  mounted() {
        // console.log( this.data,'时间');
      // var moment = require("moment");
      // const time = moment(temp).format("YYYY-MM-DD");
  },
  methods: {
    // 收藏文章
    handlestar() {
      const { id } = this.$route.query;
      setTimeout(() => {
        this.$axios({
          url: `/posts/star?id=${id}`,
          headers: {
            Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
          }
        }).then(res => {
          console.log(res);
          this.$message.success(res.data.message)
        });
      }, 1);
    },
     // 点赞文章
    handlelikes() {
      const { id } = this.$route.query;
      setTimeout(() => {
        this.$axios({
          url: `/posts/like?id=${id}`,
          headers: {
            Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
          }
        }).then(res => {
          console.log(res);
          this.$message.success(res.data.message)
        });
      }, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.continaer {
  line-height: 1.5;
  .title {
    margin: 15px 0;
    border-bottom: 1px solid #9ca2a9;
    h2 {
      padding: 15px;
      font-size: 32px;
    }
  }
  .reader {
    .time {
      margin-left: 410px;
      font-size: 16px;
      color: #9ca2a9;
      margin-bottom: 20px;
    }
  }
  /deep/.postContent {
    line-height: 1.5;
    p {
      img {
        max-width: 700px;
      }
    }
    i {
      color: #9ca2a9;
    }
  }
  .postCtrl {
    margin: 50px 0;
    .ctrl-item {
      cursor: pointer;
      text-align: center;
      margin: 0 15px;
      i {
        font-size: 30px;
        color: orange;
      }
      span {
        display: block;
        font-size: 14px;
        color: #9ca2a9;
      }
    }
  }
}
</style>

