// window.addEventListener('DOMContentLoaded', () => {
    function calc(a, b, operator) {
        if (a ===- undefined || b === undefined || operator === undefined) {
            return "Error";
        }
        switch (operator) {
            case "+": 
                return a + b;
            case "-":
                return a - b;
            case "*":
                return a * b;
            case ":":
            case "/":
                if (b == 0) {
                    return "You cannot divide by zero";
                }

                return a / b;
            case "^":
                return a ^ b;
            case "%":
                return a % b;
            default :
                return "unknown operation";
        }
    }
// });