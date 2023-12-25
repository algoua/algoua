# Algoua

![deploy](https://github.com/algoua/algoua/workflows/deploy/badge.svg?branch=main)

Алгоритмічні навчальні матеріали.

## Тестовий сервер

1. Встановлення [NVM](https://github.com/nvm-sh/nvm#installing-and-updating).

1. Встановлення Node.js, Yarn, та пакетів необхідних для серверу.

   ```shell
   nvm install 16
   npm install -g yarn
   yarn install
   ```

1. Запуск серверу.

   ```shell
   yarn start
   ```

Пошук у тестовому сервері не працює і може видавати помилки.

## Внесення змін

Усі статті знаходяться у папці `docs`.

Пропонуйте зміни у вигляді `pull request` з вашого `fork` репозиторію. З інструкціями як створити `pull request` можна ознайомитися [тут](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

Статті написані у форматі Markdown з використанням LaTeX.

Потрібно використовувти soft-wrap, а не hard-wrap. Іншими словами немає обмеження на довжину рядків та не потрібно його вводити. GitHub підтримує soft-wrap, а для локального редагування використовуйте редактор, який теж його підтримує, наприклад, [VS Code](https://code.visualstudio.com/).

### Структура статті

* Вступ

  Без розділу. Постановка задачі або математичне визначення, яке треба обчислити.

* Алгоритм

  Опис з поясненнями та можливими доведеннями.

* Реалізація

  C++ (обов'язково), Golang, Python.

  Лише у цьому розділі можуть бути посилання на частини коду (напр. змінні). Посилання повинні оформлятись за допомогою штришків (напр. \`some_variable\`), а усе інше за домогою LaTeX.

* Застосування

  Практичні приклади застосування алгоритму.

* Задачі

  Можливі посилання на розв'язки задач.

## Ліцензії

| Що  | Ліцензія |
| ------------- | ------------- |
| Коди алгоритмів у статтях  | [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)  |
| Усе інше | [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) |
