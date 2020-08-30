var express = require('express');
var multer  = require('multer')
var upload = multer()

var app = express();

var TelegramBot = require('node-telegram-bot-api');

app.post('/send', upload.single('image'),(req, res) => {
  const token = req.body.token;
  const chatId = req.body.chat;
  const text = req.body.text
  const image = req.file
  const bot = new TelegramBot(token, { polling: false });
  if (image) {
    bot.sendPhoto(chatId, image.buffer, {caption: text})
  } else if (text) {
    bot.sendMessage(chatId, text)
  }
  res.send('success')
})


app.listen(process.env.PORT || 3000)
