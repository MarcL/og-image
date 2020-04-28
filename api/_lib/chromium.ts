import { launch, Page } from 'puppeteer-core';
import { getOptions } from './options';
import { FileType } from './types';
let _page: Page | null;

// 1200 x 630 - 1:1.9
const IMAGE_MULTIPLIER = 1.0;
const IMAGE_WIDTH = 1200 * IMAGE_MULTIPLIER;
const IMAGE_HEIGHT = 630 * IMAGE_MULTIPLIER;

async function getPage(isDev: boolean) {
    if (_page) {
        return _page;
    }
    const options = await getOptions(isDev);
    const browser = await launch(options);
    _page = await browser.newPage();
    return _page;
}

export async function getScreenshot(url: string, type: FileType, isDev: boolean) {
    const page = await getPage(isDev);
    await page.setViewport({ width: IMAGE_WIDTH, height: IMAGE_HEIGHT });
    await page.goto(url);
    const file = await page.screenshot({ type });
    return file;
}
