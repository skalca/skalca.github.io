
var getRandomWord = (letter) => {
    let tileSet = tiles[letter];
    return tileSet[Math.floor(Math.random() * tileSet.length)];
};

var getRandomClass = () => {
    return tileColors[Math.floor(Math.random() * tileColors.length)];
};

var changeMode = (newMode) => {
    console.log('Mode changed to', newMode);
    mode = newMode;
    hide("colors");
    hide("numbers");
    showIcons();
    show("letters");

    if (newMode == "letters") {
        setActiveLink("aLetters");
    } else if (newMode == "words") {
        setActiveLink("aWords");
    } else if (newMode == "whereis") {
        setActiveLink("aWhereIs");
    } else {
        setActiveLink("aSpelling");
    }
}

var showNumbers = () => {
    hideIcons();
    hide("colors");
    hide("letters");
    show("numbers");
    setActiveLink("aNumbers");
}

var showColors = () => {
    hideIcons();
    hide("numbers");
    hide("letters");
    show("colors");
    setActiveLink("aColors");
}

var whereIs = () => {    
    changeMode("whereis");
    // Pick a random tile from those currently on-screen
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    findMeTileWord = document.getElementById('word_' + randomLetter).innerHTML;

    console.log('You need to find ' + findMeTileWord);
    speak(undefined, findMeTileWord);    
}

var hide = (id) => {
    console.log('Hidding ', id);
    document.getElementById(id).style.display = 'none';
}

var show = (id) => {
    console.log('Showing ', id);
    document.getElementById(id).style.display = 'flex';
}

var hideIcons = () => {
    hideShowIcons('none', '33%');
}

var showIcons = () => {
    hideShowIcons('block', '20%');
   //hideShowIcons('block', '16.6%');
}

var hideShowIcons = (vis, wid) => {
    document.getElementById("aWords").style.display = vis;
    //document.getElementById("aSpelling").style.display = vis;
    document.getElementById("aWhereIs").style.display = vis;

    document.getElementById("aLetters").style.width = wid;
    document.getElementById("aNumbers").style.width = wid;
    document.getElementById("aColors").style.width = wid;
}

var setActiveLink = (id) => {
    // Remove active class
    document.getElementById("aLetters").className = document.getElementById("aLetters").className.replace(/\bactive\b/g, "");
    document.getElementById("aWords").className = document.getElementById("aWords").className.replace(/\bactive\b/g, "");
    //document.getElementById("aSpelling").className = document.getElementById("aSpelling").className.replace(/\bactive\b/g, "");
    document.getElementById("aWhereIs").className = document.getElementById("aWhereIs").className.replace(/\bactive\b/g, "");
    document.getElementById("aNumbers").className = document.getElementById("aNumbers").className.replace(/\bactive\b/g, "");
    document.getElementById("aColors").className = document.getElementById("aColors").className.replace(/\bactive\b/g, "");
    
    // Add only for active link
    var element, name, arr;
    element = document.getElementById(id);
    name = "active";
    arr = element.className.split(" ");
    if (arr.indexOf(name) == -1) {
        element.className += " " + name;
    }
}

var processingTile = false;

/**
 * We change the word, icon and color of clicked tile with random word
 * beginning with passed letter.
 * 
 * @param {string} letter Letter of a tile on which the user has clicked 
 */
var processTile = (letter) => {

    // Processing tile takes about 1 second (see below)
    // In this time we interact with a tile.
    if (processingTile == true) {
        return;
    }

    processingTile = true;

    if (mode == "whereis") {
        // We are in the WhereIs? mode
        // Do not change tile, but check if a tile
        // user pressed is of the same letter as the
        // find-me-word
        if (findMeTileWord == document.getElementById('word_' + letter).innerHTML) {
            console.log('You found the word! BRAVO!');
            speakHurray();
            // Wait 1 second for audio to finish
            setTimeout(function() {
                processingTile = false;
            }, 1000);
            changeMode("letters");
        } else {
            speakTryAgain();
            // Wait 1 second for audio to finish
            setTimeout(function() {
                processingTile = false;
            }, 1000);
            console.log('Uh no, try again!');
        }
        return;
    }

    let tile = document.getElementById(letter);
    let tileText = document.getElementById('letter_' + letter);
    let tileImg  = document.getElementById('img_' + letter);
    let tileWord = document.getElementById('word_' + letter);

    speak(letter, tileWord.innerHTML);
    // TODO: animate

    // Wait 1 second for audio to finish and then
    // change tile to something else.
    setTimeout(function() {
        let newWord = getRandomWord(letter);
        let sentinel = 10;
        while (newWord === tileWord.innerHTML && sentinel > 0) {
            sentinel = sentinel - 1;
            newWord = getRandomWord(letter);
        }
        tileWord.innerHTML = newWord;
        tileImg.src = 'imgs/tiles/' + newWord.toLowerCase() + '.png';
        tileColors.forEach((color) => {
            tile.classList.remove(color);
        });    
        tile.classList.add(getRandomClass());

        processingTile = false;
    }, 1000);    
};

