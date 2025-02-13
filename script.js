let dialogueIndex = 0; // 현재 대사 인덱스
const dialogues = [
    { name: "우지호", text: "지금이 몇신지 알아?", image: './imeges/b1.png' },
    { name: "우지호", text: "..오늘이 무슨날인지 모르는거야?", image: './imeges/b1.png' },
    { name: "우지호", text: "하아...", image: './imeges/b1.png' }, // 3번째 대사 이미지
    { text: "               ......", image: './imeges/bl.png' }, // 이름 없이 대사
    { name: "우지호", text: "... 괜찮아 내가 준비했으니까.", image: './imeges/event1.png' },
    { name: "우지호", text: " 빨리, 아~ 해봐. ", image: './imeges/event1.png' },
    { text: " 그는 웃으면서 당신에게 초콜릿을 먹여줬다. ", image: './imeges/bl.png' },
    { name: "우지호", text: " 해피 발렌타인데이. ", image: './imeges/b2.png' },
    { text: "  [end] HAPPY Valentine's Day ",image: './imeges/bl.png' }  // 이름 있는 대사
];

// 이벤트 리스너 설정
document.getElementById('start-button').addEventListener('click', startGame);
document.getElementById('next-button').addEventListener('click', showNextDialogue);
document.getElementById('retry-button').addEventListener('click', resetGame);


function startGame() {
     
    document.getElementById('cover').classList.add('hidden'); // 커버 화면 숨기기
    document.getElementById('game-screen').classList.remove('hidden'); // 게임 화면 보이기

    // 배경 이미지를 여기서 설정합니다.
    document.getElementById('background').style.backgroundImage = "url('./imeges/b1.png')";
    
    showNextDialogue(); // 첫 번째 대사 표시
}

function showNextDialogue() {
    if (dialogueIndex < dialogues.length) {
        const dialogueObj = dialogues[dialogueIndex];
        
        if (dialogueObj.name) {
            document.getElementById('character-name').textContent = dialogueObj.name; // 캐릭터 이름
            document.getElementById('character-name').classList.remove('hidden'); // 이름 보여주기
        } else {
            document.getElementById('character-name').classList.add('hidden'); // 이름 숨기기
        }

        const dialogueText = dialogueObj.text; // 대사를 가져오는 부분
        let charIndex = 0; // 글자의 인덱스
        document.getElementById('dialogue').textContent = ""; // 대사 초기화
        
         // 배경 이미지를 부드럽게 변경하는 부분
        const background = document.getElementById('background');
        background.style.opacity = 0; // 현재 이미지를 숨김
        setTimeout(() => {
            background.style.backgroundImage = `url(${dialogueObj.image})`; // 새로운 이미지 설정
            background.style.opacity = 1; // 불투명도를 설정하여 나타나게 함
        }, 300); // 이미지 변경 지연 (300ms)

        // 대사를 천천히 출력하는 함수
        const interval = setInterval(() => {
            if (charIndex < dialogueText.length) {
                document.getElementById('dialogue').textContent += dialogueText.charAt(charIndex); // 한 글자씩 추가
                charIndex++;
            } else {
                clearInterval(interval); // 대사가 끝나면 타이머 종료
                dialogueIndex++; // 다음 대사로 인덱스 증가
                
                // 모든 대사가 끝날 경우
                if (dialogueIndex === dialogues.length) {
                    document.getElementById('next-button').classList.add('hidden'); // 다음 버튼 숨기기
                    document.getElementById('retry-button').classList.remove('hidden'); // 다시하기 버튼 보여주기
                } else {
                    document.getElementById('next-button').classList.remove('hidden'); // 대화 중에는 다음 버튼 보여주기
                }
            }
        }, 100); // 100ms마다 글자 출력

        // 대사 출력 중에는 화살표 버튼 숨기기
        document.getElementById('next-button').classList.add('hidden'); // 초기에는 숨기기
    }
}

function resetGame() {
    dialogueIndex = 0; // 대사 인덱스 초기화
    document.getElementById('retry-button').classList.add('hidden'); // 다시하기 버튼 숨기기
    document.getElementById('cover').classList.remove('hidden'); // 커버 화면 보이기
    document.getElementById('game-screen').classList.add('hidden'); // 게임 화면 숨기기
    document.getElementById('dialogue').textContent = ""; // 대화 내용을 초기화
    document.getElementById('character-name').classList.add('hidden'); // 캐릭터 이름 숨기기
}
