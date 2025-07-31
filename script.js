const getLocationBtn = document.getElementById("getLocationBtn");
const infoSection = document.getElementById("info");

getLocationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    infoSection.innerHTML = "<p>Geolocation is not supported by your browser.</p>";
    return;
  }

  navigator.geolocation.getCurrentPosition(success, error);
});

async function success(position) {
  const { latitude, longitude } = position.coords;
  infoSection.innerHTML = `<p>Fetching info for coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}...</p>`;

  try {
    const locationRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
    const locationData = await locationRes.json();
    const city = locationData.address.city || locationData.address.town || locationData.address.village || locationData.address.state;
    const country = locationData.address.country;

    if (!city || !country) throw new Error("Location data incomplete");

    const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city)}`);
    const wikiData = await wikiRes.json();

    const countryRes = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`);
    const countryData = await countryRes.json();
    const countryInfo = countryData[0];

    infoSection.innerHTML = `
      <h2>${city}, ${country}</h2>
      <p><strong>📚 Summary:</strong> ${wikiData.extract || "No Wikipedia summary available."}</p>
      <p><strong>🌍 Country Info:</strong></p>
      <ul>
        <li><strong>Capital:</strong> ${countryInfo.capital?.[0]}</li>
        <li><strong>Region:</strong> ${countryInfo.region}</li>
        <li><strong>Population:</strong> ${countryInfo.population.toLocaleString()}</li>
        <li><strong>Languages:</strong> ${Object.values(countryInfo.languages || {}).join(', ')}</li>
      </ul>
    `;
  } catch (err) {
    infoSection.innerHTML = "<p>⚠️ Could not find location data. Please try again.</p>";
    console.error(err);
  }
}

function error() {
  infoSection.innerHTML = "<p>Unable to retrieve your location.</p>";
}
