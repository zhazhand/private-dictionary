const Word = require("../models/Models").Infinitive;
const errorHandler = require("../utils/errorHandler");
const message = require("../utils/messages");

module.exports.getAll = async function (req, res) {
  try {
    const list = await Word.find({ user: req.user.id });
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
        await new Word({
          name: item["name"],
          transcription: item["transcription"],
          translation: item["translation"],
          user: req.user.id,
        }).save();
      }
      res.status(201).json({ message: message.success.list.created });
    } catch (e) {
      errorHandler(res, e);
    }
  } else {
    try {
      const { name, transcription, translation } = req.body;
      await new Word({
        name,
        transcription,
        translation,
        user: req.user.id,
      }).save();

      res.status(201).json({ message: message.success.word.created });
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
        message: message.success.word.deleted,
      });
    } catch (e) {
      errorHandler(res, e);
    }
  } else {
    try {
      await Word.deleteMany({ user: req.user, removable: true });
      res.status(200).json({
        message: message.success.list.deleted,
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
    res.status(200).json({ message: message.success.ok });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async function (req, res) {
  try {
    await Word.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true },
    );
    res.status(200).json({
      message: message.success.word.updated,
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async function (req, res) {
  try {
    const verb = await Word.findById(req.params.id);
    res.status(200).json(verb);
  } catch (e) {
    errorHandler(res, e);
  }
};
