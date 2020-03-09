const Math = {};

function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if(num2 === 0){
        console.log('It cannot be divided by 0');
    }
    return num1 / num2;
}

Math.add = add;
Math.substract = substract;
Math.divide = divide;
Math.multiply = multiply;

module.exports = Math;