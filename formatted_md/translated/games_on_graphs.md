# Игры на довільних графах

Нехай гра ведеться двома игроками на деякому графі G. тобто. поточний стан гри - це деяка вершина графа, і з кожної вершини ребра йдуть в ті вершини, в які можна піти наступним ходом.

Ми розглядаємо самий загальний випадок - випадок довільного орієнтованого графа з циклами. Потрібно для заданої початкової позиції визначити, хто виграє при оптимальної грі обох гравців (або визначити, що результатом буде ничья).

Ми вирішимо цю задачу дуже ефективно - найдемо відповіді для всіх вершин графа за лінійне щодо кількості ребер час - **O (M)**.

## Опис алгоритму

Про деякі вершини графа заздалегідь відомо, що вони є выигрышными або проигрышными; очевидно, такі вершини не мають вихідних ребер.

Маємо наступні **факти**:

* якщо з деякої вершини є ребро в проигрышную вершину, то ця вершина виграшна;
* якщо з деякої вершини всі ребра исходят в виграшні вершини, то ця вершина програшна;
* якщо в якийсь момент ще залишилися неопределённые вершини, але ні одна з них не подходят ні під перший, ні під друге правило, то всі ці вершини - ничейные.

Таким чином, вже ясен алгоритм, працюючий за асимптотику O (N M) - ми перебираємо всі вершини, намагаємося до кожної застосувати перший або друге правило, і якщо ми произвели які-то зміни, то повторюємо усе заново.

Однак цей процес пошуку і поновлення можна значно прискорити, доведя асимптотику до лінійної.

Переберемо всі вершини, про які спершу відомо, що вони виграшні або програшні. З кожної з них пустимо наступного пошук в глибину. Цей пошук в глибину буде рухатися по зворотним ребрам. Прежде всього, він не буде заходити в вершини, які вже визначені як виграшні або програшні. Далі, якщо пошук в глибину намагається піти з проигрышной вершини в деяку вершину, то її він позначає як виграшну, і йде в її. Якщо ж пошук в глибину намагається піти з виграшній вершини в деяку вершину, то він повинен перевірити, всі або ребра ведуть з цій вершини в виграшні. Цю перевірку легко осуществить за O (1), якщо в кожної вершині будемо зберігати лічильник ребер, які ведуть в виграшні вершини. Отже, якщо пошук в глибину намагається піти з виграшній вершини в деяку вершину, то він збільшує в ній лічильник, і якщо лічильник сравнялся з кількістю ребер, вихідних з цій вершини, то ця вершина позначається як програшна, і пошук в глибину йде в цю вершину. Інакше ж, якщо целевая вершина так і не визначена як виграшна або програшна, то пошук в глибину в її не заходить.

Разом, ми отримуємо, що кожна виграшна і кожна програшна вершина посещается нашим алгоритмом рівне один раз, а ничейные вершини і зовсім не посещаются. Отже, асимптотика дійсно **O (M)**.

## Реалізація

Розглянемо реалізацію пошуку в глибину, в припущенні, що граф гри побудований в пам'яті, степені исхода посчитаны і записаны в degree (це буде як раз счётчиком, він буде зменшуватися, якщо є ребро в виграшну вершину), а також спершу виграшні або програшні вершини вже позначені.

<!--- TODO: specify code snippet id -->
``` cpp
vector<int> g [100];
bool win [100];
bool loose [100];
bool used[100];
int degree[100];

void dfs (int v) {
    used[v] = true;
    for (vector<int>::iterator i = g[v].begin(); i != g[v].end(); ++i)
        if (!used[*i]) {
            if (loose[v])
                win[*i] = true;
            else if (--degree[*i] == 0)
                loose[*i] = true;
            else
                continue;
            dfs (*i);
        }
}
```

## Приклад задачі. "Полицейский і злодій"

Щоб алгоритм став більш ясным, розглянемо його на конкретном прикладі.

**Умова задачі**. Є поле розміром MxN клітин, в деякі клітини заходити не можна. Известны початкові координати поліцейського і злодія. Також на мапі можливо бути присутнім выход. Якщо поліцейський виявиться в однієї клітці з вором, то выиграл поліцейський. Якщо ж злодій виявиться в клітці з выходом (і в цій клітці не варто поліцейський), то виграє злодій. Полицейский можливо ходить в 8 напрямках, злодій - тільки в 4 (уздовж осей координат). І поліцейський, і злодій можуть пропустити свій хід. Першим хід робить поліцейський.

**Побудова графа**. Побудуємо граф гри. Ми повинні формализовать правила гри. Текущее стан гри визначається координатами поліцейського P, злодія T, а також булева змінна Pstep, яка визначає, хто буде робити наступного хід. Отже, вершина графа визначена тройкой (P,T,Pstep). Граф побудувати легко, просто соответствуя умові.

