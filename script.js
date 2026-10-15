// 요소 가져오기
const seats = document.querySelectorAll(".seat");
const allCards = document.querySelectorAll(".allCards .card");
const cloudLines = document.querySelectorAll(".cloudArea div");
const nightButton = document.querySelector("#button");
const ticket = document.querySelector(".ticket");
const ticketCut = document.querySelector(".ticketCut");
const ticketInfo = document.querySelector(".ticketInfo");
const welcome = document.querySelector(".welcome");


// 탑승권 뜯기
ticketCut.onclick = () => {
    ticket.classList.add("torn");
    ticketCut.classList.add("torn");
    ticketInfo.classList.add("show");
    welcome.classList.add("show");
}


// 창문마다 검색 기능 연결
seats.forEach((seat) => {
    const input = seat.querySelector(".searchInput");
    const button = seat.querySelector(".searchButton");
    const curtain = seat.querySelector(".hide");
    const cardBox = seat.querySelector(".cardBox");
    const noResult = seat.querySelector(".noResult");

    // 검색
    const search = () => {
        if (input.value === "") {
            alert("검색어를 입력해주세요");
        }
        else {
            curtain.classList.add("closed");
        }
    }

    button.onclick = search;
    input.onchange = search;

    // 가리개
    curtain.onclick = () => {
        const searchWord = input.value.toLowerCase();
        let count = 0;

        // 지난 결과 지우기
        cardBox.innerText = "";

        allCards.forEach((card) => {
            let found = false;
            const newCard = document.createElement("div");
            newCard.classList.add("card");

            // 부제목 검사
            const title = card.querySelector("h3").innerText;
            const titleFound = title.toLowerCase().includes(searchWord);
            if (titleFound) {
                found = true;
            }
            const newTitle = document.createElement("h3");
            newTitle.innerText = title;
            newCard.appendChild(newTitle);

            // 문장 검사 : 카드마다 문장은 1개만 넣기
            let added = false;
            const sentences = card.querySelectorAll("p");
            sentences.forEach((sentence) => {
                const text = sentence.innerText;
                const newSentence = document.createElement("p");
                newSentence.innerText = text;

                if (added === false) {
                    // 검색어가 들어 있는 문장은 노랗게 해서 넣기
                    if (text.toLowerCase().includes(searchWord)) {
                        newSentence.classList.add("match");
                        newCard.appendChild(newSentence);
                        found = true;
                        added = true;
                    }
                    // 부제목이 맞으면 첫 문장 넣기 (빈 줄은 빼고)
                    else if (titleFound) {
                        if (text !== "") {
                            newCard.appendChild(newSentence);
                            added = true;
                        }
                    }
                }
            });

            // 찾은 카드는 2개까지만 창문에 넣기
            if (found) {
                count = count + 1;
                if (count <= 2) {
                    cardBox.appendChild(newCard);
                }
            }
        });

        // 2개보다 많으면 안내 문구
        if (count > 2) {
            const more = document.createElement("p");
            more.classList.add("more");
            more.innerText = `+ ${count - 2}개 더 있어요. 더 자세히 검색해보세요`;
            cardBox.appendChild(more);
        }

        // 하나도 없으면 안내 문구
        if (count === 0) {
            noResult.classList.add("show");
        }
        else {
            noResult.classList.remove("show");
        }

        curtain.classList.remove("closed");
    }
});


// 구름
let lineNumber = 0;

allCards.forEach((card) => {
    const cloud = document.createElement("div");
    cloud.classList.add("storyCloud");

    // 부제목
    const cloudTitle = document.createElement("h3");
    cloudTitle.innerText = card.querySelector("h3").innerText;
    cloud.appendChild(cloudTitle);

    // 문장
    card.querySelectorAll("p").forEach((sentence) => {
        if (sentence.innerText !== "") {
            const cloudText = document.createElement("p");
            cloudText.innerText = sentence.innerText;
            cloud.appendChild(cloudText);
        }
    });

    cloudLines[lineNumber].appendChild(cloud);

    lineNumber = lineNumber + 1;
    if (lineNumber > 2) {
        lineNumber = 0;
    }
});

cloudLines.forEach((line) => {
    const count = line.querySelectorAll(".storyCloud").length;
    line.style.width = (count * 640) + "px";
});


// 밤 모드
nightButton.onclick = () => {
    document.body.classList.toggle("night");

    if (document.body.classList.contains("night")) {
        nightButton.innerText = "낮 배경";
    }
    else {
        nightButton.innerText = "밤 배경";
    }
}