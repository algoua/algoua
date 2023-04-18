# Найменший загальний предок. Знаходження за $O(1)$ з препроцесуванням $O(N)$ (алгоритм Фарах-Колтона і Бендера)

Нехай дано дерево G. На вхід надходять запити уваги (V1, V2). Для кожного запиту потрібно знайти їх найменшого загального предка, тобто вершину V, яка лежить на шляху від кореня до V1, на шляху від кореня до V2, і з усіх таких вершин потрібно вибрати саму нижчу. Іншими словами, шукана вершина V - предок і V1, і V2, і серед усіх таких загальних предків потрібно вибрати найнижчу. Очевидно, що найменший загальний предок вершин V1 і V2 - це їх загальний предок, що лежить на найкоротшому шляху з V1 до V2. Зокрема, якщо V1 є предком V2, то V1 є їх найменшим загальним предком.

На англійській ця задача називається задачею LCA - Lowest Common Ancestor.

Описаний тут алгоритм Фараха-Колтона і Бендера (Farach-Colton, Bender) є асимптотично оптимальним, і при цьому порівняно простим (порівняно з іншими алгоритмами, наприклад, Шибера-Вішкіна).

## Алгоритм

Скористаємося класичним перетворенням задачі LCA **на задачу RMQ** (для пояснень дивіться [статтю про знаходження найменшого загального предка за O(sqrt(N)) і O(log N) з препроцесингом O(N)](lca)). Тепер навчимося розв'язувати задачу RMQ в даному конкретному випадку з препроцесінгом O(N) і запитом O(1).

Зауважимо, що задача RMQ, до якої ми звели задачу LCA, є дуже специфічною: будь-які два сусідні елементи в масиві **відрізняються на одиницю** (адже елементи масиву - це ніщо інше, як висоти вершин, які відвідуються в порядку обходу, і ми або йдемо до нащадка, тоді наступний елемент буде на 1 більше, або йдемо до предка, тоді наступний елемент буде на 1 менше). Власне алгоритм Фарах-Колтона і Бендера саме й є розв'язком такої задачі RMQ.

Позначимо масив, над яким виконуються запити RMQ, через A, а розмір цього масиву - через N.

Побудуємо спочатку алгоритм, який вирішує цю задачу **з попереднім обробленням O(N log N) і відповіддю на запит O(1)**. Це можна зробити легко: створимо так званий Sparse Table T[l,i], де кожен елемент T[l,i] дорівнює мінімуму A на проміжку [l; l+2<sup>i</sup>). Очевидно, 0 <= i <= &lceil;log N&rceil;, тому розмір Sparse Table буде O(N log N). Побудувати його також легко за O(N log N), якщо помітити, що T[l,i] = min(T[l,i-1], T[l+2<sup>i-1</sup>,i-1]). Як тепер відповісти на кожен запит RMQ за O(1)? Нехай надійшов запит (l,r), тоді відповіддю буде min(T[l,sz], T[r-2<sup>sz</sup>+1,sz]), де sz - найбільша ступінь двійки, не більша за r-l+1. Дійсно, ми можемо взяти відрізок (l,r) і покрити його двома відрізками довжиною 2<sup>sz</sup> - один, що починається в l, і інший, що закінчується в r (причому ці відрізки перекриваються, що в даному випадку не заважає). Щоб дійсно досягти асимптотики O(1) на запит, ми повинні попередньо обчислити значення sz для всіх можливих довжин від 1 до N.

Тепер опишемо, **як покращити** цей алгоритм до асимптотики O(N).

Розіб'ємо масив A на блоки розміром K = 0.5 log<sub>2</sub> N. Для кожного блоку порахуємо мінімальний елемент у ньому і його позицію (оскільки для розв'язку задачі LCA нам важливі не самі мінімуми, а їх позиції). Нехай B - це масив розміром N / K, складений з цих мінімумів у кожному блоку. Побудуємо за масивом B Sparse Table, як описано вище, при цьому розмір Sparse Table і час її побудови будуть рівні:

$$
N/K log N/K = (2N / log N) log (2N / log N) =
= (2N / log N) (1 + log (N / log N)) <= 2N / log N + 2N = O (N)
$$

Тепер нам залишилося тільки навчитися швидко відповідати на запити RMQ **в кожному блоку**. Насправді, якщо надійшов запит RMQ(l,r), то, якщо l і r знаходяться в різних блоках, то відповіддю буде мінімум з наступних значень: мінімум в блоці l, починаючи з l і до кінця блоку, потім мінімум в блоках після l і до r (не включно), і нарешті мінімум в блоці r, від початку блоку до r. На запит "мінімум в блоках" ми вже можемо відповідати за O(1) з допомогою Sparse Table, залишилися тільки запити RMQ всередині блоків.

Тут ми скористаємось "+1/-1 властивістю". Зауважимо, що якщо від кожного елементу всередині кожного блоку відняти перший елемент, то всі блоки будуть однозначно визначатися послідовністю довжини K-1, що складається з чисел +1/-1. Отже, кількість різних блоків буде рівна:

$$
2<sup>K-1</sup> = 2<sup>0.5 log N - 1</sup> = 0.5 sqrt(N)
$$

Отже, кількість різних блоків буде O(sqrt(N)), тому ми можемо передпосчитувати результати RMQ всередині всіх різних блоків за O(sqrt(N) K<sup>2</sup>) = O(sqrt(N) log<sup>2</sup> N) = O(N). З точки зору реалізації, ми можемо кожен блок характеризувати бітовою маскою довжини K-1 (яка, очевидно, поміститься в стандартний тип int), і зберігати передпосчитані RMQ в деякому масиві R[mask,l,r] розміру O(sqrt(N) log<sup>2</sup> N).

Отже, ми навчилися передраховувати результати RMQ всередині кожного блоку та RMQ над самими блоками, все це в сумі за O(N), та відповідати на кожен запит RMQ за O(1) – користуючись тільки передвизначеними значеннями, у гіршому випадку чотирма: у блоку l, у блоку r, та на блоках між l та r, не включаючи їх.

## Реалізація

У початку програми вказано константи MAXN, LOG_MAXLIST і SQRT_MAXLIST, що визначають максимальну кількість вершин у графі, яку, за необхідності, потрібно збільшити.

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