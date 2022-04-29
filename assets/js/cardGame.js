const startBtn = document.querySelector(".start__btn");
        const infoBox = document.querySelector(".info__box");
        const resultBox = document.querySelector(".result__box");
        const cardWrap = document.querySelector(".card__wrap");
        const cards = document.querySelectorAll(".cards li");
        const infoBoxStart = infoBox.querySelector(".start");
        const resultBoxRestart = resultBox.querySelector(".restart");
        const failBoxStart = document.querySelector(".failRestart");
        const failBox = document.querySelector(".fail");
        const score = document.querySelector(".score span");
        const remain = document.querySelector(".remain");
        let cardOne, cardTwo;
        let disableDeck = false;
        let matchedCard = 0;
        let sound = [
            "audio/match2.mp3",
            "audio/match.mp3",
            "audio/up.mp3",
        ]
        let lifeCurrent = 0;
        let answer = 5;
        let soundMatch = new Audio(sound[0]);
        let soundNoMatch = new Audio(sound[1]);
        let soundSuccess = new Audio(sound[2]);

        // 시작 버튼
        startBtn.onclick = () => {
            infoBox.classList.add("active");
            startBtn.classList.remove("active");
        }
        // 게임시작 버튼
        infoBoxStart.onclick = () => {
            cardWrap.classList.add("active");
            setTimeout(() => {
                infoBox.classList.remove("active");
                shuffledCard();
            }, 1000)
        }
        // 게임 다시 시작 버튼
        resultBoxRestart.onclick = () => {
            remain.innerText = "현재 남은 기회 : 5";
            resultBox.classList.remove("active");
            lifeCurrent=0;
            setTimeout(() => {
                cardWrap.classList.add("active");
            }, 800);
            setTimeout(() => {
                shuffledCard();
            }, 1200);
            
        }
        failBoxStart.onclick = () => {
            failBox.classList.remove("active");
            setTimeout(() => {
                cardWrap.classList.add("active");
            }, 800);
            setTimeout(() => {
                shuffledCard();
            }, 1200);
            
        }
        //카드 클릭
        cards.forEach(card => {
            //card.classList.add("flip")
            card.addEventListener("click", flipCard);
        });
        function flipCard(e){
            let clickedCard = e.target;
            if(clickedCard !== cardOne && !disableDeck){
                clickedCard.classList.add("flip");
                if(!cardOne){
                    return cardOne = clickedCard;
                }
                cardTwo = clickedCard;
                disableDeck = true;
                let cardOneImg = cardOne.querySelector(".back img").src;
                let cardTwoImg = cardTwo.querySelector(".back img").src;
                matchCards(cardOneImg, cardTwoImg);
            }
        }
        //카드 확인하기
        function matchCards(img1, img2){
            if(img1 == img2){
                matchedCard++;
                //완성했을 때
                if(matchedCard == 8){
                    setTimeout(() => {
                        cardWrap.classList.remove("active");
                        resultBox.classList.add("active");
                        cards.forEach(el => {
                            el.classList.remove("flip");
                        })
                    }, 1000)
                } 
                cardOne.removeEventListener("click", flipCard);
                cardTwo.removeEventListener("click", flipCard);
                cardOne = cardTwo = "";
                disableDeck = false;
                soundMatch.play();
            } else {
                
                lifeCurrent++;
                if(lifeCurrent == 5){
                    failBox.classList.add("active");
                    cardWrap.classList.remove("active");
                }
                setTimeout(() => {
                    cardOne.classList.add("shake");
                    cardTwo.classList.add("shake");
                }, 400);
                setTimeout(() => {
                    cardOne.classList.remove("shake", "flip");
                    cardTwo.classList.remove("shake", "flip");
                    cardOne = cardTwo = "";
                    disableDeck = false;
                }, 1200);
                soundNoMatch.play();
            }
            remain.innerText = "현재 남은 기회 : " + (answer - lifeCurrent);
            if(answer - lifeCurrent == 5){
                score.innerText = "5점 만점 중 당신의 점수는 " + (answer - lifeCurrent) + "점 입니다. 좀 치시네요?";
            } else if(answer - lifeCurrent == 4){
                score.innerText = "5점 만점 중 당신의 점수는 " + (answer - lifeCurrent) + "점 입니다. 잘 했어요!!";
            } else if(answer - lifeCurrent == 3){
                score.innerText = "5점 만점 중 당신의 점수는 " + (answer - lifeCurrent) + "점 입니다. 아주 잘 했어요!!";
            } else if(answer - lifeCurrent == 2){
                score.innerText = "5점 만점 중 당신의 점수는 " + (answer - lifeCurrent) + "점 입니다. 조금만 분발하세요.";
            } else if(answer - lifeCurrent == 1){
                score.innerText = "5점 만점 중 당신의 점수는 " + (answer - lifeCurrent) + "점 입니다. 좋지 않은 성적이예요.";
            }
            
        }
        function shuffledCard(){
            cardOne, cardTwo = "";
            disableDeck = false;
            matchedCard = 0;
            let arr = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
            //let result = arr.sort(() => Math.random() > 0.5 ? 1 : -1);
            cards.forEach((card, index) => {
                card.addEventListener("click", flipCard);
                card.classList.remove("flip");
                setTimeout(() => {
                    card.classList.add("flip");
                }, 200 * index);
                setTimeout(() => {
                    card.classList.remove("flip");
                }, 4000);
                let imgTag = card.querySelector(".back img");
                imgTag.src = `img/img-${arr[index]}.png`;
            })
        }

        document.querySelectorAll(".stop").forEach(e => {
            e.addEventListener("click", ()=>{
                resultBox.classList.remove("active");
                failBox.classList.remove("active");
                infoBox.classList.remove("active");
                document.querySelector(".start__btn").classList.add("active");
            })
        })

        // document.querySelector(".stop").addEventListener("click", () => {
        //     resultBox.classList.remove("active");
        //     failBox.classList.remove("active");
        //     infoBox.classList.remove("active");
        //     document.querySelector(".start__btn").classList.add("active");
        // })