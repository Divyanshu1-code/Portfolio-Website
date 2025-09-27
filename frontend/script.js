// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {

  // Dark Mode Toggle
  const toggleBtn = document.getElementById("darkModeToggle");
  const body = document.body;

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    // Toggle icon
    if(body.classList.contains("dark")){
      toggleBtn.textContent = "☀️";
    } else {
      toggleBtn.textContent = "🌙";
    }
  });

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      name: contactForm.name.value,
      email: contactForm.email.value,
      message: contactForm.message.value
    };
    try {
      const res = await fetch("http://localhost:5000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      alert(data.message);
      contactForm.reset();
    } catch(err) {
      alert("Failed to send message. Try again later.");
    }
  });

});
