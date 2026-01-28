// Quiz state management
let currentQuestionIndex = 0;
let score = 0;
let answered = 0;
let selectedAnswer = null;
let hasAnsweredCurrent = false;

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('quizProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        currentQuestionIndex = progress.currentIndex || 0;
        score = progress.score || 0;
        answered = progress.answered || 0;
    }
}

// Save progress to localStorage
function saveProgress() {
    const progress = {
        currentIndex: currentQuestionIndex,
        score: score,
        answered: answered,
        lastUpdated: new Date().toISOString()
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));
}

// Initialize quiz
function initQuiz() {
    loadProgress();
    document.getElementById('totalQuestions').textContent = questions.length;
    displayQuestion();
    updateStats();
}

// Display current question
function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showCompletion();
        return;
    }
    
    const question = questions[currentQuestionIndex];
    hasAnsweredCurrent = false;
    selectedAnswer = null;
    
    // Update question text
    document.getElementById('questionText').textContent = question.question;
    
    // Update section name
    document.getElementById('sectionName').textContent = question.section || 'Road Signs';
    document.getElementById('dailyProgress').textContent = `Question ${currentQuestionIndex + 1}`;
    
    // Handle image
    const imgElement = document.getElementById('questionImage');
    if (question.image) {
        imgElement.src = question.image;
        imgElement.style.display = 'block';
    } else {
        imgElement.style.display = 'none';
    }
    
    // Display options
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectOption(index);
        optionDiv.dataset.index = index;
        container.appendChild(optionDiv);
    });
    
    // Hide explanation
    document.getElementById('explanation').classList.remove('show');
    
    // Update buttons
    document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
    document.getElementById('nextBtn').disabled = true;
    
    updateStats();
}

// Select an option
function selectOption(index) {
    if (hasAnsweredCurrent) return;
    
    selectedAnswer = index;
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Disable all options
    options.forEach(opt => opt.classList.add('disabled'));
    
    // Mark correct and incorrect
    const correctIndex = question.options.findIndex(opt => opt.startsWith(question.correct));
    
    options[index].classList.add(index === correctIndex ? 'correct' : 'incorrect');
    if (index !== correctIndex) {
        options[correctIndex].classList.add('correct');
    }
    
    // Update score
    hasAnsweredCurrent = true;
    answered++;
    if (index === correctIndex) {
        score++;
    }
    
    // Show explanation
    const explanationDiv = document.getElementById('explanation');
    document.getElementById('explanationText').textContent = question.explanation;
    explanationDiv.classList.add('show');
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
    
    updateStats();
    saveProgress();
}

// Go to next question
function nextQuestion() {
    if (!hasAnsweredCurrent) return;
    
    currentQuestionIndex++;
    displayQuestion();
}

// Go to previous question
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Update statistics display
function updateStats() {
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('correctCount').textContent = score;
    
    const accuracy = answered > 0 ? Math.round((score / answered) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy + '%';
    
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// Show completion screen
function showCompletion() {
    document.getElementById('quizContent').style.display = 'none';
    
    const completion = document.getElementById('completion');
    completion.classList.add('show');
    
    document.getElementById('finalAnswered').textContent = answered;
    document.getElementById('finalCorrect').textContent = score;
    
    const finalAccuracy = answered > 0 ? Math.round((score / answered) * 100) : 0;
    document.getElementById('finalAccuracy').textContent = finalAccuracy + '%';
}

// Restart quiz
function restartQuiz() {
    if (confirm('Are you sure you want to restart? This will reset your progress.')) {
        currentQuestionIndex = 0;
        score = 0;
        answered = 0;
        localStorage.removeItem('quizProgress');
        
        document.getElementById('completion').classList.remove('show');
        document.getElementById('quizContent').style.display = 'block';
        
        displayQuestion();
        updateStats();
    }
}

// Initialize on page load
window.onload = initQuiz;
