
function updateClock() {
    const clockElement = document.getElementById("clock");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clockElement.textContent = `Saat: ${hours}:${minutes}:${seconds}`;
}

window.onload = function () {
    updateClock();
    setInterval(updateClock, 1000);
};

function toggleBio() {
    const fullBio = document.querySelector(".long-bio");
    const toggleButton = document.getElementById("toggle-button");

    if (fullBio.style.display === "none" || fullBio.style.display === "") {
        fullBio.style.display = "block";
        toggleButton.innerText = "Daha Az Gör";
    } else {
        fullBio.style.display = "none";
        toggleButton.innerText = "Daha Fazla Gör";
    }
}
function filterProjects(type) {
    const projects = document.querySelectorAll('.project-container');

    projects.forEach(project => {
        if (project.getAttribute('data-type') === type) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
}