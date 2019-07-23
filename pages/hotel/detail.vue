<template>
  <div class="container">
    <el-row class="main" type="flex">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{dataInfo.big_cate}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{dataInfo.real_city}}酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{dataInfo.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="chnName">{{dataInfo.name}}....</div>
      <div class="engName">{{dataInfo.alias}}</div>
      <div class="locaition">
        <i class="el-icon-location"></i>
        {{dataInfo.address}}
      </div>
      <!-- 酒店图片 -->
      <el-row type="flex" class="hotelImg">
        <div class="leftImg">
          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
        </div>
        <el-row class="rightImg">
          <img
            v-for="(item,index) in rightImg"
            :key="index"
            :src="`${'http://157.122.54.189:9093/images/hotel-pics/'+item+'.jpeg'}`"
            alt
          />
        </el-row>
      </el-row>
      <!-- table表格 -->
      <el-table :data="dataInfo.products" style="width: 100%">
        <el-table-column prop="name" label="价格来源" width="180"></el-table-column>
        <el-table-column prop="bestType" label="低价房型" width="180"></el-table-column>
        <el-table-column prop="price" label="最低价格/每晚"></el-table-column>
      </el-table>
      <el-row type="flex">
        <!-- 地图 -->
     
        <DetailNearby />
      </el-row>
      <!-- 酒店相关信息 -->
      <el-row type="flex" class="hotelAbout">
        <el-row class="hotelItem">
          <el-col :span="4" class="title">基本信息</el-col>
          <el-col :span="20" class="content">
            <el-col :span="6">入住时间 14：00之后</el-col>
            <el-col :span="6">离开时间 14：00之后</el-col>
            <el-col :span="6">{{dataInfo.creation_time}}/{{dataInfo.renovat_time}}</el-col>
            <el-col :span="6">酒店规模:{{dataInfo.roomCount}}间套房</el-col>
          </el-col>
        </el-row>
        <el-row class="hotelItem">
          <el-col :span="4" class="title">主要设施</el-col>
          <el-col :span="20" class="content">
            <span
              class="hotelassets"
              v-for="(item,index) in dataInfo.hotelassets"
              :key="index"
            >{{item.name}}</span>
          </el-col>
        </el-row>
        <el-row class="hotelItem">
          <el-col :span="4" class="title">停车服务</el-col>
          <el-col :span="20" class="content">{{dataInfo.parking}}</el-col>
        </el-row>
        <el-row class="hotelItem">
          <el-col :span="4" class="title">品牌信息</el-col>
          <el-col :span="20" class="content">{{dataInfo.hotelbrand?dataInfo.hotelbrand.name:''}}</el-col>
        </el-row>
      </el-row>
      <!-- 评论 -->
      <el-row type="flex" class="comments">
        <el-row>
          <el-row class="commentsTitle">{{comments.length}}条真实用户评论</el-row>
          <el-row type="flex" class="commentsContent">
            <el-row class="commentsNum" type="flex">
              <div>总评数：{{dataInfo.all_remarks}}</div>
              <div>好评数：{{dataInfo.good_remarks}}</div>
              <div>差评数：{{dataInfo.bad_remarks}}</div>
            </el-row>
            <el-row type="flex" class="commentsService">
              <div class="commentsServiceItem">星级 {{dataInfo.stars}}</div>
              <div class="commentsServiceItem">环境{{dataInfo.scores?dataInfo.scores.environment:''}}</div>
              <div class="commentsServiceItem">产品{{dataInfo.scores?dataInfo.scores.product:''}}</div>
              <div class="commentsServiceItem">服务{{dataInfo.scores?dataInfo.scores.service:''}}</div>
            </el-row>
          </el-row>
        </el-row>
        <div class="commentsDetail">
          <CommentItem :data="comments" />
        </div>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import DetailNearby from "@/components/hotel/detailNearby";
import CommentItem from "@/components/hotel/commentItem";
export default {
  data() {
    return {
      dataInfo: {}, // 当前酒店信息
      products: [], //产品信息
      comments: [], //评论
      rightImg: [1, 2, 3, 4, 5, 6], // 右侧图片
    };
  },
  components: {
    CommentItem,
    DetailNearby
  },
  mounted() {
    // // 获取酒店信息
    this.$axios({
      url: `/hotels?id=${this.$route.query.id}`
    }).then(res => {
      // console.log(res);
      this.dataInfo = res.data.data[0];
       this.$store.commit("hotel/setDataInfo", this.dataInfo);
      const { location } = this.dataInfo;
      const locationStr = location.longitude + "," + location.latitude;
      this.$store.commit("hotel/setLocationStr", locationStr);
    });
    // 获取评论
    this.$axios({
      url: "/hotels/comments"
    }).then(res => {
      this.comments = res.data.data;
      // console.log(this.comments);
      
    });
  }
};
</script>

<style lang='less' scoped>
.main {
  width: 1000px;
  margin: 0 auto;
  flex-direction: column;
  .bread {
    margin: 20px 0;
  }
  .hotelImg {
    //   display:flex;
    margin: 50px 0;
    img {
      width: 100%;
    }
    .leftImg {
      width: 640px;
      height: 360px;
      img {
        height: 100%;
      }
    }
    .rightImg {
      width: 365px;
      margin-left: 10px;
      img {
        width: 160px;
        // margin-left: 15px;
        margin: 0 0 10px 15px;
      }
    }
  }
  #container {
    width: 650px;
    height: 370px;
  }
  .hotelAbout {
    flex-direction: column;
    margin-top: 30px;
    .hotelItem {
      height: 60px;
      line-height: 60px;
      border-bottom: 2px solid #eee;
      .hotelassets {
        padding: 5px 10px;
        margin-right: 5px;
        background-color: #eee;
      }
    }
  }
  .comments {
    .commentsDetail {
      margin-left: -100px;
   
    }
    margin-top: 30px;
    flex-direction: column;
    .commentsTitle {
      font-size: 17px;
      font-weight: 700;
    }
    .commentsContent {
      height: 120px;
      align-items: center;
      .commentsNum {
        flex-direction: column;
        color: #666 ;
      }
      .commentsService {
        color: orange;
        align-items: center;
        .commentsServiceItem {
          margin-left: 70px;
        }
      }
    }
  }
}
</style>
