<template>
  <div class="container">
    <!-- 热门=推荐 -->
    <el-row type="flex" justify="space-between" align="center">
      <div class="nav">
        <!-- 左边侧边栏 -->
        <postasider :data="item" v-for="(item,index) in hotCity.data" :key="index"></postasider>
        <div class="recommedCity">
          <h4>推荐城市</h4>
          <nuxt-link to="/post/index">
            <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
          </nuxt-link>
        </div>
      </div>

      <!-- 主要内容 -->
      <div class="main">
        <postcontent></postcontent>
      </div>
    </el-row>
  </div>
</template>

<script>
import postasider from "@/components/post/postAsider";
import postcontent from "@/components/post/postContent";

export default {
  data() {
    return {
      hotCity: {}, //热门城市推荐
      shanghai:'',
      beijin:'',
      guangzhou:''
    };
  },
  mounted() {
   
  // 获取热门城市列表
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      this.hotCity = res.data;
    });
  },
  components: {
    postasider,
    postcontent
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 0 auto;
  margin-top: 20px;
  .recommedCity {
    h4 {
      font-size: 18px;
      color: #000000;
      font-weight: 400;
      margin: 15px 0 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
    /deep/img {
      display: block;
      width: 260px;
      height: 170px;
    }
  }
  .nav {
    width: 270px;
    position: relative;
    z-index: 4;
  }
  .main {
    width: 700px;
  }
}
</style>
