# Наименьший общий предок. Нахождение за O (sqrt (N)) и O (log N) с препроцессингом O (N)

Пусть дано дерево G. На вход поступают запросы вида (V1, V2), для каждого запроса требуется найти их наименьшего общего предка, т.е. вершину V, которая лежит на пути от корня до V1, на пути от корня до V2, и из всех таких вершин следует выбирать самую нижнюю. Иными словами, искомая вершина V - предок и V1, и V2, и среди всех таких общих предков выбирается нижний. Очевидно, что наименьший общий предок вершин V1 и V2 - это их общий предок, лежащий на кратчайшем пути из V1 в V2. В частности, например, если V1 является предком V2, то V1 является их наименьшим общим предком.

На английском эта задача называется задачей LCA - Least Common Ancestor.

## Идея алгоритма

Перед тем, как отвечать на запросы, выполним так называемый **препроцессинг**. Запустим обход в глубину из корня, который будет строить список посещения вершин Order (текущая вершина добавляется в список при входе в эту вершину, а также после каждого возвращения из её сына), нетрудно заметить, что итоговый размер этого списка будет O (N). И построим массив First[1..N], в котором для каждой вершины будет указана позиция в массиве Order, в которой стоит эта вершина, т.е. Order[First[I]] = I для всех I. Также с помощью поиска в глубину найдём высоту каждой вершины (расстояние от корня до неё) - H[1..N].

Как теперь отвечать на запросы? Пусть имеется текущий запрос - пара вершин V1 и V2. Рассмотрим список Order между индексами First[V1] и First[V2]. Нетрудно заметить, что в этом диапазоне будет находиться и искомое LCA (V1, V2), а также множество других вершин. Однако LCA (V1, V2) будет отличаться от остальных вершин тем, что это будет вершина с наименьшей высотой.

Таким образом, чтобы ответить на запрос, нам нужно просто **найти вершину с наименьшей высотой** в массиве Order в диапазоне между First[V1] и First[V2]. Таким образом, **задача LCA сводится к [задаче RMQ](rmq)** ("минимум на отрезке"). А последняя задача решается с помощью структур данных (см. [задача RMQ](rmq)).

Если использовать [**sqrt-декомпозицию**](sqrt_decomposition), то можно получить решение, отвечающее на запрос за **O (sqrt (N))** и выполняющее препроцессинг за O (N).

Если использовать [**дерево отрезков**](segment_tree), то можно получить решение, отвечающее на запрос за **O (log (N))** и выполняющее препроцессинг за O (N).

## Реализация

Здесь будет приведена готовая реализация LCA с использованием дерева отрезков:

<!--- TODO: specify code snippet id -->
``` cpp
typedef vector<vector<int>> graph;
typedef vector<int>::const_iterator const_graph_iter;

vector<int> lca_h, lca_dfs_list, lca_first, lca_tree;
vector<char> lca_dfs_used;

void lca_dfs(const graph &g, int v, int h = 1) {
    lca_dfs_used[v] = true;
    lca_h[v] = h;
    lca_dfs_list.push_back(v);
    for (const_graph_iter i = g[v].begin(); i != g[v].end(); ++i)
        if (!lca_dfs_used[*i]) {
            lca_dfs(g, *i, h + 1);
            lca_dfs_list.push_back(v);
        }
}

void lca_build_tree(int i, int l, int r) {
    if (l == r)
        lca_tree[i] = lca_dfs_list[l];
    else {
        int m = (l + r) >> 1;
        lca_build_tree(i + i, l, m);
        lca_build_tree(i + i + 1, m + 1, r);
        if (lca_h[lca_tree[i + i]] < lca_h[lca_tree[i + i + 1]])
            lca_tree[i] = lca_tree[i + i];
        else
            lca_tree[i] = lca_tree[i + i + 1];
    }
}

void lca_prepare(const graph &g, int root) {
    int n = (int)g.size();
    lca_h.resize(n);
    lca_dfs_list.reserve(n * 2);
    lca_dfs_used.assign(n, 0);

    lca_dfs(g, root);

    int m = (int)lca_dfs_list.size();
    lca_tree.assign(lca_dfs_list.size() * 4 + 1, -1);
    lca_build_tree(1, 0, m - 1);

    lca_first.assign(n, -1);
    for (int i = 0; i < m; ++i) {
        int v = lca_dfs_list[i];
        if (lca_first[v] == -1)
            lca_first[v] = i;
    }
}

int lca_tree_min(int i, int sl, int sr, int l, int r) {
    if (sl == l && sr == r)
        return lca_tree[i];
    int sm = (sl + sr) >> 1;
    if (r <= sm)
        return lca_tree_min(i + i, sl, sm, l, r);
    if (l > sm)
        return lca_tree_min(i + i + 1, sm + 1, sr, l, r);
    int ans1 = lca_tree_min(i + i, sl, sm, l, sm);
    int ans2 = lca_tree_min(i + i + 1, sm + 1, sr, sm + 1, r);
    return lca_h[ans1] < lca_h[ans2] ? ans1 : ans2;
}

int lca(int a, int b) {
    int left = lca_first[a], right = lca_first[b];
    if (left > right)
        swap(left, right);
    return lca_tree_min(1, 0, (int)lca_dfs_list.size() - 1, left, right);
}

int main() {
    graph g;
    int root;
    ... чтение графа...

        lca_prepare(g, root);

    for (;;) {
        int v1, v2;          // поступил запрос
        int v = lca(v1, v2); // ответ на запрос
    }
}
```
