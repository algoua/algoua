# Китайська теорема про залишки

## Формулювання

В своєї современной формулюванні теорема звучить так:

Нехай $p = p_1 \cdot p_2 \cdot \ldots \cdot p_k$, де $p_i$ - попарно взаємно прості числа.

Поставимо в відповідність безпідставного числу $a$ $(0 \le a < p)$ кортеж $(a_1, \ldots, a_k)$, де $a_i \equiv a \pmod {p_i}$:

$$ a \Longleftrightarrow (a_1, \ldots, a_k). $$

Значить це відповідність (між числами і кортежами) буде бути **взаємно однозначным**. І, більш того, операції, выполняемые над числом $a$, можна еквівалентно виконувати над відповідними елементами кортежами - шляхом независимого виконання операцій над кожним компонентом.

тобто., якщо

$$ a \Longleftrightarrow \Big( a_1, \ldots, a_k \Big), $$
$$ b \Longleftrightarrow \Big( b_1, \ldots, b_k \Big), $$

то справедливо:

$$ {(a+b) \pmod p} \Longleftrightarrow \Big( {(a_1+b_1) \pmod {p_1}}, \ldots, {(a_k+b_k) \pmod {p_k}} \Big), $$
$$ {(a-b) \pmod p} \Longleftrightarrow \Big( {(a_1-b_1) \pmod {p_1}}, \ldots, {(a_k-b_k) \pmod {p_k}} \Big), $$
$$ {(a \cdot b) \pmod p} \Longleftrightarrow \Big( {(a_1 \cdot b_1) \pmod {p_1}}, \ldots, {(a_k \cdot b_k) \pmod {p_k}} \Big). $$

В своєї первоначальной формулюванні ця теорема була доведена китайским математиком Сунь-Цзы приблизно в 100 р. н.е. А саме, він показав в приватному випадку эквивалентность розв'язку системи модулярних рівнянь і розв'язку одного модулярного рівняння (див. наслідок 2 нижче).

### Слідство 1

Система модулярних рівнянь:

$$ \cases{
{x \equiv a_1 \pmod {p_1}}, \cr
\ldots, \cr
{x \equiv a_k \pmod {p_k}} \cr
} $$

має єдине розв'язок за модулем $p$.

(як і вище, $p = p_1 \cdot \ldots \cdot p_k$, числа $p_i$ попарно взаємно прості, а набір $a_1, \ldots, a_k$ - довільний набір цілих чисел)

### Слідство 2

Следствием є зв'язок між системою модулярних рівнянь і одним відповідним модулярным рівнянням:

Уравнение:

$$ x \equiv a \pmod p $$

еквівалентно системі рівнянь:

$$ \cases{
{x \equiv a \pmod {p_1}}, \cr
\ldots, \cr
{x \equiv a \pmod {p_k}} \cr
} $$

(як і вище, передбачається, що $p = p_1 \cdot \ldots \cdot p_k$, числа $p_i$ попарно взаємно прості, а $a$ - довільне ціле число)

## Алгоритм Гарнера

З китайской теореми про залишки випливає, що можна заменять операції над числами операціями над кортежами. Нагадаємо, кожному числу $a$ ставиться в відповідність кортеж $(a_1, \ldots, a_k)$, де:

$$ { a_i \equiv a \pmod {p_i} } . $$

Це можливо знайти широкое застосування на практиці (крім безпосереднього застосування для відновлення числа по його остаткам по различным модулям), оскільки ми таким чином можемо заменять операції в довгою арифметиці операціями з масивом "коротких" чисел. Скажем, масиву з $1000$ елементів "вистачить" на числа приблизно з $3000$ знаками (якщо вибрати в якості $p_i$-их перші $1000$ простих); а якщо вибирати в якості $p_i$-их прості близько миллиарда, то тоді вистачить вже на число з приблизно $9000$ знаками. Але, звісно, тоді потрібно навчитися **відновлювати** число $a$ по цьому кортежу. З следствия 1 видно, що таке відновлення можливо, і притому єдино (при умови $0 \le a < p_1 \cdot p_2 \cdot \ldots \cdot p_k$). **Алгоритм Гарнера** і є алгоритмом, позволяющим виконати це відновлення, причому достатньо ефективно.

Будемо шукати розв'язок в вигляді:

$$ a = x_1 + x_2 \cdot p_1 + x_3 \cdot p_1 \cdot p_2 + \ldots + x_k \cdot p_1 \cdot \ldots \cdot p_{k-1}, $$

тобто в смешанной системі числення з вагами розрядів $p_1, p_2, \ldots, p_k$.

