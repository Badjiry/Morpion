window.onload = async () => {
    const statut = document.querySelector("#currentPlayer");
    const grid = document.querySelector("#grid");
    const winDisplay = document.querySelector(".win-display");
    const scoreXDisplay = document.querySelector("#playerOne");
    const scoreODisplay = document.querySelector("#playerTwo");
    let jeuActif = true;
    let joueurActif = "X";
    let etatJeu = ["", "", "", "", "", "", "", "", ""];
    let scoreX = 0;
    let scoreO = 0;

    const conditionsVictoire = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const gagne = () => `Le joueur ${joueurActif} a gagné !`;
    const egalite = () => "Égalité !";
    const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`;

    statut.innerHTML = tourJoueur();

    document.querySelectorAll(".cell").forEach((cell, index) => {
        cell.dataset.index = index;
        cell.addEventListener("click", gestionClicCase);
    });

    document.querySelector("#replay").addEventListener("click", rejouer);

    function gestionClicCase() {
        const indexCase = parseInt(this.dataset.index);
        
        if (etatJeu[indexCase] !== "" || !jeuActif) {
            return;
        }

        etatJeu[indexCase] = joueurActif;
        this.innerHTML = joueurActif;

        verifGagne();
    }

    function verifGagne() {
        let tourGagnant = false;

        for (let condition of conditionsVictoire) {
            let [a, b, c] = condition;
            if (etatJeu[a] && etatJeu[a] === etatJeu[b] && etatJeu[a] === etatJeu[c]) {
                tourGagnant = true;
                break;
            }
        }

        if (tourGagnant) {
            statut.innerHTML = gagne();
            jeuActif = false;
            winDisplay.innerHTML = `<div class='popup'>${gagne()}</div>`;
            if (joueurActif === "X") {
                scoreX++;
            } else {
                scoreO++;
            }
            updateScores();
            return;
        }

        if (!etatJeu.includes("")) {
            statut.innerHTML = egalite();
            jeuActif = false;
            winDisplay.innerHTML = `<div class='popup'>${egalite()}</div>`;
            return;
        }

        joueurActif = joueurActif === "X" ? "O" : "X";
        statut.innerHTML = tourJoueur();
    }

    function rejouer() {
        joueurActif = "X";
        jeuActif = true;
        etatJeu = ["", "", "", "", "", "", "", "", ""];
        statut.innerHTML = tourJoueur();
        document.querySelectorAll(".cell").forEach(cell => cell.innerHTML = "");
        winDisplay.innerHTML = "";
    }

    function updateScores() {
        scoreXDisplay.innerHTML = scoreX;
        scoreODisplay.innerHTML = scoreO;
    }
};
