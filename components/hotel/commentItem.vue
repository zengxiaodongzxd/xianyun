<template>
  <div class="container">
    <div v-for="(item, index) in  data" :key="index">
      <el-row type="flex" class="commentsItem">
        <el-row type="flex" class="commentsItemLeft">
          <el-row type="flex" class="commentsItemLeftTop">
            <img
              src="https://n4-q.mafengwo.net/s11/M00/64/81/wKgBEFsmE0WAPbqnAAAOwSUlOKY63.jpeg?imageMogr2%2Fthumbnail%2F%2196x96r%2Fgravity%2FCenter%2Fcrop%2F%2196x96%2Fquality%2F90"
              alt
            />
            <span>lv.8</span>
          </el-row>
          <div class="commentsItemLeftBottom">{{timeFilter(item.updated_at)}} </div>
        </el-row>
        <el-row type="flex" class="commentsItemRight">
          <el-row class="comment">{{ item.content }}</el-row>
          <el-input type="textarea" resize='none' :rows="1" placeholder="添加回复" style="width:100%"></el-input>
        </el-row>
        <!-- 自己调用自己 -->
      </el-row>
      <commentItem :data="item.followed" />
    </div>
  </div>
</template>

<script>
export default {
  // 1.先命名name, 在当前组件内可以通过name自己调用自己
  data(){
      return {
        //   textarea:''
      }
  },
  name: "commentItem",
  props: ["data"],
  methods:{
    //   时间过滤
      timeFilter(date){
           
            var date = new Date(date);
            var seperator = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator + month + seperator + strDate;
            return currentdate;
       
      }
  }
};
</script>

<style lang='less' scoped>
.container {
  margin-left: 100px;
  color: #666;
  font-size: 14px;
  .commentsItem {
    // height: 100px;
    padding: 20px 0 20px 20px;
    align-items: center;
    border-top: 2px dotted #eee;
    .commentsItemLeft {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .commentsItemLeftTop {
        margin-bottom: 5px;
        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
        span {
          color: orangered;
          padding-left: 15px;
        }
      }
    }
    .commentsItemRight {
        flex: 1;
        margin-left: 22px;
        .comment{
            padding: 10px 0;
        }
      font-size: 16px;
      margin-left: 10px;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-start;
    }
  }
}
</style>
