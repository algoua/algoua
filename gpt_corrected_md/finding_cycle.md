# Перевірка графа на ацикличність та знаходження циклу

Нехай дано орієнтований або неорієнтований граф без петель та кратних ребер. Потрібно перевірити, чи є він ациклічним, а якщо ні, то знайти будь-який цикл.

Вирішимо цю задачу з допомогою [пошуку в глибину](пошук в глибину) за O(M).

## Алгоритм

Зробимо серію пошуків у глибину в графі. З кожної вершини, в яку ми ще не заходили, запустимо пошук у глибину, який під час входу в вершину буде фарбувати її в сірий колір, а під час виходу - в чорний. Якщо під час пошуку у глибину ми намагаємося зайти в сіру вершину, то це означає, що ми знайшли цикл. Якщо граф є неорієнтований, то випадки, коли пошук у глибину з якоїсь вершини намагається піти в її предка, не вважаються.

Цикл можна відновити, пройшовши по масиву батьків.

## Реалізація

Тут наведено реалізацію для випадку орієнтованого графу.

<!--- TODO: specify code snippet id -->
``` cpp
int n;
vector<vector<int>> g;
vector<char> cl;
vector<int> p;
int cycle_st, cycle_end;

bool dfs(int v) {
    cl[v] = 1;
    for (size_t i = 0; i < g[v].size(); ++i) {
        int to = g[v][i];
        if (cl[to] == 0) {
            p[to] = v;
            if (dfs(to))
                return true;
        } else if (cl[to] == 1) {
            cycle_end = v;
            cycle_st = to;
            return true;
        }
    }
    cl[v] = 2;
    return false;
}

int main() {
...читання графу...

        p.assign(n, -1);
    cl.assign(n, 0);
    cycle_st = -1;
    for (int i = 0; i < n; ++i)
        if (dfs(i))
            break;

    if (cycle_st == -1)
        puts("Acyclic");
    else {
        puts("Cyclic");
        vector<int> cycle;
        cycle.push_back(cycle_st);
        for (int v = cycle_end; v != cycle_st; v = p[v])
            cycle.push_back(v);
        cycle.push_back(cycle_st);
        reverse(cycle.begin(), cycle.end());
        for (size_t i = 0; i < cycle.size(); ++i)
            printf("%d ", cycle[i] + 1);
    }
}
```