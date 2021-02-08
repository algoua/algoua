# Центры тяжкості багатокутників і многогранников

**Центром тяжкості** (або **центром мас**) деякого тела називається точка, обладающая тим властивістю, що якщо подвесить тело за цю точку, то воно буде зберігати свое становище.

Нижче розглянуті двумерные і трёхмерные задачі, пов'язані з пошуком різних центрів мас - в основному з точки зору обчислювальної геометрії.

В рассмотренных нижче решениях можна виділити два основних **факту**. Перший - що центр мас системи матеріальних точок рівний середньому їх координат, взятих з коефіцієнтами, пропорциональными їх массам. Другий факт - що якщо ми знаємо центри мас двох що не перетинаються фігур, то центр мас їх про'єднання буде лежати на відрізку, соединяющем ці два центру, причому він буде ділити його в то ж відношенні, як маса другий фігури відноситься до массе першо].

## Двовимірний випадок: багатокутники

Насправді, кажучи про центре мас двумерной фігури, можна мати в увазі одну з трьох наступних **задач**:

* Центр мас системи точок - тобто вся маса сосредоточена тільки в вершинах багатокутника.
* Центр мас каркаса - тобто маса багатокутника сосредоточена на його периметре.
* Центр мас суцільний фігури - тобто маса багатокутника розподілена по всій його площі.

Кожна з цих задач має самостоятельное розв'язок, і буде розглянута нижче окремо.

### Центр мас системи точок

Це сама проста з трьох задач, і її розв'язок - відома физическая формула центру мас системи матеріальних точок:

$$ \vec{r_c} = \frac{ \sum\limits_i \vec{r_i} ~ m_i }{ \sum\limits_i m_i }, $$

де $m_i$ - маси точок, $\vec{r_i}$ - їх радіус-векторы (задающие їх становище щодо початку координат), і $\vec{r_c}$ - шуканий радіус-вектор центру мас.

В зокрема, якщо всі точки мають однакову массу, то координати центру мас є **середнє арифметичне** координат точок. Для **трикутника** ця точка називається **центроидом** і збігається з точкою перетину медіан:

$$ \vec{r_c} = \frac{ \vec{r_1} + \vec{r_2} + \vec{r_3} }{ 3 }. $$

Для **доведення** цих формул достатньо вспомнить, що равновесие досягається в такий точці $r_c$, в якій сума моментов всіх сил рівна нулю. В даному випадку це перетворюється в умова того, аби сума радіус-векторів всіх точок щодо точки $r_c$, домноженных на маси відповідних точок, равнялась нулю:

$$ \sum\limits_i \left( \vec{r_i} - \vec{r_c} \right) m_i = \vec{0}, $$

і, выражая звідси $\vec{r_c}$, ми і отримуємо необхідну формулу.

### Центр мас каркаса

Будемо вважати для простоти, що каркас однороден, тобто його плотность всюди одна і та ж.

Але тоді кожну сторону багатокутника можна замінити однієї точкою - серединою цього відрузку (т.до. центр мас однородного відрузку є середина цього відрузку), з массой, рівній довжині цього відрузку.

Тепер ми отримали задачу про системі матеріальних точок, і застосовуючи до ній розв'язок з попереднього пункту, ми знаходимо:

$$ \vec{r_c} = \frac{ \sum\limits_i \vec{r_i^\prime} ~ l_i }{ P }, $$

де $\vec{r_i^\prime}$ - точка-середина $i$-ой сторони багатокутника, $l_i$ - довжина $i$-ой сторони, $P$ - периметр, тобто сума довжин сторін.

Для **трикутника** можна показати випливає твердження: ця точка є **точкою перетину биссектрис** трикутника, образованного серединами сторін вихідного трикутника. (аби показати це, треба скористатися наведеної вище формулою, і потім замітити, що биссектрисы делят сторони отриманого трикутника в тих ж соотношениях, що і центри мас цих сторін).

### Центр мас суцільний фігури

Ми припустимо, що маса розподілена по фигуре однородно, тобто плотность в кожної точці фігури рівна одному і тому ж числу.

#### Випадок трикутника

Стверджується, що для трикутника відповіддю буде усе той ж **центроїд**, тобто точка, образованная середнім арифметическим координат вершин:

$$ \vec{r_c} = \frac{ \vec{r_1} + \vec{r_2} + \vec{r_3} }{ 3 }. $$

#### Випадок трикутника: доведення

Наведемо тут элементарное доведення, не использующее теорию интегралов. 

