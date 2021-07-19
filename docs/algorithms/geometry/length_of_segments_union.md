---
id: length_of_segments_union
title: Довжина об'єднання відрізків на прямій
description: Довжина о'бєднання відрізків на прямій
keywords:
  - Алгоритм
  - Геометрія
  - Довжина
---

Дано $n$ відрізків на прямій, тобто кожний відрізок задається парою координат ($x_1$, $x_2$). Розглянемо об'єднання цих відрізків і знайдемо його довжину.

Алгоритм був запропонований Клі (Klee) в 1977 році. Алгоритм працює за $O(n \cdot \log n)$. Було доведено, що цей алгоритм є найшвидший (асимптотично).

## Алгоритм

Покладемо всі координати кінців відрізків в масив $x[]$ і відсортуємо його по значенням координати. Додаткова умова при сортування - при рівності координат першими повинні йти ліві кінці. Крім того, для кожного елементу масиву будемо зберігати, чи відноситься він до лівого, чи до правому кінця відрузку. Тепер пройдемося по всьому масиву, маючи лічильник $c$ відрізків, що перетинаються. Якщо $c$ не рівний нулю, то до результату додаємо різницю $x_i - x_{i-1}$. Якщо поточний елемент відноситься до лівого кінця, то збільшуємо лічильник $c$, інакше зменшуємо його.

## Реалізація

<!--- segments_union_length -->
``` cpp
int segments_union_length(const vector<pair<int, int>>& a) {
    int n = a.size();
    vector<pair<int, bool>> x(n*2);
    for (int i = 0; i < n; i++) {
        x[i*2] = make_pair(a[i].first, false);
        x[i*2+1] = make_pair(a[i].second, true);
    }

    sort(x.begin(), x.end());

    int result = 0;
    int c = 0;
    for (int i = 0; i < n*2; i++) {
        if (c && i) {
            result += x[i].first - x[i-1].first;
        } 
        if (x[i].second) {
            ++c;
        } else {
            --c;
        }
    }
    return result;
}
```

## Застосування
TODO: add applications

## Задачі
TODO: add problems