<template>
  <div id="container">
    <Search/>
    <Hotels/>
 
  </div>
</template>
<script>
import Search from "@/components/hotel/search";
import Hotels from "@/components/hotel/Hotels";

export default {
  components: {
    Search,
    Hotels

  }
};
</script> 
<style lang="less" scoped>
#container {
  width: 1000px;
  margin: 0 auto;
}
</style>