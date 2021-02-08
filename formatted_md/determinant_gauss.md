<h2>Вычисление определителя матрицы методом Гаусса
Пусть дана квадратная матрица A размером NxN. Требуется вычислить её определитель.

## Алгоритм

Воспользуемся идеями [метода Гаусса решения систем линейных уравнений](linear_systems_gauss).

Будем выполнять те же самые действия, что и при решении системы линейных уравнений, исключив только деление текущей строки на a[i][i] (точнее, само деление можно выполнять, но подразумевая, что число выносится за знак определителя). Тогда все операции, которые мы будем производить с матрицей, не будут изменять величину определителя матрицы, за исключением, быть может, знака (мы только обмениваем местами две строки, что меняет знак на противоположный, или прибавляем одну строку к другой, что не меняет величину определителя).

Но матрица, к которой мы приходим после выполнения алгоритма Гаусса, является диагональной, и определитель её равен произведению элементов, стоящих на диагонали. Знак, как уже говорилось, будет определяться количеством обменов строк (если их нечётное, то знак определителя следует изменить на противоположный). Таким образом, мы можем с помощью алгоритма Гаусса вычислять определитель матрицы за O (N<sup>3</sup>).

Осталось только заметить, что если в какой-то момент мы не найдём в текущем столбце ненулевого элемента, то алгоритм следует остановить и вернуть 0.

## Реализация

<!--- TODO: specify code snippet id -->
``` cpp
const double EPS = 1E-9;
int n;
vector < vector<double> > a (n, vector<double> (n));
... чтение n и a ...

double det = 1;
for (int i=0; i<n; ++i) {
    int k = i;
    for (int j=i+1; j<n; ++j)
        if (abs (a[j][i]) > abs (a[k][i]))
            k = j;
    if (abs (a[k][i]) < EPS) {
        det = 0;
        break;
    }
    swap (a[i], a[k]);
    if (i != k)
        det = -det;
    det *= a[i][i];
    for (int j=i+1; j<n; ++j)
        a[i][j] /= a[i][i];
    for (int j=0; j<n; ++j)
        if (j != i && abs (a[j][i]) > EPS)
            for (int k=i+1; k<n; ++k)
                a[j][k] -= a[i][k] * a[j][i];
}

cout << det;
```