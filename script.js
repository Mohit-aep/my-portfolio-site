// --- Contact Form Handler using Backend API ---
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const data = {
      name: form[0].value,
      email: form[1].value,
      subject: form[2].value,
      message: form[3].value,
    };

    let responseMessage = form.querySelector(".form-response-message");
    if (!responseMessage) {
      responseMessage = document.createElement("p");
      responseMessage.className = "form-response-message";
      responseMessage.style.marginTop = "1rem";
      responseMessage.style.color = "#ff4d5a";
      form.appendChild(responseMessage);
    }

    const showMessage = (msg, isSuccess = false) => {
      responseMessage.textContent = msg;
      responseMessage.style.color = isSuccess ? "#4caf50" : "#ff4d5a";
      responseMessage.style.opacity = "1";

      setTimeout(() => {
        responseMessage.style.opacity = "0";
      }, 4000);
    };

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        showMessage("✅ Thanks! Your message has been sent.", true);
        form.reset();
      } else {
        const result = await res.json();
        showMessage(result.error || "❌ Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      showMessage("❌ Network error. Please try again later.");
    }
  });

  // --- Work Section Video Redirects ---
  const projectLinks = {
      1: "https://vimeo.com/1074550372",
      2: "https://vimeo.com/1074574090",
      3: "https://vimeo.com/1074576342",
      4: "https://vimeo.com/1074583129",
      5: "https://vimeo.com/1074578001",
      6: "https://vimeo.com/1074712694",
  };

  document.querySelectorAll(".work-item").forEach(item => {
    const id = item.dataset.id;
    const button = item.querySelector(".work-btn");
    button.addEventListener("click", e => {
      e.preventDefault();
      if (projectLinks[id]) {
        window.open(projectLinks[id], "_blank");
      } else {
        alert("Video link not available.");
      }
    });
  });

  // --- Hamburger Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Auto-close nav when clicking a link
  navItems.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
