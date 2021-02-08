# Перевірка двох відрізків на перетин

Дано два відрузку $AB$ і $CD$ (вони можуть вырождаться в точки). Потрібно перевірити, перетинаються вони або ні.

Якщо додатково потрібно знайти саму точку (точки) перетину, то див. [відповідну статтю](segments_intersection).

## Перший спосіб: ориентированная площа трикутника

Скористаємося [Ориентированной площадью трикутника і предикат 'За годинний стрілкою'](oriented_area). Дійсно, аби відрізки $AB$ і $CD$ пересекались, необхідно і достатньо, аби точки $A$ і $B$ знаходилися по різні сторони прямої $CD$, і, аналогічно, точки $C$ і $D$ - по різні сторони прямої $AB$. Проверить це можна, вычисляя орієнтовані площі відповідних трикутників і порівнюючи їх знаки.

Єдине, на що випливає звернути увага - граничные випадки, коли які-то точки попадают на саму пряму. При цим виникає єдиний особливий випадок, коли вищеописані перевірки нічого не дадуть - випадок, коли обидва відрузку лежати **на однієї прямої**. Цей випадок треба розглянути окремо. Для цього достатньо перевірити, що проекції цих двох відрізків на осі $X$ і $Y$ перетинаються (часто цю перевірку називають "перевіркою на bounding box").

В цілому, цей спосіб - більш простий, ніж той, що буде приведён нижче (производящий перетин двох прямих), і має менше особливих випадків, однак главный його недолік - в тому, що він не знаходить саму точку перетину.

**Реалізація**:
<!--- TODO: specify code snippet id -->
``` cpp
struct pt {
    int x, y;
};

inline int area (pt a, pt b, pt c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}

inline bool intersect_1 (int a, int b, int c, int d) {
    if (a > b)  swap (a, b);
    if (c > d)  swap (c, d);
    return max(a,c) <= min(b,d);
}

bool intersect (pt a, pt b, pt c, pt d) {
    return intersect_1 (a.x, b.x, c.x, d.x)
        && intersect_1 (a.y, b.y, c.y, d.y)
        && area(a,b,c) * area(a,b,d) <= 0
        && area(c,d,a) * area(c,d,b) <= 0;
}
```

В цілях оптимізації перевірка на bounding box вынесена в початок, до обчислення площ - оскільки це більш "лёгкая" перевірка.

Саме собою, цей код застосуємо і для випадку речових координат, просто всі порівняння з нулем випливає виробляти по эпсилону (і избегать перемноження двох вещественнозначных значень $\rm area()$, перемножая замість цього їх знаки).

## Другий спосіб: перетин двох прямих

Замість перетину відрізків виконаємо [перетин двох прямих](lines_intersection), в результаті, якщо прямі не паралельні, отримаємо якусь точку, яку треба перевірити на належність обом відрізках; для цього достатньо перевірити, що ця точка належить обом відрізках в проекції на вісь $X$ і на вісь $Y$.

Якщо ж прямі виявилися паралельними, то, якщо вони не збігаються, то відрізки точно не перетинаються. Якщо ж прямі збіглися, то відрізки лежати на однієї прямої, і для перевірки їх перетину достатньо перевірити, що перетинаються їх проекції на вісь $X$ і $Y$.

Остаётся ще особливий випадок, коли один або обидва відрузку **вироджуються** в точки: в такому випадку говорити про прямих некоректно, і цей метод буде не застосовується (цей випадок треба буде розбирати окремо).

**Реалізація** (без обліку випадку вырожденных відрізків):

<!--- TODO: specify code snippet id -->
``` cpp
struct pt {
    int x, y;
};

const double EPS = 1E-9;

inline int det (int a, int b, int c, int d) {
    return a * d - b * c;
}

inline bool between (int a, int b, double c) {
    return min(a,b) <= c + EPS && c <= max(a,b) + EPS;
}

inline bool intersect_1 (int a, int b, int c, int d) {
    if (a > b)  swap (a, b);
    if (c > d)  swap (c, d);
    return max(a,c) <= min(b,d);
}

bool intersect (pt a, pt b, pt c, pt d) {
    int A1 = a.y-b.y,  B1 = b.x-a.x,  C1 = -A1*a.x - B1*a.y;
    int A2 = c.y-d.y,  B2 = d.x-c.x,  C2 = -A2*c.x - B2*c.y;
    int zn = det (A1, B1, A2, B2);
    if (zn != 0) {
        double x = - det (C1, B1, C2, B2) * 1. / zn;
        double y = - det (A1, C1, A2, C2) * 1. / zn;
        return between (a.x, b.x, x) && between (a.y, b.y, y)
            && between (c.x, d.x, x) && between (c.y, d.y, y);
    }
    else
        return det (A1, C1, A2, C2) == 0 && det (B1, C1, B2, C2) == 0
            && intersect_1 (a.x, b.x, c.x, d.x)
            && intersect_1 (a.y, b.y, c.y, d.y);
}
```

Тут спочатку обчислюється коефіцієнт $\rm zn$ - знаменник в формулою Крамера. Якщо ${\rm zn} = 0$, то коефіцієнти $A$ і $B$ прямих пропорційні, і прямі паралельні або збігаються. В цим випадку треба перевірити, збігаються вони або ні, для чого треба перевірити, що коефіцієнти $C$ прямих пропорційні з тим ж коефіцієнтом, для чого достатньо обчислити два наступних визначника, якщо вони обидва рівні нулю, то прямі збігаються:
$$ \left|\matrix{ A_1 & C_1 \cr A_2 & C_2 }\right|, \left|\matrix{ B_1 & C_1 \cr B_2 & C_2 }\right| $$

Якщо ж ${\rm zn} \ne 0$, то прямі перетинаються, і по формулою Крамера знаходимо точку перетину $(x,y)$ і перевіряємо її належність обом відрізках.

Слід відзначити, що якщо исходные координати точок вже були вещественнозначными, то випливає нормировать прямі (тобто привести їх до такому станом, що сума квадратів коефіцієнтів $a$ і $b$ рівна одиниці), інакше похибки при порівняно прямих на параллельность і на збіг можуть виявитися занадто великими.