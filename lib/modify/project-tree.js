'use babel';

export default class KSolidityModifyProjectTree {
    constructor() {
        this.element = document.getElementsByClassName('entries list-tree');
        console.log( this.element );

        this.rerenderTree();
    }

    rerenderTree() {
        for ( var e in this.element ) {
            console.log(this.element[e].innerText);
        }
    }
}
