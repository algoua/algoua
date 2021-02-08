# Минимальное остовное дерево. Алгоритм Крускала

Дан взвешенный неориентированный граф. Требуется найти такое поддерево этого графа, которое бы соединяло все его вершины, и при этом обладало наименьшим весом (т.е. суммой весов рёбер) из всех возможных. Такое поддерево называется минимальным остовным деревом или простом минимальным остовом.

Здесь будут рассмотрены несколько важных фактов, связанных с минимальными остовами, затем будет рассмотрен алгоритм Крускала в его простейшей реализации.

### Свойства минимального остова

* Минимальный остов **уникален, если веса всех рёбер различны**. В противном случае, может существовать несколько минимальных остовов (конкретные алгоритмы обычно получают один из возможных остовов).
* Минимальный остов является также и **остовом с минимальным произведением** весов рёбер.
(доказывается это легко, достаточно заменить веса всех рёбер на их логарифмы)
* Минимальный остов является также и **остовом с минимальным весом самого тяжелого ребра**.
(это утверждение следует из справедливости алгоритма Крускала)
* **Остов максимального веса** ищется аналогично остову минимального веса, достаточно поменять знаки всех рёбер на противоположные и выполнить любой из алгоритм минимального остова.

### Алгоритм Крускала

Данный алгоритм был описан Крускалом (Kruskal) в 1956 г.

Алгоритм Крускала изначально помещает каждую вершину в своё дерево, а затем постепенно объединяет эти деревья, объединяя на каждой итерации два некоторых дерева некоторым ребром. Перед началом выполнения алгоритма, все рёбра сортируются по весу (в порядке неубывания). Затем начинается процесс объединения: перебираются все рёбра от первого до последнего (в порядке сортировки), и если у текущего ребра его концы принадлежат разным поддеревьям, то эти поддеревья объединяются, а ребро добавляется к ответу. По окончании перебора всех рёбер все вершины окажутся принадлежащими одному поддереву, и ответ найден.

### Простейшая реализация

Этот код самым непосредственным образом реализует описанный выше алгоритм, и выполняется за **O (M log N + N<sup>2</sup>)**. Сортировка рёбер потребует O (M log N) операций. Принадлежность вершины тому или иному поддереву хранится просто с помощью массива tree_id - в нём для каждой вершины хранится номер дерева, которому она принадлежит. Для каждого ребра мы за O (1) определяем, принадлежат ли его концы разным деревьям. Наконец, объединение двух деревьев осуществляется за O (N) простым проходом по массиву tree_id. Учитывая, что всего операций объединения будет N-1, мы и получаем асимптотику **O (M log N + N<sup>2</sup>)**.

<!--- TODO: specify code snippet id -->
``` cpp
int m;
vector < pair < int, pair<int,int> > > g (m); // вес - вершина 1 - вершина 2

int cost = 0;
vector < pair<int,int> > res;

sort (g.begin(), g.end());
vector<int> tree_id (n);
for (int i=0; i<n; ++i)
    tree_id[i] = i;
for (int i=0; i<m; ++i)
{
    int a = g[i].second.first,  b = g[i].second.second,  l = g[i].first;
    if (tree_id[a] != tree_id[b])
    {
        cost += l;
        res.push_back (make_pair (a, b));
        int old_id = tree_id[b],  new_id = tree_id[a];
        for (int j=0; j<n; ++j)
            if (tree_id[j] == old_id)
                tree_id[j] = new_id;
    }
}
```

### Улучшенная реализация

С использованием структуры данных ["Система непересекающихся множеств"](dsu) можно написать более быструю реализацию [алгоритма Крускала с асимптотикой O (M log N)](mst_kruskal_with_dsu).