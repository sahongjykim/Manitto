export default {
  name: "ManitoSelect",
  data() {
    return {
      inputName: "",
      players: [],
      manitoResult: [],
      status: false,
    };
  },
  methods: {
    // 플레이어 등록
    registPlayer() {
      if (this.inputName.trim() === "") {
        alert("이름을 입력해주세ddd요");
      } else if (this.players.includes(this.inputName)) {
        alert("중복된 이름이 있습니다.");
      } else if (!this.players.includes(this.inputName)) {
        this.players.push({
          player: this.inputName,
        });
        console.log("players:", this.players);
        this.inputName = "";
      }
    },
    // 플레이어 삭제
    removePlayer(index) {
      this.players.splice(index, 1);
    },
    // 마니또 뽑기 이벤트 핸들러
    drawManito() {
      if (this.players.length < 2) {
        alert("마니또를 뽑기 위해서는 참여자가 최소 2명 이상이어야 합니다.");
        return;
      } else {
        this.manitoResult = this.drawManitoGoGo(this.players);
        console.log("개발자만 아는 결과dddd:", this.manitoResult);
        this.status = true;
      }
    },
    // 마니또 생성 로직.
    // TODO::result형태 => [{player: "김씨", manito: "왕씨"}, {player: "왕씨", manito: "양씨"}, {player: "양씨", manito: "김씨"}]
    drawManitoGoGo(names) {
      let players = [...names];
      let manitos = [...names];
      let result = [];

      players.forEach((player) => {
        let availableManitos = manitos.filter(
          (manito) => manito.player !== player.player
        );
        let randomIndex = Math.floor(Math.random() * availableManitos.length);
        let selectedManito = availableManitos[randomIndex].player;

        // 선택된 player와 manito를 result 배열에 추가
        result.push({
          player: player.player,
          manito: selectedManito,
        });

        // 선택된 player와 manito를 배열에 제거 -> 선택된건 제거. 중복 선택 방지.
        players = players.filter((p) => p.player !== player.player);
        manitos = manitos.filter((m) => m.player !== selectedManito);
      });
      return result;
    },
    // 초기화
    resetGame() {
      this.inputName = "";
      this.players = [];
      this.manitoResult = [];
      this.status = false;
    },
    // 공백제거
    removeSpaces() {
      // 공백 제거
      this.inputName = this.inputName.replace(/\s/g, "");
      // 특수 문자 제거
      this.inputName = this.inputName.replace(/[!@#$%^&*()_\-.,?~]/g, "");
    },
    // TODO :: www.manitoSelect.참여자이름/마니또대상이름 나오면 링크에서 뽀록나니까 마니또 대상이름은 index넘버로 변경해야함
    // TODO :: idex로 하려면 [{player: '', manito: ''}, {player: '', manito: ''} ] 형태여야함.
    // -> indexOf 혹은 findIndex 배열함수를 통해 index 찾아서 쿼리파라미터 끝에 삽입.
    // TODO :: player만 들어간다면 상관없음.
    // 아니면참여자 이름만 링크로줘도될듯?
    // 링크복사
    async copyManitoLink(player, manito) {
      const idx =
        this.manitoResult.findIndex((item) => item.manito === manito) + 1;
      const url = `http://localhost:8080/manitoSelect/${player}/${idx}`;
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
