'use babel';

import utils from './module-editor-utils.js';

export default class ModuleEditorInfoView {
    constructor(options) {
        const div = document.createElement('div');
        div.className = 'module-editor-section';

        const title = document.createElement('h1');
        title.classList.add('module-editor-section-heading');
        title.textContent = 'Infomations';
        div.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = 'This is some descriptions with this modules.';
        div.appendChild(desc);

        // cells
        div.appendChild(utils.createInputView({
            title: 'Name',
            placeholder: 'please enter module name.'
        }));

        div.appendChild(utils.createInputView({
            title: 'WebSite',
            placeholder: 'please enter website.'
        }));

        div.appendChild(utils.createInputView({
            title: 'Author',
            placeholder: 'please enter author.'
        }));

        div.appendChild(utils.createInputView({
            title: 'Copyright',
            placeholder: 'please enter copyright infomations.'
        }));

        this.element = div;
    }
}
