document.addEventListener("DOMContentLoaded", function() {
    anime({
        targets: '.title, .description, button, .back',
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(200),
        duration: 1000,
        easing: 'easeOutQuad'
    });
});

function redirectToDownload() {
    window.location.href = "download.html";
}
