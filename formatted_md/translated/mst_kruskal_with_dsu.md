# Мінімальна каркасне дерево. Алгоритм Крускала з системою що не перетинаються множин

Постановку задачі і опис алгоритму Крускала див. [тут](mst_kruskal).

Тут буде розглянута реалізація з використанням структури данних ["система що не перетинаються множин" (DSU)](dsu), яка дозволить досягти асимптотики **O (M log N)**.

### Опис

Так ж, як і в простий версії алгоритму Крускала, відсортуємо всі ребра по неубыванию ваги. Потім поместим кожну вершину в своє дерево (тобто своє множину) з допомогою виклику функції DSU MakeSet - на це уйдёт в сумі O (N). Перебираем всі ребра (в порядку сортування) і для кожного ребра за O (1) визначаємо, належать або його кінці різним деревам (з допомогою двох викликів FindSet за O (1)). Нарешті, об'єднання двох дерев буде осуществляться викликом Union - також за O (1). Разом ми отримуємо асимптотику O (M log N + N + M) = O (M log N).

### Реалізація

Для зменшення объёма коду реалізуємо всі операції не в вигляді окремих функцій, а прямо в коді алгоритму Крускала.

Тут буде використовуватися рандомизированная версія DSU.

<!--- TODO: specify code snippet id -->
``` cpp
vector<int> p (n);

int dsu_get (int v) {
    return (v == p[v]) ? v : (p[v] = dsu_get (p[v]));
}

void dsu_unite (int a, int b) {
    a = dsu_get (a);
    b = dsu_get (b);
    if (rand() & 1)
        swap (a, b);
    if (a != b)
        p[a] = b;
}

... в функції main(): ...

int m;
vector < pair < int, pair<int,int> > > g; // вага - вершина 1 - вершина 2
... читання графа ...

int cost = 0;
vector < pair<int,int> > res;

sort (g.begin(), g.end());
p.resize (n);
for (int i=0; i<n; ++i)
    p[i] = i;
for (int i=0; i<m; ++i) {
    int a = g[i].second.first,  b = g[i].second.second,  l = g[i].first;
    if (dsu_get(a) != dsu_get(b)) {
        cost += l;
        res.push_back (g[i].second);
        dsu_unite (a, b);
    }
}
```