# Ефективні алгоритми факторизації

Тут наведені реалізації кількох алгоритмів факторизації, кожен з яких може працювати як швидко, так і дуже повільно, але в сумі вони дають дуже швидкий метод.

Описання цих методів не наводяться, тим більше, що вони достатньо добре описані в Інтернеті.

## Метод Поларда-Рабіна $p-1$

Імовірнісний тест швидко дає відповідь не для всіх чисел.

Повертається або знайдений дільник, або 1, якщо дільник не був знайдений.

<!--- TODO: specify code snippet id -->
``` cpp
template <class T> T pollard_p_1(T n) {
Параметри алгоритму істотно впливають на продуктивність та якість пошуку
    const T b = 13;
    const T q[] = {2, 3, 5, 7, 11, 13};

// декілька спроб алгоритму
    T a = 5 % n;
    for (int j = 0; j < 10; j++) {
// Шукаємо таке $a$, яке взаємно просте з $n$
        while (gcd(a, n) != 1) {
            mulmod(a, a, n);
            a += 3;
            a %= n;
        }

        // обчислюємо a^M
        for (size_t i = 0; i < sizeof q / sizeof q[0]; i++) {
            T qq = q[i];
            T e = (T)floor(log((double)b) / log((double)qq));
            T aa = powmod(a, powmod(qq, e, n), n);
            if (aa == 0)
                continue;

Перевіряємо, чи не знайдено або немає відповіді
            T g = gcd(aa - 1, n);
            if (1 < g && g < n)
                return g;
        }
    }

Якщо нічого не знайшли
    return 1;
}
```

## Метод Поларда "Ро"

Імовірнісний тест швидко дає відповідь не для всіх чисел.

Повертається або знайдений дільник, або 1, якщо дільник не було знайдено.

<!--- TODO: specify code snippet id -->
``` cpp
template <class T> T pollard_rho(T n, unsigned iterations_count = 100000) {
    T b0 = rand() % n, b1 = b0, g;
    mulmod(b1, b1, n);
    if (++b1 == n)
        b1 = 0;
    g = gcd(abs(b1 - b0), n);
    for (unsigned count = 0; count < iterations_count && (g == 1 || g == n); count++) {
        mulmod(b0, b0, n);
        if (++b0 == n)
            b0 = 0;
        mulmod(b1, b1, n);
        ++b1;
        mulmod(b1, b1, n);
        if (++b1 == n)
            b1 = 0;
        g = gcd(abs(b1 - b0), n);
    }
    return g;
}
```

## Метод Бента - модифікація методу Поларда "Ро"

Імовірнісний тест швидко дає відповідь не для всіх чисел.

Повертається або знайдений дільник, або 1, якщо дільник не був знайдений.

<!--- TODO: specify code snippet id -->
``` cpp
template <class T> T pollard_bent(T n, unsigned iterations_count = 19) {
    T b0 = rand() % n, b1 = (b0 * b0 + 2) % n, a = b1;
    for (unsigned iteration = 0, series_len = 1; iteration < iterations_count; iteration++, series_len *= 2) {
        T g = gcd(b1 - b0, n);
        for (unsigned len = 0; len < series_len && (g == 1 && g == n); len++) {
            b1 = (b1 * b1 + 2) % n;
            g = gcd(abs(b1 - b0), n);
        }
        b0 = a;
        a = b1;
        if (g != 1 && g != n)
            return g;
    }
    return 1;
}
```

## Метод Поларда-Монте Карло

Імовірнісний тест швидко дає відповідь не для всіх чисел.

Повертається або знайдений дільник, або 1, якщо дільник не був знайдений.

