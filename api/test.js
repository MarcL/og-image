const fs = require('fs').promises;
const path = require('path');
const getScreenshot = require('./screenshot');

async function writeScreenshot(url) {
    const screenshot = await getScreenshot(url, true);
  
    const filePath = path.join(__dirname, '../output');
    const filename = `screenshot-${Date.now()}.png`;

    const outputPath = `${filePath}/${filename}`;
    console.log(outputPath);

    await fs.writeFile(outputPath, screenshot, 'base64');

    return screenshot;
};

writeScreenshot('https://wesbos.com/static/371c801fdafdceaf31fae3f9aa991c37/f2e3f/sick-new-site.jpg')
    .then(() => {
        console.log('done');
        process.exit(0);
    })
    .catch(error => {
        console.error(error.toString());
        process.exit(1);
    });