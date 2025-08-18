const mongoose = require('mongoose');

module.exports.Gerund = mongoose.model('gerund', require('./CommonPatternOfModel'));
module.exports.Infinitive = mongoose.model('infinitive', require('./CommonPatternOfModel'));
module.exports.Phrase = mongoose.model('phrases', require('./CommonPatternOfModel'));
module.exports.Separable = mongoose.model('separable', require('./CommonPatternOfModel'));
module.exports.Stative = mongoose.model('stative', require('./CommonPatternOfModel'));
module.exports.Vocabulary = mongoose.model('vocabulary', require('./CommonPatternOfModel'));