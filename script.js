const flashcards = [];
let current = 0;

function addFlashcard() {
  const q = document.getElementById("question").value;
  const a = document.getElementById("answer").value;
  if (q && a) {
    flashcards.push({question: q, answer: a});
    alert("Fiszka dodana!");
    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
  }
}

function startLearning() {
  if (flashcards.length === 0) {
    alert("Brak fiszek do nauki!");
    return;
  }
  current = 0;
  document.getElementById("learn-section").style.display = "block";
  showCard();
}

function showCard() {
  document.getElementById("flashcard-question").innerText = flashcards[current].question;
  document.getElementById("flashcard-answer").style.display = "none";
  document.getElementById("flashcard-answer").innerText = flashcards[current].answer;
}

function showAnswer() {
  document.getElementById("flashcard-answer").style.display = "block";
}

function nextCard() {
  current++;
  if (current < flashcards.length) {
    showCard();
  } else {
    alert("Gratulacje! Przerobiłeś wszystkie fiszki.");
    document.getElementById("learn-section").style.display = "none";
  }
}
