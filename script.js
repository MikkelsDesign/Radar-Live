function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", () => {
    const calendar = document.getElementById("calendar");
    const events = [
        { date: 22, month: "DEC", title: "Experimental Jazz Night", link: "#", img:"/img/Kunstner2.png" },
        { date: 24, month: "DEC", title: "Indie Rock Fest", link: "#", img: "/img/Kunstner1.png" },
        { date: 28, month: "DEC", title: "Synthwave Aften", link: "#", img: "/img/Synthwave.png" },
        { date: 30, month: "DEC", title: "Ambient Soundscapes", link: "#", img: "/img/Billede1.png" },
        { date: 4, month: "JAN", title: "Heart Strings", link: "#", img: "/img/KoncertBillede1.png" },
        { date: 11, month: "JAN", title: "Six Feet High", link: "#", img: "/img/Kunstner3.png" },
        { date: 14, month: "JAN", title: "Rock Alive", link: "#", img: "/img/Koncertbillede2.png" }
    ];

    function generateEvents() {
        events.forEach(event => {
            const card = document.createElement("div");
            card.classList.add("event-card");

            card.innerHTML = `
                <div class="event-details">
                    <div class="date">${event.date}</div>
                    <div class="month">${event.month}</div>
                    <h3 class="event-title">${event.title}</h3>
                </div>
                <img src="${event.img}" alt="${event.title}" class="event-image">
                <a href="${event.link}" class="event-button">Vis Event</a>
            `;
            calendar.appendChild(card);
        });
    }

    generateEvents();
});