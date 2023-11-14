// /* eslint-disable */
// import Vue from "vue";
// import Router from "vue-router";
// import view_router_path from "./view_router_path";
// // import "./layout_component";

// Vue.use(Router);

// /**
//  * 2019-05-29 - jasonLee
//  * Children으로 하위메뉴에 대한 API 구성 및 자동화 처리 완료
//  *
//  * 2019-05-07 - jasonLee
//  * TODO: 대메뉴별 파일의 위치는 고정으로 가야하는지 여부 판단 후 추가 작업.
//  * router_path에 정의해놓은 경로별로 function에서 name, view에 맞게
//  * component를 import할수있도록 구현함.
//  * (무료 테마의 기능을 찾고함.)
//  * @param {경로} path
//  * @param {파일명} view
//  * @param {경로 Alias} name
//  * @param {하위경로} children
//  * @param {메뉴명} menuName
//  * @param {탭모드} tabMode
//  * @param {파라미터} params
//  * @param {권한} auth
//  */
// function paths(path) {
//   var rtn = {};

//   /**
//    * 2019-05-29 - jasonLee
//    * 하위 경로에 따라 children값을 처리하도록 기능 추가
//    */
//   rtn = {
//     name: path.name,
//     path: path.path,
//     alias: path.alias,
//     component: (resolve) =>
//       import(`@/components/${path.view}.vue`).then(resolve),
//     children: childrenAdvice(path.children),
//     props: true,
//     meta: {
//       name: path.name,
//       menuName: path.menuName,
//       compPath: path.view, // 파일 경로
//       path: path.view, // 화면 주소
//       tabMode: path.tabMode || false,
//       params: path.param,
//       pgmId: path.pgmId,
//     },
//   };

//   return rtn;
// }

// /**
//  * 2019-05-29 - jasonLee
//  * 하위 경로가 존재하면 해당 경로에 맞는 router_path를 return
//  * 아닐경우 return null
//  * @param {하위경로} children
//  */
// function childrenAdvice(children) {
//   if (children === undefined) {
//     return null;
//   } else {
//     /**
//      * 재귀호출 방식으로 변경
//      */
//     return children.map((child) => paths(child));
//   }
// }

// /**
//  * 2019-05-07 - jasonLee
//  * View 라우터 구현 부분에서 routes에 관련된 부분만 별도의 function
//  * 으로 구현됨.
//  */
// const router = new Router({
//   mode: "history",
//   // base: process.env.BASE_URL,
//   routes: view_router_path
//     .map((path) => paths(path))
//     .concat([{ path: "*", redirect: "/404" }]),
//   scrollBehavior(to, from, savedPosition) {
//     // always scroll to top
//     return { top: 0 };
//   },
// });

// /**
//  * 전체 네비게이션 시나리오
//  *  1. 네비게이션이 트리거됨.
//  *  2. 비활성화될 컴포넌트에서 가드를 호출.
//  *  3. 전역 beforeEach 가드 호출.
//  *  4. 재사용되는 컴포넌트에서 beforeRouteUpdate 가드 호출. (2.2 이상)
//  *  5. 라우트 설정에서 beforeEnter 호출.
//  *  6. 비동기 라우트 컴포넌트 해결.
//  *  7. 활성화된 컴포넌트에서 beforeRouteEnter 호출.
//  *  8. 전역 beforeResolve 가드 호출. (2.5이상)
//  *  9. 네비게이션 완료.
//  * 10. 전역 afterEach 훅 호출.
//  * 11. DOM 갱신 트리거 됨.
//  * 12. 인스턴스화 된 인스턴스들의 beforeRouteEnter가드에서 next에 전달 된 콜백을 호출합니다.
//  * 참조 : https://v3.router.vuejs.org/kr/guide/advanced/navigation-guards.html
//  *        https://joshua1988.github.io/web-development/vuejs/vue-router-navigation-guards/
//  */
// /**
//  * beforeEach : 네비게이션 가드 - 전역 가드
//  * to: 이동할 라우트
//  * from: 현재 라우트
//  * next: to에서 지정한 url로 이동하기 위해 꼭 호출해야 하는 함수
//  * 유저가 접속시 접속되는 zeroKey를 확인하는 로직
//  */
// // router.beforeEach(function (to, from, next) {
// //   // tabMode가 true일 경우에만 tab에 추가
// //   if (to.meta.tabMode) {
// //     to.meta.path = to.path;
// //     store.dispatch('component/increId');
// //     to.meta['id'] = store.getters['component/componentId'];
// //     store.dispatch('component/add', to.meta);
// //   }
// //   // next를 호출하지 않으면 다음으로 진행되지 않는다.
// //   // next(): 파이프라인의 다음 훅으로 이동하십시오. 훅이 없는 경우 네비게이션은 승인됩니다.
// //   // next(false): 현재 네비게이션을 중단합니다. 브라우저 URL이 변경되면(사용자 또는 뒤로 버튼을 통해 수동으로 변경됨) from경로의 URL로 재설정됩니다.
// //   // next('/') 또는 next({ path: '/' }): 다른 위치로 리디렉션합니다. 현재 네비게이션이 중단되고 새 네비게이션이 시작됩니다.
// //   // next(error): (2.4.0 이후 추가) next에 전달된 인자가 Error 의 인스턴스이면 탐색이 중단되고 router.onError()를 이용해 등록 된 콜백에 에러가 전달됩니다.
// //   next();
// // });

// /**
//  * 2019-05-07 - jasonLee
//  * main.js에서 Vue에 import할수 있도록
//  * router를 export한다
//  * (export 하면 import시에 해당 기능을 참조할수있다.)
//  */
// export default router;

import { createRouter, createWebHistory } from "vue-router";
// import UserLoginView from "../../components/page/login/UserLoginView.vue";
// import MainView from "../../components/page/main/MainView.vue";
import ManitoSelect from "../../components/page/manito/ManitoSelect.vue";
import ManitoResult from "../../components/page/manito/ManitoResultPage.vue";
// import { store } from "../store";

const routes = [
  {
    path: "/",
    redirect: "/manitoSelect",
  },
  // {
  //   path: "/main",
  //   component: MainView,
  // },
  // {
  //   path: "/userLogin", // 메인페이지로 간주.
  //   name: "UserLogin",
  //   component: UserLoginView,
  // },
  {
    path: "/manitoSelect", // 메인페이지로 간주.
    name: "ManitoSelect",
    component: ManitoSelect,
    // meta: { requiresAuth: true }, // 해당 라우터는 auth인증이 필요함.
  },
  {
    path: "/manitoResult/:user/:result",
    name: "ManitoResult",
    component: ManitoResult,
    props: true,
    // meta: { requiresAuth: false }, // 해당 라우터가 auth를 필요로 하지 않음.
  },
];

let router = createRouter({
  history: createWebHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (
//     // to.matched.some 현재 라우트가 로그인을 필요로 하는지 확인
//     to.matched.some((record) => record.meta.requiresAuth) &&
//     !store.getters.isLogin
//   ) {
//     next({ path: "/userLogin" });
//   } else {
//     next();
//   }
// });

export default router;
