# Знаходження вписаною кола в опуклому багатокутнику методом "стиснення сторін" ("shrinking sides") за $O(n \log n)$

Дан опуклий багатокутник з $n$ вершинами. Потрібно знайти вписанную в нього коло максимального радіусу: тобто знайти її радіус і координати центру. (Якщо при даному радиусе можливі декілька варіантів центрів, то достатньо знайти будь-якої з них).

В відміну від описаного [тут](inscribed_circle_ternary) методу двойного тернарного пошуку, асимптотика даного алгоритму - $O(n \log n)$ - не залежить від обмежень на координати і від необхідної точності, і тому цей алгоритм підходить при значно великих $n$ і великих обмеженнях на величину координат.

Спасибо **[Ивану Красильникову (mf)](http://acm.uva.es/board/memberlist.php?mode=viewprofile&u=4424)** за опис цього красивого алгоритму.

## Алгоритм

Отже, дано опуклий багатокутник. Почнемо одночасно і з однаковою скоростью **сдвигать** всі його сторони паралельно самим собі всередину багатокутника:

\img{inscribed_circle_shrinking.jpg}

Нехай, для зручності, це рух відбувається зі скоростью 1 координатная одиниця в секунду (тобто час в якому-то сенсі рівне расстоянию: спустя одиницю часу кожна точка преодолеет відстань, рівне одиниці).

В процесі цього руху сторони багатокутника будуть поступово исчезать (обращаться в точки). Рано або пізно весь багатокутник стиснеться в точку або відрізок, і цей момент часу $t$ буде бути **відповіддю на задачу** - шуканим радіусом (а центр шуканої кола буде лежати на цим відрізку). Насправді, якщо ми сжали багатокутник на толщину $t$ по всім направлениям, і він обратился в точку/відрізок, то це означає, що існує точка, отстоящая від всіх сторін багатокутника на відстані $t$, а для бОльших відстаней - такий точки вже не існує.

Отже, нам треба навчитися ефективно моделировать цей процес стиснення. Для цього навчимося для кожної сторони **визначати час**, через яке вона стиснеться в точку.

Для цього розглянемо внимательно процес руху сторін. Зауважимо, що вершини багатокутника завжди движутся по биссектрисам кутів (це випливає з рівності відповідних трикутників). Але тоді питання про часу, через яке сторона стиснеться, зводиться до питання про определении висоти $H$ трикутника, в якому відома довжина сторони $L$ і два прилежащих до ній кута $\alpha$ і $\beta$. Скориставшись, наприклад, теоремою синусов, отримуємо формулу:

$$ H = L \cdot \frac{ \sin \alpha \cdot \sin \beta }{ \sin (\alpha + \beta) }. $$

Тепер ми вміємо за $O(1)$ визначати час, через яке сторона стиснеться в точку.

Занесём ці часи для кожної сторони в якусь **структуру данних для вилучення мінімуму**, наприклад, красно-чёрное дерево ($\rm set$ в мові C++).

Тепер якщо ми виберемо сторону з **найменшим часом $H$**, то ця сторона першо] стиснеться в точку - в момент часу $H$. Якщо багатокутник ще не сжался в точку/відрізок, то цю сторону треба **вилучити** з багатокутника, і продолжить алгоритм для залишилися сторін. При видаленні сторони ми повинні **з'єднати** один з другом її лівого і правого сусіда, **продлив** їх до точки їх перетину. При цим необхідно буде знайти цю точку перетину, перерахувати довжини двох сторін і їх часи зникнення.

При реалізації для кожної сторони доведеться зберігати номер її правого і лівого сусіда (тим самим як б построив двусвязный список з сторін багатокутника). Це дозваляє реалізувати видалення сторони і связывание двох її сусідів за $O(1)$.

Якщо при видаленні сторони виявляється, що її сторони-соседи **паралельні**, то це означає, що багатокутник після цього стиснення вырождается в точку/відрізок, тому ми можемо зразу зупиняти алгоритм і повертати в якості відповіді час исчезнования поточній сторони (так що проблем з паралельними сторонами не виникає).

Якщо ж така ситуація з паралельними сторонами не виникає, то алгоритм доработает до моменту, в який в багатокутнику залишиться тільки дві сторони - і тоді відповіддю на задачу буде бути час видалення попередньою сторони.

Очевидно, асимптотика цього алгоритму становить $O(n \log n)$, оскільки алгоритм складається з $n$ кроків, на кожному з яких видаляється по однієї стороні (для чого виготовляється декілька операцій з $\rm set$ за час $O(n \log n)$).

