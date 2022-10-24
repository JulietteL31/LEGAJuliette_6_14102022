/*CONSTANTES*/
const Sauce = require('../models/sauce');
const fs = require('fs');
// const user = require('../models/user');



/*LOGIQUE METIER*/

/*Route post*/
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0   
    });
    sauce.save()
    .then(() => res.status(201).json({message:'Sauce enregistrée avec succès !'}))
    .catch(error => res.status(400).json({error}));
};


/*Route put*/
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {...req.body};
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
        if(sauce.userId != req.auth.userId) {
            res.status(403).json({message: 'Requête non autorisée!'})
        } else {
            Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
            .catch(error => res.status(401).json({error}));
        }
    })
    .catch(error => res.status(400).json({error}));
};


/*Route delete*/
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        if(sauce.userId != req.auth.userId) {
            res.status(403).json({message: 'Requête non autorisée !'})
        } else {
            const filename = sauce.imageUrl.splait('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({_id: req.params.id})
                .then(() => res.status(200).json({message: 'Sauce supprimée avec succès !'}))
                .catch(error => res.status(401).json({error}));
            });
        };
    })
    .catch(error => res.status(500).json({error}));
};


/*Routes get*/
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(400).json({ error }));
};


/*Route like*/
exports.likeSauce = (req, res, next) => {

    /*Trouver les params de la sauce avec son id*/
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        const usersLikes = [sauce.usersLikes];
        const usersDislikes = [sauce.usersDislikes];
        const likesNumber = sauce.likes;
        const dislikesNumber = sauce.dislikes;
        const userId = req.auth.userId;

        // const like = req.body.like;

        /*Chercher dans les paramètres usersLikes et usersDislikes l'userId de l'utilisateur*/
        const like = usersLikes.indexOf(userId);
        const dislike = usersDislikes.indexOf(userId);

        /*SI l'userId n'est pas enregistré dans la liste, ajouter ou enlever 1 like et ajouter l'userId dans le bon tableau*/
        if(like === -1) {
                /*Comment on sait si l'utilisateur veut liker ou disliker ? Event Listener ?*/
        } else if(dislike === -1){

        }

        /*SINON modifier le like de l'userId correspondant*/
        else {

        }
    })
    .catch(error => res.status(400).json({error}));

};
