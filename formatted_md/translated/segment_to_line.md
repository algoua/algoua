# Знаходження рівняння прямої для відрузку

Задача - по заданим координатам кінця відрузку побудувати пряму, що проходить через нього.

Ми припустимо, що відрізок невырожден, тобто має довжину більше нуля (інакше, зрозуміло, через нього проходити нескінченно багато різних прямих).

## Двовимірний випадок

Нехай дано відрізок $PQ$, тобто відомі координати його кінців $P_x$, $P_y$, $Q_x$, $Q_y$.

Потрібно побудувати **рівняння прямої на площині**, що проходити через цей відрізок, тобто знайти коефіцієнти $A$, $B$, $C$ в рівнянні прямої:

$$ A x + B y + C = 0. $$

Зауважимо, що искомых трійок $(A,B,C)$, проходять через завдань відрізок, **нескінченно багато**: можна помножити всі три коефіцієнта на довільне ненульове число і получити ту ж саму пряму. Отже, наша задача - знайти одну з таких трійок.

Неважко переконатися (підстановкою цих виразів і координат точок $P$ і $Q$ в рівняння прямої), що підходить наступного набір коефіцієнтів:

$$ A = P_y - Q_y, $$
$$ B = Q_x - P_x, $$
$$ C = - A P_x - B P_y. $$

### Целочисленный випадок

Важным преимуществом такого способу побудови прямої є то, що якщо координати кінців були цілочисельними, то і отримані коефіцієнти також будуть **цілочисельними**. В деяких випадках це дозваляє виробляти геометрические операції, взагалі не прибегая до вещественным числах.

Однак є і невеликий недолік: для однієї і тією ж прямої можуть виходити різні трійки коефіцієнтів. Щоб уникнути цього, але не уходить від цілочисельних коефіцієнтів, можна застосувати наступного прийом, часто званий **нормированием**. Знайдемо [найбільший загальний дільник](euclid_algorithm) чисел $|A|$, $|B|$, $|C|$, поделим на нього всі три коефіцієнта, а потім зробимо нормування знака: якщо $A<0$ або $A=0, B<0$, то помножимо всі три коефіцієнта на $-1$. В результаті ми прийдемо до тому, що для однакових прямих будуть виходити однакові трійки коефіцієнтів, що дозволить легко перевіряти прямі на рівність.

### Вещественнозначный випадок

При роботі з вещественными числами випливає завжди пам'ятати про погрешностях.

Коэффициенты $A$ і $B$ виходять у нас порядку вихідних координат, коефіцієнт $C$ - вже порядку квадрата від них. Це вже можливо бути достатньо великими числами, а, наприклад, при [пересечении прямих](lines_intersection) вони стануть ще більше, що можливо привести до великим ошибкам округления вже при вихідних координатах порядку $10^3$.

Тому при роботі з вещественными числами бажано виробляти так звану **нормування** прямої: а саме, робити коефіцієнти такими, аби $A^2 + B^2 = 1$. Для цього треба обчислити число $Z$:

$$ Z = \sqrt{ A^2 + B^2 }, $$

і розділити всі три коефіцієнта $A$, $B$, $C$ на нього.

Тим самим, порядок коефіцієнтів $A$ і $B$ вже не буде залежати від порядку вхідних координат, а коефіцієнт $C$ буде того ж порядку, що і вхідні координати. На практиці це призводить до значительному улучшению точності обчислень.

Нарешті, упомянем про **порівняно** прямих - адже після такий нормировки для однієї і тією ж прямої можуть виходити тільки дві трійки коефіцієнтів: з точністю до множення на $-1$. Відповідно, якщо ми зробимо додаткову нормування з урахуванням знака (якщо $A<-\varepsilon$ або $|A|<\varepsilon, B<-\varepsilon$, то умножать на $-1$), то получающиеся коефіцієнти будуть уникальными.

## Трёхмерный і багатовимірний випадок

Уже в трёхмерном випадку **ні простого рівняння**, описывающего пряму (її можна задати як перетин двох плоскостей, тобто систему двох рівнянь, але це неудобный спосіб).

Отже, в трёхмерном і многомерном випадках ми повинні користуватися **параметрическим способом завдання прямої**, тобто в вигляді точки $p$ і вектора $v$:

$$ p + v t, ~~~ t \in \cal{R}. $$

тобто. пряма - це всі точки, які можна получити з точки $p$ додатком вектора $v$ з довільним коефіцієнтом.

**Побудова** прямої в параметрическом вигляді по координатам кінців відрузку - тривіально, ми просто беремо один кінець відрузку за точку $p$, а вектор з першого до іншого кінця - за вектор $v$.