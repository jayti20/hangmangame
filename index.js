const wordEl=document.getElementById("word");
const wrongLetterEl=document.getElementById("wrong-letters");
const playAgainBtn=document.getElementById("play-button");
const popup=document.getElementById("popup-container");
const notification=document.getElementById("notification-container");
const finalMessage=document.getElementById("final-message");
const finalMessageRevealWord=document.getElementById("final-message-reveal-word");


const figureParts=document.querySelectorAll(".figure-part") //trying to select a class name i.e figure part
const words=["interactive","amuse","mosquito",
"production",
"virus",
"detail",
"opinion",
"mess",
"rainbow",
"consolidate"];

let selectedWord=words[Math.floor(Math.random()*words.length)];
console.log(selectedWord);

let playable=true;

const correctLetters=[];
const wrongLetters=[];

//Show hidden
function displayWord()
{
    wordEl.innerHTML=`
    ${selectedWord.split('').map(letter=>{
        return `<span class="letter">
        ${correctLetters.includes(letter)?letter:''}
        </span>`
    }).join('')} 
    `;

    const innerWord=wordEl.innerText.replace(/[ \n]/g,'');
    console.log(innerWord);
    if(innerWord===selectedWord)
    {
        finalMessage.innerText="Congratulations! You won."
        popup.style.display="flex";
        playable=false;
    }
}


function showNotification()
{
    notification.classList.add("show");
    
    
    alert("The letter has already been pressed");

    //console.log(notifiqcation.classList);
    

    setTimeout(function()
    {
        notification.classList.remove("show");
        

    },2000);
}

function updateWrongLettersEl()
{
    wrongLetterEl.innerHTML=`
    ${wrongLetters.length>0?`<p>Wrong Letters</p>`:''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `
    figureParts.forEach((part,index)=>{
        const errors=wrongLetters.length;
        if(index<errors){ //we have 4 letters, 4 wrong letters, we gotta show head,body,left arm and right arm
            part.style.display="block";
        }
        else
        {
            part.style.display="none";
        }
    })

    if(wrongLetters.length===figureParts.length)
    {
        finalMessage.innerText="You lost!";
        popup.style.display="flex";
        playable=false;
    }
}
//add event listener for key press

window.addEventListener('keydown',e=>{
    if(playable)
    {
        if((e.keyCode>=65 && e.keyCode<=90))
        {
             const letter=e.key.toLowerCase();
             if(selectedWord.includes(letter))
             { 
                 if(!correctLetters.includes(letter))
                 {
                      correctLetters.push(letter);
                      console.log(correctLetters);
                      displayWord(); 
                 }
                 else
                 {
                     showNotification();
                 }
             }
             else
             { //letter not in string and not present
                 if(!wrongLetters.includes(letter))
                 {
                     wrongLetters.push(letter);
                     updateWrongLettersEl();

                 }
                 else
                 { //letter not in string and already pressed
                     showNotification();
                 }
             }
        }
    }
})
//restart the game
playAgainBtn.addEventListener('click', function(){
    playable=true;
    correctLetters.splice(0); //mutates the current array
    wrongLetters.splice(0);

    selectedWord=words[Math.floor(Math.random()*words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display="none";
})
displayWord();


