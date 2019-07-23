<template>
  <div class="aside">
    <div>
      <p style="font-size:20px ;border-bottom:1px solid #ccc; padding-bottom:10px;">相关攻略</p>
    </div>
    <div class="content" v-for="(item,index) in data.data" :key="index">
      <nuxt-link :to="`/post/detail/?id=${item.id}`">
        <el-row type="flex" class="text">
          <el-row type="flex" align="middle" class="img">
            <img :src="`${item.images}`" alt />
          </el-row>
          <div class="posttext">
            <span>{{item.title}}</span>
            <p>{{item.time}} &nbsp;&nbsp;&nbsp;&nbsp;阅读：{{item.watch}}</p>
          </div>
        </el-row>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {

  props:{
    data:{
      type:Object,
      default:{}
    }
  }
};
</script>

<style lang="less" scoped>
.aside {
  .content {
    .text {
      margin: 20px 0;
      border-bottom: 1px solid #ccc;
      padding-bottom: 20px;
      .img {
        margin-right: 10px;
        > img {
          display: block;
          width: 100px;
          height: 80px;
          object-fit: cover
        }
      }
      .posttext {
        span {
          display: block;
          height: 45px;
          overflow: hidden;
          margin-bottom: 20px;
        }
        p {
          font-size: 12px;
          color: #6666;
        }
      }
    }
  }
}
</style>
