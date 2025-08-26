const Phrase = require("../models/Models").Phrase;
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async function (req, res) {
  try {
    const list = await Phrase.find({ user: req.user.id });
    res.status(200).json(list);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  const list = req.body;
  if (list.length) {
    try {
      for (const item of list) {
        await new Phrase({
          name: item["name"],
          translation: item["translation"],
          user: req.user.id,
        }).save();
      }
      res.status(201).json({ message: "Список  фраз загружен" });
    } catch (e) {
      errorHandler(res, e);
    }
  } else {
    try {
      const { name, transcription, translation } = req.body;
      await new Phrase({
        name,
        transcription,
        translation,
        user: req.user.id,
      }).save();

      res.status(201).json({ message: "Слово додано" });
    } catch (e) {
      errorHandler(res, e);
    }
  }
};

module.exports.remove = async function (req, res) {
  if (req.query.id) {
    try {
      await Phrase.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json({
        message: "Фраза была удалена.",
      });
    } catch (e) {
      errorHandler(res, e);
    }
  } else {
    try {
      await Phrase.deleteMany({ user: req.user, removable: true });
      res.status(200).json({
        message: "Выбранные фразы из списка были удалены.",
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
      await Phrase.findOneAndUpdate(
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
    await Phrase.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
    );
    res.status(200).json({
      message: "Слово было оновлено",
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async function (req, res) {
  try {
    const verb = await Phrase.findById(req.params.id);
    res.status(200).json(verb);
  } catch (e) {
    errorHandler(res, e);
  }
};
