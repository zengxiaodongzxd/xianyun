<template>
  <div class="main">
    <div>
      <div class="post-column">
        <h2>发表新功略</h2>
        <p>分享你的个人游记，让更多人看到哦！</p>
        <input
          type="text"
          placeholder="请输入标题"
          v-model="editList.title"
        >
      </div>
      <!-- 富文本 -->
      <div class="post-column">
        <VueEditor
          :config="config"
          ref="vueEditor"
          v-model="editList.content"
        />
      </div>
      <!-- 输入后匹输入建议 -->
      <div class="post-column">
        选择城市
        <el-autocomplete
          placeholder="请搜索游玩城市"
          style="margin-left:10px"
          v-model="editList.city"
        ></el-autocomplete>
        <div class="cao">
          <el-button type="primary"  @click="handleRelease">发布</el-button>
          <span>或者</span>
          <nuxt-link to="#">保存到草稿</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css"
let VueEditor;

if (process.browser) {
  VueEditor = require('vue-word-editor').default
}

export default {
  data() {
    return {
      editList: [{
        content: "",
        title: "",
        city: ""
      }],
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],
            ['image', 'video'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
          ]
        },
        // 主题
        theme: 'snow',
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true
          },
          uploadProgress(res) {

          },
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url)
          },
          uploadError() { },
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true
          },
          uploadProgress(res) {

          },
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url)
          },
          uploadError() { },
        }
      }
    }
  },

  components: {
    VueEditor
  },
  methods:{
    // 点击发布按钮时触发
    handleRelease(){
      // 数据拼接
      const data ={
        // content:this.editList.content,
        content:this.$refs.vueEditor.editor.root.innerHTML,
        title:this.editList.title,
        city:this.editList.city,
      }
      // console.log(data);

      //  自定义验证
      const rules = {
        title: {
          value: this.editList.title,
          message: "标题不能为空"
        },
        content: {
          value: this.$refs.vueEditor.editor.root.innerHTML,
          message: "正文不能空"
        },
        city: {
          value: this.editList.city,
          message: "城市不能空"
        },
      }
      
      // 提交攻略
      this.$axios({
        url:"/posts",
        method:"POST",
        data,
                //  添加授权的头信息
        headers: {
          // 下面请求头信息不是通用的，针对当前的项目的（基于JWT token标准）
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res=>{
        console.log(res);
        
      })
    }
  }
}
</script>

<style lang="less" scoped>
.post-column {
  margin-bottom: 20px;
  h2 {
    margin: 15px 0;
    font-size: 22px;
    font-weight: normal;
  }
  p {
    font-size: 14px;
    color: #ccc;
    margin-bottom: 10px;
  }
  input {
    width: 100%;
    height: 36px;
    border: 1px solid #ccc;
  }
  .cao {
    // display: block;
    margin-top: 20px;
  }
  el-button {
    margin: 20px 0;
  }
  a {
    color: orangered;
    &:hover {
      text-decoration: underline;
    }
  }
}

/deep/ .ql-editor {
  height: 400px;
}
</style>
