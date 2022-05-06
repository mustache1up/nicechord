var chordMapping = {
    "a": {
        "maj": "KeyQ",
        "min": "KeyA",
        "maj7": "KeyZ",
    },
    "a#": {
        "maj": "KeyW",
        "min": "KeyS",
        "maj7": "KeyX",
    },
}

var chordMappingReverse = {
    "KeyQ": {
        "chordName": "a",
        "buttonType": "maj",
    },
    "KeyA": {
        "chordName": "a",
        "buttonType": "min",
    },
    "KeyZ": {
        "chordName": "a",
        "buttonType": "maj7",
    },

    "KeyW": {
        "chordName": "a#",
        "buttonType": "maj",
    },
    "KeyS": {
        "chordName": "a#",
        "buttonType": "min",
    },
    "KeyX": {
        "chordName": "a#",
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
    if(currentPressedKeys[event.code]) {
        return
    }
    currentPressedKeys[event.code] = true
    const x = chordMappingReverse[event.code]
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
    }
    currentChordName = x.chordName
    currentChordPressedButtons[x.buttonType] = true
    currentChordVariation = evaluateChordVariation()
    // lastE = event
    // pressedChordButtons[event.code] = {}
    console.log("currentChordName -> " + currentChordName)
    console.log("currentChordPressedButtons -> ", currentChordPressedButtons)
    console.log("currentChordVariation -> " + currentChordVariation)
}

function handleKeyUp(event) {
    currentPressedKeys[event.code] = false
    const x = chordMappingReverse[event.code]
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
    // lastE = event
    // pressedChordButtons[event.code] = undefined
    console.log("currentChordName -> " + currentChordName)
    console.log("currentChordPressedButtons -> ", currentChordPressedButtons)
    console.log("currentChordVariation -> " + currentChordVariation)
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

