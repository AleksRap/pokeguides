#PokeGuides 

Адаптивное приложение для просмотра информации о покемонах, с использованием **PokeApi**

Функционал:
- Получение списка покемонов с пагинацией. По дефолту установлен вывод до 30 карточек на страницу
- Возможно сразу перейти на страницу покемона с нужным id (путь: `/pokemon/1`, где 1 это id покемона)
- Поиск покемона на конкретной странице `глобальный поиск реализовать нельзя по причине его отсутствия в api` (в обсуждении на официальном github проекта предлагают выгружать весь список и фильтровать на фронте - https://github.com/PokeAPI/pokeapi/issues/383, но не считаю это рациональным)
- Просмотр детальной информации о конкретном покемоне
