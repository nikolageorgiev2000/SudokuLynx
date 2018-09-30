document.addEventListener("DOMContentLoaded",
    function(event) {


        function Grid(){

            this.loadedSudoku;
            this.inputs = document.getElementsByClassName("puzNum");
            this.code = null;
            this.codeNoDiff = null;
            this.difficulty = 0;
            this.stack = [];
            this.hintUsed = false;

            this.codeConverter = function(num, direction) {
                var alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                if (direction == "toCode") {
                    return (alpha[Math.floor(num / 26)] + alpha[num % 26]).toUpperCase();
                } else if (direction == "toInt") {
                    return 26 * alpha.indexOf(num[0].toLowerCase()) + alpha.indexOf(num[1].toLowerCase());
                } else {
                    console.log("Code conversion error!");
                }
            }


            this.generate = function() {
                var loadedSudoku = this.loadedSudoku;
                var inputs = this.inputs;
                pi = 3.1415926535897932384626433832795028841971693993751; //Decimal
                code = this.code;
                codeNoDiff = this.codeNoDiff;
                difficulty = this.difficulty;
                stack = this.stack;
                hintUsed = this.hintUsed;

                //Regular expression to check code is of correct type (LetterLetterDigit)
                var letter1 = '([a-z])';
                var letter2 = '([a-z])';
                var digit = '[0-3]'; //digit 0-3
                var codeExp = new RegExp(letter1 + letter2 + digit, ["i"]); //case insensitive

                //Uses the inputted CODE; if empty generates random code for sudoku from database
                if (document.getElementById("code").value.length != 0 && codeExp.test(document.getElementById("code").value)) {
                    code = document.getElementById("code").value;
                    codeNoDiff = code[0] + code[1];
                    difficulty = code[2];
                    console.log(codeNoDiff);
                } else {
                    codeNoDiff = this.codeConverter(Math.floor(Math.random() * 675), "toCode");
                }

                //While database not working, sets LOADEDSUDOKU to one from the array
                var sudokus = "376918425514276893829354617765831942241597386983462571197645238632789154458123769.438729561197586432256431789913258647782164953645973218874612395561397824329845176.396172845518439627742856391175264938834597162269381754483615279921743586657928413.457982361126537894938641257795864132264193785813725649371458926642379518589216473.685317924439628175271594386364872591192456738857139642526783419913245867748961253.432586179987132564516497328829613457764958213351274986698325741175849632243761895.495812367782463915631759284156398742243675198879241536917586423364127859528934671.821674539943815276657329814416982753385147962279536481192753648768491325534268197.541398672267415893389726451152974386673281945894653217735842169928167534416539728.413987526698452173527631498851263947746519832239874615384796251162345789975128364.871429653392561847546387921134758269987216534625943178418672395253894716769135482.925147386638952174417836295581329467749615823362478519894561732256783941173294658.258476913361925748497831562124693857785142396639587421846319275573264189912758634.624379815578126394193584726957841632231965478846237951315698247769412583482753169.591273846684519327732684195968132754417895263325746918856321479243957681179468532.715894362284316597639752184461275938853941726927638451178523649546189273392467815.314859762267143958895267134423975816651328479978416325542791683139682547786534291.423769185598312467716845239932651748871423596654987312265138974189574623347296851.315426897794815632286937541132764985549281763678593124421679358863152479957348216.418657923397281456652943871136895742284176395579432168865719234943528617721364589";
                var array = new Array();
                array = sudokus.split(".");
                loadedSudoku = array[0];

                //Fills the grid with LOADEDSUDOKU
                for (var i = 0; i < 81; i++) {
                    inputs[i].placeholder = loadedSudoku[i];
                    inputs[i].value = "";
                    inputs[i].style.backgroundColor = "white";
                    inputs[i].disabled = true;
                };

                //If no CODE inputted, changes difficulty depending on radio input or default
                if (document.getElementById("code").value.length == 0 && document.querySelector('input[name="difficulty"]:checked') != null) {
                    difficulty = document.querySelector('input[name="difficulty"]:checked').value;
                } else if (document.getElementById("code").value.length == 0) {
                    difficulty = 1;
                }

                //Editting Board Title to match settings
                var diffNames = ["Easy", "Medium", "Hard", "Master"];
                document.getElementById("title").textContent = "Sudoku"+" "+(codeNoDiff + difficulty)+" "+diffNames[difficulty];
                code = codeNoDiff + difficulty;

                //Empties a puzNum text input box for user interaction
                function enableCell(row, col) {
                    inputs[row * 9 + col].placeholder = "";
                    inputs[row * 9 + col].disabled = false;
                }

                //Pseudorandom base 9 integer using Pi            
                function genRand(num) {
                    return Math.trunc(pi * num % 9);
                }

                //Creating empty spaces depending on difficulty and total number of candidates
                var diffValues = [30, 36, 40, 50];
                var candidates = 0;
                var emptyDiff = parseInt(difficulty) + 1;
                var temp = 0;
                var array2D = new Array(9);
                for (var i = 0; i < 9; i++) {
                    array2D[i] = new Array(9);
                    for (var j = 0; j < 9; j++) {
                        array2D[i][j] = parseInt(loadedSudoku[i * 9 + j]);
                    }
                };

                var seed = this.codeConverter(codeNoDiff, "toInt");

                //EMPTY CELL COUNTING FUNCTION
                function emptyCounter() {
                    var count = 0;
                    for (var i = 0; i < 81; i++) {
                        if (inputs[i].disabled == false) {
                            count++;
                        }
                    }
                    return count;
                }

                // Empties random from every row, column and box
                function diffChecker(){return emptyCounter()<diffValues[difficulty]};

                while(diffChecker()){
                    for (var i = 0; i < 9; i++) {
                        if (diffChecker() && inputs[i * i, genRand(seed)].disabled == true) {
                            enableCell(i, genRand(seed));
                        };
                        seed += 2;
                        if (diffChecker() && inputs[genRand(seed)*9+i].disabled == true) {
                            enableCell(genRand(seed), i);                    
                        };
                        seed += 3;
                        var boxRow = Math.floor(genRand(seed) / 3) + i - i % 3;
                        var boxCol = genRand(seed) % 3 + (i % 3) * 3;
                        if (inputs[boxRow*9+boxCol].disabled == true) {
                            enableCell(Math.floor(genRand(seed) / 3) + i - i % 3, genRand(seed) % 3 + (i % 3) * 3);
                        };
                    }
                };

                this.loadedSudoku = loadedSudoku
                this.inputs = inputs;
                this.code = code;
                this.codeNoDiff = codeNoDiff;
                this.difficulty = difficulty;
                this.stack = stack;
                this.hintUsed = hintUsed;


            };

        };


        function undoAction(Grid){
            if(Grid.stack.length>0){
                var undoData = stack.pop();
                Grid.inputs[undoData[0]].value = undoData[1];
            }
        }

        //Gives the player a hint
        function hinter(Grid){
            if(!Grid.hintUsed){
                var cellCoord = Math.trunc(Math.random()*81);
                while(Grid.inputs[cellCoord].disabled==true){
                    cellCoord = Math.trunc(Math.random()*81);
                }
                document.querySelector("#hint").disabled=true;
                Grid.inputs[cellCoord].placeholder = Grid.loadedSudoku[cellCoord];
                Grid.inputs[cellCoord].disabled = true;
                Grid.inputs[cellCoord].style.backgroundColor="#AAFF00";
                setTimeout(function(){ Grid.inputs[cellCoord].style.backgroundColor="white"; }, 1500);
                document.querySelector("#hint").style.backgroundColor="#FF5733";
            };
        }

        function share(Grid){
            const copiedCode = document.createElement('textarea');
            copiedCode.value = Grid.code;
            document.body.appendChild(copiedCode);
            copiedCode.select();
            document.execCommand('copy');
            document.body.removeChild(copiedCode);
            alert("Your sudoku code ("+Grid.code+") has been copied to the clipboard!");    
        }

        // printing:
        // https://stackoverflow.com/questions/12997123/print-specific-part-of-webpage
        //BEST: https://www.arclab.com/en/kb/htmlcss/how-to-print-a-specific-part-of-a-html-page-css-media-screen-print.html

        // Checks for contradictions between LOADEDSUDOKU and the UI game board
        function checkSudoku(Grid) {
            var correct = true;
            for (var i = 0; i < 81; i++) {
                if (Grid.inputs[i].disabled == true || Grid.inputs[i].value === Grid.loadedSudoku[i] || Grid.inputs[i].value == "") {
                    Grid.inputs[i].style.backgroundColor = "white";
                    if (!(Grid.inputs[i].disabled == true || Grid.inputs[i].value === Grid.loadedSudoku[i])){
                        correct = false;
                    }
                } else {
                    Grid.inputs[i].style.backgroundColor = "#FF5733";
                    correct = false;
                }
            }
            if(correct){
                alert("All correct! Share with your friends by pressing Share.")
            }
        };

        var test = new Grid();
        test.generate();
        console.log("hi")
        for (var x = 0; x < 81; x++) {
            test.inputs[x].coord = x;
            test.inputs[x].oldVal = "";
            test.inputs[x].onchange = function() {
                temp = [this.coord, this.oldVal];
                test.stack.push(temp);
                this.oldVal = this.value.toString();
                if (document.getElementById("autoCheck").checked == true) {
                    checkSudoku(test);
                };
            };
        }

        document.querySelector("#generate")
            .addEventListener("click", function(){
                test = new Grid();
                test.generate();
            });

        document.querySelector("#checkButton")
            .addEventListener("click", function(){checkSudoku(test)});

        document.querySelector("#undo")
            .addEventListener("click", function(){undoAction(test)});

        document.querySelector("#hint")
            .addEventListener("click", function(){hinter(test)}); 

        document.querySelector("#share")
            .addEventListener("click", function(){share(test)}); 


    }
);
