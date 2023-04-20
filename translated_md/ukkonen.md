# Суфіксне дерево. Алгоритм Уконена

Ця стаття - временная заглушка, і не містить ніяких описаний.

Опис алгоритму Уконена можна знайти, наприклад, в книзі Гасфилда "Рядки, дерева і послідовності в алгоритмах".

## Реалізація алгоритму Уконена

Цей алгоритм будує суфіксне дерево для даній рядка довжини $n$ за час $O(n \log k)$, де $k$ - розмір алфавіту (якщо його вважати константою, то асимптотика виходить $O(n)$).

Входными даними для алгоритму є рядок $s$ і її довжина $n$, які передаются в вигляді глобальних змінних.

Основна функція - $\rm build\_tree$, вона будує суфіксне дерево. Дерево зберігається в вигляді масиву структур $\rm node$, де ${\rm node}[0]$ - корінь суфіксного дерева.

В цілях простоти коду ребра зберігаються в тих ж самих структурах: для кожної вершини в її структурі $\rm node$ записаны дані про ребрі, входящем в її з предка. Разом, в кожної $\rm node$ зберігаються: $(l,r)$, определяющие метку $s[l..r-1]$ ребра в предка, $\rm par$ - вершина-предок, $\rm link$ - суфіксна посилання, $\rm next$ - список вихідних ребер.

<!--- TODO: specify code snippet id -->
``` cpp
string s;
int n;

struct node {
    int l, r, par, link;
    map<char, int> next;

    node(int l = 0, int r = 0, int par = -1) : l(l), r(r), par(par), link(-1) {}
    int len() { return r - l; }
    int &get(char c) {
        if (!next.count(c))
            next[c] = -1;
        return next[c];
    }
};
node t[MAXN];
int sz;

struct state {
    int v, pos;
    state(int v, int pos) : v(v), pos(pos) {}
};
state ptr(0, 0);

state go(state st, int l, int r) {
    while (l < r)
        if (st.pos == t[st.v].len()) {
            st = state(t[st.v].get(s[l]), 0);
            if (st.v == -1)
                return st;
        } else {
            if (s[t[st.v].l + st.pos] != s[l])
                return state(-1, -1);
            if (r - l < t[st.v].len() - st.pos)
                return state(st.v, st.pos + r - l);
            l += t[st.v].len() - st.pos;
            st.pos = t[st.v].len();
        }
    return st;
}

int split(state st) {
    if (st.pos == t[st.v].len())
        return st.v;
    if (st.pos == 0)
        return t[st.v].par;
    node v = t[st.v];
    int id = sz++;
    t[id] = node(v.l, v.l + st.pos, v.par);
    t[v.par].get(s[v.l]) = id;
    t[id].get(s[v.l + st.pos]) = st.v;
    t[st.v].par = id;
    t[st.v].l += st.pos;
    return id;
}

int get_link(int v) {
    if (t[v].link != -1)
        return t[v].link;
    if (t[v].par == -1)
        return 0;
    int to = get_link(t[v].par);
    return t[v].link = split(go(state(to, t[to].len()), t[v].l + (t[v].par == 0), t[v].r));
}

void tree_extend(int pos) {
    for (;;) {
        state nptr = go(ptr, pos, pos + 1);
        if (nptr.v != -1) {
            ptr = nptr;
            return;
        }

        int mid = split(ptr);
        int leaf = sz++;
        t[leaf] = node(pos, n, mid);
        t[mid].get(s[pos]) = leaf;

        ptr.v = get_link(mid);
        ptr.pos = t[ptr.v].len();
        if (!mid)
            break;
    }
}

void build_tree() {
    sz = 1;
    for (int i = 0; i < n; ++i)
        tree_extend(i);
}
```

## Сжатая реалізація

