// build.js
// Production build: minifies HTML/CSS and heavily obfuscates JS
// Run with: node build.js
// Output goes to ./dist — that's the folder you deploy to Netlify.

const fs = require('fs');
const path = require('path');
const { minify: minifyJS } = require('terser');
const JavaScriptObfuscator = require('javascript-obfuscator');
const CleanCSS = require('clean-css');

const SRC = __dirname;
const OUT = path.join(__dirname, 'dist');

if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

async function buildJS(file) {
  const code = fs.readFileSync(path.join(SRC, file), 'utf8');

  // Step 1: minify with terser (shrinks + mangles names)
  const minified = await minifyJS(code, {
    mangle: true,
    compress: true,
  });

  // Step 2: obfuscate the minified output (control-flow flattening,
  // string encoding, dead code injection, etc.)
  const obfuscated = JavaScriptObfuscator.obfuscate(minified.code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    identifierNamesGenerator: 'hexadecimal',
    renameGlobals: false, // keep function names your HTML calls (e.g. switchToTab)
    selfDefending: true,
    disableConsoleOutput: true,
  });

  fs.writeFileSync(path.join(OUT, file), obfuscated.getObfuscatedCode());
  console.log(`  ✓ ${file}`);
}

function buildCSS(file) {
  const input = fs.readFileSync(path.join(SRC, file), 'utf8');
  const output = new CleanCSS({ level: 2 }).minify(input);
  fs.writeFileSync(path.join(OUT, file), output.styles);
  console.log(`  ✓ ${file}`);
}

function copyStatic(file) {
  fs.copyFileSync(path.join(SRC, file), path.join(OUT, file));
  console.log(`  ✓ ${file} (copied)`);
}

async function run() {
  console.log('Building production files into ./dist ...\n');

  console.log('JS (minify + obfuscate):');
  for (const f of ['app.js', 'data.js', 'map.js', 'obavijesti.js', 'legal.js']) {
    await buildJS(f);
  }

  console.log('\nCSS (minify):');
  buildCSS('style.css');
  buildCSS('fonts.css');
  buildCSS('legal.css');

  console.log('\nStatic files (copied as-is):');
  for (const f of [
    'index.html', 'privacy.html', 'terms.html', 'support.html',
    'site.webmanifest', 'android192.png', 'android512.png', 'apple-ikonica.png', 'sw.js'
  ]) {
    if (fs.existsSync(path.join(SRC, f))) copyStatic(f);
  }

  console.log('\nFonts (copied as-is):');
  const fontsDir = path.join(SRC, 'fonts');
  if (fs.existsSync(fontsDir)) {
    const outFontsDir = path.join(OUT, 'fonts');
    if (!fs.existsSync(outFontsDir)) fs.mkdirSync(outFontsDir);
    for (const f of fs.readdirSync(fontsDir)) {
      fs.copyFileSync(path.join(fontsDir, f), path.join(outFontsDir, f));
      console.log(`  ✓ fonts/${f} (copied)`);
    }
  }

  console.log('\nDone. Deploy the contents of dist/ to Netlify.');
}

run().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
