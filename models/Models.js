const mongoose = require("mongoose");

module.exports.Gerund = mongoose.model("gerund", require("./Item"));
module.exports.Infinitive = mongoose.model("infinitive", require("./Item"));
module.exports.Phrase = mongoose.model("phrases", require("./Item"));
module.exports.Separable = mongoose.model("separable", require("./Item"));
module.exports.Stative = mongoose.model("stative", require("./Item"));
module.exports.Vocabulary = mongoose.model("vocabulary", require("./Item"));
