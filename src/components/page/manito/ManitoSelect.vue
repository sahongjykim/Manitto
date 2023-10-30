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
    <div class="row" v-for="(result, row) in manitoResult" :key="row">
      <span @click="copyManitoLink(result.player, row)">
        <!-- {{ result.player }}의 마니또 : {{ result.manito }} (결과공유 click) -->
        {{ result.player }}의 마니또 : ??? (결과공유 click)
      </span>
    </div>
    <div>
      ------------
      <button @click="resetGame">마니또 초기화</button>
      ------------
    </div>
  </div>
</template>

<script>
import { ManitoSelectJs } from "@/resources/js";
export default ManitoSelectJs;
</script>

<style scoped>
input {
  margin-bottom: 10px;
}
button {
  margin-bottom: 20px;
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
