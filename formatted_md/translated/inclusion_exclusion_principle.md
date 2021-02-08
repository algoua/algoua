# Принцип включень-виключень

Принцип включень-виключень - це важный комбинаторный прийом, дозволяє підраховувати розмір яких-або множин, або обчислювати ймовірність складних событий.

## Формулировки принципом включень-виключень

### Словесная формулювання

Принцип включень-виключень виглядає наступним чином:

Щоб порахувати розмір про'єднання декількох множин, треба підсумувати розміри цих множин **по окремо**, потім відняти розміри всіх **попарных** пересічний цих множин, додати назад розміри пересічний всіляких **трійок** множин, відняти розміри пересічний **четвірок**, і так далі, аж до перетину **всіх** множин.

### Формулювання в термінах множин

В математичної формі наведена вище словесная формулювання виглядає наступним чином:

$$ \left| \bigcup_{i=1}^n A_i \right| = \sum_{i=1}^n \left| A_i \right| ~~ - \sum_{i,j : \atop 1 \le i < j \le n} \left| A_i \cap A_j \right| ~~ + \sum_{i,j,k : \atop 1 \le i < j < k \le n} \left| A_i \cap A_j \cap A_k \right| ~ - ~ \ldots ~ + ~ (-1)^{n-1} \left| A_1 \cap \ldots \cap A_n \right|. $$

Її можна записати більш компактно, через суму по подмножествам. Позначимо через $B$ множину, елементами якого є $A_i$. Значить принцип включень-виключень приймає вид:

$$ \left| \bigcup_{i=1}^n A_i \right| = \sum_{C \subseteq B} (-1)^{size(C)-1} \left| \bigcap_{e \in C} e \right|. $$

Цю формулу приписывают Муавру (Abraham de Moivre).

### Формулювання з допомогою диаграмм Венна

Нехай на діаграмі отмечены три фігури $A$, $B$ і $C$:

\img{inclusion_exclusion_1.png}

Значить площа про'єднання $A \cup B \cup C$ рівна сумі площ $A$, $B$ і $C$ за вычетом двічі покрытых площ $A \cap B$, $A \cap C$, $B \cap C$, але з додатком трижды покрытой площі $A \cap B \cap C$:

$$ S(A \cup B \cup C) = S(A) ~ + ~ S(B) ~ + ~ S(C) ~ - ~ S(A \cap B) ~ - ~ S(A \cap C) ~ - ~ S(B \cap C) ~ + ~ S(A \cap B \cap C). $$

Аналогічним чином це узагальнюється і на об'єднання $n$ фігур.

### Формулювання в термінах теорії вероятностей

Якщо $A_i$ $(i = 1 \ldots n)$ - це події, ${\cal P}(A_i)$ - їх вероятности, то ймовірність їх про'єднання (тобто того, що відбудеться хоча б одне з цих событий) рівна:

$$$ \begin{eqnarray}
{\cal P} \left( \bigcup_{i=1}^n A_i \right) & = & \sum_{i=1}^n {\cal P} \left( A_i \right) ~~ - \sum_{i,j : \atop 1 \le i < j \le n} {\cal P} \left( A_i \cap A_j \right) ~~ + \cr
& + & \sum_{i,j,k : \atop 1 \le i < j < k \le n} {\cal P} \left( A_i \cap A_j \cap A_k \right) ~ - ~ \ldots ~ + ~ (-1)^{n-1} {\cal P} \left( A_1 \cap \ldots \cap A_n \right). \cr
\nonumber
\end{eqnarray} $$$

Цю суму також можна записати в вигляді суми по подмножествам множини $B$, елементами якого є події $A_i$:

$$ {\cal P} \left( \bigcup_{i=1}^n A_i \right) = \sum_{C \subseteq B} (-1)^{size(C)-1} \cdot {\cal P} \left( \bigcap_{e \in C} e \right). $$

## Доведення принципом включень-виключень

