# Дискретне витяг кореня

Задача дискретного вилучення кореня (по аналогії з [завданням дискретного логарифма](discrete_log)) звучить наступним чином. За даними $n$ ($n$ - просте), $a$, $k$ потрібно знайти всі $x$, удовлетворяющие умові:
$$ x^k \equiv a \pmod{n} $$

## Алгоритм розв'язку

Розв'язувати задачу будемо сведением її до задачі дискретного логарифма.

Для цього застосуємо поняття [Первообразного кореня за модулем $n$](primitive_root). Нехай $g$ - первісний корінь за модулем $n$ (т.до. $n$ - просте, то він існує). Знайти його ми можемо, як описано в відповідної статті, за $O( {\rm Ans} \cdot \log \phi(n) \cdot \log n) = O( {\rm Ans} \cdot \log^2 n)$ плюс час факторизації числа $\phi(n)$.

Отбросим зразу випадок, коли $a=0$ - в цим випадку зразу знаходимо відповідь $x=0$.

Оскільки в даному випадку ($n$ - просте) будь-яке число від $1$ до $n-1$ представимо в вигляді степені первісного кореня, то задачу дискретного кореня ми можемо уявити в вигляді:
$$ {\left( g^y \right)}^k \equiv a \pmod{n} $$
де
$$ x \equiv g^y \pmod{n} $$
Тривиальным перетворенням отримуємо:
$$ {\left( g^k \right)}^y \equiv a \pmod{n} $$
Тут шуканої величиною є $y$, таким чином, ми прийшли до задачі дискретного логарифмирования в чистом вигляді. Цю задачу можна розв'язати [алгоритмом baby-step-giant-step Шэнкса](discrete_log) за $O( \sqrt{n} \log n )$, тобто знайти одне з рішень $y_0$ цього рівняння (або виявити, що це рівняння рішень не має).

Нехай ми знайшли деякий розв'язок $y_0$ цього рівняння, тоді одним з рішень задачі дискретного кореня буде $x_0 = g^{y_0} \pmod{n}$.

## Знаходження всіх рішень, знаючи одне з них

Щоб повністю розв'язати поставленную задачу, треба навчитися по одному знайденому $x_0 = g^{y_0} \pmod{n}$ знаходити всі інші розв'язку.

Для цього згадаємо такий факт, що первісний корінь завжди має порядок $\phi(n)$ (див. [статтю про первообразном корені](primitive_root)), тобто найменшою степенем $g$, дающей одиницю, є $\phi(n)$. Тому додавання в показник степені доданка з $\phi(n)$ нічого не змінює:
$$ x^k \equiv g^{ y_0 \cdot k + l \cdot \phi(n) } \equiv a \pmod{n}\ \ \ \forall\ l \in {\cal Z} $$
Звідси всі розв'язку мають вид:
$$ x = g^{ y_0 + \frac{ l \cdot \phi(n) }{ k } } \pmod{n}\ \ \ \forall\ l \in {\cal Z} $$
де $l$ вибирається таким чином, аби дріб $\frac{ l \cdot \phi(n) }{ k }$ була цілої. Щоб ця дріб була цілої, числитель повинен бути кратен наименьшему загальному кратному $\phi(n)$ і $k$, звідки (згадуючи, що найменше загальне кратне двох чисел ${\rm lcm}(a,b) = \frac{ a \cdot b }{ {\rm gcd}(a,b) }$), отримуємо:
$$ x = g^{ y_0 + i \frac{ \phi(n) }{ {\rm gcd}(k,\phi(n)) } } \pmod{n}\ \ \ \forall\ i \in {\cal Z} $$
Це окончательная удобная формула, яка дає загальний вид всіх рішень задачі дискретного кореня.

## Реалізація

Наведемо повну реалізацію, включающую знаходження первісного кореня, дискретное логарифмирование і знаходження і висновок всіх рішень.

<!--- TODO: specify code snippet id -->
``` cpp
int gcd (int a, int b) {
    return a ? gcd (b%a, a) : b;
}

int powmod (int a, int b, int p) {
    int res = 1;
    while (b)
        if (b & 1)
            res = int (res * 1ll * a % p),  --b;
        else
            a = int (a * 1ll * a % p),  b >>= 1;
    return res;
}

int generator (int p) {
    vector<int> fact;
    int phi = p-1,  n = phi;
    for (int i=2; i*i<=n; ++i)
        if (n % i == 0) {
            fact.push_back (i);
            while (n % i == 0)
                n /= i;
        }
    if (n > 1)
        fact.push_back (n);

    for (int res=2; res<=p; ++res) {
        bool ok = true;
        for (size_t i=0; i<fact.size() && ok; ++i)
            ok &= powmod (res, phi / fact[i], p) != 1;
        if (ok)  return res;
    }
    return -1;
}

int main() {

    int n, k, a;
    cin >> n >> k >> a;
    if (a == 0) {
        puts ("1\n0");
        return 0;
    }

    int g = generator (n);

    int sq = (int) sqrt (n + .0) + 1;
    vector < pair<int,int> > dec (sq);
    for (int i=1; i<=sq; ++i)
        dec[i-1] = make_pair (powmod (g, int (i * sq * 1ll * k % (n - 1)), n), i);
    sort (dec.begin(), dec.end());
    int any_ans = -1;
    for (int i=0; i<sq; ++i) {
        int my = int (powmod (g, int (i * 1ll * k % (n - 1)), n) * 1ll * a % n);
        vector < pair<int,int> >::iterator it =
            lower_bound (dec.begin(), dec.end(), make_pair (my, 0));
        if (it != dec.end() && it->first == my) {
            any_ans = it->second * sq - i;
            break;
        }
    }
    if (any_ans == -1) {
        puts ("0");
        return 0;
    }

    int delta = (n-1) / gcd (k, n-1);
    vector<int> ans;
    for (int cur=any_ans%delta; cur<n-1; cur+=delta)
        ans.push_back (powmod (g, cur, n));
    sort (ans.begin(), ans.end());
    printf ("%d\n", ans.size());
    for (size_t i=0; i<ans.size(); ++i)
        printf ("%d ", ans[i]);

}
```
