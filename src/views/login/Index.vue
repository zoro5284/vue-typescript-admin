<template>
  <div class="login-container">
    <video
      poster="@/assets/images/login/onePiece.jpg"
      autoplay
      loop
      muted
    >
      <source src="@/assets/images/login/night.mp4">
    </video>
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
    >
      <div class="title-container">
        <h3 class="title">
          {{ title }}
        </h3>
      </div>

      <el-form-item
        prop="username"
      >
        <SvgIcon
          icon-class="bug"
          class="login-form-svg"
        />
        <el-input
          ref="userNameRef"
          v-model="loginForm.username"
          placeholder="用户名"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>
      <el-tooltip
        :visible="showCapsTooltip"
        content="Caps lock is On"
        placement="right"
      >
        <el-form-item
          prop="password"
          class="form-item-container"
        >
          <SvgIcon
            icon-class="bug"
            class="login-form-svg"
            @click="showPwd"
          />
          <el-input
            :key="passwordType"
            ref="passwordRef"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="showCapsTooltip = false"
            @keyup.enter="handleLogin"
          />
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px;"
        @click="handleLogin"
      >
        登陆
      </el-button>
    </el-form>
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref, onMounted } from 'vue'

import { useRouter, useRoute } from 'vue-router'
import { useStore } from '@/store'
import { isValidUsername } from '@/utils/validate'

const loginFormRef = ref(null)
const userNameRef = ref(null)
const passwordRef = ref(null)

const store = useStore()
const router = useRouter()
const route = useRoute()

const validateUsername = (rule: any, value: string, callback: any) => {
  callback(isValidUsername(value) ? undefined : new Error('please enter the correct user name'))
}
const validatePassword = (rule: any, value: string, callback: any) => {
  callback(value.length >= 6 ? undefined : new Error('the password can not be less than 6 words'))
}

const title = ref('系统登录')
const passwordType = ref('password')
const loading = ref(false)
const showCapsTooltip = ref(false)
const redirect = ref('')

const redirectQuery = reactive({})
const loginForm = reactive({
  username: 'admin',
  password: '123456'
})
const loginRules = {
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }]
}

const checkCapslock = (e: KeyboardEvent) => {
  const { key } = e
  showCapsTooltip.value = key !== null && key.length === 1 && key >= 'A' && key <= 'Z'
}

const showPwd = () => {
  if (passwordType.value === 'password') {
    passwordType.value = ''
  } else {
    passwordType.value = 'password'
  }
}
const handleLogin = () => {
  (loginFormRef.value as any).validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      try {
        await store.dispatch('user/loginAction', loginForm)
        router.push({
          path: '/'
        })
      } catch (error) {
        setTimeout(() => {
          loading.value = false
        }, 500)
      }
    } else {
      return false
    }
  })
}

onMounted(() => {
  console.log('state', store.state.user)
})

</script>
<style lang='scss' scoped>
.login-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  video{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }
  .login-form{
    // position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .title-container{
      .title{
        font-size: 26px;
        color: $lightGray;
        margin: 0 auto 40px;
        text-align: center;
        font-weight: bold;
      }
    }
  }
  :deep(.el-form-item){
    display: flex;
    height: 47px;
    border: 1px solid rgba(255, 255, 255, 0.1 );
    background: (0, 0, 0, .1);
    border-radius: 5px;
    color: #454545;
    .login-form-svg{
      margin-left: 20px;
      color: $darkGray;
    }
    .el-input{
      flex: 1;
      .el-input__wrapper{
        background: transparent;
        box-shadow: none;
        input{
          height: 100%;
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 12px 5px 12px 15px;
          color: $lightGray;
          caret-color: $loginCursorColor;
          appearance: none;
        }
      }
    }
  }
}
</style>
