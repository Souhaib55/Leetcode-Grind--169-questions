// State Management
let completedProblems = new Set();
let currentFilter = 'all';
let activeDifficulties = new Set(['easy', 'medium', 'hard']);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    renderTopicsOverview();
    renderProblems();
    setupEventListeners();
    updateLastUpdated();
    updateGlobalProgress();
});

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('leetcode-progress');
    if (saved) {
        completedProblems = new Set(JSON.parse(saved));
    }
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('leetcode-progress', JSON.stringify([...completedProblems]));
}

// Update global progress bar
function updateGlobalProgress() {
    const totalProblems = Object.values(problemsData).reduce((sum, problems) => sum + problems.length, 0);
    const solvedCount = completedProblems.size;
    const percentage = Math.round((solvedCount / totalProblems) * 100);
    
    document.getElementById('totalSolved').textContent = solvedCount;
    document.getElementById('totalProblems').textContent = totalProblems;
    document.getElementById('overallPercentage').textContent = percentage;
    document.getElementById('overallProgressBar').style.width = `${percentage}%`;
}

// Render topics overview cards
function renderTopicsOverview() {
    const grid = document.getElementById('topicsGrid');
    grid.innerHTML = '';
    
    Object.keys(problemsData).forEach((topic, index) => {
        const problems = problemsData[topic];
        const totalCount = problems.length;
        const solvedCount = problems.filter(p => completedProblems.has(`${topic}-${p.id}`)).length;
        const percentage = Math.round((solvedCount / totalCount) * 100);
        
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.style.animationDelay = `${index * 0.05}s`;
        card.innerHTML = `
            <div class="topic-header">
                <span class="topic-name">${topicEmojis[topic] || '📌'} ${topic}</span>
                <span class="topic-count">${totalCount}</span>
            </div>
            <div class="topic-progress">
                <div class="topic-progress-text">
                    <span>${solvedCount} / ${totalCount}</span>
                    <span>${percentage}%</span>
                </div>
                <div class="topic-progress-bar">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            document.getElementById(`category-${topic.replace(/\s+/g, '-')}`).scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
        
        grid.appendChild(card);
    });
}

// Render all problem tables
function renderProblems() {
    const section = document.getElementById('problemsSection');
    section.innerHTML = '';
    
    Object.keys(problemsData).forEach(topic => {
        const problems = problemsData[topic];
        const categoryDiv = createProblemCategory(topic, problems);
        section.appendChild(categoryDiv);
    });
}

// Create a problem category section
function createProblemCategory(topic, problems) {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'problem-category';
    categoryDiv.id = `category-${topic.replace(/\s+/g, '-')}`;
    
    const solvedCount = problems.filter(p => completedProblems.has(`${topic}-${p.id}`)).length;
    const totalCount = problems.length;
    
    categoryDiv.innerHTML = `
        <div class="category-header" onclick="toggleCategory('${topic.replace(/\s+/g, '-')}')">
            <div class="category-title">
                <h2 class="category-name">${topicEmojis[topic] || '📌'} ${topic}</h2>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="category-stats">
                <span>${solvedCount} / ${totalCount} completed</span>
            </div>
        </div>
        <div class="problems-table-wrapper" id="table-${topic.replace(/\s+/g, '-')}">
            <table class="problems-table">
                <thead>
                    <tr>
                        <th style="width: 60px;">#</th>
                        <th>Problem</th>
                        <th style="width: 150px;">Difficulty</th>
                        <th style="width: 100px;">Time</th>
                        <th style="width: 100px;">Link</th>
                        <th style="width: 80px;">Done</th>
                    </tr>
                </thead>
                <tbody>
                    ${problems.map(problem => createProblemRow(topic, problem)).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    return categoryDiv;
}

// Create a problem row
function createProblemRow(topic, problem) {
    const problemId = `${topic}-${problem.id}`;
    const isCompleted = completedProblems.has(problemId);
    const difficultyEmoji = problem.difficulty === 'easy' ? '🟢' : problem.difficulty === 'medium' ? '🟡' : '🔴';
    const shouldHide = !shouldShowProblem(problem, isCompleted);
    
    return `
        <tr class="${isCompleted ? 'completed' : ''} problem-row" 
            data-difficulty="${problem.difficulty}" 
            data-completed="${isCompleted}"
            style="${shouldHide ? 'display: none;' : ''}">
            <td>${problem.id}</td>
            <td><strong>${problem.name}</strong></td>
            <td>
                <span class="difficulty-badge ${problem.difficulty}">
                    ${difficultyEmoji} ${problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                </span>
            </td>
            <td>${problem.time}</td>
            <td>
                <a href="${problem.link}" target="_blank" class="problem-link">Solve</a>
            </td>
            <td>
                <div class="checkbox-wrapper">
                    <div class="custom-checkbox ${isCompleted ? 'checked' : ''}" 
                         onclick="toggleProblem('${problemId}', this)">
                    </div>
                </div>
            </td>
        </tr>
    `;
}

// Toggle problem completion
function toggleProblem(problemId, checkbox) {
    const row = checkbox.closest('tr');
    
    if (completedProblems.has(problemId)) {
        completedProblems.delete(problemId);
        checkbox.classList.remove('checked');
        row.classList.remove('completed');
    } else {
        completedProblems.add(problemId);
        checkbox.classList.add('checked');
        row.classList.add('completed');
        
        // Add celebration animation
        createConfetti(checkbox);
    }
    
    saveProgress();
    updateGlobalProgress();
    renderTopicsOverview();
}

// Toggle category visibility
function toggleCategory(categoryId) {
    const table = document.getElementById(`table-${categoryId}`);
    const icon = table.previousElementSibling.querySelector('.toggle-icon');
    
    if (table.style.display === 'none') {
        table.style.display = 'block';
        icon.classList.add('expanded');
    } else {
        table.style.display = 'none';
        icon.classList.remove('expanded');
    }
}

// Check if problem should be shown based on filters
function shouldShowProblem(problem, isCompleted) {
    // Check status filter
    if (currentFilter === 'completed' && !isCompleted) return false;
    if (currentFilter === 'pending' && isCompleted) return false;
    
    // Check difficulty filter
    if (!activeDifficulties.has(problem.difficulty)) return false;
    
    return true;
}

// Apply filters
function applyFilters() {
    document.querySelectorAll('.problem-row').forEach(row => {
        const difficulty = row.dataset.difficulty;
        const isCompleted = row.dataset.completed === 'true';
        const problem = { difficulty };
        
        if (shouldShowProblem(problem, isCompleted)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Status filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            applyFilters();
        });
    });
    
    // Difficulty filter buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const difficulty = btn.dataset.difficulty;
            
            if (activeDifficulties.has(difficulty)) {
                activeDifficulties.delete(difficulty);
            } else {
                activeDifficulties.add(difficulty);
            }
            
            applyFilters();
        });
    });
}

// Update last updated date
function updateLastUpdated() {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    document.getElementById('lastUpdated').textContent = formatted;
}

// Confetti animation for completed problems
function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const colors = ['#6366f1', '#ec4899', '#22c55e', '#f59e0b', '#ef4444'];
    
    for (let i = 0; i < 15; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = rect.left + rect.width / 2 + 'px';
        confetti.style.top = rect.top + rect.height / 2 + 'px';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        
        document.body.appendChild(confetti);
        
        const angle = (Math.PI * 2 * i) / 15;
        const velocity = 50 + Math.random() * 50;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0, y = 0;
        let opacity = 1;
        
        const animate = () => {
            x += vx * 0.016;
            y += vy * 0.016 + 100 * 0.016;
            opacity -= 0.02;
            
            confetti.style.transform = `translate(${x}px, ${y}px)`;
            confetti.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        
        animate();
    }
}

// Make functions globally accessible
window.toggleProblem = toggleProblem;
window.toggleCategory = toggleCategory;
