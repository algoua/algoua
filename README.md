# Algoua

![deploy](https://github.com/algoua/algoua/workflows/deploy/badge.svg?branch=main)

Алгоритмічні навчальні матеріали.

Усі статті написані у форматі Markdown з використанням LaTeX та знаходяться у папці `docs`.

## Алгоритми
Збірка алгоритмічних статей.

Структура кожної статті:

* Опис алгоритму з поясненнями та можливими доведеннями.
* Реалізація (C++).
* Застосування.
* Задачі.

## Курси

TODO

## Література

TODO

## Тестовий сервер

1. Клонування репозиторію.

        git clone https://github.com/algoua/algoua.git

2. Встановлення [Node.js](https://nodejs.org/en/download/) та [Yarn](https://yarnpkg.com/en/).

3. Встановлення необхідних пакетів.

        yarn install

4. Запуск серверу. Він буде доступним за посиланням [http://localhost:3000](http://localhost:3000).

        yarn start

Пошук у тестовому сервері не працює і може видавати помилки.

## Внесення змін

Потрібно мати налаштований локальний тестовий сервер.

Пропонуйте зміни у вигляді `pull request` з вашого `fork` репозиторію. З інструкціями як створити `pull request` можна ознайомитися [тут](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

Markdown статті повинні бути відформатовані використовуючи soft-wrap, а не hard-wrap. Іншими словами немає обмеження на довжину рядків та не потрібно його вводити. GitHub підтримує soft-wrap, а для локального редагування використовуйте редактор, який теж його підтримує, наприклад, [VS Code](https://code.visualstudio.com/).

* Посилання на частини коду (напр. змінні) повинні оформлятись за допомогою штришків (напр. \`some_variable\`), а усе інше за домогою LaTeX.
* За межами секції *Реалізація* повинно не бути посилань на частини коду.

## Ліцензія

| Що  | Ліцензія |
| ------------- | ------------- |
| Коди алгоритмів  | ![Algo code license: MIT](https://img.shields.io/badge/License-MIT-green.svg)  |
| Усе інше  | [![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)  |

## Джерела

* [e-maxx](http://e-maxx.ru) (LICENSE - Public Domain).
  * На [Wiki](https://github.com/algoua/algoua/wiki/source_emaxx) відмічено статті, що були вже додані, та сирий переклад за допомогою [algoua/utils](https://github.com/algoua/utils).
* Різні матеріали з інтернету із сумісними ліцензіями, що не потребують згадування.
