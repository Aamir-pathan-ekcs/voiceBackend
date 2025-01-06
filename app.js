const express = require('express');
const app = express();
const mongose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
mongose.connect('mongodb+srv://maakhan:iqMZFeqCyvDlNh72@cluster0.l9s6zof.mongodb.net/voiceBanner')
.then(()=>{
    console.log('db connected');
}).catch(()=>{
    console.log('error with db');
});
const voiceData = require('./models/dataModel');

app.post('/voice', function(req, res){
    const dataForm = req.body;
    console.log(dataForm);
    const newVoice = new voiceData(dataForm).save()
    .then(()=>{
        res.status(201).json({Message: 'data saved successfylly'})
    }).catch((err)=>res.status(500).json({error : err.message}));
})

app.listen(PORT, ()=>{
    console.log('app running');
})