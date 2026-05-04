import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { readdirSync } from 'fs';
import { join } from 'path';

const buildDir = './build';
const distDir = './dist';

console.log('🔄 Preparing pre-render...');

// Remove old build dir if exists
if (existsSync(buildDir)) {
  rmSync(buildDir, { recursive: true, force: true });
}

// Copy dist to build
console.log(`📋 Copying ${distDir} → ${buildDir}...`);
mkdirSync(buildDir, { recursive: true });
copyDir(distDir, buildDir);

// Run react-snap
console.log('🖼️  Running react-snap...');
try {
  execSync('react-snap', { stdio: 'inherit' });
} catch (err) {
  console.error('❌ react-snap failed:', err.message);
  process.exit(1);
}

// Copy results back to dist
console.log(`📋 Copying pre-rendered files ${buildDir} → ${distDir}...`);
copyDir(buildDir, distDir);

// Clean up
rmSync(buildDir, { recursive: true, force: true });

console.log('✅ Pre-render complete');

function copyDir(src, dst) {
  mkdirSync(dst, { recursive: true });
  readdirSync(src, { withFileTypes: true }).forEach(file => {
    const srcPath = join(src, file.name);
    const dstPath = join(dst, file.name);
    if (file.isDirectory()) {
      copyDir(srcPath, dstPath);
    } else {
      copyFileSync(srcPath, dstPath);
    }
  });
}
