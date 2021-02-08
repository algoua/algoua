# Крапка перетину прямих

Нехай нам дані дві прямі, задані своїми коефіцієнтами $A_1, B_1, C_1$ і $A_2, B_2, C_2$. Потрібно знайти їх точку перетину, або выяснить, що прямі паралельні.

## Розв'язок

Якщо дві прямі не паралельні, то вони перетинаються. Щоб знайти точку перетину, достатньо скласти з двох рівнянь прямих систему і розв'язати її:

$$
\cases{ A_1 x + B_1 y + C_1 = 0, \cr
A_2 x + B_2 y + C_2 = 0. }
$$

Користуючись формулою Крамера, зразу знаходимо розв'язок системи, яке і буде шуканої **точкою перетину**:

$$
x = - \frac{ \left|\matrix{C_1&B_1 \cr C_2&B_2}\right| }{ \left|\matrix{A_1&B_1 \cr A_2&B_2}\right| } = - \frac{ C_1 B_2 - C_2 B_1 }{ A_1 B_2 - A_2 B_1 },
$$

$$
y = - \frac{ \left|\matrix{A_1&C_1 \cr A_2&C_2}\right| }{ \left|\matrix{A_1&B_1 \cr A_2&B_2}\right| } = - \frac{ A_1 C_2 - A_2 C_1 }{ A_1 B_2 - A_2 B_1 }.
$$

Якщо знаменник нульовий, тобто

$$
\left|\matrix{A_1&B_1 \cr A_2&B_2}\right| = A_1 B_2 - A_2 B_1 = 0
$$

то система рішень не має (прямі **паралельні** і не збігаються) або має нескінченно багато (прямі **збігаються**). Якщо необхідно различить ці два випадку, треба перевірити, що коефіцієнти $C$ прямих пропорційні з тим ж коефіцієнтом пропорциональности, що і коефіцієнти $A$ і $B$, для чого достатньо порахувати два визначника, якщо вони обидва рівні нулю, то прямі збігаються:

$$
\left|\matrix{ A_1 & C_1 \cr A_2 & C_2 }\right|, \left|\matrix{ B_1 & C_1 \cr B_2 & C_2 }\right|
$$

## Реалізація

<!--- TODO: specify code snippet id -->
``` cpp
struct pt {
    double x, y;
};

struct line {
    double a, b, c;
};

const double EPS = 1e-9;

double det (double a, double b, double c, double d) {
    return a * d - b * c;
}

bool intersect (line m, line n, pt & res) {
    double zn = det (m.a, m.b, n.a, n.b);
    if (abs (zn) < EPS)
        return false;
    res.x = - det (m.c, m.b, n.c, n.b) / zn;
    res.y = - det (m.a, m.c, n.a, n.c) / zn;
    return true;
}

bool parallel (line m, line n) {
    return abs (det (m.a, m.b, n.a, n.b)) < EPS;
}

bool equivalent (line m, line n) {
    return abs (det (m.a, m.b, n.a, n.b)) < EPS
        && abs (det (m.a, m.c, n.a, n.c)) < EPS
        && abs (det (m.b, m.c, n.b, n.c)) < EPS;
}
```
