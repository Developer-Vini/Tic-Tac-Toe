 const cells = document.querySelectorAll(".cell");

    const statusText = document.querySelector("#statusText");

    const restartBtn = document.querySelector("#restartBtn");

    // condição de vitória possível no game
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    // array para armazenar o que o jogador escolheu
    let options = ["","","","","","","","",""];
    // controla o jogador atual
    let currentPlayer = "X"
    // controla se o jogo está em andamento
    let running = false;

    // o jogo inicia
    initializeGame();

    function initializeGame(){
        // Adiciona um evento de clique para cada célula do jogo
        cells.forEach(cell => cell.addEventListener("click", CellClicked));
        // adiciona um evento de clique para o botão de reiniciar
        restartBtn.addEventListener("click", restartGame);
        // Define o texto inicial de status com o jogador atual
        statusText.textContent = `${currentPlayer}'s turn`;
    }

    function CellClicked(){
        const cellIndex = this.getAttribute("cellIndex");

        // vai verificar se a célula já foi escolhida ou se o jogo acabou
        if(options[cellIndex] != "" || !running){
            return;
        }


        updateCell(this, cellIndex);
        // verifica se teve um vencedor na jogada
        checkWinner();
    }

    function updateCell(cell, index){
        // atualizar a opção na posição correspondente do array
        options[index] = currentPlayer;
        // atualiza o texto da célula com a escolha do jogador
        cell.textContent = currentPlayer;
    }

    function changePlayer(){
        // variar entre os jogadores X e O
        currentPlayer = (currentPlayer == "X") ? "O" : "X";
        // vai atualizar o texto de status com o jogador 
        statusText.textContent = `${currentPlayer}'s turn`;
    }

    function checkWinner(){
        let roundWon = false;
        // vai verificar todas as condições de vitória possíveis
        for(let i = 0; i <winConditions.length; i++){
            const condition = winConditions[i];
            const cellA = options[condition[0]];
            const cellB = options[condition[1]];
            const cellC = options[condition[2]];

            // verifica se as células estão preenchidas e se são iguais
            if(cellA == "" || cellB === "" || cellC == ""){
                continue;
            }
            if(cellA == cellB && cellB == cellC){
                roundWon = true;
                break;
            }
        }

        // mostra o resultado
        if(roundWon){
            statusText.textContent = `${currentPlayer} Ganhou!`;
            running = false;
        }
        else if(!options.includes("")){
            statusText.textContent = 'Empate!';
            running = false;
        }
        else{
            changePlayer();
        }
    }

    function restartGame(){
        // Reinicia o jogo
        currentPlayer = "X";
        options = ["","","","","","","","",""];
        statusText.textContent = `${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = "");
        running = true;
    }