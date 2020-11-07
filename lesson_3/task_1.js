// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

const n = 100;
let lst = [2];
i = 3;
while (i <= n) {
    // for (let i = 3; i <= n; i += 2) {  <-- с циклом for было бы удобнее :)
    if ((i > 10) && (i % 10 == 5)) {
        i += 2;
        continue;
    }
    var simple = 0;
    for (var j of lst) {
        if (j * j - 1 > i) {
            simple++;
            break;
        }
        if (i % j == 0) {
            simple = 0;
            break;
        }
        simple++;
    }
    if (simple > 0) {
        lst.push(i);
    }
    i += 2;
}
alert(lst)