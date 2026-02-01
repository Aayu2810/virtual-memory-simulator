// ================================================
// VISUALIZATION FUNCTIONS
// ================================================

// Initialize memory display
function initializeMemory(numFrames) {
    const container = document.getElementById('physicalMemory');
    if (!container) return;
    
    container.innerHTML = '';
    
    for (let i = 0; i < numFrames; i++) {
        const frame = document.createElement('div');
        frame.className = 'page-frame';
        frame.id = `frame-${i}`;
        frame.innerHTML = `
            <div class="frame-label">Frame ${i}</div>
            <div class="frame-content">-</div>
        `;
        container.appendChild(frame);
    }
}

// Update memory display
function updateMemoryDisplay(frames) {
    frames.forEach((page, index) => {
        const frame = document.getElementById(`frame-${index}`);
        if (!frame) return;
        
        const content = frame.querySelector('.frame-content');
        content.textContent = page !== null ? page : '-';
        
        if (page !== null) {
            frame.classList.add('occupied');
        } else {
            frame.classList.remove('occupied');
        }
    });
}

// Animate frame (hit or fault)
function animateFrame(frameIndex, type) {
    const frame = document.getElementById(`frame-${frameIndex}`);
    if (!frame) return;
    
    frame.classList.add(type);
    setTimeout(() => {
        frame.classList.remove(type);
    }, 500);
}

// Update statistics
function updateStatistics(pageFaults, pageHits, currentPage = null, currentStep = 0, totalSteps = 0) {
    const faultsEl = document.getElementById('pageFaults');
    const hitsEl = document.getElementById('pageHits');
    const ratioEl = document.getElementById('hitRatio');
    const currentPageEl = document.getElementById('currentPage');
    const progressEl = document.getElementById('progress');
    
    if (faultsEl) faultsEl.textContent = pageFaults;
    if (hitsEl) hitsEl.textContent = pageHits;
    
    const total = pageFaults + pageHits;
    const ratio = total > 0 ? ((pageHits / total) * 100).toFixed(1) : 0;
    if (ratioEl) ratioEl.textContent = ratio + '%';
    
    if (currentPageEl) {
        currentPageEl.textContent = currentPage !== null ? currentPage : '-';
    }
    
    if (progressEl && totalSteps > 0) {
        const progressPercent = ((currentStep / totalSteps) * 100).toFixed(0);
        progressEl.textContent = progressPercent + '%';
    }
}

// Update page table
function updatePageTable(frames, referenceString) {
    const container = document.getElementById('pageTable');
    if (!container) return;
    
    container.innerHTML = '';
    
    const uniquePages = [...new Set(referenceString)].sort((a, b) => a - b);
    
    uniquePages.forEach(page => {
        const frameNum = frames.indexOf(page);
        const isValid = frameNum !== -1;
        
        const entry = document.createElement('div');
        entry.className = `page-entry ${isValid ? 'valid' : ''}`;
        entry.innerHTML = `
            <div><strong>Page ${page}</strong></div>
            <div>Frame: ${isValid ? frameNum : '-'}</div>
            <div>${isValid ? '✅ Valid' : '❌ Invalid'}</div>
        `;
        container.appendChild(entry);
    });
}

// Add log entry
function addLogEntry(message, type = 'info') {
    const log = document.getElementById('executionLog');
    if (!log) return;
    
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = message;
    
    // Insert at top
    log.insertBefore(entry, log.firstChild);
    
    // Limit log entries to 50
    while (log.children.length > 50) {
        log.removeChild(log.lastChild);
    }
}

// Clear log
function clearLog() {
    const log = document.getElementById('executionLog');
    if (log) log.innerHTML = '';
}

// Update reference string visualization
function updateReferenceVisualization(referenceString, currentIndex) {
    const container = document.getElementById('referenceViz');
    if (!container) return;
    
    container.innerHTML = '';
    
    referenceString.forEach((page, index) => {
        const item = document.createElement('div');
        item.className = 'ref-item';
        item.textContent = page;
        
        if (index === currentIndex) {
            item.classList.add('current');
        } else if (index < currentIndex) {
            item.classList.add('completed');
        }
        
        container.appendChild(item);
    });
}

// Show/hide elements
function showElement(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
}

function hideElement(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
}

// Enable/disable buttons
function enableButton(id) {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = false;
}

function disableButton(id) {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = true;
}

// Update speed display
function updateSpeedDisplay() {
    const slider = document.getElementById('speedSlider');
    const display = document.getElementById('speedValue');
    
    if (slider && display) {
        display.textContent = slider.value + 'ms';
    }
}

// Initialize speed slider
function initSpeedSlider() {
    const slider = document.getElementById('speedSlider');
    if (slider) {
        slider.addEventListener('input', updateSpeedDisplay);
    }
}
