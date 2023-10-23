<template>
  <input
    v-model="inputName"
    @input="removeSpaces"
    type="text"
    placeholder="마니또 참여자 이름을 입력해주세요"
    maxlength="10"
    :disabled="status"
  />
  <button @click="registManito" :disabled="status">등록</button>
  <div>
    ------------
    <button @click="drawManito" :disabled="status">마니또뽑기</button>
    ------------
  </div>
  <h1>참여자 ({{ player.length > 0 ? player.length : "0" }})</h1>
  <div v-for="(playerName, index) in player" :key="index">
    -> {{ playerName }}
    <button @click="removePlayer(index)" :disabled="status">X</button>
  </div>

  <div v-if="status">
    <h1>마니또 결과!!</h1>
    <div class="row" v-for="(manito, player) in manitoResult" :key="player">
      <span @click="copyManitoLink(player, manito)"
        >{{ player }}의 마니또 : {{ manito }} (결과공유 click)
      </span>
      <!-- 마니또 결과를 링크로 만들어서 복사 http://localhost:8080/manitoSelect/player/manito -->
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
      if (this.inputName.trim() === "") {
        alert("이름을 입력해주세요");
        return;
      }
      if (this.player.includes(this.inputName)) {
        alert("중복된 이름이 있습니다");
        return;
      }
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
      this.player = [];
      this.manitoResult = {};
      this.status = false;
    },
    removeSpaces() {
      this.inputName = this.inputName.replace(/\s/g, "");
    },
    async copyManitoLink(player, manito) {
      const url = `http://localhost:8080/manitoSelect/${player}/${manito}`;
      try {
        await navigator.clipboard.writeText(url);
        alert("링크가 클립보드에 복사되었습니다!");
      } catch (err) {
        console.error("클립보드에 복사하는데 실패했습니다", err);
        alert("클립보드에 복사하는데 실패했습니다");
      }
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
.row {
}
.row {
  cursor: pointer;
  transition: background-color 0.3s;
}

.row:hover {
  background-color: #eee8c8; /* 원하는 색상으로 변경 */
  color: #1e89a9;
}
</style>
