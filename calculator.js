
//CALCULATOR WITH CLASS

class Calculator {
    constructor(display1Text,display2Text) {
        this.display1Text = display1Text;
        this.display2Text = display2Text;
        this.clear();
    }
    clear() {
        this.display1 = '';
        this.display2 = '';
        this.operation = undefined;
    }
    delete() {
        this.display2 = this.display2.toString().slice(0,-1);
    }
    appendNumber(number) {
        if(number === "." && this.display2.includes(".")) return;
        this.display2 = this.display2.toString() + number.toString();
    }
    selectOperation(operation) {
        if(this.display2 === "") return;
        if(this.display1 !== "") {
            this.compute();
        }
        this.operation = operation;
        this.display1 = this.display2;
        this.display2 = '';
    }
    compute() {
        let result;
        const previous = parseFloat(this.display1);
        const current = parseFloat(this.display2);
        if(isNaN(previous) || isNaN(current)) return;

        switch (this.operation) {
            case "+":
                result = previous + current;
                break;
            case "-":
                result = previous - current;
                break;
            case "*":
                result = previous * current;
                break;
            case "/":
                result = previous / current;
                break;
            default:
                break;
        }
        this.display2 = result;
        this.operation = undefined;
        this.display1 = '';
    }
    
    updateDisplay() {
        this.display2Text.innerText = this.display2;
        if(this.operation != null) {
            this.display1Text.innerText = `${this.display1} ${this.operation}`;
        }
        else {
            this.display1Text.innerText = this.display1;
        }
    }
}



const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const display1Text = document.querySelector('[data-display1-op]');
const display2Text = document.querySelector('[data-display2-op]');

document.addEventListener("DOMContentLoaded", () => {
    const calc = new Calculator(display1Text,display2Text);

    numberButtons.forEach((button) => {
        button.addEventListener("click", () => {
            calc.appendNumber(button.innerText);
            calc.updateDisplay();
        });
    });

    operationButtons.forEach((button) => {
        button.addEventListener("click", () => {
            calc.selectOperation(button.innerText);
            calc.updateDisplay();
        });
    })
    equalButton.addEventListener("click", () => {
        calc.compute();
        calc.updateDisplay();
    });
    deleteButton.addEventListener('click', () => {
        calc.delete();
        calc.updateDisplay();
    });
    allClearButton.addEventListener('click', () => {
        calc.clear();
        calc.updateDisplay();
    })
});