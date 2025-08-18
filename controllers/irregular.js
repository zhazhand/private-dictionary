const IrgVerb = require('../models/Irregular');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req, res) {
    try {
        const verbs = await IrgVerb.find({
            user: req.user.id
        });
        res.status(200).json(verbs)
    } catch (e) {
        errorHandler(res, e)
    }
};


module.exports.create = async function (req, res) {
    const list = req.body;
    if (list.length) {
        try {
            for (const item of list) {

                await new IrgVerb({
                    firstForm: item['firstForm'],
                    firstFormTranscription: item['firstFormTranscription'],
                    secondForm: item['secondForm'],
                    secondFormTranscription: item['secondFormTranscription'],
                    thirdForm: item['thirdForm'],
                    thirdFormTranscription: item['thirdFormTranscription'],
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
            const verb = await new IrgVerb({
                firstForm: req.body.firstForm,
                firstFormTranscription: req.body.firstFormTranscription,
                secondForm: req.body.secondForm,
                secondFormTranscription: req.body.secondFormTranscription,
                thirdForm: req.body.thirdForm,
                thirdFormTranscription: req.body.thirdFormTranscription,
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
            await IrgVerb.find({user: req.user.id}).remove();
            res.status(200).json({
                message: 'Список был удален.'
            })
        } catch (e) {
            errorHandler(res, e)
        }
    } else if (req.params.id === '5delete0all0list0select0') {
        try {
            await IrgVerb.find({user: req.user.id, removable: true}).remove();
            res.status(200).json({
                message: 'Выбранные слова из списка были удалены.'
            })
        } catch (e) {
            errorHandler(res, e)
        }
    } else {
        try {
            await IrgVerb.remove({_id: req.params.id});
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
        const verb = await IrgVerb.findOneAndUpdate(
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
        const verb = await IrgVerb.findById(req.params.id);
        res.status(200).json(verb)
    } catch (e) {
        errorHandler(res, e)
    }
};