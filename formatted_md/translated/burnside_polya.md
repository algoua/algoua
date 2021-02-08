# Лема Бернсайда. Теорема Пойа

## Лема Бернсайда

Ця лема була сформулирована і доведена **Бернсайдом** (Burnside) в 1897 р., однак було встановлено, що ця формула була раніше відкрита **Фробениусом** (Frobenius) в 1887 р., а ще раніше - **Коши** (Cauchy) в 1845 р. Тому ця формула іноді називається леммой Бернсайда, а іноді - теоремою Коши-Фробениуса.

Лема Бернсайда дозваляє порахувати кількість класів еквівалентності в деякому множині, грунтуючись на деякої його внутрішньої симетрії.

### Объекты і уявлення

Проведемо чёткую грань між кількістю об'єктів і кількістю уявлень.

Одним і тим ж объектам можуть відповідати різні уявлення, але, звісно, будь-яке уявлення відповідає рівне одному объекту. Отже, множину всіх уявлень розбивається на класи еквівалентності. Наша задача - в подсчёте саме числа об'єктів, або, що то ж саме, кількості класів еквівалентності.

### Приклад задачі: раскраска бінарних дерев

Припустимо, ми розглядаємо наступну задачу. Потрібно порахувати кількість способів раскрасить корневые бинарные дерева з $n$ вершинами в 2 кольори, якщо у кожної вершини ми не различаем правого і лівого сина.

Безліч об'єктів тут - це множину різних в цим понимании раскрасок дерев.

Визначимо тепер множину уявлень. Каждой раскраске поставимо в відповідність задающую її функцію $f(v)$, де $v = 1 \ldots n$, а $f(v)=0 \ldots 1$. Значить множину уявлень - це множину різних функцій такого увазі, і розмір його, очевидно, рівний $2^n$. В то ж час, на цим множині 
уявлень ми ввели розбиття на класи еквівалентності. 

Наприклад, нехай $n=3$, а дерево таке: корінь - вершина 1, а вершини 2 і 3 - її сини. Значить наступні функції $f_1$ і $f_2$ вважаються еквівалентними:

$$ \matrix{
f_1(1)=0 & f_2(1)=0 \cr
f_1(2)=1 & f_2(2)=0 \cr
f_1(3)=0 & f_2(3)=1 \cr
} $$

### Инвариантные перестановки

