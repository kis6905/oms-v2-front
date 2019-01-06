<template>
  <div class="notice">
    <b-carousel id="noticeCarousel"
                style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="1024"
                img-height="480"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd">
      <b-carousel-slide img-src="/img/main/notice001.jpg">
        <p>OpenObject Management System v2.0 Prototype 입니다.</p>
      </b-carousel-slide>
      <b-carousel-slide img-src="/img/main/notice002.jpg">
        <h4>개발자를 모집합니다!</h4>
        <p>OMS v2.0은 Vuejs2, Spring5 MVC로 개발되었습니다.</p>
      </b-carousel-slide>
      <b-carousel-slide img-src="/img/main/notice003.jpg">
        <h4>디자이너를 모집합니다!</h4>
        <p>혼자 다 할라니까 빡세네요.</p>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

<style lang="less" scoped>
.notice {
  margin-top: 0.05rem;
}
</style>