var processNumber = (number) => {
    // Processing tile takes about 1 second (see below)
    // In this time we interact with a tile.
    if (processingTile == true) {
        return;
    }
    processingTile = true;
    
    speakNumber(number);
    // TODO: animate

    // Wait 1 second for audio to finish
    setTimeout(function() {
        processingTile = false;
    }, 1000);
}

var processColor = (color) => {
    // Processing tile takes about 1 second (see below)
    // In this time we interact with a tile.
    if (processingTile == true) {
        return;
    }
    processingTile = true;
   
    speakColor(color);
    // TODO: animate
   
    // Wait 1 second for audio to finish
    setTimeout(function() {
        processingTile = false;
    }, 1000);
}

var speak = (letter, word) => {
    if (mode === 'letters') {
        let a = new Audio('audio/letters/' + letter.toLowerCase() + '.wav');
        a.play();
    } else if (mode === 'words') {
        let a = new Audio('audio/words/' + word.toLowerCase() + '.wav');
        a.play();
    } else if (mode === 'whereis') {
        let a = new Audio('audio/whereis/whereis.wav');
        a.play();
        setTimeout(function() {
            let a = new Audio('audio/words/' + word.toLowerCase() + '.wav');
            a.play();
            processingTile = false;
        }, 1000);        
    } else if (mode === "spelling") {
        console.log("Spell ", word);
    }
};

var speakNumber = (number) => {    
    let a = new Audio('audio/numbers/' + number + '.wav');
    a.play();
};

var speakColor = (color) => {    
    let a = new Audio('audio/colors/' + color + '.wav');
    a.play();
};

var speakTryAgain = () => {    
    let a = new Audio('audio/whereis/tryagain.wav');
    a.play();
};

var speakHurray = () => {    
    let a = new Audio('audio/whereis/foundit.wav');
    a.play();
};

/**
 * 
 * @param {Object} tile Tile of which to build HTML presentation 
 */
var getHTMLLetter = (tile) => {

    let str =   "<div id='" + tile.letter + "' class='tile hand " + tile.class + "' onclick='processTile(this.id)'>";
    str = str + "<div class='base-text letter' id='letter_" + tile.letter + "'>" + tile.letter + "</div>";
    str = str + "<div><img class='icon' id='img_" + tile.letter + "' src='imgs/tiles/" + tile.word.toLowerCase() + ".png'></div>";
    str = str + "<div class='base-text text' id='word_" + tile.letter + "'>" + tile.word + "</div>";
    str = str + "</div>";

    return str;
};

var getHTMLNumber = (tile) => {

    let str = "<div id='" + tile.letter + "' class='tile hand " + tile.class + "' onclick='processNumber(this.id)'>";
    str = str + "<div class='base-text number'>" + tile.letter + "</div>";
    str = str + "<div class='base-text text-number'>" + tile.word + "</div>";
    str = str + "</div>";

    return str;
};

var getHTMLColor = (tile) => {

    let str = "<div id='" + tile.word.toLowerCase() + "' class='tile hand' style='background-color: " + tile.color + "; color: " + tile.textcolor + "' onclick='processColor(this.id)'>";
    str = str + "<div class='base-text text-number' style='color: " + tile.textcolor + "'>" + tile.word + "</div>";
    str = str + "</div>";

    return str;
};

var openAboutApp = () => {    
    var modal = document.getElementById('modAboutApp');
    modal.style.display = 'block';
};

// https://www.w3schools.com/howto/howto_css_modals.asp
var setAboutAppModal = () => {
    // Get the modal
    var modal = document.getElementById('modAboutApp');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};

/**
 *  Init
 */
(function() {

    // Set initial tiles (randomly picked from a set of predefined tiles)
    let len = letters.length;
    for(var i = 0; i < len; i++) {
        
        let letter = letters[i];
        let tmp = {
            "letter" : letter,
            "word"   : "",      
            "class"  : "",
            "image"  : ""
          }
      
        let randomWord = getRandomWord(letter);
        tmp.word = randomWord;
        tmp.image = randomWord.toLowerCase();
        tmp.class = getRandomClass();

        document.getElementById("letters").innerHTML = document.getElementById("letters").innerHTML + getHTMLLetter(tmp);
    }

    numbers.forEach((number) => {
        document.getElementById("numbers").innerHTML = document.getElementById("numbers").innerHTML + getHTMLNumber(number);
    });

    colors.forEach((color) => {
        document.getElementById("colors").innerHTML = document.getElementById("colors").innerHTML + getHTMLColor(color);
    });

    setAboutAppModal();

})();

