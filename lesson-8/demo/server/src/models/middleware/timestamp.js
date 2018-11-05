const mongoose = require('mongoose');
const { Schema } = mongoose;

const setTimestamp = (schema) => {
  // Добавляем к схеме 2 поля
  schema.add({
    createdAt: {
      type: Schema.Types.Date
    },
    updatedAt: {
      type: Schema.Types.Date
    }
  });

  // Создаем хук на pre-save
  schema.pre('save', function(next) {
    const now = Date.now();

    this.updatedAt = now;

    if (!this.createdAt) {
      this.createdAt = now;
    }

    next();
  });
};

module.exports = setTimestamp;
