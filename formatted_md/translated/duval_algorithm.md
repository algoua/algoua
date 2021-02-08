# Декомпозиция Ліндона. Алгоритм Дюваля. Знаходження найменшого циклічного зсуву

## Понятие декомпозиції Ліндона

Визначимо поняття **декомпозиції Ліндона** (Lyndon decomposition).

Строка називається **простий**, якщо вона строго **менше** будь-якого свого власного **суфікса**. Приклади простих стрічок: $a$, $b$, $ab$, $aab$, $abb$, $ababb$, $abcd$. Можна показати, що стрічка є простий тоді і тільки тоді, коли вона строго **менше** всіх своїх нетривиальных **циклічних зрушень**.

Далі, нехай дана стрічка $s$. Значить **декомпозицией Ліндона** стрічки $s$ називається її розкладання $s = w_1 w_2 \ldots w_k$, де стрічки $w_i$ прості, і при цим $w_1 \ge w_2 \ge \ldots \ge w_k$.

Можна показати, що для будь-якої стрічки $s$ це розкладання існує і єдино.

## Алгоритм Дюваля

**Алгоритм Дюваля** (Duval's algorithm) знаходить для даній стрічки довжини $n$ декомпозицію Ліндона за час $O(n)$ з використанням $O(1)$ додаткової пам'яті.

Работать зі рядками будемо в 0-індексації.

Введемо допоміжне поняття предпростой стрічки. Строка $t$ називається **предпростой**, якщо вона має вид $t = w w w \ldots w \overline{w}$, де $w$ - деяка проста стрічка, а $\overline{w}$ - деякий префікс стрічки $w$.

Алгоритм Дюваля є жадібним. В будь-якої момент його роботи стрічка S фактично разделена на три стрічки $s = s_1 s_2 s_3$, де в стрічки $s_1$ декомпозиція Ліндона вже знайдена і $s_1$ вже більше не використовується алгоритмом; стрічка $s_2$ - це предпростая стрічка (причому довжину простих стрічок всередині її ми також запоминаем); стрічка $s_3$ - це ще не обработанная частина стрічки $s$. Кожен раз алгоритм Дюваля бере перший символ стрічки $s_3$ і намагається дописати його до стрічки $s_2$. При цим, можливо, для якогось префікса стрічки $s_2$ декомпозиція Ліндона стає відомої, і ця частина переходити до стрічки $s_1$.

Опишемо тепер алгоритм **формально**. По-перше, буде поддерживаться вказівник $i$ на початок стрічки $s_2$. Внешний цикл алгоритму буде виконуватися, поки $i < n$, тобто поки вся стрічка $s$ не перейде в стрічку $s_1$. Усередині цього циклу создаются два покажчика: вказівник $j$ на початок стрічки $s_3$ (фактично вказівник на наступного символ-кандидат) і вказівник $k$ на поточний символ в стрічки $s_2$, з яким буде производиться порівняння. Потім будемо в циклі намагатися додати символ $s[j]$ до стрічки $s_2$, для чого необхідно провести порівняння з символом $s[k]$. Тут у нас виникають три різних випадку:

* Якщо $s[j] = s[k]$, то ми можемо дописати символ $s[j]$ до стрічки $s_2$, не нарушив її "предпростоты". Отже, в цим випадку ми просто збільшуємо вказівники $j$ і $k$ на одиницю.

* Якщо $s[j] > s[k]$, то, очевидно, стрічка $s_2 + s[j]$ стане простий. Значить ми збільшуємо $j$ на одиницю, а $k$ передвигаем назад на $i$, аби наступного символ сравнивался з першим символом $s_2$.

* Якщо $s[j] < s[k]$, то стрічка $s_2+s[j]$ вже не можливо бути предпростой. Тому ми розбиваємо предпростую стрічку $s_2$ на прості стрічки плюс "залишок" (префікс простий стрічки, можливо, порожній); прості стрічки додаємо в відповідь (тобто виводимо їх позиції, попутно пересуваючи вказівник $i$), а "залишок" разом з символом $s[j]$ переводим назад в стрічку $s_3$, і зупиняємо виконання внутрішнього циклу. Тим самим ми на наступного ітерації зовнішнього циклу заново опрацюємо залишок, знаючи, що він не міг образовать предпростую стрічку з попередніми простими рядками. Залишилося тільки замітити, що при выводе позицій простих стрічок нам потрібно знати їх довжину; але вона, очевидно, рівна $j-k$.

### Реалізація

Наведемо реалізацію алгоритму Дюваля, яка буде виводити шукану декомпозицію Ліндона стрічки $s$:

<!--- TODO: specify code snippet id -->
``` cpp
string s; // вхідні стрічка
int n = (int) s.length();
int i=0;
while (i < n) {
    int j=i+1, k=i;
    while (j < n && s[k] <= s[j]) {
        if (s[k] < s[j])
            k = i;
        else
            ++k;
        ++j;
    }
    while (i <= k) {
        cout << s.substr (i, j-k) << ' ';
        i += j - k;
    }
}
```

### Асимптотика

Відразу зауважимо, що для алгоритму Дюваля потрібно **$O(1)$ пам'яті**, а саме три покажчика $i$, $j$, $k$.

Оцінимо тепер **час роботи** алгоритму.

**Внешний цикл while** робить не більш $n$ ітерацій, оскільки в наприкінці кожної його ітерації виводиться як мінімум один символ (а всього символів виводиться, очевидно, рівне $n$).

Оцінимо тепер кількість ітерацій **першого вкладеного циклу while**. Для цього розглянемо другий вкладений цикл while - він при кожному своєму запуску виводить деякий кількість $r \ge 1$ копій однієї і тією ж простий стрічки деякої довжини $p = j-k$. Зауважимо, що стрічка $s_2$ є предпростой, причому її прості стрічки мають довжину як раз $p$, тобто її довжина не перевершує $r p + p - 1$. Оскільки довжина стрічки $s_2$ рівна $j-i$, а вказівник $j$ збільшується по одиниці на кожної ітерації першого вкладеного циклу while, то цей цикл виконає не більш $r p + p - 2$ ітерацій. Худшим випадком є випадок $r = 1$, і ми отримуємо, що перший вкладений цикл while всякий раз виконує не більш $2 p - 2$ ітерацій. Згадуючи, що всього виводиться $n$ символів, отримуємо, що для виведення $n$ символів потрібно не більш $2 n - 2$ ітерацій першого вкладеного while-а.

Отже, **алгоритм Дюваля виконується за $O(n)$**.

Легко оцінити і число порівнянь символів, выполняемых алгоритмом Дюваля. Оскільки кожна ітерація першого вкладеного циклу while виробляє два порівняння символів, а також одне порівняння виготовляється після останньої ітерації циклу (аби зрозуміти, що цикл повинен зупинитися), то загальне **число порівнянь символів** не перевершує $4 n - 3$.

## Знаходження найменшого циклічного зсуву

Нехай дана стрічка $s$. Побудуємо для стрічки $s+s$ декомпозицію Ліндона (ми можемо це зробити за $O(n)$ часу і $O(1)$ пам'яті (якщо не виконувати конкатенацию в явному вигляді)). Знайдемо предпростой блок, який починається в позиції, меншої $n$ (тобто в першому экземпляре стрічки $s$), і закінчується в позиції, більшої або рівній n (тобто у іншому экземпляре). Стверджується, що **позиція початку** цього блоку і буде початком шуканого циклічного зсуву (в цим легко переконатися, воспользовавшись определением декомпозиції Ліндона).

Начало предпростого блоку знайти просто - достатньо замітити, що вказівник $i$ в початку кожної ітерації зовнішнього циклу while вказує на початок поточного предпростого блоку.

Разом ми отримуємо таку **реалізацію** (для спрощення коду вона використовує $O(n)$ пам'яті, явним чином дописывая стрічку до собі):

<!--- TODO: specify code snippet id -->
``` cpp
string min_cyclic_shift (string s) {
    s += s;
    int n = (int) s.length();
    int i=0, ans=0;
    while (i < n/2) {
        ans = i;
        int j=i+1, k=i;
        while (j < n && s[k] <= s[j]) {
            if (s[k] < s[j])
                k = i;
            else
                ++k;
            ++j;
        }
        while (i <= k)  i += j - k;
    }
    return s.substr (ans, n/2);
}
```

## Задачі в online judges

Список задач, які можна розв'язати, використовуючи алгоритм Дюваля:

* [UVA #719 **"Glass Beads"** [складність: низька]](http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=660)