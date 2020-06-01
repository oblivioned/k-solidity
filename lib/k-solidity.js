'use babel';

import {
    CompositeDisposable
} from 'atom';

import KSolidityViewRoute from './views/index.js';

export default {
    subscriptions: null,
    viewRoute: null,
    activate(state) {

        // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
        this.subscriptions = new CompositeDisposable();
        this.viewRoute = new KSolidityViewRoute(this.subscriptions);

        // Register command that toggles this view
        this.subscriptions.add(atom.commands.add('atom-workspace', {
            'k-solidity:daemon': () => this.daemon(),
            'k-solidity:shutdown': () => this.shutdown(),

            'k-solidity:views:welcome': () => this.viewRoute.show('k-solidity-view-welcome', {
                location: 'center',
                activatePane: true
            }),
            'k-solidity:views:project': () => this.viewRoute.show('k-solidity-view-project', {
                location: 'left',
                activatePane: true
            })
        }));
    },
    deactivate() {
        this.subscriptions.dispose();
        this.viewRoute.destroy();
    },
    serialize() {},
    daemon() {
        // this.viewRoute.show('k-solidity-view-welcome', {
        //     location: 'center',
        //     activatePane: true
        // });
    },
    shutdown() {}
};
