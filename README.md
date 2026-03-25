# Название проекта - Books API
REST API для управления библиотечным каталогом книг с JWT‑авторизацией.

# Описание предметной области
Разрабатываемое приложение представляет собой backend‑сервис для учёта книг в библиотеке.  
Система позволяет:
- создавать книги
- просматривать список книг
- получать информацию о конкретной книге
- редактировать (полностью или частично) данные книги
- удалять книги
- управлять статусом доступности книги
Реализована система авторизации пользователей с использованием JWT‑токенов, обеспечивающая защиту API.  
Все маршруты, связанные с книгами, доступны только авторизованным пользователям.

# Стек технологий
Node.js – серверная среда выполнения JavaScript.
Express –фреймворк для маршрутизации и обработки HTTP-запросов.
PostgreSQL 17 – реляционная база данных для хранения данных.
Prisma ORM – инструмент для работы с БД.
JWT (jsonwebtoken) – создание и проверка токенов аутентификации.
bcrypt – безопасное хеширование паролей.

# Как запустить проект
1. Клонирование репозитория
git clone https://github.com/Shukrona-04/book-api.git
cd book-api
2. Установка зависимостей
npm install
3. Создание файла .env (заполните своими данными)
cp .env.example .env   # если есть .env.example, иначе создайте вручную
4. Отредактируйте .env: укажите параметры подключения к БД, JWT_SECRET, PORT
Создание таблиц в базе данных. Выполните SQL-скрипт из README (см. раздел "Структура проекта" или используйте DBeaver)
5. Создание тестового пользователя
node seed.js
6. Запуск сервера
node server.js

Описание маршрутов API
Авторизация
POST	/auth/login	Вход пользователя, возвращает JWT‑токен
POST	/auth/logout	Выход (удаление токена на клиенте)

Книги (требуется Bearer‑токен)
GET	/books	Получить список всех книг
GET	/books/:id	Получить книгу по идентификатору
POST	/books	Создать новую книгу
PUT	/books/:id	Полностью обновить книгу
PATCH	/books/:id	Частично обновить книгу
DELETE	/books/:id	Удалить книгу

Примеры запросов
Вход в систему
POST /auth/login
{
  "username": "student",
  "password": "password123"
}

Создание книги
POST /books

{
  "title": "Война и мир",
  "author": "Лев Толстой",
  "genre": "Роман",
  "year": 1869,
  "available": true
}

Частичное обновление
PATCH /books/1
{
  "available": false
}

Примеры ответов 
{
  "id": 1,
  "title": "Война и мир",
  "author": "Лев Толстой",
  "genre": "Роман",
  "year": 1869,
  "available": true
}

Примеры ошибок
400	Некорректный JSON	{"status":"error","statusCode":400,"message":"Invalid JSON format"}
401	Неавторизован	{"status":"error","statusCode":401,"message":"No token provided"}
404	Ресурс не найден	{"status":"error","statusCode":404,"message":"Book not found"}
405	Метод не поддерживается	{"status":"error","statusCode":405,"message":"Method POST not allowed on this resource"}
422	Ошибка валидации	{"status":"error","statusCode":422,"message":"title is required, year must be greater than or equal to 1450"}
500	Внутренняя ошибка сервера	{"status":"error","statusCode":500,"message":"Something went wrong"}

Структура проекта
text
book-api/
├── .env                      # переменные окружения
├── .gitignore
├── package.json
├── server.js                 # точка входа
├── seed.js                   # создание тестового пользователя
├── config/
│   └── db.js                 # подключение к PostgreSQL
├── models/
│   ├── index.js              # инициализация Sequelize
│   ├── Book.js               # модель книги
│   └── User.js               # модель пользователя
├── controllers/
│   ├── authController.js     # логика входа/выхода
│   └── bookController.js     # CRUD для книг
├── middleware/
│   ├── authMiddleware.js     # проверка JWT-токена
│   └── errorHandler.js       # глобальный обработчик ошибок
├── routes/
│   ├── authRoutes.js         # маршруты /auth
│   └── bookRoutes.js         # маршруты /books (с 405)
├── validators/
│   └── bookValidator.js      # Joi-схемы валидации
└── utils/
    └── ApiError.js           # класс для ошибок API