// import Vue from "vue";
// import Vuex from "vuex";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { firestore } from "@/resources/firebase/firebaseConfig";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";

// Vue.use(Vuex);
// vuex동작원리 아래 사진 참고.
// https://velog.velcdn.com/images/mechauk418/post/b7745ab9-59c2-4fb1-80e5-016d914a05dd/image.png

export const store = createStore({
  state: {
    isLogin: false,
    usrInfo: {
      kakaoKey: "",
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

          // 로컬스토리지에서 키만 빼오기.
          const localStorageKeys = Object.keys(localStorage);
          // 빼온 키에서 kakao_로 시작하는 것만 찾기
          const findKakaoKey = localStorageKeys.find((key) =>
            key.startsWith("kakao_")
          );

          // kakao_로 시작하는 것이 있으면 그것의 6번째 인덱스부터 끝까지 잘라내기 => 고유의 회원 id키로 지정
          if (findKakaoKey) {
            const kakaoKey = findKakaoKey.slice(6);

            // TODO ::
            // 1.파이어 베이스에서 ID를 조회한다
            // -> 매번 조회하는 방법보다 추가할때 분기처리하는 방법이 더 효율적임.
            // 2. 조회한 id가 일치한 값이 있다 -> 기존 회원
            // 3. 조회한 id가 없다 -> 파이어베이스에 새로운 id를 add한다.
            // 4. add할 때, id, 닉네임(카카오에서받은)  데이터를 ADD한다.
            const db = firestore;

            // [실시간으로 바뀌는 db 조회] user collection 조회.
            // const usersCollection = collection(db, "users");
            // getDocs(usersCollection)
            //   .then((querySnapshot) => {
            //     querySnapshot.forEach((doc) => {
            //       console.log(doc.id, " => ", doc.data());
            //     });
            //   })
            //   .catch((error) => {
            //     console.error(error);
            //   });

            const usrInfo = {
              kakaoKey: kakaoKey,
              nickName: nickname,
              profileImgUrl: profile_image_url,
            };

            // [insert] users collection에 userInfo insert
            // setDoc: doc문서 id 직접지정.
            // addDoc: doc문서 id 자동생성.
            // users collection안에 doc이름을 고유한 kakaokey로 생성.
            setDoc(doc(db, "users", kakaoKey), usrInfo)
              .then(() => {
                commit("loginSuccess", {
                  nickName: nickname,
                  profileImgUrl: profile_image_url,
                  kakaoKey: kakaoKey,
                });
              })
              .catch((error) => {
                console.error(error);
              });
          }
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
    getUserInfo({ commit }) {
      const usrInfo = JSON.parse(window.sessionStorage.getItem("vuex"));
      if (usrInfo) commit("loginSuccess", usrInfo.usrInfo);
    },

    logout({ commit }) {
      window.Kakao.Auth.logout(() => {
        commit("logoutSuccess");
      });
    },
  },
});
