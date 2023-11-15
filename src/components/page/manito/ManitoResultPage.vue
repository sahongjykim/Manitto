<template>
  <div id="contents">
    <div class="base">
      <div class="title mt30">
        {{ playerName }}의 <br />
        의 마니또는
        <div class="mt30">
          {{ randomEmoji }}
        </div>
      </div>
      <h1>
        {{ emoji }} {{ playerName }}의 마니또는 {{ manitoName }}입니다.
        {{ emoji }}
      </h1>
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
