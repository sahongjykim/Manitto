import { firestore } from "@/resources/firebase/firebaseConfig";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { mapState } from "vuex";

export default {
  name: "ManitoSelect",
  data() {
    return {
      modal:false,
      clickedRows: {},
      inputName: "",
      player: [],
      manitoResult: [],
      status: false,
      emojis: [
        "😄",
        "😃",
        "😀",
        "😊",
        "😉",
        "😍",
        "😘",
        "😚",
        "😗",
        "😙",
        "😜",
        "😝",
        "😛",
        "😳",
        "😁",
        "😔",
        "😌",
        "😒",
        "😞",
        "😣",
        "😢",
        "😂",
        "😭",
        "😪",
        "😥",
        "😰",
        "😅",
        "😓",
        "😩",
        "😫",
        "😨",
        "😱",
        "😠",
        "😡",
        "😤",
        "😖",
        "😆",
        "😋",
        "😷",
        "😎",
        "😴",
        "😵",
        "😲",
        "😟",
        "😦",
        "😧",
        "😈",
        "👿",
        "😮",
        "😬",
        "😐",
        "😕",
        "😯",
        "😶",
        "😇",
        "😏",
        "😑",
        "👲",
        "👳",
        "👮",
        "👷",
        "💂",
        "👶",
        "👦",
        "👧",
        "👨",
        "👩",
        "👴",
        "👵",
        "👱",
        "👼",
        "👸",
        "😺",
        "😸",
        "😻",
        "😽",
        "😼",
        "🙀",
        "😿",
        "😹",
        "😾",
        "👹",
        "👺",
        "🙈",
        "🙉",
        "🙊",
        "💀",
        "👽",
        "💩",
        "🔥",
        "🐶",
        "🐺",
        "🐱",
        "🐭",
        "🐹",
        "🐰",
        "🐸",
        "🐯",
        "🐨",
        "🐻",
        "🐷",
        "🐽",
        "🐮",
        "🐗",
        "🐵",
        "🐒",
        "🐴",
        "🐑",
        "🐘",
        "🐼",
        "🐧",
        "🐦",
        "🐤",
        "🐥",
        "🐣",
        "🐔",
        "🐍",
        "🐢",
        "🐛",
        "🐝",
        "🐜",
        "🐞",
        "🐌",
        "🐙",
        "🐚",
        "🐠",
        "🐟",
        "🐬",
        "🐳",
        "🐋",
        "🐄",
        "🐏",
        "🐀",
        "🐃",
        "🐅",
        "🐇",
        "🐉",
        "🐎",
        "🐐",
        "🐓",
        "🐕",
        "🐖",
        "🐁",
        "🐂",
        "🐲",
        "🐡",
        "🐊",
        "🐫",
        "🐪",
        "🐆",
        "🐈",
        "🐩",
      ],
      randomEmoji: "",
    };
  },
  created() {
    this.changeEmoji();
    setInterval(this.changeEmoji, 1000);
  },
  mounted(){
    this.modal = true;
  },
  methods: {
    changeEmoji() {
      const randomIndex = Math.floor(Math.random() * this.emojis.length);
      this.randomEmoji = this.emojis[randomIndex];
    },
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
        // this.saveManitoResult();
      }
    },
    // 마니또 생성 로직.
    drawManitoGoGo(names) {
      let player = names;
      let manitos = [...player];
      let result = [];

      for (let i = 0; i < player.length; i++) {
        let availableManitos = manitos.filter((manito) => manito !== player[i]);

        // 현재 참여자가 마지막 참여자이고, 가능한 마니또가 자신뿐이라면 처음부터 다시 뽑기
        if (
          i === player.length - 1 &&
          availableManitos.length === 1 &&
          availableManitos[0] === player[i]
        ) {
          return this.drawManitoGoGo(names);
        }

        let randomIndex = Math.floor(Math.random() * availableManitos.length);

        // 가능한 마니또 후보가 없거나, 마지막 참여자의 경우에만 자신을 마니또로 뽑게 될 경우, 처음부터 다시 뽑기
        if (
          !availableManitos[randomIndex] ||
          (i === player.length - 1 &&
            availableManitos[randomIndex] === player[i])
        ) {
          return this.drawManitoGoGo(names);
        }

        let selectedManito = availableManitos[randomIndex];

        // 랜덤 이모지 선택
        const randomEmojiIndex = Math.floor(Math.random() * this.emojis.length);
        const randomEmoji = this.emojis[randomEmojiIndex];

        result.push({
          player: player[i],
          manito: selectedManito,
          emoji: randomEmoji,
          row: i + 1,
        });

        // 이미 뽑힌 마니또는 목록에서 제거
        manitos = manitos.filter((manito) => manito !== selectedManito);
      }

      return result;
    },
    resetGame() {
      this.inputName = "";
      this.player = [];
      this.manitoResult = [];
      this.status = false;
    },
    removeSpaces() {
      // 공백 제거
      this.inputName = this.inputName.replace(/\s/g, "");
      // 특수 문자 제거
      this.inputName = this.inputName.replace(/[!@#$%^&*()_\-.,?~]/g, "");
    },
    async copyManitoLink(player, manito, row, emoji) {
      // const idx =
      //   this.manitoResult.findIndex((item) => item.manito === manito) + 1;
      const user = encodeURIComponent(player);
      const yourManito = encodeURIComponent(manito);

      const url = `https://your-manito.vercel.app/manitoResult/${user}/${yourManito}/${emoji}`;
      // const url = `http://localhost:8080/manitoResult/${user}/${yourManito}`;

      try {
        this.clickedRows[row] = true;
        await navigator.clipboard.writeText(url);
        alert("링크가 클립보드에 복사되었습니다!");
      } catch (err) {
        console.error("클립보드에 복사하는데 실패했습니다", err);
        alert("클립보드에 복사하는데 실패했습니다");
      }
    },
    // 마니또 결과를 세션스토리지에 저장.
    saveManitoResult() {
      // console.log(this.manitoResult);
      // localStorage.setItem("manitoResult", JSON.stringify(this.manitoResult));
      // manitoResult: [{ player: "", manito: "", emoji: "", row: 0 }, { player: "", manito: "", emoji: "", row: 0 }]
      // const docId = this.usrInfo.kakaoKey;
      // const db = firestore;
      // const userDocRef = doc(db, "users", docId);
      // getDoc(userDocRef)
      //   .then((doc) => {
      //     if (doc.exists()) {
      //       // results 필드 업데이트
      //       return updateDoc(userDocRef, { results: this.manitoResult });
      //     } else {
      //       // docId가 동일한 doc이 없을 경우
      //       // 새로운 사용자 문서를 만들고 results 필드 추가
      //       return setDoc(userDocRef, { results: this.manitoResult });
      //     }
      //   })
      //   .then(() => {
      //     console.log("마니또결과 firestore 저장 또는 업데이트 완료!");
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },
    // 마니또 결과 링크 공유
    shareManitoLink(player, manito, row, emoji) {
      // const idx =
      //   this.manitoResult.findIndex((item) => item.manito === manito) + 1;
      const user = encodeURIComponent(player);
      const yourManito = encodeURIComponent(manito);

      const url = `https://your-manito.vercel.app/manitoResult/${user}/${yourManito}/${emoji}`;
      // const url = `http://localhost:8080/manitoResult/${user}/${yourManito}`;
      // const url = `https://your-manito.vercel.app/manitoResult/${player}/${yourManito}`;
      // `navigator.share` API를 사용하여 공유합니다.
      if (navigator.share) {
        navigator
          .share({
            title: `${player}의 마니또 결과`,
            // text: `${player}의 마니또는 ${manito}입니다. 결과를 확인하세요!`,
            url: url,
          })
          .then(() => console.log("공유 성공"))
          .catch((error) => console.log("공유 실패", error));
      } else {
        // 만약 `navigator.share`를 지원하지 않는 브라우저인 경우
        console.log("이 브라우저에서는 공유 기능을 지원하지 않습니다.");
        // 대체 로직을 실행하거나 사용자에게 알림을 줄 수 있습니다.
      }
    },
    closeModal(){
      this.modal = false;
    },
  },
  computed: {
    ...mapState(["usrInfo"]),
  },
};
