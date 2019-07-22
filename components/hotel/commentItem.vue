<template>
    <div class="container">
        <div v-for="(item, index) in  data" :key="index">
            {{ item.content }}
        
            <!-- 自己调用自己 -->
            <commentItem :data="item.followed" />
        </div>
    </div>
</template>

<script>
export default {
    // 1.先命名name, 在当前组件内可以通过name自己调用自己
    name: "commentItem",
    props: ["data"]
}
</script>

<style scoped>
    .container  >div{
        margin-left:20px;
    }
</style>
