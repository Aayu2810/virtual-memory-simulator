// ================================================
// MAIN SIMULATOR LOGIC
// ================================================

// Global state
let simulationState = {
    frames: [],
    referenceString: [],
    currentStep: 0,
    pageFaults: 0,
    pageHits: 0,
    algorithm: 'fifo',
    numFrames: 4,
    isRunning: false,
    isPaused: false,
    stepDelay: 1000,
    simulationSteps: []
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeSimulator();
    initSpeedSlider();
});

// Initialize simulator
function initializeSimulator() {
    const numFrames = parseInt(document.getElementById('numFrames')?.value || 4);
    simulationState.numFrames = numFrames;
    simulationState.frames = new Array(numFrames).fill(null);
    
    initializeMemory(numFrames);
    updateStatistics(0, 0);
    
    // Set default reference string if empty
    const refInput = document.getElementById('referenceString');
    if (refInput && !refInput.value.trim()) {
        refInput.value = '7,0,1,2,0,3,0,4,2,3,0,3,2,1,2,0,1,7,0,1';
    }
}

// Start simulation
function startSimulation() {
    // Get configuration
    const refString = document.getElementById('referenceString')?.value;
    if (!refString || !refString.trim()) {
        alert('Please enter a page reference string');
        return;
    }

    const refs = refString.split(',')
        .map(x => parseInt(x.trim()))
        .filter(x => !isNaN(x));
    
    if (refs.length === 0) {
        alert('Invalid reference string. Please enter comma-separated numbers.');
        return;
    }

    simulationState.numFrames = parseInt(document.getElementById('numFrames')?.value || 4);
    simulationState.algorithm = document.getElementById('algorithm')?.value || 'fifo';
    simulationState.referenceString = refs;
    simulationState.stepDelay = parseInt(document.getElementById('speedSlider')?.value || 1000);

    // Reset state
    resetSimulationState();
    
    // Get simulation steps
    const result = getAlgorithmSteps(simulationState.algorithm, refs, simulationState.numFrames);
    simulationState.simulationSteps = result.steps;

    // Initialize display
    initializeMemory(simulationState.numFrames);
    updateReferenceVisualization(refs, -1);
    clearLog();
    
    addLogEntry(`Simulation started: ${simulationState.algorithm.toUpperCase()} with ${simulationState.numFrames} frames`, 'info');
    addLogEntry(`Reference String: ${refs.join(', ')}`, 'info');

    // Enable/disable buttons
    enableButton('stepBtn');
    enableButton('pauseBtn');
    
    // Start auto-run
    simulationState.isRunning = true;
    simulationState.isPaused = false;
    runSimulation();
}

// Run simulation automatically
async function runSimulation() {
    while (simulationState.currentStep < simulationState.simulationSteps.length && 
           simulationState.isRunning && 
           !simulationState.isPaused) {
        
        await executeStep();
        await sleep(simulationState.stepDelay);
    }
    
    if (simulationState.currentStep >= simulationState.simulationSteps.length) {
        finishSimulation();
    }
}

// Execute single step
async function executeStep() {
    if (simulationState.currentStep >= simulationState.simulationSteps.length) {
        return;
    }

    const step = simulationState.simulationSteps[simulationState.currentStep];
    
    // Update state
    simulationState.frames = [...step.frames];
    if (step.type === 'hit') {
        simulationState.pageHits++;
    } else {
        simulationState.pageFaults++;
    }

    // Update display
    updateMemoryDisplay(step.frames);
    updateStatistics(
        simulationState.pageFaults, 
        simulationState.pageHits, 
        step.page,
        simulationState.currentStep + 1,
        simulationState.simulationSteps.length
    );
    updatePageTable(step.frames, simulationState.referenceString);
    updateReferenceVisualization(simulationState.referenceString, simulationState.currentStep);
    addLogEntry(`[Step ${step.step}] ${step.message}`, step.type);

    // Animate the affected frame
    const frameIndex = step.frames.indexOf(step.page);
    if (frameIndex !== -1) {
        animateFrame(frameIndex, step.type);
    }

    simulationState.currentStep++;
}

// Step forward manually
async function stepForward() {
    if (!simulationState.isRunning) {
        startSimulation();
        simulationState.isPaused = true;
    }
    
    if (simulationState.currentStep < simulationState.simulationSteps.length) {
        await executeStep();
    }
    
    if (simulationState.currentStep >= simulationState.simulationSteps.length) {
        finishSimulation();
    }
}

// Pause simulation
function pauseSimulation() {
    simulationState.isPaused = !simulationState.isPaused;
    
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
        pauseBtn.textContent = simulationState.isPaused ? '▶️ Resume' : '⏸️ Pause';
    }
    
    if (!simulationState.isPaused && simulationState.isRunning) {
        runSimulation();
    }
}

// Reset simulation
function resetSimulation() {
    resetSimulationState();
    initializeSimulator();
    clearLog();
    
    const refViz = document.getElementById('referenceViz');
    if (refViz) refViz.innerHTML = '';
    
    disableButton('stepBtn');
    disableButton('pauseBtn');
    
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) pauseBtn.textContent = '⏸️ Pause';
}

// Reset simulation state
function resetSimulationState() {
    simulationState.frames = new Array(simulationState.numFrames).fill(null);
    simulationState.currentStep = 0;
    simulationState.pageFaults = 0;
    simulationState.pageHits = 0;
    simulationState.isRunning = false;
    simulationState.isPaused = false;
    simulationState.simulationSteps = [];
}

// Finish simulation
function finishSimulation() {
    simulationState.isRunning = false;
    disableButton('stepBtn');
    disableButton('pauseBtn');
    
    const total = simulationState.pageFaults + simulationState.pageHits;
    const ratio = total > 0 ? ((simulationState.pageHits / total) * 100).toFixed(1) : 0;
    
    addLogEntry(`✅ Simulation complete! Page Faults: ${simulationState.pageFaults}, Hit Ratio: ${ratio}%`, 'info');
}

// Get algorithm steps
function getAlgorithmSteps(algorithm, referenceString, numFrames) {
    switch(algorithm) {
        case 'fifo':
            return fifoAlgorithm(referenceString, numFrames);
        case 'lru':
            return lruAlgorithm(referenceString, numFrames);
        case 'optimal':
            return optimalAlgorithm(referenceString, numFrames);
        case 'lfu':
            return lfuAlgorithm(referenceString, numFrames);
        default:
            return fifoAlgorithm(referenceString, numFrames);
    }
}

// Utility function for delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Update speed when slider changes
document.getElementById('speedSlider')?.addEventListener('input', function() {
    simulationState.stepDelay = parseInt(this.value);
});
