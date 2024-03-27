import { readBitmap } from "./bitmapReader.js";

const GameLevels = ['level01.bmp', 'level02.bmp', 'level03.bmp', 'level04.bmp', 'level05.bmp', 'level06.bmp']
const pathToLevels = './data/'

async function waitForMainMenu() {
    let levelData = {
        levels: GameLevels,
        path: pathToLevels,
    }
    let defaultUserData = {
        developerMode: false,
        audioLevel: "20",
        level: 0,
        gems: 0,
        difficulty: "0",
        selectedLevel: "",
        completedLevels: "",
        gemsPerMap: {},
    };

    await Promise.all(GameLevels.map(async level => {
        let totalCollectibles = await collectibleCount(level);
        defaultUserData.gemsPerMap[level] = `0/${totalCollectibles}`;
    }));

    // Initialize 
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
        localStorage.setItem('userData', JSON.stringify(defaultUserData));
    }
    defaultUserData = JSON.parse(localStorage.getItem('userData'));
    const mainMenuPlay = document.querySelector('.mainMenuPlay')
    mainMenuPlay.addEventListener('click', () => {
        let existingData = JSON.parse(localStorage.getItem('userData'));
        if (existingData) {
            displayMainPlay(existingData, levelData);
        } else {
            displayMainPlay(defaultUserData, levelData);
        }
    });

    const goButtonPromise = new Promise((resolve) => {
        const goButton = document.querySelector('.goButton');
        goButton.addEventListener('click', () => {
            if (!goButton.disabled) {
                let userSettings = JSON.parse(localStorage.getItem('userData'));
                // Resolve when 'Go' button is clicked
                resolve(userSettings);
            }
        });
    });

    return await goButtonPromise;
}

function displayMainPlay(defaultUserData, levelData) {
    // Set MainMenuMenu display to none
    const MainMenuMenu = document.querySelector('.mainMenuMenu');
    MainMenuMenu.style.display = 'none';

    // Display MainMenuPlay
    const MainMenuPlay = document.querySelector('.playMenu');
    MainMenuPlay.style.display = 'flex';
    const eventListeners = [];

    // Go! button
    const goButton = document.querySelector('.goButton');
    const goButtonlistener = function (event) {
        if (!goButton.disabled) {
        // Remove event listeners on cards/goButton
        eventListeners.forEach(({ element, listener }) => {
            element.removeEventListener('click', listener);
        });
        // Clear listener arr
        eventListeners.length = 0;
        // Return to main menu
        MainMenuPlay.style.display = 'none';
        MainMenuMenu.style.display = 'flex';
        const parentMainMenu = document.getElementById('mainMenu');
        parentMainMenu.style.display = 'none';
    }
    }
    goButton.addEventListener('click', goButtonlistener);
    eventListeners.push({ element: goButton, listener: goButtonlistener });

    // Load in all the levels/previews (This is the template)
    const levelContainer = document.querySelector('.levelContainer');
    const templateCard = document.getElementById("level00");

    levelData.levels.forEach(level => {
        // Check if it exists, before adding
        if (!document.getElementById(level.replace(/\.bmp$/, ""))) {
            let clonedTemplate = templateCard.cloneNode(true);
            // Modify
            clonedTemplate.id = level.replace(/\.bmp$/, "");
            let imgElement = clonedTemplate.querySelector('.levelPreview');
            let newSrc = levelData.path + level;
            imgElement.setAttribute('src', newSrc)
            let levelNameElem = clonedTemplate.querySelector('.levelName a');
            let levelNum = level.match(/\d+/)[0];
            let newLevelName = "Level " + levelNum.padStart(2, '0');
            levelNameElem.innerHTML = newLevelName;
            // Emerald/gem count
            let emeraldCountElem = clonedTemplate.querySelector('.emeraldCount');
            let emeraldCountChild = emeraldCountElem.children;
            let realEmeraldCount = (defaultUserData.gemsPerMap[level]).split('/');
            emeraldCountChild[0].innerHTML = realEmeraldCount[0];
            emeraldCountChild[1].innerHTML = realEmeraldCount[1];
            clonedTemplate.style.display = 'block';
            levelContainer.appendChild(clonedTemplate);
        }
    });

    const levelCards = document.querySelectorAll('.levelCard');
    // If selection is in progress already (data entry exists, enable the selection)
    let storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData === null) {
        storedUserData = defaultUserData;
    }
    if (storedUserData.selectedLevel !== "") {
        levelCards.forEach(levelCard => {
            if (levelCard.id === storedUserData.selectedLevel) {
                levelCard.setAttribute('selected', 'yes');
            }
        });
    }
    levelCards.forEach(levelCard => {
        const listener = function (event) {
            // Deselect all other cards
            levelCards.forEach(card => {
                if (card !== this && card.getAttribute('selected') === 'yes') {
                    card.setAttribute('selected', 'no');
                }
            });
            // Toggle selection for clicked
            const isSelected = this.getAttribute('selected') === 'yes';
            this.setAttribute('selected', isSelected ? 'no' : 'yes');
            // Update userData and localstorage
            defaultUserData.selectedLevel = isSelected ? "" : this.id;
            localStorage.setItem('userData', JSON.stringify(defaultUserData));
            updateSelectedState(levelCards);
        };
        levelCard.addEventListener('click', listener);
        eventListeners.push({ element: levelCard, listener: listener });
    });

    // Initial state update
    updateSelectedState(levelCards);

    // Back button functionality
    const backButton2 = document.querySelector('.backButton2')
    backButton2.addEventListener('click', () => {
        // Remove event listeners on cards/goButton
        eventListeners.forEach(({ element, listener }) => {
            element.removeEventListener('click', listener);
        });
        // Clear listener arr
        eventListeners.length = 0;
        // Return to main menu
        MainMenuPlay.style.display = 'none';
        MainMenuMenu.style.display = 'flex';
    });
}

