<template>
  <div class="search">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京市酒店预订</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索页 -->
    <div class="search">
      <el-row>
        <el-col :span="6">
          <el-select
            v-model="City"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="搜索城市"
            :remote-method="queryCitySearch"
            :loading="loading"
          >
            <el-option
              v-for="(item,index) in options"
              :key="index"
              :label="item.label"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="date"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="-"
            start-placeholder="开房时间"
            end-placeholder="退房时间"
            align="right"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-select v-model="value" clearable placeholder="请选择">
            <el-option
              v-for="item in persons"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">查看价格</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 区域页 -->
    <div class="areas">
      <el-row>
        <el-col :span="12">
          <div class="area">
            区域:
            <span>全部</span>
            <span></span>
          </div>

          <div class="gonglue">攻略:</div>
          <div class="avgprice">均价:</div>
        </el-col>
        <el-col :span="12" id="map" style="width:500px; height:300px;"></el-col>
      </el-row>
    </div>
    <div class="select">
      <!-- 筛选页 -->
      <el-row>
        <el-col :sapn="8" class="prices">
          价格
          <span class="ranp">{{slider}}</span>
          <hr />

          <el-slider v-model="slider"></el-slider>
        </el-col>
        <el-col :span="4" class="level">
          住宿等级
          <br />不限
          <span class="menu1">
            <el-dropdown>
              <el-button type="primary">
                更多菜单
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>黄金糕</el-dropdown-item>
                <el-dropdown-item>狮子头</el-dropdown-item>
                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                <el-dropdown-item>双皮奶</el-dropdown-item>
                <el-dropdown-item>蚵仔煎</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown split-button  @click="handleClick" v-show='false'></el-dropdown>
          </span>
        </el-col>
        <el-col :span="4" class="type">住宿类型</el-col>
        <el-col :span="4" class="hotel">酒店设施</el-col>
        <el-col :span="4" class="brand">酒店品牌</el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      loading: false,
      City: "",
      slider: 0,
      pickerOptions: {
        shortcuts: [
          {
        
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      date: "",
      persons: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  methods: {
     handleClick() {
        alert('button click');
      },
    queryCitySearch(value,callback) {
      this.querySearchCity(value).then(arr => {
        if (arr.length > 0) {
          // 设置到达城市的第一个为默认值
          this.options.City = arr[0].value;
        }
        // 执行回调
        callback(arr)
      });
    },
    querySearchCity(queryString) {
      return new Promise((resolve, reject) => {
        if (!queryString.trim()) {
          resolve([]);
          return;
        }
        this.$axios({
          url: "/cities",
          params: {
            name: queryString
          }
        }).then(res => {
          console.log(res);
          const { data } = res.data;
          this.options = data.map(v => {
            return {
              ...v
            };
          });

          resolve(this.options);
        });
      });
    }
  },
  mounted() {
    window.onLoad = function() {
      // 生成地图.container是显示地图的div的id
      var map = new AMap.Map("map", {
        zoom: 11, //放大级别
        center: [118.8718107, 31.32846821], //中心点坐标，经纬度
        viewMode: "3D" //使用3D视图
      });

      // 创建一个 Marker 实例：
      var marker = new AMap.Marker({
        //content: "<div style='width:20px; height:20px; background:red;'>1</div>",
        position: new AMap.LngLat(118.8718107, 31.32846821), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        title: "北京"
      });

      map.add(marker);
    };

    // 地图的链接
    var key = "fc349821166279b8365299d22d7cf202";
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
<style lang="less" scoped>
.search {
  margin-bottom: 20px;
  margin-top: 10px;
}

.areas {
  margin-top: 10px;
  margin-bottom: 20px;
}
.area,
.gonglue,
.avgprice {
  height: 100px;
}
.prices {
  width: 33.3%;
  padding: 0 20px;
}

.level,
.type,
.hotel,
.brand {
  height: 80px;
}
.price {
  float: left;
  height: 80px;
  text-align: center;
}
.ranp {

  float: right;
}
.el-dropdown {
  width: 15px;
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 0px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
