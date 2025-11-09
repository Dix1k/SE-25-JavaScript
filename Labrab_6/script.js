const puppeteer = require('puppeteer');
const fs = require('fs');

const SEARCH_TERM = 'наушники';
const PAGES_TO_SCRAPE = 3;
const DELAY_MS = 8000; // Увеличенная пауза

async function scrapePage(page, pageNum) {
    console.log(`Загружаем страницу ${pageNum}...`);

    const url = `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(SEARCH_TERM)}&sort=priceasc&page=${pageNum}`;
    
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

    // Ждём товары и прокручиваем страницу
    try {
        await page.waitForSelector('article', { timeout: 15000 });
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
        await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (e) {
        console.warn(`На странице ${pageNum} не найдены товары`);
        return [];
    }

    const products = await page.evaluate(() => {
        const items = [];
        document.querySelectorAll('article').forEach(card => {
            // Бренд (ищем внутри карточки)
            let brand = null;
            const brandEl = card.querySelector('[class*="brand"]') || card.querySelector('.brand');
            if (brandEl) brand = brandEl.textContent.trim();

            // Название
            let name = null;
            const nameEl = card.querySelector('[class*="name"]') || card.querySelector('.name');
            if (nameEl) name = nameEl.textContent.trim();

            // Рейтинг и отзывы
            let rating = null, reviewsCount = 0;
            const ratingEl = card.querySelector('[aria-label*="рейтинг"]');
            if (ratingEl) {
                const label = ratingEl.getAttribute('aria-label');
                const match = label?.match(/([\d,]+)/);
                if (match) rating = parseFloat(match[1].replace(',', '.'));
            }
            const reviewsEl = card.querySelector('[class*="reviews"]') || card.querySelector('.reviews');
            if (reviewsEl) {
                const text = reviewsEl.textContent;
                const match = text.match(/(\d+)/);
                if (match) reviewsCount = parseInt(match[1], 10);
            }

            // Цены
            let priceCurrent = 0, priceBase = 0;
            const priceCurrEl = card.querySelector('[class*="price-current"]') || card.querySelector('.price-current');
            if (priceCurrEl) {
                priceCurrent = parseInt(priceCurrEl.textContent.replace(/[^\d]/g, ''), 10) || 0;
            }
            const priceOldEl = card.querySelector('[class*="price-old"]') || card.querySelector('.price-old');
            if (priceOldEl) {
                priceBase = parseInt(priceOldEl.textContent.replace(/[^\d]/g, ''), 10) || priceCurrent;
            } else {
                priceBase = priceCurrent;
            }

            // Ссылка
            let link = null;
            const linkEl = card.querySelector('a[href^="/catalog/"]');
            if (linkEl) {
                link = `https://www.wildberries.ru${linkEl.getAttribute('href')}`;
            }

            // Характеристики (до 4)
            const characteristics = [];
            const params = card.querySelectorAll('[class*="param-key"], [class*="param-value"]');
            for (let i = 0; i < params.length - 1; i += 2) {
                const key = params[i]?.textContent.trim();
                const value = params[i + 1]?.textContent.trim();
                if (key && value && characteristics.length < 4) {
                    characteristics.push({ [key]: value });
                }
            }

            items.push({
                brand,
                name,
                reviewsCount,
                rating,
                link,
                priceCurrent,
                priceBase,
                characteristics
            });
        });
        return items;
    });

    console.log(`На странице ${pageNum} найдено ${products.length} товаров.`);
    return products;
}

async function main() {
    let allProducts = [];

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // Меняем User-Agent для каждой страницы
        await page.setUserAgent(`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${Math.floor(Math.random() * 100) + 120}.0.0.0 Safari/537.36`);

        // Общее количество товаров
        const firstUrl = `https://www.wildberries.ru/catalog/0/search.aspx?search=${encodeURIComponent(SEARCH_TERM)}`;
        await page.goto(firstUrl, { waitUntil: 'networkidle2' });
        
        const totalCount = await page.evaluate(() => {
            const el = document.querySelector('[class*="total-count"]') || document.querySelector('.total-count');
            return el ? parseInt(el.textContent.replace(/[^\d]/g, ''), 10) : 0;
        });
        console.log(`Всего товаров по запросу: ${totalCount}`);

        // Парсинг страниц
        for (let pageNum = 1; pageNum <= PAGES_TO_SCRAPE; pageNum++) {
            const pageProducts = await scrapePage(page, pageNum);
            allProducts = allProducts.concat(pageProducts);

            if (pageNum < PAGES_TO_SCRAPE) {
                console.log(`Ожидание ${DELAY_MS / 1000} сек. перед следующей страницей...`);
                await new Promise(resolve => setTimeout(resolve, DELAY_MS));
            }
        }

        await browser.close();

        // Сортировка по убыванию цены
        allProducts.sort((a, b) => b.priceCurrent - a.priceCurrent);

        // Сохранение
        fs.writeFileSync('products.json', JSON.stringify(allProducts, null, 2), 'utf8');
        console.log('Данные сохранены в products.json');
        console.log(`Всего собрано товаров: ${allProducts.length}`);

    } catch (error) {
        console.error('Ошибка:', error);
    }
}

main();