Позначимо через $r_{ij}$ ($i=1 \ldots k-1$, $j=i+1 \ldots k$) число, є зворотним для $p_i$ за модулем $p_j$ (знаходження зворотних елементів в кольце за модулем описано [тут](reverse_element):

$$ r_{ij} = (p_i) ^ {-1} \pmod {p_j} . $$

Підставами вираз $a$ в смешанной системі числення в перший рівняння системи, отримаємо:

$$ a_1 \equiv x_1. $$

Підставами тепер вираз у друге рівняння:

$$ a_2 \equiv x_1 + x_2 \cdot p_1 \pmod {p_2}. $$

Перетворимо це вираз, отняв від обох частин $x_1$ і розділивши на $p_1$:

$$ a_2 - x_1 \equiv x_2 \cdot p_1 \pmod {p_2}; $$
$$ (a_2 - x_1) \cdot r_{12} \equiv x_2 \pmod {p_2}; $$
$$ x_2 \equiv (a_2 - x_1) \cdot r_{12} \pmod {p_2}. $$

Підставляючи в третій рівняння, аналогічним чином отримуємо:

$$ a_3 \equiv { x_1 + x_2 \cdot p_1 + x_3 \cdot p_1 \cdot p_2 \pmod {p_3} }; $$
$$ (a_3 - x_1) \cdot r_{13} \equiv x_2 + x_3 \cdot p_2 \pmod {p_3}; $$
$$ ((a_3 - x_1) \cdot r_{13} - x_2) \cdot r_{23} \equiv x_3 \pmod {p_3}; $$
$$ x_3 \equiv ((a_3 - x_1) \cdot r_{13} - x_2) \cdot r_{23} \pmod {p_3}. $$

Уже достатньо ясно видна закономірність, яку простіше всього выразить кодом:

<!--- TODO: specify code snippet id -->
``` cpp
for (int i=0; i<k; ++i) {
    x[i] = a[i];
    for (int j=0; j<i; ++j) {
        x[i] = r[j][i] * (x[i] - x[j]);

        x[i] = x[i] % p[i];
        if (x[i] < 0)  x[i] += p[i];
    }
}
```

Отже, ми навчилися обчислювати коефіцієнти $x_i$ за час $O(k^2)$, сам ж відповідь - число $a$ - можна відновити по формулою:

$$ a = x_1 + x_2 \cdot p_1 + x_3 \cdot p_1 \cdot p_2 + \ldots + x_k \cdot p_1 \cdot \ldots \cdot p_{k-1}. $$

Варто замітити, що на практиці майже завжди обчислювати відповідь потрібно з допомогою [Длинной арифметики](big_integer), але при цим самі коефіцієнти $x_i$ як і раніше обчислюються на встроенных типах, а тому весь алгоритм Гарнера є вельми ефективним.

## Реалізація алгоритму Гарнера

Удобнее всього реалізовувати цей алгоритм на мові Java, оскільки вона містить стандартну довгу арифметику, а тому не виникає ніяких проблем з переводом числа з модульної системи в звичайне число (використовується стандартний клас BigInteger).

Наведена нижче реалізація алгоритму Гарнера підтримує складання, віднімання і множення, причому підтримує роботу з негативними числами (про цим див. пояснения після коду). Реализован перевод числа звичайного десятичкого уявлення в модулярную систему і навпаки.

В даному прикладі берутся $100$ простих після $10^9$, що дозваляє працювати з числами до приблизно $10^{900}$.

\javacode
final int SZ = 100;
int pr[] = new int[SZ];
int r[][] = new int[SZ][SZ];

void init() {
    for (int x=1000*1000*1000, i=0; i<SZ; ++x)
        if (BigInteger.valueOf(x).isProbablePrime(100))
            pr[i++] = x;
    
    for (int i=0; i<SZ; ++i)
        for (int j=i+1; j<SZ; ++j)
            r[i][j] = BigInteger.valueOf( pr[i] ).modInverse(
                    BigInteger.valueOf( pr[j] ) ).intValue();
}

class Number {
    
    int a[] = new int[SZ];
    
    public Number() {
    }
    
    public Number (int n) {
        for (int i=0; i<SZ; ++i)
            a[i] = n % pr[i];
    }
    
    public Number (BigInteger n) {
        for (int i=0; i<SZ; ++i)
            a[i] = n.mod( BigInteger.valueOf( pr[i] ) ).intValue();
    }
    
    public Number add (Number n) {
        Number result = new Number();
        for (int i=0; i<SZ; ++i)
            result.a[i] = (a[i] + n.a[i]) % pr[i];
        return result;
    }
    
    public Number subtract (Number n) {
        Number result = new Number();
        for (int i=0; i<SZ; ++i)
            result.a[i] = (a[i] - n.a[i] + pr[i]) % pr[i];
        return result;
    }
    
    public Number multiply (Number n) {
        Number result = new Number();
        for (int i=0; i<SZ; ++i)
            result.a[i] = (int)( (a[i] * 1l * n.a[i]) % pr[i] );
        return result;
    }
    
    public BigInteger bigIntegerValue (boolean can_be_negative) {
        BigInteger result = BigInteger.ZERO,
            mult = BigInteger.ONE;
        int x[] = new int[SZ];
        for (int i=0; i<SZ; ++i) {
            x[i] = a[i];
            for (int j=0; j<i; ++j) {
                long cur = (x[i] - x[j]) * 1l * r[j][i];
                x[i] = (int)( (cur % pr[i] + pr[i]) % pr[i] );                    
            }
            result = result.add( mult.multiply( BigInteger.valueOf( x[i] ) ) );
            mult = mult.multiply( BigInteger.valueOf( pr[i] ) );
        }
        
        if (can_be_negative)
            if (result.compareTo( mult.shiftRight(1) ) >= 0)
                result = result.subtract( mult );
            
        return result;
    }
}
\endcode

Про поддержке **негативних** чисел випливає сказати особливо (прапор $\rm can\_be\_negative$ функції ${\rm bigIntegerValue}()$). Сама модулярная схема не предполагает различий між положительными і негативними числами. Однак можна замітити, що, якщо в конкретної задачі відповідь за модулем не перевершує половини від твори всіх простих, то позитивні числа будуть відрізнятися від негативних тим, що позитивні числа получатся менше цій середины, а негативні - більше. Тому ми після класичного алгоритму Гарнера порівнюємо результат з серединою, і якщо він більше, то виводимо мінус, і інвертуємо результат (тобто віднімаємо його від твори всіх простих, і виводимо вже його).