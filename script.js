// 🐶 Dog
async function getDog() {
  try {
    const res = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await res.json();
    document.getElementById("dogImg").src = data.message;
  } catch (error) {
    console.error("Error fetching dog:", error);
  }
}

// 🐱 Cat
async function getCat() {
  try {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const data = await res.json();
    document.getElementById("catImg").src = data[0].url;
  } catch (error) {
    console.error("Error fetching cat:", error);
  }
}

// 🌦️ Weather (London)
async function getWeather() {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=-0.1&current_weather=true"
    );
    const data = await res.json();
    document.getElementById("weather").textContent =
      `Temp: ${data.current_weather.temperature}°C`;
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
}

// 💱 Currency
async function getCurrency() {
  try {
    const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    const data = await res.json();
    document.getElementById("currency").textContent =
      `1 USD = ${data.rates.EUR.toFixed(2)} EUR`;
  } catch (error) {
    console.error("Error fetching currency:", error);
  }
}

// 🎬 Movies (⚠️ NEED API KEY)
async function getMovies() {
  try {
    const apiKey = "YOUR_API_KEY_HERE";

    if (apiKey === "YOUR_API_KEY_HERE") {
      document.getElementById("movies").innerHTML = 
        `<p style="color: #fbbf24;">⚠️ Add your TMDb API key in script.js</p>`;
      return;
    }

    const res = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`
    );

    const data = await res.json();

    const moviesDiv = document.getElementById("movies");
    moviesDiv.innerHTML = "";

    data.results.slice(0, 3).forEach(movie => {
      moviesDiv.innerHTML += `<p>🎬 ${movie.title}</p>`;
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// 👤 GitHub
async function getGitHub() {
  try {
    const username = document.getElementById("githubUser").value;

    if (!username) {
      alert("Please enter a GitHub username");
      return;
    }

    const res = await fetch(`https://api.github.com/users/${username}`);
    
    if (!res.ok) {
      throw new Error("User not found");
    }

    const data = await res.json();

    document.getElementById("github").innerHTML = `
      <p><strong>${data.login}</strong></p>
      <img src="${data.avatar_url}" width="80" style="border-radius: 50%;">
      <p>📊 Repos: ${data.public_repos}</p>
      <p>👥 Followers: ${data.followers}</p>
    `;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    document.getElementById("github").innerHTML = `<p style="color: #ff6b6b;">❌ ${error.message}</p>`;
  }
}

// 😂 Joke
async function getJoke() {
  try {
    const res = await fetch("https://v2.jokeapi.dev/joke/Any");
    const data = await res.json();

    document.getElementById("joke").textContent =
      data.type === "single"
        ? data.joke
        : `${data.setup} - ${data.delivery}`;
  } catch (error) {
    console.error("Error fetching joke:", error);
  }
}

// 🌍 Country
async function getCountry() {
  try {
    const res = await fetch("https://restcountries.com/v3.1/all");
    const data = await res.json();

    const random = data[Math.floor(Math.random() * data.length)];

    document.getElementById("country").innerHTML = `
      <p><strong>${random.name.common}</strong></p>
      <img src="${random.flags.png}" width="80" style="border-radius: 8px;">
      <p>🗣️ Languages: ${Object.values(random.languages || {}).join(", ") || "N/A"}</p>
    `;
  } catch (error) {
    console.error("Error fetching country:", error);
  }
}