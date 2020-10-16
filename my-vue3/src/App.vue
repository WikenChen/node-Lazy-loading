<template>
  <Index />
</template>
<script>
import Index from "./views/index.vue";
export default {
  name: "app",
  components: {
    Index
  }
};
</script>

<style lang="less">
html, body, #app{
  height: 100vh;
  margin: 0;
}
</style>
