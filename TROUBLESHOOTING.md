# 🔧 Troubleshooting - Worten Integration

## ⚠️ PROBLEMA: Alterações CSS não aparecem no browser

### Causa: Cache agressivo do browser (especialmente em iframes)

### ✅ Soluções (em ordem de eficácia):

#### 1. **Use test-worten-direct.html** (RECOMENDADO)
```
http://localhost:8080/test-worten-direct.html
```
- ✅ Carrega HTML diretamente (sem iframe = sem cache de iframe)
- ✅ Verifica regras CSS `!important` automaticamente
- ✅ Botão "Verificar CSS !important" para confirmar
- ✅ Botão "Reload Content" força nova requisição

#### 2. **Use Force Reload no worten-demo.html**
```
http://localhost:8080/worten-demo.html
```
1. Clique no botão vermelho **"🔃 Force Reload Iframe"** no topo
2. Verifique a console (F12) para logs: `✓ Iframe resized to: XXXXpx`
3. Se não funcionar, continue para solução 3

#### 3. **Hard Reload com DevTools aberta**
1. Abra DevTools (F12)
2. **Clique com botão direito** no ícone de reload
3. Selecione **"Empty Cache and Hard Reload"**
4. Mantenha DevTools aberta enquanto testa

#### 4. **Limpar cache completamente**
1. Abra DevTools (F12)
2. Vá para tab **Application**
3. Storage > **Clear site data**
4. Marque todos os checkboxes
5. Clique **Clear data**
6. Feche o browser completamente
7. Reabra e acesse novamente

#### 5. **Modo Incógnito** (última instância)
```
Ctrl + Shift + N (Chrome) ou Ctrl + Shift + P (Firefox)
```
Depois acesse: `http://localhost:8080/test-worten-direct.html`

---

## 📏 PROBLEMA: Iframe sem altura (conteúdo cortado)

### Diagnóstico:
1. Abra DevTools Console (F12)
2. Procure por logs:
   - `✅ Iframe onload event fired`
   - `✓ Iframe resized to: XXXXpx`
3. Se NÃO aparecer, há problema no resize

### ✅ Soluções:

#### A. Force Reload Iframe
- Clique no botão **"🔃 Force Reload Iframe"** (vermelho, topo)
- Deve aparecer novo timestamp e resize automático

#### B. Verifique a console para erros
Procure por:
- `❌ Erro ao redimensionar iframe:`
- `⚠️ Iframe document not ready`
- `⚠️ Could not calculate iframe height`

Se aparecer erro de CORS:
```
❌ Blocked a frame with origin "http://localhost:8080" from accessing...
```
**Causa:** Servidor não está rodando ou está em porta diferente
**Solução:** Execute `npx http-server -p 8080 -c-1`

#### C. Fallback manual
Se tudo falhar, o iframe usa altura fixa de **3500px**. Verifique na console:
```
⚠️ Could not calculate iframe height, using fallback
```

---

## 🖼️ PROBLEMA: Imagens não aparecem

### Em test-worten-direct.html:
✅ **Já corrigido!** Os paths são ajustados automaticamente:
- De: `./assets/images/hero-img.png`
- Para: `./worten-dist/assets/images/hero-img.png`

Se ainda não aparecer, verifique:
1. Ficheiro existe em `worten-dist/assets/images/`
2. Console (F12) mostra erro 404 para qual imagem?
3. Execute: `npm run build:worten` para regenerar

### Em worten-demo.html (iframe):
Imagens devem carregar normalmente do iframe. Se não:
1. Verifique se `worten-dist/assets/images/` existe
2. Abra diretamente: `http://localhost:8080/worten-dist/hp-instant-ink-worten.html`
3. Se funcionar direto mas não no iframe = problema de cache
4. Use Force Reload Iframe

---

## 🎨 PROBLEMA: Dimensões CSS estão erradas

### Verificação:
```bash
node diagnose-worten.js
```

Deve mostrar:
```
✅ Todas as regras !important estão presentes no ficheiro
✅ Todas as regras !important estão presentes no servidor
✅ PERFEITO! Ficheiro e servidor são IDÊNTICOS
```

Se mostrar ❌, siga a solução sugerida no output.

