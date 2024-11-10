document.addEventListener("DOMContentLoaded", () => {

    // Get the button
    const backToTopBtn = document.getElementById("scroll-top-btn");

    // Show the button when the user scrolls down 100px from the top of the document
    window.onscroll = function () {
        toggleBackToTopBtn();
    };

    function toggleBackToTopBtn() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Smooth scrolling
    });
}