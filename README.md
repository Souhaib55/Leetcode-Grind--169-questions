# 🚀 LeetCode Grind 169 - Tracker Website

A modern, interactive website to track your progress through 169 essential LeetCode problems across multiple topics.

## ✨ Features

### 🎨 Modern UI/UX
- **Dark theme** with gradient accents
- **Smooth animations** and transitions
- **Responsive design** for all devices
- **Glassmorphism effects** and modern card designs

### 📊 Dynamic Progress Tracking
- **Global progress bar** showing overall completion
- **Per-topic progress cards** with visual indicators
- **Real-time updates** as you mark problems complete
- **localStorage persistence** - your progress is saved automatically

### 🎯 Smart Filtering
- Filter by completion status (All, Completed, Pending)
- Filter by difficulty (Easy 🟢, Medium 🟡, Hard 🔴)
- Combine multiple filters for precise views

### ✅ Interactive Features
- **Custom checkboxes** with smooth animations
- **Confetti celebration** when completing problems
- **Collapsible categories** for better organization
- **Direct links** to LeetCode problems
- **Hover effects** and micro-interactions throughout

### 📁 Topics Covered (169 Problems)
- 📦 Array (24)
- 🧱 Stack (14)
- 🔗 Linked List (14)
- 🔤 String (14)
- 🌲 Binary Tree (18)
- 🌐 Graph (21)
- 🔍 Binary Search (8)
- 🧮 Dynamic Programming (12)
- 🔢 Binary (7)
- 📐 Math (5)
- 🧺 Heap (8)
- 🌲 Trie (4)
- ♻️ Recursion (6)
- 🧮 Matrix (5)
- 🌳 Binary Search Tree (5)
- #️⃣ Hash Table (3)
- 🧷 Queue (1)

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- Optional: Sass compiler (for modifying styles)

### Installation

1. **Clone or download** this repository to your local machine

2. **Open the website**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```

3. **Start tracking!**
   - Click checkboxes to mark problems as complete
   - Use filters to focus on specific problems
   - Click on topic cards to jump to that section

## 📁 Project Structure

```
Leetcode/
├── index.html          # Main HTML structure
├── styles.scss         # SCSS source styles
├── styles.css          # Compiled CSS (auto-generated)
├── data.js             # Problems data and topic information
├── script.js           # Dynamic functionality and interactions
└── README.md           # This file
```

## 🎨 Customization

### Modifying Styles
The project uses **SCSS** for styling. To modify:

1. Edit `styles.scss`
2. Compile to CSS:
   ```bash
   sass styles.scss styles.css
   ```

### Adding Problems
Edit `data.js` to add or modify problems:

```javascript
const problemsData = {
    "Topic Name": [
        { 
            id: 1, 
            name: "Problem Name", 
            difficulty: "easy|medium|hard", 
            time: "15 mins", 
            link: "https://leetcode.com/..." 
        }
    ]
};
```

### Customizing Colors
Edit CSS variables in `styles.scss`:

```scss
:root {
    --primary-color: #6366f1;
    --success-color: #22c55e;
    --easy-color: #22c55e;
    --medium-color: #f59e0b;
    --hard-color: #ef4444;
    // ... more variables
}
```

## 💾 Data Persistence

Your progress is automatically saved to **localStorage**. This means:
- ✅ Progress persists across browser sessions
- ✅ No account or login required
- ✅ Works completely offline
- ⚠️ Clearing browser data will reset progress
- ⚠️ Progress is per-browser (not synced across devices)

## 🌟 Features Breakdown

### Progress Tracking
- **Visual progress bars** for overall and per-topic completion
- **Percentage indicators** showing exact completion rates
- **Dynamic counters** updating in real-time

### Filtering System
- **Status filters**: View all, completed, or pending problems
- **Difficulty filters**: Toggle visibility by Easy/Medium/Hard
- **Instant updates**: Filters apply immediately

### Animations
- **Fade-in animations** for page load
- **Smooth transitions** on all interactions
- **Confetti effect** when completing problems
- **Shimmer effect** on progress bars
- **Hover animations** on cards and buttons

## 📱 Responsive Design

The website is fully responsive and optimized for:
- 💻 Desktop (1400px+)
- 💻 Laptop (1024px - 1399px)
- 📱 Tablet (768px - 1023px)
- 📱 Mobile (< 768px)

## 🔧 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📝 Based On

This tracker is based on the [Tech Interview Handbook Grind 75](https://www.techinterviewhandbook.org/grind75/) curated problem set.

## 🎯 Tips for Use

1. **Start with Easy problems** to build confidence
2. **Focus on one topic at a time** for deeper learning
3. **Use the time estimates** to plan study sessions
4. **Mark problems complete** only after fully understanding them
5. **Revisit completed problems** periodically for review

## 🤝 Contributing

Feel free to:
- Add more problems
- Improve the UI/UX
- Fix bugs
- Add new features
- Enhance documentation

## 📄 License

This project is open source and available for personal and educational use.

## 🙏 Acknowledgments

- LeetCode for the problem platform
- Tech Interview Handbook for the curated problem list
- The coding community for inspiration and support

---

**Happy Coding! 🚀**

*Track your progress, master algorithms, ace your interviews!*
