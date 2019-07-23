<template>
  <div class="continaer">
    <div class="title">
      <el-input placeholder v-model="input">
        <i slot="suffix" class="el-input__icon el-icon-search" style="font-weight:normal;cursor:pointer" @click="search"></i>
      </el-input>
      <el-row class="search-bar" type="flex" justify="space-between" align="middle">
        <div class="search-recommend">
          推荐：
          <span @click="handleguangzhou('广州')">广州</span>
          <span @click="handleguangzhou('上海')">上海</span>
          <span @click="handleguangzhou('北京')">北京</span>
        </div>
      </el-row>
    </div>
    <!-- 内容 -->
    <el-row class="recommedpost" type="flex" justify="space-between" align="middle">
      <h3>推荐攻略</h3>
      <nuxt-link to="/post/create">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          style="height:40px; width:100px;"
        >写游记</el-button>
      </nuxt-link>
    </el-row>
    <div class="post-list" v-for="(item,index) in itemData" :key="index">
      <div v-if="item.images.length>1||item.images.length===0">
        <div class="post-item-card">
          <h4 class="posttitle">
            <nuxt-link :to="`/post/detail/?id=${item.id}`">{{item.title}}</nuxt-link>
          </h4>
          <p class="post-desc">
            <nuxt-link :to="`/post/detail/?id=${item.id}`">{{item.summary}}</nuxt-link>
          </p>
          <el-row class="card-images" type="flex" justify="space-between" align="center">
            <nuxt-link
              :to="`/post/detail/?id=${item.id}`"
              v-for="(value,id) in item.images"
              :key="id"
            >
              <img :src="`${value}`" alt style="width:220px;height:150px;object-fit: cover" />
            </nuxt-link>
          </el-row>
          <!-- 底部点赞 -->
          <el-row class="post-info" type="flex" justify="space-between">
            <el-row class="post-info-left" type="flex" justify="space-between" align="middle">
              <i class="el-icon-location-outline"></i>
              {{item.cityName}}
              <el-row class="user" type="flex">
                by
                <nuxt-link to="#">
                  <img
                    src="http://157.122.54.189:9095/assets/images/avatar.jpg"
                    alt
                    style="width:16px;height:16px;object-fit: cover"
                  />
                </nuxt-link>
                <nuxt-link to="#">{{item.account.nickname}}</nuxt-link>
              </el-row>
              <span>
                <i class="el-icon-view"></i>
                {{item.watch}}
              </span>
            </el-row>
            <div class="post-info-right">{{item.like}}赞</div>
          </el-row>
        </div>
      </div>
      <!-- 一张图片的 -->
      <div v-if="item.images.length===1">
        <el-row class="post-item" type="flex" justify="space-between" align="middle">
          <div class="psot-image">
            <nuxt-link :to="`/post/detail/?id=${item.id}`">
              <img
                :src="`${item.images}`"
                alt
                style="width:220px;height:150px;object-fit: cover;padding-right:10px;"
              />
            </nuxt-link>
          </div>
          <div class="content">
            <h4 class="contenttitle">
              <nuxt-link :to="`/post/detail/?id=${item.id}`">{{item.title}}</nuxt-link>
            </h4>
            <p class="post-desc">
              <nuxt-link :to="`/post/detail/?id=${item.id}`">{{item.summary}}</nuxt-link>
            </p>
            <el-row class="post-info" type="flex" justify="space-between">
              <el-row class="post-info-left" type="flex" justify="space-between" align="middle">
                <i class="el-icon-location-outline"></i>
                {{item.cityName}}
                <el-row class="user" type="flex">
                  by
                  <nuxt-link to="#">
                    <img
                      src="http://127.0.0.1:1337/assets/images/avatar.jpg"
                      alt
                      style="width:16px;height:16px;object-fit: cover"
                    />
                  </nuxt-link>
                  <nuxt-link to="#">{{item.account.nickname}}</nuxt-link>
                  <!-- {{item.account.nickname}} -->
                </el-row>
                <span>
                  <i class="el-icon-view"></i>
                  {{item.watch}}
                </span>
              </el-row>
              <div class="post-info-right">{{item.like}}赞</div>
            </el-row>
          </div>
        </el-row>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 20, 30, 40,50,60]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      input: "",
      pagesize: 5,
      pagenum: 1,
      total: 0,
      postData: [],
      itemData: []
    };
  },
  mounted() {
    this.getPagePost();
    this.input = this.$route.query.city;
    console.log(this.input);
    this.getCityPost(this.input);
  },
  methods: {
    // 搜索
    search(){
      const value =this.input
      this.getCityPost(value) 
    },
    // 广州
    handleguangzhou(value) {
      this.getCityPost(value);
    },
    getCityPost(value) {
      console.log(value,'值');
      setTimeout(()=>{
           // 获取城市分类
      this.$axios({
        url: `/posts/?city=${value}`,
        params: {
          _start: (this.pagenum - 1) * this.pagesize,
          _limit: this.pagesize
        }
      }).then(res => {
        console.log(res.data,'框');
        this.postData = res.data.data;
        this.total = res.data.total;
        this.postData.forEach(v => {
          if (v.images.length > 3) {
            v.images.length = 3;
          }
        });
        this.itemData = this.postData;
      });
      },10)
    },

    //   封装分页加上获取文章列表
    getPagePost() {
      setTimeout(() => {
        this.$axios({
          url: "/posts",
          params: {
            _start: (this.pagenum - 1) * this.pagesize,
            _limit: this.pagesize
          }
        }).then(res => {
          console.log(res.data);
          this.postData = res.data.data;
          this.total = res.data.total;
          this.postData.forEach(v => {
            if (v.images.length > 3) {
              v.images.length = 3;
            }
          });
          this.itemData = this.postData;
        });
      }, 5);
    },
    //   切换分页
    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.pagenum = 1;
      this.getPagePost();
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getPagePost();
    }
  }
};
</script>
<style lang="less" scoped>
.continaer {
  .title {
    /deep/.el-input__inner {
      border: 3px solid orange;
      border-radius: 0%;
    }
    /deep/.el-input__suffix-inner {
      font-size: 20px;
      color: orange;
      font-weight: 600;
    }
    .search-bar {
      margin: 8px 0;
      .search-recommend {
        font-size: 12px;
        color: #847e76;
      }
      .search-recommend {
        span {
          &:hover {
            color: orange;
            border-bottom: 1px solid orange;
            cursor: pointer;
          }
        }
      }
    }
  }
  .post-info {
    font-size: 12px;
    color: #666666;
    .post-info-left {
      i {
        padding-left: 5px;
        font-size: 12px;
        padding-right: 10px;
      }

      .user {
        padding-left: 10px;
        a {
          padding: 0 5px;
        }
      }
    }
    .post-info-right {
      font-size: 14px;
      color: #666666;
    }
  }

  //   三张图片的
  .post-list {
    //   margin-bottom: 20px;
    .post-item-card {
      padding-bottom: 20px;
      border-bottom: 1px solid #666;
      h4 {
        white-space: nowrap;
        font-size: 18px;
        font-weight: 400;
        padding-bottom: 20px;
        margin-top: 20px;
        &:hover {
          color: orange;
        }
      }
      p {
        font-size: 14px;
        height: 60px;
        overflow: hidden;
        margin-bottom: 16px;
        color: #666666;
      }
    }
  }
  //   一张图片的
  .post-item {
    width: 700px;
    margin-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #666;
    .content {
      box-sizing: border-box;
      width: 470px;
      h4 {
        display: block;
        overflow: hidden;
        white-space: nowrap;
        font-size: 18px;
        font-weight: 400;
        padding-bottom: 20px;
        &:hover {
          color: orange;
        }
      }
      p {
        font-size: 14px;
        height: 60px;
        overflow: hidden;
        margin-bottom: 16px;
        color: #666666;
      }
    }
  }
  .recommedpost {
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
    padding-bottom: 5px;
    h3 {
      font-size: 18px;
      font-weight: normal;
      color: orange;
      margin-bottom: -10px;
      padding-bottom: 13px;
      border-bottom: 2px solid orange;
    }
  }
}
</style>