function updateSelectedState(levelCards) {
    const storedSelectedLevel = localStorage.getItem('userData');
    const userData = storedSelectedLevel ? JSON.parse(storedSelectedLevel) : {};
    let goButton = document.querySelector('.goButton');
    if (userData.selectedLevel) {
        goButton.disabled = false; // Enable the button
        goButton.style.opacity = '1'; // Reset opacity to normal
        goButton.style.cursor = 'pointer'; // Reset cursor to 'pointer'
    } else {
        goButton.disabled = true; // Disable the button
        goButton.style.opacity = '0.5'; // Change opacity to make it appear grayed out
        goButton.style.cursor = 'not-allowed'; // Change cursor to 'not-allowed' to indicate it's disabled
    }

    levelCards.forEach(levelCard => {
        const cardId = levelCard.id;
        const isSelected = userData.selectedLevel === cardId;
        levelCard.setAttribute('selected', isSelected ? 'yes' : 'no');
        const selectedOverlay = levelCard.querySelector('.selectedOverlay');
        const notSelectedOverlay = levelCard.querySelector('.notSelectedOverlay');
        if (isSelected) {
            selectedOverlay.style.display = 'block';
            if (notSelectedOverlay) {
                notSelectedOverlay.style.display = 'none';
            }
        } else {
            if (selectedOverlay) {
                selectedOverlay.style.display = 'none';
            }
            if (notSelectedOverlay) {
                notSelectedOverlay.style.display = 'block';
            }
        }
    });
}

function displayMainSettings(defaultUserData) {
    // Set MainMenuMenu display to none
    const MainMenuMenu = document.querySelector('.mainMenuMenu');
    MainMenuMenu.style.display = 'none';
    // Display MainMenuSettings
    const MainMenuSettings = document.querySelector('.settingsMenu');
    MainMenuSettings.style.display = 'flex';
    // Volume slider
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeValue = document.getElementById('volumeValue');
    volumeSlider.addEventListener('input', function () {
        updateVolume(this.value);
    });
    // Difficulty slider
    const difficultySlider = document.getElementById('difficultySlider');
    const difficultyValue = document.getElementById('difficultyValue');
    difficultySlider.addEventListener('input', function () {
        updateDifficulty(this.value);
    });
    // Dev tools
    const customCheckbox = document.querySelector('.devMenuBox')
    customCheckbox.addEventListener('click', function () {
        toggleDevTools(customCheckbox.checked);
    });

    function updateVolume(value) {
        volumeSlider.value = value;
        volumeValue.textContent = value;
    }

    function updateDifficulty(value) {
        difficultySlider.value = value;
        switch (difficultySlider.value) {
            case "0":
                difficultyValue.textContent = 'casual';
                break;
            case "1":
                difficultyValue.textContent = 'moderate';
                break;
            case "2":
                difficultyValue.textContent = 'difficult';
                break;
        }
    }

    const developerMenu = document.querySelector('.developerMenu')
    function toggleDevTools(bool) {
        const devTools = document.querySelector('.devMenuBox')
        if (bool) {
            devTools.checked = true;
            developerMenu.style.display = 'block';
            // Local cache clear button
            document.querySelector('.clearLocalCache').addEventListener('click', function (event) {
                event.preventDefault();
                localStorage.removeItem('userData');
                devTools.checked = false;
                MainMenuSettings.style.display = 'none';
                MainMenuMenu.style.display = 'flex';
                return;
            });
            // Level + gems menu
            document.getElementById('devApply').addEventListener('click', function (event) {
                event.preventDefault();
                const level = document.getElementById("level").value
                const gems = document.getElementById("gems").value
                defaultUserData.level = level;
                defaultUserData.gems = gems;
                localStorage.setItem('userData', JSON.stringify(defaultUserData));
            });
        } else {
            devTools.checked = false;
            developerMenu.style.display = 'none';
        }
    }

    // Stored data
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
        const userDataObj = JSON.parse(storedUserData);
        updateVolume(userDataObj.audioLevel)
        updateDifficulty(userDataObj.difficulty)
        toggleDevTools(userDataObj.developerMode);
    } else {
        defaultUserData.audioLevel = volumeSlider.value;
        defaultUserData.difficulty = difficultySlider.value;
        defaultUserData.developerMode = customCheckbox.checked;
    }

    // BackButton
    const backButton = document.querySelector('.backButton1');
    backButton.addEventListener('click', () => {
        defaultUserData.audioLevel = volumeSlider.value;
        defaultUserData.difficulty = difficultySlider.value;
        defaultUserData.developerMode = customCheckbox.checked;
        localStorage.setItem('userData', JSON.stringify(defaultUserData));
        // Return to main menu
        MainMenuSettings.style.display = 'none';
        MainMenuMenu.style.display = 'flex';
    });
}

async function collectibleCount(bitmapURL) {
    const res = await readBitmap("data/" + bitmapURL)
    const objArr = res[0]
    let count = 0;
    objArr.forEach(obj => {
        if (obj.objectType === "yellow") {
            count++
        }
    });

    return count
}

export { waitForMainMenu }
