# GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

## 🚀 Setup Instructions

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. Click **Save**

### 2. Automatic Deployment

The site will automatically build and deploy when:
- You push to the `main` branch
- You manually trigger the workflow from the Actions tab

### 3. Access Your Site

After the first successful deployment, your site will be available at:
```
https://annalect-portugal.github.io/HP-Instant-Ink/
```

## 📦 Build Process

The GitHub Actions workflow will:
1. Check out the code
2. Install Node.js dependencies
3. Build the project using Parcel (compiles Pug → HTML, SCSS → CSS)
4. Deploy the `dist` folder to GitHub Pages

## 🔧 Manual Deployment

To test the build locally before pushing:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# The output will be in the dist/ folder
```

## 📁 Project Structure

```
instant-ink-fev-2026/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow
├── .nojekyll                 # Disables Jekyll processing
├── src/                      # Source files (Pug, SCSS)
├── dist/                     # Built files (created by Parcel)
└── package.json              # Build scripts
```

## ⚙️ Configuration Files

### .nojekyll
Empty file that tells GitHub Pages not to process files with Jekyll. This is important for proper asset loading.

### .github/workflows/deploy.yml
GitHub Actions workflow that automates the build and deployment process.

### package.json
Contains the build script:
```json
"build": "parcel build src/index.pug --public-url ./ --dist-dir dist"
```

The `--public-url ./` flag ensures all asset paths are relative, which is necessary for GitHub Pages.

## 🐛 Troubleshooting

### Workflow failing?
- Check the **Actions** tab in your GitHub repository
- Look at the error logs for specific issues
- Ensure all dependencies in `package.json` are correctly listed

### Assets not loading?
- Make sure the build script includes `--public-url ./`
- Verify that `.nojekyll` file exists in the root
- Check browser console for 404 errors

### Page not updating?
- Check if the workflow completed successfully in the Actions tab
- GitHub Pages may take a few minutes to update after deployment
- Try a hard refresh in your browser (Ctrl + Shift + R)

## 🔄 Workflow Status

Check the deployment status:
1. Go to the **Actions** tab in your GitHub repository
2. Look for the "Deploy to GitHub Pages" workflow
3. Each push will show a new workflow run

## 📝 Notes

- The `dist/` folder is gitignored and built fresh on each deployment
- Images should be placed in `src/assets/images/` to be included in the build
- The site uses relative paths for all assets
