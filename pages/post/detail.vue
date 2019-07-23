<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 左边信息栏 -->
      <div class="detail-content">
        <postHead />
        <div class="container">
          <p>评论</p>
          <textarea
            autocomplete="off"
            placeholder="说点什么吧..."
            class="el-textarea__inner"
            style="resize: none; min-height: 33px;width:700px"
          ></textarea>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            name="files"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-button type="primary" @click="handleClick()">提交评论</el-button>
          <div class="writeComment" style="margin:20px 0">写评论</div>
          <PostComment v-for="(v,i) in commentsList" :key="i" :comment="v" />
          <!-- 分页器 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[2, 5, 8, 10]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
      <!-- 右边侧边栏 -->
      <div class="aside">
        <Aside />
      </div>
    </el-row>
  </div>
</template>
<script>
import moment, { localeData } from "moment";
import PostHead from "@/components/post/postHead";
import Aside from "@/components/post/aside";
import PostComment from "@/components/post/postComment";
export default {
  data() {
    return {
      total: 50,
      currentPage: 1,
      pageSize: 2,
      commentsList: []
    };
  },
  components: {
    PostHead,
    Aside,
    PostComment
  },
  watch: {
    $route() {
      const { id } = this.$route.query;
      this.getData(id, 2, 0);
    }
  },
  methods: {
    // 预览图片时候触发的事件
    handlePictureCardPreview() {},

    //移出图片时候触发的
    handleRemove() {},

    //上传成功时候触发的事件
    uploadSuccess(response, file, fileList) {
      console.log(response, file, fileList);
    },

    getData(post, limit, start) {
      this.$axios({
        url: "/posts/comments",
        params: {
          post: post,
          _limit: limit,
          _start: start
        }
      }).then(res => {
        console.log(res.data);
        this.total = res.data.total - 0;
        this.commentsList = res.data.data;
        console.log(this.commentsList);
      });
    },
    //当每页的显示条数发生改变时候触发的事件
    handleSizeChange(value) {
      const { id } = this.$route.query;
      this.pageSize = value;
      this.currentPage = 1;
      this.getData(id, value, (this.currentPage - 1) * value);
    },

    //当当前页码发生变化时候
    handleCurrentChange(value) {
      const { id } = this.$route.query;
      this.currentPage = value;
      this.getData(id, this.pageSize, (value - 1) * this.pageSize);
    }
  },
  mounted() {
    const { id } = this.$route.query;
    this.getData(id, 2, 0);
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
.detail-content {
  width: 745px;
}
.aside {
  width: 240px;
}
</style>
