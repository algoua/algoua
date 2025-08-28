# Algoua

![Deployment Status](https://github.com/algoua/algoua/actions/workflows/deploy.yml/badge.svg?branch=main)

Навчальні матеріали з алгоритмів та структур даних.

## Тестовий сервер

1. Встановіть [NVM](https://github.com/nvm-sh/nvm#installing-and-updating).

1. Встановіть Node.js, Yarn та залежності:

  ```shell
  nvm install 16
  npm install -g yarn
  yarn install
  ```

1. Запустіть сервер:

  ```shell
  yarn start
  ```

Пошук на тестовому сервері може не працювати або видавати помилки.

## Внесення змін

Усі статті зберігаються в папці `docs` у форматі Markdown з підтримкою LaTeX. Використовуйте soft-wrap. GitHub і [VS Code](https://code.visualstudio.com/) це підтримують.

### Структура статті

* **Вступ**  
  Коротко опишіть задачу або математичне визначення. Без окремого розділу.

* **Алгоритм**  
  Поясніть ідею, наведіть доведення (за можливістю).

* **Реалізація**  
  Код на C++ (обов’язково), за бажанням — Go чи Python.  
  Посилання на частини коду оформлюйте як \`variable_name\`. Для формул використовуйте LaTeX.

* **Застосування**  
  Наведіть практичні приклади використання.

* **Задачі**  
  Додайте задачі та, за можливістю, посилання на розв’язки.

## Ліцензії

| Що  | Ліцензія |
| ------------- | ------------- |
| Коди алгоритмів у статтях  | [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)  |
| Усе інше | [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) |
