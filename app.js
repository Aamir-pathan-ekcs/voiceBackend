const express = require('express');
const app = express();
const mongose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

app.use(cors());
mongose.connect('mongodb+srv://maakhan:iqMZFeqCyvDlNh72@cluster0.l9s6zof.mongodb.net/voiceBanner')
.then(()=>{
    console.log('db connected');
}).catch(()=>{
    console.log('error with db');
});
const voiceData = require('./models/dataModel');

// async function asd() {
//     await voiceData.create({
//         name: 'aamir pathan 3',
//         email: 'pathan@ekc'
//     })
// }
// asd();
app.get('/voice', function(req, res){
    const bb = req.body;
    console.log(bb);
})
app.listen(PORT, ()=>{
    console.log('app running');
})