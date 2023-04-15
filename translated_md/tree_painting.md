# Покраска ребер дерева

Це достатньо часто встречающаяся задача. Дано дерево G. Надходять запити двох видів: перший вид - пофарбувати деякий ребро, другий вид - запит кількості покрашенных ребер між двома вершинами.

Тут буде описано достатньо просте розв'язок (з використанням [дерева відрізків](segment_tree)), яке буде відповідати на запити за O (log N), з препроцесингом (предварительной обработкой дерева) за O (M).

## Розв'язок

Для початку нам доведеться реалізувати [LCA](lca), аби кожний запит іншого увазі (i,j) сводить до двом запитам (a,b), де a - предок b.

Тепер опишемо **препроцесинг** власне для нашій задачі. Запустимо пошук в глибину з кореня дерева, цей пошук в глибину складе деякий список посещения вершин (кожна вершина додається в список, коли пошук заходить в її, і кожний раз після того, як пошук в глибину повертається з сина поточній вершини) - до речі кажучи, цей ж список використовується алгоритмом LCA. В цим списку буде бути присутнім кожне ребро (в тому сенсі, що якщо i і j - кінці ребра, то в списку обов'язково знайдеться місце, де i і j йдуть поспіль один за другом), причому бути присутнім рівне 2 рази: в прямому напрямку (з i в j, де вершина i ближче до корені, ніж вершина j) і в зворотньому (з j в i).

**Побудуємо** два дерева відрізків (для суми, з одиничної модификацией) по цьому списку: T1 і T2. Дерево T1 буде враховувати кожне ребро тільки в прямому напрямку, а дерево T2 - навпаки, тільки в зворотньому.

Нехай надійшов черговий **запит** увазі (i,j), де i - предок j, і потрібно визначити, скільки ребер пофарбовано на шляхи між i і j. Знайдемо i і j в списку обходу в глибину (нам обов'язково потрібні позиції, де вони зустрічаються вперше), нехай це деякі позиції p і q (це можна зробити за O (1), якщо обчислити ці позиції заздалегідь у час препроцесингу). Значить **відповіддю буде сума T1[p..q-1] - сума T2[p..q-1]**.

Чому? Розглянемо відрізок [p;q] в списку обходу в глибину. Він містить ребра нужного нам шляхи з i в j, але також містить і множину ребер, які лежати на інших шляхах з i. Однак між нужными нам ребрами і остальными ребрами є одне велике відміну: потрібні ребра будуть міститися в цим списку тільки один раз, причому в прямому напрямку, а всі інші ребра будуть зустрічатися двічі: і в прямому, і в зворотньому напрямку. Отже, різницю T1[p..q-1] - T2[p..q-1] дасть нам відповідь (мінус один потрібно, тому що інакше ми захватим ще лишнее ребро з вершини j куди-то вниз або вгору). Запит суми в дереві відрізків виконується за O (log N).

Відповідь на **запит** увазі 1 (про фарбування какого-або ребра) ще простіше - нам просто потрібно оновити T1 і T2, а саме виконати единичную модифікацію того елементу, який відповідає нашому ребру (знайти ребро в списку обходу, знову ж, можна за O (1), якщо виконати цей пошук в препроцессинге). Единичная модифікація в дереві відрізків виконується за O (log N).

## Реалізація

Тут буде наведено повна реалізація розв'язку, включаючи LCA:

<!--- TODO: specify code snippet id -->
``` cpp
const int INF = 1000 * 1000 * 1000;

typedef vector<vector<int>> graph;

vector<int> dfs_list;
vector<int> ribs_list;
vector<int> h;

void dfs(int v, const graph &g, const graph &rib_ids, int cur_h = 1) {
    h[v] = cur_h;
    dfs_list.push_back(v);
    for (size_t i = 0; i < g[v].size(); ++i)
        if (h[g[v][i]] == -1) {
            ribs_list.push_back(rib_ids[v][i]);
            dfs(g[v][i], g, rib_ids, cur_h + 1);
            ribs_list.push_back(rib_ids[v][i]);
            dfs_list.push_back(v);
        }
}

vector<int> lca_tree;
vector<int> first;

void lca_tree_build(int i, int l, int r) {
    if (l == r)
        lca_tree[i] = dfs_list[l];
    else {
        int m = (l + r) >> 1;
        lca_tree_build(i + i, l, m);
        lca_tree_build(i + i + 1, m + 1, r);
        int lt = lca_tree[i + i], rt = lca_tree[i + i + 1];
        lca_tree[i] = h[lt] < h[rt] ? lt : rt;
    }
}

void lca_prepare(int n) {
    lca_tree.assign(dfs_list.size() * 8, -1);
    lca_tree_build(1, 0, (int)dfs_list.size() - 1);

    first.assign(n, -1);
    for (int i = 0; i < (int)dfs_list.size(); ++i) {
        int v = dfs_list[i];
        if (first[v] == -1)
            first[v] = i;
    }
}

int lca_tree_query(int i, int tl, int tr, int l, int r) {
    if (tl == l && tr == r)
        return lca_tree[i];
    int m = (tl + tr) >> 1;
    if (r <= m)
        return lca_tree_query(i + i, tl, m, l, r);
    if (l > m)
        return lca_tree_query(i + i + 1, m + 1, tr, l, r);
    int lt = lca_tree_query(i + i, tl, m, l, m);
    int rt = lca_tree_query(i + i + 1, m + 1, tr, m + 1, r);
    return h[lt] < h[rt] ? lt : rt;
}

int lca(int a, int b) {
    if (first[a] > first[b])
        swap(a, b);
    return lca_tree_query(1, 0, (int)dfs_list.size() - 1, first[a], first[b]);
}

vector<int> first1, first2;
vector<char> rib_used;
vector<int> tree1, tree2;

void query_prepare(int n) {
    first1.resize(n - 1, -1);
    first2.resize(n - 1, -1);
    for (int i = 0; i < (int)ribs_list.size(); ++i) {
        int j = ribs_list[i];
        if (first1[j] == -1)
            first1[j] = i;
        else
            first2[j] = i;
    }

    rib_used.resize(n - 1);
    tree1.resize(ribs_list.size() * 8);
    tree2.resize(ribs_list.size() * 8);
}

void sum_tree_update(vector<int> &tree, int i, int l, int r, int j, int delta) {
    tree[i] += delta;
    if (l < r) {
        int m = (l + r) >> 1;
        if (j <= m)
            sum_tree_update(tree, i + i, l, m, j, delta);
        else
            sum_tree_update(tree, i + i + 1, m + 1, r, j, delta);
    }
}

int sum_tree_query(const vector<int> &tree, int i, int tl, int tr, int l, int r) {
    if (l > r || tl > tr)
        return 0;
    if (tl == l && tr == r)
        return tree[i];
    int m = (tl + tr) >> 1;
    if (r <= m)
        return sum_tree_query(tree, i + i, tl, m, l, r);
    if (l > m)
        return sum_tree_query(tree, i + i + 1, m + 1, tr, l, r);
    return sum_tree_query(tree, i + i, tl, m, l, m) + sum_tree_query(tree, i + i + 1, m + 1, tr, m + 1, r);
}

int query(int v1, int v2) { return sum_tree_query(tree1, 1, 0, (int)ribs_list.size() - 1, first[v1], first[v2] - 1) - sum_tree_query(tree2, 1, 0, (int)ribs_list.size() - 1, first[v1], first[v2] - 1); }

int main() {
    // читання графа
    int n;
    scanf("%d", &n);
    graph g(n), rib_ids(n);
    for (int i = 0; i < n - 1; ++i) {
        int v1, v2;
        scanf("%d%d", &v1, &v2);
        --v1, --v2;
        g[v1].push_back(v2);
        g[v2].push_back(v1);
        rib_ids[v1].push_back(i);
        rib_ids[v2].push_back(i);
    }

    h.assign(n, -1);
    dfs(0, g, rib_ids);
    lca_prepare(n);
    query_prepare(n);

    for (;;) {
        if () {
            // запит про фарбування ребра з номером x;
            //    якщо start=true, то ребро красится, інакше покраска снимается
            rib_used[x] = start;
            sum_tree_update(tree1, 1, 0, (int)ribs_list.size() - 1, first1[x], start ? 1 : -1);
            sum_tree_update(tree2, 1, 0, (int)ribs_list.size() - 1, first2[x], start ? 1 : -1);
        } else {
            // запит кол-ва покрашенных ребер на шляхи між v1 і v2
            int l = lca(v1, v2);
            int result = query(l, v1) + query(l, v2);
            // result - відповідь на запит
        }
    }
}
```
