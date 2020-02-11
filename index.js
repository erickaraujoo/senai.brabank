// const express = require('express')
const app = require('./src/server')

// const multer = require('multer')

// app.use('/pictures', express.static('uploads'))

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads')
//     },
//     filename: (req, file, cb) => {
//         const ext = file.originalname.split('.').pop()
//         cb(null, Date.now() + '.' + ext)
//     }
// })

// const fileFilter = (req, file, cb) => {

//     if(file.originalname.length > 20){
//         req.errorUpload = "Name of the file is too big"
//         return cb(null, false)
//     }
//     cb(null, true)
// }

// const upload = multer({
//     storage: storage, 
//     limits: {fileSize: 10000000},
//     fileFilter: fileFilter
// }).single('file')

// app.get('/', (req, res) => {
//     res.send('<h1>Hello World Multer</h1>')
// })

// app.post('/upload', (req, res) => {
//     upload(req, res, (error) => {
//         if(error instanceof multer.MulterError){
//             if(error.code = 'LIMIT_FILE_SIZE'){
//                 res.status(400).send({error: 'File size is too big'})
//             }
//         }else{
//             res.send('The file has been uploaded')
//         }
//     })
// })

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})