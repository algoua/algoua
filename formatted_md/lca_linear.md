# Наименьший общий предок. Нахождение за O (1) с препроцессингом O (N) (алгоритм Фарах-Колтона и Бендера)

Пусть дано дерево G. На вход поступают запросы вида (V1, V2), для каждого запроса требуется найти их наименьшего общего предка, т.е. вершину V, которая лежит на пути от корня до V1, на пути от корня до V2, и из всех таких вершин следует выбирать самую нижнюю. Иными словами, искомая вершина V - предок и V1, и V2, и среди всех таких общих предков выбирается нижний. Очевидно, что наименьший общий предок вершин V1 и V2 - это их общий предок, лежащий на кратчайшем пути из V1 в V2. В частности, например, если V1 является предком V2, то V1 является их наименьшим общим предком.

На английском эта задача называется задачей LCA - Least Common Ancestor.

Описываемый здесь алгоритм Фарах-Колтона и Бендера (Farach-Colton, Bender) является асимптотически оптимальным, и при этом сравнительно простым (по сравнению с другими алгоритмами, например, Шибера-Вишкина).

## Алгоритм

Воспользуемся классическим сведением задачи LCA **к задаче RMQ** (минимум на отрезке) (более подробно см. [Наименьший общий предок. Нахождение за O (sqrt (N)) и O (log N) с препроцессингом O (N)](lca)). Научимся теперь решать задачу RMQ в данном частном случае с препроцессингом O (N) и O (1) на запрос.

Заметим, что задача RMQ, к которой мы свели задачу LCA, является весьма специфичной: любые два соседних элемента в массиве **отличаются ровно на единицу** (поскольку элементы массива - это не что иное как высоты вершин, посещаемых в порядке обхода, и мы либо идём в потомка, тогда следующий элемент будет на 1 больше, либо идём в предка, тогда следующий элемент будет на 1 меньше). Собственно алгоритм Фарах-Колтона и Бендера как раз и представляет собой решение такой задачи RMQ.

Обозначим через A массив, над которым выполняются запросы RMQ, а N - размер этого массива.

Построим сначала алгоритм, решающий эту задачу **с препроцессингом O (N log N) и O (1) на запрос**. Это сделать легко: создадим так называемую Sparse Table T[l,i], где каждый элемент T[l,i] равен минимуму A на промежутке [l; l+2<sup>i</sup>). Очевидно, 0 <= i <= &lceil;log N&rceil;, и потому размер Sparse Table будет O (N log N). Построить её также легко за O (N log N), если заметить, что T[l,i] = min (T[l,i-1], T[l+2<sup>i-1</sup>,i-1]). Как теперь отвечать на каждый запрос RMQ за O (1)? Пусть поступил запрос (l,r), тогда ответом будет min (T[l,sz], T[r-2<sup>sz</sup>+1,sz]), где sz - наибольшая степень двойки, не превосходящая r-l+1. Действительно, мы как бы берём отрезок (l,r) и покрываем его двумя отрезками длины 2<sup>sz</sup> - один начинающийся в l, а другой заканчивающийся в r (причём эти отрезки перекрываются, что в данном случае нам нисколько не мешает). Чтобы действительно достигнуть асимптотики O (1) на запрос, мы должны предпосчитать значения sz для всех возможных длин от 1 до N.

Теперь опишем, **как улучшить** этот алгоритм до асимптотики O (N).

Разобьём массив A на блоки размером K = 0.5 log<sub>2</sub> N. Для каждого блока посчитаем минимальный элемент в нём и его позицию (поскольку для решения задачи LCA нам важны не сами минимумы, а их позиции). Пусть B - это массив размером N / K, составленный из этих минимумов в каждом блоке. Построим по массиву B Sparse Table, как описано выше, при этом размер Sparse Table и время её построения будут равны:

$$
N/K log N/K = (2N / log N) log (2N / log N) =
= (2N / log N) (1 + log (N / log N)) <= 2N / log N + 2N = O (N)
$$

Теперь нам осталось только научиться быстро отвечать на запросы RMQ **внутри каждого блока**. В самом деле, если поступил запрос RMQ(l,r), то, если l и r находятся в разных блоках, то ответом будет минимум из следующих значений: минимум в блоке l, начиная с l и до конца блока, затем минимум в блоках после l и до r (не включительно), и наконец минимум в блоке r, от начала блока до r. На запрос "минимум в блоках" мы уже можем отвечать за O (1) с помощью Sparse Table, остались только запросы RMQ внутри блоков.

Здесь мы воспользуемся "+-1 свойством". Заметим, что, если внутри каждого блока от каждого его элемента отнять первый элемент, то все блоки будут однозначно определяться последовательностью длины K-1, состоящей из чисел +-1. Следовательно, количество различных блоков будет равно:

$$
2<sup>K-1</sup> = 2<sup>0.5 log N - 1</sup> = 0.5 sqrt(N)
$$

Итак, количество различных блоков будет O (sqrt (N)), и потому мы можем предпосчитать результаты RMQ внутри всех различных блоков за O (sqrt(N) K<sup>2</sup>) = O (sqrt(N) log<sup>2</sup> N) = O (N). С точки зрения реализации, мы можем каждый блок характеризовать битовой маской длины K-1 (которая, очевидно, поместится в стандартный тип int), и хранить предпосчитанные RMQ в некотором массиве R[mask,l,r] размера O (sqrt(N) log<sup>2</sup> N).

