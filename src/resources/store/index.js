// import Vue from "vue";
// import Vuex from "vuex";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";

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
  // vuex-persistedstate를 사용함으로써 sessionStorage 내부에 state 저장. 동기화됨.
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  // [getters]
  // 상태가 변경될 때마다 자동으로 다시 계산
  // 상태를 기반으로 계산된 값 반환.
  // computed와 기능 유사.
  // 상태가 변경될 때마다 자동으로 다시 계산.
  getters: {
    isLogin: (state) => {
      // 로그인 상태이면서 만료시간이 유지되어있어야 로그인 되있다고 간주함
      return state.isLogin;
    },
  },
  // [mutations]
  // mutations는 상태(state)를 동기적으로 변경하는 메소드들을 포함
  mutations: {
    loginSuccess(state, payload) {
      state.isLogin = true;
      state.usrInfo = payload;
    },
    logoutSuccess(state) {
      state.isLogin = false;
      state.usrInfo = { nickName: "", profileImgUrl: "" };
      // sessionStorage를 수정하지 않아도 되는 이유는 vuex-persistedstate를 사용했기 때문!
      // Vuex store의 state가 sessionStorage와 자동으로 동기화되기 때문에, 따로 초기화 하지 않아도 됨.
    },
  },
  // [actions]
  // 비동기 작업을 처리하는 메소드들을 포함
  // 직접 상태 변경 x, 로직 수행 및 결과에 따른 mutations를 호출함.
  // API 호출과 같은 비동기 작업이나, 여러 개의 mutation을 연속적으로 커밋(commit)할 때 사용
  actions: {
    login({ dispatch }) {
      window.Kakao.Auth.login({
        scope: "profile_nickname, profile_image",
        success: () => {
          dispatch("setUserInfo"); // setUserInfo action 호출
        },
      });
    },
    setUserInfo({ commit }) {
      window.Kakao.API.request({
        url: "/v2/user/me",
        success: (res) => {
          const { nickname, profile_image_url } = res.kakao_account.profile;
          commit("loginSuccess", {
            nickName: nickname,
            profileImgUrl: profile_image_url,
          });
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
    getUserInfo({ commit }) {
      const usrInfo = JSON.parse(window.sessionStorage.getItem("vuex"));
      // console.log("usrInfo", usrInfo);
      if (usrInfo) commit("loginSuccess", usrInfo.usrInfo);
      // console.log("getUserInfo실행");
    },
    logout({ commit }) {
      window.Kakao.Auth.logout(() => {
        commit("logoutSuccess");
      });
    },
  },
});
