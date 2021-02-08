# Sqrt-декомпозиция

Sqrt-декомпозиция - это метод, или структура данных, которая позволяет выполнять некоторые типичные операции (суммирование элементов подмассива, нахождение минимума/максимума и т.д). за $O(\sqrt{n})$, что значительно быстрее, чем $O(n)$ для тривиального алгоритма.

Сначала мы опишем структуру данных для одного из простейших применений этой идеи, затем покажем, как обобщать её для решения некоторых других задач, и, наконец, рассмотрим несколько иное применение этой идеи: разбиение входных запросов на sqrt-блоки.

## Структура данных на основе sqrt-декомпозиции

**Поставим задачу**. Дан массив $a[0 \ldots n-1]$. Требуется реализовать такую структуру данных, которая сможет находить сумму элементов $a[l \ldots r]$ для произвольных $l$ и $r$ за $O(\sqrt{n})$ операций.

### Описание

Основная идея sqrt-декомпозиции заключается в том, что сделаем следующий **предпосчёт**: разделим массив $a$ на блоки длины примерно $\sqrt{n}$, и в каждом блоке $i$ заранее предпосчитаем сумму $b[i]$ элементов в нём.

Можно считать, что длина одного блока и количество блоков равны одному и тому же числу - корню из $n$, округлённому вверх:

$$ s = \left\lceil \sqrt{n} \right\rceil, $$

тогда массив $a[]$ разбивается на блоки примерно таким образом:

$$ \underbrace{ a[0] ~ a[1] ~ \ldots ~ a[s-1] }_{b[0]} ~~~ \underbrace{ a[s] ~ a[s+1] ~ \ldots ~ a[2 \cdot s-1] }_{b[1]} ~~~ \ldots ~~~ \underbrace{ a[(s-1) \cdot s] ~ \ldots ~ a[n] }_{b[s-1]}. $$

Хотя последний блок может содержать меньше, чем $s$, элементов (если $n$ не делится на $s$), - это не принципиально.

Таким образом, для каждого блока $k$ мы знаем сумму на нём $b[k]$:

$$ b[k] = \sum_{i=k \cdot s}^{\min (n-1, (k+1) \cdot s - 1)} a[i]. $$

Итак, пусть эти значения $b_k$ предварительно подсчитаны (для этого надо, очевидно, $O(n)$ операций). Что они могут дать при вычислении ответа на очередной запрос $(l,r)$? Заметим, что если отрезок $[l;r]$ длинный, то в нём будут содержаться несколько блоков целиком, и на такие блоки мы можем узнать сумму на них за одну операцию. В итоге от всего отрезка $[l;r]$ останется лишь два блока, попадающие в него лишь частично, и на этих кусках нам придётся произвести суммирование тривиальным алгоритмом.

Иллюстрация (здесь через $k$ обозначен номер блока, в котором лежит $l$, а через $p$ - номер блока, в котором лежит $r$):

$$ \ldots ~ \overbrace{ a[l] ~ \ldots ~ a[(k+1) \cdot s-1] ~ \underbrace{ a[(k+1) \cdot s] ~ \ldots ~ a[(k+2) \cdot s-1] }_{b[k+1]} ~ \ldots ~ \underbrace{ a[(p-1) \cdot s] ~ \ldots ~ a[p \cdot s-1] }_{b[p]}\ a[p \cdot s] ~ \ldots a_r }^{sum=?} ~ \ldots $$

На этом рисунке видно, что для того чтобы посчитать сумму в отрезке $[l \ldots r]$, надо просуммировать элементы только в двух "хвостах": $[l \ldots (k+1) \cdot s-1]$ и $[p \cdot s \ldots r]$, и просуммировать значения $b[i]$ во всех блоках, начиная с $k+1$ и заканчивая $p-1$:

$$ \sum_{i=l}^{r} a[i] = \sum_{i=l}^{(k+1) \cdot s-1} a[i] + \sum_{i=k+1}^{p-1} b[i] + \sum_{i=p \cdot s}^{r} a[i] $$

(примечание: эта формула неверна, когда $k=p$: в таком случае некоторые элементы будут просуммированы дважды; в этом случае надо просто просуммировать элементы с $l$ по $r$)

