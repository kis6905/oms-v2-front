<template>
  <div>
    <div class="title">
      <v-icon name="clipboard"></v-icon>
      회원관리
    </div>
    <div class="list-container">
      <EmptyData :isShow="filteredUserList.length === 0"></EmptyData>
      <div class="user-area" v-if="filteredUserList.length > 0">
      <b-button v-for="user in filteredUserList"
                :key="user.seq"
                :data-user-seq="user.seq"
                @click="handleClickUser"
                variant="outline-primary"
                :block="true">{{ user.name }} {{ user.rank }}</b-button>
      </div>
    </div>

    <b-modal v-model="isShowDetail"
             centered
             ok-only
             header-bg-variant="info"
             header-text-variant="light"
             header-border-variant="info"
             footer-bg-variant="light"
             footer-text-variant="dark"
             title="회원정보">
      <b-container fluid>
        <b-row class="my-1 form-row">
          <b-col sm="3">
            <label for="userId">ID</label>
          </b-col>
          <b-col sm="9">
            <b-form-input id="userId"
                          type="text"
                          :state="userIdState"
                          aria-describedby="invalidUserId"
                          v-model="user.userId"></b-form-input>
            <b-form-invalid-feedback id="invalidUserId">
              ID는 3 자리 이상입니다.
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="password">비밀번호</label>
          </b-col>
          <b-col sm="9">
            <b-form-input id="password"
                          type="password"
                          placeholder="미 입력 시 변경 안 됨"
                          :state="passwordState"
                          aria-describedby="invalidPassword"
                          v-model="user.password"></b-form-input>
            <b-form-invalid-feedback id="invalidPassword">
              비밀번호는 6 자리 이상입니다.
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="name">이름</label>
          </b-col>
          <b-col sm="9">
            <b-form-input id="name"
                          type="text"
                          :state="nameState"
                          aria-describedby="invalidName"
                          v-model="user.name"></b-form-input>
            <b-form-invalid-feedback id="invalidName">
              이름은 필수 입력입니다.
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="rank">직급</label>
          </b-col>
          <b-col sm="9">
            <b-form-input id="rank"
                          type="text"
                          :state="rankState"
                          aria-describedby="invalidRank"
                          v-model="user.rank"></b-form-input>
            <b-form-invalid-feedback id="invalidRank">
              직급은 필수 입력입니다.
            </b-form-invalid-feedback>
          </b-col>
        </b-row>
      </b-container>
      <div slot="modal-footer">
         <b-btn size="sm" class="float-right" variant="primary" @click="handleSave">
           저장
         </b-btn>
       </div>
    </b-modal>
  </div>
</template>

<script>
import EmptyData from '../components/common/EmptyData.vue'
import common from '../assets/js/common'
import api from '../assets/js/api'

export default {
  name: 'adminUser',
  mixins: [common, api],
  components: {
    EmptyData
  },
  props: [],
  data () {
    return {
      userList: [],
      filteredUserList: [],
      isShowDetail: false,
      selectedUser: null,
      isRegistration: false,
      isModification: false,
      user: {
        userId: null,
        password: null,
        name: null,
        rank: null,
        roleList: []
      }
    }
  },
  created () {
    this.$store.state.isMain = false
    this.init()
  },
  methods: {
    async init () {
      const response = await this.getUserList()
      if (response.status === 200) {
        this.userList = response.data
        this.filteredUserList = response.data
      }
    },
    handleClickUser (event) {
      this.isShowDetail = true
      this.isRegistration = false
      this.isModification = true
      this.user = { ...this.filteredUserList.find((user) => user.seq === event.currentTarget.dataset.userSeq) }
    },
    handleSave () {
      this.isShowDetail = false
      console.log('handleSave')
    }
  },
  computed: {
    userIdState () {
      return this.user.userId && this.user.userId.length >= 3 ? true : false
    },
    passwordState () {
      const password = this.user.password || ''
      if (this.isRegistration) {
        return password.length >= 6 ? true : false
      } else if (this.isModification) {
        return password.length === 0 ? null : password.length >= 6 ? true : false
      }
    },
    nameState () {
      return this.user.name && this.user.name.length >= 3 ? true : false
    },
    rankState () {
      return this.user.rank && this.user.rank.length > 0 ? true : false
    }
  }
}
</script>

<style lang="less" scoped>
.list-container {
  margin: 10px 10px 10px 10px;

  button:hover,
  button:not(:disabled):not(.disabled):active,
  button:not(:disabled):not(.disabled).active,
  .show > button.dropdown-toggle {
    color: #007bff;
    background-color: #fff0;
  }
}
.my-1 {
  padding-bottom: 0.5rem;
}
</style>