Итак, мы научились предпосчитывать результаты RMQ внутри каждого блока, а также RMQ над самими блоками, всё в сумме за O (N), а отвечать на каждый запрос RMQ за O (1) - пользуясь только предвычисленными значениями, в худшем случае четырьмя: в блоке l, в блоке r, и на блоках между l и r не включительно.

## Реализация

В начале программы указаны константы MAXN, LOG_MAXLIST и SQRT_MAXLIST, определяющие максимальное число вершин в графе, которые при необходимости надо увеличить.

<!--- TODO: specify code snippet id -->
``` cpp
const int MAXN = 100 * 1000;
const int MAXLIST = MAXN * 2;
const int LOG_MAXLIST = 18;
const int SQRT_MAXLIST = 447;
const int MAXBLOCKS = MAXLIST / ((LOG_MAXLIST + 1) / 2) + 1;

int n, root;
vector<int> g[MAXN];
int h[MAXN];                                              // vertex height
vector<int> a;                                            // dfs list
int a_pos[MAXN];                                          // positions in dfs list
int block;                                                // block size = 0.5 log A.size()
int bt[MAXBLOCKS][LOG_MAXLIST + 1];                       // sparse table on blocks (relative minimum positions in blocks)
int bhash[MAXBLOCKS];                                     // block hashes
int brmq[SQRT_MAXLIST][LOG_MAXLIST / 2][LOG_MAXLIST / 2]; // rmq inside each block, indexed by block hash
int log2[2 * MAXN];                                       // precalced logarithms (floored values)

// walk graph
void dfs(int v, int curh) {
    h[v] = curh;
    a_pos[v] = (int)a.size();
    a.push_back(v);
    for (size_t i = 0; i < g[v].size(); ++i)
        if (h[g[v][i]] == -1) {
            dfs(g[v][i], curh + 1);
            a.push_back(v);
        }
}

int log(int n) {
    int res = 1;
    while (1 << res < n)
        ++res;
    return res;
}

// compares two indices in a
inline int min_h(int i, int j) { return h[a[i]] < h[a[j]] ? i : j; }

// O(N) preprocessing
void build_lca() {
    int sz = (int)a.size();
    block = (log(sz) + 1) / 2;
    int blocks = sz / block + (sz % block ? 1 : 0);

    // precalc in each block and build sparse table
    memset(bt, 255, sizeof bt);
    for (int i = 0, bl = 0, j = 0; i < sz; ++i, ++j) {
        if (j == block)
            j = 0, ++bl;
        if (bt[bl][0] == -1 || min_h(i, bt[bl][0]) == i)
            bt[bl][0] = i;
    }
    for (int j = 1; j <= log(sz); ++j)
        for (int i = 0; i < blocks; ++i) {
            int ni = i + (1 << (j - 1));
            if (ni >= blocks)
                bt[i][j] = bt[i][j - 1];
            else
                bt[i][j] = min_h(bt[i][j - 1], bt[ni][j - 1]);
        }

    // calc hashes of blocks
    memset(bhash, 0, sizeof bhash);
    for (int i = 0, bl = 0, j = 0; i < sz || j < block; ++i, ++j) {
        if (j == block)
            j = 0, ++bl;
        if (j > 0 && (i >= sz || min_h(i - 1, i) == i - 1))
            bhash[bl] += 1 << (j - 1);
    }

    // precalc RMQ inside each unique block
    memset(brmq, 255, sizeof brmq);
    for (int i = 0; i < blocks; ++i) {
        int id = bhash[i];
        if (brmq[id][0][0] != -1)
            continue;
        for (int l = 0; l < block; ++l) {
            brmq[id][l][l] = l;
            for (int r = l + 1; r < block; ++r) {
                brmq[id][l][r] = brmq[id][l][r - 1];
                if (i * block + r < sz)
                    brmq[id][l][r] = min_h(i * block + brmq[id][l][r], i * block + r) - i * block;
            }
        }
    }

    // precalc logarithms
    for (int i = 0, j = 0; i < sz; ++i) {
        if (1 << (j + 1) <= i)
            ++j;
        log2[i] = j;
    }
}

// answers RMQ in block #bl [l;r] in O(1)

inline int lca_in_block(int bl, int l, int r) { return brmq[bhash[bl]][l][r] + bl * block; }

// answers LCA in O(1)
int lca(int v1, int v2) {
    int l = a_pos[v1], r = a_pos[v2];
    if (l > r)
        swap(l, r);
    int bl = l / block, br = r / block;
    if (bl == br)
        return a[lca_in_block(bl, l % block, r % block)];
    int ans1 = lca_in_block(bl, l % block, block - 1);
    int ans2 = lca_in_block(br, 0, r % block);
    int ans = min_h(ans1, ans2);
    if (bl < br - 1) {
        int pw2 = log2[br - bl - 1];
        int ans3 = bt[bl + 1][pw2];
        int ans4 = bt[br - (1 << pw2)][pw2];
        ans = min_h(ans, min_h(ans3, ans4));
    }
    return a[ans];
}
```
