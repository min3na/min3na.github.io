
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
    document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("weatherIcon").alt = data.weather[0].description;


    // 湿度コメント
    const humidity = data.main.humidity;

    document.getElementById("humidityValue").textContent = humidity;

    if (humidity <= 29) {
        document.getElementById("humidityTitle").textContent = "からっから！";
        document.getElementById("humidityMessage").textContent = "空気がかなり乾燥しています。\n加湿器を使って、室内の湿度を上げましょう！";
        document.getElementById("humidifierStatus").textContent = "使ったほうがいい";
        document.getElementById("humidifierStatus").className = "status-necessary";
        document.getElementById("dehumidifierStatus").textContent = "使う必要なし";
        document.getElementById("dehumidifierStatus").className = "status-unnecessary";
        document.getElementById("humidImg").src = "img/humid-1.png";
    } else if (humidity <= 39) {
        document.getElementById("humidityTitle").textContent = "乾燥注意！";
        document.getElementById("humidityMessage").textContent = "少し乾燥気味です。\n加湿器を使うなど、もう少し湿度を上げてみましょう。";
        document.getElementById("humidifierStatus").textContent = "あると快適かも";
        document.getElementById("humidifierStatus").className = "status-normal";
        document.getElementById("dehumidifierStatus").textContent = "使う必要なし";
        document.getElementById("dehumidifierStatus").className = "status-unnecessary";
        document.getElementById("humidImg").src = "img/humid-2.png";
    } else if (humidity <= 59) {
        document.getElementById("humidityTitle").textContent = "いい感じ！";
        document.getElementById("humidityMessage").textContent = "快適に過ごしやすい湿度です。\nこの調子で、心地よい湿度をキープしましょう。";
        document.getElementById("humidifierStatus").textContent = "使う必要なし";
        document.getElementById("humidifierStatus").className = "status-unnecessary";
        document.getElementById("dehumidifierStatus").textContent = "使う必要なし";
        document.getElementById("dehumidifierStatus").className = "status-unnecessary";
        document.getElementById("humidImg").src = "img/humid-3.png";
    } else if (humidity <= 69) {
        document.getElementById("humidityTitle").textContent = "ちょっとジメジメ";
        document.getElementById("humidityMessage").textContent = "湿度が高めです。\nカビやダニが増えやすくなるため、換気や除湿を意識しましょう。";
        document.getElementById("humidifierStatus").textContent = "使う必要なし";
        document.getElementById("humidifierStatus").className = "status-unnecessary";
        document.getElementById("dehumidifierStatus").textContent = "あると快適かも";
        document.getElementById("dehumidifierStatus").className = "status-normal";
        document.getElementById("humidImg").src = "img/humid-4.png";
    } else {
        document.getElementById("humidityTitle").textContent = "かなりジメジメ！";
        document.getElementById("humidityMessage").textContent = "湿度がかなり高くなっています。\n換気や除湿機を活用して、湿度を下げる対策をしましょう！";
        document.getElementById("humidifierStatus").textContent = "使う必要なし";
        document.getElementById("humidifierStatus").className = "status-unnecessary";
        document.getElementById("dehumidifierStatus").textContent = "使ったほうがいい";
        document.getElementById("dehumidifierStatus").className = "status-necessary";
        document.getElementById("humidImg").src = "img/humid-5.png";
    }

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

    
    }

    }
    // 都市を選択
    const citySelect = document.getElementById("citySelect");

    // 都市名から呼ぶ場合
    function buildUrlByCity(city) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ja`;
    }


    // 緯度経度から呼ぶ場合
    function buildUrlByLocation(lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`;
    }

    // 現在地取得 → 天気取得
    navigator.geolocation.getCurrentPosition(
    (position) => {
        const url = buildUrlByLocation(position.coords.latitude, position.coords.longitude);
        getWeather(url);
    },
    (error) => {
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
