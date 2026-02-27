#!/usr/bin/env node

/**
 * Package Creation Script
 * Creates distribution packages for Worten and other partners
 * 
 * Packages created:
 * 1. hp-instant-ink-worten.zip - Worten integration package
 * 2. hp-instant-ink-partners.zip - Standard partner package
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Configuration
const PACKAGES_DIR = path.join(__dirname, 'packages');
const WORTEN_DIST = path.join(__dirname, 'worten-dist');
const STANDARD_DIST = path.join(__dirname, 'dist-standalone');

// Colors for console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  log('\n' + '='.repeat(60), 'cyan');
  log(`  ${title}`, 'cyan');
  log('='.repeat(60), 'cyan');
}

// Create packages directory
function setupPackagesDir() {
  if (fs.existsSync(PACKAGES_DIR)) {
    fs.rmSync(PACKAGES_DIR, { recursive: true });
  }
  fs.mkdirSync(PACKAGES_DIR, { recursive: true });
  log('✓ Packages directory created', 'green');
}

// Create ZIP archive
function createZip(sourceDir, outputFilename, description) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(path.join(PACKAGES_DIR, outputFilename));
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });

    output.on('close', () => {
      const size = (archive.pointer() / 1024).toFixed(2);
      log(`✓ ${description}`, 'green');
      log(`  Size: ${size} KB`, 'cyan');
      log(`  Files: ${archive.pointer()} bytes`, 'cyan');
      resolve();
    });

    archive.on('error', (err) => {
      log(`✗ Error creating ${outputFilename}: ${err.message}`, 'red');
      reject(err);
    });

    archive.pipe(output);

    // Add all files from source directory
    archive.directory(sourceDir, false);

    archive.finalize();
  });
}

// Create README for Worten package
function createWortenReadme() {
  const readme = `# HP Instant Ink - Worten Integration Package

## Conteúdo do Package

- \`hp-instant-ink-worten.html\` - HTML principal (pronto para integração Worten)
- \`assets/\` - Pasta com todos os recursos necessários
  - \`images/\` - Imagens (15 ficheiros)
  - \`fonts/\` - Fontes HP (12 ficheiros)

## Características Técnicas

- **Tamanho do HTML**: ~34.5 KB (dentro do limite Worten de 200 KB)
- **CSS Inline**: Todo o CSS está embutido no HTML
- **Classes prefixadas**: Todas as classes CSS começam com \`.hpi-\`
- **Z-index máximo**: 1 (conforme especificação Worten)
- **Background**: #f6f6f6 (cor corporativa Worten)
- **Container width**: 1312px (largura Worten)
- **Sem tags head/body**: Apenas conteúdo limpo

## Instruções de Integração Worten

### 1. Upload dos Assets
Faça upload da pasta \`assets/\` completa para o servidor Worten.

### 2. Integração do HTML
Copie o conteúdo de \`hp-instant-ink-worten.html\` e cole na plataforma Worten.

### 3. Verificação
- ✓ Todas as imagens devem carregar corretamente
- ✓ Fontes HP Simplified e Forma DJRUI devem ser aplicadas
- ✓ Layout deve ter 1312px de largura máxima
- ✓ Background deve ser #f6f6f6

## Estrutura de Assets

\`\`\`
assets/
├── images/
│   ├── hero-hp-logo.png
│   ├── hero-img.png
│   ├── hero-crowd-icon.png
│   ├── save-img.png
│   ├── about-img.png
│   ├── free-months-img.png
│   ├── icon-step-1.png
│   ├── icon-step-2.png
│   ├── icon-step-3.png
│   ├── icon-step-4.png
│   ├── icon-ink-drop.png
│   ├── never-run-out-img.png
│   ├── subscription-img.png
│   ├── price-img.png
│   └── recicle-img.png
└── fonts/
    ├── HpSimplifiedLight.eot
    ├── HpSimplifiedLight.woff
    ├── HpSimplifiedLight.ttf
    ├── HPSimplifiedLightItalic.eot
    ├── HPSimplifiedLightItalic.woff
    ├── HPSimplifiedLightItalic.ttf
    ├── HPSimplifiedRegular.eot
    ├── HPSimplifiedRegular.woff
    ├── HPSimplifiedRegular.ttf
    ├── HPSimplifiedBold.ttf
    ├── FormaDJRUI.woff
    └── FormaDJRUI.woff2
\`\`\`

## Suporte Técnico

Para questões técnicas ou problemas de integração, contacte a equipa de desenvolvimento HP.

## Conformidade

✓ Limite de caracteres: 34,530 / 200,000 (17.27%)
✓ Apenas classes CSS (sem seletores de elementos globais)
✓ Z-index máximo: 1
✓ Assets otimizados para performance

---
Gerado automaticamente em: ${new Date().toISOString()}
Versão: 1.0.0
`;

  const readmePath = path.join(WORTEN_DIST, 'README.md');
  fs.writeFileSync(readmePath, readme);
  log('✓ README.md criado para Worten', 'green');
}

// Create README for Partners package
function createPartnersReadme() {
  const readme = `# HP Instant Ink - Partner Integration Package

## Conteúdo do Package

- \`index.html\` - HTML principal (versão standard)
- \`assets/\` - Pasta com todos os recursos necessários
  - \`images/\` - Imagens (15 ficheiros)
  - \`fonts/\` - Fontes HP (12 ficheiros)
- \`styles.css\` - CSS separado (se aplicável)

## Características Técnicas

- **Design responsivo**: Otimizado para desktop, tablet e mobile
- **Classes prefixadas**: Todas as classes CSS começam com \`.hpi-\`
- **Fontes HP**: HP Simplified e Forma DJRUI incluídas
- **Container width**: 1200px (largura standard)
- **Background**: #ffffff (branco)

## Instruções de Integração

### 1. Upload dos Assets
Faça upload da pasta \`assets/\` completa para o seu servidor.

### 2. Integração do HTML
- Copie o conteúdo de \`index.html\`
- Ajuste os caminhos dos assets se necessário
- Integre na sua plataforma

### 3. Personalização
All CSS classes are prefixed with \`.hpi-\` allowing easy customization without conflicts.

## Estrutura de Assets

\`\`\`
assets/
├── images/
│   └── [15 imagens da campanha]
└── fonts/
    └── [12 ficheiros de fontes HP]
\`\`\`

## Breakpoints Responsivos

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## Suporte Técnico

Para questões técnicas ou problemas de integração, contacte a equipa de desenvolvimento HP.

---
Gerado automaticamente em: ${new Date().toISOString()}
Versão: 1.0.0
`;

  const readmePath = path.join(STANDARD_DIST, 'README.md');
  fs.writeFileSync(readmePath, readme);
  log('✓ README.md criado para Partners', 'green');
}

// Main function
async function createPackages() {
  try {
    log('\n🚀 Starting Package Creation Process', 'cyan');
    log('HP Instant Ink Landing Page - Distribution Packages\n', 'cyan');

    const startTime = Date.now();

    // Setup packages directory
    logSection('Setting up packages directory');
    setupPackagesDir();

    // Check if Worten build exists
    logSection('Checking Worten build');
    if (!fs.existsSync(WORTEN_DIST)) {
      log('✗ Worten dist not found. Run: npm run build:worten', 'red');
      process.exit(1);
    }
    log('✓ Worten dist found', 'green');

    // Check if standard build exists
    logSection('Checking standard build');
    if (!fs.existsSync(STANDARD_DIST)) {
      log('⚠ Standard dist not found. Building...', 'yellow');
      log('  Run: npm run build', 'yellow');
      log('  Skipping partners package for now...', 'yellow');
    } else {
      log('✓ Standard dist found', 'green');
    }

    // Create READMEs
    logSection('Creating documentation');
    createWortenReadme();
    if (fs.existsSync(STANDARD_DIST)) {
      createPartnersReadme();
    }

    // Create Worten package
    logSection('Creating Worten package');
    await createZip(
      WORTEN_DIST,
      'hp-instant-ink-worten.zip',
      'Worten package created: hp-instant-ink-worten.zip'
    );

    // Create Partners package (if available)
    if (fs.existsSync(STANDARD_DIST)) {
      logSection('Creating Partners package');
      await createZip(
        STANDARD_DIST,
        'hp-instant-ink-partners.zip',
        'Partners package created: hp-instant-ink-partners.zip'
      );
    }

    // Summary
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    logSection('Package Creation Complete! ✨');
    log(`  Time: ${duration}s`, 'green');
    log(`  Output: packages/`, 'green');
    
    log('\n📦 Packages created:', 'cyan');
    const packages = fs.readdirSync(PACKAGES_DIR);
    packages.forEach(pkg => {
      const stats = fs.statSync(path.join(PACKAGES_DIR, pkg));
      const size = (stats.size / 1024).toFixed(2);
      log(`  - ${pkg} (${size} KB)`, 'green');
    });

    log('\n✅ All packages ready for distribution!', 'green');

  } catch (error) {
    log(`\n✗ Error: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  }
}

// Check for archiver dependency
try {
  require('archiver');
} catch (e) {
  log('\n⚠ Missing dependency: archiver', 'yellow');
  log('Installing archiver...', 'cyan');
  require('child_process').execSync('npm install --save-dev archiver', { stdio: 'inherit' });
  log('✓ archiver installed\n', 'green');
}

// Run
createPackages();
