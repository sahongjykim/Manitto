<template>
  <div id="contents">
    <div v-show="!status">
      <div id="draw-manito">
        <div class="title mt30">
          DRAW! <span>{{ randomEmoji }}</span> <br />
          MANITTO!
        </div>
        <div class="inputName mt30">
          <input
            v-model="inputName"
            @input="removeSpaces"
            @keyup.enter="registManito"
            type="text"
            placeholder="참여자 이름을 입력해주세요!!"
            maxlength="10"
            :disabled="status"
          />
          <div class="button" @click="registManito" :disabled="status">
            등록
          </div>
        </div>
        <div class="count-people mt30">
          <span
            >현재 참여자 :
            {{ player.length > 0 ? player.length : "0" }} 명</span
          >
        </div>
        <div
          class="people-list mt15"
          v-for="(playerName, index) in player"
          :key="index"
        >
          {{ index + 1 }}. {{ playerName }}
          <div class="button" @click="removePlayer(index)" :disabled="status">
            X
          </div>
        </div>
        <div class="draw mt15">
          <div class="button" @click="drawManito" :disabled="status">
            마니또뽑기
          </div>
        </div>
      </div>
    </div>

    <div class="manito-result mt30" v-if="status">
      <div class="title mt30 mb30">마니또결과</div>
      <div v-for="(result, row) in manitoResult" :key="row">
        <span @click="copyManitoLink(result.player, row)" class="row mt15">
          <!-- {{ result.player }}의 마니또 : {{ result.manito }} (결과공유 click) -->
          {{ result.emoji }} {{ result.player }}의 마니또 : ??? (링크복사 click)
        </span>
        <button>공유하기</button>
      </div>
      <div>
        <div class="button mt30" @click="resetGame">마니또 초기화</div>
      </div>
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