Першим подобное, чисто геометрическое, доведення привёл Архимед, але воно було вельми складним, з великим числом геометричних построений. Приведённое тут доведення взято з статті Apostol, Mnatsakanian "Finding Centroids the Easy Way".

Доведення зводиться до тому, аби показати, що центр мас трикутника лежить на однієї з медіан; повторяя цей процес ще двічі, ми тим самим покажемо, що центр мас лежить в точці перетину медіан, яка і є центроїд.

Розіб'Ємо даний трикутник $T$ на чотири, соединив середины сторін, як показано на рисунке:

\img{centroids_1.jpg}

Четыре одержані трикутника подібні трикутнику $T$ з коефіцієнтом $1/2$.

Треугольники №1 і №2 разом утворюють параллелограмм, центр мас якого $c_{12}$ лежить в точці перетину його діагоналей (оскільки це фігура, симетрична щодо обох діагоналей, а, значить, її центр мас обязан лежати на кожної з двох діагоналей). Крапка $c_{12}$ знаходиться посередині загальної сторони трикутників №1 і №2, а також лежить на медиане трикутника $T$:

\img{centroids_2.jpg}

Нехай тепер вектор $\vec{r}$ - вектор, проведений з вершини $A$ до центру мас $c_1$ трикутника №1, і нехай вектор $\vec{m}$ - вектор, проведений з $A$ до точці $c_{12}$ (яка, нагадаємо, є серединою сторони, на якій вона лежить):

\img{centroids_3.jpg}

Наша мета - показати, що вектора $\vec{r}$ і $\vec{m}$ коллинеарны.

Позначимо через $c_3$ і $c_4$ точки, являющиеся центрами мас трикутників №3 і №4. Значить, очевидно, центром мас сукупності цих двох трикутників буде точка $c_{34}$, являющаяся серединою відрузку $c_3 c_4$. Більш того, вектор від точки $c_{12}$ до точці $c_{34}$ збігається з вектором $\vec{r}$.

Искомый центр мас $c$ трикутника $T$ лежить посередині відрузку, соединяющего точки $c_{12}$ і $c_{34}$ (оскільки ми разбили трикутник $T$ на дві частини рівних площ: №1-№2 і №3-№4):

\img{centroids_4.jpg}

Таким чином, вектор від вершини $A$ до центроиду $c$ рівний $\vec{m} + \vec{r}/2$. З іншої сторони, т.до. трикутник №1 подобен трикутнику $T$ з коефіцієнтом $1/2$, то цей ж вектор рівний $2 \vec{r}$. Звідси отримуємо рівняння:

$$ \vec{m} + \vec{r}/2 = 2 \vec{r}, $$

звідки знаходимо:

$$ \vec{r} = \frac{2}{3} \vec{m}. $$

Таким чином, ми довели, що вектора $\vec{r}$ і $\vec{m}$ коллинеарны, що і означає, що шуканий центроїд $c$ лежить на медиане, исходящей з вершини $A$.

Більш того, попутно ми довели, що центроїд ділить кожну медиану в відношенні $2:1$, вважаючи від вершини.

#### Випадок багатокутника

Перейдемо тепер до загальному нагоди - тобто до нагоди **мноугоугольника**. Для нього такі міркування вже неприменимы, тому сведём задачу до трикутною: а саме, розіб'ємо багатокутник на трикутники (тобто триангулируем його), найдемо центр мас кожного трикутника, а потім найдемо центр мас одержані центрів мас трикутників.

Окончательная формула виходить наступного:

$$ \vec{r_c} = \frac{ \sum\limits_i \vec{r_i^\circ} ~ S_i }{ S }, $$

де $\vec{r_i^\circ}$ - центроїд $i$-го трикутника в тріангуляції заданого багатокутника, $S_i$ - площа $i$-го трикутника тріангуляції, $S$ - площа всього багатокутника.

Триангуляция выпуклого багатокутника - тривиальная задача: для цього, наприклад, можна взяти трикутники $(r_1,r_{i-1},r_i)$, де $i = 3 \ldots n$.

#### Випадок багатокутника: альтернативний спосіб

З іншої сторони, застосування наведеної формули не дуже зручно для **невыпуклых багатокутників**, оскільки провести їх триангуляцию - сама по собі непростая задача. Але для таких багатокутників можна придумати більш простий підхід. А саме, проведемо аналогію з тим, як можна шукати площа довільного багатокутника: вибирається довільна точка $z$, а потім суммируются знаковые площі трикутників, образованных цій точкою і точками багатокутника: $S = |\sum_{i=1}^n S_{z,p_i,p_{i+1}}|$. Аналогичный прийом можна застосувати і для пошуку центру мас: тільки тепер ми будемо суммировать центри мас трикутників $(z,p_i,p_{i+1})$, взятих з коефіцієнтами, пропорциональными їх площадям, тобто підсумкова формула для центру мас така:

