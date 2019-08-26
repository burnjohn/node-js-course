const setTimestamp = (schema) => {
  // Добавляем к схеме 2 поля
  schema.add({
    createdAt: Date,
    updatedAt: Date
  });

  // Создаем хук на pre-save
  schema.pre('save', function(next) {
    const now = Date.now();

    this.updatedAt = now;

    if (!this.createdAt) {
      this.createdAt = now
    }

    next()
  });
};

module.exports = setTimestamp;
