
const slider = document.getElementById("slider");
const characterLengthDisplay = document.getElementById("slider-value");
const copiedText = document.getElementById('copied')
const copyImage = document.getElementById('copyImage');
const generateButton = document.getElementById("generate-button");
const uppercaseCheckBox = document.getElementById('Uppercase');
const lowercaseCheckBox = document.getElementById('Lowercase')
const symbolsCheckBox = document.getElementById('Symbols')
const numbersCheckBox = document.getElementById('Numbers')
const signalStrength = document.getElementById('signal-strength');
const strengthbar = document.getElementsByClassName('strengthbar');


generateButton.addEventListener('click', generatePassword);
copyImage.addEventListener('click', copyPassword);


slider.value = 10;
characterLengthDisplay.textContent = slider.value;
slider.addEventListener("input", function() {
    characterLengthDisplay.textContent = slider.value;
});

slider.addEventListener("input", updateSliderBackground);
updateSliderBackground();
function updateSliderBackground() {
    const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
    slider.style.background = `linear-gradient(
    to right,
    var(--Green200) 0%,
    var(--Green200) ${value}%,
    var(--Grey850) ${value}%,
    var(--Grey850) 100%
    )`;
    characterLengthDisplay.textContent = slider.value;
    copiedText.style.visibility = 'hidden';
}


async function copyPassword() {
    let text = document.getElementById('password-field').value;
    try {
        await navigator.clipboard.writeText(text);
        copiedText.style.visibility = 'visible';

    } catch (err) {
        console.error('Failed to copy: ', err);
        copiedText.style.visibility = 'hidden';
    }
}


let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let lowercase = "abcdefghijklmnopqrstuvwxyz";
let numbers = "0123456789";
let symbols = "!@#$%^&*()_+[]{}|;:,.<>?";


function generatePassword() {
    let characters = ''
    if (uppercaseCheckBox.checked) {
        characters += uppercase;
    }
    if (lowercaseCheckBox.checked) {
        characters += lowercase;
            
    } 
    if (numbersCheckBox.checked) {
        characters += numbers;
        
    }
    if (symbolsCheckBox.checked) {
        characters += symbols;
        
    } if (!uppercaseCheckBox.checked && !lowercaseCheckBox.checked && !numbersCheckBox.checked && !symbolsCheckBox.checked) {
    characters = lowercase;
    }

    let password = '';
    const length = slider.value;
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    document.getElementById('password-field').value = password;
    copiedText.style.visibility = 'hidden';
    checkSignalStrength();
}

function checkSignalStrength() {
    let color;
    let visibleBars = 0;

    if (slider.value <= 7) {
        signalStrength.textContent = 'WEAK';
        signalStrength.style.color = 'var(--Red500)';
        signalStrength.style.visibility = 'visible';
        color = 'var(--Red500)';

        visibleBars = 1;
    } else if (slider.value < 15) {
        signalStrength.textContent = 'MODERATE';
        signalStrength.style.color = 'var(--Yellow300)';
        signalStrength.style.visibility = 'visible';
        color = 'var(--Yellow300)';
        visibleBars = 2;
    } else {
        signalStrength.textContent = 'STRONG';
        signalStrength.style.color = 'var(--Green200)';
        signalStrength.style.visibility = 'visible';
        color = 'var(--Green200)';
        visibleBars = 4;
    }

    for (let i = 0; i < strengthbar.length; i++) {
        if (i < visibleBars) {
            strengthbar[i].style.backgroundColor = color;
            strengthbar[i].style.border = 'none';
        } else {
            strengthbar[i].style.backgroundColor = 'transparent';
            strengthbar[i].style.border = '1px solid var(--Grey500)';
        }
    }
}