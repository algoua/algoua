# Дискретний витяг кореня

Задача дискретного вилучення кореня (аналогічна до задачі дискретного логарифма) формулюється наступним чином. Для заданих $n$ ($n$ - просте), $a$ та $k$ потрібно знайти всі $x$, які задовольняють рівнянню:

$$
x^k \equiv a \pmod{n}
$$

## Алгоритм розв'язку

Розв'язуватимемо задачу, зводячи її до задачі дискретного логарифма.

Для цього застосуємо поняття [Первинного кореня за модулем $n$](https://uk.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D0%B2%D0%B8%D0%BD%D0%BD%D0%B8%D0%B9_%D0%BA%D0%BE%D1%80%D0%B5%D0%BD%D1%8C). Нехай $g$ - первинний корінь за модулем $n$ (тобто $n$ - просте, то він існує). Знайти його ми можемо, як описано в відповідній статті, за $O( {\rm Ans} \cdot \log \phi(n) \cdot \log n) = O( {\rm Ans} \cdot \log^2 n)$ плюс час факторизації числа $\phi(n)$.

Відкинемо випадок, коли $a=0$ - у цьому випадку ми одразу знаходимо відповідь $x=0$.

Оскільки у даному випадку $n$ є простим числом, будь-яке число від $1$ до $n-1$ можна представити у вигляді степеня первісного кореня. Тому задачу дискретного кореня можна сформулювати таким чином:

$$
{\left( g^y \right)}^k \equiv a \pmod{n}
$$

де

$$
x \equiv g^y \pmod{n}
$$

Тривіальним перетворенням отримуємо:

$$
{\left( g^k \right)}^y \equiv a \pmod{n}
$$

Тут шуканою величиною є $y$, отже, ми прийшли до задачі дискретного логарифмування в чистому вигляді. Цю задачу можна вирішити [алгоритмом baby-step-giant-step Шенкса](discrete_log) за $O(\sqrt{n}\log n)$, тобто знайти одне з розв'язків $y_0$ цього рівняння (або встановити, що це рівняння розв'язків не має).

Нехай ми знайшли деякий розв'язок $y_0$ цього рівняння, тоді одним з розв'язків задачі дискретного кореня буде $x_0 = g^{y_0} \bmod n$.

## Знаходження всіх розв'язків, знаючи один з них

Щоб повністю розв'язати поставлену задачу, потрібно навчитися за допомогою знайденого $x_0 = g^{y_0} \bmod n$ знаходити всі інші розв'язки.

Для цього згадаємо такий факт, що первісний корінь завжди має порядок $\phi(n)$ (див. [статтю про первообразний корінь](https://uk.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D0%B2%D0%B8%D1%81%D0%BD%D0%B8%D0%B9_%D0%BA%D0%BE%D1%80%D1%96%D0%BD%D1%8C)), тобто найменшою степенем $g$, що дає одиницю, є $\phi(n)$. Тому додавання до показника степеня доданка з $\phi(n)$ нічого не змінює

$$
x^k \equiv g^{ y_0 \cdot k + l \cdot \phi(n) } \equiv a \pmod{n}\ \ \ \forall\ l \in {\cal Z}
$$

Звідси всі розв'язки мають такий вигляд:

$$
x = g^{ y_0 + \frac{ l \cdot \phi(n) }{ k } } \pmod{n}\ \ \ \forall\ l \in {\cal Z}
$$

де $l$ вибирається таким чином, щоб дріб $\frac{ l \cdot \phi(n) }{ k }$ був цілим. Щоб цей дріб був цілим, чисельник повинен бути кратним найменшому загальному кратному $\phi(n)$ і $k$. Звідси (з використанням того факту, що найменше загальне кратне двох чисел ${\rm lcm}(a,b) = \frac{ a \cdot b }{ {\rm gcd}(a,b) }$) маємо:

$$
x = g^{ y_0 + i \frac{ \phi(n) }{ {\rm gcd}(k,\phi(n)) } } \pmod{n}\ \ \ \forall\ i \in {\cal Z}
$$

Це остаточна зручна формула, яка дає загальний вигляд всіх розв'язків задачі дискретного кореня.

## Реалізація

Наведемо повну реалізацію, яка включає знаходження примітивного кореня, дискретне логарифмування та знаходження та виведення всіх розв'язків.

<!--- TODO: specify code snippet id -->
``` cpp
int gcd(int a, int b) { return a ? gcd(b % a, a) : b; }

int powmod(int a, int b, int p) {
    int res = 1;
    while (b)
        if (b & 1)
            res = int(res * 1ll * a % p), --b;
        else
            a = int(a * 1ll * a % p), b >>= 1;
    return res;
}

int generator(int p) {
    vector<int> fact;
    int phi = p - 1, n = phi;
    for (int i = 2; i * i <= n; ++i)
        if (n % i == 0) {
            fact.push_back(i);
            while (n % i == 0)
                n /= i;
        }
    if (n > 1)
        fact.push_back(n);

    for (int res = 2; res <= p; ++res) {
        bool ok = true;
        for (size_t i = 0; i < fact.size() && ok; ++i)
            ok &= powmod(res, phi / fact[i], p) != 1;
        if (ok)
            return res;
    }
    return -1;
}

int main() {
    int n, k, a;
    cin >> n >> k >> a;
    if (a == 0) {
        puts("1\n0");
        return 0;
    }

    int g = generator(n);

    int sq = (int)sqrt(n + .0) + 1;
    vector<pair<int, int>> dec(sq);
    for (int i = 1; i <= sq; ++i)
        dec[i - 1] = make_pair(powmod(g, int(i * sq * 1ll * k % (n - 1)), n), i);
    sort(dec.begin(), dec.end());
    int any_ans = -1;
    for (int i = 0; i < sq; ++i) {
        int my = int(powmod(g, int(i * 1ll * k % (n - 1)), n) * 1ll * a % n);
        vector<pair<int, int>>::iterator it = lower_bound(dec.begin(), dec.end(), make_pair(my, 0));
        if (it != dec.end() && it->first == my) {
            any_ans = it->second * sq - i;
            break;
        }
    }
    if (any_ans == -1) {
        puts("0");
        return 0;
    }

    int delta = (n - 1) / gcd(k, n - 1);
    vector<int> ans;
    for (int cur = any_ans % delta; cur < n - 1; cur += delta)
        ans.push_back(powmod(g, cur, n));
    sort(ans.begin(), ans.end());
    printf("%d\n", ans.size());
    for (size_t i = 0; i < ans.size(); ++i)
        printf("%d ", ans[i]);
}
```