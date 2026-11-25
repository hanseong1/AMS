const cities = {
  seoul: { name: '서울', latitude: 37.5665, longitude: 126.9780 },
  jeonju: { name: '전주', latitude: 35.8242, longitude: 127.1480 },
  iksan: { name: '익산', latitude: 35.9483, longitude: 126.9575 },
};

const citySelect = document.querySelector('#city');
const runButton = document.querySelector('#run-button');
const output = document.querySelector('#output');

async function fetchTemperature() {
  const city = cities[citySelect.value];
  runButton.disabled = true;
  output.textContent = '조회 중...';

  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', city.latitude);
    url.searchParams.set('longitude', city.longitude);
    url.searchParams.set('current', 'temperature_2m');
    url.searchParams.set('timezone', 'Asia/Seoul');

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`날씨 정보를 가져오지 못했습니다. (${response.status})`);
    }

    const data = await response.json();
    const temperature = data.current?.temperature_2m;

    if (temperature === undefined) {
      throw new Error('현재 기온 데이터를 찾을 수 없습니다.');
    }

    output.textContent = `${city.name}의 현재 기온은 ${temperature}°C입니다.`;
  } catch (error) {
    output.textContent = error.message;
  } finally {
    runButton.disabled = false;
  }
}

runButton.addEventListener('click', fetchTemperature);
