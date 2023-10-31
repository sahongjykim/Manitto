<template>
    <div>
        <div v-if="!isLogin">
            <button @click="fnKakaoLogin">
               카카오로 로그인
            </button> 
        </div>
        <div v-if="isLogin">
            <img :src="usrInfo.profileImgUrl" alt="profileImg" width="100" height="100"/>
            <p>{{ usrInfo.nickName }}님 안녕하세요.</p>
            <router-link to="/manitoSelect">마니또 뽑기</router-link>
            <button @click="fnKakaoLogout">
               로그아웃
            </button> 
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { store } from '@/resources/store';

export default {
    name: "KakaoLogin",
    data: () => ({
    }),
    methods: {
        // store에서 mapActions으로 불러야함.
        ...mapActions(['login', 'logout']),
        fnKakaoLogin() {
            this.login();
            store.dispatch("getUserInfo"); // Vuex 상태를 sessionStorage에서 로드
            console.log(store.state.isLogin); // false
        },
        fnKakaoLogout() {
            this.logout();
        },  
    },
    // TODO::새로고침 시, isLogin 상태가 true로 바뀜 
    computed: {
    ...mapState(['isLogin', 'usrInfo']) 
    }
}
</script>