Для доведення зручно користуватися математичної формулюванням в термінах теорії множин:

$$ \left| \bigcup_{i=1}^n A_i \right| = \sum_{C \subseteq B} (-1)^{size(C)-1} \left| \bigcap_{e \in C} e \right|, $$

де $B$, нагадаємо, - це множину, що складається з $A_i$-их.

Нам потрібно довести, що будь-якої елемент, що міститься хоча б в одному з множин $A_i$, врахує формулою рівне один раз. (Зауважимо, що інші елементи, не содержащиеся ні в одному з $A_i$, ніяк не можуть бути враховані, оскільки відсутні в правою частини формули).

Розглянемо довільний елемент $x$, що міститься рівне в $k \ge 1$ множинах $A_i$. Покажемо, що він посчитается формулою рівне один раз.

Зауважимо, що:

* в тих доданків, у яких $size(C) = 1$, елемент $x$ врахує рівне $k$ раз, зі знаком плюс;

* в тих доданків, у яких $size(C) = 2$, елемент $x$ врахує (зі знаком мінус) рівне $C_k^2$ раз - тому що $x$ посчитается тільки в тих доданків, які відповідають двом безлічам з $k$ множин, містять $x$;

* в тих доданків, у яких $size(C) = 3$, елемент $x$ врахує рівне $C_k^3$ раз, зі знаком плюс;

* $\ldots$

* в тих доданків, у яких $size(C) = k$, елемент $x$ врахує рівне $C_k^k$ раз, зі знаком $(-1)^{k-1}$;

* в тих доданків, у яких $size(C) > k$, елемент $x$ врахує нуль раз.

Таким чином, нам треба порахувати таку суму [биномиальных коефіцієнтів](binomial_coeff):

$$ T = C_k^1 - C_k^2 + C_k^3 - \ldots + (-1)^{i-1} \cdot C_k^i + \ldots + (-1)^{k-1} \cdot C_k^k. $$

Простіше всього порахувати цю суму, сравнив її з разложением в біном Ньютона вираження $(1-x)^k$:

$$ (1-x)^k = C_k^0 - C_k^1 \cdot x + C_k^2 \cdot x^2 - C_k^3 \cdot x^3 + \ldots + (-1)^k \cdot C_k^k \cdot x^k. $$

Видно, що при $x=1$ вираз $(1-x)^k$ представляє собою не що інше, як $1 - T$. Отже, $T = 1 - (1-1)^k = 1$, що і потрібно довести.

## Застосування при рішенні задач

Принцип включень-виключень складно добре зрозуміти без изучения прикладів його застосувань.

Спочатку ми розглянемо три прості задачі "на бумажке", иллюстрирующие застосування принципом, потім розглянемо більш практические задачі, які трудно розв'язати без використання принципом включень-виключень.

Особливо випливає відзначити задачу "пошук числа шляхів", оскільки в ній демонструється, що принцип включень-виключень можливо іноді приводити до полиномиальным решениям, а не обов'язково экспоненциальным.

### Проста задачка про перестановках

Скільки є перестановок чисел від $0$ до $9$ таких, що перший елемент більше $1$, а останній - менше $8$?

Порахуємо число "поганих" перестановок, тобто таких, у яких перший елемент $\le 1$ і/або останній $\ge 8$.

Позначимо через $X$ множину перестановок, у яких перший елемент $\le 1$, а через $Y$ - у яких останній елемент $\ge 8$. Значить кількість "поганих" перестановок по формулою включень-виключень рівне:

$$ |X| + |Y| - |X \cap Y|. $$

Проведя несложные комбинаторные обчислення, отримуємо, що це рівне:

$$ 2 \cdot 9! + 2 \cdot 9! - 2 \cdot 2 \cdot 8! $$

Отнимая це число від загального числа перестановок $10!$, ми отримаємо відповідь.

### Проста задачка про (0,1,2)-послідовностях

Скільки існує послідовностей довжини $n$, складаються тільки з чисел $0,1,2$, причому кожне число зустрічається хоча б раз?

