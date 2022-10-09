const mongoose = require("mongoose")
const chai = require("chai")
chai.use(require("chai"))
const {bartenderModel} = require("../routes/mongoose.js")

const{server} = require("../index.js")

after("Close Server", function(){
    server.close();
})

const testData = {
    "name": "Sam",
    "age": 21,
    "speciality": "Mojito",
    "cocktails": "cocktail",
    "cocktail": "martini",
    "ingredients": "alcohol",
    "method": "mix",
    "learnt": false
}

this.beforeAll("Test Database" ,async function(){
    await mongoose.connection.close()
    await mongoose.connect("mongodb://127.0.0.1:27017")
})

this.beforeEach("Test Data", async function(){
    
    await bartenderModel.deleteMany({});
    await bartenderModel.create(testData)
})

//get all(read)
it.only("/getAll", function(){
    chai.request(server).get("/getAll").end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res.status).to.equal(200);

        chai.expect(res.body.length).to.equal(1);

        chai.expect(res.body[0].name).to.equal(testData.name);
        chai.expect(res.body[0].age).to.equal(testData.age);
        chai.expect(res.body[0].speciality).to.equal(testData.speciality);
        chai.expect(res.body[0].cocktails).to.equal(testData.cocktails);
        chai.expect(res.body[0].cocktail).to.equal(testData.cocktail);
        chai.expect(res.body[0].ingredients).to.equal(testData.ingredients);
        chai.expect(res.body[0].method).to.equal(testData.method);
        chai.expect(res.body[0].learnt).to.equal(testData.learnt);
        
    })
})

//create test

it("/create", function(){
    const bartender = {
        "name": "Sam",
        "age": 21,
        "speciality": "Mojito",
        "cocktails": "cocktail",
        "cocktail": "martini",
        "ingredients": "alcohol",
        "method": "mix",
        "learnt": false
    }

    chai.request(server).post("/create").send(bartender).end( (err, res) => {
        chai.expect(err).to.be.null;

        chai.expect(res.status).to.equal(201)
        chai.expect(res.body).to.be.not.equal({});
        chai.expect(res.body.name).to.be.equal("Sam")
        chai.expect(res.body.age).to.be.equal(21)
        chai.expect(res.body.speciality).to.be.equal("Mojito")
        chai.expect(res.body.ingredients).to.be.equal("cocktail")
        chai.expect(res.body.cocktail).to.be.equal("martini")
        chai.expect(res.body.ingredients).to.be.equal("alcohol")
        chai.expect(res.body.method).to.be.equal("mix")
        chai.expect(res.body.learnt).to.be.equal(false)

    })

    
    chai.request(server).put("/update").send(bartender)

})
//update test
it ("Should Fetch a bartender", (done)=>{
    chai.request(server)
        .get("/getOne/0")
        .end((err, result)=>{                    
            result.should.have.status(200)
            console.log("bartender:", result.body)
            done()
        }),


it ("should check data updated in DB", (done)=>{
    chai.request(server)
        .get("/getOne/0")
        .end((err, result)=>{                    
            result.should.have.status(200)                
            result.body.data.age.should.eq(25)   
            done()
        })
})

//delete test
describe("bartender", function(){
    describe ("Delete one", function(){
        it("should remove ine entry", done=>{
            console.log ("Deleting one entry in db.")
            chai.request(server)
                .delete("/deleteOne/0")
                .send({})
                .end((err,res)=>{
                    //console.log (res)
                    // console.log("err",err);
                    res.should.have.status(200);
                    console.log("Response Body:", res.body);
                    // console.log (result);
                    done()
                })
            })
        })
    })
})
