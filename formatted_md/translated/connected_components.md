# Алгоритм пошуку компонент зв'язності в графі

Дан неорієнтований граф $G$ з $n$ вершинами і $m$ ребрами. Потрібно знайти в ньому всі компоненти зв'язності, тобто розбити вершини графа на декілька груп так, що всередині однієї групи можна дійти від однієї вершини до будь-якої іншої, а між різними группами - шляхи не існує.

## Алгоритм розв'язку

Для розв'язку можна скористатися як [обходом в глибину](dfs), так і [обходом в ширину](bfs).

Фактично, ми будемо виробляти **серію обходів**: спочатку запустимо обхід з першо] вершини, і всі вершини, які він при цим обошёл - утворюють першу компоненту зв'язності. Потім найдемо першу з залишилися вершин, які ще не були відвідані, і запустимо обхід з її, знайшовши тим самим одному компоненту зв'язності. І так далі, поки всі вершини не стануть помеченными.

Підсумкова **асимптотика** складе $O(n + m)$: насправді, такий алгоритм не буде запускаться від однієї і тією ж вершини двічі, а, значить, кожне ребро буде переглянуто рівне два рази (з одного кінця і з іншого кінця).

## Реалізація

Для реалізації трохи більш удобным є [обхід в глибину](dfs):

<!--- TODO: specify code snippet id -->
``` cpp
int n;
vector<int> g[MAXN];
bool used[MAXN];
vector<int> comp;

void dfs (int v) {
    used[v] = true;
    comp.push_back (v);
    for (size_t i=0; i<g[v].size(); ++i) {
        int to = g[v][i];
        if (! used[to])
            dfs (to);
    }
}

void find_comps() {
    for (int i=0; i<n; ++i)
        used[i] = false;
    for (int i=0; i<n; ++i)
        if (! used[i]) {
            comp.clear();
            dfs (i);

            cout << "Component:";
            for (size_t j=0; j<comp.size(); ++j)
                cout << ' ' << comp[j];
            cout << endl;
        }
}
```

Основна функція для виклику - $\rm find\_comps()$, вона знаходить і виводить компоненти зв'язності графа.

Ми припустимо, що граф завдань списками суміжності, тобто $g[i]$ містить список вершин, в які є ребра з вершини $i$. Константі $\rm MAXN$ випливає задати значення, рівне максимально можливого кількості вершин в графі.

Вектор $\rm comp$ містить список вершин в поточній компоненті зв'язності.