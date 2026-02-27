#!/usr/bin/env node

/**
 * Analisa conflitos entre regras CSS desktop e media queries
 */

const fs = require('fs');
const path = require('path');

const wortenFile = path.join(__dirname, 'worten-dist', 'hp-instant-ink-worten.html');
const content = fs.readFileSync(wortenFile, 'utf-8');

// Extrai o CSS inline
const cssMatch = content.match(/<style>(.*?)<\/style>/s);
if (!cssMatch) {
  console.log('❌ CSS não encontrado');
  process.exit(1);
}

const css = cssMatch[1];

// Extrai regras desktop (antes dos media queries)
const desktopCSSMatch = css.match(/(.*?)@media/s);
const desktopCSS = desktopCSSMatch ? desktopCSSMatch[1] : css;

// Extrai todos os media queries
const mediaQueries = {
  '1024px': css.match(/@media\(max-width: 1024px\)\{([^}]+\})+/g)?.[0] || '',
  '768px': css.match(/@media\(max-width: 768px\)\{([^}]+\})+/g)?.[0] || '',
  '480px': css.match(/@media\(max-width: 480px\)\{([^}]+\})+/g)?.[0] || '',
  '360px': css.match(/@media\(max-width: 360px\)\{([^}]+\})+/g)?.[0] || '',
};

// Função para extrair propriedades de uma classe
function extractProperties(cssText, className) {
  const regex = new RegExp(`\\.${className.replace('.', '')}\\{([^}]+)\\}`, 'g');
  const matches = [];
  let match;
  
  while ((match = regex.exec(cssText)) !== null) {
    const props = match[1].split(';').filter(p => p.trim());
    matches.push(...props);
  }
  
  return matches;
}

// Função para obter apenas a propriedade (sem valor)
function getPropName(prop) {
  return prop.split(':')[0].trim();
}

// Analisa conflitos
console.log('\n🔍 ANÁLISE DE CONFLITOS CSS - Desktop vs Media Queries\n');
console.log('='.repeat(80));

const conflicts = [];

// Classes com imagens que já têm !important
const imageClasses = [
  'hpi-savings-image img',
  'hpi-promo-image img', 
  'hpi-what-is-image img',
  'hpi-benefit-item img'
];

console.log('\n📐 CLASSES DE IMAGENS (com !important aplicado):');
imageClasses.forEach(cls => {
  const desktopProps = extractProperties(desktopCSS, cls);
  console.log(`\n  ${cls}:`);
  console.log(`    Desktop: ${desktopProps.join('; ')}`);
  
  Object.keys(mediaQueries).forEach(breakpoint => {
    const mobileProps = extractProperties(mediaQueries[breakpoint], cls);
    if (mobileProps.length > 0) {
      console.log(`    @${breakpoint}: ${mobileProps.join('; ')} ⚠️ (sobrescrito por !important)`);
    }
  });
});

// Outras classes para analisar
const classesToCheck = [
  'hpi-how-item img',
  'hpi-hero-image-wrapper',
  'hpi-hero-image-wrapper img',
  'hpi-hero-right img',
  'hpi-container',
  'hpi-btn-primary',
  'hpi-btn-black',
  'hpi-hero-logo',
  'hpi-hero-brand-text',
  'hpi-savings-text h1',
  'hpi-promo-text h2',
  'hpi-what-is-text h2',
  'hpi-how-header h2',
  'hpi-benefit-item',
  'hpi-benefits-grid',
  'hpi-how-grid',
  'hpi-plans-grid'
];

console.log('\n\n🔎 OUTRAS CLASSES IMPORTANTES:\n');

classesToCheck.forEach(className => {
  const desktopProps = extractProperties(desktopCSS, className);
  
  if (desktopProps.length === 0) return;
  
  const conflictingProps = {};
  
  Object.keys(mediaQueries).forEach(breakpoint => {
    const mobileProps = extractProperties(mediaQueries[breakpoint], className);
    
    if (mobileProps.length > 0) {
      mobileProps.forEach(mobileProp => {
        const propName = getPropName(mobileProp);
        
        // Verifica se existe no desktop
        const desktopProp = desktopProps.find(p => getPropName(p) === propName);
        
        if (desktopProp) {
          if (!conflictingProps[propName]) {
            conflictingProps[propName] = {
              desktop: desktopProp,
              mobile: {}
            };
          }
          conflictingProps[propName].mobile[breakpoint] = mobileProp;
        }
      });
    }
  });
  
  if (Object.keys(conflictingProps).length > 0) {
    console.log(`\n  .${className}:`);
    console.log(`    Desktop: ${desktopProps.join('; ')}`);
    
    Object.keys(conflictingProps).forEach(propName => {
      const conflict = conflictingProps[propName];
      console.log(`    \n    ⚠️  Propriedade: ${propName}`);
      console.log(`        Desktop: ${conflict.desktop}`);
      Object.keys(conflict.mobile).forEach(bp => {
        console.log(`        @${bp}: ${conflict.mobile[bp]}`);
      });
    });
    
    conflicts.push({ className, conflicts: conflictingProps });
  }
});

console.log('\n\n' + '='.repeat(80));
console.log(`\n📊 RESUMO: ${conflicts.length} classes com conflitos detectados\n`);

if (conflicts.length > 0) {
  console.log('⚠️  CLASSES QUE PODEM PRECISAR DE !important:\n');
  conflicts.forEach(c => {
    const props = Object.keys(c.conflicts);
    console.log(`  • .${c.className}`);
    console.log(`    Propriedades afetadas: ${props.join(', ')}`);
  });
}

console.log('\n✅ Análise completa!\n');
