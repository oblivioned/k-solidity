'use babel';

import utils from './module-editor-utils.js';

export default class ModuleEditorStructView {
    constructor(options) {
        const div = document.createElement('div');
        div.className = 'module-editor-section';

        const title = document.createElement('h1');
        title.classList.add('module-editor-section-heading');
        title.textContent = 'Struct';
        div.appendChild(title);

        const desc = document.createElement('p');
        desc.textContent = 'This is some descriptions with this storages.';
        div.appendChild(desc);

        const valueTable = document.createElement('ul');
        valueTable.className = 'module-editor-table';

        // Table Header
        valueTable.appendChild(this.header());

        // Table Cells
        for ( var r = 0; r < 10; r++ ) {
            valueTable.appendChild(this.cell({
                name: 'Name',
                type: 'uint256',
                defaultValue: '0',
                desc: 'Nothing',
            }));
        }

        div.appendChild(valueTable);

        this.element = div;
    }
    cell( opt ) {
        const cell = document.createElement('li');
        cell.className = 'module-editor-cell';

        const name = document.createElement('input');
        name.value = opt.name || 'Nullable';

        const type = document.createElement('label');
        type.innerText = opt.type || 'Nullable';

        const defaultValue = document.createElement('input');
        defaultValue.value = opt.defaultValue || 'Nullable';

        const desc = document.createElement('input');
        desc.value = opt.desc || 'Nullable';

        cell.appendChild(name);
        cell.appendChild(type);
        cell.appendChild(defaultValue);
        cell.appendChild(desc);

        return cell;
    }
    header() {
        // Table Header
        const lb_header = document.createElement('li');
        lb_header.className = 'module-editor-header';

        const dataSource = {
            headers: ["Name", "Type", "Default", "Description"],
        }

        for ( var header in dataSource.headers ) {
            var span = document.createElement('span');
            span.innerText= dataSource.headers[header]
            lb_header.appendChild(span);
        }

        return lb_header;
    }
}
