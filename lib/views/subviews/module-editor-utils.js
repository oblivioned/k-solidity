'use babel';

import { TextEditor } from 'atom';

export default class ModuleEditorUtils {
    static createInputView(options) {

        const cell = document.createElement('k-solidity-module-setting');
        cell.classList.add('module-editor-section-cell');

        const label = document.createElement('label');
        label.className = 'module-editor-section-cell-title'
        label.textContent = options.title;
        cell.appendChild(label);

        const input = new TextEditor({mini: true});

        input.placeholder = options.placeholder || 'please enter content.';
        input.text = options.content || "111";

        cell.appendChild(input.element);

        return cell;
    }
}
