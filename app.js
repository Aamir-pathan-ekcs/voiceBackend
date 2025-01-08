const express = require('express');
const app = express();
const mongose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
mongose.connect('mongodb+srv://maakhan:iqMZFeqCyvDlNh72@cluster0.l9s6zof.mongodb.net/voiceBanner')
.then(()=>{
    console.log('db connected');
}).catch(()=>{
    console.log('error with db');
});
const voiceData = require('./models/dataModel');

app.get('/dashboard', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'chart', 'index.html'));
});

app.get('/users', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/userDetails', async(req, res)=>{
    const users = await voiceData.find();
    res.status(200).json(users);
})

app.post('/voice', function(req, res){
    const dataForm = req.body;
    //console.log(dataForm);
    const newVoice = new voiceData(dataForm);
    newVoice.save()
    .then(()=>{
        res.status(201).json({Message: 'data saved successfylly'})
    }).catch((err)=>res.status(500).json({error : err.message}));
})

app.get('/promoCodeCount', async(req, res)=>{
    try{
        const itemFound = async(item)=>{
            return await voiceData.countDocuments(item); 
        }
        const promoCodeFive = { promo: 'DISCOUNT5'};
        const promoCodeTen = { promo: 'DISCOUNT10'};
        const promoCodeTwenty = { promo: 'DISCOUNT20'};
        const promoCodeThirty = { promo: 'DISCOUNT30'};

        const fiveCount = await itemFound(promoCodeFive);
        const tenCount = await itemFound(promoCodeTen);
        const twentyCount = await itemFound(promoCodeTwenty);
        const thirtyCount = await itemFound(promoCodeThirty);
        res.json({
            five: fiveCount,
            ten: tenCount,
            twenty: twentyCount,
            thirty: thirtyCount
        })
    }catch(err) {
        console.error('counting error', err);
    }
})

app.listen(PORT, ()=>{
    console.log('app running');
})