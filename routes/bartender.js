const router = require("express").Router();
var bartender = [{id:0, name: "J Cole", age: "18", speciality: "Martini", trainingNeeded:"Mojito"}]
var id = 0;


router.get("/getAll", (req, res) => {
    res.status(200).json(bartender)
})

router.get("/getOne/:id", (req, res, next) => {
    for (const b of bartender){
        if (b.id == req.params.id){
        res.status(200).json(b)
        return;
        }
    }
    next(new Error("index is Invalid"))
})

router.post("/create", (req, res, next) => {
    if (req.body.name && req.body.age){
        req.body.id = ++id;
        bartender.push(req.body)
        res.status(201).json(req.body)
    }else{
        next(new Error('Expected{"name":"{name}", "age", "{age}"}'))
    }
})

router.put("/update/:id", (req, res, next) =>{
    const index = bartender.indexOf(bartender.find(b => b.id == req.params.id))

    if(index === -1){
        next(newError('Invalid Index'))
    }else{
        bartender[index] = {...bartender[index],...req.body}
        res.status(200).json(bartender[index])
    }
})

router.patch("/updateAttribute/:id", (req,res,next) =>{
    if (req.query!== {}){
        const index = bartender.indexOf(bartender.find(t => t.id == req.params.id))

        if(index === -1){
            next(new Error('Invalid Index'))
        }else{
            for (const key of Object.keys(req.query)){
                bartender[index][key] = req.query[key]
            }
            res.status(200).json(bartender[index])
        }
    }
    else{
        next(new Error('Missing "/updateAttribute/:id?key=value"'))
    }
})

module.exports = router;
