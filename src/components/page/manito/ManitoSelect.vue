<template>
  <input
    v-model="inputName"
    type="text"
    placeholder="마니또 참여자 이름을 입력해주세요"
  />
  <button @click="registManito">등록</button>
  <div>
    ------------
    <button @click="drawManito">마니또뽑기</button>
    ------------
  </div>
  <h1>참여자 ({{ player.length > 0 ? player.length : "0" }})</h1>
  <div v-for="(playerName, index) in player" :key="index">
    -> {{ playerName }}
    <button @click="removePlayer(index)">X</button>
  </div>

  <div v-if="status">
    <h1>마니또 결과!!</h1>
    <div v-for="(manito, player) in manitoResult" :key="player">
      <span>{{ player }}의 마니또 : {{ manito }} </span>
    </div>
    <div>
      ------------
      <button @click="resetGame">마니또 초기화</button>
      ------------
    </div>
  </div>
</template>

<script>
export default {
  name: "ManitoSelect",
  data() {
    return {
      inputName: "",
      player: [],
      manitoResult: {},
      status: false,
    };
  },
  methods: {
    registManito() {
      if (!this.player.includes(this.inputName)) {
        this.player.push(this.inputName);
        this.inputName = "";
        console.log(this.player);
      }
    },
    removePlayer(index) {
      this.player.splice(index, 1);
    },
    drawManito() {
      if (this.player.length < 2) {
        alert("마니또를 뽑기 위해서는 참여자가 최소 2명 이상이어야 합니다.");
        return;
      } else {
        this.manitoResult = this.drawManitoGoGo(this.player);
        this.status = true;
      }
    },
    drawManitoGoGo(names) {
      let player = [...names];
      let manito = [...names];
      let result = {};

      player.forEach((player) => {
        let availableManitos = manito.filter((name) => name !== player);
        let randomIndex = Math.floor(Math.random() * availableManitos.length);
        let selectedManito = availableManitos[randomIndex];
        result[player] = selectedManito;
        manito = manito.filter((name) => name !== selectedManito);
      });
      return result;
    },
    resetGame() {
      this.inputName = "";
      this.player = {};
      this.manitoResult = []; // participants 배열 초기화
      this.status = false;
    },
  },
};
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
button {
  margin-bottom: 20px;
}
</style>
