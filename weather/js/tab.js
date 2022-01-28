import { UI } from './view.js';

function showTab(tabName) {
    UI.TABS_CONTENT.forEach(tabContent => {
        tabContent.classList.contains(tabName) ? tabContent.classList.add('active') : tabContent.classList.remove('active');
    });
}

export function tabsHandler() {
    UI.TABS.forEach(tab => {
        tab.classList.remove('active');
        this.classList.add('active');
        const tabName = this.getAttribute('data-tab');
        showTab(tabName);
    });
}
