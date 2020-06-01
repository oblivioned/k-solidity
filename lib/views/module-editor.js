'use babel';

import { Emitter, File, CompositeDisposable } from 'atom';
import { ScrollView } from 'atom-space-pen-views';

import InfomatSectionView from './subviews/module-editor-info.js';
import StructsSectionView from './subviews/module-editor-struct.js';
import StorageSectionView from './subviews/module-editor-storage.js';
import ExtendsSectionView from './subviews/module-editor-extends.js';
import MethodsSectionView from './subviews/module-editor-methods.js';
import ModiferSectionView from './subviews/module-editor-modifer.js';

export default class KSolidityViewModuleEditor extends ScrollView {
    constructor(uri) {
        super();
        // 实例化事件监听器，用于监听和触发事件
        this.emitter_ = new Emitter();
        this.title_ = 'Loading...';
        this.pane_ = null;
        this.uri_ = uri;

        this.sections = [];
        this.subscriptions = new CompositeDisposable();

        this.moduleContentFilePath = new File(uri);
        // this.element.innerHTML = "<span class='loading loading-spinner-large inline-block loadingCenter'></span>"

        this.element = document.createElement('k-solidity-module-editor');
        this.setView();
    }

    // 视图html
    static content() {
        return this.div({class: 'k-solidity-project', otherAttributeName: 'value'});
    }

    // 自定义方法，用户可自定义视图中展示的内容, 具体可查看 Element-Helper 源码
    async setView(args) {

        this.moduleContentObject = JSON.parse(await this.moduleContentFilePath.read());
        this.title_ = this.moduleContentObject.name.slice(0, 1).toUpperCase() + this.moduleContentObject.name.slice(1) + " Module";

        this.element.className = 'module-editor';

        // Module Infomations Div
        this.sections.push( new InfomatSectionView() );

        // Module Extends Div
        this.sections.push( new ExtendsSectionView() );

        // Module Struct Div
        this.sections.push( new StructsSectionView() );

        // Module Storage Div
        this.sections.push( new StorageSectionView() );

        // Module Modifer Div
        this.sections.push( new ModiferSectionView() );

        // Module Methods Div
        this.sections.push( new MethodsSectionView() );

        for ( var s in this.sections ) {
            this.element.appendChild( this.sections[s].element );
        }

        this.emitter_.emit('did-change-title');
    }

    // 当视图 html 插入文本编辑器后触发，注意 view 被激活后才会触发视图的插入
    attached() {
        // 这里可以在视图插入 DOM 后做些操作，比如监听事件，操作 DOM 等等
        // 通过 atom.workspace.open 打开文本编辑器的URI获取视图所在的窗口容器，看下图比较容易理解什么是窗口容器
        // this.pane_ = atom.workspace.paneForURI(this.uri_);
        // this.pane_.activateItem(this);
    }

    // 文档标题被激活执行
    onDidChangeTitle(callback) {
        // 监听自定义事件
        return this.emitter_.on('did-change-title', callback);
    }

    // 文档视图关闭后销毁函数
    detory() {
        // 销毁文档视图
        this.pane_.destroyItem(this);
        // 如果当前窗口容器中只有文档视图，那么把容器都销毁掉
        if (this.pane_.getItems().length === 0) {
            this.pane_.destroy();
        }
    }

    // 标题改变后触发事件 did-change-title, callback 内部将调用改方法
    getTitle() {
        return this.title_;
    }

    serialize() {

    }

    getDefaultLocation() {
        return 'center';
    }

    getAllowedLocations() {
        return ['center', 'right'];
    }
}
