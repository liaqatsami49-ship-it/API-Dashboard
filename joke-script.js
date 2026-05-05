// 😂 Get Random Joke
async function getRandomJoke() {
  try {
    const category = document.getElementById("category").value;
    const res = await fetch(`https://v2.jokeapi.dev/joke/${category}`);
    const data = await res.json();

    if (data.error) {
      document.getElementById("jokeText").textContent = "❌ Failed to load joke. Try again!";
      document.getElementById("jokeInfo").textContent = "";
      return;
    }

    displayJoke(data);
  } catch (error) {
    console.error("Error fetching joke:", error);
    document.getElementById("jokeText").textContent = "❌ Network error. Please try again!";
    document.getElementById("jokeInfo").textContent = "";
  }
}

// Get Joke by Category
async function getJokeByCategory() {
  await getRandomJoke();
}

// Display Joke
function displayJoke(data) {
  let jokeText = "";

  if (data.type === "single") {
    jokeText = data.joke;
  } else if (data.type === "twopart") {
    jokeText = `${data.setup}\n\n${data.delivery}`;
  }

  document.getElementById("jokeText").textContent = jokeText;

  // Show joke info
  const category = data.category;
  const type = data.type === "single" ? "Single" : "Two-Part";
  document.getElementById("jokeInfo").textContent = `📂 Category: ${category} | 📋 Type: ${type}`;
}

// Copy to Clipboard
function copyToClipboard() {
  const jokeText = document.getElementById("jokeText").textContent;

  if (jokeText === "Click the button to generate a joke!") {
    alert("Generate a joke first!");
    return;
  }

  navigator.clipboard.writeText(jokeText).then(() => {
    alert("✅ Joke copied to clipboard!");
  }).catch(() => {
    alert("❌ Failed to copy. Try again!");
  });
}

// Share Joke
function shareJoke() {
  const jokeText = document.getElementById("jokeText").textContent;

  if (jokeText === "Click the button to generate a joke!") {
    alert("Generate a joke first!");
    return;
  }

  if (navigator.share) {
    navigator.share({
      title: "😂 Check out this joke!",
      text: jokeText,
    }).catch((error) => {
      console.log("Error sharing:", error);
    });
  } else {
    alert("Sharing not supported on this device. Copy to clipboard instead!");
  }
}

// Load joke on page load
window.addEventListener("DOMContentLoaded", () => {
  getRandomJoke();
});

// Press Enter to get new joke
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getRandomJoke();
  }
});