Чому ці дві функції $f_1$ і $f_2$ належать одному класу еквівалентності? Інтуїтивно це зрозуміло - тому що ми можемо переставить місцями синів вершини 1, тобто вершини 2 і 3, а після такого перетворення функції $f_1$ і $f_2$ совпадут. Але формально це означає, що знайдеться така **инвариантная перестановка** $\pi$ (тобто яка по умові задачі не змінює сам об'єкт, а тільки його уявлення), така, що:

$$ f_2 \pi \equiv f_1 $$

Отже, виходячи з умови задачі, ми можемо знайти всі інваріантні перестановки, тобто застосовуючи які ми не не переходимо з одного класу еквівалентності в іншої. Значить, аби перевірити, є або дві функції $f_1$ і $f_2$ еквівалентними (тобто відповідають або вони насправді одному объекту), треба для кожної инвариантной перестановки $\pi$ перевірити, не виконається або умова: $f_2 \pi \equiv f_1$ (або, що то ж саме, $f_1 \pi \equiv f_2$). Якщо хоча б для однієї перестановки обнаружилось це рівність, то $f_1$ і $f_2$ еквівалентні, інакше вони не еквівалентні.

Знаходження всіх таких інваріантних перестановок, щодо яких наша задача инвариантна - це ключевой крок для застосування як леми Бернсайда, так і теореми Пойа. Зрозуміло, що ці інваріантні перестановки залежать від конкретної задачі, і їх знаходження - процес чисто эвристический, заснований на интуитивных соображениях. Втім, в більшості випадків достатньо вручну знайти декілька "основних" перестановок, з яких всі інші перестановки можуть бути получены їх всевозможными произведениями (і цю, виключно механическую, частина роботи можна переложить на компьютер; більш детально це буде рассмотрено нижче на прикладі конкретної задачі).

Неважко зрозуміти, що інваріантні перестановки утворюють **групу** - оскільки добуток будь-яких інваріантних перестановок теж є инвариантной перестановкой. Позначимо **групу інваріантних перестановок** через $G$.

### Формулювання леми

Для формулировки залишилося напомнить одне поняття з алгебри. **Неподвижной точкою** $f$ для перестановки $\pi$ називається такий елемент, який инвариантен щодо цій перестановки: $f \equiv f \pi$. Наприклад, в нашому прикладі неподвижными точками будуть бути ті функції $f$, які відповідають раскраскам, не меняющимся при застосуванні до ним перестановки $\pi$ (не меняющимся саме в формальном сенсі рівності двох функцій). Позначимо через $I(\pi)$ **кількість нерухомих точок** для перестановки $\pi$.

Значить **лема Бернсайда** звучить наступним чином: кількість класів эквивалетности рівне сумі количеств нерухомих точок по всім перестановкам з групи $G$, поділеній на розмір цій групи:

$$ {\rm ClassesCount} = \frac{1}{|G|} \sum_{\pi \in G} I(\pi) $$

Хоча лема Бернсайда сама по собі не так удобна для застосування на практиці (поки непонятно, як швидко шукати величину $I(\pi)$), вона найбільш ясно раскрывает математическую суть, на якій заснована ідея підрахунку класів еквівалентності.

### Доведення леми Бернсайда

Описанное тут доведення леми Бернсайда не так важливо для її розуміння і застосування на практиці, тому його можна пропустити при першому чтении.

Приведённое тут доведення є самим простим з відомих і не використовує теорию груп. Це доведення було опубликовано Богартом (Bogart) і Кеннетом (Kenneth) в 1991 р.

Отже, нам потрібно довести випливає твердження:

$$ {\rm ClassesCount} |G| = \sum_{\pi \in G} I(\pi) $$

Величина, що стоїть справа - це не що інше, як кількість "інваріантних пар" $(f, \pi)$, тобто таких пар, що $f \pi \equiv f$. Очевидно, що в формулою ми маємо право змінити порядок підсумовування - зробити зовнішню суму по елементам f, а всередині її поставити величину $J(f)$ - кількість перестановок, щодо яких f инвариантна:

$$ {\rm ClassesCount} |G| = \sum_{f} J(f) $$

Для доведення цій формули составим таблицю, стовпці якій будуть подписаны усіма значеннями $f_i$, стрічки - усіма перестановками $\pi_j$, а в клетках таблиці будуть стояти твори $f_i \pi_j$. Значить, якщо ми будемо розглядати стовпці цій таблиці як множини, то деякі з них можуть совпасть, і це буде як означати, що відповідні цим стовпчиках $f$ також еквівалентні. Таким чином, кількість різних як множину стовпців рівне шуканої величині $\rm ClassesCount$. До Речі кажучи, з точки зору теорії груп стовпець таблиці, подписанный деяким елементом $f_i$ - це орбита цього елементу; для эквивалентных елементів, очевидно, орбиты збігаються, і число різних орбит дає саме $\rm ClassesCount$.

Отже, стовпці таблиці самі розпадаються на класи еквівалентності; зафіксуємо тепер який-або клас і розглянемо стовпці в ньому. По-перше, зауважимо, що в цих шпальтах можуть стояти тільки елементи $f_i$ одного класу еквівалентності (інакше вийшло б, що деяким еквівалентним перетворенням $\pi_j$ ми перейшли в іншої клас еквівалентності, що неможливо). По-друге, кожний елемент $f_i$ буде зустрічатися однакове число раз у всіх шпальтах (це також випливає з того, що стовпці відповідають еквівалентним елементам). Звідси можна зробити висновок, що всі стовпці всередині одного класу еквівалентності збігаються один з другом як мультимножества.

Тепер зафіксуємо довільний елемент $f$. З однієї сторони, він зустрічається в своєму стовпці рівне $J(f)$ раз (по самому визначенню $J(f)$). З іншої сторони, всі стовпці всередині одного класу еквівалентності однакові як мультимножества. Отже, всередині кожного стовпчика даного класу еквівалентності будь-якої елемент $g$ зустрічається рівне $J(g)$ раз.

Таким чином, якщо ми візьмемо довільним чином від кожного класу еквівалентності по одному колонки і підсумуємо кількість елементів в них, то отримаємо, з однієї сторони, ${\rm ClassesCount} |G|$ (це виходить, просто помноживши кількість стовпців на їх розмір), а з іншої сторони - суму величин $J(f)$ по всім $f$ (це випливає з всіх попередніх рассуждений):

$$ {\rm ClassesCount} |G| = \sum_{f} J(f) $$

що і потрібно довести.

## Теорема Пойа. Найпростіший різновид

Теорема **Пойа** (Polya) є обобщением леми Бернсайда, до тому ж предоставляющая більш удобный инструмент для знаходження кількості класів еквівалентності. Слід відзначити, що ще до Пойа ця теорема була відкрита і доведена Редфилдом (Redfield) в 1927 р., однак його публікація пройшла непоміченою математиками того часу. Пойа незалежно прийшов до тому ж результату лише в 1937 р., і його публікація була більш удачной.

Тут ми розглянемо формулу, получающуюся як приватний випадок теореми Пойа, і яку дуже зручно використовувати для обчислень на практиці. Загальна теорема Пойа в даній статті розглядатися не буде.

Позначимо через $C(\pi)$ кількість циклів в перестановки $\pi$. Значить виконується наступна формула (**приватний випадок теореми Пойа**):

$$ {\rm ClassesCount} = \frac{1}{|G|} \sum_{\pi \in G} k^{ C(\pi) } $$

де $k$ - кількість значень, які можливо приймати кожний елемент уявлення $f(v)$. Наприклад, в нашій задачі-прикладі (раскраска корневого бінарного дерева в 2 кольори) $k = 2$.

### Доведення

Ця формула є прямим следствием леми Бернсайда. Щоб получити її, нам треба просто знайти явне вираз для величини $I(\pi)$, фигурирующую в лемме (нагадаємо, це кількість нерухомих точок перестановки $\pi$).

Отже, розглянемо деяку перестановку $\pi$ і деякий елемент $f$. Під действием перестановки $\pi$ елементи $f$ передвигаются, як відомо, по циклам перестановки. Зауважимо, що так як в результаті має виходити $f \equiv f \pi$, то всередині кожного циклу перестановки повинні перебувати однакові елементи $f$. В то ж час, для різних циклів ніякий зв'язку між значеннями елементів не виникає. Таким чином, для кожного циклу перестановки $\pi$ ми вибираємо по одному значенням (серед $k$ варіантів), і тим самим ми отримаємо всі уявлення $f$, інваріантні щодо цій перестановки, тобто:

$$ I(\pi) = k ^ {C(\pi)} $$

де $C(\pi)$ - кількість циклів перестановки.

## Приклад задачі: Намиста

Задача "ожерелья" - це одна з класичних комбінаторних задач. Потрібно порахувати кількість різних намист з $n$ бусинок, кожна з яких можливо бути пофарбована в один з $k$ квітів. При порівняно двох намист їх можна повертати, але не перевертати (тобто дозволяється зробити циклічний зсув).

В цій задачі ми можемо зразу знайти групу інваріантних перестановок. Очевидно, вона буде складатися з $n$ перестановок:

$$ \pi_0 = 1\ 2\ 3\ \ldots\ n $$
$$ \pi_1 = 2\ 3\ \ldots\ n\ 1 $$
$$ \pi_2 = 3\ \ldots\ n\ 1\ 2 $$
$$ \ldots $$
$$ \pi_{n-1} = n\ 1\ 2\ \ldots\ (n-1) $$

Знайдемо явну формулу для обчислення $C(\pi_i)$. По-перше, зауважимо, що перестановки мають такий вид, що в $i$-ой перестановки на $j$-ой позиції варто $i+j$ (взятое за модулем $n$, якщо воно більше $n$). Якщо ми будемо розглядати циклическую структуру $i$-ой перестановки, то побачимо, що одиниця переходити в $1+i$, $1+i$ переходити в $1+2i$, $1+2i$ - в $1+3i$, і т.д., поки не прийдемо в число $1 + kn$; для інших елементів виконуються схожі затвердження. Звідси можна зрозуміти, що всі цикли мають однакову довжину, рівну ${\rm lcm}(i,n) / i$, тобто $n / {\rm gcd}(i,n)$ ("gcd" - найбільший загальний дільник, "lcm" - найменше загальне кратне). Значить кількість циклів в $i$-ой перестановки буде рівне просто ${\rm gcd}(i,n)$.

Підставляючи знайдені значення в теорему Пойа, отримуємо **розв'язок**:

$$ {\rm Ans} = \frac{1}{n} \sum_{i=1}^{n} k ^ {{\rm gcd}(i,n)} $$

Можна залишити формулу в такому вигляді, а можна її свернуть ще більше. Перейдемо від суми по всім $i$ до сумі тільки по дільникам $n$. Дійсно, в нашій сумі буде багато однакових доданків: якщо $i$ не є дільником $n$, то такий дільник знайдеться після обчислення ${\rm gcd}(i,n)$. Отже, для кожного подільника $d|n$ його доданок $k^{{\rm gcd}(d,n)} = k^d$ врахує декілька раз, тобто суму можна уявити в такому вигляді:

$$ {\rm Ans} = \frac{1}{n} \sum_{d|n} C_d k^d $$

де $C_d$ - це кількість таких чисел $i$, що ${\rm gcd}(i,n) = d$. Знайдемо явне вираз для цього кількості. Будь-яке таке число $i$ має вид: $i=dj$, де ${\rm gcd}(j,n/d) = 1$ (інакше було б ${\rm gcd}(i,n) > d$). Згадуючи [функцію Ейлера](euler_function), ми знаходимо, що кількість таких $j$ - це величина функції Ейлера $\phi(n/d)$. Таким чином, $C_d = \phi(n/d)$, і остаточно отримуємо **формулу**:

$$ {\rm Ans} = \frac{1}{n} \sum_{d|n} \phi \left( \frac{n}{d} \right) k^d $$

## Застосування леми Бернсайда совместно з программными вычислениями

Далеко не завжди вдається чисто аналитическим шляхом получити явну формулу для кількості класів еквівалентності. У багатьох завданнях кількість перестановок, що входять в групу, можливо бути занадто великим для ручных обчислень, і обчислити аналітично кількість циклів в них не представляється можливим.

В такому випадку випливає вручну знайти декілька "основних" перестановок, яких буде достатньо для порождения всій групи $G$. Далі можна написати програму, яка сгенерирует всі перестановки групи $G$, посчитает в кожної з них кількість циклів і подставит їх в формулу.

Розглянемо для прикладу **задачу про кількості раскрасок тора**. Є прямоугольный клетчатый лист бумаги $n \times m$ $(n < m)$, деякі з клітин покрашены в чорний колір. Потім з цього листа отримують цилиндр, склеивая дві сторони з длинами $m$. Потім з цилиндра отримують тор, склеивая дві кола (бази цилиндра) без перекручивания. Потрібно порахувати кількість різних торов (лист був спершу пофарбований довільно), вважаючи, що лінії склеивания неразличимы, а тор можна повертати і перевертати.

В даній задачі представлением можна вважати лист бумаги $n \times m$, деякі клітини якого покрашены в чорний колір. Неважко зрозуміти, що наступні виды перетворень сохраняют клас еквівалентності: циклічний зсув стрічок листа, циклічний зсув стовпців листа, поворот листа на 180 градусов; також інтуїтивно можна зрозуміти, що цих трьох видів перетворень достатньо для порождения всій групи інваріантних перетворень. Якщо ми яким-або чином занумеруем клітини поля, то ми можемо записати три перестановки $p_1$, $p_2$, $p_3$, відповідні цим видам перетворень. Далі залишається тільки сгенерировать всі перестановки, получающиеся як твори цій. Очевидно, що всі такі перестановки мають вид $p_1^{i_1} p_2^{i_2} p_3^{i_3}$, де $i_1 = 0 \ldots m-1$, $i_2 = 0 \ldots n-1$, $i_3 = 0 \ldots 1$.

Таким чином, ми можемо написати реалізацію розв'язку цій задачі:

<!--- TODO: specify code snippet id -->
``` cpp
void mult (vector<int> & a, const vector<int> & b) {
    vector<int> aa (a);
    for (size_t i=0; i<a.size(); ++i)
        a[i] = aa[b[i]];
}

int cnt_cycles (vector<int> a) {
    int res = 0;
    for (size_t i=0; i<a.size(); ++i)
        if (a[i] != -1) {
            ++res;
            for (size_t j=i; a[j]!=-1; ) {
                size_t nj = a[j];
                a[j] = -1;
                j = nj;
            }
        }
    return res;
}

int main() {
    int n, m;
    cin >> n >> m;

    vector<int> p (n*m),  p1 (n*m),  p2 (n*m),  p3 (n*m);
    for (int i=0; i<n*m; ++i) {
        p[i] = i;
        p1[i] = (i % n + 1) % n + i / n * n;
        p2[i] = (i / n + 1) % m * n + i % n;
        p3[i] = (m - 1 - i / n) * n + (n - 1 - i % n);
    }

    int sum = 0,  cnt = 0;
    set < vector<int> > s;
    for (int i1=0; i1<n; ++i1) {
        for (int i2=0; i2<m; ++i2) {
            for (int i3=0; i3<2; ++i3) {
                if (!s.count(p)) {
                    s.insert (p);
                    ++cnt;
                    sum += 1 << cnt_cycles(p);
                }
                mult (p, p3);
            }
            mult (p, p2);
        }
        mult (p, p1);
    }
    
    cout << sum / cnt;
}
```