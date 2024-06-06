document.addEventListener("DOMContentLoaded", function() {
    const slides = document.querySelectorAll(".hero-slide");
    let currentSlide = 0;
    const intervalTime = 5000; // 5 seconds

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, intervalTime)})