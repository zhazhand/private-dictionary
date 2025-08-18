const Word = require('../models/Models').Separable;
const errorHandler = require('../utils/errorHandler');


module.exports.getAll = async function (req, res) {
    try {
        const list = await Word.find();
        res.status(200).json(list)
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
                    translation: item['translation'],
                    user: req.user.id
                }).save();
            }
            res.status(201).json({message: 'Список загружен'})
        } catch (e) {
            errorHandler(res, e)
        }

    } else {
        try {
            const verb = await new Word({
                name: req.body.name,
                translation: req.body.translation,
                user: req.user.id
            }).save();

            res.status(201).json(verb)

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
        const verb = await Word.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(verb)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getById = async function (req, res) {
    try {
        const verb = await Word.findById(req.params.id);
        res.status(200).json(verb)
    } catch (e) {
        errorHandler(res, e)
    }
};