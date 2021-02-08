# Задача Джонсона з двома верстатами

Є $n$ деталей і два верстата. Кожна деталь повинна спочатку пройти обробку на першому верстаті, потім - на іншому. При цим $i$-ая деталь обробляється на першому верстаті за $a_i$ часу, а на іншому - за $b_i$ часу. Кожен верстат в кожний момент часу можливо працювати тільки з однієї деталью.

Потрібно скласти такий порядок подачи деталей на станки, аби итоговое час обробки всіх деталей було б мінімальним.

Ця задача називається іноді завданням двухпроцессорного обслуживания задач, або завданням Джонсона (по імені S.M. Johnson, який в 1954 р. запропонував алгоритм для її розв'язку).

Варто відзначити, що коли число станков більше двох, ця задача стає NP-повної (як довів Гэри (Garey) в 1976 г)..

## Побудова алгоритму

Зауважимо на початку, що можна вважати, що порядок обробки деталей **на першому і іншому станках повинен збігатися**. Насправді, т.до. деталі для іншого верстата стають доступными тільки після обробки на першому, а при наявності декількох доступных для іншого верстата деталей час їх обробки буде рівне сумі їх $b_i$ незалежно від їх порядку - то выгоднее всього отправлять на другий верстат ту з деталей, яка раніше інших пройшла обробку на першому верстаті.

Розглянемо порядок подачи деталей на станки, збігається з їх входным порядком: $1, 2, \ldots, n$.

Позначимо через $x_i$ **час простоя** іншого верстата безпосередньо перед обработкой $i$-ой деталі (після обробки $i-1$-ой деталі). Наша мета - **мінімізувати сумарний простий**:

$$ F(x) = \sum x_i \longrightarrow \min. $$

Для першо] деталі ми маємо:

$$ x_1 = a_1. $$

Для другий - т.до. вона стає готовой до отправке на другий верстат в момент часу $a_1+a_2$, а другий верстат освобождается в момент часу $x_1 + b_1$, то маємо:

$$ x_2 = \max \Big( (a_1+a_2) - (x_1+b_1), 0 \Big). $$

Третья деталь стає доступной для іншого верстата в момент $a_1+a_2+a_3$, а верстат освобождается в $x_1+b_1+x_2+b_2$, тому:

$$ x_3 = \max \Big( (a_1+a_2+a_3) - (x_1+b_1+x_2+b_2), 0 \Big). $$

Таким чином, загальний вид для $x_i$ виглядає так:

$$ x_k = \max \left( \sum_{i=1}^{k} a_i - \sum_{i=1}^{k-1} b_i - \sum_{i=1}^{k-1} x_i, 0 \right). $$

Порахуємо тепер **сумарний простий** $F(x)$. Стверджується, що він має вид:

$$ F(x) = \max_{k=1 \ldots n} K_i, $$

де

$$ K_i = \sum_{i=1}^{k} a_i - \sum_{i=1}^{k-1} b_i. $$

(В це можна переконатися по індукції, або послідовно знаходячи вираження для суми перших двох, трьох, і т.д. $x_i$).

Скористаємося тепер **перестановочным прийомом**: попробуем обміняти які-або два сусідніх елементу $j$ і $j+1$ і подивимося, як при цим зміниться сумарний простий.

За увазі функції виразів для $K_i$ зрозуміло, що изменятся тільки $K_j$ і $K_{j+1}$; позначимо їх нові значення через $K_j^\prime$ і $K_{j+1}^\prime$.

Таким чином, аби деталь $j$ шла до деталі $j+1$, достатньо (хоча і не необхідно), аби:

$$ \max \left( K_j, K_{j+1} \right) \le \max \left( K_j^\prime, K_{j+1}^\prime \right). $$

(тобто ми проигнорировали інші, не изменившиеся, аргументы максимуму в выражении для $F(x)$, отримавши тим самим достатню, але не необхідне умова того, що старе $F(x)$ менше або рівне нового значення)

Отняв $ \sum_{i=1}^{j+1} a_i - \sum_{i=1}^{j-1} b_i $ від обох частин цього нерівності, отримаємо:

$$ \max (-a_{j+1}, -b_j) \le \max (-b_{j+1}, -a_j), $$

або, избавляясь від негативних чисел, отримуємо:

$$ \min (a_j, b_{j+1}) \le \min (b_j, a_{j+1}). $$

Тим самим, ми отримали **компаратор**: отсортировав деталі по нього, ми, згідно приведённым вище выкладкам, прийдемо до оптимальному порядку деталей, в якому не можна переставить місцями ніякі дві деталі, улучшив итоговое час.

Втім, можна ще більше **спростити** сортування, якщо подивитися на цей компаратор з іншої сторони. Фактично він говорить нам про тому, що якщо мінімум з чотирьох чисел $(a_j, a_{j+1}, b_{j}, b_{j+1})$ досягається на елементі з масиву $a$, то відповідна деталь повинна йти раніше, а якщо на елементі з масиву $b$ - то пізніше. Тим самим ми отримуємо іншу форму алгоритму: відсортувати деталі по мінімуму з $(a_i, b_i)$, і якщо у поточній деталі мінімум рівний $a_i$, то цю деталь треба обробити першо] з залишилися, інакше - останньої з залишилися.

Так або інакше, виходить, що задача Джонсона з двома верстатами зводиться до сортування деталей з певної функцією порівняння елементів. Таким чином, асимптотика розв'язку становить $O(n \log n)$.

## Реалізація

Реалізуємо другий різновид описаного вище алгоритму, коли деталі упорядковано по мінімуму з $(a_i, b_i)$, і потім отправляются в початок або в кінець поточного списку.

<!--- TODO: specify code snippet id -->
``` cpp
struct item {
    int a, b, id;

    bool operator< (item p) const {
        return min(a,b) < min(p.a,p.b);
    }
};

sort (v.begin(), v.end());
vector<item> a, b;
for (int i=0; i<n; ++i)
    (v[i].a<=v[i].b ? a : b) .push_back (v[i]);
a.insert (a.end(), b.rbegin(), b.rend());

int t1=0, t2=0;
for (int i=0; i<n; ++i) {
    t1 += a[i].a;
    t2 = max(t2,t1) + a[i].b;
}
```

Тут всі деталі зберігаються в вигляді структур $\rm item$, кожна з яких містить значення $a$ і $b$ і исходный номер деталі.

Детали упорядковано, потім распределяются по списками $a$ (це ті деталі, які були отправлены в початок черги) і $b$ (ті, що були отправлены в кінець). Після цього два списку об'єднуються (причому другий список береться в зворотньому порядку), і потім по знайденому порядку обчислюється шукане мінімальне час: підтримуються дві змінні $t_1$ і $t_2$ - час освобождения першого і іншого верстата відповідно.

## Література

* [S.M. Johnson. **Optimal two- and three-stage production schedules with setup times included** [1954]](http://www.rand.org/pubs/papers/2008/P402.pdf)

* M.R. Garey. **The Complexity of Flowshop and Jobshop Scheduling** [1976]