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

export default {
    name: "KakaoLogin",
    data: () => ({
    }),
    methods: {
        // store에서 mapActions으로 불러야함.
        ...mapActions(['login', 'logout']),
        fnKakaoLogin() {
            this.login();
        },
        fnKakaoLogout() {
            this.logout();
        },  
    },
    computed: {
    ...mapState(['isLogin', 'usrInfo']) 
    }
}
</script>
