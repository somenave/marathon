import { formatDistanceToNowStrict } from 'date-fns';
import { UI } from './view';

UI.form.addEventListener('submit', () => {
    const inputValue = UI.input.value;
    UI.result.textContent = `${formatDistanceToNowStrict(new Date(inputValue), { addSuffix: true })}`;
});