<!--- TODO: specify code snippet id -->
``` cpp
template <class T> T pollard_monte_carlo(T n, unsigned m = 100) {
    T b = rand() % (m - 2) + 2;

    static std::vector<T> primes;
    static T m_max;
    if (primes.empty())
        primes.push_back(3);
    if (m_max < m) {
        m_max = m;
        for (T prime = 5; prime <= m; ++ ++prime) {
            bool is_prime = true;
            for (std::vector<T>::const_iterator iter = primes.begin(), end = primes.end(); iter != end; ++iter) {
                T div = *iter;
                if (div * div > prime)
                    break;
                if (prime % div == 0) {
                    is_prime = false;
                    break;
                }
            }
            if (is_prime)
                primes.push_back(prime);
        }
    }

    T g = 1;
    for (size_t i = 0; i < primes.size() && g == 1; i++) {
        T cur = primes[i];
        while (cur <= n)
            cur *= primes[i];
        cur /= primes[i];
        b = powmod(b, cur, n);
        g = gcd(abs(b - 1), n);
        if (g == n)
            g = 1;
    }

    return g;
}
```

## Метод Ферма

Це стовідсотковий метод, але він може працювати дуже повільно, якщо у числа є малі дільники.

Тому його варто запускати тільки після всіх інших методів.

<!--- TODO: specify code snippet id -->
``` cpp
template <class T, class T2> T ferma(const T &n, T2 unused) {
    T2 x = sq_root(n), y = 0, r = x * x - y * y - n;
    for (;;)
        if (r == 0)
            return x != y ? x - y : x + y;
        else if (r > 0) {
            r -= y + y + 1;
            ++y;
        } else {
            r += x + x + 1;
            ++x;
        }
}
```

## Тривіальний поділ

Цей простий метод буде корисним, щоб відразу обробляти числа з дуже малими дільниками.

<!--- TODO: specify code snippet id -->
``` cpp
template <class T, class T2> T2 prime_div_trivial(const T &n, T2 m) {
Спочатку перевіряємо тривіальні випадки
    if (n == 2 || n == 3)
        return 1;
    if (n < 2)
        return 0;
    if (even(n))
        return 2;

Генеруємо прості числа від 3 до m
    T2 pi;
    const vector<T2> &primes = get_primes(m, pi);

// ділимо на всі прості
    for (std::vector<T2>::const_iterator iter = primes.begin(), end = primes.end(); iter != end; ++iter) {
        const T2 &div = *iter;
        if (div * div > n)
            break;
        else if (n % div == 0)
            return div;
    }

    if (n < m * m)
        return 1;
    return 0;
}
```

## Збираємо все разом

Об'єднуємо всі методи в одну функцію.

Також функція використовує перевірку на простоту, інакше алгоритми розкладання на множники можуть працювати дуже довго. Наприклад, можна вибрати тест BPSW ([дивись статтю про BPSW](bpsw)).

<!--- TODO: specify code snippet id -->
``` cpp
template <class T, class T2> void factorize(const T &n, std::map<T, unsigned> &result, T2 unused) {
    if (n == 1)
        ;
    else
// Перевіряємо, чи не є це простим числом
        if (isprime(n))
            ++result[n];
        else
Якщо число достатньо мале, то його можна розкласти простим перебором
            if (n < 1000 * 1000) {
                T div = prime_div_trivial(n, 1000);
                ++result[div];
                factorize(n / div, result, unused);
            } else {
// Число велике, запускаємо на ньому алгоритми факторизації
                T div;
// спочатку йдуть швидкі алгоритми Полларда
                div = pollard_monte_carlo(n);
                if (div == 1)
                    div = pollard_rho(n);
                if (div == 1)
                    div = pollard_p_1(n);
                if (div == 1)
                    div = pollard_bent(n);
Доведеться запустити алгоритм Ферма з 100% точністю
                if (div == 1)
                    div = ferma(n, unused);
// Рекурсивно обробляємо знайдені множники
                factorize(div, result, unused);
                factorize(n / div, result, unused);
            }
}
```

## Приложение

Завантажити [5 КБ] код програми, яка використовує всі зазначені методи факторизації та тест BPSW на простоту, можна за посиланням factorization.zip.