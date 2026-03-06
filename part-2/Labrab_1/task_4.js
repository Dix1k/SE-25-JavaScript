const fs = require('fs');
const html = fs.readFileSync('Погода7.html', 'utf8');

const dateMatches = [...html.matchAll(/<div class="dayweek[^>]*">(\d{2}\s[а-я]+)<\/div>\s*<div class="dayweek_week">([а-я]{2})<\/div>/gi)];
const dates = dateMatches.map(m => ({ date: m[1], dayOfWeek: m[2] }));

const sunMatches = [...html.matchAll(/Восход:\s*(\d{2}:\d{2})<br\/>\s*Закат:\s*(\d{2}:\d{2})/gi)];
const sunTimes = sunMatches.slice(1).map(m => ({ sunrise: m[1], sunset: m[2] }));
    
console.log('Прогноз на неделю:\n' + '-'.repeat(50));
    
const minLength = Math.min(dates.length, sunTimes.length, 7);
for (let i = 0; i < minLength; i++) {
    console.log(
        `${dates[i].date.padEnd(12)} ${dates[i].dayOfWeek.padEnd(4)} ` +
        `Восход: ${sunTimes[i].sunrise}  Закат: ${sunTimes[i].sunset}`
    );
}
