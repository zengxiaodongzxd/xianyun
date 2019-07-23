<template>
  <div class="comment">
    <p style="font-size:20px; margin:20px 0">评论</p>
    <span>
      <el-tag closable type="info" style="margin-bottom:10px">回复：@地球发动机</el-tag>
    </span>
    <div class="textear">
      <el-input
        type="textarea"
        :rows="3"
        placeholder="说点什么吧,哥哥!!!!!"
        v-model="textarea"
        resize="none"
        style="margin-bottom:20px;"
      ></el-input>
    </div>
    <el-row type="flex" justify="space-between" style="margin-bottom:30px;">
      <div>
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
      <div>
        <el-button type="success">提交</el-button>
      </div>
    </el-row>
    <!-- 评论 -->
    <div class="cmt-list" v-for="(item,index) in data.comments" :key="index">
      <div class="cmt-item">
        <div class="cmt-info">
          <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
          {{data.account.nickname}}
          <i>{{item.created_at}}</i>
          <span>{{item.level}}</span>
        </div>
        <div class="cmt-content">
          <div class="cmt-new">
            <p class="message">{{item.content}}</p>
            <el-row type="flex">
              <div class="cmt-pic">
                <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
              </div>
            </el-row>
            <div class="cmt-ctrl">
              <a href="javascript:void(0)">回复</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: "",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  props:{
      data:{
        type:Object,
        default:{}
      }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.comment {
  .cmt-list {
    display: block;
    &:hover {
      display: block;
      cursor: pointer;
    }
    width: 700px;
    border: 1px solid pink;
    border-bottom: 0;
    padding: 20px 20px 5px;
    .cmt-item {
      // border: 1px solid red;
      .cmt-info {
        margin: 0 0 10px;
        img {
          width: 16px;
          height: 16px;
        }
        i {
        }
        span {
          float: right;
        }
      }
      .cmt-content {
        padding-left: 30px;
        .cmt-new {
          p {
            margin-bottom: 10px;
          }
          .cmt-pic {
            border: 1px dashed #666;
            margin-bottom: 10px;
            img {
              padding: 10px;
              width: 80px;
              height: 80px;
            }
          }
          .cmt-ctrl {
            // display: none;

            margin-bottom: 5px;
            height: 22px;
            a {
              // display: inline;
              // text-align: right;
              margin-left: 600px;
            }
          }
        }
      }
    }
  }
}
</style>

