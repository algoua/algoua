# Нахождение вписанной окружности в выпуклом многоугольнике с помощью тернарного поиска

Дан выпуклый многоугольник с N вершинами. Требуется найти координаты центра и радиус наибольшей вписанной окружности.

Здесь описывается простой метод решения этой задачи с помощью двух тернарных поисков, работающий за **O (N log<sup>2</sup> C)**, где C - коэффициент, определяемый величиной координат и требуемой точностью (см. ниже).

## Алгоритм

Определим функцию **Radius (X, Y)**, возвращающую радиус вписанной в данный многоугольник окружности с центром в точке (X;Y). Предполагается, что точки X и Y лежат внутри (или на границе) многоугольника. Очевидно, эту функцию легко реализовать с асимптотикой **O (N)** - просто проходим по всем сторонам многоугольника, считаем для каждой расстояние до центра (причём расстояние можно брать как от прямой до точки, не обязательно рассматривать как отрезок), и возвращаем минимум из найденных расстояний - очевидно, он и будет наибольшим радиусом.

Итак, нам нужно максимизировать эту функцию. Заметим, что, поскольку многоугольник выпуклый, то эта функция будет пригодна для **тернарного поиска** по обоим аргументам: при фиксированном X<sub>0</sub> (разумеется, таком, что прямая X=X<sub>0</sub> пересекает многоугольник) функция Radius(X<sub>0</sub>, Y) как функция одного аргумента Y будет сначала возрастать, затем убывать (опять же, мы рассматриваем только такие Y, что точка (X<sub>0</sub>, Y) принадлежит многоугольнику). Более того, функция max (по Y) { Radius (X, Y) } как функция одного аргумента X будет сначала возрастать, затем убывать. Эти свойства ясны из геометрических соображений.

Таким образом, нам нужно сделать два тернарных поиска: по X и внутри него по Y, максимизируя значение функции Radius. Единственный особый момент - нужно правильно выбирать границы тернарных поисков, поскольку вычисление функции Radius за пределами многоугольника будет некорректным. Для поиска по X никаких сложностей нет, просто выбираем абсциссу самой левой и самой правой точки. Для поиска по Y находим те отрезки многоугольника, в которые попадает текущий X, и находим ординаты точек этих отрезков при абсциссе X (вертикальные отрезки не рассматриваем).

Осталось оценить **асимптотику**. Пусть максимальное значение, которое могут принимать координаты - это C<sub>1</sub>, а требуемая точность - порядка 10<sup>-C<sub>2</sub></sup>, и пусть C = C<sub>1</sub> + C<sub>2</sub>. Тогда количество шагов, которые должен будет совершить каждый тернарный поиск, есть величина O (log C), и итоговая асимптотика получается: O (N log<sup>2</sup> C).

## Реализация

Константа steps определяет количество шагов обоих тернарных поисков.

В реализации стоит отметить, что для каждой стороны сразу предпосчитываются коэффициенты в уравнении прямой, и сразу же нормализуются (делятся на sqrt(A<sup>2</sup>+B<sup>2</sup>)), чтобы избежать лишних операций внутри тернарного поиска.

<!--- TODO: specify code snippet id -->
``` cpp
const double EPS = 1E-9;
int steps = 60;

struct pt {
    double x, y;
};

struct line {
    double a, b, c;
};

double dist (double x, double y, line & l) {
    return abs (x * l.a + y * l.b + l.c);
}

double radius (double x, double y, vector<line> & l) {
    int n = (int) l.size();
    double res = INF;
    for (int i=0; i<n; ++i)
        res = min (res, dist (x, y, l[i]));
    return res;
}

double y_radius (double x, vector<pt> & a, vector<line> & l) {
    int n = (int) a.size();
    double ly = INF,  ry = -INF;
    for (int i=0; i<n; ++i) {
        int x1 = a[i].x,  x2 = a[(i+1)%n].x,  y1 = a[i].y,  y2 = a[(i+1)%n].y;
        if (x1 == x2)  continue;
        if (x1 > x2)  swap (x1, x2),  swap (y1, y2);
        if (x1 <= x+EPS && x-EPS <= x2) {
            double y = y1 + (x - x1) * (y2 - y1) / (x2 - x1);
            ly = min (ly, y);
            ry = max (ry, y);
        }
    }
    for (int sy=0; sy<steps; ++sy) {
        double diff = (ry - ly) / 3;
        double y1 = ly + diff,  y2 = ry - diff;
        double f1 = radius (x, y1, l),  f2 = radius (x, y2, l);
        if (f1 < f2)
            ly = y1;
        else
            ry = y2;
    }
    return radius (x, ly, l);
}

int main() {

    int n;
    vector<pt> a (n);
    ... чтение a ...

    vector<line> l (n);
    for (int i=0; i<n; ++i) {
        l[i].a = a[i].y - a[(i+1)%n].y;
        l[i].b = a[(i+1)%n].x - a[i].x;
        double sq = sqrt (l[i].a*l[i].a + l[i].b*l[i].b);
        l[i].a /= sq,  l[i].b /= sq;
        l[i].c = - (l[i].a * a[i].x + l[i].b * a[i].y);
    }

    double lx = INF,  rx = -INF;
    for (int i=0; i<n; ++i) {
        lx = min (lx, a[i].x);
        rx = max (rx, a[i].x);
    }

    for (int sx=0; sx<stepsx; ++sx) {
        double diff = (rx - lx) / 3;
        double x1 = lx + diff,  x2 = rx - diff;
        double f1 = y_radius (x1, a, l),  f2 = y_radius (x2, a, l);
        if (f1 < f2)
            lx = x1;
        else
            rx = x2;
    }

    double ans = y_radius (lx, a, l);
    printf ("%.7lf", ans);

}
```