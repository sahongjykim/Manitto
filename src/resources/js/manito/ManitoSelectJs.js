export default {
  name: "ManitoSelect",
  data() {
    return {
      inputName: "",
      player: [],
      manitoResult: [],
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
        console.log(this.manitoResult);
      }
    },
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

        result.push({ player: player[i], manito: selectedManito, row: i + 1 });

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
    // TODO :: www.manitoSelect.참여자이름/마니또대상이름 나오면 링크에서 뽀록나니까 마니또 대상이름은 index넘버로 변경해야함
    // 아니면참여자 이름만 링크로줘도될듯?
    async copyManitoLink(player, row) {
      const url = `http://localhost:8080/manitoSelect/${player}/${row}`;
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
