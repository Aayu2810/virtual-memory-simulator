// ================================================
// PAGE REPLACEMENT ALGORITHMS IMPLEMENTATION
// ================================================

// FIFO (First-In-First-Out) Algorithm
function fifoAlgorithm(referenceString, numFrames) {
    let frames = new Array(numFrames).fill(null);
    let pageFaults = 0;
    let pageHits = 0;
    let queue = [];
    let steps = [];

    referenceString.forEach((page, index) => {
        const frameIndex = frames.indexOf(page);
        
        if (frameIndex !== -1) {
            // Page Hit
            pageHits++;
            steps.push({
                step: index + 1,
                page: page,
                frames: [...frames],
                type: 'hit',
                message: `Page ${page} found in Frame ${frameIndex} (HIT)`
            });
        } else {
            // Page Fault
            pageFaults++;
            const emptyFrame = frames.indexOf(null);
            
            if (emptyFrame !== -1) {
                // Empty frame available
                frames[emptyFrame] = page;
                queue.push(emptyFrame);
                steps.push({
                    step: index + 1,
                    page: page,
                    frames: [...frames],
                    type: 'fault',
                    message: `Page ${page} loaded into Frame ${emptyFrame} (FAULT - Empty frame)`
                });
            } else {
                // Replace using FIFO
                const replaceFrame = queue.shift();
                const oldPage = frames[replaceFrame];
                frames[replaceFrame] = page;
                queue.push(replaceFrame);
                steps.push({
                    step: index + 1,
                    page: page,
                    frames: [...frames],
                    type: 'fault',
                    message: `Page ${page} replaced Page ${oldPage} in Frame ${replaceFrame} (FAULT - FIFO)`
                });
            }
        }
    });

    return { pageFaults, pageHits, steps };
}

// LRU (Least Recently Used) Algorithm
function lruAlgorithm(referenceString, numFrames) {
    let frames = new Array(numFrames).fill(null);
    let pageFaults = 0;
    let pageHits = 0;
    let timestamps = {};
    let steps = [];

    referenceString.forEach((page, index) => {
        const frameIndex = frames.indexOf(page);
        
        if (frameIndex !== -1) {
            // Page Hit
            pageHits++;
            timestamps[page] = index;
            steps.push({
                step: index + 1,
                page: page,
                frames: [...frames],
                type: 'hit',
                message: `Page ${page} found in Frame ${frameIndex} (HIT)`
            });
        } else {
            // Page Fault
            pageFaults++;
            timestamps[page] = index;
            const emptyFrame = frames.indexOf(null);
            
            if (emptyFrame !== -1) {
                frames[emptyFrame] = page;
                steps.push({
                    step: index + 1,
                    page: page,
                    frames: [...frames],
                    type: 'fault',
                    message: `Page ${page} loaded into Frame ${emptyFrame} (FAULT - Empty frame)`
                });
            } else {
                // Find LRU page
                let lruPage = frames[0];
                let lruTime = timestamps[lruPage];
                
                for (let i = 1; i < frames.length; i++) {
                    if (timestamps[frames[i]] < lruTime) {
                        lruPage = frames[i];
                        lruTime = timestamps[frames[i]];
                    }
                }
                
                const replaceFrame = frames.indexOf(lruPage);
                frames[replaceFrame] = page;
                steps.push({
                    step: index + 1,
                    page: page,
                    frames: [...frames],
                    type: 'fault',
                    message: `Page ${page} replaced Page ${lruPage} in Frame ${replaceFrame} (FAULT - LRU)`
                });
            }
        }
    });

    return { pageFaults, pageHits, steps };
}

