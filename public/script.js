// 天気データを受け取る

let weather;

fetch('/weather')
  .then(response => response.json())
  .then(data => {
    console.log(data.weather);
    console.log(data.chanceOfRains);
    console.log(data.img_url);
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

  })
  .catch(error => console.error('データの取得中にエラーが発生しました:', error));

pref = "30"; //県ID

// str で渡す
let year;
let month ;
let day ;
let hour ;
let min ;

function nowtime(){
    let date = new Date();
    year = date.getFullYear(); 
    month = add_zero(date.getMonth() + 1); 
    day = add_zero(date.getDate());
    hour = add_zero(date.getHours());
    min = add_zero(Math.floor(date.getMinutes() / 10) * 10 ) ;

      //10分のときの処理
    if (parseInt(min) <= 10) {
      hour = add_zero(hour - 1);
      min = "00";
    } else {
      min = min - 10;
    }

    console.log(year, month, day, hour, min)
}

function add_zero(num){ // ゼロ補完
    numStr = num.toString();
    if(numStr.length === 1){
      return `0${numStr}`;
    }else if(numStr.length === 2){
      return numStr;
    }
  }


nowtime();




console.log(year, month, day, hour, min)
rain_radar_city_URL = `https://static.tenki.jp/static-images/radar/${year}/${month}/${day}/${hour}/${min}/00/pref-${pref}-large.jpg`
console.log(rain_radar_city_URL)