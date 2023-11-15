<template>
  <div id="contents">
    <div class="base">
      <div class="subTitle mt30">
        "{{ playerName }}"의 <br />
        마니또<br />
        확인<br />
        click!<br />
        ↓↓↓↓↓
        <div v-show="!isShow" @click="resultSt" class="mt30">
          {{ emoji }}
        </div>
        <div v-show="isShow" class="mt30">
          당신의<br />
          마니또는<br />
          "{{ manitoName }}"님<br />
          입니다!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // props: ["player"],
  props: ["user", "result", "emoji"],
  data() {
    return {
      playerName: "",
      manitoName: "",
      playerEmoji: "", // emoji 데이터를 저장할 속성 추가
      isShow: false,
    };
  },
  mounted() {
    this.playerName = this.user;
    this.manitoName = this.result;
    this.playerEmoji = this.emoji;
  },
  created() {
    // this.loadManitoResult();
  },
  methods: {
    resultSt() {
      this.isShow = true;
    },
    loadManitoResult() {
      // const result = localStorage.getItem("manitoResult");
      // if (result) {
      //   const manitoResult = JSON.parse(result);
      //   const playerResult = manitoResult.find(
      //     (item) => item.player === this.player
      //   );
      //   if (playerResult) {
      //     this.playerName = playerResult.player;
      //     this.manitoName = playerResult.manito;
      //   } else {
      //     alert("결과를 찾을 수 없습니다.");
      //   }
      // } else {
      //   alert("마니또 데이터가 없습니다.");
      // }
      // const urlParams = new URLSearchParams(window.location.search);
      // this.playerName = urlParams.get('user');
      // this.manitoName = urlParams.get('result');
    },
  },
};
</script>
