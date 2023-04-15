# Перевірка графа на ациклічності і знаходження циклу

Нехай дано орієнтований або неорієнтований граф без петель і кратних ребер. Потрібно перевірити, є або він ациклическим, а якщо не є, то знайти будь-який цикл.

Вирішимо цю задачу з допомогою [пошуку в глибину](dfs) за O (M).

## Алгоритм

Зробимо серію пошуків в глибину в графі. тобто. з кожної вершини, в яку ми ще ні разу не приходили, запустимо пошук в глибину, який при в ході в вершину буде красить її в серый колір, а при виході - в чорний. І якщо пошук в глибину намагається піти в серую вершину, то це означає, що ми знайшли цикл (якщо граф неорієнтований, то випадки, коли пошук в глибину з якийсь вершини намагається піти в предка, не вважаються).

Сам цикл можна відновити проходом по масиву предків.

## Реалізація

Тут наведено реалізація для випадку орієнтованого графа.

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
    ... читання графа...

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
