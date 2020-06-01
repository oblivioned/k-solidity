'use babel';

import ViewWelcome from './welcome.js';
import ViewProject from './project.js';
import ViewModuleEditor from './module-editor.js';

export default class KSolidityViewRoute {
    constructor(subscriptions) {
        this.viewsMapping = {
            'k-solidity-view-project': (url) => new ViewProject(url),
            'k-solidity-view-welcome': (url) => new ViewWelcome(url),
        };
        this.activityViews = {};

        subscriptions.add(atom.workspace.addOpener((urlString) => {

            try {

                // 打开模块编辑器
                if ( urlString.endsWith(".ksol") ) {
                    return new ViewModuleEditor(urlString);
                }

                const url = new URL(urlString);

                if (
                    url.protocol !== 'k-solidity:' ||
                    url.searchParams.get('action') !== 'showview'
                ) {
                    return;
                }

                const pageClass = url.searchParams.get('classname');
                if (this.viewsMapping[pageClass]) {
                    return this.viewsMapping[pageClass](url);
                }

            } catch (e) {

            }

        }));
    }

    show(className, options) {
        atom.workspace.open('k-solidity://?action=showview&classname=' + className, options).then(view => {
            this.activityViews[className] = view;
        });
    }

    destroy() {
        for (var subview in this.activityViews) {
            this.activityViews[subview].destroy();
        }
    }
};
