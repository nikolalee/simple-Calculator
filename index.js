var buttonContainer = document.getElementById('button-container');
var inputContent = document.getElementById('input');
var buttonArr = buttonContainer.children;
var inputArr = [];
var inputCount = 0;
var numArr = [];
var numCount = 0;
var calArr = [];
var calCount = 0;
var isCalcable = true;
var reg = new RegExp('[0-9]','i');
var next = false;
function clickButton(){
    for (var i = 0; i < buttonArr.length; i++) {
        if (buttonArr[i].innerHTML === 'AC') {
            buttonArr[i].onclick = function () {
                next = true;
                inputContent.value = '';
                isCalcable = true;
            }
        } else if (buttonArr[i].innerHTML === 'CE') {
            buttonArr[i].onclick = function () {
                var len = inputContent.value.length;
                inputContent.value = inputContent.value.slice(0, len - 1);
            }
        } else if (buttonArr[i].innerHTML === 'ANS') {

        } else if (buttonArr[i].innerHTML === '=') {
            buttonArr[i].onclick = function() {
                next = true;
                if (isCalcable === true) {
                    calculator(inputContent.value);
                } else {
                    alert('The input is wrong!');
                }
            }
        } else if (reg.test(buttonArr[i].innerHTML)) {
            buttonArr[i].onclick = function () {
                if(next === true){
                    init();
                }
                if(inputCount === 0){
                    numArr[numCount] = this.innerHTML;
                    inputArr[inputCount++] = this.innerHTML;
                }else if(inputCount === 1){
                    if(inputArr[inputCount-1] === '-'){
                        numArr[numCount] = '-';
                        numArr[numCount] += this.innerHTML;
                        inputArr[inputCount++] = this.innerHTML;
                    }else if (reg.test(inputArr[inputCount - 1])) {
                        numArr[numCount] += this.innerHTML;
                        inputArr[inputCount++] = this.innerHTML;
                    } else{
                        isCalcable = false;
                    }
                }
                else {
                    if (reg.test(inputArr[inputCount - 1])) {
                        numArr[numCount] += this.innerHTML;
                        inputArr[inputCount++] = this.innerHTML;
                    } else {
                        numArr[++numCount] = this.innerHTML;
                        inputArr[inputCount++] = this.innerHTML;
                    }
                }
                inputContent.value += this.innerHTML;
            }
        } else {

            buttonArr[i].onclick = function () {
                if(next === true){
                    init();
                }
                if(inputCount === 0){
                    if(this.innerHTML === '-'){
                        inputArr[inputCount++] = this.innerHTML;
                    }else if(this.innerHTML === '+'){
                    }else{
                        inputArr[inputCount++] = this.innerHTML;
                        isCalcable = false;
                    }
                }else {
                    if (reg.test(inputArr[inputCount - 1])) {
                        calArr[calCount++] = this.innerHTML;
                        inputArr[inputCount++] = this.innerHTML;
                    } else {
                        isCalcable = false;
                        inputArr[inputCount++] = this.innerHTML;
                    }
                }
                inputContent.value += this.innerHTML;
            }
        }
    }

}
function calculator(){
    numArr.forEach(function(item,index){
        numArr[index] = parseInt(item);
    });
    var calNumArr = [];
    var operatorArr = [];
    numCount =0;
    calNumArr[0] = numArr[0];
    for(var i = 0;i< calArr.length;i++){
        if(calArr[i] ==='*'||calArr[i]==='/'||calArr[i]==='%'){
            switch(calArr[i]){
                case '*':
                    calNumArr[numCount] = calNumArr[numCount]*numArr[i+1];
                    break;
                case '/':
                    calNumArr[numCount] = calNumArr[numCount]/numArr[i+1];
                    break;
                case '%':
                    calNumArr[numCount] = calNumArr[numCount]%numArr[i+1];
                    break;
                default:
                    break;
            }
        }else{
            calNumArr[++numCount]=numArr[i+1] ;
            operatorArr.push(calArr[i]);
        }
    }
    var result = calNumArr[0];
    for(i = 0;i< operatorArr.length;i++){
        if(operatorArr[i] === '-'){
            result = result - calNumArr[i+1];
        }else if(operatorArr[i] === '+'){
            result = result +calNumArr[i+1];
        }
    }
    inputContent.value =inputContent.value+ " = "+result;
}
function init(){
    inputContent.value = '';
    inputArr = [];
    inputCount = 0;
    numArr = [];
    numCount = 0;
    calArr = [];
    calCount = 0;
    isCalcable = true;
    next = false;
}
window.onload = function() {
    clickButton();
};
