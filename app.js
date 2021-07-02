let currentTitle = document.querySelector('.projectTitle')
currentTitle.classList.add('clickedTite');

let currentProject = document.querySelector('.eachProject')
currentProject.classList.add('currentProject');

 document.addEventListener('click',clickMe)

function clickMe (e){
    if(e.target.className === 'projectTitle'){
        //select title
        currentTitle.classList.remove('clickedTite')
        currentTitle = e.target
        e.target.classList.add('clickedTite')
        //apear the project
        currentProject.classList.remove('currentProject')
        let name = e.target.getAttribute('name')
        currentProject = document.getElementById(name)
        currentProject.classList.add('currentProject')
    }
}

// show tips
let tipBtn = document.querySelectorAll('.tipBtn');
let tipText = document.querySelectorAll('.tip');
tipBtn.forEach(element => {
    element.addEventListener('click',showHideTip)
});

let show = false;
function showHideTip (){
    show = show?false:true;
    tipBtn.forEach(element => {
        element.innerHTML = show?'Hide tip':'Show Tip';
    });   
    tipText.forEach(element=>{
        element.style.display=show?'block':'none'
    })
}



document.querySelector('.palindromeBtn').addEventListener('click',palindrome)
function palindrome (){
    let str = document.querySelector('.palindromeInput').value;
    const inputArr = str.replace(/[^0-9a-z]/gi, '').toUpperCase().split('');
    const reverseArr = [...inputArr].reverse();
    let result = inputArr.join('')==reverseArr.join('')?true:false; 
    document.querySelector('.palindromeCheck').innerHTML = result?`<p>It is Palindrome.</p>`:`<p>It isn't Palindrome.</p>`;
    document.querySelector('.palindromeCheck').style.color=result?'rgb(6, 255, 6)':'red';
}

document.querySelector('.romanBtn').addEventListener('click',Roman)
document.querySelector('.romanInput').addEventListener('change',Roman)
function Roman (){
    let num = document.querySelector('.romanInput').value;
    let numArr = String(num).split("").reverse().map((num)=>{
        return Number(num)
        })
        // let romanNum = [];
        let romanArr = [null,'I','II','III','IV','V','VI','VII','VIII','IX','X','XX','XXX','XL','L','LX','LXX','LXXX','XC','C','CC','CCC','CD','D','DC','DCC','DCCC','CM','M','MM','MMM'];
        numArr[0] = romanArr[numArr[0]];
        // console.log("first: "+numArr[0]);
        numArr[1] = numArr[1]==0?'': romanArr[numArr[1]+9];
        // console.log("second: "+numArr[1]);
        numArr[2] =numArr[2]==0?'': romanArr[numArr[2]+18];
        // console.log("third: "+numArr[2]);
        numArr[3] =numArr[3]==0?'': romanArr[numArr[3]+27];
        // console.log("forth: "+numArr[3]);
        numArr.reverse();
        let roman = numArr.join('');
        document.querySelector('.romanCheck').innerHTML =num>0&&num<10000?roman:`<p style='color:red;'>Please enter a number between 1 - 9999!</p>`    
}


document.querySelector('.caesarsBtn').addEventListener('click',caesars)
function caesars (){
    let str = document.querySelector('.caesarsInput').value;
    let textValidation = true;
    const alfabet = [...'abcdefghijklmnopqrstuvwxyz'];
    str = str.toLowerCase().split(''); 
    console.log(str);
    for(let i of str){
            if(alfabet.indexOf(i)===-1){
                textValidation = false
            }
    }
    let newStr = [];
    let output = str.map((i)=>{
        if(alfabet.indexOf(i)<0){
            newStr.push(i)
        }
        (alfabet.indexOf(i)<13 && alfabet.indexOf(i)>=0)?
        i =alfabet[alfabet.indexOf(i)+13]
        :i =alfabet[alfabet.indexOf(i)-13];
        newStr.push(i)     
    })
let result = newStr.join('').toUpperCase()
    document.querySelector('.caesarsCheck').innerHTML = textValidation?`<p>${result}</p>`:`<p style='color:red;'>Please enter only characters <strong> a-z</strong></p>`;
}

