# Теорема Пика. Нахождение площади решётчатого многоугольника

Многоугольник без самопересечений называется решётчатым, если все его вершины находятся в точках с целочисленными координатами (в декартовой системе координат).

## Теорема Пика

### Формула

Пусть дан некоторый решётчатый многоугольник, с ненулевой площадью.

Обозначим его площадь через $S$; количество точек с целочисленными координатами, лежащих строго внутри многоугольника - через $I$; количество точек с целочисленными координатами, лежащих на сторонах многоугольника - через $B$.

Тогда справедливо соотношение, называемое **формулой Пика**:

$$ S = I + \frac{B}{2} - 1. $$

В частности, если известны значения I и B для некоторого многоугольника, то его площадь можно посчитать за $O(1)$, даже не зная координат его вершин.

Это соотношение открыл и доказал австрийский математик Георг Александр Пик (Georg Alexander Pick) в 1899 г.

### Доказательство

Доказательство производится в несколько этапов: от самых простых фигур до произвольных многоугольников:

* Единичный квадрат. В самом деле, для него $S=1$, $I=0$, $B=4$, и формула верна.

* Произвольный невырожденный прямоугольник со сторонами, параллельными осям координат. Для доказательства формулы обозначим через $a$ и $b$ длины сторон прямоугольника. Тогда находим: $S = ab$, $I = (a-1)(b-1)$, $B = 2(a+b)$. Непосредственной подстановкой убеждаемся, что формула Пика верна.

* Прямоугольный треугольник с катетами, параллельными осям координат. Для доказательства заметим, что любой такой треугольник можно получить отсечением некоторого прямоугольника его диагональю. Обозначив через $c$ число целочисленных точек, лежащих на диагонали, можно показать, что формула Пика выполняется для такого треугольника, независимо от значения $c$.

* Произвольный треугольник. Заметим, что любой такой треугольник может быть превращён в прямоугольник приклеиванием к его сторонам прямоугольных треугольников с катетами, параллельными осям координат (при этом понадобится не более 3 таких треугольников). Отсюда можно получить корректность формулы Пика для любого треугольника.

* Произвольный многоугольник. Для доказательства триангулируем его, т.е. разобьём на треугольники с вершинами в целочисленных точках. Для одного треугольника формулу Пика мы уже доказали. Дальше, можно доказать, что при добавлении к произвольному многоугольнику любого треугольника формула Пика сохраняет свою корректность. Отсюда по индукции следует, что она верна для любого многоугольника.

## Обобщение на высшие размерности

К сожалению, эта столь простая и красивая формула Пика плохо обобщается на высшие размерности.

Наглядно показал это Рив (Reeve), предложив в 1957 г. рассмотреть тетраэдр (называемый теперь **тетраэдром Рива**) со следующими вершинами:

$$ A = (0,0,0), $$
$$ B = (1,0,0), $$
$$ C = (0,1,0), $$
$$ D = (1,1,k), $$

где $k$ - любое натуральное число. Тогда этот тетраэдр $ABCD$ при любых $k$ не содержит внутри ни одной точки с целочисленными координатами, а на его границе - лежат только четыре точки $A$, $B$, $C$, $D$ и никакие другие. Таким образом, объём и площадь поверхности этого тетраэдра могут быть разными, в то время как число точек внутри и на границе - неизменны; следовательно, формула Пика не допускает обобщений даже на трёхмерный случай.

Тем не менее, некоторое подобное обобщение на пространства большей размерности всё же имеется, - это **многочлены Эрхарта** (Ehrhart Polynomial), но они весьма сложны, и зависят не только от числа точек внутри и на границе фигуры.