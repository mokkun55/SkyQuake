//色々読み込み
const express = require('express');
const path = require('path');
const app = express();
const request = require('request')
const dotenv = require('dotenv').config();


//PORTを指定する
const PORT = 3000;
//expressを使い、ローカルサーバーを立ち上げる
app.listen(PORT, () => console.log(`server is online at http://localhost:${PORT}`));

app.use(express.static(path.join(__dirname, 'public')));

// / でアクセスのときindex.htmlを返す
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// /weatherでアクセスが来たとき天気情報を返す
app.get('/weather', (req, res) => {
    res.send({ 
        weather: weather,
        chanceOfRains: chanceOfRains,
        MINtemps: MINtemps,
        MAXtemps: MAXtemps,
        windInfo: windInfo,
        waveInfo: waveInfo,
        img_url: img_url
    });
});

// --お天気API--
const options = {
    // 27000はシティID
    url: `https://weather.tsukumijima.net/api/forecast?city=270000`,
    method: "GET",
    json: true,
};

request(options, (err, res, body) => {
    // console.log(body.forecasts[0].detail.wind);
    // 天気

    weather = []
    for (let i = 0; i < 3; i++) {
        weather.push(body.forecasts[i].telop)
    }

    // 降水確率
    chanceOfRains = [] 
    for (let i = 0; i < 3; i++) {
        let dailyChanceOfRain = [];
        dailyChanceOfRain.push(
            body.forecasts[i].chanceOfRain.T00_06,
            body.forecasts[i].chanceOfRain.T06_12,
            body.forecasts[i].chanceOfRain.T12_18,
            body.forecasts[i].chanceOfRain.T18_24
        );
        chanceOfRains.push(dailyChanceOfRain);
    }

    // console.log(chanceOfRains)

    MAXtemps = [] // 最高温度
    for (let i = 0; i < 3; i++) {
        MAXtemps.push(body.forecasts[i].temperature.max.celsius)
    }

    MINtemps = [] // 最低温度
    for (let i = 0; i < 3; i++) {
        MINtemps.push(body.forecasts[i].temperature.min.celsius)
    }

    windInfo = [] // 風情報
    for (let i = 0; i < 3; i++) {
        windInfo.push(body.forecasts[i].detail.wind)
    }
    
    waveInfo = [] // 波情報
    for (let i = 0; i < 3; i++) {
        waveInfo.push(body.forecasts[i].detail.wave)
    }

    // console.log(windInfo,waveInfo)

    img_url = []
    for (let i = 0; i < 3; i++) {
        img_url.push(body.forecasts[i].image.url)
    }

})



