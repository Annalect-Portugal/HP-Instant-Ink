# 📦 HP Instant Ink - Distribution Packages

Sistema de packaging para distribuição da landing page HP Instant Ink para diferentes parceiros.

## 🎯 Packages Disponíveis

### 1. **Worten Package** (`hp-instant-ink-worten.zip`)
**Tamanho**: ~8.3 MB  
**Destinado a**: Integração específica Worten

**Conteúdo**:
- `hp-instant-ink-worten.html` - HTML otimizado para Worten (~34.5 KB)
- `assets/images/` - 15 imagens otimizadas
- `assets/fonts/` - 12 ficheiros de fontes HP
- `README.md` - Instruções de integração Worten
- `build-report.json` - Relatório técnico do build

**Especificações Técnicas**:
- ✅ Limite de caracteres: 34,530 / 200,000 (17.27%)
- ✅ CSS inline (sem ficheiros externos)
- ✅ Classes prefixadas com `.hpi-`
- ✅ Z-index máximo: 1
- ✅ Background: #f6f6f6 (Worten brand)
- ✅ Container: 1312px (largura Worten)
- ✅ Sem tags `<head>` e `<body>` (apenas conteúdo)

---

### 2. **Partners Package** (`hp-instant-ink-partners.zip`)
**Tamanho**: ~16 MB  
**Destinado a**: Outros parceiros e integrações standard

**Conteúdo**:
- `index.html` - HTML standard completo
- `assets/images/` - 15 imagens
- `assets/fonts/` - 12 ficheiros de fontes HP
- `README.md` - Instruções de integração standard
- CSS e JS compilados

**Especificações Técnicas**:
- ✅ Design responsivo completo
- ✅ Container: 1200px (largura standard)
- ✅ Background: #ffffff (branco)
- ✅ Breakpoints: Desktop (>1024px), Tablet (768-1024px), Mobile (<768px)
- ✅ Classes prefixadas com `.hpi-`

---

## 🚀 Como Criar Packages

### Opção 1: Criar todos os packages de uma vez
```bash
npm run package:all
```
Este comando:
1. Faz rebuild da versão Worten (`npm run build:worten`)
2. Cria os packages ZIP (`npm run package`)

### Opção 2: Criar apenas packages (sem rebuild)
```bash
npm run package
```

### Opção 3: Comandos individuais
```bash
# 1. Build Worten
npm run build:worten

# 2. Build Standard (Parcel)
npm run build

# 3. Criar packages
npm run package
```

---

## 📁 Estrutura de Saída

Após executar o packaging, a seguinte estrutura é criada:

```
packages/
├── hp-instant-ink-worten.zip      (8.3 MB)
└── hp-instant-ink-partners.zip    (16 MB)
```

Cada ZIP contém:
```
hp-instant-ink-worten.zip
├── hp-instant-ink-worten.html
├── README.md
├── build-report.json
└── assets/
    ├── images/ (15 ficheiros)
    └── fonts/  (12 ficheiros)

hp-instant-ink-partners.zip
├── index.html
├── README.md
└── assets/
    ├── images/ (15 ficheiros)
    └── fonts/  (12 ficheiros)
```

---

## 📋 Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run package` | Cria packages ZIP |
| `npm run package:all` | Rebuild + criar packages |
| `npm run clean:packages` | Remove pasta packages/ |
| `npm run build:worten` | Build versão Worten |
| `npm run build` | Build versão standard |

---

## 🔧 Integração

### Para Worten
1. Extrair `hp-instant-ink-worten.zip`
2. Fazer upload da pasta `assets/` para o servidor
3. Copiar conteúdo de `hp-instant-ink-worten.html` para a plataforma Worten
4. Seguir instruções no `README.md` incluído

### Para Outros Parceiros
1. Extrair `hp-instant-ink-partners.zip`
2. Fazer upload de todos os ficheiros para o servidor
3. Ajustar caminhos de assets se necessário
4. Seguir instruções no `README.md` incluído

---

## ✅ Validação dos Packages

Após criar os packages, verificar:

**Worten Package**:
- [ ] HTML tem menos de 200 KB
- [ ] Todos os assets estão incluídos (15 images + 12 fonts)
- [ ] CSS está inline (não há ficheiros CSS externos)
- [ ] Classes prefixadas com `.hpi-`
- [ ] Z-index ≤ 1 em todos os elementos
- [ ] Background #f6f6f6
- [ ] Container 1312px

**Partners Package**:
- [ ] Todos os assets estão incluídos
- [ ] HTML e CSS compilados corretamente
- [ ] Design responsivo funciona
- [ ] Fontes HP carregam corretamente

---

## 🛠️ Troubleshooting

### "Missing dependency: archiver"
```bash
npm install
```

### Packages não foram criados
Verificar se os builds existem:
```bash
# Build Worten
npm run build:worten

# Build Standard
npm run build
```

### Tamanho do package muito grande
- Worten: ~8 MB (normal, inclui assets otimizados)
- Partners: ~16 MB (normal, inclui build completo do Parcel)

---

## 📊 Estatísticas

| Package | Tamanho | HTML Size | Assets | Fonts |
|---------|---------|-----------|--------|-------|
| Worten | 8.3 MB | 34.5 KB | 15 imgs | 12 fonts |
| Partners | 16 MB | ~100 KB | 15 imgs | 12 fonts |

---

## 🔐 Conformidade

### Worten
- ✅ Limite de caracteres respeitado (17.27% de 200 KB)
- ✅ Z-index máximo: 1
- ✅ Apenas classes CSS
- ✅ Sem estilos inline em tags
- ✅ Background Worten (#f6f6f6)

### Partners
- ✅ Design responsivo
- ✅ SEO otimizado
- ✅ Performance otimizada
- ✅ Acessibilidade

---

**Última atualização**: 25 de Fevereiro de 2026  
**Versão**: 1.0.0
