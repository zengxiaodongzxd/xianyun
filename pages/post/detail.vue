<template>
  <div class="container">
   <el-row type="flex" justify="space-between">
     <!-- 左边信息栏 -->
     <div class="detail-content">
       <postHead/>
       
     </div>
     <!-- 右边侧边栏 -->
     <div class="aside">
       <Aside/>
     </div>
   </el-row>
  </div>
</template>
<script>
import moment, { localeData } from "moment";
import PostHead from '@/components/post/postHead'
import Aside from '@/components/post/aside'
export default {
  components: {
    PostHead,
    Aside
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
.detail-content{
  width: 745px;
}
.aside{
  width: 240px;
}
</style>
