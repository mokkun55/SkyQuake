
// --初期設定--
fetchWeatherData();
pref = "30"; //県ID 大阪30, 三重27
set_rein_radarURL(pref);


// ---天気データ取得+html関数---
async function fetchWeatherData() { 
  try {
    const response = await fetch('/weather');
    const data = await response.json();
    weather = data.weather;

    let i = 0;
    document.getElementById('today_weather').innerHTML = data.weather[i];
    document.getElementById('today_0_6').innerHTML = data.chanceOfRains[i][0];
    document.getElementById('today_6_12').innerHTML = data.chanceOfRains[i][1];
    document.getElementById('today_12_18').innerHTML = data.chanceOfRains[i][2];
    document.getElementById('today_18_24').innerHTML = data.chanceOfRains[i][3];
    document.getElementById('today_weather_pic').src = data.img_url[i];
    document.getElementById('today_maxtemp').innerHTML = "最高" + data.MAXtemps[i] + "℃";
    document.getElementById('today_mintemp').innerHTML = "最低" + data.MINtemps[i] + "℃";
    document.getElementById('today_windinfo').innerHTML = "🍃" + clearSpace(data.windInfo[i]);
    // document.getElementById('today_waveinfo').innerHTML = clearSpace(data.waveInfo[i]); いまは使わないかなぁ


    // -現在時刻を赤くする-
    let date = new Date();
    let hour = date.getHours();
    if (hour >= 0 && hour < 6) {
        now_ID = "today_0_6";
    } else if (hour >= 6 && hour < 12) {
        now_ID = "today_6_12";
    } else if (hour >= 12 && hour < 18) {
        now_ID = "today_12_18";
    } else {
        now_ID = "today_18_24";
    }
    now_chanceOfRain = document.getElementById(now_ID);
    // now_chanceOfRain.style.backgroundColor = "gray";
    // now_chanceOfRain.style.fontWeight == "bold";

    Bringunbrella('today', data.chanceOfRains[i]); // 傘判定


    i++;
    document.getElementById('tomorrow_weather').innerHTML = data.weather[i];
    document.getElementById('tomorrow_0_6').innerHTML = data.chanceOfRains[i][0];
    document.getElementById('tomorrow_6_12').innerHTML = data.chanceOfRains[i][1];
    document.getElementById('tomorrow_12_18').innerHTML = data.chanceOfRains[i][2];
    document.getElementById('tomorrow_18_24').innerHTML = data.chanceOfRains[i][3];
    document.getElementById('tomorrow_weather_pic').src = data.img_url[i];
    document.getElementById('tomorrow_maxtemp').innerHTML = "最高" + data.MAXtemps[i] + "℃";
    document.getElementById('tomorrow_mintemp').innerHTML = "最低" + data.MINtemps[i] + "℃";
    document.getElementById('tomorrow_windinfo').innerHTML = "🍃" + clearSpace(data.windInfo[i]);
    // document.getElementById('today_waveinfo').innerHTML = clearSpace(data.waveInfo[i]); いまは使わないかなぁ

    Bringunbrella('tomorrow', data.chanceOfRains[i]); // 傘判定


    i++;
    document.getElementById('after_tomorrow_weather').innerHTML = data.weather[i];
    document.getElementById('after_tomorrow_0_6').innerHTML = data.chanceOfRains[i][0];
    document.getElementById('after_tomorrow_6_12').innerHTML = data.chanceOfRains[i][1];
    document.getElementById('after_tomorrow_12_18').innerHTML = data.chanceOfRains[i][2];
    document.getElementById('after_tomorrow_18_24').innerHTML = data.chanceOfRains[i][3];
    document.getElementById('after_tomorrow_weather_pic').src = data.img_url[i];
    document.getElementById('after_tomorrow_maxtemp').innerHTML = "最高" + data.MAXtemps[i] + "℃";
    document.getElementById('after_tomorrow_mintemp').innerHTML = "最低" + data.MINtemps[i] + "℃";
    document.getElementById('after_tomorrow_windinfo').innerHTML = "🍃" + clearSpace(data.windInfo[i]);
    // document.getElementById('today_waveinfo').innerHTML = clearSpace(data.waveInfo[i]); いまは使わないかなぁ

    Bringunbrella('after_tomorrow', data.chanceOfRains[i]); // 傘判定

    


    // --レーダー画像--
    const rain_radar_city = document.getElementById("rain_radar_city");
    rain_radar_city.innerHTML = `
    <img src="${rain_radar_city_URL}" alt="レーダー画像">
    `;


    // --日付データ--
    document.getElementById('today-date').innerHTML = getDate(0);
    document.getElementById('tomorrow-date').innerHTML = getDate(1);
    document.getElementById('after_tomorrow-date').innerHTML = getDate(2);

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


    // --スペース削除関数(全角スペース削除)--
function clearSpace(txt){
  if (!txt) {
    return "情報未出";
  }
  return txt.replace(/　/g, "");
}

// --雨雲レーダーURL取得関数--
function set_rein_radarURL(pref){
  nowtime();
  rain_radar_city_URL = `https://static.tenki.jp/static-images/radar/${year}/${month}/${day}/${hour}/${min}/00/pref-${pref}-large.jpg`
}

function get_youbi(date){
  if (date == 0) {
    return " (日)";
  } else if (date == 1) {
    return " (月)";
  } else if (date == 2) {
    return " (火)";
  } else if (date == 3) {
    return " (水)";
  } else if (date == 4) {
    return " (木)";
  } else if (date == 5) {
    return " (金)";
  } else {
    return " (土)";
  }
}

// --明日日付取得関数--(こぴぺ ちょっと改造)
function getDate(day) {
  var date = new Date();
  date.setDate(date.getDate() + day);
  // var year  = date.getFullYear(); 使わん
  var month = date.getMonth() + 1;
  var day   = date.getDate();
  var youbi = date.getDay();
  return String(month) + " / " + String(day) + String(get_youbi(youbi));
}

// --傘判定関数--
function Bringunbrella(day, data) {
  let NEED = false;
  let parsent = 50; // x%以上で通知する

  // console.log(data);
  let datas = [];
  for (let i = 0; i < data.length; i++) {
    let ob = data[i];
    res = ob.replace("%", "");
    datas.push(Number(res));
  }

  if (datas[0] >= parsent || datas[1] >= parsent ||datas[2] >= parsent || datas[3] >= parsent){
    // console.log("雨ふるかも");
    NEED = true;
  }

  if (NEED) { // 必要なとき
    document.getElementById(`${day}_umbrella`).style.display = "block";
    document.getElementById(`NO_${day}_umbrella`).style.display = "none";
    } else { // 不要なとき
    document.getElementById(`${day}_umbrella`).style.display = "none";
    document.getElementById(`NO_${day}_umbrella`).style.display = "block";
  }
}


// --定期実行(1分)--
setInterval(() => { 

  // 雨雲レーダー画像更新
  set_rein_radarURL(pref);
  rain_radar_city.innerHTML = `
  <img src="${rain_radar_city_URL}" alt="レーダー画像">
  `;

  // 天気データ取得+書き込み
  fetchWeatherData();

  console.log("定期実行")
},60000);