<template>
  <div style="padding:50px;">
     <h1 style="margin-bottom:50px;">组件递归</h1>
    
    <NavsItem :data="navs"/>
    <PostTest/>
  </div>
</template>

<script>

import NavsItem from "@/components/post/navsItem";
import PostTest from "@/components/post/postTest";

export default {
    components: {
        NavsItem,
        PostTest
    },
    data(){
        return {

    

    }
  },
  methods: {
    handleClick() {
      this.$router.push("/post/create")
    }
  }
}
</script>

<style>
</style>
