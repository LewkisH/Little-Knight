function updateHud(HUD=JSON.parse(sessionStorage.getItem('HUD')), HUDelem=document.getElementById('HUD'), action="") {
    if (action === "init" || action === "restart") {
        if (action === "init") sessionStorage.clear();
        HUD.bobState = "right";
        HUD.gemCount = 0;
        HUD.pausedState = false;
        HUD.startTime = performance.now();
        HUD.deltaTime = 0
        HUD.currentHealth = HUD.maxHealth;
        HUD.lastHealth = HUD.maxHealth;
        HUD.timer = HUD.maxTime;
        sessionStorage.setItem('HUD', JSON.stringify(HUD))
        sessionStorage.setItem('HUD_gems', JSON.stringify(HUD.gemCount))
        updateTimer(HUD, HUDelem)
        updateHealthbar(HUD, HUDelem)
        updateGems(HUD, HUDelem)
        return null;
    }
    if (action === "pause") {
        HUD.pausedState = true;
        sessionStorage.setItem('HUD', JSON.stringify(HUD))
        return null;
    }
    if (action === "unpause") {
        HUD.startTime = performance.now();
        HUD.pausedState = false;
        sessionStorage.setItem('HUD', JSON.stringify(HUD))
        return null;
    }
    if (action === "increaseGems") {
        increaseGems();
        updateGems(HUD, HUDelem);
        return null;
    }
    // HealthBar
    if (HUD.currentHealth !== HUD.lastHealth) updateHealthbar(HUD, HUDelem)
    //Gems
    let sessGemCount = JSON.parse(sessionStorage.getItem('HUD_gems'))
    if (HUD.gemCount !== sessGemCount) {
        HUD.gemCount = sessGemCount
        sessionStorage.setItem('HUD', JSON.stringify(HUD))
        updateGems(HUD, HUDelem);
    }
    // Timer
    HUD.deltaTime = (performance.now() - HUD.startTime)
    // If 1 second passed remove from total timer & update timer
    if (HUD.deltaTime >= 1000) {
        HUD.timer -= 1
        updateTimer(HUD, HUDelem);
        HUD.startTime = performance.now();
        HUD.deltaTime = 0
    }
    sessionStorage.setItem('HUD', JSON.stringify(HUD))

    return null;
}

function updateGems(HUD, HUDelem) {
    const gemCount = HUDelem.querySelector('.gemCount a');
    gemCount.innerHTML = HUD.gemCount;
}

function increaseGems() {
    let prevData = JSON.parse(sessionStorage.getItem('HUD_gems'))
    let newData = prevData + 1
    sessionStorage.setItem('HUD_gems', JSON.stringify(newData));
}

function updateTimer(HUD, HUDelem) {
    const timerValue = HUDelem.querySelector('.timer a');
    const formatedTime = {
        mins: String(Math.floor(HUD.timer / 60)).padStart(2, '0'),
        secs: String((HUD.timer % 60)).padStart(2, '0'),
    }
    timerValue.innerHTML = `${formatedTime.mins}:${formatedTime.secs}`;
}

// Range of healthbar is 0px-200px
function updateHealthbar(HUD, HUDelem) {
    const healthBarWidth =  (200 / HUD.maxHealth) * HUD.currentHealth
    const healthbar = HUDelem.querySelector('#healthbar')
    const healthBlink = HUDelem.querySelector('#blinkAnimation')
    healthbar.style.transition = `width 300ms linear`;
    if (HUD.currentHealth === HUD.maxHealth) {
        healthbar.style.width = `${healthBarWidth}px`;
        return null;
    }
    // The part that will be removed
    let section = (200 / HUD.maxHealth);
    healthBlink.style.width = `${section}px`;
    let blinkleft = (200 - (section * (HUD.maxHealth - HUD.currentHealth))) + 3
    healthBlink.style.left = `${blinkleft}px`
    let blinkCount = 0;
    function blinkHealth() {
        if (blinkCount % 2 === 0) {
            healthBlink.style.display = 'block';
        } else {
            healthBlink.style.display = 'none';
        }
        blinkCount++;
        if (blinkCount >= 4) {
            clearInterval(interval);
            healthBlink.style.display = 'none';
            healthbar.style.width = `${healthBarWidth}px`;
        }
    }
    const interval = setInterval(blinkHealth, 140);
    HUD.lastHealth = HUD.currentHealth

    return null;
}

export {updateHud}