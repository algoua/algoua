# Найменший спільний предок. Знаходження за O(√N) та O(log N) з попереднім обчисленням за O(N)

Нехай дано дерево G. На вхід надходять запити уваги (V1, V2). Для кожного запиту потрібно знайти їх найменшого загального предка, тобто вершину V, яка лежить на шляху від кореня до V1, на шляху від кореня до V2, і з усіх таких вершин потрібно вибирати найнижчу. Іншими словами, шукана вершина V - предок і V1, і V2, і серед усіх таких загальних предків потрібно вибрати найнижчу. Очевидно, що найменший загальний предок вершин V1 і V2 - це їх загальний предок, що лежить на найкоротшому шляху з V1 в V2. Зокрема, наприклад, якщо V1 є предком V2, то V1 є їх найменшим загальним предком.

На англійській ця задача називається задачею LCA - Lowest Common Ancestor.

## Ідея алгоритму

Перед тим, як відповідати на запити, виконаємо так званий **попередній аналіз**. Запустимо обхід в глибину з кореня, який буде будувати список відвідування вершин Order (поточна вершина додається в список при вході в цю вершину, а також після кожного повернення з її сина). Неважко замітити, що підсумковий розмір цього списку буде O(N). Побудуємо також масив First[1..N], в якому для кожної вершини буде вказана позиція в масиві Order, в якій знаходиться ця вершина, тобто Order[First[I]] = I для всіх I. Також за допомогою пошуку в глибину знайдемо висоту кожної вершини (відстань від кореня до неї) - H[1..N].

Як тепер відповідати на запити? Нехай є поточний запит - пара вершин V1 та V2. Розглянемо список Order між індексами First[V1] та First[V2]. Не складно помітити, що в цьому діапазоні буде перебувати і шукане LCA (V1, V2), а також множина інших вершин. Однак LCA (V1, V2) буде відрізнятися від інших вершин тим, що це буде вершина з найменшою висотою.

Таким чином, щоб відповісти на запит, нам потрібно просто **знайти вершину з найменшою висотою** в масиві Order у діапазоні між First[V1] та First[V2]. Таким чином, **задача LCA зводиться до [задачі RMQ](rmq)** ("мінімум на відрізку"). А остання задача вирішується з допомогою структур даних (див. [задача RMQ](rmq)).

Якщо використовувати [**декомпозицію кореня**](декомпозиція_кореня), то можна отримати розв'язок, який відповідає на запит за **O(sqrt(N))** і виконує попередню обробку за O(N).

Якщо використовувати **дерево відрізків**, то можна отримати розв'язок, що відповідає на запит за **O(log(N))** і виконує попередню обробку за O(N).

## Реалізація

Тут буде наведено готову реалізацію LCA з використанням дерева відрізків:

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
...читання графу...

        lca_prepare(g, root);

    for (;;) {
int v1, v2; // надійшов запит
int v = ЗНО(v1, v2); // відповідь на запит
    }
}
```