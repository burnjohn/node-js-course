var express = require('express');

var app = express();

// добавление middleware ко всем роутам
app.use(requestTime);


app.post('/', function (req, res) {
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