const fs = require('fs');
const path = require('path');
const pug = require('pug');
const sass = require('sass');

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(`  ${title}`, 'blue');
  console.log('='.repeat(60));
}

// Directory paths
const DIST_DIR = path.join(__dirname, 'dist-standalone');
const ASSETS_DIR = path.join(DIST_DIR, 'assets');
const FONTS_DIR = path.join(ASSETS_DIR, 'fonts');
const IMAGES_DIR = path.join(ASSETS_DIR, 'images');

// Source paths
const SRC_FONTS = path.join(__dirname, 'src', 'assets', 'fonts');
const SRC_IMAGES = path.join(__dirname, 'src', 'assets', 'images');

// Setup directories
function setupDirectories() {
  logSection('Setting up directories');
  
  // Clean and create dist directory
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true });
  }
  
  fs.mkdirSync(DIST_DIR, { recursive: true });
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
  fs.mkdirSync(FONTS_DIR, { recursive: true });
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  
  log('✓ Created directories', 'green');
}

// Copy a file
function copyFile(source, dest) {
  fs.copyFileSync(source, dest);
}

// Copy all files from a directory
function copyDirectory(source, dest) {
  const files = fs.readdirSync(source);
  let count = 0;
  
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      copyFile(sourcePath, destPath);
      count++;
    }
  });
  
  return count;
}

// Copy assets
function copyAssets() {
  logSection('Copying assets');
  
  // Copy images
  const imageCount = copyDirectory(SRC_IMAGES, IMAGES_DIR);
  log(`✓ Copied ${imageCount} images`, 'green');
  
  // Copy fonts
  const fontCount = copyDirectory(SRC_FONTS, FONTS_DIR);
  log(`✓ Copied ${fontCount} fonts`, 'green');
  
  log('✓ All assets copied successfully', 'green');
}

// Compile Pug template (using standard index.pug)
function compilePug() {
  logSection('Compiling Pug template');
  
  const pugFile = path.join(__dirname, 'src', 'index.pug');
  
  try {
    const html = pug.renderFile(pugFile, {
      pretty: false,
      basedir: path.join(__dirname, 'src')
    });
    
    log('✓ Pug compiled successfully', 'green');
    return html;
  } catch (error) {
    log(`✗ Error compiling Pug: ${error.message}`, 'red');
    throw error;
  }
}

// Compile SCSS to CSS
function compileScss() {
  logSection('Compiling SCSS to CSS');
  
  const scssFile = path.join(__dirname, 'src', 'scss', 'main.scss');
  
  try {
    const result = sass.compile(scssFile, {
      style: 'compressed',
      loadPaths: [path.join(__dirname, 'src', 'scss')]
    });
    
    log('✓ SCSS compiled successfully', 'green');
    log(`  Original size: ${result.css.length} characters`, 'reset');
    
    return result.css;
  } catch (error) {
    log(`✗ Error compiling SCSS: ${error.message}`, 'red');
    throw error;
  }
}

// Fix z-index values (keep them ≤ 1)
function fixZIndex(css) {
  logSection('Fixing z-index values');
  
  // Find all z-index values
  const zIndexRegex = /z-index:\s*(\d+)/g;
  let matches = [...css.matchAll(zIndexRegex)];
  let fixedCount = 0;
  
  // Replace z-index values > 1 with 1
  css = css.replace(zIndexRegex, (match, value) => {
    if (parseInt(value) > 1) {
      fixedCount++;
      return 'z-index:1';
    }
    return match;
  });
  
  log(`✓ Fixed ${fixedCount} z-index values`, 'green');
  return css;
}

// Fix font paths (change ../assets/fonts/ to ./assets/fonts/)
function fixFontPaths(css) {
  logSection('Fixing font paths');
  
  // Change ../assets/fonts/ to ./assets/fonts/
  const fixed = css.replace(/url\(["']?\.\.\/assets\/fonts\//g, 'url("./assets/fonts/');
  
  log('✓ Font paths adjusted', 'green');
  return fixed;
}

// Extract body content from HTML (remove <html>, <head>, <body> tags but keep DOCTYPE)
function extractBodyContent(html) {
  logSection('Extracting body content');
  
  // Extract just the body content (everything inside <body>...</body>)
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  
  if (!bodyMatch) {
    log('⚠ Warning: Could not find body tag', 'yellow');
    return html;
  }
  
  const bodyContent = bodyMatch[1].trim();
  log('✓ Body content extracted', 'green');
  
  return bodyContent;
}

// Create final standalone HTML
function createStandaloneHtml(css, bodyHtml) {
  logSection('Creating final standalone HTML');
  
  const finalHtml = `<!DOCTYPE html>
<html lang="pt-PT">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HP Instant Ink - Poupe até 70% em tinteiros</title>
<style>
${css}
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
  
  const totalChars = finalHtml.length;
  
  log('✓ Final HTML created', 'green');
  log(`  Total characters: ${totalChars.toLocaleString()}`, 'reset');
  
  return finalHtml;
}

// Main build process
async function build() {
  const startTime = Date.now();
  
  console.log('\n' + '='.repeat(60));
  log('🚀 Starting Standard Standalone Build Process', 'bright');
  log('HP Instant Ink Landing Page - Standard Version', 'bright');
  console.log('='.repeat(60));
  
  try {
    // 1. Setup directories
    setupDirectories();
    
    // 2. Copy assets
    copyAssets();
    
    // 3. Compile Pug
    let html = compilePug();
    
    // 4. Compile SCSS
    let css = compileScss();
    
    // 5. Fix font paths
    css = fixFontPaths(css);
    
    // 6. Extract body content
    const bodyContent = extractBodyContent(html);
    
    // 7. Create final HTML
    const finalHtml = createStandaloneHtml(css, bodyContent);
    
    // 8. Save to file
    const outputPath = path.join(DIST_DIR, 'index.html');
    fs.writeFileSync(outputPath, finalHtml, 'utf8');
    
    log(`✓ Saved to: ${outputPath}`, 'green');
    
    // 9. Build report
    logSection('Build Report');
    const cssSize = css.length;
    const htmlSize = bodyContent.length;
    const totalSize = finalHtml.length;
    
    console.log('Build Statistics:');
    log(`  CSS: ${cssSize.toLocaleString()} chars`, 'reset');
    log(`  HTML: ${htmlSize.toLocaleString()} chars`, 'reset');
    log(`  Total: ${totalSize.toLocaleString()} chars`, 'reset');
    
    // Save build report
    const report = {
      timestamp: new Date().toISOString(),
      stats: {
        css: cssSize,
        html: htmlSize,
        total: totalSize
      },
      files: {
        images: fs.readdirSync(IMAGES_DIR).length,
        fonts: fs.readdirSync(FONTS_DIR).length
      }
    };
    
    fs.writeFileSync(
      path.join(DIST_DIR, 'build-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    log('\n✓ Report saved to dist-standalone/build-report.json', 'green');
    
    // 10. Success message
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    logSection('Build Complete! ✨');
    log(`  Time: ${duration}s`, 'reset');
    log(`  Output: dist-standalone/index.html`, 'reset');
    
    log('\n✅ Standard standalone build completed successfully!', 'green');
    
  } catch (error) {
    log('\n❌ Build failed!', 'red');
    log(error.message, 'red');
    if (error.stack) {
      log('\nStack trace:', 'yellow');
      console.log(error.stack);
    }
    process.exit(1);
  }
}

// Run build
build();
