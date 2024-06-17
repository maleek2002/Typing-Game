let TIME_LIMIT = 90; 
  
let quotes_array = [ 
  "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma", 
  "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", 
  "You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us. And the world will live as one.", 
  "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", 
  "You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose.", 
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment"
]; 
  
let timer_text = document.querySelector(".curr_time"); 
let accuracy_text = document.querySelector(".curr_accuracy"); 
let error_text = document.querySelector(".curr_errors"); 
let cpm_text = document.querySelector(".curr_cpm"); 
let wpm_text = document.querySelector(".curr_wpm"); 
let quote_text = document.querySelector(".quote"); 
let input_area = document.querySelector(".input_area"); 
let restart_btn = document.querySelector(".restart_btn"); 
let cpm_group = document.querySelector(".cpm"); 
let wpm_group = document.querySelector(".wpm"); 
let error_group = document.querySelector(".errors"); 
let accuracy_group = document.querySelector(".accuracy"); 
  
let timeLeft = TIME_LIMIT; 
let timeElapsed = 0; 
let total_errors = 0; 
let errors = 0; 
let accuracy = 0; 
let characterTyped = 0; 
let current_quote = ""; 
let quoteNo = 0; 
let timer = null; 

function updateQuote() { 
    quote_text.textContent = null; 
    current_quote = quotes_array[quoteNo]; 
    

    current_quote.split('').forEach(char => { 
      const charSpan = document.createElement('span') 
      charSpan.innerText = char 
      quote_text.appendChild(charSpan) 
    }) 
    
    if (quoteNo < quotes_array.length - 1) 
      quoteNo++; 
    else
      quoteNo = 0; 
  } 
  function processCurrentText() { 
  
    curr_input = input_area.value; 
    curr_input_array = curr_input.split(''); 
     
    characterTyped++; 
    
    errors = 0; 
    
    quoteSpanArray = quote_text.querySelectorAll('span'); 
    quoteSpanArray.forEach((char, index) => { 
      let typedChar = curr_input_array[index] 
    
     
      if (typedChar == null) { 
        char.classList.remove('correct_char'); 
        char.classList.remove('incorrect_char'); 
    
      
      } else if (typedChar === char.innerText) { 
        char.classList.add('correct_char'); 
        char.classList.remove('incorrect_char'); 
    
    
      } else { 
        char.classList.add('incorrect_char'); 
        char.classList.remove('correct_char'); 
    

        errors++; 
      } 
    }); 
    
    error_text.textContent = total_errors + errors; 
    
    let correctCharacters = (characterTyped - (total_errors + errors)); 
    let accuracyVal = ((correctCharacters / characterTyped) * 100); 
    accuracy_text.textContent = Math.round(accuracyVal); 
    
 
    if (curr_input.length == current_quote.length) { 
      updateQuote(); 
    
      total_errors += errors; 
    
      input_area.value = ""; 
    } 
  } 
  function startGame() { 
  
    resetValues(); 
    updateQuote(); 
    
    clearInterval(timer); 
    timer = setInterval(updateTimer, 1000); 
  } 
    
  function resetValues() { 
    timeLeft = TIME_LIMIT; 
    timeElapsed = 0; 
    errors = 0; 
    total_errors = 0; 
    accuracy = 0; 
    characterTyped = 0; 
    quoteNo = 0; 
    input_area.disabled = false; 
    
    input_area.value = ""; 
    quote_text.textContent = 'Click on the area below to start the game.'; 
    accuracy_text.textContent = 100; 
    timer_text.textContent = timeLeft + 's'; 
    error_text.textContent = 0; 
    restart_btn.style.display = "none"; 
    cpm_group.style.display = "none"; 
    wpm_group.style.display = "none"; 
  } 
  function updateTimer() { 
    if (timeLeft > 0) { 
    
      timeLeft--; 
    
      
      timeElapsed++; 
    
     
      timer_text.textContent = timeLeft + "s"; 
    } 
    else { 
    
      finishGame(); 
    } 
  } 
  function finishGame() { 

    clearInterval(timer); 
    

    input_area.disabled = true; 
    
  
    quote_text.textContent = "Click on restart to start a new game."; 
    
 
    restart_btn.style.display = "block"; 
    
   
    cpm = Math.round(((characterTyped / timeElapsed) * 60)); 
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60)); 
    
    cpm_text.textContent = cpm; 
    wpm_text.textContent = wpm; 
    
 
    cpm_group.style.display = "block"; 
    wpm_group.style.display = "block"; 
  } 