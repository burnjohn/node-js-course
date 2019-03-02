# Lesson 3. Express - фреймворк для веб приложений

- Начало работы с Express. 
- Сервер. Маршрутизация, статические файлы
- Обработка форм, POST, GET запросы
- JSON, АJAX
- Конвеер обработки и middleware


## Начало работы с Express

Express представляет собой популярный веб-фреймворк, написанный на JavaScript и работающий внутри среды исполнения node.js.

Он позволяет вам очень просто создать такие возможности в вашем проекте как:

- маршрутизация (роутинг)
- промежуточные обработчики (middleware)
- шаблонизация
- обработка ошибок
- дебаг (отладка)
- интеграция с базами данных

### Middleware (промежуточный обработчик)

Это функция которая имеет доступ к запросу (request) и ответу (response). 
Функция может делать любые действия и передавать их результат в response или в следующий middleware.

В экспрессе в middleware есть так же 3й аргумент `next`. Он позволяет перейти сразу к следующемо обработчику события.

Пример:
```
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};
```

**Для чего можно использовать Middleware:**
- логирование
- отлов ошибок
- преобразование данных с request
- проверка залогинен ли пользователь (аутентификация)


Вот так выглядит использование middleware в коде
```js
var express = require('express');
var app = express();

// создание middleware
var requestTime = function (req, res, next) {
  // Пример: добавляем время к запросу
  req.requestTime = Date.now();
  next();
};

// добавление middleware ко всем роутам
app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!';
  responseText += 'Requested at: ' + req.requestTime + '';
  res.send(responseText);
});

app.get('/subscribers/:id',
  // добавление middleware к определенному роуту
  function checkIfPaidSubscriber(req, res, next) {
    if(!req.user.hasPaid) {

      // continue handling this request
      next('route');
    }
  },
  function getPaidContent(req, res) {
    PaidContent.find(function(err, doc) {
      if(err) return next(err);
      res.json(doc);
    });
  });

app.listen(3000);
```

### Шаблонизация

С помощью Express можно сделать статический сайт, который будет перезагружатся после открытия каждой страницы. Либо же после каждого измненения (если на сайте будет что-то меняться). Как например этот сайт на php https://metanit.com/ 

Для того чтобы отображать в Express файлы шаблонов, необходимо задать следующие параметры приложения:

**views** -  каталог, в котором находятся файлы шаблонов. Например: app.set('views', './views')

**view engine** - используемый шаблонизатор. Например: app.set('view engine', 'pug')

Cначала нам нужно установить шаблонизатор. Например `pug` https://pugjs.org/api/getting-started.html

Следующим шагом создаем шаблон `index.pug` 

```
html
  head
    title= title
  body
    h1= message
```
`title` и `message` это переменные вместо которых можно что-то подставить

Затем создаем роут для вывода файла index.pug. Если свойство view engine не задано, необходимо указать расширение файла view. В противном случае, можно не указывать расширение.

```
app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
```

При выполнении запроса к домашней странице файл index.pug будет отображаться как HTML.

Статьи:
- http://expressjs.com/ru/guide/using-template-engines.html
- создание своего шаблонизатора http://expressjs.com/ru/advanced/developing-template-engines.html

### Обработка ошибок

Если в JS возникает ошибка что никак не обрабатывается то JS перестает выполнятся дальше. По этому особенно важно отлавливать ошибки в вашем бекенд приложении. Иначе он просто упадет. 

Такие функции реализуются с помощью `middleware`, но с указанием для функции обработки ошибок не трех, а четырех аргументов: (err, req, res, next). 

Пример:

```
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

Обработчик для обработки ошибок должен быть определен последним, после указания всех app.use() и вызовов роутов;

Пример:
```
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
```

Так же в Express предусмотрен встроенный обработчик ошибок, который обрабатывает любые возможные ошибки, встречающиеся в приложении. Этот стандартный обработчик ошибок добавляется в конец всех функций промежуточной обработки(middleware).



### Отладка (debug)

В Express используется внутренний модуль debug для регистрации информации о сопоставлениях маршрутов, используемых функциях промежуточной обработки, режиме приложения и выполнении цикла “запрос-ответ”.

При запуске команды вам в консоли выведутся все операции что были сделаны за определенные время.

Например 

```
const debug = require('debug')('http')
const http = require('http')
const name = 'My App';

debug('booting %o', name);
 
http.createServer(function(req, res){
  debug(req.method + ' ' + req.url);
  res.end('hello\n');
}).listen(3000, function(){
  debug('listening');
});
 
```
 
В консоли вы увидите

<img src="./img/1.png" />

Список всех операций и сколько времени заняла каждая их них.

Более детально:
- https://expressjs.com/ru/guide/debugging.html
- https://www.npmjs.com/package/debug

### Задание:

1. Перенести все запросы что сделали до этого на Express
   - GET `/products/:id` - получение товара 
       - получаем `id` параметр с запроса
       - находим товар в `<all-products.json>`
       - отправляем json с товаром 
       - если товара нет отправляем json с {'status': 'no products', 'products': []}
       
   - GET `/products/?ids='<id>, <id>,<id>'` - получение нескольких товаров 
       - получаем `id`шки с запроса
       - находим товары в `<all-products.json>`
       - отправляем json с товарами 
       - если товара нет отправляем json с {'status': 'no products', 'products': []}
       
   - POST `/users` - создание юзера 
       - получаем json с юзером
       - добавляем к нему уникальный `id`
       - сохраняем юзера в `<all-users.json>`
       - отправляем json с юзером и полем `success`
      ```
      {
        "status": "success", 
        "user": <user>
      }
      ```
    - GET `/users/:id` - получение юзера 
      - получаем `id` параметр с запроса
      - находим юзера в `<all-users.json>`
      - отправляем json с юзером 
      - если юзером нет отправляем json с {'status': 'not found'}
      
             
   #### Новый функцинал
       
   - POST `/orders/` - создание заказа 
       - в `body` шлем параметры заказа
     ```
      {
       "user": <userId>, 
       "products": [<productId1>, <productId2>, <productId2>]
       "deliveryType": "delivery"
       "deliveryAdress": "<deliveryAdressText>"
      }
      ```
       - находим товары в `<all-products.json>`
       - создаем в папке с юзером папку `orders`
       - создаем в `orders` новый json с тем что пришло нам из запроса
       - отправляем json с готовым заказом
     ```
      {
       "status": "success", 
       "order": {
         "id": <orderId>,
         "user": <userId>, 
         "products": [<productId1>, <productId2>, <productId2>]
         "deliveryType": "delivery"
         "deliveryAdress": "<deliveryAdressText>"
        }
      }
      ```
       - если товара нет отправляем json с {'status': 'failed', 'order': null}

  #### Доп задание
          
   - Реализовать `multipart-data` запрос c отправлением картинки и данных юзера
        - POST `/images` - создание картинки
        - в теле запроса должна быть картинка и `id` товара которому нужно добавить эту картинку
        - похожая реализация есть в `demo/routes/image/save-image-multipart`  
        - для копирования картинки из папки в папку использовать `stream` (поток) 
        
        **Как выглядит запрос из postman**
        
        <img src="./img/3.png" />
        <img src="./img/4.png" />
        
        - в ответе должен приходить адрес новой картинки

   


