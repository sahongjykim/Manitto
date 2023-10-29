<template>
  <div>
    <h1>{{ playerName }}의 마니또는 {{ manitoName }}입니다.</h1>
  </div>
</template>

<script>
export default {
  props: ["player"],
  data() {
    return {
      playerName: "",
      manitoName: "",
    };
  },
  created() {
    this.loadManitoResult();
  },
  methods: {
    loadManitoResult() {
      const result = localStorage.getItem("manitoResult");
      if (result) {
        const manitoResult = JSON.parse(result);
        const playerResult = manitoResult.find(
          (item) => item.player === this.player
        );
        if (playerResult) {
          this.playerName = playerResult.player;
          this.manitoName = playerResult.manito;
        } else {
          alert("결과를 찾을 수 없습니다.");
        }
      } else {
        alert("마니또 데이터가 없습니다.");
      }
    },
  },
};
</script>
