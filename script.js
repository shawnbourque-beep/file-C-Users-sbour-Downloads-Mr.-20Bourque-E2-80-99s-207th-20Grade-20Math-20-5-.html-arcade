// Quick Math Game
function startQuickMath() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'block';
    
    let score = 0;
    let timeLeft = 60;
    let gameActive = true;
    
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '';
    
    const scoreDisplay = document.createElement('div');
    scoreDisplay.style.cssText = 'font-size: 1.3rem; margin-bottom: 1rem; color: #667eea; font-weight: bold;';
    scoreDisplay.id = 'scoreDisplay';
    
    const timerDisplay = document.createElement('div');
    timerDisplay.style.cssText = 'font-size: 1.3rem; margin-bottom: 1rem; color: #764ba2; font-weight: bold;';
    timerDisplay.id = 'timerDisplay';
    
    const questionDiv = document.createElement('div');
    questionDiv.id = 'question';
    questionDiv.style.cssText = 'font-size: 2rem; margin: 2rem 0; color: #333; font-weight: bold;';
    
    const inputDiv = document.createElement('div');
    inputDiv.style.cssText = 'display: flex; gap: 1rem; justify-content: center;';
    
    const answerInput = document.createElement('input');
    answerInput.type = 'number';
    answerInput.id = 'answerInput';
    answerInput.placeholder = 'Your answer';
    answerInput.style.cssText = 'padding: 0.8rem; font-size: 1.1rem; width: 150px; border: 2px solid #667eea; border-radius: 5px;';
    
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.style.cssText = 'padding: 0.8rem 1.5rem; font-size: 1.1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;';
    submitBtn.onclick = checkAnswer;
    
    gameArea.appendChild(scoreDisplay);
    gameArea.appendChild(timerDisplay);
    gameArea.appendChild(questionDiv);
    gameArea.appendChild(inputDiv);
    inputDiv.appendChild(answerInput);
    inputDiv.appendChild(submitBtn);
    
    // Generate first question
    generateQuestion();
    
    // Timer
    const timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            gameActive = false;
            answerInput.disabled = true;
            submitBtn.disabled = true;
            gameArea.innerHTML = `
                <div style="text-align: center;">
                    <h3 style="color: #667eea; margin-bottom: 1rem;">Game Over!</h3>
                    <p style="font-size: 2rem; color: #764ba2; font-weight: bold; margin-bottom: 1rem;">Final Score: ${score}</p>
                    <button onclick="closeGame()" style="padding: 0.8rem 2rem; font-size: 1rem; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">Close</button>
                </div>
            `;
        }
    }, 1000);
    
    function generateQuestion() {
        const num1 = Math.floor(Math.random() * 20) + 1;
        const num2 = Math.floor(Math.random() * 20) + 1;
        const operation = ['+', '-', '*'][Math.floor(Math.random() * 3)];
        
        document.getElementById('question').textContent = `${num1} ${operation} ${num2} = ?`;
        
        let correctAnswer;
        if (operation === '+') correctAnswer = num1 + num2;
        else if (operation === '-') correctAnswer = num1 - num2;
        else correctAnswer = num1 * num2;
        
        document.getElementById('question').dataset.answer = correctAnswer;
    }
    
    function checkAnswer() {
        if (!gameActive) return;
        
        const userAnswer = parseInt(document.getElementById('answerInput').value);
        const correctAnswer = parseInt(document.getElementById('question').dataset.answer);
        
        if (userAnswer === correctAnswer) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            generateQuestion();
            answerInput.value = '';
            answerInput.focus();
        } else {
            answerInput.style.borderColor = '#ff6b6b';
            setTimeout(() => {
                answerInput.style.borderColor = '#667eea';
            }, 300);
        }
    }
    
    // Allow Enter key to submit
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkAnswer();
    });
    
    answerInput.focus();
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time: ${timeLeft}s`;
}

function closeGame() {
    document.getElementById('gameModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card, .game-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
