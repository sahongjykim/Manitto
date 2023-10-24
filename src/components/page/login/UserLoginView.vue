<template>
  <div>
    <kakao-login></kakao-login>
  </div>
</template>

<script>
import KakaoLogin from "../../global/login/KakaoLogin.vue";
export default {
  name: "UserLoginView",
  components: {
    KakaoLogin,
  },
};
</script>
