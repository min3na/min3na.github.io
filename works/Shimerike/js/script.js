const HUMIDITY_LEVELS = [
  { max: 29, title: "からっから！", message: "空気がかなり乾燥しています。\n加湿器を使って、室内の湿度を上げましょう！",
    humidifier: ["使ったほうがいい", "status-necessary"],
    dehumidifier: ["使う必要なし", "status-unnecessary"], img: "img/humid-1.png" },
  { max: 39, title: "乾燥注意！", message: "少し乾燥気味です。\n加湿器を使うなど、もう少し湿度を上げてみましょう。",
    humidifier: ["あると快適かも", "status-normal"],
    dehumidifier: ["使う必要なし", "status-unnecessary"], img: "img/humid-2.png" },
  { max: 59, title: "いい感じ！", message: "快適に過ごしやすい湿度です。\nこの調子で、心地よい湿度をキープしましょう。",
    humidifier: ["使う必要なし", "status-unnecessary"],
    dehumidifier: ["使う必要なし", "status-unnecessary"], img: "img/humid-3.png" },
  { max: 69, title: "ちょっとジメジメ", message: "湿度が高めです。\nカビやダニが増えやすくなるため、換気や除湿を意識しましょう。",
    humidifier: ["使う必要なし", "status-unnecessary"],
    dehumidifier: ["あると快適かも", "status-normal"], img: "img/humid-4.png" },
  { max: Infinity, title: "かなりジメジメ！", message: "湿度がかなり高くなっています。\n換気や除湿機を活用して、湿度を下げる対策をしましょう！",
    humidifier: ["使う必要なし", "status-unnecessary"],
    dehumidifier: ["使ったほうがいい", "status-necessary"], img: "img/humid-5.png" },
];

function showHumidity(humidity) {
  const level = HUMIDITY_LEVELS.find((l) => humidity <= l.max);

  document.getElementById("humidityValue").textContent = humidity;
  document.getElementById("humidityTitle").textContent = level.title;
  document.getElementById("humidityMessage").textContent = level.message;

  const humidifier = document.getElementById("humidifierStatus");
  humidifier.textContent = level.humidifier[0];
  humidifier.className = level.humidifier[1];   

  const dehumidifier = document.getElementById("dehumidifierStatus");
  dehumidifier.textContent = level.dehumidifier[0];
  dehumidifier.className = level.dehumidifier[1];

  document.getElementById("humidImg").src = level.img;
}

async function getWeather(url) {
    try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error (`天気情報の取得に失敗しました (status: ${response.status})`);
    }
    const data = await response.json();
    
    document.getElementById("city").textContent = data.name;
    document.getElementById("weatherMain").textContent = data.weather[0].description;
    document.getElementById("tempMax").textContent = data.main.temp_max;
    document.getElementById("tempMin").textContent = data.main.temp_min;
    document.getElementById("humidityValue").textContent = data.main.humidity;

    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = now.getDay();
    const youbi = ["日", "月", "火", "水", "木", "金", "土"]

    const dayText = youbi[day];

    document.getElementById("weatherDate").textContent = `${month}月${date}日(${dayText})`;

    // 天気アイコン表示
    const iconCode = data.weather[0].icon;
    const icon = document.getElementById("weatherIcon");
    icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    icon.alt = data.weather[0].description;
    icon.style.display = "";


    showHumidity(data.main.humidity);

    } catch (error) {
    console.error(error);
    document.getElementById("city").textContent = "取得エラー";
    document.getElementById("weatherMain").textContent = "";
    document.getElementById("tempMax").textContent = "-";
    document.getElementById("tempMin").textContent = "-";
    document.getElementById("humidityValue").textContent = "-";
    document.getElementById("humidityTitle").textContent = "-";
    document.getElementById("humidityMessage").textContent = "-";
    document.getElementById("humidifierStatus").textContent = "-";
    document.getElementById("dehumidifierStatus").textContent = "-";
    document.getElementById("weatherDate").textContent = "-";
    document.getElementById("humidifierStatus").className = "";
    document.getElementById("weatherIcon").src = "";
    document.getElementById("weatherIcon").alt = "";
    document.getElementById("weatherIcon").style.display = "none";
    document.getElementById("humidImg").src = "";
    document.getElementById("humidImg").alt = "";

    
    }

    }
    // 都市を選択
    const citySelect = document.getElementById("citySelect");

    const WORKER_URL = "https://shimerike-weather.shime-rike.workers.dev/";

    // 都市名から呼ぶ場合
    function buildUrlByCity(city) {
    const params = new URLSearchParams({
        city: city
    });

    return `${WORKER_URL}?${params.toString()}`;
    }

    // 緯度経度から呼ぶ場合
    function buildUrlByLocation(lat, lon) {
    const params = new URLSearchParams({
        lat: String(lat),
        lon: String(lon)
    });

    return `${WORKER_URL}?${params.toString()}`;
    }

    // 現在地取得 → 天気取得
    navigator.geolocation.getCurrentPosition(
    (position) => {
        const url = buildUrlByLocation(position.coords.latitude, position.coords.longitude);
        getWeather(url);
    },
    () => {
        const url = buildUrlByCity("Tokyo");
        getWeather(url);
    }
    );

    // selectで都市が選ばれた時
    citySelect.addEventListener("change", () => {
    if (citySelect.value !== "") {
        const url = buildUrlByCity(citySelect.value);
        getWeather(url);
    }
    });
