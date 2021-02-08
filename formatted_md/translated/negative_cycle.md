# Знаходження негативного циклу в графі

Дан орієнтований зважений граф $G$ з $n$ вершинами і $m$ ребрами. Потрібно знайти в ньому будь-якої **цикл негативного ваги**, якщо такий є.

При іншої постановці задачі - потрібно знайти **всі пари вершин** такі, що між ними існує шлях скільки завгодно малої довжини.

Ці два варіанти задачі зручно розв'язувати різними алгоритмами, тому нижче будуть розглянуті обидва з них.

Одна з поширених "жизненных" постановок цій задачі - наступна: відомі **курсы валют**, тобто курсы перекладу з однієї валюти в іншу. Потрібно дізнатися, можна або деякої послідовністю обмінів получити выгоду, тобто стартовав з однієї одиниці який-або валюти, получити в підсумку більше ніж одну одиницю цій ж валюти.

## Розв'язок з допомогою алгоритму Форда-Беллмана

[Алгоритм Форда-Беллмана](ford_bellman) дозваляє перевірити наявність або отсутствие циклу негативного ваги в графі, а при його наявності - знайти один з таких циклів.

Чи Не будемо вдаваться тут в подробности (які описані в [статті по алгоритму Форда-Беллмана](ford_bellman)), а наведемо лише підсумок - то, як працює алгоритм.

Делается $n$ ітерацій алгоритму Форда-Беллмана, і якщо на останньої ітерації не відбулося ніяких змін - то негативного циклу в графі ні. В іншому випадку візьмемо вершину, відстань до якій змінилося, і будемо йти від її по предкам, поки не войдём в цикл; цей цикл і буде шуканим негативним циклом.

**Реалізація**:

<!--- TODO: specify code snippet id -->
``` cpp
struct edge {
    int a, b, cost;
};

int n, m;
vector<edge> e;
const int INF = 1000000000;

void solve() {
    vector<int> d (n);
    vector<int> p (n, -1);
    int x;
    for (int i=0; i<n; ++i) {
        x = -1;
        for (int j=0; j<m; ++j)
            if (d[e[j].b] > d[e[j].a] + e[j].cost) {
                d[e[j].b] = max (-INF, d[e[j].a] + e[j].cost);
                p[e[j].b] = e[j].a;
                x = e[j].b;
            }
    }

    if (x == -1)
        cout << "No negative cycle found.";
    else {
        int y = x;
        for (int i=0; i<n; ++i)
            y = p[y];

        vector<int> path;
        for (int cur=y; ; cur=p[cur]) {
            path.push_back (cur);
            if (cur == y && path.size() > 1)  break;
        }
        reverse (path.begin(), path.end());
        
        cout << "Negative cycle: ";
        for (size_t i=0; i<path.size(); ++i)
            cout << path[i] << ' ';
    }
}
```

## Розв'язок з допомогою алгоритму Флойда-Уоршелла

[Алгоритм Флойда-Уоршелла](floyd_warshall_algorithm) дозваляє розв'язувати одному постановку задачі - коли треба знайти всі пари вершин $(i,j)$, між якими найкоротшого шляхи не існує (тобто він має нескінченно малу величину).

Знову ж, більш подробные объяснения містяться в [описі алгоритму Флойда-Уоршелла](floyd_warshall_algorithm), а тут ми наведемо тільки підсумок.

Після того, як алгоритм Флойда-Уоршелла відпрацює для входного графа, переберемо всі пари вершин $(i,j)$, і для кожної такий пари перевіримо, нескінченно малий найкоротший шлях з $i$ в $j$ або ні. Для цього переберемо третью вершину $t$, і якщо для її виявилося $d[t][t]<0$ (тобто вона лежить в циклі негативного ваги), а сама вона досяжна з $i$ і з її досяжна $j$ - то шлях $(i,j)$ можливо мати нескінченно малу довжину.

**Реалізація**:

<!--- TODO: specify code snippet id -->
``` cpp
for (int i=0; i<n; ++i)
    for (int j=0; j<n; ++j)
        for (int t=0; t<n; ++t)
            if (d[i][t] < INF && d[t][t] < 0 && d[t][j] < INF)
                d[i][j] = -INF;
```

## Задачі в online judges

Список задач, в яких потрібно шукати цикл негативного ваги:

* [UVA #499 **"Wormholes"** [складність: низька]](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=499)

* [UVA #104 **"Arbitrage"** [складність: середня]](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=40)

* [UVA #10557 **"XYZZY"** [складність: середня]](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=1498)