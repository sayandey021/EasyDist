const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const isAll = process.argv.includes('--all') || process.argv.includes('-a');

function getDirSize(dir) {
    let size = 0;
    if (!fs.existsSync(dir)) return 0;
    try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const full = path.join(dir, file);
            try {
                const stat = fs.statSync(full);
                if (stat.isDirectory()) {
                    size += getDirSize(full);
                } else {
                    size += stat.size;
                }
            } catch (e) {}
        }
    } catch (e) {}
    return size;
}

function removeDir(dir) {
    if (fs.existsSync(dir)) {
        const size = getDirSize(dir);
        try {
            fs.rmSync(dir, { recursive: true, force: true });
            console.log(`[CLEANED] ${dir} (freed ${(size / 1024 / 1024).toFixed(1)} MB)`);
            return size;
        } catch (e) {
            console.warn(`[WARN] Could not fully remove ${dir}:`, e.message);
        }
    }
    return 0;
}

console.log('===================================================');
console.log(`EasyDist Cleanup Tool ${isAll ? '(--all: Full Clean)' : '(Standard Clean)'}`);
console.log('===================================================');

let totalFreed = 0;

// 1. Clean Next.js build caches and export
totalFreed += removeDir('.next');
totalFreed += removeDir('out');

// 2. Clean old Electron dist
totalFreed += removeDir('dist');

// 3. Clean Tauri target build cache
if (isAll) {
    console.log('Cleaning Rust/Tauri target cache (cargo clean)...');
    try {
        const targetSize = getDirSize('src-tauri/target');
        execSync('cargo clean --manifest-path src-tauri/Cargo.toml', { stdio: 'inherit' });
        console.log(`[CLEANED] src-tauri/target (freed ${(targetSize / 1024 / 1024).toFixed(1)} MB)`);
        totalFreed += targetSize;
    } catch (e) {
        totalFreed += removeDir('src-tauri/target');
    }
} else {
    // Standard clean: clean intermediate debug files while keeping cargo cache for fast builds
    const debugDir = path.join('src-tauri', 'target', 'debug', 'incremental');
    totalFreed += removeDir(debugDir);
}

console.log('===================================================');
console.log(`Cleanup complete! Total disk space freed: ${(totalFreed / 1024 / 1024).toFixed(1)} MB (${(totalFreed / 1024 / 1024 / 1024).toFixed(2)} GB)`);
console.log('===================================================');
