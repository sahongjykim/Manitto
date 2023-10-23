<template>
  <input
    v-model="inputName"
    type="text"
    placeholder="마니또 참여자 이름을 입력해주세요"
  />
  <button @click="registManito">등록</button>
  <button>마니또뽑기</button>
  <h1>참여자 (0/1)</h1>
  <div v-for="(playerName, index) in player" :key="index">
    -> {{ playerName }}
    <button @click="removePlayer(index)">X</button>
  </div>
</template>

<script>
export default {
  name: "MainView",
  data() {
    return {
      inputName: "",
      player: [],
      manitoResult: [],
    };
  },
  methods: {
    registManito() {
      if (!this.player.includes(this.inputName)) {
        this.player.push(this.inputName);
        console.log(this.player);
      }
    },
    removePlayer(index) {
      this.player.splice(index, 1);
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