Знову перейдемо до зворотного задачі, тобто будемо вважати число послідовностей, в яких не присутній хоча б одне з чисел.

Позначимо через $A_i$ ($i = 0 \ldots 2$) множину послідовностей, в яких не зустрічається число $i$. Значить по формулою включень-виключень число "поганих" послідовностей рівне:

$$ |A_0| + |A_1| + |A_2| - |A_0 \cap A_1| - |A_0 \cap A_2| - |A_1 \cap A_2| + |A_0 \cap A_1 \cap A_2|. $$

Размеры кожного з $A_i$ рівні, очевидно, $2^n$ (оскільки в таких послідовностях можуть зустрічатися тільки два увазі цифр). Мощности кожного попарного перетину $A_i \cap A_j$ рівні $1$ (оскільки залишається доступной тільки одна цифра). Нарешті, потужність перетину всіх трьох множин рівна $0$ (оскільки доступных цифр взагалі не залишається).

Згадуючи, що ми вирішували зворотню задачу, отримуємо підсумковий **відповідь**:

$$ 3^n - 3 \cdot 2^n + 3 \cdot 1 - 0. $$

### Кількість цілочисельних рішень рівняння

Дано рівняння:

$$ x_1 + x_2 + x_3 + x_4 + x_5 + x_6 = 20, $$

де всі $0 \le x_i \le 8$ (де $i = 1 \ldots 6$).

Потрібно порахувати число рішень цього рівняння.

Забудем спочатку про обмеження $x_i \le 8$, і просто порахуємо число невід'ємних рішень цього рівняння. Це легко робиться через [биномиальные коефіцієнти](binomial_coeff) - ми хочемо розбити $20$ елементів на $6$ груп, тобто розподілити $5$ "стенок", розділяють групи, по $25$ местам:

$$ N_0 = C_{25}^5 $$

Порахуємо тепер по формулою включень-виключень число "поганих" рішень, тобто таких рішень рівняння, в яких один або більш $x_i$ більше $9$.

Позначимо через $A_k$ (де $k = 1 \ldots 6$) множину таких рішень рівняння, в яких $x_k \ge 9$, а всі інші $x_i \ge 0$ (для всіх $i \ne k$). Щоб порахувати розмір множини $A_k$, зауважимо, що у нас по суті та ж комбинаторная задача, що решалась двома абзацами вище, тільки тепер $9$ елементів исключены з розгляду і точно належать першо] группе. Таким чином:

$$ | A_k | = C_{16}^5 $$

Аналогічно, потужність перетину двох множин $A_k$ і $A_p$ рівна числу:

$$ \left| A_k \cap A_p \right| = C_7^5 $$

Мощность кожного перетину трьох і більш множин рівна нулю, оскільки $20$ елементів не вистачить на три і більш змінних, більше або рівних $9$.

Об'єднуючи усе це в формулу включень-виключень і враховуючи, що ми вирішували зворотню задачу, остаточно отримуємо **відповідь**:

$$ C_{25}^5 - C_6^1 \cdot C_{16}^5 + C_6^2 \cdot C_7^5. $$

### Кількість взаємно простих чисел в заданому відрізку

Нехай дані числа $n$ і $r$. Потрібно порахувати кількість чисел в відрізку $[1; r]$, взаємно простих з $n$.

Відразу перейдемо до зворотного задачі - порахуємо кількість не взаємно простих чисел.

Розглянемо всі прості подільники числа $n$; позначимо їх через $p_i$ ($i = 1 \ldots k$).

Скільки чисел в відрізку $[1;r]$, діляться на $p_i$? Их кількість рівне:

$$ \left\lfloor \frac{ r }{ p_i } \right\rfloor $$

Однак якщо ми просто підсумуємо ці числа, то отримаємо неправильный відповідь - деякі числа будуть просуммированы декілька раз (ті, які діляться зразу на декілька $p_i$). Тому треба скористатися формулою включень-виключень.

