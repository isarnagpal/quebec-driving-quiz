// Enhanced Quiz with Progress Tracking, Carry-over, and Smart Review
// Import ProgressTracker (loaded via script tag)
let tracker;
let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let hasAnsweredCurrent = false;
let currentQuestions = []; // Current session's questions
let reviewMode = false;

// Initialize quiz
function initQuiz() {
    tracker = new ProgressTracker();
    
    // Check daily progress
    const dailyProgress = tracker.getDailyProgress();
    
    // Load questions for this session
    loadQuestions();
    
    // Display initial question
    displayQuestion();
    
    // Update all UI elements
    updateAllStats();
    
    // Show daily progress banner
    showDailyProgressBanner();
}

// Load questions for current session (mix of new + review)
function loadQuestions() {
    currentQuestions = [];
    const reviewQueue = tracker.getReviewQuestions();
    
    // Add review questions first (up to 5)
    const reviewToAdd = reviewQueue.slice(0, Math.min(5, reviewQueue.length));
    reviewToAdd.forEach(questionId => {
        const question = questions.find(q => q.id === questionId);
        if (question) {
            currentQuestions.push(question);
        }
    });
    
    // Add new questions to reach 10 total
    const remainingSlots = 10 - currentQuestions.length;
    const newQuestions = questions
        .filter(q => !reviewQueue.includes(q.id))
        .sort(() => Math.random() - 0.5) // Shuffle
        .slice(0, remainingSlots);
    
    currentQuestions.push(...newQuestions);
    
    // Shuffle final array
    currentQuestions = currentQuestions.sort(() => Math.random() - 0.5);
}

// Display current question
function displayQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showSessionComplete();
        return;
    }
    
    const question = currentQuestions[currentQuestionIndex];
    hasAnsweredCurrent = false;
    selectedAnswer = null;
    
    // Update question number
    document.getElementById('questionNumber').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = currentQuestions.length;
    
    // Update question text
    document.getElementById('questionText').textContent = question.question;
    
    // Display image if present
    const imageContainer = document.getElementById('questionImage');
    if (question.image) {
        imageContainer.innerHTML = `<img src="${question.image}" alt="Question image" class="img-fluid mb-3" style="max-height: 300px;">`;
        imageContainer.style.display = 'block';
    } else {
        imageContainer.style.display = 'none';
    }
    
    // Display answers
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    const answers = question.answers || question.options || [];
    answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary btn-lg w-100 mb-2 answer-btn';
        button.textContent = answer;
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });
    
    // Reset buttons
    document.getElementById('submitBtn').style.display = 'block';
    document.getElementById('submitBtn').disabled = true;
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('feedback').style.display = 'none';
    
    // Show study recommendation if struggling with this question
    if (tracker.shouldShowStudyRecommendation(question.id)) {
        showStudyRecommendation(question);
    }
}

// Select an answer
function selectAnswer(index) {
    if (hasAnsweredCurrent) return;
    
    selectedAnswer = index;
    
    // Update button states
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((btn, idx) => {
        if (idx === index) {
            btn.classList.remove('btn-outline-primary');
            btn.classList.add('btn-primary');
        } else {
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline-primary');
        }
    });
    
    document.getElementById('submitBtn').disabled = false;
}

// Submit answer
function submitAnswer() {
    if (selectedAnswer === null || hasAnsweredCurrent) return;
    
    const question = currentQuestions[currentQuestionIndex];
    
    // Determine the correct answer index
    let correctIndex;
    if (typeof question.correct === 'number') {
        // If correct answer is already an index
        correctIndex = question.correct;
    } else if (typeof question.correct === 'string') {
        // If correct answer is a letter (A, B, C, D)
        correctIndex = question.correct.charCodeAt(0) - 'A'.charCodeAt(0);
    }
    
    const correct = selectedAnswer === correctIndex;
    hasAnsweredCurrent = true;
    
    // Record in progress tracker
    const topic = question.topic || question.section?.toLowerCase().replace(/ /g, '-') || 'general';
    tracker.recordAnswer(question.id, topic, correct);
    
    // Update local stats
    if (correct) score++;
    
    // Show feedback
    const feedbackEl = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedbackText');
    
    // Get the answers array (could be 'answers' or 'options')
    const answersArray = question.answers || question.options || [];
    
    if (correct) {
        feedbackEl.className = 'alert alert-success';
        feedbackText.textContent = '✅ Correct! ' + (question.explanation || '');
    } else {
        feedbackEl.className = 'alert alert-danger';
        const correctAnswer = answersArray[correctIndex];
        feedbackText.textContent = `❌ Incorrect. The correct answer is: ${correctAnswer}. ${question.explanation || ''}`;
        
        // Show study recommendation if this is second failure
        const qHistory = tracker.data.questionHistory[question.id];
        if (qHistory && qHistory.attempts >= 2 && qHistory.correctCount === 0) {
            feedbackText.textContent += '\n\n📚 This question needs review - check the handbook!';
        }
    }
    
    feedbackEl.style.display = 'block';
    
    // Update button states
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((btn, idx) => {
        btn.disabled = true;
        if (idx === correctIndex) {
            btn.classList.remove('btn-outline-primary', 'btn-primary');
            btn.classList.add('btn-success');
        } else if (idx === selectedAnswer && !correct) {
            btn.classList.remove('btn-outline-primary', 'btn-primary');
            btn.classList.add('btn-danger');
        }
    });
    
    // Show next button
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'block';
    
    // Update all stats
    updateAllStats();
}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

