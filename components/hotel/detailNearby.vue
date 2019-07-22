<template>
  <div class="container">
    <!-- tabs标签页 -->
    <el-row id="container1" v-show="currentTab==='first'"></el-row>
    <el-row id="container2" v-show="currentTab==='second'"></el-row>
    <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="tabsBox" label="风景" name="first">
        <el-row type="flex" class="tabsItem" v-for="(item,index) in scenery" :key="index">
          <div>{{item.name}}</div>
          <div>我不知道</div>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="交通" class="tabsBox" name="second">
        <el-row type="flex" class="tabsItem" v-for="(item,index) in traffic" :key="index">
          <div>{{item.name}}</div>
          <div>我不知道</div>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataInfo: this.$store.state.hotel.dataInfo,
      activeName: "first",
      scenery: [], //风景列表
      traffic: [], //交通列表
      currentTab: "first" //当前选中tab栏
    };
  },
  methods: {
    // tab栏点击触发
    handleClick(tab) {
      this.currentTab = tab.name;
    },
    setMarkers(x, y, title) {
      return new AMap.Marker({
        // content: "<div style='width:20px; height:20px; background:red;'>1</div>",
        position: new AMap.LngLat(x, y), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title
      });
    },
    init() {
      // 创建风景地图
      var map1 = new AMap.Map("container1", {
        zoom: 14, //放大级别
        center: this.$store.state.hotel.locationStr.split(","), //中心点坐标，经纬度
        title: this.dataInfo.name,
        viewMode: "3D" //使用3D视图
      });
      const centerLocationArr = this.$store.state.hotel.locationStr.split(",");
      map1.add(
        this.setMarkers(
          centerLocationArr[0],
          centerLocationArr[1],
          this.dataInfo.name
        )
      );
      setTimeout(() => {
        this.scenery.forEach(v => {
          let arr = v.location.split(",");
          map1.add(this.setMarkers(arr[0], arr[1], v.name));
        });
      }, 2000);
      var map2 = new AMap.Map("container2", {
        zoom: 14, //放大级别
        center: this.$store.state.hotel.locationStr.split(","), //中心点坐标，经纬度
        title: this.dataInfo.name,
        viewMode: "3D" //使用3D视图
      });
      map2.add(
        this.setMarkers(
          centerLocationArr[0],
          centerLocationArr[1],
          this.dataInfo.name
        )
      );
      setTimeout(() => {
        this.traffic.forEach(v => {
          let arr = v.location.split(",");
          map2.add(this.setMarkers(arr[0], arr[1], v.name));
        });
      }, 1000);
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

    setTimeout(() => {
      // 获取风景列表

      console.log(this.$store.state.hotel.dataInfo);

      const city = this.$store.state.hotel.dataInfo.city.name.replace("市", "");
      this.$axios({
        url: "https://restapi.amap.com/v3/place/text",
        params: {
          keywords: "",
          city,
          location: this.$store.state.hotel.locationStr,
          types: "风景名胜",
          output: "json",
          page: 1,
          offset: 10,
          key: "79041dfa1c752f49599e2b507c64da42"
        }
      }).then(res => {
        // this.$store.commit("hotel/setScenery", res.data.pois);
        this.scenery = res.data.pois;
      });
      // 获取交通列表
      this.$axios({
        url: "https://restapi.amap.com/v3/place/text",
        params: {
          keywords: "",
          city,
          location: this.$store.state.hotel.locationStr,
          types: "交通设施服务",
          output: "json",
          page: 1,
          offset: 10,
          key: "79041dfa1c752f49599e2b507c64da42"
        }
      }).then(res => {
        // this.$store.commit("hotel/setTraffic", res.data.pois);
        this.traffic = res.data.pois;
      });
    }, 1000);
  }
};
</script>

<style lang="less" scoped>
.container {
  display: flex;
  margin-top: 20px;
  #container1 {
    width: 650px;
    height: 370px;
  }
  #container2 {
    width: 650px;
    height: 370px;
  }
  .tabs {
    margin-left: 20px;
    .tabsBox {
      height: 314px;
      overflow-y: scroll;
      .tabsItem {
        justify-content: space-between;
        padding-right: 15px;
        height: 40px;
        align-items: center;
        font-size: 14px;
        color: #666;
        width: 300px;
      }
    }
  }
}
</style>

