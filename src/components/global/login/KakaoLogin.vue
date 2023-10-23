<template>
    <div>
        <div v-if="!isLogin">
            <button @click="fnKakaoLogin">
               카카오로 로그인
            </button> 
        </div>
        <div v-if="isLogin">
            <img :src="profileImgUrl" alt="profileImg" width="100" height="100"/>
            <p>{{ nickname }}님 안녕하세요.</p>
            <button @click="fnKakaoLogout">
               로그아웃
            </button> 
        </div>
    </div>
</template>

<script>
export default {
    name: "KakaoLogin",
    data: () => ({
        isLogin: false,
        nickname: '',
        profileImgUrl: ''
        
    }),
    methods: {
        fnKakaoLogin() {
            // window.Kakao.init("32c148d16c25b3ee3fa4bf5641ae39a9");
            // console.log("카카오APIinit", window.Kakao.isInitialized());
            window.Kakao.Auth.login({
            scope: "profile_nickname, profile_image",
            success: this.getKakaoAccount,
        });
        },
        getKakaoAccount() {
            window.Kakao.API.request({
                url: "/v2/user/me",
                success: (res) => {
                const kakao_account = res.kakao_account;
                this.nickname = kakao_account.profile.nickname;
                this.profileImgUrl = kakao_account.profile.profile_image_url;
                // const email = kakao_account.email;
                // console.log("email", email);

                //로그인처리구현
                alert("로그인 성공!");
                this.isLogin = true;
                },
                fail: (error) => {
                console.log(error);
                },
            });
        },
        fnKakaoLogout() {
            window.Kakao.Auth.logout((res) => {
            console.log(res);
            this.isLogin = false;
        });
        },  
    }
}
</script>
