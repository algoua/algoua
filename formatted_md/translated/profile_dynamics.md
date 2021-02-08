# Динаміка по профілю. Задача "паркет"

Типичными завданнями на динаміку по профілю, є:

* знайти кількість способів замощения поля деякими фигурами
* знайти замощення з найменшим кількістю фігур
* знайти замощення з мінімальним кількістю неиспользованных клітин
* знайти замощення з мінімальним кількістю фігур таке, що в нього не можна додати ще одну фігуру

## Задача "Паркет"

Є прямокутна площа розміром NxM. Потрібно знайти кількість способів замостить цю площа фигурами 1x2 (пустых клітин не має оставаться, фігури не повинні накладываться один на одного).

Побудуємо таку динаміку: D[I][Mask], де I=1..N, Mask=0..2^M-1. I позначає кількість стрічок в поточному поле, а Mask - профиль останньої стрічки в поточному поле. Якщо j-й біт в Mask рівний нулю, то в цим місці профиль проходити на "нормальном рівні", а якщо 1 - то тут "выемка" глубиной 1. Відповіддю, очевидно, буде D[N][0].

Строить таку динаміку будемо, просто перебираючи всі I=1..N, всі маски Mask=0..2^M-1, і для кожної маски будемо робити переходи вперед, тобто додавати до ній нову фігуру усіма можливими способами.

**Реалізація:**

<!--- TODO: specify code snippet id -->
``` cpp
int n, m;
vector < vector<long long> > d;

void calc (int x = 0, int y = 0, int mask = 0, int next_mask = 0)
{
    if (x == n)
        return;
    if (y >= m)
        d[x+1][next_mask] += d[x][mask];
    else
    {
        int my_mask = 1 << y;
        if (mask & my_mask)
            calc (x, y+1, mask, next_mask);
        else
        {
            calc (x, y+1, mask, next_mask | my_mask);
            if (y+1 < m && ! (mask & my_mask) && ! (mask & (my_mask << 1)))
                calc (x, y+2, mask, next_mask);
        }
    }
}

int main()
{
    cin >> n >> m;
    
    d.resize (n+1, vector<long long> (1<<m));
    d[0][0] = 1;
    for (int x=0; x<n; ++x)
        for (int mask=0; mask<(1<<m); ++mask)
            calc (x, 0, mask, 0);

    cout << d[n][0];

}
```