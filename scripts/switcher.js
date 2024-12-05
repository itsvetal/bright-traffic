const TIMER_DURATION = 90; //seconds
const VIEWS_COUNT = 2;

const headerContainer = document.querySelector('.main-header');
const timerContainer = document.querySelector('.timer');
const footerContainer = document.querySelector('.main-footer');

let activeViewIndex = 0;
let timer;

(function init() {
    setDisplay(headerContainer.children.item(0), 'flex');
    setDisplay(footerContainer.children.item(0), 'flex');
    initTimer();
})()

// support only timer which less than one hour
function initTimer() {
    timer = TIMER_DURATION;

    updateTimer(TIMER_DURATION);

    const interval = setInterval(() => {
        timer -= 1;

        if (timer < 0) {
            clearInterval(interval);
            initTimer();
            switchView();
            return;
        }

        updateTimer(timer);

    }, 1000);
}

function updateTimer(timeMS) {
    const minutes = Math.floor((timeMS % (60 * 60)) / 60).toString().padStart(2,'0');
    const seconds = Math.floor((timeMS % (60))).toString().padStart(2,'0');

    timerContainer.innerHTML = minutes + ':' + seconds;
}

function switchView() {
    const nextViewIndex = activeViewIndex + 1 > VIEWS_COUNT - 1 ? 0 : activeViewIndex + 1;

    switchToNext(headerContainer, activeViewIndex, nextViewIndex);
    switchToNext(footerContainer, activeViewIndex, nextViewIndex);

    activeViewIndex = nextViewIndex;
}

function switchToNext(container, prevIndex, nextIndex) {
    setDisplay(container.children[prevIndex], 'none');
    setDisplay(container.children[nextIndex], 'flex');
}

function setDisplay(elem, mode) {
    elem.style.display = mode;
}

