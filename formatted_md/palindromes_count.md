# Нахождение всех подпалиндромов

## Постановка задачи

Дана строка $s$ длины $n$. Требуется найти все такие пары $(i,j)$, где $i<j$, что подстрока $s[i \ldots j]$ является палиндромом (т.е. читается одинаково слева направо и справа налево).

### Уточнение постановки

Понятно, что в худшем случае таких подстрок-палиндромов может быть $O(n^2)$, и на первый взгляд кажется, что алгоритма с линейной асимптотикой существовать не может.

Однако информацию о найденных палиндромах можно возвращать более **компактно**: для каждой позиции $i=0 \ldots n-1$ найдём значения $d_1[i]$ и $d_2[i]$, обозначающие количество палиндромов соответственно нечётной и чётной длины с центром в позиции $i$.

Например, в строке $s = abababc$ есть три палиндрома нечётной длины с центром в символе $s[3]=b$, т.е. значение $d_1[3]=3$:

$$ a\ \overbrace{b\ a\ \underbrace{b}_{s_3}\ a\ b}^{d_1[3]=3}\ c $$

А в строке $s = cbaabd$ есть два палиндрома чётной длины с центром в символе $s[3]=a$, т.е. значение $d_2[3]=2$:

$$ c\ \overbrace{b\ a\ \underbrace{a}_{s_3}\ b}^{d_2[3]=2}\ d $$

Т.е. идея - в том, что если есть подпалиндром длины $l$ с центром в какой-то позиции $i$, то есть также подпалиндромы длины $l-2$, $l-4$, и т.д. с центрами в $i$. Поэтому двух таких массивов $d_1[i]$ и $d_2[i]$ достаточно для хранения информации обо всех подпалиндромах этой строки.

Достаточно неожиданным фактом является то, что существует довольно простой алгоритм, который вычисляет эти "массивы палиндромностей" $d_1[]$ и $d_2[]$ за линейное время. Этот алгоритм и описывается в данной статье.

## Решение

Вообще говоря, данная задача имеет несколько известных решений: с помощью [техники хэширования](string_hashes) её можно решить за $O(n \log n)$, а с помощью [суффиксных деревьев](ukkonen) и [быстрого алгоритма LCA](lca_linear) эту задачу можно решить за $O(n)$.

Однако описываемый в данной статье метод значительно проще, и обладает меньшими скрытыми константами в асимптотике времени и памяти. Этот алгоритм был открыт **Гленном Манакером (Glenn Manacher)** в 1975 г.

### Тривиальный алгоритм

Во избежание неоднозначностей при дальнейшем описании условимся, что же такое есть "тривиальный алгоритм".

Это алгоритм, который для поиска ответа в позиции $i$ раз за разом пробует увеличить ответ на единицу, каждый раз сравнивая пару соответствующих символов.

Такой алгоритм слишком медленен, весь ответ он может посчитать лишь за время $O(n^2)$.

Приведём для наглядности его реализацию:

<!--- TODO: specify code snippet id -->
``` cpp
vector<int> d1 (n),  d2 (n);
for (int i=0; i<n; ++i) {
    d1[i] = 1;
    while (i-d1[i] >= 0 && i+d1[i] < n && s[i-d1[i]] == s[i+d1[i]])
        ++d1[i];

    d2[i] = 0;
    while (i-d2[i]-1 >= 0 && i+d2[i] < n && s[i-d2[i]-1] == s[i+d2[i]])
        ++d2[i];
}
```

### Алгоритм Манакера

Научимся сначала находить все подпалиндромы нечётной длины, т.е. вычислять массив $d_1[]$; решение для палиндромов чётной длины (т.е. нахождение массива $d_2[]$) получится небольшой модификацией этого.

Для быстрого вычисления будем поддерживать **границы $(l,r)$** самого правого из обнаруженных подпалиндрома (т.е. подпалиндрома с наибольшим значением $r$). Изначально можно положить $l=0, r=-1$.

Итак, пусть мы хотим вычислить значение $d_1[i]$ для очередного $i$, при этом все предыдущие значения $d_1[]$ уже подсчитаны.

* Если $i$ не находится в пределах текущего подпалиндрома, т.е. $i > r$, то просто выполним тривиальный алгоритм.

Т.е. будем последовательно увеличивать значение $d_1[i]$, и проверять каждый раз - правда ли текущая подстрока $[i-d_1[i]; i+d_1[i]]$ является палиндромом. Когда мы найдём первое расхождение, либо когда мы дойдём до границ строки $s$ - останавливаемся: мы окончательно посчитали значение $d_1[i]$. После этого мы должны не забыть обновить значения $(l,r)$.

* Рассмотрим теперь случай, когда $i \le r$.

Попробуем извлечь часть информации из уже подсчитанных значений $d_1[]$. А именно, отразим позицию $i$ внутри подпалиндрома $(l,r)$, т.е. получим позицию $j = l + (r - i)$, и рассмотрим значение $d_1[j]$. Поскольку $j$ - позиция, симметричная позиции $i$, то **почти всегда** мы можем просто присвоить $d_1[i] = d_1[j]$. Иллюстрация этого отражения (палиндром вокруг $j$ фактически "копируется" в палиндром вокруг $i$):

