<template >
  <div class="q-pa-md row ">
    <div
      class="col"
      v-if="$mq != 'sm'"
    ></div>
    <div
      class="col"
      :style="$mq === 'sm' ? 'width: 80% ; height: 80%': 'max-width: 30%;height: 70%' "
    >
      <q-card class="q-my-xl">
        <q-card-section class="position-absolute">
          <div class="text-primary text-capitalize">{{$t('login_form')}}</div>
          <div v-if="qrCode"></div>
        </q-card-section>
        <q-card-section class="q-px-auto">
          <q-tabs
            v-if="qrCode"
            v-model="qrCodeOrAccount"
            dense
          >
            <q-tab
              name="qr"
              :label="$t('login_with_qrcode')"
              class="text-primary"
            />
            <q-tab
              name="account"
              :label="$t('login_with_account')"
              class="text-primary"
            />
          </q-tabs>
          <div
            class="row q-ma-md"
            v-if="qrCode && qrCodeOrAccount === 'qr'"
          >
            <div class="col"></div>
            <!--q-img
              class="col-auto q-mx-auto"
              src="~assets/icons/qrcode.png"
              style="width: 50%"
            ></q-img-->
            <div class="col"></div>
          </div>
          <q-form
            v-else-if="qrCode  && qrCodeOrAccount === 'account' || !qrCode"
            ref="form"
            :class="$mq === 'sm'? 'q-gutter-xs':'q-gutter-md'"
            @submit="doLogin"
            @validation-success="validation(true)"
            @validation-error="validation(false)"
          >
            <q-input
              :label="$t('username')"
              v-model="username_"
              :rules="[val => !!val || $t('field_is_required'),
              val => val.length >= 5 || $t('min_length_5')]"
              lazy-rules
              @change="validate"
            >
            </q-input>
            <q-input
              :label="$t('password')"
              v-model="password"
              :rules="[val => !!val || $t('field_is_required'),
              val => val.length >= 5 || $t('min_length_5')]"
              @change="validate"
              lazy-rules
              type="password"
            ></q-input>
            <br>
            <div>
              <q-btn
                color="primary"
                class="full-width"
                :label="$t('login')"
                type="submit"
                :disable="!validForm"
              ></q-btn>
            </div>
            <br>
            <q-btn
              size="12px"
              :label="$t('dont_have_account')"
              flat
              to="/signup"
            ></q-btn>
            <q-btn
              size="12px"
              :label="$t('forgot_password')"
              flat
              to="/reset"
            ></q-btn>
            <div
              v-if="thirdParties.length > 0"
              class="column"
            >
              <div class="row q-gutter-x-sm">
                <q-separator class="col-sm-shrink col-md self-center" />
                <div class="col self-center text-center text-primary text-h6 text-capitalize">{{$t('other_options')}}</div>
                <q-separator class="col-sm-shrink col-md self-center" />
              </div>
              <div class="q-mt-md q-gutter-sm text-center">
                <q-btn
                  class=""
                  v-for="(option, i) in thirdParties"
                  round
                  :key="i"
                  t
                  @click="p3rdLogin(option)"
                  unelevated
                >
                  <!--q-img :src="require(`./icons/${get3rdPBtn(option).icon}`)" /-->
                  <q-tooltip>{{$t(get3rdPBtn(option).toolTip)}}</q-tooltip>
                </q-btn>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
      <div
        class="text-negative text-center"
        v-show="showError"
      >{{$t(errorMsg)}}</div>
      <div
        class="text-positive text-center"
        v-show="showSuccess"
      >{{$t(successMsg)}}</div>
    </div>
    <div
      class="col"
      v-if="$mq != 'sm'"
    ></div>
  </div>
</template>
<style lang="scss" scoped>
</style>
<script>
export default {
  name: 'wt-login-form',
  props: {
    qrCode: {
      type: Boolean,
      default: true
    },
    /*
      Google
      Facebook
      GitHub
      Wechat
    */
    thirdParties: {
      type: Array,
      default () {
        return ['Google', 'Facebook', 'GitHub', 'Wechat']
      }
    },
    phoneNumberOnly: {
      type: Boolean,
      default: false
    },
    styling: {
      type: String,
      default: 'center-box' // left-box , right-box , center-form  right form left form
    },
    successRedirect: {
      type: String,
      default: '/index'
    }
  },
  mounted () {
    if (this.$mq === 'sm') {
      print('this.qrCode=false')
    }
  },
  data () {
    return {
      qrCodeOrAccount: 'qr',
      qrCodeEnabled: false,
      validForm: false,
      showError: false,
      errorMsg: '',
      username_: '',
      password: '',
      tokens: '',
      code: '',
      successMsg: false,
      showSuccess: ''
    }
  },
  methods: {
    p3rdLogin (o) {

    },
    get3rdPBtn (o) {
      let x = {}
      if (o === 'Google') {
        x = { icon: 'google.png', toolTip: 'login_with_google' }
      } else if (o === 'Facebook') {
        x = { icon: 'facebook.png', toolTip: 'login_with_facebook' }
      } else if (o === 'GitHub') {
        x = { icon: 'github.png', toolTip: 'login_with_github' }
      } else if (o === 'Wechat') {
        x = { icon: 'wechat.png', toolTip: 'login_with_wechat' }
      }
      return x
    },
    error (payload) {
      console.log(`Error with payload ${payload}`)
    },
    validate () {
      this.$refs.form.validate()
    },
    validation (x) {
      this.validForm = x
      console.log(`changing ${x}`)
    },
    doLogin () {
      if (this.validForm) {
        console.log('logging in ')
        const self = this
        this.$request('post', 'user/login', {}, { username: self.username, password: self.password }, function (data) {
          console.log(`login response ${JSON.stringify(data)}`)
          if (data.success) {
            self.$session.start()
            self.successMsg = data.msg
            self.showSuccess = true
            self.$router.push(this.successRedirect)
          } else {
            self.errorMsg = data.msg
            self.showError = true
          }
        })
      }
    }

  }
}
</script>
