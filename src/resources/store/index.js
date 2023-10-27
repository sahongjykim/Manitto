// import Vue from "vue";
// import Vuex from "vuex";
import { createStore } from "vuex";

// Vue.use(Vuex);
// vuex동작원리 아래 사진 참고.
// https://velog.velcdn.com/images/mechauk418/post/b7745ab9-59c2-4fb1-80e5-016d914a05dd/image.png

export const store = createStore({
  state: {
    isLogin: false,
    usrInfo: {
      nickName: "",
      profileImgUrl: "",
    },
  },
  // 상태가 변경될 때마다 자동으로 다시 계산
  // 상태를 기반으로 계산된 값 반환.
  // computed와 기능 유사.
  // 상태가 변경될 때마다 자동으로 다시 계산.
  getters: {},
  // mutations는 상태(state)를 동기적으로 변경하는 메소드들을 포함
  mutations: {
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.usrInfo = payload;
    },
    logoutSuccess(state) {
      state.isLogin = false;
      state.usrInfo = {};
    },
  },
  // 비동기 작업을 처리하는 메소드들을 포함
  // 직접 상태 변경 x, 로직 수행 및 결과에 따른 mutations를 호출함.
  // API 호출과 같은 비동기 작업이나, 여러 개의 mutation을 연속적으로 커밋(commit)할 때 사용
  actions: {
    login() {
      window.Kakao.Auth.login({
        scope: "profile_nickname, profile_image",
        success: this.dispatch("setUserInfo"), // setUserInfo action 호출
      });
      this.dispatch("getUserInfo"); // getUserInfo action 호출
    },
    setUserInfo() {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const kakao_account = res.kakao_account;
          // const nickname = kakao_account.profile.nickname;
          // const profileImgUrl = kakao_account.profile.profile_image_url;
          // localStorage.setItem("nickName", nickname);
          // localStorage.setItem("profileImgUrl", profileImgUrl);

          const usrInfo = {
            nickName: kakao_account.profile.nickname,
            profileImgUrl: kakao_account.profile.profile_image_url,
          };

          localStorage.setItem("usrInfo", usrInfo);
          localStorage.setItem("isLogin", true);
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
    getUserInfo() {
      const usrInfo = localStorage.getItem("usrInfo");
      this.commit("loginSuccess", usrInfo);
    },
    logout() {
      window.Kakao.Auth.logout(() => {
        this.commit("logoutSuccess");
      });
    },
  },
});