$$ \ldots \overbrace{s_l\ \ldots\ \underbrace{s_{j-d_1[j]+1}\ \ldots\ s_j\ \ldots\ s_{j+d_1[j]-1}}_{\rm palindrome}\ \ldots\ \underbrace{s_{i-d_1[j]+1}\ \ldots\ s_i\ \ldots\ s_{i+d_1[j]-1}}_{\rm palindrome}\ \ldots\ s_r\ \ldots}^{\rm palindrome} $$

Однако здесь есть **тонкость**, которую надо обработать правильно: когда "внутренний палиндром" достигает границы внешнего или вылазит за неё, т.е. $j-d_1[j]+1 \le l$ (или, что то же самое, $i+d_1[j]-1 \ge r$). Поскольку за границами внешнего палиндрома никакой симметрии не гарантируется, то просто присвоить $d_1[i] = d_1[j]$ будет уже некорректно: у нас недостаточно сведений, чтобы утверждать, что в позиции $i$ подпалиндром имеет такую же длину.

На самом деле, чтобы правильно обрабатывать такие ситуации, надо "обрезать" длину подпалиндрома, т.е. присвоить $d_1[i] = r - i$. После этого следует пустить тривиальный алгоритм, который будет пытаться увеличить значение $d_1[i]$, пока это возможно.

Иллюстрация этого случая (на ней палиндром с центром в $j$ изображён уже "обрезанным" до такой длины, что он впритык помещается во внешний палиндром):

$$ \ldots \overbrace{\underbrace{s_l\ \ldots\ s_j\ \ldots\ s_{j+(j-l)}}_{\rm palindrome}\ \ldots\ \underbrace{s_{i-(r-i)}\ \ldots\ s_i\ \ldots\ s_r}_{\rm palindrome}}^{\rm palindrome}\ \underbrace{\ldots\ldots\ldots\ldots}_{\rm try\ moving\ here} $$

(На этой иллюстрации показано, что, хотя палиндром с центром в позиции $j$ мог быть и более длинным, выходящим за пределы внешнего палиндрома, - но в позиции $i$ мы можем использовать только ту его часть, которая целиком помещается во внешний палиндром. Но ответ для позиции $i$ может быть больше, чем эта часть, поэтому дальше мы должны запустить тривиальный поиск, который будет пытаться раздвинуть его за пределы внешнего палиндрома, т.е. в область "try moving here").

В завершение описания алгоритма сталось только напомнить, что надо не забывать обновлять значения $(l,r)$ после вычисления очередного значения $d_1[i]$.

Также повторимся, что выше мы описали рассуждения для вычисления массива нечётных палиндромов $d_1[]$; для массива чётных палиндромов $d_2[]$ все рассуждения аналогичны.

### Оценка асимптотики алгоритма Манакера

На первый взгляд не очевидно, что данный алгоритм имеет линейную асимптотику: при вычислении ответа для определённой позиции в нём нередко запускается тривиальный алгоритм поиска палиндромов.

Однако более внимательный анализ показывает, что алгоритм всё же линеен. (Стоит сослаться на известный [алгоритм построения Z-функции строки](z_function), который внутренне сильно напоминает данный алгоритм, и работает также за линейное время).

В самом деле, легко проследить по алгоритму, что каждая итерация, производимая тривиальным поиском, приводит к увеличению на один границы $r$. При этом уменьшений $r$ по ходу алгоритма происходить не может. Следовательно, тривиальный алгоритм в сумме совершит лишь $O(n)$ действий.

Учитывая, что, кроме тривиальных поисков, все остальные части алгоритма Манакера очевидно работают за линейное время, мы и получаем итоговую асимптотику: $O(n)$.

### Реализация алгоритма Манакера

Для случая подпалиндромов нечётной длины, т.е. для вычисления массива $d_1[]$, получаем такой код:

<!--- TODO: specify code snippet id -->
``` cpp
vector<int> d1 (n);
int l=0, r=-1;
for (int i=0; i<n; ++i) {
  int k = i>r ? 1 : min (d1[l+r-i], r-i+1);
  while (i+k < n && i-k >= 0 && s[i+k] == s[i-k])  ++k;
  d1[i] = k;
  if (i+k-1 > r)
    l = i-k+1,  r = i+k-1;
}
```

Для подпалиндромов чётной длины, т.е. для вычисления массива $d_2[]$, лишь немного меняются арифметические выражения:

<!--- TODO: specify code snippet id -->
``` cpp
vector<int> d2 (n);
l=0, r=-1;
for (int i=0; i<n; ++i) {
  int k = i>r ? 0 : min (d2[l+r-i+1], r-i+1);
  while (i+k < n && i-k-1 >= 0 && s[i+k] == s[i-k-1])  ++k;
  d2[i] = k;
  if (i+k-1 > r)
    l = i-k,  r = i+k-1;
}
```

## Задачи в online judges

Список задач, которые можно сдать с использованием этого алгоритма:

* [UVA #11475 **"Extend to Palindrome"** [сложность: низкая]](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2470)