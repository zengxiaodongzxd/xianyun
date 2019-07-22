<template>
<<<<<<< HEAD
  <div class="div">
    <div
      v-for="(item, index) in data"
      :key="index"
    >
      {{ item.title }}

      <!-- 自己调用自己 -->
      <NavsItem
        v-if="item.children && item.children.length"
        :data="item.children"
      />
=======
    <div class="div">
        <div v-for="(item, index) in  data" :key="index">
            {{ item.content }}

            <!-- 自己调用自己 -->
            <NavsItem :data="item.followed" />
        </div>
>>>>>>> a25ef757108f938bb1e0373ee0fa3e86044e57c1
    </div>
  </div>
</template>

<script>
export default {
  // 1.先命名name, 在当前组件内可以通过name自己调用自己
  name: "NavsItem",
  props: ["data"]
}
</script>

<style scoped>
.div div {
  margin-left: 20px;
}
</style>
