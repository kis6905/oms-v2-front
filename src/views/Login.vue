<template>
  <div class="login-area" ref="loginArea">
    <div class="form-area" id="formArea">
      <img class="logo" src="/img/logo.png" />
      <p class="title">OpenObject MS v2.0</p>
      <b-form-input v-model="userId"
                    type="text"
                    placeholder="ID"></b-form-input>
      <b-form-input v-model="password"
                    type="password"
                    placeholder="Password"></b-form-input>
      <b-button v-on:click="handleLogin"
                variant="outline-light"
                :block="true"
                size="lg">Login</b-button>
    </div>
  </div>
</template>

<script>
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'login',
  mixins: [common, api],
  data () {
    return {
      userId: '',
      password: ''
    }
  },
  mounted () {
  },
  methods: {
    async handleLogin (event) {
      if (!this.userId || !this.password) {
        alert('ID와 비밀번호를 입력해주세요')
        return false
      }
      // try {
      //   await this.login({ userId: this.userId, password: this.password })
      // } catch (e) {
      //   console.error(e)
      //   alert('로그인에 실패하였습니다. 다시 시도해주세요.')
      //   return false
      // }

      this.$refs.loginArea.classList.add('no-animation')
      this.$router.push('main')
    }
  }
}
</script>

<style lang="less" scoped>
.login-area {
  width: 100wh !important;
  height: 100vh !important;
  color: #fff;
  background: linear-gradient(-45deg, #f15b4c, #9e1bb5, #23a6d5, #edfcff);
  background-size: 400% 400%;
  -webkit-animation: Gradient 10s ease infinite;
  -moz-animation: Gradient 10s ease infinite;
  animation: Gradient 10s ease infinite;

  .form-area { 
    position: absolute;
    width: 15rem;
    left: 50%;
    top: 30%;
    transform: translate(-50%, 0);
    text-align: center;

    .logo {
      width: 100%;
    }
    .title {
      color: white;
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      font-size: 1.1rem;
    }
    input {
      margin-bottom: 0.5rem;
    }
    button {
      color: white;
      border-color: white;
    }
    button:hover,
    button:not(:disabled):not(.disabled):active,
    button:not(:disabled):not(.disabled).active,
    .show > button.dropdown-toggle {
      color: white;
      border-color: white;
      background-color: #fff0;
    }
  }
}

@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%
  }
  50% {
    background-position: 100% 50%
  }
  100% {
    background-position: 0% 50%
  }
}

.no-animation {
  animation: none !important;
  -webkit-animation: none !important;
  -moz-animation: none !important;
}

</style>
