---
id: extended_euclid_algorithm
title: Розширений алгоритм Евкліда
sidebar_label: Розширений алгоритм Евкліда
---

*[НСД]: Найбільший Спільний Дільник
*[gcd]: greatest common divisor

Порівнюючи із ["звичайним" алгоритмом Евкліда](../algebra/euclid_algorithm), який знаходить найбільший спільний дільник двох чисел $a$ і $b$, розширений алгоритм Евкліда знаходить, крім НСД, також такі коефіцієнти $x$ та $y$, що:

$$
a \cdot x + b \cdot y = {\rm gcd} (a, b).
$$

тобто він знаходить коефіцієнти, за допомогою яких НСД двох чисел виражається через самі ці числа.

## Алгоритм

Введемо обчислення цих коефіцієнтів в алгоритм Евкліда. Для цього достатньо вивести формули, по яким вони змінюються при переході від пари $(a,b)$ до пари $(b\ {\rm mod}\ a, a)$.

Отже, нехай ми знайшли розв'язок $(x_1,y_1)$ для задачі з новою парою $(b\ {\rm mod}\ a,a)$:

$$
(b\ {\rm mod}\ a) \cdot x_1 + a \cdot y_1 = g,
$$

і хочемо отримати розв'язок $(x,y)$ для задачі з парою $(a,b)$:

$$
a \cdot x + b \cdot y = g.
$$

Для цього перетворимо величину $b\ {\rm mod}\ a$ наступним чином:

$$
b\ {\rm mod}\ a = b - \left\lfloor \frac{b}{a} \right\rfloor \cdot a.
$$

Підставимо у вираз з $x_1$ та $y_1$ і отримаємо:

$$
g = (b\ {\rm mod}\ a) \cdot x_1 + a \cdot y_1 = \left( b - \left\lfloor \frac{b}{a} \right\rfloor \cdot a \right) \cdot x_1 + a \cdot y_1,
$$

і, виконавши перегрупування доданків, отримуємо:

$$
g = b \cdot x_1 + a \cdot \left( y_1 - \left\lfloor \frac{b}{a} \right\rfloor \cdot x_1 \right).
$$

Порівнявши результат з початковим виразом з невідомими $x$ та $y$, отримуємо необхідні рівності:

$$
\begin{cases}
x = y_1 - \left\lfloor \frac{b}{a} \right\rfloor \cdot x_1, \cr
y = x_1.
\end{cases}
$$

## Реалізація

<!--- gcd_extended -->
``` cpp
int gcd(int a, int b, int& x, int& y) {
    if (a == 0) {
        x = 0; y = 1;
        return b;
    }
    int x1, y1;
    int d = gcd(b % a, a, x1, y1);
    x = y1 - (b / a) * x1;
    y = x1;
    return d;
}
```

Це рекурсивна функція як і раніше повертає значення НСД від чисел $a$ та $b$, але крім цього також шукані коефіцієнти $x$ та $y$ у вигляді параметрів функції, що передаються у вигляді посилань.

База рекурсії $a = 0$. Значить НСД рівний $b$, і, очевидно, необхідні коефіцієнти $x$ та $y$ рівні $0$ та $1$ відповідно. В інших випадках коефіцієнти перераховуються по вищеописаним формулами.

Розширений алгоритм Евкліда у такій реалізації працює правильно навіть для від'ємних чисел.

## Застосування

TODO: add applications

## Задачі

* [Online Judge - 10104 - **Euclid Problem**](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=1045) | Розв'язки: [C++](https://shareablecode.com/snippets/c-solution-for-uva-problem-euclid-problem-10104-cpp-TA3e-A8Xp), [Go](https://shareablecode.com/snippets/golang-solution-for-uva-online-judge-10104-euclid-problem-5sm1-gSWg)

* [Online Judge - 12775 - **Gift Dilemma**](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4628)
