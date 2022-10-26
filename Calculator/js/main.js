

const keyboardList = [
    {type: 'command', value: 'clear', label: 'C'},
    {type: 'command', value: 'toggle-minus', label: '+/-'},
    {type: 'command', value: 'percentage', label: '%'},
    {type: 'operator', value: 'divide', label: '/'},
    {type: 'number', value: '7', label: '7'},
    {type: 'number', value: '8', label: '8'},
    {type: 'number', value: '9', label: '9'},
    {type: 'operator', value: 'multiply', label: '*'},
    {type: 'number', value: '4', label: '4'},
    {type: 'number', value: '5', label: '5'},
    {type: 'number', value: '6', label: '6'},
    {type: 'operator', value: 'minus', label: '-'},
    {type: 'number', value: '1', label: '1'},
    {type: 'number', value: '2', label: '2'},
    {type: 'number', value: '3', label: '3'},
    {type: 'operator', value: 'plus', label: '+'},
    {type: 'number', value: '0', label: '0'},
    {type: 'command', value: '.', label: '.'},
    {type: 'command', value: 'equal', label: '='},
]

const keyboardArea = document.querySelector('#keyboard-area')

let lastNumber = 0;
let operationNumber = 0;
let lastOperator = '';
let isLastKeyOpeartor = false


const buildKeyboard = () => {
    keyboardList.forEach(item=>{
        const element = document.createElement('div')
        element.dataset.type = item.type
        element.dataset.value = item.value
        element.classList.add('key')
        element.classList.add(item.value)
        element.innerText = item.label
        element.addEventListener('click', clickKey)
        keyboardArea.appendChild(element)
    })
}
buildKeyboard()  // Build function before initialization !


function clickKey(e) {
    const dataset = e.target.dataset
    switch(dataset.type){
        case 'command': handleCommand(dataset.value);break;
        case 'operator': handleOperator(dataset.value);break;
        case 'number': handleNumber(dataset.value);break;
        default: throw new Error (' Type Error ! ');
    }
}

const resultElement = document.querySelector('#result-area')  // result

function handleCommand(value){
    switch (value){
        case 'clear': clear(); break;
        case 'toggle-minus': resultElement.textContent = - Number.parseFloat(resultElement.textContent); break;
        case 'percentage' : resultElement.textContent = Number.parseFloat(resultElement.textContent) / 100; break;
        case '.': resultElement.textContent.indexOf('.') !== -1 || (resultElement.textContent += '.'); break;
        case 'equal': calculate(); break;
        default: throw new Error (' Command Error! ');
    }
} 

function clear(){
    resultElement.textContent = '0'
    lastNumber = 0;
    operationNumber = 0;
    lastOperator = '';
    isLastKeyOpeartor = false
}


function handleNumber(value){
    if(resultElement.textContent === '0' || isLastKeyOpeartor){
        resultElement.textContent = value
        isLastKeyOpeartor = false
    } else {
        resultElement.textContent += value
    }
    operationNumber = Number.parseFloat(resultElement.textContent)

}

function handleOperator(value){
    if(lastNumber !==0 && operationNumber !==0){
        calculate()
    }

    lastNumber = Number.parseFloat(resultElement.textContent)
    lastOperator = value
    isLastKeyOpeartor = true

}

function calculate(){
    let result = ''
    switch(lastOperator){
        case 'plus': result = lastNumber + operationNumber; break;
        case 'minus': result = lastNumber - operationNumber; break;
        case 'multiply': result = lastNumber * operationNumber; break;
        case 'divide': result = lastNumber / operationNumber; break;
        default: throw new Error (' Operation Error! ');
    }

    resultElement.textContent = result
    lastNumber = result

}
