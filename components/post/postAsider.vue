<template>
  <div>
    <div class="aside">
      <div class="content" @mouseenter="isShow=true" @mouseleave="isShow=false">
        <span>{{data.type}}</span>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="recomed" v-show="isShow" @mouseenter="isShow=true" @mouseleave="isShow=false">
        <ul v-for="(item,index) in data.children" :key="index">
          <li>
            <strong>{{index+1}}</strong>
            <span>{{item.city}}</span>
            <i>{{item.desc}}</i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    };
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="less" scoped>
.aside {
  border: 1px solid #ccc;
  // border-right: 1px solid red;
  background-color: #fff;
  border-top: none;
  z-index: 4;
  &:nth-child(1) {
    border-top: 1px solid #ccc;
  }
  &:hover {
    border-right: 0;
    color: orange;
    .recomed {
      li {
        color: #666;
      }
    }
  }

  .content {
    width: 100%;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    &:hover {
      color: orange;
    }
    span {
      padding: 0 20px;
    }
    i {
      padding: 0 20px;
      display: block;
      float: right;
      line-height: 40px;
    }
  }
  .recomed {
    width: 350px;
    position: absolute;
    z-index: -1;
    top: 0px;
    left: 269px;
    border: 1px solid#ccc;
    background-color: #fff;
    li {
      // padding-top: 10px;
      &:last-child {
        padding-bottom: 10px;
      }
      strong {
        font-size: 22px;
        color: orange;
        font-weight: normal;
        padding: 0 15px;
      }
      span {
        padding-top: 5px;
        font-size: 14px;
        color: orange;
        margin-right: 15px;
         &:hover{
          border-bottom: 1px solid orange;
          cursor: pointer;
        }
      }
      i {
        font-size: 14px;
        margin-right: 10px;
        &:hover{
          border-bottom: 1px solid #ccc;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
