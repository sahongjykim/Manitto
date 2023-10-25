<template>
  <input
    v-model="inputName"
    @input="removeSpaces"
    @keyup.enter.prevent="registPlayer"
    type="text"
    placeholder="마니또 참여자 이름을 입력해주세요"
    maxlength="10"
    :disabled="status"
  />
  <button @click="registPlayer" :disabled="status">등록</button>
  <div>
    ------------
    <button @click="drawManito" :disabled="status">마니또뽑기</button>
    ------------
  </div>
  <h1>참여자 ({{ players.length > 0 ? players.length : "0" }})</h1>
  <div v-for="(p, index) in players" :key="index">
    -> {{ p.player }}
    <button @click="removePlayer(index)" :disabled="status">X</button>
  </div>

  <div v-if="status">
    <h1>마니또 결과!!</h1>
    <div class="row" v-for="(result, idx) in manitoResult" :key="idx">
      <span @click="copyManitoLink(result.player, result.manito)"
        >{{ result.player }}의 마니또 : ??? (결과공유 click)
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
