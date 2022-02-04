import { formatDistanceToNowStrict, intervalToDuration, parseISO, format, isValid } from 'date-fns';
import { UI } from './view';

UI.form.addEventListener('submit', () => {
    const startTime = UI.input.value;
    const endTime = format(new Date(), `yyyy-MM-dd'T'HH:mm`);
    const { years, months, days, hours} = intervalToDuration({start: parseISO(startTime), end: parseISO(endTime)});
    // UI.result.textContent = `${formatDistanceToNowStrict(new Date(startTime), { addSuffix: true })}`;
    if (isValid(startTime)) return;
    UI.result.textContent = `Years: ${years}, months: ${months}, days: ${days}, hours: ${hours}`;
});
