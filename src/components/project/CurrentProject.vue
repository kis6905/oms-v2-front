<template>
  <div class="contents">
    <div class="title">
      <h4>현재 투입된 프로젝트</h4>
    </div>
    <div class="list-container">
      <b-card-group deck class="mb-3">
        <b-card border-variant="info"
                header="현대카드 컬처앱"
                header-bg-variant="info"
                header-text-variant="white"
                align="center"
                v-on:click="handleProejct"
                data-project-id="1">
          <p class="card-text">발주처: 현대카드</p>
          <p class="card-text">기간: 2018-08-15 ~ 2019-04-30</p>

        </b-card>
        <b-card border-variant="info"
                header="현대카드 코스트코 카드신청 웹"
                header-bg-variant="info"
                header-text-variant="white"
                align="center"
                v-on:click="handleProejct"
                data-project-id="2">
          <p class="card-text">발주처: 현대카드</p>
          <p class="card-text">기간: 2018-08-15 ~ 2019-04-30</p>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CurrentProject',
  data () {
    return {
    }
  },
  methods: {
    handleProejct (event) {
      console.log(event)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  width: 100%;
  color: white;
  background-color: rgb(44, 85, 148);
  margin-top: 1px;
  text-align: center;
  font-size: 15px;
  padding: 10px 0 2px 0;
}

.list-container {
  margin: 10px 20px;
}
</style>
