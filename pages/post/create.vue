<template>
  <div class="container">
     <el-row type="flex" justify="space-between">
    <!-- 左侧富文本 -->
    <VueEditor />
    <!-- 右侧草稿箱 -->
    <!-- <Draft /> -->
    </el-row>
  </div>
</template>
<script>
import VueEditor from "@/components/post/vueeditor"
import Draft from "@/components/post/draft"
export default {
  components: {
    VueEditor,
    Draft
  },
}
</script>
<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .box{
        width: 20%;
        height: fit-content;
        border:1px #ddd solid;
    }
    .main{
      width:75%;
    }
</style>