Наведемо також наступну компактную реалізацію алгоритму Уконена, предложенную [freopen](http://codeforces.ru/profile/freopen):

<!--- TODO: specify code snippet id -->
``` cpp
const int N = 1000000, INF = 1000000000;
string a;
int t[N][26], l[N], r[N], p[N], s[N], tv, tp, ts, la;

void ukkadd(int c) {
suff:;
    if (r[tv] < tp) {
        if (t[tv][c] == -1) {
            t[tv][c] = ts;
            l[ts] = la;
            p[ts++] = tv;
            tv = s[tv];
            tp = r[tv] + 1;
            goto suff;
        }
        tv = t[tv][c];
        tp = l[tv];
    }
    if (tp == -1 || c == a[tp] - 'a')
        tp++;
    else {
        l[ts + 1] = la;
        p[ts + 1] = ts;
        l[ts] = l[tv];
        r[ts] = tp - 1;
        p[ts] = p[tv];
        t[ts][c] = ts + 1;
        t[ts][a[tp] - 'a'] = tv;
        l[tv] = tp;
        p[tv] = ts;
        t[p[ts]][a[l[ts]] - 'a'] = ts;
        ts += 2;
        tv = s[p[ts - 2]];
        tp = l[ts - 2];
        while (tp <= r[ts - 2]) {
            tv = t[tv][a[tp] - 'a'];
            tp += r[tv] - l[tv] + 1;
        }
        if (tp == r[ts - 2] + 1)
            s[ts - 2] = tv;
        else
            s[ts - 2] = ts;
        tp = r[tv] - (tp - r[ts - 2]) + 2;
        goto suff;
    }
}

void build() {
    ts = 2;
    tv = 0;
    tp = 0;
    fill(r, r + N, (int)a.size() - 1);
    s[0] = 1;
    l[0] = -1;
    r[0] = -1;
    l[1] = -1;
    r[1] = -1;
    memset(t, -1, sizeof t);
    fill(t[1], t[1] + 26, 0);
    for (la = 0; la < (int)a.size(); ++la)
        ukkadd(a[la] - 'a');
}
```

Тот ж самий код, прокомментированный:

<!--- TODO: specify code snippet id -->
``` cpp
const int N = 1000000, // максимальне кількість вершин в суфіксном дереві
    INF = 1000000000;  // константа "нескінченність"
string a;              // вхідні рядок, для якій треба побудувати дерево
int t[N][26],          // масив переходів (стан, літера)
    l[N],              // ліва
    r[N],              // і права межі підрядки з a, отвечающие ребру, входящему в вершину
    p[N],              // предок вершини
    s[N],              // суфіксна посилання
    tv,                // вершина поточного суфікса (якщо ми посередині ребра, то нижня вершина ребра)
    tp,                // становище в рядка відповідне месту на ребрі (від l[tv] до r[tv] включно)
    ts,                // кількість вершин
    la;                // поточний символ рядка

void ukkadd(int c) {  // дописати до дереву символ c
suff:;                // будемо приходить сюди після кожного переходу до суфіксу (і заново додавати символ)
    if (r[tv] < tp) { // перевіримо, не вылезли або ми за межі поточного ребра
        // якщо вылезли, найдем випливає ребро. Якщо його ні - створимо лист і прицепим до дереву
        if (t[tv][c] == -1) {
            t[tv][c] = ts;
            l[ts] = la;
            p[ts++] = tv;
            tv = s[tv];
            tp = r[tv] + 1;
            goto suff;
        }
        tv = t[tv][c];
        tp = l[tv]; // в іншому випадку просто перейдем до наступного ребру
    }
    if (tp == -1 || c == a[tp] - 'a')
        tp++;
    else { // якщо літера на ребрі збігається з c то идем по ребру, а інакше
        // разделяем ребро на два. Посередине - вершина ts
        l[ts] = l[tv];
        r[ts] = tp - 1;
        p[ts] = p[tv];
        t[ts][a[tp] - 'a'] = tv;
        // ставимо лист ts+1. Він відповідає переходу по c.
        t[ts][c] = ts + 1;
        l[ts + 1] = la;
        p[ts + 1] = ts;
        // оновлюємо параметри поточній вершини. Чи Не забути про перехід від предка tv до ts.
        l[tv] = tp;
        p[tv] = ts;
        t[p[ts]][a[l[ts]] - 'a'] = ts;
        ts += 2;
        // готовимся до спуску: поднялись на ребро і перейшли по суфіксному посиланню.
        // tp буде відзначати, де ми в поточному суфікс.
        tv = s[p[ts - 2]];
        tp = l[ts - 2];
        // поки поточний суфікс не кончился, топаем вниз
        while (tp <= r[ts - 2]) {
            tv = t[tv][a[tp] - 'a'];
            tp += r[tv] - l[tv] + 1;
        }
        // якщо ми прийшли в вершину, то поставимо в нее суфіксну посилання, інакше поставимо в ts
        // (адже на след. ітерації ми створимо ts).
        if (tp == r[ts - 2] + 1)
            s[ts - 2] = tv;
        else
            s[ts - 2] = ts;
        // устанавливаем tp на нове ребро і идем додавати букву до суфіксу.
        tp = r[tv] - (tp - r[ts - 2]) + 2;
        goto suff;
    }
}

void build() {
    ts = 2;
    tv = 0;
    tp = 0;
    fill(r, r + N, (int)a.size() - 1);
    // инициализируем дані для кореня дерева
    s[0] = 1;
    l[0] = -1;
    r[0] = -1;
    l[1] = -1;
    r[1] = -1;
    memset(t, -1, sizeof t);
    fill(t[1], t[1] + 26, 0);
    // додаємо текст в дерево по однієї букві
    for (la = 0; la < (int)a.size(); ++la)
        ukkadd(a[la] - 'a');
}
```

## Задачі в online judges

Задачі, які можна розв'язати, використовуючи суфіксне дерево:

* [UVA #10679 **"I Love Strings!!!"** [складність: середня]](http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1620)