// Update all statistics displays
function updateAllStats() {
    const stats = tracker.getStats();
    const dailyProgress = tracker.getDailyProgress();
    
    // Update current session stats
    document.getElementById('currentScore').textContent = score;
    document.getElementById('currentAnswered').textContent = currentQuestionIndex;
    
    // Update daily progress
    updateDailyProgressBar(dailyProgress);
    
    // Update overall stats
    document.getElementById('overallAccuracy').textContent = stats.overallAccuracy + '%';
    document.getElementById('totalQuestionsAnswered').textContent = stats.totalQuestions;
    
    // Update topic accuracies
    updateTopicAccuracies(stats.topicStats);
    
    // Show weak topics if any
    showWeakTopics(stats.weakTopics);
}

// Update daily progress bar
function updateDailyProgressBar(progress) {
    const progressBar = document.getElementById('dailyProgressBar');
    const progressText = document.getElementById('dailyProgressText');
    
    if (progressBar && progressText) {
        const percent = progress.percentComplete;
        progressBar.style.width = percent + '%';
        progressBar.textContent = percent + '%';
        progressText.textContent = `${progress.answered}/${progress.target} questions today`;
        
        if (progress.carryOver > 0) {
            progressText.textContent += ` (includes ${progress.carryOver} carry-over)`;
        }
        
        // Change color based on progress
        progressBar.className = 'progress-bar';
        if (percent >= 100) {
            progressBar.classList.add('bg-success');
        } else if (percent >= 70) {
            progressBar.classList.add('bg-info');
        } else if (percent >= 40) {
            progressBar.classList.add('bg-warning');
        } else {
            progressBar.classList.add('bg-danger');
        }
    }
}

// Update topic accuracies
function updateTopicAccuracies(topicStats) {
    for (const [topic, stats] of Object.entries(topicStats)) {
        const accuracy = stats.answered > 0 ? Math.round((stats.correct / stats.answered) * 100) : 0;
        const el = document.getElementById(`${topic}-accuracy`);
        if (el) {
            el.textContent = `${accuracy}% (${stats.answered} questions)`;
        }
    }
}

// Show weak topics
function showWeakTopics(weakTopics) {
    const container = document.getElementById('weakTopicsContainer');
    if (!container) return;
    
    if (weakTopics.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.style.display = 'block';
    const list = document.getElementById('weakTopicsList');
    list.innerHTML = '';
    
    weakTopics.forEach(topic => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `<strong>${topic.topic.replace('-', ' ').toUpperCase()}</strong>: ${topic.accuracy}% accuracy (${topic.questionsAnswered} questions) - Review recommended!`;
        list.appendChild(li);
    });
}

// Show study recommendation
function showStudyRecommendation(question) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-warning mb-3';
    alert.innerHTML = `
        <strong>📚 Study Recommendation:</strong> You've struggled with this question before. 
        Take a moment to review the relevant section in the handbook before answering.
    `;
    document.getElementById('questionContainer').prepend(alert);
}

// Show daily progress banner
function showDailyProgressBanner() {
    const dailyProgress = tracker.getDailyProgress();
    const banner = document.getElementById('dailyBanner');
    
    if (!banner) return;
    
    if (dailyProgress.remaining > 0) {
        banner.className = 'alert alert-info';
        banner.innerHTML = `
            <strong>Today's Target:</strong> ${dailyProgress.remaining} questions remaining 
            (${dailyProgress.answered}/${dailyProgress.target} complete)
        `;
    } else {
        banner.className = 'alert alert-success';
        banner.innerHTML = `
            <strong>🎉 Daily Target Complete!</strong> You've finished today's ${dailyProgress.target} questions!
        `;
    }
}

// Show session complete
function showSessionComplete() {
    const stats = tracker.getStats();
    const accuracy = currentQuestions.length > 0 ? Math.round((score / currentQuestions.length) * 100) : 0;
    
    document.getElementById('questionContainer').innerHTML = `
        <div class="text-center">
            <h2>Session Complete! 🎉</h2>
            <div class="card mt-4">
                <div class="card-body">
                    <h4>Session Results:</h4>
                    <p class="lead">Score: ${score}/${currentQuestions.length} (${accuracy}%)</p>
                    
                    <hr>
                    
                    <h4>Daily Progress:</h4>
                    <div class="progress mb-3" style="height: 30px;">
                        <div id="finalProgressBar" class="progress-bar"></div>
                    </div>
                    <p id="finalProgressText"></p>
                    
                    ${stats.dailyProgress.remaining > 0 ? `
                        <div class="alert alert-warning">
                            <strong>⚠️ ${stats.dailyProgress.remaining} questions remaining today!</strong><br>
                            Take another quiz to reach your daily target of ${stats.dailyProgress.target} questions.
                        </div>
                    ` : `
                        <div class="alert alert-success">
                            <strong>✅ Daily target achieved!</strong><br>
                            Great work! You've completed ${stats.dailyProgress.target} questions today.
                        </div>
                    `}
                    
                    ${stats.weakTopics.length > 0 ? `
                        <div class="alert alert-info">
                            <strong>📚 Areas to Review:</strong><br>
                            ${stats.weakTopics.map(t => t.topic.replace('-', ' ').toUpperCase() + ` (${t.accuracy}%)`).join(', ')}
                        </div>
                    ` : ''}
                    
                    <button class="btn btn-primary btn-lg mt-3" onclick="location.reload()">
                        Start Another Quiz
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Update final progress bar
    updateDailyProgressBar(stats.dailyProgress);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initQuiz);