### Regras CSS esperadas:
- `.hpi-savings-image img`: `width:auto!important;height:265px!important`
- `.hpi-promo-image img`: `width:auto!important;height:275px!important`
- `.hpi-what-is-image img`: `width:auto!important;height:320px!important`
- `.hpi-benefit-item img`: `width:auto!important;height:275px!important`

### Verificar no browser:
1. Abra DevTools (F12)
2. Inspect element na imagem
3. Tab **Computed** no DevTools
4. Procure por `height` e `width`
5. Deve mostrar valores fixos acima, não `auto`

---

## 🔄 PROBLEMA: Rebuild não atualiza ficheiro

### Verificação:
```powershell
# Ver timestamp do ficheiro
Get-Item "worten-dist\hp-instant-ink-worten.html" | Select-Object LastWriteTime

# Rebuild
npm run build:worten

# Ver novo timestamp
Get-Item "worten-dist\hp-instant-ink-worten.html" | Select-Object LastWriteTime
```

### Se timestamp não mudou:
1. Veja se há erros no console do build
2. Verifique se `build-worten.js` existe
3. Veja `package.json` para comando correto:
   ```json
   "scripts": {
     "build:worten": "node build-worten.js"
   }
   ```

---

## 🌐 PROBLEMA: Servidor HTTP não responde

### Verificação:
```powershell
Test-NetConnection -ComputerName localhost -Port 8080 -InformationLevel Quiet
```
- `True` = Servidor rodando ✅
- `False` = Servidor parado ❌

### Reiniciar servidor:
```powershell
# 1. Matar processos existentes (se necessário)
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# 2. Iniciar servidor sem cache
npx http-server -p 8080 -c-1
```

### Verificar porta em uso:
```powershell
netstat -ano | findstr :8080
```

Se porta 8080 ocupada por outro processo:
1. Use porta diferente: `npx http-server -p 8081 -c-1`
2. Atualize URLs para `http://localhost:8081/...`

---

## 🧪 Ferramentas de Diagnóstico

### 1. Analisar conflitos CSS
```bash
node analyze-css-conflicts.js
```
Mostra quais media queries estão a sobrepor regras desktop.

### 2. Diagnóstico completo
```bash
node diagnose-worten.js
```
Compara ficheiro vs servidor, verifica regras CSS, tamanho, timestamps.

### 3. Verificar build
```bash
npm run build:worten
```
Console deve mostrar:
```
✅ Build completed successfully!
📊 Size: 35,XXX / 200,000 chars (XX.XX%)
```

---

## 📞 Última Instância

Se nada funcionar:

1. **Reset completo:**
```powershell
# Rebuild completo
npm run build:worten

# Reiniciar servidor
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
npx http-server -p 8080 -c-1

# Abrir em modo incógnito
Start-Process "chrome.exe" -ArgumentList "--incognito http://localhost:8080/test-worten-direct.html"
```

2. **Verificar ficheiros:**
```powershell
# Listar ficheiros gerados
Get-ChildItem -Path "worten-dist" -Recurse | Select-Object Name, Length, LastWriteTime
```

3. **Console logs essenciais:**
No browser (F12 > Console), procure por:
- 🔄 Iframe reloaded with cache-busting: XXXXX
- ✅ Iframe onload event fired
- ✓ Iframe resized to: XXXXpx
- ✅ REGRAS !important ENCONTRADAS

4. **Comparar ficheiros:**
```bash
# Ver tamanho do ficheiro
(Get-Content "worten-dist\hp-instant-ink-worten.html").Length

# Ver se !important está presente
Get-Content "worten-dist\hp-instant-ink-worten.html" | Select-String "width:auto!important;height:265px!important"
```

---

## ✅ Checklist Final

Antes de reportar problema, confirme:

- [ ] Servidor HTTP rodando: `http://localhost:8080`
- [ ] Ficheiro existe: `worten-dist/hp-instant-ink-worten.html`
- [ ] Build recente: timestamp nas últimas horas
- [ ] Regras CSS presentes: execute `node diagnose-worten.js`
- [ ] Cache limpo: Hard reload com DevTools aberta
- [ ] Console sem erros: F12 > Console (sem mensagens vermelhas CORS/404)
- [ ] Testado em modo incógnito
- [ ] Testado em `test-worten-direct.html`

Se todos ✅ e ainda não funciona, descreva:
1. Qual ferramenta usou (demo, test-direct, ou direto)
2. O que vê na console (F12)
3. Screenshot do problema
4. Output de `node diagnose-worten.js`
