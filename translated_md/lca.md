# Найменший загальний предок. Знаходження за O (sqrt (N)) і O (log N) з препроцесингом O (N)

Нехай дано дерево G. На вхід надходять запити увазі (V1, V2), для кожного запиту потрібно знайти їх найменшого загального предка, тобто вершину V, яка лежить на шляхи від кореня до V1, на шляхи від кореня до V2, і з всіх таких вершин випливає вибирати саму нижню. Іншими словами, шукана вершина V - предок і V1, і V2, і серед всіх таких загальних предків вибирається нижній. Очевидно, що найменший загальний предок вершин V1 і V2 - це їх загальний предок, що лежить на найкоротшому шляхи з V1 в V2. В зокрема, наприклад, якщо V1 є предком V2, то V1 є їх найменшим загальним предком.

На англійською ця задача називається завданням LCA - Least Common Ancestor.

## Ідея алгоритму

Перед тим, як відповідати на запити, виконаємо так званий **препроцесинг**. Запустимо обхід в глибину з кореня, який буде будувати список посещения вершин Order (поточна вершина додається в список при в ході в цю вершину, а також після кожного возвращения з її сина), неважко замітити, що підсумковий розмір цього списку буде O (N). І побудуємо масив First[1..N], в якому для кожної вершини буде вказана позиція в масиві Order, в якій варто ця вершина, тобто Order[First[I]] = I для всіх I. Також з допомогою пошуку в глибину найдемо висоту кожної вершини (відстань від кореня до її) - H[1..N].

Як тепер відповідати на запити? Нехай є поточний запит - пара вершин V1 і V2. Розглянемо список Order між індексами First[V1] і First[V2]. Неважко замітити, що в цим діапазоні буде перебувати і шукане LCA (V1, V2), а також множину інших вершин. Однак LCA (V1, V2) буде відрізнятися від інших вершин тим, що це буде вершина з найменшою висотою.

Таким чином, аби відповісти на запит, нам потрібно просто **знайти вершину з найменшою висотою** в масиві Order в діапазоні між First[V1] і First[V2]. Таким чином, **задача LCA зводиться до [задачі RMQ](rmq)** ("мінімум на відрізку"). А остання задача вирішується з допомогою структур данних (див. [задача RMQ](rmq)).

Якщо використовувати [**sqrt-декомпозицію**](sqrt_decomposition), то можна получити розв'язок, отвечающее на запит за **O (sqrt (N))** і выполняющее препроцесинг за O (N).

Якщо використовувати [**дерево відрізків**](segment_tree), то можна получити розв'язок, отвечающее на запит за **O (log (N))** і выполняющее препроцесинг за O (N).

## Реалізація

Тут буде наведено готовая реалізація LCA з використанням дерева відрізків:

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
    ... читання графа...

        lca_prepare(g, root);

    for (;;) {
        int v1, v2;          // надійшов запит
        int v = lca(v1, v2); // відповідь на запит
    }
}
```
