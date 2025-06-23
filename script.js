window.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("inviteOverlay");
  const form = document.getElementById("rsvpForm");
  const thankYou = document.getElementById("thankYou");
  const music = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");
  const musicControl = document.querySelector(".music-control");

  // Reveal popup after 3 seconds
  setTimeout(() => {
    overlay.classList.add("show");
  }, 3000);

  // RSVP form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
      data: {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        phone: document.getElementById("whatsapp").value,
        email: document.getElementById("email").value,
      }
    };

    fetch("https://sheetdb.io/api/v1/1p4sy7f0w660z", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        thankYou.style.display = "block";
        form.reset();
      })
      .catch((err) => {
        alert("Oops! Something went wrong. Please try again.");
        console.error(err);
      });
  });

  // Default button text
  musicToggle.textContent = "🔊 Play Music";

  let musicStarted = false;

  function tryPlayMusic() {
    if (!musicStarted) {
      music.play().then(() => {
        musicStarted = true;
        musicToggle.textContent = "🔇 Pause Music";
        musicControl.classList.add("music-started");
      }).catch(() => {
        // Autoplay blocked
      });
    }
  }

  // Try on first interaction
  document.body.addEventListener("click", tryPlayMusic, { once: true });

  // Manual toggle
  musicToggle.addEventListener("click", () => {
    if (music.paused) {
      music.play().then(() => {
        musicToggle.textContent = "🔇 Pause Music";
        musicControl.classList.add("music-started");
      });
    } else {
      music.pause();
      musicToggle.textContent = "🔊 Play Music";
      musicControl.classList.remove("music-started");
    }
  });
});