document.querySelector('.telephoneBtn').addEventListener('click',telephoneValidator)
function telephoneValidator (){
    let str = document.querySelector('.telephoneInput').value;

    let re = /^1?[- ]?(\(\d{3}\)|\d{3})[- ]?(\d{3})[- ]?(\d{4})$/
    let result = re.test(str)
    document.querySelector('.telephoneCheck').innerHTML = result?'The phone number is valid.':'The phone number is not valid.';
    document.querySelector('.telephoneCheck').style.color=result?'rgb(6, 255, 6)':'red';
}


















document.querySelector('.cashBtn').addEventListener('click',cashRegister)
function cashRegister (){
    let price = document.querySelector('.price').value;
    let cash = document.querySelector('.cash').value;
    let cidElements = document.getElementsByClassName('moneyInput');
    let cid = [];
    for(let i of cidElements){
        cid.push([i.id,Number(i.value)])
    }
    let state = cashRegisterCalculate (price,cash,cid)
    console.log(state);
    let itemsArr ;
    if(price>cash){
    //  state = {status: }
     itemsArr = "Sorry your cash is less than the price"
    }
   else{
       itemsArr = state.change.map(item=>`Status: ${state.status} <br>
       change: <li>${item}</li>`)
    }
   console.log(itemsArr);
    document.querySelector('.cashResult').innerHTML =itemsArr;
}

function cashRegisterCalculate (price,cash,cid){
    let state = {status: "", change: []}
    let change= cash-price;
    let cidTotal = 0;
    let cidOutput= cid.map((c)=>{
    cidTotal += c[1]
   });
   cidTotal = cidTotal.toFixed(2)
   console.log('cidTotal: '+cidTotal,'change: '+change);
   
    if(change>cidTotal){
        state = {status: "INSUFFICIENT_FUNDS", change: []}
        return state;
    }
    if(cash==price || change == cidTotal){
        state = {status: "CLOSED", change: [...cid]}
        return state;
    }
    if(change>0){
        let restChange = change;
        let newCid = [];
        console.log("restChange1: "+restChange);
            if( restChange>=100 && cid[8][1]!==0){
                cid[8][1]=(cid[8][1]>=restChange?(100*Math.floor(restChange/100)):cid[8][1]);
                restChange -= cid[8][1]
                console.log('restChange: '+restChange);
                newCid.push(cid[8])
                restChange = restChange.toFixed(2)
            } 
        
            if( restChange>=20 && cid[7][1]!==0) {
                cid[7][1]=(cid[7][1]>=restChange?(20*Math.floor(restChange/20)):cid[7][1]);
                restChange -= cid[7][1]
                console.log('cid[7][1]: '+cid[7][1]);
                newCid.push(cid[7])
                restChange = restChange.toFixed(2)
                console.log('restChange: '+restChange);
            }
            
            if(restChange>=10 && cid[6][1]!==0) {
                cid[6][1]=(cid[6][1]>=restChange?(10*Math.floor(restChange/10)):cid[6][1]);
                restChange -= cid[6][1]
                console.log('restChange: '+restChange);

                newCid.push(cid[6])
                restChange = restChange.toFixed(2)
            }
        
            if( restChange>=5 && cid[5][1]!==0) {

                cid[5][1]=(cid[5][1]>=restChange?(5*Math.floor(restChange/5)):cid[5][1]);

                restChange -= cid[5][1]
                
                newCid.push(cid[5])
                console.log('restChange: '+restChange);
                restChange = restChange.toFixed(2)
            }
        
            if( restChange>=1 && cid[4][1]!==0) {

                cid[4][1]=(cid[4][1]>=restChange?(1*Math.floor(restChange/1)):cid[4][1]);
                console.log(restChange);
                restChange -= cid[4][1]
                console.log('restChange: '+restChange);

                newCid.push(cid[4])
                restChange = restChange.toFixed(2)
                console.log('restChange: '+restChange);
            }
            
            if( restChange>=0.25 && cid[3][1]!==0) {
                console.log('restChange: '+restChange);
                cid[3][1]=(cid[3][1]>=restChange?(0.25*Math.floor(restChange/0.25)):cid[3][1]);
                console.log(cid[3][1]);
                restChange -= cid[3][1]
                
                newCid.push(cid[3])
                console.log(newCid);
                restChange = restChange.toFixed(2)
            }
            
            if( restChange>=0.1 && cid[2][1]!==0) {
                console.log('restChange: '+restChange);
                cid[2][1]=(cid[2][1]>=restChange?(0.1*Math.floor(restChange/0.1)):cid[2][1]);
                
                restChange -= cid[2][1]
                
                newCid.push(cid[2])
                console.log('restChange: '+restChange);
                restChange = restChange.toFixed(2)
            }
            
            if(restChange>=0.05 && cid[1][1]!==0) {
                console.log('restChange: '+restChange);
                cid[1][1]=(cid[1][1]>=restChange?(0.05*Math.floor(restChange/0.05)):cid[1][1]);

                restChange -= cid[1][1]
                
                newCid.push(cid[1])
                console.log('restChange: '+restChange);
                restChange = restChange.toFixed(2)

            }
                
            if(restChange>0.01 && cid[0][1]!==0){
                console.log('restChange: '+restChange);
                if(cid[0][1]>=restChange){
                    cid[0][1] = 0.01*Math.floor(restChange/0.01)
                    restChange -= cid[0][1]
                    console.log("cid[0][1]e: "+cid[0][1]);
                    newCid.push(cid[0])
                    restChange = restChange.toFixed(2)
                }      
                else{
                    state = {status: "INSUFFICIENT_FUNDS", change: []}
                    return state;
                }
            }
                    // should return : {status: "OPEN", change: [["QUARTER", 0.5]]}
                    state = {status: "OPEN", change: [...newCid]}
                    return state;
    }

}


