'use babel';

import utils from './module-editor-utils.js';

export default class ModuleEditorExtendsView {
    constructor(options) {
        const div = document.createElement('div');
        div.className = 'module-editor-section';

        const title = document.createElement('h1');
        title.classList.add('module-editor-section-heading');
        title.textContent = 'Extends';
        div.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = 'This is some descriptions with this storages.';
        div.appendChild(desc);

        this.element = div;
    }
}