Наприклад, можна за $2^k$ перебрати підмножина множини всіх $p_i$-их, порахувати їх добуток, і додати або відняти в формулою включень-виключень чергове доданок.

Підсумкова **реалізація** для підрахунку кількості взаємно простих чисел:

<!--- TODO: specify code snippet id -->
``` cpp
int solve (int n, int r) {
    vector<int> p;
    for (int i=2; i*i<=n; ++i)
        if (n % i == 0) {
            p.push_back (i);
            while (n % i == 0)
                n /= i;
        }
    if (n > 1)
        p.push_back (n);

    int sum = 0;
    for (int msk=1; msk<(1<<p.size()); ++msk) {
        int mult = 1,
            bits = 0;
        for (int i=0; i<(int)p.size(); ++i)
            if (msk & (1<<i)) {
                ++bits;
                mult *= p[i];
            }

        int cur = r / mult;
        if (bits % 2 == 1)
            sum += cur;
        else
            sum -= cur;
    }

    return r - sum;
}
```

Асимптотика розв'язку становить $O(\sqrt{n})$.

### Кількість чисел в заданому відрізку, кратних хоча б одному з заданих чисел

Дано $n$ чисел $a_i$ і число $r$. Потрібно порахувати кількість чисел в відрізку $[1; r]$, які кратны хоча б одному з $a_i$.

Алгоритм розв'язку практично збігається з попередньою завданням - робимо формулу включень-виключень над числами $a_i$, тобто кожне доданок в цій формулою - це кількість чисел, діляться на завдань поднабор чисел $a_i$ (іншими словами, діляться на їх [найменше загальне кратне](euclid_algorithm)).

Таким чином, розв'язок зводиться до тому, аби за $2^n$ перебрати поднабор чисел, за $O(n \log r)$ операцій знайти їх найменше загальне кратне, і додати або відняти з відповіді чергове значення.

### Кількість стрічок, задовольняють заданому числу патернів

Дано $n$ патернів - стрічок однаковою довжини, складаються тільки з букв і знаков вопроса. Також дано число $k$. Потрібно порахувати кількість стрічок, задовольняють рівне $k$ патернам або, в іншої постановці, як мінімум $k$ патернам.

Зауважимо на початку, що ми можемо **легко порахувати число стрічок**, задовольняють зразу всім зазначеним патернам. Для цього треба просто "пересечь" ці паттерны: подивитися на перший символ (у всіх або паттернах на першо] позиції варто питання, або не у всіх - тоді перший символ визначений однозначно), на другий символ, і т.д.

Навчимося тепер розв'язувати **перший різновид задачі**: коли шукані стрічки повинні задовольняти рівне $k$ патернам.

Для цього переберемо і зафксируем конкретне підмножина $X$ патернів розміру $k$ - тепер ми повинні порахувати кількість стрічок, задовольняють цьому набору патернів і тільки йому. Для цього скористаємось формулою включень-виключень: ми підсумовуємо по всім надмножествам множини $X$, і або додаємо до поточному відповіді, або віднімаємо від нього кількість стрічок, відповідних під поточний множину:

$$ ans(X) = \sum_{Y \supseteq X} (-1)^{|Y|-k} \cdot f(Y), $$

де $f(Y)$ позначає кількість стрічок, відповідних під набір патернів $Y$.

Якщо ми підсумуємо $ans(X)$ по всім $X$, то отримаємо відповідь:

$$ ans = \sum_{X ~ : ~ |X| = k} ans(X). $$

Однак тим самим ми отримали розв'язок за час порядку $O(3^k \cdot k)$.

Розв'язок можна прискорити, заметив, що в різних $ans(X)$ підсумовування найчастіше ведеться по одним і тим ж безлічам $Y$.

Перевернём формулу включень-виключень і будемо вести підсумовування по $Y$. Значить легко зрозуміти, що множину $Y$ врахує в $C_{|Y|}^k$ формулах включень-виключень, всюди з одним і тим ж знаком $(-1)^{|Y|-k}$:

