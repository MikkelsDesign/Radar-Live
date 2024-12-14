// script.js
const questions = [
    {
        text: "What kind of vibe do you look for in music?",
        options: {
            rock: "High energy",
            jazz: "Mellow",
            pop: "Catchy",
            electronic: "Experimental",
            classical: "Timeless"
        }
    },
    {
        text: "What’s your favorite instrument?",
        options: {
            rock: "Guitar",
            jazz: "Saxophone",
            pop: "Vocals",
            electronic: "Synthesizer",
            classical: "Piano"
        }
    },
    {
        text: "What kind of venue do you prefer for live performances?",
        options: {
            rock: "Stadium",
            jazz: "Jazz club",
            pop: "Arena",
            electronic: "Warehouse",
            classical: "Concert hall"
        }
    },
    {
        text: "What’s your preferred energy level in music?",
        options: {
            rock: "Loud",
            jazz: "Smooth",
            pop: "Upbeat",
            electronic: "Dynamic",
            classical: "Calm"
        }
    },
    {
        text: "Who would you want to go to a concert with?",
        options: {
            rock: "Friends",
            jazz: "Solo",
            pop: "Date",
            electronic: "Dance Crew",
            classical: "Alone"
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
    genres[value]++;
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
            image: "rock.jpg",
            links: ["Band 1", "Band 2", "Band 3"]
        },
        jazz: {
            title: "Jazz",
            image: "jazz.jpg",
            links: ["Artist 1", "Artist 2", "Artist 3"]
        },
        pop: {
            title: "Pop",
            image: "pop.jpg",
            links: ["Singer 1", "Singer 2", "Singer 3"]
        },
        electronic: {
            title: "Electronic",
            image: "electronic.jpg",
            links: ["DJ 1", "DJ 2", "DJ 3"]
        },
        classical: {
            title: "Classical",
            image: "classical.jpg",
            links: ["Composer 1", "Composer 2", "Composer 3"]
        }
    };

    const result = genreDetails[maxGenre];
    document.body.innerHTML = `
        <div id="result-container">
            <h1>Your Genre: ${result.title}</h1>
            <img src="${result.image}" alt="${result.title}" style="width: 100%; border-radius: 10px;">
            <div id="links">
                ${result.links.map(link => `<a href="#" class="result-link">${link}</a>`).join('')}
            </div>
        </div>
    `;
}
loadQuestion(0);