Тем самым мы экононим значительное количество операций. Действительно, размер каждого из "хвостов", очевидно, не превосходит длины блока $s$, и количество блоков также не превосходит $s$. Поскольку $s$ мы выбирали $\approx \sqrt{n}$, то всего для вычисления суммы на отрезке $[l \ldots r]$ нам понадобится лишь $O(\sqrt{n})$ операций.

### Реализация

Приведём сначала простейшую реализацию:

<!--- TODO: specify code snippet id -->
``` cpp
// входные данные
int n;
vector<int> a (n);

// предпосчёт
int len = (int) sqrt (n + .0) + 1; // и размер блока, и количество блоков
vector<int> b (len);
for (int i=0; i<n; ++i)
    b[i / len] += a[i];

// ответ на запросы
for (;;) {
    int l, r; // считываем входные данные - очередной запрос
    int sum = 0;
    for (int i=l; i<=r; )
        if (i % len == 0 && i + len - 1 <= r) {
            // если i указывает на начало блока, целиком лежащего в [l;r]
            sum += b[i / len];
            i += len;
        }
        else {
            sum += a[i];
            ++i;
        }
}
```

Недостатком этой реализации является то, что в ней неоправданно много операций деления (которые, как известно, выполняются значительно медленнее других операций). Вместо этого можно посчитать номера блоков $c_l$ и $c_r$, в которых лежат границы $l$ и $r$ соответственно, и затем сделать цикл по блокам с $c_l+1$ по $c_r-1$, отдельно обработав "хвосты" в блоках $c_l$ и $c_r$. Кроме того, при такой реализации случай $c_l = c_r$ становится особым и требует отдельной обработки:

<!--- TODO: specify code snippet id -->
``` cpp
int sum = 0;
int c_l = l / len,   c_r = r / len;
if (c_l == c_r)
    for (int i=l; i<=r; ++i)
        sum += a[i];
else {
    for (int i=l, end=(c_l+1)*len-1; i<=end; ++i)
        sum += a[i];
    for (int i=c_l+1; i<=c_r-1; ++i)
        sum += b[i];
    for (int i=c_r*len; i<=r; ++i)
        sum += a[i];
}
```

### Другие задачи

Мы рассматривали задачу нахождения суммы элементов массива в каком-то его подотрезке. Эту задачу можно немного расширить: разрешим также **меняться** отдельным элементам массива $A$. Действительно, если меняется какой-то элемент $a_i$, то достаточно обновить значение $b[k]$ в том блоке, в котором этот элемент находится ($k = i / len$):

$$ b[k] += a[i] - old\_a[i]. $$

С другой стороны, вместо задачи о сумме аналогично можно решать задачи о **минимальном, максимальном** элементах в отрезке. Если в этих задачах допускать изменения отдельных элементов, то тоже надо будет пересчитывать значение $b_k$ того блока, которому принадлежит изменяемый элемент, но пересчитывать уже полностью, проходом по всем элементам блока за $O(len) = O(\sqrt{n})$ операций.

Аналогичным образом sqrt-декомпозицию можно применять и для множества **других** подобных задач: нахождение количества нулевых элементов, первого ненулевого элемента, подсчёта количества определённых элементов, и т.д.

Есть и целый класс задач, когда происходят **изменения элементов на целом подотрезке**: прибавление или присвоение элементов на каком-то подотрезке массива $A$.

Например, нужно выполнять следующие два вида запросов: прибавить ко всем элементам некоторого отрезка $[l;r]$ величину $\delta$, и узнавать значение отдельного элемента $a_i$. Тогда в качестве $b_k$ положим ту величину, которая должна быть прибавлена ко всем элементам $k$-го блока (например, изначально все $b_k = 0$); тогда при выполнении запроса "прибавление" нужно будет выполнить прибавление ко всем элементам $a_i$ "хвостов", а затем выполнить прибавление ко всем элементам $b_i$ для блоков, целиком лежащих в отрезке $[l \ldots r]$. А ответом на второй запрос, очевидно, будет просто $a_i + b_k$, где $k = i / len$. Таким образом, прибавление на отрезке будет выполняться за $O(\sqrt{n})$, а запрос отдельного элемента - за $O(1)$.

Наконец, можно комбинировать оба вида задач: изменение элементов на отрезке и ответ на запросы тоже на отрезке. Оба вида операций будут выполняться за $O(\sqrt{n})$. Для этого уже надо будет делать два "блоковых" массива $b$ и $c$: один - для обеспечения изменений на отрезке, другой - для ответа на запросы.

