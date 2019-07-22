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
      <!-- 地图 -->
      <div id="container"></div>
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
          <el-col :span="20" class="content"><span class="hotelassets" v-for="(item,index) in dataInfo.hotelassets" :key="index">{{item.name}}</span></el-col>
        </el-row>
        <el-row class="hotelItem">
          <el-col :span="4" class="title">停车服务</el-col>
          <el-col :span="20" class="content">{{dataInfo.parking}}</el-col>
        </el-row>
        <el-row class="hotelItem">
          <el-col :span="4" class="title">品牌信息</el-col>
          <el-col :span="20" class="content">{{dataInfo.hotelbrand?dataInfo.hotelbrand:''}}</el-col>
        </el-row>
      </el-row>
      <!-- 评论 -->
      <el-row type="flex" class="comments">
          <el-row >
              <el-row class="commentsTitle">10条真是用户评论</el-row>
              <el-row type="flex" class="commentsContent">
                  <el-row class="commentsNum" type="flex">
                    <div>总评数：{{dataInfo.all_remarks}}</div>
                    <div>好评数：{{dataInfo.good_remarks}}</div>
                    <div>差评数：{{dataInfo.bad_remarks}}</div>
                  </el-row>
                  <el-row  type="flex" class="commentsService">
                      <div class="commentsServiceItem">星级 {{dataInfo.stars}}  </div>
                      <div class="commentsServiceItem">环境{{dataInfo.scores?dataInfo.scores.environment:''}}</div>
                      <div class="commentsServiceItem">产品{{dataInfo.scores?dataInfo.scores.product:''}}</div>
                      <div class="commentsServiceItem">服务{{dataInfo.scores?dataInfo.scores.service:''}}</div>
         
                  </el-row>
              </el-row>
          </el-row>
          <CommentItem :data='comments'/>
      </el-row>
    </el-row>
    <div class="space"></div>
  </div>
</template>

<script>
import CommentItem from "@/components/hotel/commentItem";
export default {
  data() {
    return {
      dataInfo: {}, // 当前酒店信息
      products: [], //产品信息
      // assets: {}, //酒店配置
      comments:[],//评论
      rightImg: [1, 2, 3, 4, 5, 6], // 右侧图片
      location: [118.8718107, 31.32846821]
    };
  },
  components:{
    CommentItem
  },
  methods: {
    setMarkers(x, y) {
      return new AMap.Marker({
        //content: "<div style='width:20px; height:20px; background:red;'>1</div>",
        position: new AMap.LngLat(x, y) // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      });
    },
    init() {
      var map = new AMap.Map("container", {
        zoom: 11, //放大级别
        center: this.location, //中心点坐标，经纬度
        viewMode: "3D" //使用3D视图
      });

      // 创建一个 Marker 实例：
      map.add(this.setMarkers(118.8718107, 31.32846821));
      map.add(this.setMarkers(119.8718107, 31.32846821));
      map.add(this.setMarkers(118.8718107, 32.32846821));

      // 地图的链接
    }
  },
  mounted() {
    
    window.onload = this.init;
    var key = "abe62d1e6e05f82c78c0db4730d4a917";
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onload`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    // 获取酒店信息
    this.$axios({
      url: `/hotels?id=${this.$route.query.id}`
    }).then(res => {
      // console.log(res);
      this.dataInfo = res.data.data[0];
    //   this.products = this.dataInfo.products;
      const { location } = this.dataInfo;
      console.log(location);

      this.location = [location.longitude, location.latitude];
      console.log(this.dataInfo);
    });
  this.$axios({
    url:'/hotels/comments'
  })
  .then(res=>{
    console.log(res);
    this.comments=res.data.data
  })
    // 获取酒店选项信息
    // this.$axios({
    //   url: "/hotels/options"
    // }).then(res => {
    //   console.log(res);
    //   res.data.data.assets.forEach(v => {
    //     if (v.id === +this.$route.query.id) {
    //       this.assets = v;
    //     }
    //   });
    //   console.log(this.assets);
    // });
    //   console.log(this.dataInfo);
    //   console.log(res.data.data);

    //   console.log(this.location);
    // 生成地图.container是显示地图的div的id
    //   this.$axios({
    //       url:'/cities',
    //       params:{
    //           name:'南京'
    //       }
    //   })
    //   .then(res=>{
    //       console.log(res);

    //   })
  }
};
</script>

<style lang='less' scoped>
.space {
  height: 300px;
}
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
    margin-top: 30px;
      flex-direction: column;
      .commentsContent {
        height: 120px;
        align-items: center;
          .commentsNum {
              flex-direction: column;
          }
          .commentsService {
            align-items: center;
            // height: 120px;
            .commentsServiceItem {
              margin-left: 70px;
            }
          }
      }
  }
}
</style>