// password generator
let copyBtn = document.getElementById('generalBtn');
copyBtn.addEventListener('click',copyTextFunction)
function copyTextFunction (){
    let copyText = document.getElementById('passwordGeneratorInput')
    copyText.select()
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    let pass = document.getElementById('passwordGeneratorInput').value
    if(pass!==''){copyBtn.classList.add('copied')
    copyBtn.innerHTML = 'Copied'}
    setTimeout(() => {
        copyBtn.classList.remove('copied')
        copyBtn.innerHTML = 'copy'
    }, 2000);
}
let generateBtn = document.getElementById('passwordGeneratorBtn');
generateBtn.addEventListener('click',passwordGenerator)
function passwordGenerator(){
    

    let passLength = +document.getElementById('passGenLength').value;
    let lowerCheck = document.getElementById('passGenUppercase').checked;
    let upperCheck = document.getElementById('passGenLowerCase').checked;
    let numCheck = document.getElementById('passGenNumber').checked;
    let symCheck = document.getElementById('passGenSymbol').checked;
    let lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    let upperCaseLetters = lowerCaseLetters.toUpperCase();
    let lowerCaseArr = [lowerCheck,[...lowerCaseLetters]];
    let upperCaseArr = [upperCheck,[...upperCaseLetters]];
    let numArr = [numCheck,["0","1","2","3","4","5","6","7","8","9"]];
    let symbols = [symCheck,[...'!@#$%^&*(){}[]=<>/,.']];
    let allArr = [lowerCaseArr,upperCaseArr,numArr,symbols]
    let finalArr=[];
    for(let i of allArr){
        if(i[0]){
            finalArr = [...finalArr,...i[1]]
        }
    }
    let randomPassArr = [];
    for(i=1;i<=passLength;i++){
        let randNum = Math.floor(Math.random()*finalArr.length)
        let randomChar = finalArr[randNum]
        randomPassArr.push(randomChar)
    }
    document.getElementById('passwordGeneratorInput').value = randomPassArr.join('');
    
    if(passLength>0){generateBtn.classList.add('copied')
        generateBtn.innerHTML = 'Password has been generated!'
        setTimeout(() => {
            generateBtn.classList.remove('copied')
            generateBtn.innerHTML = 'Generate Password'
        }, 2000);
    }
}
