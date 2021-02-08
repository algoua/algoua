# Побудова опуклою оболонки обходом Грэхэма

Дано N точок на площині. Побудувати їх опуклу оболонку, тобто найменший опуклий багатокутник, що містить всі ці точки.

Ми розглянемо метод **Грэхэма** (Graham) (запропонований в 1972 г). з улучшениями Эндрю (Andrew) (1979 г).. З його допомогою можна побудувати опуклу оболонку за час **O (N log N)** з використанням тільки операцій порівняння, складання і множення. Алгоритм є асимптотично оптимальним (доведено, що не існує алгоритму з лучшей асимптотикою), хоча в деяких завданнях він неприемлем (в випадку параллельной обробки або при online-обробці).

## Опис

Алгоритм. Знайдемо саму ліву і саму праву точки A і B (якщо таких точок декілька, то візьмемо саму нижню серед лівих, і саму верхню серед правих). Зрозуміло, що і A, і B обов'язково попадут в опуклу оболонку. Далі, проведемо через них пряму AB, розділивши множину всіх точок на верхнее і нижнее підмножини S1 і S2 (точки, що лежать на прямої, можна отнести до будь-якого безлічі - вони усе рівне не войдут в оболонку). Точки A і B віднесемо до обом безлічам. Тепер побудуємо для S1 верхню оболонку, а для S2 - нижню оболонку, і об'єднаємо їх, отримавши відповідь. Щоб получити, скажімо, верхню оболонку, потрібно відсортувати всі точки по абсцисі, потім пройтися по всім точкам, рассматривая на кожному кроці крім самою точки дві попередні точки, вошедшие в оболонку. Якщо поточна трійка точок утворює не правий поворот (що легко перевірити з допомогою [Ориентированной площі](oriented_area)), то ближайшего сусіда потрібно вилучити з оболонки. В наприкінці кінців, залишаться тільки точки, що входять в опуклу оболонку.

Отже, алгоритм полягає в сортування всіх точок по абсцисі і двох (в гіршому випадку) обходах всіх точок, тобто необхідна асимптотика O (N log N) досягнута.

## Реалізація

<!--- TODO: specify code snippet id -->
``` cpp
struct pt {
    double x, y;
};

bool cmp (pt a, pt b) {
    return a.x < b.x || a.x == b.x && a.y < b.y;
}

bool cw (pt a, pt b, pt c) {
    return a.x*(b.y-c.y)+b.x*(c.y-a.y)+c.x*(a.y-b.y) < 0;
}

bool ccw (pt a, pt b, pt c) {
    return a.x*(b.y-c.y)+b.x*(c.y-a.y)+c.x*(a.y-b.y) > 0;
}

void convex_hull (vector<pt> & a) {
    if (a.size() == 1)  return;
    sort (a.begin(), a.end(), &cmp);
    pt p1 = a[0],  p2 = a.back();
    vector<pt> up, down;
    up.push_back (p1);
    down.push_back (p1);
    for (size_t i=1; i<a.size(); ++i) {
        if (i==a.size()-1 || cw (p1, a[i], p2)) {
            while (up.size()>=2 && !cw (up[up.size()-2], up[up.size()-1], a[i]))
                up.pop_back();
            up.push_back (a[i]);
        }
        if (i==a.size()-1 || ccw (p1, a[i], p2)) {
            while (down.size()>=2 && !ccw (down[down.size()-2], down[down.size()-1], a[i]))
                down.pop_back();
            down.push_back (a[i]);
        }
    }
    a.clear();
    for (size_t i=0; i<up.size(); ++i)
        a.push_back (up[i]);
    for (size_t i=down.size()-2; i>0; --i)
        a.push_back (down[i]);
}
```