Можно привести пример и других задач, к которым можно применить sqrt-декомпозицию. Например, можно решать задачу о **поддержании множества чисел** с возможностью добавления/удаления чисел, проверки числа на принадлежность множеству, поиск $k$-го по порядку числа. Для решения этой задачи надо хранить числа в отсортированном порядке, разделёнными на несколько блоков по $\sqrt{n}$ чисел в каждом. При добавлении или удалении числа надо будет производить "перебалансировку" блоков, перебрасывая числа из начал/концов одних блоков в начала/концы соседних блоков.

## Sqrt-декомпозиция входных запросов

Рассмотрим теперь совершенно иное применение идеи об sqrt-декомпозиции.

Предположим, что у нас есть некоторая задача, в которой нам даются некоторые входные данные, а затем поступают $k$ команд/запросов, каждую из которых мы должны дать обработать и выдать ответ. Мы рассматриваем случай, когда запросы бывают как запрашивающие (не меняющие состояния системы, а только запрашивающие некоторую информацию), так и модифицирующие (т.е. влияющие на состояние системы, изначально заданное входными данными).

Конкретная задача может быть весьма сложной, и "честное" её решение (которое считывает один запрос, обрабатывает его, изменяя состояние системы, и возвращает ответ) может быть технически сложным или вовсе быть не по силам для решающего. С другой стороны, решение "оффлайнового" варианта задачи, т.е. когда отсутствуют модифицирующие операции, а имеются только лишь запрашивающие запросы - часто оказывается гораздо проще. Предположим, что мы **умеем решать "оффлайновый" вариант** задачи, т.е. строить за некоторое время $B(n)$ некую структуру данных, которая может отвечать на запросы, но не умеет обрабатывать модифицирующие запросы.

Тогда **разобьём входные запросы на блоки** (какой длины - пока не уточняем; обозначим эту длину через $s$). В начале обработки каждого блока будем за $B(n)$ строить структуру данных для "оффлайнового" варианта задачи по состоянию данных на момент начала этого блока.

Теперь будем по очереди брать запросы из текущего блока и обрабатывать каждый из них. Если текущий запрос - модифицирующий, то пропустим его. Если же текущий запрос - запрашивающий, то обратимся к структуре данных для оффлайнового варианта задачи, но предварительно **учтя все модифицирующие запросы в текущем блоке**. Такое учитывание модифицирующих запросов бывает возможным далеко не всегда, и оно должно происходить достаточно быстро - за время $O(s)$ или немного хуже; обозначим это время через $Q(s)$.

Таким образом, если всего у нас $m$ запросов, то на их обработку потребуется $B(m) \frac{m}{s} + m Q(s)$ времени. Величину $s$ следует выбирать, исходя из конкретного вида функций $B()$ и $Q()$. Например, если $B(m)=O(m)$ и $Q(s)=O(s)$, то оптимальным выбором будет $s \approx \sqrt{m}$, и итоговая асимптотика получится $O(m \sqrt{m})$.

Поскольку приведённые выше рассуждения слишком абстрактны, приведём несколько примеров задач, к которым применима такая sqrt-декомпозиция.

### Пример задачи: прибавление на отрезке

Условие задачи: дан массив чисел $a[1 \ldots n]$, и поступают запросы двух видов: узнать значение в $i$-ом элементе массива, и прибавить некоторое число $x$ ко всем элементам массива в некотором отрезке $a[l \dots r]$.

Хотя эту задачу можно решать и без этого приёма с разбиением запросов на блоки, мы приведём её здесь - как простейшее и наглядное применение этого метода.

Итак, разобьём входные запросы на блоки по $\sqrt{m}$ (где $m$ - число запросов). В начале первого блока запросов никаких структур строить не надо, просто храним массив $a[]$. Идём теперь по запросам первого блока. Если текущий запрос - запрос прибавления, то пока пропускаем его. Если же текущий запрос - запрос чтения значения в некоторой позиции $i$, то вначале просто возьмём в качестве ответа значение $a[i]$. Затем пройдёмся по всем пропущенным в этом блоке запросам прибавления, и для тех из них, в которые попадает $i$, применим их увеличения к текущему ответу.