$$ \vec{r_c} = \frac{ \sum\limits_i {\vec r}_{z,p_i,p_{i+1}}^\circ ~ S_{z,p_i,p_{i+1}} }{ S }, $$

де $z$ - довільна точка, $p_i$ - точки багатокутника, ${\vec r}_{z,p_i,p_{i+1}}^\circ$ - центроїд трикутника $(z,p_i,p_{i+1})$, $S_{z,p_i,p_{i+1}}$ - знаковая площа цього трикутника, $S$ - знаковая площа всього багатокутника (тобто $S = \sum_{i=1}^{n} S_{z,p_i,p_{i+1}}$).

## Трёхмерный випадок: многогранники

Аналогічно двовимірному нагоди, в 3D можна говорити зразу про чотирьох можливих постановках задачі:

* Центр мас системи точок - вершин багатогранника.
* Центр мас каркаса - ребер багатогранника.
* Центр мас поверхні - тобто маса розподілена по площі поверхні багатогранника.
* Центр мас сплошного багатогранника - тобто маса розподілена по всьому многограннику.

### Центр мас системи точок

Як і в двовимірному випадку, ми можемо застосувати физическую формулу і получити той ж самий результат:

$$ \vec{r_c} = \frac{ \sum\limits_i \vec{r_i} ~ m_i }{ \sum\limits_i m_i }, $$

який в випадку рівних мас перетворюється в середнє арифметичне координат всіх точок.

### Центр мас каркаса багатогранника

Аналогічно двовимірному нагоди, ми просто замінюємо кожне ребро багатогранника материальной точкою, расположенной посередині цього ребра, і з массой, рівній довжині цього ребра. Получив задачу про матеріальних точках, ми легко знаходимо її розв'язок як взвешенную суму координат цих точок.

### Центр мас поверхні багатогранника

Кожна грань поверхні багатогранника - двухмерная фігура, центр мас якій ми вміємо шукати. Найдя ці центри мас і замінивши кожну грань її центром мас, ми отримаємо задачу з материальными точками, яку вже легко розв'язати.

### Центр мас сплошного багатогранника

#### Випадок тетраедра

Як і в двовимірному випадку, вирішимо спочатку простейшую задачу - задачу для тетраедра.

Стверджується, що центр мас тетраедра збігається з точкою перетину його медіан (медианой тетраедра називається відрізок, проведений з його вершини в центр мас противоположной грані; таким чином, медиана тетраедра проходити через вершину і через точку перетину медіан трикутною грані).

Чому це так? Тут вірні міркування, аналогічні двовимірному нагоди: якщо ми рассечём тетраедр на два тетраедра з допомогою площині, що проходити через вершину тетраедра і яку-нибудь медиану противоположной грані, то обидва одержані тетраедра будуть мати одинаковый об'єм (т.до. треугольная грань разобьётся медианой на два трикутника рівній площі, а висота двох тетраэдров не зміниться). Повторюючи ці міркування декілька раз, отримуємо, що центр мас лежить на точці перетину медіан тетраедра.

Ця точка - точка перетину медіан тетраедра - називається його **центроидом**. Можна показати, що вона насправді має координати, рівні середньому арифметическому координат вершин тетраедра:

$$ \vec{r_c} = \frac{ \vec{r_1} + \vec{r_2} + \vec{r_3} + \vec{r_4} }{ 4 }. $$

(це можна вивести з того факту, що центроїд ділить медианы в відношенні $1:3$)

Таким чином, між случаями тетраедра і трикутника принципиальной разницы ні: точка, рівна середньому арифметическому вершин, є центром мас зразу в двох постановках задачі: і коли маси знаходиться тільки в вершинах, і коли маси распределены по всій площі/объёму. Насправді, цей результат узагальнюється на довільну размерность: центр мас довільного **симплекса** (simplex) є середнє арифметичне координат його вершин.

#### Випадок довільного багатогранника

Перейдемо тепер до загальному нагоди - нагоди довільного багатогранника.

Знову, як і в двовимірному випадку, ми виробляємо зведення цій задачі до вже решённой: розбиваємо многогранник на тетраэдры (тобто виробляємо його тетраэдризацию), знаходимо центр мас кожного з них, і отримуємо окончательный відповідь на задачу в вигляді взвешенной суми знайдених центрів мас.