let display = document.getElementById('inputbox');
let buttons = document.querySelectorAll('button');
let buttonsArray = Array.from(buttons);
let string = "";
// text will be adjusted automatically
const fontSize =()=>{
    const maxFontSize = 50 ;
    const minFontSize = 30;
    let fontSize = maxFontSize ;
    display.style.fontSize = fontSize +"px";
    while((display.scrollWidth > display.clientWidth) && (fontSize > minFontSize)){
        fontSize -- ;
        display.style.fontSize = fontSize +"px";
    }
    if( fontSize === minFontSize && display.scrollWidth > display.clientWidth){
        display.style.overflowX = "auto";
        display.scrollLeft = display.scrollWidth;
    }else{
        display.style.overflowX = "hidden";
        display.scrollLeft = 0;

    }
};
//Results with commas (Inidan commas system)
const ResultWithCommas = (numString) => {
   if(!isNaN(numString)){
        return Number(numString).toLocaleString("en-IN");//this is used for indian commas System
   }
   return numString;
};
// Update input box value and font size
const updateDisplay= () => {
    display.value = string ;
    fontSize();
  };
  const convertExponent =(exp) =>{
      return exp.replace(/(\d+)\^(\d+)/g,'Math.pow($1,$2)');
  };
  //functiionality of buttons clicks
buttonsArray.forEach(btn =>{
btn.addEventListener('click',(e)=>{
    let buttonClick = e.target.innerHTML 
if( buttonClick ==='='){
    try{
        const raw = string.replace(/×/g,'*').replace(/÷/g,'/');
        let evalString = convertExponent(raw);
        let result = eval(evalString).toString();
        string = ResultWithCommas(result);
    }catch{
        string = "Syntax Error";
    }  
}else if( buttonClick === 'AC'){
    string ="";
}
else if( buttonClick === '⌫'){
     string = string.slice(0,-1);
}
else{
    string += buttonClick ;
}
   updateDisplay();
});
});
//keyboardd input supports
display.addEventListener('keydown',(e) =>{
    const allowedKeys = [
        '0','1','2','3','4','5','6','7','8','9',
        '+','-','*','/','.','^','Enter',
        'Backspace','ArrowLeft','ArrowRight','Tab'
    ];

    if (!allowedKeys.includes(e.key)) {
        e.preventDefault();
        return;
    }
    if(e.key === 'Enter'){
         try {
            const raw = string.replace(/×/g,'*').replace(/÷/g,'/');
            let evalString = convertExponent(raw);
            let result = eval(evalString).toString();
            string = ResultWithCommas(result);
        } catch {
            string = "Syntax Error";
        }
        updateDisplay();
    }
});
// clipboard sanitization
display.addEventListener('paste', (e) => {
    const data = e.clipboardData.getData('text');
    if (!/^[0-9+\-*/.^]+$/.test(data)) {
        e.preventDefault();
    }
});

display.addEventListener('input', (e) => {
    const cleaned = e.target.value.replace(/[^0-9+\-*/.^]/g, '');
    if (cleaned !== e.target.value) {
        e.target.value = cleaned;
    }
    string = cleaned;
    fontSize();
});