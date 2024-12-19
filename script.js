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
        { date: 4, month: "JAN", title: "Heart Strings", link: "#", img: "/img/koncertbillede1.png" },
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


const questions = [
    {
        text: "Hvilken slags stemning leder du efter i musik?",
        options: {
            rock: "Høj energi",
            jazz: "Rolig",
            pop: "Fængende",
            electronic: "Eksperimentel",
            classical: "Tidløst"
        }
    },
    {
        text: "Hvilket instrument er din favorit?",
        options: {
            rock: "Guitar",
            jazz: "Saxofon",
            pop: "Vokal",
            electronic: "Synthesizer",
            classical: "Klaver"
        }
    },
    {
        text: "Hvilken slags spillested foretrækker du til liveoptrædener?",
        options: {
            rock: "Stadion",
            jazz: "Jazzklub",
            pop: "Arena",
            electronic: "Lagerbygning",
            classical: "Koncertsal"
        }
    },
    {
        text: "Hvilket energiniveau foretrækker du i musik?",
        options: {
            rock: "Højt",
            jazz: "Blødt",
            pop: "Opbeat",
            electronic: "Dynamisk",
            classical: "Roligt"
        }
    },
    {
        text: "Hvem ville du tage til en koncert med?",
        options: {
            rock: "Venner",
            jazz: "Alene",
            pop: "En date",
            electronic: "Dansehold",
            classical: "For mig selv"
        }
    }
];

const genres = { rock: 0, jazz: 0, pop: 0, electronic: 0, classical: 0 };
let currentQuestionIndex = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");

// Load the next question
function loadQuestion(index) {
    const question = questions[index];
    questionContainer.innerHTML = `
        <div class="question">
            <p>${question.text}</p>
            ${Object.entries(question.options).map(
                ([key, value]) =>
                    `<button class="answer" data-value="${key}">${value}</button>`
            ).join('')}
        </div>
    `;
    document.querySelectorAll(".answer").forEach(button => {
        button.addEventListener("click", selectAnswer);
    });
    nextButton.style.display = "none";
}

// Handle answer selection
function selectAnswer(event) {
    const value = event.target.dataset.value;

    // Add points based on the question index
    if (currentQuestionIndex === 0) {
        genres[value] += 3; // First question gives 3 points
    } else {
        genres[value] += 2; // All other questions give 2 points
    }

    // Update button visuals
    document.querySelectorAll(".answer").forEach(button => {
        button.classList.remove("selected");
    });
    event.target.classList.add("selected");

    // Show the next button
    nextButton.style.display = "block";
}

// Go to the next question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
    } else {
        showResult();
    }
});

// Show the result
function showResult() {
    const maxGenre = Object.keys(genres).reduce((a, b) =>
        genres[a] > genres[b] ? a : b
    );

    const genreDetails = {
        rock: {
            title: "Rock",
            image: "/img/Kunstner1.png",
            links: ["Band 1", "Band 2", "Band 3"]
        },
        jazz: {
            title: "Jazz",
            image: "/img/Kunstner2.png",
            links: ["Artist 1", "Artist 2", "Artist 3"]
        },
        pop: {
            title: "Pop",
            image: "/img/Kunstner3.png",
            links: ["Singer 1", "Singer 2", "Singer 3"]
        },
        electronic: {
            title: "Elektronisk",
            image: "/img/Synthwave.png",
            links: ["DJ 1", "DJ 2", "DJ 3"]
        },
        classical: {
            title: "Klassisk",
            image: "/img/KoncertBillede1.png",
            links: ["Komponist 1", "Komponist 2", "Komponist 3"]
        }
    };

    const result = genreDetails[maxGenre];

    const quizContainer = document.getElementById("quiz-container");

    quizContainer.innerHTML = `
        <div id="result-container">
            <h1>Din Genre: ${result.title}</h1>
            <img src="${result.image}" alt="${result.title}" style="width: 100%; max-width: 300px; border-radius: 10px; margin-bottom: 20px;">
            <div id="links">
                ${result.links.map(link => `<a href="#" class="result-link">${link}</a>`).join('')}
            </div>
        </div>
    `;
}

loadQuestion(0);