$$ ans = \sum_{Y ~ : ~ |Y| \ge k} (-1)^{|Y|-k} \cdot C_{|Y|}^k \cdot f(Y). $$

Розв'язок вийшло з асимптотикою $O(2^k \cdot k)$.

Перейдемо тепер до **другого варианту задачі**: коли шукані стрічки повинні задовольняти як мінімум $k$ патернам.

Зрозуміло, ми можемо просто скористатися розв'язком першого варіанти задачі і підсумувати відповіді від $k$ до $n$. Однак можна замітити, що всі міркування як і раніше будуть вірні, тільки в цим варіанті задачі сума по $X$ йде не тільки по тим безлічам, розмір яких рівний $k$, а по всім безлічам з розміром $\ge k$.

Таким чином, в итоговой формулою перед $f(Y)$ буде стояти іншої коефіцієнт: не один биномиальный коефіцієнт з яким-то знаком, а їх сума:

$$ (-1)^{|Y|-k} \cdot C_{|Y|}^k ~~ + ~~ (-1)^{|Y|-k-1} \cdot C_{|Y|}^{k+1} ~~ + ~~ (-1)^{|Y|-k-2} \cdot C_{|Y|}^{k+2} ~~ + ~~ \ldots ~~ + ~~ (-1)^{|Y|-|Y|} \cdot C_{|Y|}^{|Y|}. $$

Заглянув в Грэхема (\book{Грэхем, Кнут, Паташник}{"Конкретная математика"}{1998}{graham.djvu}  ), ми видим таку известную формулу для [биномиальных коефіцієнтів](binomial_coeff):

$$ \sum_{k=0}^m (-1)^k \cdot C_n^k = (-1)^m \cdot C_{n-1}^m. $$

Применяя її тут, отримуємо, що вся ця сума биномиальных коефіцієнтів сворачивается в:

$$ (-1)^{|Y|-k} \cdot C_{|Y|-1}^{|Y|-k}. $$

Таким чином, для цього варіанти задачі ми також отримали розв'язок з асимптотикою $O(2^k \cdot k)$:

$$ ans = \sum_{Y ~ : ~ |Y| \ge k} (-1)^{|Y|-k} \cdot C_{|Y|-1}^{|Y|-k} \cdot f(Y). $$

### Кількість шляхів

Є поле $n \times m$, деякі $k$ клітин якого - непроходимые стенки. На поле в клітці $(1,1)$ (ліва нижня клітина) спершу знаходиться робот. Робот можливо рухатися тільки вправо або вгору, і в підсумку він повинен потрапити в клітинку $(n,m)$, избежав всі перешкоди. Потрібно порахувати число шляхів, якими він можливо це зробити.

Предполагаем, що розміри $n$ і $m$ дуже великі (скажімо, до $10^9$), а кількість $k$ - невелике (порядку $100$).

Для розв'язку зразу в цілях зручності **відсортуємо** перешкоди в тому порядку, в якому ми можемо їх обійти: тобто, наприклад, по координаті $x$, а при рівності - по координаті $y$.

Також зразу навчимося розв'язувати задачу без перешкод: тобто навчимося вважати число способів дійти від однієї клітини до іншої. Якщо по однієї координаті нам треба пройти $x$ клітин, а по іншої - $y$ клітин, то з несложной комбинаторики ми отримуємо таку формулу через [биномиальные коефіцієнти](binomial_coeff):

$$ C_{x+y}^{x} $$

Тепер аби порахувати число способів дійти від однієї клітини до іншої, избежав всіх перешкод, можна скористатися **формулою включень-виключень**: порахуємо число способів дійти, наступив хоча б на одне препятствие.

