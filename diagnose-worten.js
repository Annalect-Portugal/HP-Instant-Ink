// Script de Diagnóstico Completo - Verifica ficheiro vs servidor
const fs = require('fs');
const path = require('path');
const http = require('http');

const wortenFile = path.join(__dirname, 'worten-dist', 'hp-instant-ink-worten.html');
const serverUrl = 'http://localhost:8080/worten-dist/hp-instant-ink-worten.html';

console.log('\n🔍 DIAGNÓSTICO COMPLETO - Ficheiro vs Servidor\n');
console.log('═'.repeat(70));

// 1. Verificar ficheiro no disco
console.log('\n📁 FICHEIRO NO DISCO:');
console.log('─'.repeat(70));

if (!fs.existsSync(wortenFile)) {
  console.log('❌ Ficheiro não encontrado:', wortenFile);
  process.exit(1);
}

const fileStats = fs.statSync(wortenFile);
const fileContent = fs.readFileSync(wortenFile, 'utf-8');

console.log('✅ Ficheiro existe');
console.log('📊 Tamanho:', fileContent.length.toLocaleString(), 'bytes');
console.log('🕒 Última modificação:', fileStats.mtime.toLocaleString('pt-PT'));

// Verificar timestamp no HTML
const timestampMatch = fileContent.match(/Generated at: ([^\n]+)/);
if (timestampMatch) {
  console.log('⏰ Timestamp gerado:', timestampMatch[1]);
}

// 2. Verificar regras CSS importantes
console.log('\n📐 REGRAS CSS !important NO FICHEIRO:');
console.log('─'.repeat(70));

const cssRules = [
  { name: 'hpi-savings-image img', pattern: 'width:auto!important;height:265px!important' },
  { name: 'hpi-promo-image img', pattern: 'width:auto!important;height:275px!important' },
  { name: 'hpi-what-is-image img', pattern: 'width:auto!important;height:320px!important' },
  { name: 'hpi-benefit-item img', pattern: 'width:auto!important;height:275px!important' }
];

let fileHasAllRules = true;
cssRules.forEach(rule => {
  const found = fileContent.includes(rule.pattern);
  const icon = found ? '✅' : '❌';
  console.log(`${icon} ${rule.name}`);
  if (!found) fileHasAllRules = false;
});

if (fileHasAllRules) {
  console.log('\n✅ Todas as regras !important estão presentes no ficheiro');
} else {
  console.log('\n❌ ERRO: Algumas regras !important estão em falta!');
}

// 3. Verificar servidor HTTP
console.log('\n🌐 SERVIDOR HTTP:');
console.log('─'.repeat(70));

http.get(serverUrl, (res) => {
  let serverContent = '';
  
  res.on('data', (chunk) => {
    serverContent += chunk;
  });
  
  res.on('end', () => {
    console.log('✅ Servidor respondeu');
    console.log('📊 Tamanho da resposta:', serverContent.length.toLocaleString(), 'bytes');
    console.log('📝 Status Code:', res.statusCode);
    console.log('📦 Headers Cache-Control:', res.headers['cache-control'] || 'não definido');
    console.log('📦 Headers Last-Modified:', res.headers['last-modified'] || 'não definido');
    console.log('📦 Headers ETag:', res.headers['etag'] || 'não definido');
    
    // Verificar regras CSS no servidor
    console.log('\n📐 REGRAS CSS !important NO SERVIDOR:');
    console.log('─'.repeat(70));
    
    let serverHasAllRules = true;
    cssRules.forEach(rule => {
      const found = serverContent.includes(rule.pattern);
      const icon = found ? '✅' : '❌';
      console.log(`${icon} ${rule.name}`);
      if (!found) serverHasAllRules = false;
    });
    
    if (serverHasAllRules) {
      console.log('\n✅ Todas as regras !important estão presentes no servidor');
    } else {
      console.log('\n❌ ERRO: Algumas regras !important estão em falta no servidor!');
    }
    
    // 4. Comparar ficheiro vs servidor
    console.log('\n🔄 COMPARAÇÃO FICHEIRO vs SERVIDOR:');
    console.log('─'.repeat(70));
    
    if (fileContent === serverContent) {
      console.log('✅ PERFEITO! Ficheiro e servidor são IDÊNTICOS');
    } else {
      console.log('⚠️  AVISO: Ficheiro e servidor são DIFERENTES!');
      console.log('   Diferença de tamanho:', Math.abs(fileContent.length - serverContent.length), 'bytes');
      
      // Tentar encontrar diferenças
      const lines = fileContent.split('\n').length;
      const serverLines = serverContent.split('\n').length;
      console.log('   Linhas no ficheiro:', lines);
      console.log('   Linhas no servidor:', serverLines);
      
      if (fileContent.length > serverContent.length) {
        console.log('   ⚠️  Ficheiro tem MAIS conteúdo que servidor (servidor pode estar com cache!)');
      } else if (serverContent.length > fileContent.length) {
        console.log('   ⚠️  Servidor tem MAIS conteúdo que ficheiro (ficheiro pode não ter sido atualizado!)');
      }
    }
    
    // 5. Resumo final
    console.log('\n📋 RESUMO DO DIAGNÓSTICO:');
    console.log('═'.repeat(70));
    
    const issues = [];
    
    if (!fileHasAllRules) issues.push('Regras CSS em falta no ficheiro');
    if (!serverHasAllRules) issues.push('Regras CSS em falta no servidor');
    if (fileContent !== serverContent) issues.push('Ficheiro e servidor diferentes');
    
    if (issues.length === 0) {
      console.log('✅ TUDO OK! Sem problemas detectados.');
      console.log('\n💡 Se as alterações ainda não aparecem no browser:');
      console.log('   1. Use Ctrl+Shift+R (hard reload) no browser');
      console.log('   2. Abra: http://localhost:8080/test-worten-direct.html');
      console.log('   3. Use o botão "Force Reload Iframe" em worten-demo.html');
      console.log('   4. Verifique a DevTools Console do browser');
      console.log('   5. Limpe completamente o cache do browser (DevTools > Application > Clear storage)');
    } else {
      console.log('❌ PROBLEMAS DETECTADOS:');
      issues.forEach((issue, i) => {
        console.log(`   ${i + 1}. ${issue}`);
      });
      
      console.log('\n🔧 SOLUÇÕES:');
      if (!fileHasAllRules) {
        console.log('   • Execute: npm run build:worten');
      }
      if (!serverHasAllRules) {
        console.log('   • Reinicie o servidor: npx http-server -p 8080 -c-1');
      }
      if (fileContent !== serverContent) {
        console.log('   • Reinicie o servidor com: npx http-server -p 8080 -c-1');
        console.log('   • Verifique se há outro servidor a correr na porta 8080');
      }
    }
    
    console.log('\n═'.repeat(70));
    console.log('✅ Diagnóstico completo!\n');
  });
}).on('error', (err) => {
  console.log('❌ ERRO ao conectar ao servidor:', err.message);
  console.log('\n🔧 SOLUÇÃO:');
  console.log('   Execute: npx http-server -p 8080 -c-1');
  console.log('\n═'.repeat(70));
  console.log('❌ Diagnóstico falhou devido a erro de servidor\n');
});
