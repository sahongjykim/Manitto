<template>
  <div id="contents">
    <div class="base">
      <!-- MANITO DRAW -->
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
          <!-- <div class="mt30 btl-black"></div> -->
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

    <!-- MANITO DRAW RESULT -->
    <div class="manito-result mt30" v-if="status">
      <div class="base">
        <div class="title mt30 mb30">!결과!</div>
        <div
          :class="{ clicked: clickedRows[row] }"
          class="hov mt15"
          v-for="(result, row) in manitoResult"
          :key="row"
        >
          <div class="row mt30">
            <!-- {{ result.player }}의 마니또 : {{ result.manito }} (결과공유 click) -->
            {{ row + 1 }}. {{ result.player }}의 마니또는 "{{ result.emoji }}"님
            입니다.
          </div>
          <div class="link">
            <div class="brwser">
              <span
                @click="
                  copyManitoLink(
                    result.player,
                    result.manito,
                    row,
                    result.emoji
                  )
                "
              >
                결과 url로 공유
              </span>
            </div>
            <div class="kakao">
              <span
                @click="
                  shareManitoLink(
                    result.player,
                    result.manito,
                    row,
                    result.emoji
                  )
                "
                >카카오톡 공유
                <font-awesome-icon :icon="['fas', 'link']" />
              </span>
            </div>
            <!-- <font-awesome-icon :icon="['fas', 'share-from-square']" /> -->
          </div>
        </div>
        <div>
          <div class="button mt30" @click="resetGame">마니또 초기화</div>
        </div>
      </div>
    </div>
    <div v-if="this.modal" class="modal-background">
      <div class="modal-content">
        <strong>모바일에서 권장</strong>
        <div>
          마니또 뽑기는 모바일에서 이용하는것을 권장드립니다. 데스크탑에서
          이용시, url입력창에서 마니또 정보가 공유 될 수 있습니다.
        </div>

        <button @click="closeModal">넵, 확인했습니다.</button>
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

.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 투명도가 있는 검은색 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal-content {
  width: 270px;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  /* 필요한 스타일 추가 */
}

.brwser {
  width: 100%;
  padding: 6px;
  border: solid 4px black;
  background-color: #3fff8d;
  border-radius: 5px;
  margin-right: 5px;
  display: flex;
  justify-content: center;
}
.kakao {
  width: 100%;
  padding: 6px;
  border: solid 4px black;
  background-color: #ffe53f;
  border-radius: 5px;
  display: flex;
  justify-content: center;
}
</style>
