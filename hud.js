// let HUD = {
//     gemCount: 0,
//     timer : 120, // seconds
//     bobState: "right",
//     health: player.lives,
//     startTime: 0,
//     deltaTime: 0,
//     pausedState: false,
//     currentHealth: 3
//
// }

function updateHud(HUD, HUDelem, action="") {
    // const healthbar = HUDelem.getElementById('healthbar')
    // const timerValue = HUDelem.querySelector('.timer a');
    const gemCount = HUDelem.querySelector('.gemCount a');
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
        updateTimer(HUD, HUDelem)
        updateHealthbar(HUD, HUDelem)
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


    // HealthBar
    if (HUD.currentHealth !== HUD.lastHealth) updateHealthbar(HUD, HUDelem)

    //Gems
    
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



function updateTimer(HUD, HUDelem) {
    const timerValue = HUDelem.querySelector('.timer a');
    
    const formatedTime = {
        mins: String(Math.floor(HUD.timer / 60)).padStart(2, '0'),
        secs: String((HUD.timer % 60)).padStart(2, '0'),
    }
    // console.log(typeof HUD.timer);
    // console.log(`${formatedTime.mins}:${formatedTime.secs}`)
    timerValue.innerHTML = `${formatedTime.mins}:${formatedTime.secs}`;

    // const mins = Math.floor(seconds / 60);
    // const secs = seconds % 60;

}

function updateHealthbar(HUD, HUDelem) {
    // IF CURRENT HEALTH max --> 
    // Range of healthbar is 0px-200px
    const healthBarWidth =  (200/ HUD.maxHealth) * HUD.currentHealth

    console.log("UPDATE HEALTH");
    const healthbar = HUDelem.querySelector('#healthbar')
    const healthBlink = HUDelem.querySelector('#blinkAnimation')
    healthbar.style.transition = `width 300ms linear`;
    // healthbar.style.width = `${healthBarWidth}px`;
    // healthBlink.style.width = `${healthBarWidth}px`;
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
        if (blinkCount >= 4) { // Blink for 300ms (6 times at 100ms interval)
            clearInterval(interval);
            healthBlink.style.display = 'none'; // Ensure it's hidden after the blinking stops
            healthbar.style.width = `${healthBarWidth}px`;
        }
    }
    const interval = setInterval(blinkHealth, 140);


    HUD.lastHealth = HUD.currentHealth
    return null;

}

function updateGems(HUD, HUDelem) {
    const gemCount = HUDelem.querySelector('.gemCount a');

}
export {updateHud}