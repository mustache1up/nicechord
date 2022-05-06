var chordMapping = {
    "Digit1": {
        "chordName": "a",
        "buttonType": "maj",
    },
    "KeyQ": {
        "chordName": "a",
        "buttonType": "min",
    },
    "KeyA": {
        "chordName": "a",
        "buttonType": "maj7",
    },

    "Digit2": {
        "chordName": "bb",
        "buttonType": "maj",
    },
    "KeyW": {
        "chordName": "bb",
        "buttonType": "min",
    },
    "KeyS": {
        "chordName": "bb",
        "buttonType": "maj7",
    },

    "Digit3": {
        "chordName": "b",
        "buttonType": "maj",
    },
    "KeyE": {
        "chordName": "b",
        "buttonType": "min",
    },
    "KeyD": {
        "chordName": "b",
        "buttonType": "maj7",
    },
}

var currentPressedKeys = {}

var currentChordName = null
var currentChordPressedButtons = {
    "maj": false,
    "min": false,
    "maj7": false,
}

var currentChordVariation = null
var lastE = undefined

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function handleKeyDown(event) {
    lastE = event
    if(currentPressedKeys[event.code]) {
        return
    }
    currentPressedKeys[event.code] = true
    const x = chordMapping[event.code]
    if(!x) {
        return
    }
    console.log(event.code + " - down")
    if(x.chordName !== currentChordName) {
        currentChordPressedButtons = {
            "maj": false,
            "min": false,
            "maj7": false,
        }
        // reset all pressed keys?
    }
    currentChordName = x.chordName
    currentChordPressedButtons[x.buttonType] = true
    currentChordVariation = evaluateChordVariation()

    document.querySelectorAll('#current-chord')[0].textContent = currentChordPrettyName()
    // pressedChordButtons[event.code] = {}

    document.querySelectorAll('#chord-btn-' + x.chordName + '-' + x.buttonType)[0].style.border = '1px solid orange'

    console.log("currentChordName -> " + currentChordName)
    console.log("currentChordPressedButtons -> ", currentChordPressedButtons)
    console.log("currentChordVariation -> " + currentChordVariation)
}

function handleKeyUp(event) {
    currentPressedKeys[event.code] = false
    const x = chordMapping[event.code]
    if(!x) {
        return
    }
    console.log(event.code + " - up")
    if(x.chordName !== currentChordName) {
        return
    }
    currentChordPressedButtons[x.buttonType] = false
    currentChordVariation = evaluateChordVariation()
    
    if(!currentChordVariation) { // && hold chord false
        currentChordName = null
    }

    document.querySelectorAll('#current-chord')[0].textContent = currentChordPrettyName()
    // lastE = event
    // pressedChordButtons[event.code] = undefined

    document.querySelectorAll('#chord-btn-' + x.chordName + '-' + x.buttonType)[0].style.border = '1px dotted gray'

    console.log("currentChordName -> " + currentChordName)
    console.log("currentChordPressedButtons -> ", currentChordPressedButtons)
    console.log("currentChordVariation -> " + currentChordVariation)
}

function currentChordPrettyName() {
    if(!currentChordName) {
        return "-"
    }
    const chordRoot = currentChordName.charAt(0).toUpperCase() + currentChordName.slice(1)
    var variation = null
    switch (currentChordVariation) {
        case 'maj':
            variation = ''
            break;
        case 'min':
            variation = 'm'
            break;
        case 'maj7':
            variation = '7'
            break;
        case 'maj7+':
            variation = '7+'
            break;
        case 'min7':
            variation = 'm7'
            break;
        case 'dim':
            variation = 'dim'
            break;
        case 'aug':
            variation = 'aug'
            break;
    }
    return chordRoot + variation
}

function evaluateChordVariation() {

    const btn = currentChordPressedButtons

    if(!btn.maj && !btn.min && !btn.maj7) {
        return null
    }

    if(btn.maj && !btn.min && !btn.maj7) {
        return 'maj'
    }
    
    if(!btn.maj && btn.min && !btn.maj7) {
        return 'min'
    }
    
    if(!btn.maj && !btn.min && btn.maj7) {
        return 'maj7'
    }
    
    if(btn.maj && !btn.min && btn.maj7) {
        return 'maj7+'
    }
    
    if(!btn.maj && btn.min && btn.maj7) {
        return 'min7'
    }

    if(btn.maj && btn.min && !btn.maj7) {
        return 'dim'
    }
        
    if(btn.maj && btn.min && btn.maj7) {
        return 'aug'
    }
}