## Реалізація

Наведемо реалізацію описаного вище алгоритму. Данная реалізація повертає тільки радіус шуканої кола; втім, додавання виведення центру кола не складе великого праці.

Даний алгоритм элегантен тим, що з обчислювальної геометрії потрібно тільки знаходження кута між двома сторонами, перетин двох прямих і перевірка двох прямих на параллельность.

Зауваження. Передбачається, що подаваемый на вхід багатокутник - **строго опуклий**, тобто ніякі три точки не лежати на однієї прямої.

<!--- TODO: specify code snippet id -->
``` cpp
const double EPS = 1E-9;
const double PI = ...;

struct pt {
    double x, y;
    pt()  { }
    pt (double x, double y) : x(x), y(y)  { }
    pt operator- (const pt & p) const {
        return pt (x-p.x, y-p.y);
    }
};

double dist (const pt & a, const pt & b) {
    return sqrt ((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y));
}

double get_ang (const pt & a, const pt & b) {
    double ang = abs (atan2 (a.y, a.x) - atan2 (b.y, b.x));
    return min (ang, 2*PI-ang);
}

struct line {
    double a, b, c;
    line (const pt & p, const pt & q) {
        a = p.y - q.y;
        b = q.x - p.x;
        c = - a * p.x - b * p.y;
        double z = sqrt (a*a + b*b);
        a/=z, b/=z, c/=z;
    }
};

double det (double a, double b, double c, double d) {
    return a * d - b * c;
}

pt intersect (const line & n, const line & m) {
    double zn = det (n.a, n.b, m.a, m.b);
    return pt (
        - det (n.c, n.b, m.c, m.b) / zn,
        - det (n.a, n.c, m.a, m.c) / zn
    );
}

bool parallel (const line & n, const line & m) {
    return abs (det (n.a, n.b, m.a, m.b)) < EPS;
}

double get_h (const pt & p1, const pt & p2,
    const pt & l1, const pt & l2, const pt & r1, const pt & r2)
{
    pt q1 = intersect (line (p1, p2), line (l1, l2));
    pt q2 = intersect (line (p1, p2), line (r1, r2));
    double l = dist (q1, q2);
    double alpha = get_ang (l2 - l1, p2 - p1) / 2;
    double beta = get_ang (r2 - r1, p1 - p2) / 2;
    return l * sin(alpha) * sin(beta) / sin(alpha+beta);
}

struct cmp {
    bool operator() (const pair<double,int> & a, const pair<double,int> & b) const {
        if (abs (a.first - b.first) > EPS)
            return a.first < b.first;
        return a.second < b.second;
    }
};

int main() {
    int n;
    vector<pt> p;
    ... читання n і p ...

    vector<int> next (n), prev (n);
    for (int i=0; i<n; ++i) {
        next[i] = (i + 1) % n;
        prev[i] = (i - 1 + n) % n;
    }

    set < pair<double,int>, cmp > q;
    vector<double> h (n);
    for (int i=0; i<n; ++i) {
        h[i] = get_h (
            p[i], p[next[i]],
            p[i], p[prev[i]],
            p[next[i]], p[next[next[i]]]
        );
        q.insert (make_pair (h[i], i));
    }

    double last_time;
    while (q.size() > 2) {
        last_time = q.begin()->first;
        int i = q.begin()->second;
        q.erase (q.begin());

        next[prev[i]] = next[i];
        prev[next[i]] = prev[i];
        int nxt = next[i],   nxt1 = (nxt+1)%n,
            prv = prev[i],   prv1 = (prv+1)%n;
        if (parallel (line (p[nxt], p[nxt1]), line (p[prv], p[prv1])))
            break;

        q.erase (make_pair (h[nxt], nxt));
        q.erase (make_pair (h[prv], prv));

        h[nxt] = get_h (
            p[nxt], p[nxt1],
            p[prv1], p[prv],
            p[next[nxt]], p[(next[nxt]+1)%n]
        );
        h[prv] = get_h (
            p[prv], p[prv1],
            p[(prev[prv]+1)%n], p[prev[prv]],
            p[nxt], p[nxt1]
        );

        q.insert (make_pair (h[nxt], nxt));
        q.insert (make_pair (h[prv], prv));
    }

    cout << last_time << endl;
}
```

Основна функція тут - це $get\_h()$, яка по стороні і її лівому і правому соседям обчислює час зникнення цій сторони. Для цього шукається точка перетину цій сторони з сусідами, і потім по наведеної вище формулою виготовляється рассчёт шуканого часу.