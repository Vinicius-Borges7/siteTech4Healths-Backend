const express = require('express');
const router = express.Router();
const path = require("path")
const fileUpload = require('express-fileupload');

const mongoose = require('mongoose')
const Work = require('../schema/work')

const myPdfUpload = require('../middleware/upload');

router.use('/myForm', (req, res, next) => {
  console.log(req.body)
  myPdfUpload.myPdfUploadFunction(req, res);
  next();
});

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env

// Lets Use a local Mongo DB
let connString = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/?authSource=admin`
// let connString = `mongodb://${DB_HOST}:${DB_PORT}`
// console.log(connString)

mongoose.connect(connString, {dbName : DB_NAME, useNewUrlParser: true, useUnifiedTopology: true})
  .then(client => {
    console.log('works - Mongoose Connected to Database')

    // @route GET /
    // @desc Loads form and table of CRUD works.
    router.get('/', (req, res) => {
      Work.find()
        .then(results => {
          // console.log(results)
          res.render('works.ejs', { works: results })
        })
        .catch(error => console.error(error.message))
    })

    // @route GET /log
    // @desc Loads JSON for front-end purposes.
    router.get('/data', (req, res) => {
      Work.find()
        .then(results => {
           console.log(results)
           res.json(results)
          })
        .catch(error => console.error(error.message))
    })

    // @route GET /:id
    // @desc Loads form containing only one work.
    router.get('/:id', (req, res) => {
      Work.findById(req.params.id)
        .then(results => {
          // console.log(results)
          res.render('works.ejs', { works: [results] })
        })
        .catch(error => console.error(error.message))
    })

  // @route POST /myForm
  // @desc Send work data to DB storage.
  router.post('/myForm', (req, res) => {
    // req.body.mywork=req.files.mywork.name
    let date = new Date(req.body.data)
    //lets try it by schema later
    req.body.authors = [req.body.autor1]
    if(req.body.coorientador!="") req.body.authors.push(req.body.coorientador)
    if(req.body.autor2!="") req.body.authors.push(req.body.autor2)
    if(req.body.autor3!="") req.body.authors.push(req.body.autor3)
    req.body.authors.push(req.body.orientador)
    
    const work = new Work(req.body)
    work.day = date.getUTCDay()
    work.month = date.getUTCMonth()
    work.year = date.getUTCFullYear()

    work.save()
      .then(result => {
        console.log(req.body)
        res.redirect('/works/');
      })
      .catch(error => console.error(error.message))
  })

  router.post('/myForm', async (req, res) => {
    let date = new Date(req.body.data)
    
    const project = new Project(req.body)
    project.save((err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send({"error":"algo de errado não está certo"});
      }
      else {
        res.status(201).send({"message":"projeto inserido!"});
      }
    });  
  });

  router.delete('/delete/:id', (req, res) => {
    Work.deleteOne({ "_id": req.params.id })
      .then(result => {
        console.log(result)
        res.json(result)
      })
      .catch(error => console.error(error))
  })

  })
  .catch(error => console.error(error))


// //promises connection model
// MongoClient.connect(connectionString, { useUnifiedTopology: true })
//   .then(client => {
//     console.log('Connected to Database')
//     const db = client.db('my-first-db')
//     const quotesCollection = db.collection('works')

//   // // @route GET /:id
//   // // @desc Loads form containing only one work.
//   // router.get('/:id', (req, res) => {
//   //   quotesCollection.findOne({"_id":objectId(req.params.id)})
//   //     .then(results => {
//   //       console.log(results)
//   //       res.render('works.ejs', {works : [results]})
//   //     })
//   //     .catch(error => console.error(error)) 
//   // })

//   // // @route GET /
//   // // @desc Loads form and table of CRUD works.
//   // router.get('/', (req, res) => {
//   //   quotesCollection.find().toArray()
//   //     .then(results => {
//   //       console.log(results)
//   //       res.render('works.ejs', {works : results})
//   //     })
//   //     .catch(error => console.error(error)) 
//   // })

//   // @route DELETE /delete/:id
//   // @desc Delete a published work by id. 
//   router.delete('/delete/:id', (req, res) => {
//     quotesCollection.deleteOne({"_id":objectId(req.params.id)})
//       .then(result => {
//         console.log(result)
//         res.json(result)
//       })
//       .catch(error => console.error(error))
//   })

//   })
//   .catch(error => console.error(error))


module.exports = router;