Таким образом, мы научились отвечать на запрашивающие запросы за время $O(\sqrt{m})$.

Осталось только заметить, что в конце каждого блока запросов мы должны применить все модифицирующие запросы этого блока к массиву $a[]$. Но это легко сделать за $O(n)$ - достаточно для каждого запроса прибавления $(l,r,x)$ отметить в вспомогательном массиве в точке $l$ число $x$, а в точке $r+1$ - число $-x$, и затем пройтись по этому массиву, прибавляя текущую сумму к массиву $a[]$.

Таким образом, итоговая асимптотика решения составит $O(\sqrt{m} (n + m))$.

### Пример задачи: disjoint-set-union с разделением

Есть неориентированный граф с $n$ вершинами и $m$ рёбрами. Поступают запросы трёх видов: добавить ребро $(x_i,y_i)$, удалить ребро $(x_i,y_i)$, и проверить, связаны или нет вершины $x_i$ и $y_i$ путём.

Если бы запросы удаления отсутствовали, то решением задачи была бы известная структура данных [disjoint-set-union (система непересекающихся множеств)](dsu). Однако при наличии удалений задача значительно усложняется.

Сделаем следующим образом. В начале каждого блока запросов посмотрим, какие рёбра в этом блоке будут удаляться, и сразу **удалим** их из графа. Теперь построим систему непересекающихся множеств (dsu) на полученном графе.

Как мы теперь должны отвечать на очередной запрос из текущего блока? Наша система непересекающихся множеств "знает" обо всех рёбрах, кроме тех, что добавляются/удаляются в текущем блоке. Однако удаления из dsu нам делать уже не надо - мы заранее удалили все такие рёбра из графа. Таким образом, всё, что может быть - это дополнительные, добавляющиеся рёбра, которых может быть максимум $\sqrt{m}$ штук.

Следовательно, при ответе на текущий запрашивающий запрос мы можем просто пустить обход в ширину по компонентам связности dsu, который отработает за $O(\sqrt{m})$, поскольку у нас в рассмотрении будут только $O(\sqrt{m})$ рёбер.

## Оффлайновые задачи на запросы на подотрезках массива и универсальная sqrt-эвристика для них

Рассмотрим ещё одну интересную вариацию идеи sqrt-декомпозиции.

Пусть у нас есть некоторая задача, в которой есть массив чисел, и поступают запрашивающие запросы, имеющие вид $(l,r)$ - узнать что-то о подотрезке $a[l \ldots r]$. Мы считаем, что запросы не модифицирующие, и известны нам заранее, т.е. задача - оффлайновая.

Наконец, введём последнее **ограничение**: мы считаем, что умеем быстро пересчитывать ответ на запрос при изменении левой или правой границы на единицу. Т.е. если мы знали ответ на запрос $(l,r)$, то быстро сможем посчитать ответ на запрос $(l+1,r)$ или $(l-1,r)$ или $(l,r+1)$ или $(l,r-1)$.

Опишем теперь **универсальную эвристику** для всех таких задач. Отсортируем запросы по паре: $(l ~ {\rm div} ~ \sqrt{n}, r)$. Т.е. мы отсортировали запросы по номеру sqrt-блока, в котором лежит левый конец, а при равенстве - по правому концу.

Рассмотрим теперь группу запросов с одинаковым значением $l ~ {\rm div} ~ \sqrt{n}$ и будем обрабатывать все запросы этой группы. Ответ на первый запрос посчитаем тривиальным образом. Каждый следующий запрос будем считать на основе предыдущего ответа: т.е. двигать левую и правую границы предыдущего запроса к границам следующего запроса, поддерживая при этом текущий ответ. Оценим асимптотику: левая граница каждый раз могла двигаться на не более $\sqrt{n}$ раз, а правая - не более $n$ раз в сумме по всем запросам текущей группы. Итого, если текущая группа состояла из $k$ запросов, в сумме будет совершено не более $n + k \cdot \sqrt{n}$ пересчётов. В сумме по всему алгоритму получится - $O((n + m) \cdot \sqrt{n})$ пересчётов.

Простым **примером** на данную эвристику является такая задача: узнать количество различных чисел в отрезке массива $[l;r]$.

Чуть более усложнённым вариантом этой задачи является [задача с одного из раундов Codeforces](http://www.codeforces.ru/contest/86/problem/D).