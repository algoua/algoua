# Фарбування гілок дерева

Це досить часто зустрічається задача. Дано дерево G. Надходять запити двох видів: перший вид - пофарбувати деяке ребро, другий вид - запит кількості покрашених ребер між двома вершинами.

Тут буде описано достатньо простий розв'язок (з використанням [дерева відрізків](сегментне дерево)), який буде відповідати на запити за O(log N), з попереднім опрацюванням дерева за O(M).

## Розв'язок

Для початку нам доведеться реалізувати [знаходження спільного предка](lca), щоб кожний запит (i,j) сводився до двох запитів (a,b), де a - предок b.

Тепер опишемо **препроцесинг** саме для нашої задачі. Запустимо пошук у глибину з кореня дерева. Цей пошук у глибину складе деякий список відвідування вершин. Кожна вершина додається до списку, коли пошук заходить в неї, і кожен раз, після того, як пошук у глибину повертається з сина поточної вершини. До речі, цей список використовується алгоритмом LCA. У цьому списку буде присутнім кожне ребро. Якщо i і j - кінці ребра, то в списку обов'язково знайдеться місце, де i і j йдуть поспіль один за іншим. Причому кожне ребро буде присутнє двічі: в прямому напрямку (з i в j, де вершина i ближче до кореня, ніж вершина j) і в зворотньому (з j в i).

Побудуємо два дерева відрізків (для суми, з одиничною модифікацією) за цим списком: T1 і T2. Дерево T1 буде враховувати кожне ребро лише в прямому напрямку, а дерево T2 - навпаки, лише в зворотньому.

Нехай надійшов черговий запит до уваги (i,j), де i - предок j, і потрібно визначити, скільки ребер пофарбовано на шляху між i і j. Знайдемо i і j в списку обходу в глибину (нам обов'язково потрібні позиції, де вони зустрічаються вперше), нехай це деякі позиції p і q (це можна зробити за O(1), якщо обчислити ці позиції заздалегідь у часі препроцесингу). Отже, відповіддю буде сума T1[p..q-1] - сума T2[p..q-1].

Чому? Розглянемо відрізок [p;q] у списку обходу в глибину. Він містить ребра потрібного нам шляху з i до j, але також містить множину ребер, які лежать на інших шляхах з i. Однак між потрібними нам ребрами та іншими ребрами є одна велика відмінність: потрібні ребра будуть міститися в цьому списку тільки один раз, причому в прямому напрямку, а всі інші ребра будуть зустрічатися двічі: і в прямому, і в зворотньому напрямку. Отже, різницю T1[p..q-1] - T2[p..q-1] дастиме відповідь (мінус один потрібно, тому що інакше ми захопимо ще одне зайве ребро з вершини j кудись вниз або вгору). Запит суми в дереві відрізків виконується за O(log N).

Відповідь на **запит** увазі 1 (щодо фарбування якої-небудь грані) ще простіша - нам потрібно просто оновити T1 і T2, а саме виконати одиничну модифікацію того елементу, який відповідає нашій грані (знайти грань в списку обходу також можна за O(1), якщо виконати цей пошук в препроцесінгу). Однакову модифікацію в дереві відрізків можна виконати за O(logN).

## Реалізація

Тут буде наведено повну реалізацію розв'язку, включаючи найменшого спільного предка (НСП):

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
Читання графа
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
// Запит щодо фарбування ребра з номером x;
Якщо start=true, то ребро фарбується, інакше фарбування знімається
            rib_used[x] = start;
            sum_tree_update(tree1, 1, 0, (int)ribs_list.size() - 1, first1[x], start ? 1 : -1);
            sum_tree_update(tree2, 1, 0, (int)ribs_list.size() - 1, first2[x], start ? 1 : -1);
        } else {
// Запит на кількість пофарбованих ребер на шляхах між v1 та v2
            int l = lca(v1, v2);
            int result = query(l, v1) + query(l, v2);
// Результат - відповідь на запит
        }
    }
}
```