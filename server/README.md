# Документация по установке и запуску проекта

## Установка

- Установите PostgreSQL версии 17+

- Установите PostGIS
  > Если PostgreSQL еще не был установлен на вашем компьютере, то PostGIS можно установить вместе сним, используя **stackBuilder**
  - Создайте новую базу данных, например "test_database"
  - Подключитесь к БД через CLI, либо любым другим удобным для вас способом
  ```sh
  psql -U postgres -d test_database -p 5432 
  ``` 
  - После подключения к базе добавьте плагин PostGIS
  ```sql
  CREATE EXTENSION postgis;
  ```
 
- Установите Node.js версии 23.5.0 и npm 10.9.2

- Установите необходимые npm-зависимости из файла package.json
  ```sh
  npm i
  ```
- Создайте файл .env по аналогии с .env.example

## Запуск

- Запустите приложение с помощью команды

  ```sh
  npm start
  ```

## Тестирование

- Запустите тесты с помощью команды

  ```sh
  npm test
  ```

- Маршруты для проверки программы
  ```http
  @base=http://localhost:5000

  // Получение всех геообъектов
  GET {{base}}/api/geoobjects

  // Получение всех геообъектов с фильтрацией по типу
  GET {{base}}/api/geoobjects?type={type}

  // Создание нового геообъекта. Принимает JSON с данными объекта
  POST {{base}}/api/geoobjects             
  Content-Type: application/json

  {
    "name": "string",
    "longitude": "number",
    "latitude": "number",
    "type": "string"
  }

  // Обновление информации о геообъекте по ID
  PUT {{base}}/api/geoobjects/{id}
  Content-Type: application/json

  {
    "name": "string",
    "longitude": "number",
    "latitude": "number",
    "type": "string"
  }

  // Удаление геообъекта по ID
  DELETE {{base}}/api/geoobjects/{id}
  ```