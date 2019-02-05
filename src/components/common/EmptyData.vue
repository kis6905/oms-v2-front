<template>
  <div class="empty-area" v-if="isShow">
    데이터가 없습니다.
  </div>
</template>

<script>
export default {
  name: 'EmptyData',
  props: ['isShow']
}
</script>

<style lang="less" scoped>
.empty-area {
  width: 100wh;
  height: 60px;
  margin-top: 50px;
  text-align: center;
  color: #b1b1b1;
  font-size: 16x;
}
</style>
