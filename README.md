## API для тестирования проектов на BlockLog

Отправлять POST запросы на URL:

```
http://localhost:5000/api/work
```

Тело POST запроса:

```
{
    testsArray (массив тестов),
    fileContent (содержимое проекта)
}
```

