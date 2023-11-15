<template>
  <div id="contents">
    <div class="base">
      <!-- MANITO DRAW -->
      <div v-show="!status">
        <div id="draw-manito">
          <div @click="secretPop" class="title mt30">
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
    <!-- MODAL -->
    <div v-if="this.modal" class="modal-background">
      <div class="modal-content">
        <strong style="font-size: 40px">!! 필독 !!</strong><br />
        <strong style="font-size: 25px">모바일 이용권장</strong>
        <div style="font-size: 20px; margin-top: 5px">
          마니또 뽑기는 <br />
          모바일에서 이용하는것을 권장드립니다.<br />
          데스크탑에서 이용시,
          <br />URL입력창에서 <br />마니또 정보가 노출될 수 있습니다.
        </div>

        <button class="modalBtn" @click="closeModal">넵, 확인했습니다.</button>
      </div>
    </div>
    <div v-show="this.secret" class="modal-background">
      <div class="modal-content">
        제작 계기 :<br />
        1. 박혜영언니의 10연말 파티 마니또를 위한 마니또 뽑기 요청. <br />
        2. 마땅한 결과도출 플랫폼이 부족해서 코딩으로 마니또 뽑아줌 <br />
        3. 박혜영언니가 이런거없으니까 크리스마스전에 만들면 되겠다함. <br />
        4. 회사에서 옆자리 동기(홍성아님)한테 만들래? 요청함 <br />
        5. 동기(홍성아님)(이)가 수락함 6. 진행 <br />
        <br />
        제작 참여자: <br />
        아이디어 제공자 - 박혜영 <br />
        개발 설계 - 홍성아<br />
        개발 기획 - 김주예, 홍성아 <br />
        개발 구현 - 김주예, 홍성아 <br />
        배포 - 홍성아<br />
        디자인/퍼블리싱 - 김주예 <br />
        <br />
        저희의 첫 토이 프로젝트를 봐 주셔서 감사합니다.<br />

        <button class="modalBtn" @click="secretPop">넵, 확인했습니다.</button>
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
</style>
