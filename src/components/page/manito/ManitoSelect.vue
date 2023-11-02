<template>
  <div id="contents">
    <div class="base">
      <div v-show="!status">
        <div id="draw-manito">
          <div class="title mt30">
            DRAW! <br />
            MANITTO!
            <div class="mt30">
              {{ randomEmoji }}
            </div>
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
          <div class="mt30 btl-black"></div>
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
    </div>

    <div class="manito-result mt30" v-if="status">
      <div class="base">
        <div class="title mt30 mb30">!결과!</div>
        <div
          :class="{ clicked: clickedRows[row] }"
          class="hov mt15"
          v-for="(result, row) in manitoResult"
          :key="row"
        >
          <div
            @click="copyManitoLink(result.player, result.manito, row)"
            class="row mt30"
          >
            <!-- {{ result.player }}의 마니또 : {{ result.manito }} (결과공유 click) -->
            {{ row + 1 }}. {{ result.player }}의 마니또 : {{ result.emoji }}
          </div>
          <div class="link">
            ☞ 결과 링크 복사! | 카카오톡 공유&nbsp;
            <font-awesome-icon :icon="['fas', 'share-from-square']" />
          </div>
        </div>
        <div>
          <div class="button mt30" @click="resetGame">마니또 초기화</div>
        </div>
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
</style>
