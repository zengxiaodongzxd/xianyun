<template>
  <div class="container">
    <h4 class="headline">相关攻略</h4>
    <nuxt-link
      :to="`/post/detail?id=${item.id}`"
      v-for="(item,index) in recommendInfo"
      :key="index"
    >
      <div class="box">
        <div>
          <img :src="item.images[0]" alt />
        </div>
        <span class="title">{{item.title}}</span>
        <span class="time">{{item.created_at| formatDate}}&nbsp;阅读：{{item.watch}}</span>
      </div>
    </nuxt-link>
    <!-- <div class="box" v-for="(item,index) in recommendInfo" :key="index">
      <img :src="item.images[0]" alt />
      <span class="title">{{item.title}}</span>
      <span class="time">{{item.updated_at}}&nbsp;阅读：{{item.watch}}</span>
    </div>-->
  </div>
</template>
<script>
import { formatDate } from "assets/js/date.js";
export default {
  data() {
    return {
      recommendInfo: {}
    };
  },
  mounted() {
    const { query } = this.$route;
    // console.log(query.id);
    this.$axios({
      url: "/posts/recommend",
      params: {
        id: query.id
      }
    }).then(res => {
      console.log(res.data);
      this.recommendInfo = res.data.data;
      console.log(this.recommendInfo);
    });
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);

      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 240px;
}
.headline {
  width: 240px;
  font-size: 18px;
  font-weight: normal;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
}
.box {
  width: 240px;
  padding: 25px 0;
  border-bottom: 2px solid #ccc;
  position: relative;
  div {
    width: 100px;
    height: 80px;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    width: 140px;
    position: absolute;
    top: 25px;
    left: 105px;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: wrap;
  }
  .time {
    font-size: 12px;
    color: #666;
  }
}
</style>