// Optimal (Bélády's) Algorithm
function optimalAlgorithm(referenceString, numFrames) {
    let frames = new Array(numFrames).fill(null);
    let pageFaults = 0;
    let pageHits = 0;
    let steps = [];

    referenceString.forEach((page, index) => {
        const frameIndex = frames.indexOf(page);
        
        if (frameIndex !== -1) {
            // Page Hit
            pageHits++;
            steps.push({
                step: index + 1,
                page: page,
                frames: [...frames],
                type: 'hit',
                message: `Page ${page} found in Frame ${frameIndex} (HIT)`
            });
        } else {
            // Page Fault
            pageFaults++;
            const emptyFrame = frames.indexOf(null);
            
            if (emptyFrame !== -1) {
                frames[emptyFrame] = page;
                steps.push({
                    step: index + 1,
                    page: page,
                    frames: [...frames],
                    type: 'fault',
                    message: `Page ${page} loaded into Frame ${emptyFrame} (FAULT - Empty frame)`
                });
            } else {
                // Find page that won't be used for longest time
                let farthest = -1;
                let replaceFrame = 0;
                
                for (let i = 0; i < frames.length; i++) {
                    let j;
                    for (j = index + 1; j < referenceString.length; j++) {
                        if (frames[i] === referenceString[j]) {
                            if (j > farthest) {
                                farthest = j;
                                replaceFrame = i;
                            }
                            break;
                        }
                    }
                    if (j === referenceString.length) {
                        replaceFrame = i;
                        break;
                    }
                }
                
                const oldPage = frames[replaceFrame];
                frames[replaceFrame] = page;
                steps.push({
                    step: index + 1,
                    page: page,
                    frames: [...frames],
                    type: 'fault',
                    message: `Page ${page} replaced Page ${oldPage} in Frame ${replaceFrame} (FAULT - Optimal)`
                });
            }
        }
    });

    return { pageFaults, pageHits, steps };
}

// LFU (Least Frequently Used) Algorithm
function lfuAlgorithm(referenceString, numFrames) {
    let frames = new Array(numFrames).fill(null);
    let pageFaults = 0;
    let pageHits = 0;
    let counts = {};
    let steps = [];

    referenceString.forEach((page, index) => {
        const frameIndex = frames.indexOf(page);
        
        if (frameIndex !== -1) {
            // Page Hit
            pageHits++;
            counts[page] = (counts[page] || 0) + 1;
            steps.push({
                step: index + 1,
                page: page,
                frames: [...frames],
                type: 'hit',
                message: `Page ${page} found in Frame ${frameIndex} (HIT, count: ${counts[page]})`
            });
        } else {
            // Page Fault
            pageFaults++;
            counts[page] = 1;
            const emptyFrame = frames.indexOf(null);
            
            if (emptyFrame !== -1) {
                frames[emptyFrame] = page;
                steps.push({
                    step: index + 1,
                    page: page,
                    frames: [...frames],
                    type: 'fault',
                    message: `Page ${page} loaded into Frame ${emptyFrame} (FAULT - Empty frame)`
                });
            } else {
                // Find LFU page
                let lfuPage = frames[0];
                let lfuCount = counts[lfuPage];
                
                for (let i = 1; i < frames.length; i++) {
                    if (counts[frames[i]] < lfuCount) {
                        lfuPage = frames[i];
                        lfuCount = counts[frames[i]];
                    }
                }
                
                const replaceFrame = frames.indexOf(lfuPage);
                frames[replaceFrame] = page;
                steps.push({
                    step: index + 1,
                    page: page,
                    frames: [...frames],
                    type: 'fault',
                    message: `Page ${page} replaced Page ${lfuPage} (count: ${lfuCount}) in Frame ${replaceFrame} (FAULT - LFU)`
                });
            }
        }
    });

    return { pageFaults, pageHits, steps };
}

// Simulate algorithm (used for comparison)
function simulateAlgorithm(algorithm, referenceString, numFrames) {
    let result;
    
    switch(algorithm) {
        case 'fifo':
            result = fifoAlgorithm(referenceString, numFrames);
            break;
        case 'lru':
            result = lruAlgorithm(referenceString, numFrames);
            break;
        case 'optimal':
            result = optimalAlgorithm(referenceString, numFrames);
            break;
        case 'lfu':
            result = lfuAlgorithm(referenceString, numFrames);
            break;
        default:
            result = fifoAlgorithm(referenceString, numFrames);
    }
    
    const total = result.pageFaults + result.pageHits;
    const ratio = total > 0 ? ((result.pageHits / total) * 100).toFixed(1) : 0;
    
    return {
        faults: result.pageFaults,
        hits: result.pageHits,
        ratio: ratio
    };
}
