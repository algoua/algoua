# Алгоритми

Збірка алгоритмічних статей по-українськи.

Структура кожної статті:

* Опис алгоритму з поясненнями та можливими доведеннями.
* Реалізація (C++).
* Застосування.
* Задачі.

Статті написані у форматі Markdown з використанням MathJax та знаходяться у
папці `src`.

## Тестовий сервер

1. Клонування репозиторію із GitHub.

        $ git clone https://github.com/algoua/algorithms.git

1. Встановлення необхідних пакетів Python 3, які зазначено у файлі
   `requirements.txt`. На даному етапі потрібно мати програми Python 3 та pip
   (рекомендується для цього завантажити
   [Miniconda](https://docs.conda.io/en/latest/miniconda.html)).

        $ pip install -r requirements.txt

1. Запуск серверу. Він буде доступним за посиланням
   [http://localhost:8080](http://localhost:8080). За бажанням можна змінити
   порт використовуючи параметр `--port`.

        $ python app.py

## Внесення змін

Потрібно мати налаштований локальний тестовий сервер.

Будь ласка, пропонуйте зміни (виправлення помилок, нова стаття, тощо) у вигляді
`pull request`. З інструкціями як створити `pull request` із своїми змінами
можна почитати
[тут](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork).

Файли із статтями повинні бути відформатовані так, щоб довжина рядків не
перевищувала 80 символів за винятком довгих стрічок без пробілів, наприклад,
посилання. Для цьго можна скористатись розширенням
[ReWrap](https://marketplace.visualstudio.com/items?itemName=stkb.rewrap) у
Visual Studio Code.

## Джерела

1. [e-maxx](http://e-maxx.ru) (LICENSE - Public Domain).
