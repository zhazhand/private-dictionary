const Word = require("../models/Models").Vocabulary;
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function (req, res) {
  try {
    const word = await Word.find({
      user: req.user.id,
    });
    res.status(200).json(word);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  const list = req.body;
  if (list.length) {
    try {
      for (const item of list) {
        await new Word({
          name: item["name"],
          transcription: item["transcription"],
          translation: item["translation"],
          user: req.user.id,
        }).save();
      }
      res.status(201).json({ message: "Список загружен" });
    } catch (e) {
      errorHandler(res, e);
    }
  } else {
    try {
      const word = await new Word({
        name: req.body.name,
        transcription: req.body.transcription,
        translation: req.body.translation,
        user: req.user.id,
      }).save();

      res.status(201).json(word);
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

module.exports.remove = async function (req, res) {
  if (req.query.id) {
    try {
      await Word.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json({
        message: "Слово было удалена.",
      });
    } catch (e) {
      errorHandler(res, e);
    }
  } else {
    try {
      await Word.deleteMany({ user: req.user, removable: true });
      res.status(200).json({
        message: "Выбранные слова из списка были удалены.",
      });
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

module.exports.updateGroupe = async function (req, res) {
  const list = req.body;
  try {
    for (const item of list) {
      await Word.findOneAndUpdate(
        { _id: item.id },
        { $set: item },
        { new: true },
      );
    }
    res.status(200).json({ message: "DONE" });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async function (req, res) {
  try {
    const word = await Word.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(word);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async function (req, res) {
  try {
    const word = await Word.findById(req.params.id);
    res.status(200).json(word);
  } catch (e) {
    errorHandler(res, e);
  }
};
