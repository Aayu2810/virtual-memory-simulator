# 💾 Virtual Memory Management Simulator

An interactive web-based tool for visualizing and understanding virtual memory management and page replacement algorithms.

## 🌐 Live Demo

**[View Live Demo](https://aayu2810.github.io/virtual-memory-simulator/)**

## 📋 Features

- **4 Page Replacement Algorithms**
  - FIFO (First-In-First-Out)
  - LRU (Least Recently Used)
  - Optimal (Bélády's Algorithm)
  - LFU (Least Frequently Used)

- **Real-time Visualization**
  - Animated memory frame updates
  - Page table display
  - Execution log
  - Performance metrics

- **Interactive Controls**
  - Adjustable frame count
  - Custom reference strings
  - Variable simulation speed
  - Step-by-step execution

- **Algorithm Comparison**
  - Side-by-side performance analysis
  - Visual comparison charts
  - Best algorithm identification

- **Educational Content**
  - Comprehensive theory documentation
  - OS concepts explained
  - Algorithm complexity analysis

## 🎓 Operating System Concepts Demonstrated

1. **Virtual Memory Management** - Logical/physical address separation
2. **Paging** - Fixed-size memory blocks
3. **Page Tables** - Virtual-to-physical mapping
4. **Page Replacement** - Victim page selection strategies
5. **Page Faults** - Missing page handling
6. **TLB Simulation** - Fast address translation
7. **Memory Hierarchy** - Multi-level organization
8. **Demand Paging** - Load-on-demand strategy
9. **Thrashing Detection** - Excessive paging identification
10. **Performance Metrics** - Hit ratio, fault rate analysis

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/Aayu2810/virtual-memory-simulator.git
```

2. Navigate to the project directory:
```bash
cd virtual-memory-simulator
```

3. Open `index.html` in your browser:
```bash
# On Windows
start index.html

# On Mac
open index.html

# On Linux
xdg-open index.html
```

### GitHub Pages Deployment

1. Push to GitHub
2. Go to repository Settings → Pages
3. Select main branch → Save
4. Access at `https://Aayu2810.github.io/virtual-memory-simulator/`

## 📂 Project Structure
```
virtual-memory-simulator/
├── index.html              # Home page
├── simulator.html          # Main simulator
├── comparison.html         # Algorithm comparison
├── theory.html            # Theory and concepts
├── about.html             # Project information
├── css/
│   └── styles.css         # All styles
├── js/
│   ├── algorithms.js      # Algorithm implementations
│   ├── visualization.js   # Visualization functions
│   └── simulator.js       # Main simulation logic
└── README.md              # This file
```

## 💻 Usage

### Basic Simulation

1. Open the simulator page
2. Enter a page reference string (e.g., `7,0,1,2,0,3,0,4,2,3`)
3. Select number of frames (2-10)
4. Choose an algorithm
5. Click "Start" to begin simulation

### Step-by-Step Mode

1. Click "Step" button to manually advance through each page reference
2. Observe frame changes and page table updates
3. Review execution log for details

### Algorithm Comparison

1. Navigate to the Compare page
2. Enter reference string and frame count
3. Click "Compare All Algorithms"
4. View side-by-side performance metrics

## 📊 Algorithms Explained

### FIFO (First-In-First-Out)
- **Strategy**: Replace oldest page
- **Complexity**: O(1)
- **Pros**: Simple, low overhead
- **Cons**: Suffers from Bélády's anomaly

### LRU (Least Recently Used)
- **Strategy**: Replace least recently accessed page
- **Complexity**: O(n)
- **Pros**: Good performance, considers locality
- **Cons**: Higher overhead

### Optimal (Bélády's)
- **Strategy**: Replace page not used for longest time
- **Complexity**: O(n²)
- **Pros**: Theoretical best performance
- **Cons**: Requires future knowledge (not implementable)

### LFU (Least Frequently Used)
- **Strategy**: Replace page with lowest access count
- **Complexity**: O(n)
- **Pros**: Keeps frequently used pages
- **Cons**: Old pages may never be replaced

## 🎯 Performance Metrics

- **Page Faults**: Number of times requested page not in memory
- **Page Hits**: Number of times requested page found in memory
- **Hit Ratio**: (Hits / Total References) × 100%
- **Effective Access Time**: Weighted average based on hit/fault rates

## 🛠️ Technologies Used

- **HTML5** - Structure and markup
- **CSS3** - Styling and animations
- **JavaScript (ES6+)** - Simulation logic
- **GitHub Pages** - Hosting

## 📚 Project Information

- **Course**: Operating Systems (CS235AI)
- **Institution**: RV College of Engineering
- **Department**: Information Science and Engineering
- **Academic Year**: 2025-26
- **Student**: Aayushi Priya
- **USN**: 1RV24IS005

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as part of an Operating Systems course.

## 🙏 Acknowledgments

- RV College of Engineering
- Operating Systems Course Faculty
- Reference textbooks: Silberschatz, Stallings, Tanenbaum

## 📞 Contact

**Aayushi Priya** - 1RV24IS005  
RV College of Engineering

---

**⭐ Star this repository if you find it helpful!**

Made with ❤️ for OS learning