Для цього можна, наприклад, перебрати підмножина тих перешкод, на які ми точно наступим, порахувати число способів зробити це (просто перемножив число способів дійти від стартової клітини до першого з обраних перешкод, від першого перешкоди до іншого, і так далі), і потім додати або відняти це число від відповіді, в відповідно зі стандартної формулою включень-виключень.

Однак це знову буде неполиномиальное розв'язок - за асимптотику $O(2^k k)$. Покажемо, як получити **полиномиальное розв'язок**.

Розв'язувати будемо **динамическим программированием**: навчимося обчислювати числа $d[i][j]$ - число способів дійти від $i$-ой точки до $j$-ой, не наступив при цим ні на одне препятствие (крім самих $i$ і $j$, природно). Всього у нас буде $k+2$ точки, оскільки до препятствиям додаються стартова і конечная клітини.

Якщо ми на секунду забудем про всі перешкоди і просто порахуємо число шляхів з клітини $i$ в клітинку $j$, то тим самим ми учтём деякі "плохие" шляхи, проходящие через перешкоди. Навчимося вважати кількість цих "поганих" шляхів. Переберемо перший з перешкод $i < t < j$, на яке ми наступим, тоді кількість шляхів буде рівне $d[i][t]$, умноженному на число довільних шляхів з $t$ в $j$. Просуммировав це по всім $t$, ми порахуємо кількість "поганих" шляхів.

Таким чином, значення $d[i][j]$ ми навчилися вважати за час $O(k)$. Отже, розв'язок всій задачі має асимптотику $O(k^3)$.

### Число взаємно простих четвірок

Дано $n$ чисел: $a_1, a_2, \ldots, a_n$. Потрібно порахувати кількість способів вибрати з них чотири числа так, що їх совокупный найбільший загальний дільник рівний одиниці.

Будемо розв'язувати зворотню задачу - порахуємо число "поганих" четвірок, тобто таких четвірок, в яких всі числа діляться на число $d > 1$.

Скористаємося формулою включень-виключень, підсумовуючи кількість четвірок, діляться на дільник $d$ (але, можливо, діляться і на більший дільник):

$$ ans = \sum_{d \ge 2} (-1)^{deg(d)-1} \cdot f(d), $$

де $deg(d)$ - це кількість простих в факторизації числа $d$, $f(d)$ - кількість четвірок, діляться на $d$.

Щоб порахувати функцію $f(d)$, треба просто порахувати кількість чисел, кратних $d$, і [биномиальным коефіцієнтом](binomial_coeff) порахувати число способів вибрати з них четвёрку.

Таким чином, з допомогою формули включень-виключень ми підсумовуємо кількість четвірок, діляться на прості числа, потім віднімаємо число четвірок, діляться на добуток двох простих, додаємо четвірки, делящиеся на три простих, і т.д.

### Число гармонических трійок

Дано число $n \le 10^6$. Потрібно порахувати число таких трійок чисел $2 \le a < b < c \le n$, що вони є гармоническими трійками, тобто:

* або ${\rm gcd}(a,b) = {\rm gcd}(a,c) = {\rm gcd}(b,c) = 1$,
* або ${\rm gcd}(a,b) > 1$, ${\rm gcd}(a,c) > 1$, ${\rm gcd}(b,c) > 1$.

По-перше, зразу перейдемо до зворотного задачі - тобто порахуємо число негармонических трійок.

По-друге, зауважимо, що в будь-якої негармонической тройке рівне два її числа знаходяться в такий ситуації, що це число взаємно просто з одним числом трійки і не взаємно просто з іншим числом трійки.

Таким чином, кількість негармонических трійок рівне сумі по всім числах від $2$ до $n$ произведений кількості взаємно простих з поточним числом чисел на кількість не взаємно простих чисел.

Тепер усе, що нам залишилося для розв'язку задачі - це навчитися вважати для кожного числа в відрізку $[2;n]$ кількість чисел, взаємно простих (або не взаємно простих) з ним. Хоча ця задача вже рассматривалась нами вище, описанное вище розв'язок не підходить тут - воно зажадає факторизації кожного з чисел від $2$ до $n$, і потім перебору всіляких произведений простих чисел з факторизації.

