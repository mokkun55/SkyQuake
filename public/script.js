
// --初期設定--
fetchWeatherData();

pref = "30"; //県ID 大阪30, 三重27
set_rein_radarURL(pref);

// ---天気データ取得関数---
async function fetchWeatherData() { 
  try {
    const response = await fetch('/weather');
    const data = await response.json();
    weather = data.weather;

    const today_weather = document.getElementById("today");
    today_weather.innerHTML = `
    <p>${data.weather[0]}</p>
    <p>${data.chanceOfRains[0]}</p>
    <img src="${data.img_url[0]}" alt="天気画像">
    `;

    const tomorrow_weather = document.getElementById("tomorrow");
    tomorrow_weather.innerHTML = `
    <p>${data.weather[1]}</p>
    <p>${data.chanceOfRains[1]}</p>
    <img src="${data.img_url[1]}" alt="天気画像">
    `;

    const afttertomorrow_weather = document.getElementById("aftter-tomorrow");
    afttertomorrow_weather.innerHTML = `
    <p>${data.weather[2]}</p>
    <p>${data.chanceOfRains[2]}</p>
    <img src="${data.img_url[2]}" alt="天気画像">
    `;

    const rain_radar_city = document.getElementById("rain_radar_city");
    rain_radar_city.innerHTML = `
    <img src="${rain_radar_city_URL}" alt="レーダー画像">
    `;
  } catch (error) {
    console.error('データの取得中にエラーが発生しました:', error);
  }
}


// ---時間取得 + α---
function nowtime(){
    let date = new Date();
    year = date.getFullYear(); 
    month = add_zero(date.getMonth() + 1); 
    day = add_zero(date.getDate());
    hour = add_zero(date.getHours());
    min = add_zero(Math.floor(date.getMinutes() / 10) * 10 ) ;

      // 10分のときの処理
    if (parseInt(min) <= 10) {
      hour = add_zero(hour - 1);
      min = "50";
    } else {
      min = min - 10;
    }

    // console.log(year, month, day, hour, min)
}
function add_zero(num){ // ゼロ補完 時間に適応させる
    numStr = num.toString();
    if(numStr.length === 1){
      return `0${numStr}`;
    }else if(numStr.length === 2){
      return numStr;
    }
  }


// --雨雲レーダーURL取得関数--
function set_rein_radarURL(pref){
  nowtime();
  rain_radar_city_URL = `https://static.tenki.jp/static-images/radar/${year}/${month}/${day}/${hour}/${min}/00/pref-${pref}-large.jpg`
  // console.log(rain_radar_city_URL);
}


// --定期実行(1分)--
setInterval(() => { 

  // 雨雲レーダー画像更新
  set_rein_radarURL();
  rain_radar_city.innerHTML = `
  <img src="${rain_radar_city_URL}" alt="レーダー画像">
  `;



  console.log("定期実行")
},60000);