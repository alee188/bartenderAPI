const router = require("express").Router();
const {Schema, model} = require("mongoose");

// subschema
const cocktailSchema = new Schema({
    cocktail:{type:String},
    ingredients:{type:String},
    Method:{type:String},
    learnt:{type:Boolean, required:true}
}) 
// schema
const bartenderSchema = new Schema({
    name:{type:String, required:true},
    age:{type:Number, required:true},
    speciality:{type:String, required:true},
    cocktails: [cocktailSchema]
})

const bartenderModel = model("bartender", bartenderSchema);

router.get("/getALL", (req,res,next) =>{
    bartenderModel.find({}).then(trainers =>{
        res.status(200).json(bartender)
        }).catch(next)
})

router.get("/getOne/:id", (req,res, next) => {
    bartenderModel.findById(req.params.id).then(bartender => {
        res.status(200).json(bartender)
    }).catch(next)
})


router.get("/getBartenderByCocktail/:name",(req,res,next) => {
    bartenderModel.find({"cocktails.cocktail": req.params.cocktail}).then(bartender =>{
        if(bartender.length >0)
        res.status(200).json(bartender)
    }).catch(next)
} )

router.post("/create", (req,res,next) =>{
    bartenderModel.create(req.body).then(bartender =>{
        res.status(201).json(bartender)
    }).catch(next)
})

router.put("./update/:id", (req,res,next) =>{
    bartenderModel.findByIdAndUpdate(req.params.id, req.body).then((original) =>{
        bartenderModel.findById(req.params.id).then((updated) => {
            res.status(200).json({original, updated})
        })
}).catch(next)
})

router.delete("/deleteOne/:id", (req,res,next) => {
    bartenderModel.deleteOne(req.params.id).then((r) => {
        res.status(200).json(r)
    }).catch(next)
    
})

module.exports ={bartenderModel, router};