Тому нам знадобиться більш швидке розв'язок, яке подсчитывает відповіді для всіх чисел з відрузку $[2;n]$ зразу.

Для цього можна реалізувати таку **модифікацію решета Ератосфена**:

* По-перше, нам треба знайти всі числа в відрізку $[2;n]$, в факторизації яких никакое просте не входити двічі. Крім того, для формули включень-виключень нам буде потрібно знати, скільки простих містить факторизація кожного такого числа.

Для цього нам треба завести масиви $deg[]$, хранящие для кожного числа кількість простих в його факторизації, і $good[]$ - що містить для кожного числа $true$ або $false$ - всі прості входять в нього в степені $\le 1$ або ні.

Після цього у час решета Ератосфена при обробці чергового простого числа ми пройдемося по всім числах, кратным поточному числу, і збільшимо $deg[]$ у них, а у всіх чисел, кратних квадрату від поточного простого - поставимо $good = false$.

* По-друге, нам треба порахувати відповідь для всіх чисел від $2$ до $n$, тобто масив $cnt[]$ - кількість чисел, не взаємно простих з даними.

Для цього згадаємо, як працює формула включень-виключень - тут фактично ми реалізуємо її ж, але з перевёрнутой логикой: ми словно перебираємо доданок і дивимося, в які формули включень-виключень для яких чисел це доданок входити.

Отже, нехай у нас є число $i$, для якого $good[]=true$, тобто це число, участвующее в формулою включень-виключень. Переберемо всі числа, кратні $i$, і до відповіді $cnt[]$ кожного з таких чисел ми повинні додати або відняти величину $\lfloor N/i \rfloor$. Знак - додаток або віднімання - залежить від $deg[i]$: якщо $deg[i]$ нечётна, то треба додавати, інакше вычитать.

**Реалізація**:

<!--- TODO: specify code snippet id -->
``` cpp
int n;
bool good[MAXN];
int deg[MAXN], cnt[MAXN];

long long solve() {
    memset (good, 1, sizeof good);
    memset (deg, 0, sizeof deg);
    memset (cnt, 0, sizeof cnt);

    long long ans_bad = 0;
    for (int i=2; i<=n; ++i) {
        if (good[i]) {
            if (deg[i] == 0)  deg[i] = 1;
            for (int j=1; i*j<=n; ++j) {
                if (j > 1 && deg[i] == 1)
                    if (j % i == 0)
                        good[i*j] = false;
                    else
                        ++deg[i*j];
                cnt[i*j] += (n / i) * (deg[i]%2==1 ? +1 : -1);
            }
        }
        ans_bad += (cnt[i] - 1) * 1ll * (n-1 - cnt[i]);
    }

    return (n-1) * 1ll * (n-2) * (n-3) / 6 - ans_bad / 2;
}
```

Асимптотика такого розв'язку становить $O(n \log n)$, оскільки майже для кожного числа $i$ воно здійснює приблизно $n/i$ ітерацій вкладеного циклу.

### Число перестановок без нерухомих точок

Доведемо, що число перестановок довжини $n$ без нерухомих точок рівне наступного числу:

$$ n! - C_n^1 \cdot (n-1)! + C_n^2 \cdot (n-2)! - C_n^3 \cdot (n-3)! + \ldots \pm C_n^n \cdot (n-n)! $$

і приблизно рівне числу:

$$ \frac{ n! }{ e } $$

(більш того, якщо округлить це вираз до ближайшему цілому - то вийде в точності число перестановок без нерухомих точок)

Позначимо через $A_k$ множину перестановок довжини $n$ з нерухомою точкою в позиції $k$ ($1 \le k \le n$).

Скористаємося тепер формулою включень-виключень, аби порахувати число перестановок хоча б з однієї нерухомою точкою. Для цього нам треба навчитися вважати розміри множин-пересічний $A_i$, вони выглядят наступним чином:

