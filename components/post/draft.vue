<template>
  <div class="box">
    <p>草稿箱  (0)</p>
    <div class="draft-list">
      <div class="draft">
        <span>title</span><i class="el-icon-edit"></i>
        <p>time</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.box {
  width: 200px;
  height: fit-content;
  border: 1px #ddd solid;
  padding:8px;
  p{
    color:#ccc;
    margin-bottom: 8px;
  }
}
.draft{
  margin-bottom: 8px;
}
</style>