Далі потрібно визначити, які вершини є выигрышными або проигрышными спершу. Тут є **тонкий момент**. Выигрышность/проигрышность вершини крім координат залежить і від Pstep - чей зараз хід. Якщо зараз хід поліцейського, то вершина виграшна, якщо координати поліцейського і злодія збігаються; вершина програшна, якщо вона не виграшна і злодій знаходиться на виході. Якщо ж зараз хід злодія, то вершина виграшна, якщо злодій знаходиться на виході, і програшна, якщо вона не виграшна і координати поліцейського і злодія збігаються.

Єдиний момент, якій потрібно розв'язати - будувати **граф явно або** робити це "**на ходу**", прямо в пошуку в глибину. З однієї сторони, якщо будувати граф попередньо, то буде менше ймовірність ошибиться. З іншої сторони, це увеличит об'єм коду, да і час роботи буде в декілька раз повільніше, ніж якщо будувати граф "на ходу".

**Реалізація** всій програми:

<!--- TODO: specify code snippet id -->
``` cpp
struct state {
    char p, t;
    bool pstep;
};

vector<state> g [100][100][2];
// 1 = policeman coords; 2 = thief coords; 3 = 1 if policeman\'s step or 0 if thief\'s.
bool win [100][100][2];
bool loose [100][100][2];
bool used[100][100][2];
int degree[100][100][2];

void dfs (char p, char t, bool pstep) {
    used[p][t][pstep] = true;
    for (vector<state>::iterator i = g[p][t][pstep].begin(); i != g[p][t][pstep].end(); ++i)
        if (!used[i->p][i->t][i->pstep]) {
            if (loose[p][t][pstep])
                win[i->p][i->t][i->pstep] = true;
            else if (--degree[i->p][i->t][i->pstep] == 0)
                loose[i->p][i->t][i->pstep] = true;
            else
                continue;
            dfs (i->p, i->t, i->pstep);
        }
}

int main() {

    int n, m;
    cin >> n >> m;
    vector<string> a (n);
    for (int i=0; i<n; ++i)
        cin >> a[i];

    for (int p=0; p<n*m; ++p)
        for (int t=0; t<n*m; ++t)
            for (char pstep=0; pstep<=1; ++pstep) {
                int px = p/m, py = p%m, tx=t/m, ty=t%m;
                if (a[px][py]==\'*\' || a[tx][ty]==\'*\')  continue;
                
                bool & wwin = win[p][t][pstep];
                bool & lloose = loose[p][t][pstep];
                if (pstep)
                    wwin = px==tx && py==ty,   lloose = !wwin && a[tx][ty] == \'E\';
                else
                    wwin = a[tx][ty] == \'E\',   lloose = !wwin && px==tx && py==ty;
                if (wwin || lloose)  continue;

                state st = { p, t, !pstep };
                g[p][t][pstep].push_back (st);
                st.pstep = pstep != 0;
                degree[p][t][pstep] = 1;
                
                const int dx[] = { -1, 0, 1, 0,   -1, -1, 1, 1 };
                const int dy[] = { 0, 1, 0, -1,   -1, 1, -1, 1 };
                for (int d=0; d<(pstep?8:4); ++d) {
                    int ppx=px, ppy=py, ttx=tx, tty=ty;
                    if (pstep)
                        ppx += dx[d],  ppy += dy[d];
                    else
                        ttx += dx[d],  tty += dy[d];
                    if (ppx>=0 && ppx<n && ppy>=0 && ppy<m && a[ppx][ppy]!=\'*\' &&
                        ttx>=0 && ttx<n && tty>=0 && tty<m && a[ttx][tty]!=\'*\')
                    {
                        g[ppx*m+ppy][ttx*m+tty][!pstep].push_back (st);
                        ++degree[p][t][pstep];
                    }
                }
            }

    for (int p=0; p<n*m; ++p)
        for (int t=0; t<n*m; ++t)
            for (char pstep=0; pstep<=1; ++pstep)
                if ((win[p][t][pstep] || loose[p][t][pstep]) && !used[p][t][pstep])
                    dfs (p, t, pstep!=0);

    int p_st, t_st;
    for (int i=0; i<n; ++i)
        for (int j=0; j<m; ++j)
            if (a[i][j] == \'C\')
                p_st = i*m+j;
            else if (a[i][j] == \'T\')
                t_st = i*m+j;

    cout << (win[p_st][t_st][true] ? "WIN" : loose[p_st][t_st][true] ? "LOSS" : "DRAW");

}
```