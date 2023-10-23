<template>
    <!-- app -->
    <div id="app">
      <!-- <layout-header v-if="$route.name !== 'login'"></layout-header> -->
      <!-- wrap -->
      <div id="wrap">
        <!-- container -->
        <div class="container">
          <!-- contents -->
          <div class="contents">
            <!-- <keep-alive>
              <router-view></router-view>
            </keep-alive> -->
          </div>
          <!--// contents -->
        </div>
        <!--// container -->
      </div>
      <!--// wrap -->
      <!-- <layout-footer></layout-footer> -->
    </div>
    <!--// app -->
  </template>
  
  <script>
  
  export default {
    // data: () => ({
    //   includedComponents: ['ShipmentList'],
    // }),
    // created() {
    //   // 로그인 상태 아니면 내보냄
    //   if (!this.isLogin) {
    //     this.routerNext({
    //       name: 'login',
    //     });
    //   }
    // },
    // computed: {
    //   ...mapGetters({
    //     isLogin: 'user/isLogin',
    //   }),
    // },
  };
  </script>
  