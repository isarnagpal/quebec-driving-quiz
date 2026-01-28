// Enhanced Progress Tracking System for Quebec Driving Quiz
// Features: Carry-over, daily targets, smart review, study recommendations

class ProgressTracker {
    constructor() {
        this.storageKey = 'quebecDrivingProgress';
        this.loadProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.data = JSON.parse(saved);
        } else {
            this.data = this.getDefaultProgress();
        }
        this.ensureCurrentDay();
    }

    getDefaultProgress() {
        return {
            startDate: new Date().toISOString().split('T')[0],
            currentDay: 1,
            totalQuestions: 0,
            totalCorrect: 0,
            dailyTarget: 60,
            
            // Daily tracking
            today: {
                date: new Date().toISOString().split('T')[0],
                questionsAnswered: 0,
                correct: 0,
                carryOverFromPrevious: 0
            },
            
            // Question history: questionId -> { attempts, correct, lastSeen }
            questionHistory: {},
            
            // Topic accuracy
            topicStats: {
                'road-signs': { answered: 0, correct: 0 },
                'traffic-rules': { answered: 0, correct: 0 },
                'safe-driving': { answered: 0, correct: 0 }
            },
            
            // Weak areas: questions that need review
            reviewQueue: [], // questionIds that need review
            strugglingQuestions: [], // questionIds failed 2+ times
            
            // Missed quiz tracking
            missedQuizzes: 0,
            carryOverQuestions: 0,
            
            // History by date
            dailyHistory: []
        };
    }

    ensureCurrentDay() {
        const today = new Date().toISOString().split('T')[0];
        if (this.data.today.date !== today) {
            // New day - save yesterday's data and reset
            this.data.dailyHistory.push({
                date: this.data.today.date,
                questionsAnswered: this.data.today.questionsAnswered,
                correct: this.data.today.correct,
                target: this.data.dailyTarget,
                completed: this.data.today.questionsAnswered >= this.data.dailyTarget
            });
            
            // Calculate carry-over
            const shortfall = Math.max(0, this.data.dailyTarget - this.data.today.questionsAnswered);
            if (shortfall > 0) {
                this.data.carryOverQuestions += shortfall;
                this.data.missedQuizzes++;
            }
            
            // Reset for new day
            this.data.today = {
                date: today,
                questionsAnswered: 0,
                correct: 0,
                carryOverFromPrevious: this.data.carryOverQuestions
            };
            this.data.currentDay++;
            this.save();
        }
    }

    recordAnswer(questionId, topic, correct) {
        // Update question history
        if (!this.data.questionHistory[questionId]) {
            this.data.questionHistory[questionId] = {
                attempts: 0,
                correctCount: 0,
                lastSeen: null,
                topic: topic
            };
        }
        
        const qHistory = this.data.questionHistory[questionId];
        qHistory.attempts++;
        if (correct) {
            qHistory.correctCount++;
        }
        qHistory.lastSeen = new Date().toISOString();
        
        // Update topic stats
        if (this.data.topicStats[topic]) {
            this.data.topicStats[topic].answered++;
            if (correct) {
                this.data.topicStats[topic].correct++;
            }
        }
        
        // Update daily stats
        this.data.today.questionsAnswered++;
        if (correct) {
            this.data.today.correct++;
        }
        this.data.totalQuestions++;
        if (correct) {
            this.data.totalCorrect++;
        }
        
        // Manage review queue
        if (!correct) {
            if (!this.data.reviewQueue.includes(questionId)) {
                this.data.reviewQueue.push(questionId);
            }
            
            // Check if struggling with this question
            if (qHistory.attempts >= 2 && qHistory.correctCount === 0) {
                if (!this.data.strugglingQuestions.includes(questionId)) {
                    this.data.strugglingQuestions.push(questionId);
                }
            }
        } else {
            // Remove from review queue if answered correctly
            const reviewIndex = this.data.reviewQueue.indexOf(questionId);
            if (reviewIndex > -1) {
                this.data.reviewQueue.splice(reviewIndex, 1);
            }
        }
        
        // Reduce carry-over count if we had any
        if (this.data.carryOverQuestions > 0) {
            this.data.carryOverQuestions--;
        }
        
        this.save();
    }

    getDailyProgress() {
        const target = this.data.dailyTarget + this.data.today.carryOverFromPrevious;
        const answered = this.data.today.questionsAnswered;
        const remaining = Math.max(0, target - answered);
        
        return {
            answered,
            target,
            remaining,
            percentComplete: target > 0 ? Math.round((answered / target) * 100) : 0,
            carryOver: this.data.today.carryOverFromPrevious
        };
    }

    getTopicAccuracy(topic) {
        const stats = this.data.topicStats[topic];
        if (!stats || stats.answered === 0) return null;
        return Math.round((stats.correct / stats.answered) * 100);
    }

    getWeakTopics() {
        const weakTopics = [];
        for (const [topic, stats] of Object.entries(this.data.topicStats)) {
            if (stats.answered >= 5) { // At least 5 questions to judge
                const accuracy = (stats.correct / stats.answered) * 100;
                if (accuracy < 70) {
                    weakTopics.push({
                        topic,
                        accuracy: Math.round(accuracy),
                        questionsAnswered: stats.answered
                    });
                }
            }
        }
        return weakTopics;
    }

    shouldShowStudyRecommendation(questionId) {
        return this.data.strugglingQuestions.includes(questionId);
    }

    getReviewQuestions() {
        return this.data.reviewQueue;
    }

    isDailyTargetComplete() {
        const progress = this.getDailyProgress();
        return progress.remaining === 0;
    }

    save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    getStats() {
        return {
            currentDay: this.data.currentDay,
            totalQuestions: this.data.totalQuestions,
            totalCorrect: this.data.totalCorrect,
            overallAccuracy: this.data.totalQuestions > 0 
                ? Math.round((this.data.totalCorrect / this.data.totalQuestions) * 100) 
                : 0,
            dailyProgress: this.getDailyProgress(),
            topicStats: this.data.topicStats,
            weakTopics: this.getWeakTopics(),
            reviewQueueSize: this.data.reviewQueue.length,
            strugglingQuestionsCount: this.data.strugglingQuestions.length
        };
    }
}

// Export for use in quiz
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgressTracker;
}
