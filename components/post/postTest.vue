<template>
  <div class="container">
    <div v-for="(item,index) in post" :key="index" @click="postHandle(item.id)">{{item.city}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      post: [
        {
          city: "post1",
          id: 4
        },
        {
          city: "post2",
          id: 5
        },
        {
          city: "post3",
          id: 6
        },
        {
          city: "post4",
          id: 7
        },
        {
          city: "post5",
          id: 7
        }
      ]
    };
  },
  methods: {
    postHandle(id) {
      console.log(id);
      this.$router.push({
        path: "/post/detail",
        query: {
          id: id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.container > div {
  border: 1px solid red;
  width: 50px;
  height: 50px;
  background-color: aqua;
}
</style>
