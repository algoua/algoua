# Обчислення факторіала за модулем

В деяких випадках необхідно вважати по деякого простому модулю $p$ складні формули, які в тому числі можуть містити факториалы. Тут ми розглянемо випадок, коли модуль $p$ порівняно малий. Зрозуміло, що ця задача має сенс тільки в тому випадку, коли факториалы входять і в числитель, і в знаменник дробів. Дійсно, факторіал $p!$ і всі наступні обращаются в нуль за модулем $p$, однак в дробях всі множники, містять $p$, можуть сократиться, і отримане вираз вже буде відмінно від нуля за модулем $p$.

Таким чином, формально **задача** така. Потрібно обчислити $n!$ по простому модулю $p$, при цим не враховуючи всі кратні $p$ множники, що входять в факторіал. Научившись ефективно обчислювати такий факторіал, ми зможемо швидко обчислювати значення різних комбінаторних формул (наприклад, [Біноміальні коефіцієнти](binomial_coeff)).

## Алгоритм

Выпишем цей "модифікований" факторіал в явному вигляді:

$$ n!_{\%p} = $$
$$ = 1 \cdot 2 \cdot 3 \cdot \ldots \cdot (p-2) \cdot (p-1) \cdot \underbrace{1}_{p} \cdot (p+1) \cdot (p+2) \cdot \ldots \cdot (2p-1) \cdot \underbrace{2}_{2p} \cdot (2p+1) \cdot \ldots \cdot $$
$$ \cdot (p^2-1) \cdot \underbrace{1}_{p^2} \cdot (p^2+1) \cdot \ldots \cdot n = $$
$$ = 1 \cdot 2 \cdot 3 \cdot \ldots \cdot (p-2) \cdot (p-1) \cdot \cdot \underbrace{1}_{p} \cdot 1 \cdot 2 \cdot \ldots \cdot (p-1) \cdot \underbrace{2}_{2p} \cdot 1 \cdot 2 \cdot \ldots \cdot (p-1) \cdot \underbrace{1}_{p^2} \cdot $$
$$ \cdot 1 \cdot 2 \cdot \ldots \cdot (n\%p) \pmod p. $$

При такий записи видно, що "модифікований" факторіал розпадається на декілька блоків довжини $p$ (останній блок, можливо, коротше), які всі однакові, за винятком останнього елементу:

$$ n!_{\%p} = \underbrace{ 1 \cdot 2 \cdot \ldots \cdot (p-2) \cdot (p-1) \cdot 1}_{1st} \cdot \underbrace{ 1 \cdot 2 \cdot \ldots \cdot (p-1) \cdot 2 }_{2nd} \cdot \ldots \cdot \underbrace{ 1 \cdot 2 \cdot \ldots \cdot (p-1) \cdot 1 }_{p-th} \cdot \ldots \cdot $$
$$ \cdot \underbrace{ 1 \cdot 2 \cdot \ldots \cdot (n\%p)}_{tail} \pmod p. $$

Общую частина блоків порахувати легко - це просто $(p-1)!\ \rm{mod}\ p$, яку можна порахувати программно або по теоремі Вильсона (Wilson) зразу знайти $(p-1)!\ {\rm mod}\ p = p-1$. Щоб перемножити ці загальні частини всіх блоків, треба знайдену величину звести в ступінь за модулем $p$, що можна зробити за $O(\log n)$ операцій (див. [Бинарное піднесення в ступінь](binary_pow); втім, можна замітити, що ми фактично возводим мінус одиницю в якусь ступінь, а тому результатом завжди буде або $1$, або $p-1$, в залежності від парності показателя. Значення в последнем, неполном блоці теж можна порахувати окремо за $O(p)$. Остались тільки останні елементи блоків, розглянемо їх внимательнее:

$$ n!_{\%p} = \underbrace{ \ldots \cdot 1 } \cdot \underbrace{ \ldots \cdot 2 } \cdot \underbrace{ \ldots \cdot 3 } \cdot \ldots \cdot \underbrace{ \ldots \cdot (p-1) } \cdot \underbrace{ \ldots \cdot 1 } \cdot \underbrace{ \ldots \cdot 1 } \cdot \underbrace{ \ldots \cdot 2 } \ldots $$

І ми знову прийшли до "модифицированному" факториалу, але вже меншої розмірності (стільки, скільки було полных блоків, а їх було $\left\lfloor n / p \right\rfloor$). Таким чином, обчислення "модифікованого" факторіала $n!_{\%p}$ ми звели за $O(p)$ операцій до обчислення вже $(n/p)!_{\%p}$. Розкриваючи цю рекурентну залежність, ми отримуємо, що глибина рекурсії буде $O(\log_p n)$, итого **асимптотика** алгоритму виходить $O(p \log_p n)$.

## Реалізація

Зрозуміло, що при реалізації не обов'язково використовувати рекурсію в явному вигляді: оскільки рекурсія хвостовая, її легко развернуть в цикл.

<!--- TODO: specify code snippet id -->
``` cpp
int factmod (int n, int p) {
    int res = 1;
    while (n > 1) {
        res = (res * ((n/p) % 2 ? p-1 : 1)) % p;
        for (int i=2; i<=n%p; ++i)
            res = (res * i) % p;
        n /= p;
    }
    return res % p;
}
```

Ця реалізація працює за $O(p \log_p n)$.