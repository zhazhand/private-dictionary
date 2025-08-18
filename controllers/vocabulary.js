const Word = require('../models/Models').Vocabulary;
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
    try {
        const word = await Word.find({
            user: req.user.id
        });
        res.status(200).json(word);
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.create = async function (req, res) {
    const list = req.body;
    if (list.length) {
        try {
            for (const item of list) {

                await new Word({
                    name: item['name'],
                    transcription: item['transcription'],
                    translation: item['translation'],
                    user: req.user.id
                }).save();

            }
            res.status(201).json({message:'Список загружен'})
        } catch (e) {
            errorHandler(res, e)
        }

    } else {
        try {
            const word = await new Word({
                name: req.body.name,
                transcription: req.body.transcription,
                translation: req.body.translation,
                user: req.user.id
            }).save();

            res.status(201).json(word)

        } catch (e) {
            errorHandler(res, e)
        }
    }
};

module.exports.remove = async function (req, res) {
    if (req.params.id === '5delete0all0list00000000') {
        try {
            await Word.find({user: req.user.id}).remove();
            res.status(200).json({
                message: 'Список был удален.'
            })
        } catch (e) {
            errorHandler(res, e)
        }
    } else if (req.params.id === '5delete0all0list0select0') {
        try {
            await Word.find({user: req.user.id, removable: true}).remove();
            res.status(200).json({
                message: 'Выбранные слова из списка были удалены.'
            })
        } catch (e) {
            errorHandler(res, e)
        }
    } else {
        try {
            await Word.remove({_id: req.params.id});
            res.status(200).json({
                message: 'Слово было удалено.'
            })
        } catch (e) {
            errorHandler(res, e)
        }
    }
};


module.exports.update = async function (req, res) {
    try {
        const word = await Word.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(word)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getById = async function (req, res) {
    try {
        const word = await Word.findById(req.params.id);
        res.status(200).json(word)
    } catch (e) {
        errorHandler(res, e)
    }
};