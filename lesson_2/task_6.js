/*
6. Реализовать функцию с тремя параметрами: function mathOperation(arg1, arg2, operation), где arg1, arg2 – значения аргументов, operation – строка с названием операции.
В зависимости от переданного значения операции выполнить одну из арифметических операций(использовать функции из пункта 3) и вернуть полученное значение
(использовать switch)
*/

function mathOperation(a, b, op) {
    switch (op) {
        case '+':
            return sum(a, b);
        case '-':
            return sub(a, b);
        case '*':
            return mult(a, b);
        case '/':
            return div(a, b);
    }
}

// alert(mathOperation(1, 3, '+'))
// alert(mathOperation(2, 3, '*'))