$$ \left| A_p \right| = (n-1)! ~, $$
$$ \left| A_p \cap A_q \right| = (n-2)! ~, $$
$$ \left| A_p \cap A_q \cap A_r \right| = (n-3)! ~, $$
$$ \ldots ~, $$

оскільки якщо ми знаємо, що число нерухомих точок рівне $x$, то тим самим ми знаємо позицію $x$ елементів перестановки, а всі інші $(n-x)$ елементів можуть стояти де завгодно.

Підставляючи це в формулу включень-виключень і враховуючи, що число способів вибрати підмножина розміру $x$ з $n$-элементного множини рівне $C_n^x$, отримуємо формулу для числа перестановок хоча б з однієї нерухомою точкою:

$$ C_n^1 \cdot (n-1)! - C_n^2 \cdot (n-2)! + C_n^3 \cdot (n-3)! - \ldots \pm C_n^n \cdot (n-n)! $$

Значить число перестановок без нерухомих точок рівне:

$$ n! - C_n^1 \cdot (n-1)! + C_n^2 \cdot (n-2)! - C_n^3 \cdot (n-3)! + \ldots \pm C_n^n \cdot (n-n)! $$

Упрощая це вираз, отримуємо **точное і приблизне вираження для кількості перестановок без нерухомих точок**:

$$ n! \left( 1 - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \ldots \pm \frac{1}{n!} \right) \approx \frac{n!}{e}. $$

(оскільки сума в скобках - це перші $n+1$ членів разложения в ряд Тейлора $e^{-1}$)

В заключение варто відзначити, що аналогічним чином вирішується задача, коли потрібно, аби нерухомих точок не було серед $m$ перших елементів перестановок (а не серед всіх, як ми тільки що вирішували). Формула вийде така, як наведена вище точная формула, тільки в ній сума буде йти до $k$, а не до $n$.

## Задачі в online judges

Список задач, які можна розв'язати, використовуючи принцип включень-виключень:

* [UVA #10325 **"The Lottery"** [складність: низька]](http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1266)

* [UVA #11806 **"Cheerleaders"** [складність: низька]](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2906)

* [TopCoder SRM 477 **"CarelessSecretary"** [складність: низька]](http://www.topcoder.com/stat?c=problem_statement&pm=10875)

* [TopCoder TCHS 16 **"Divisibility"** [складність: низька]](http://community.topcoder.com/stat?c=problem_statement&pm=6658&rd=10068)

* [SPOJ #6285 NGM2 **"Another Game With Numbers"** [складність: низька]](http://www.spoj.pl/problems/NGM2/)

* [TopCoder SRM 382 **"CharmingTicketsEasy"** [складність: середня]](http://community.topcoder.com/stat?c=problem_statement&pm=8470)

* [TopCoder SRM 390 **"SetOfPatterns"** [складність: середня]](http://www.topcoder.com/stat?c=problem_statement&pm=8307)

* [TopCoder SRM 176 **"Deranged"** [складність: середня]](http://community.topcoder.com/stat?c=problem_statement&pm=2013)

* [TopCoder SRM 457 **"TheHexagonsDivOne"** [складність: середня]](http://community.topcoder.com/stat?c=problem_statement&pm=10702&rd=14144&rm=303184&cr=22697599)

* [SPOJ #4191 MSKYCODE **"Sky Code"** [складність: середня]](http://www.spoj.pl/problems/MSKYCODE/)

* [SPOJ #4168 SQFREE **"Square-free integers"** [складність: середня]](http://www.spoj.pl/problems/SQFREE/)

* [CodeChef **"Count Relations"** [складність: середня]](http://www.codechef.com/JAN11/problems/COUNTREL/)

## Література

* [Debra K. Borkovitz. **"Derangements and the Inclusion-Exclusion Principle"**](http://faculty.wheelock.edu/dborkovitz/articles/ngm6.htm)