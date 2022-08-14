class Section {
    constructor(renderer, containerSelector) {
        this._items = [];
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    clear() {
        this._container.innerHTML = '';
    }

    render() {
        this.clear();
        this._items.forEach(item => {
            this.addItem(item);
        });
    }

    setItems(items) {
        this._items = items;
    }

    addItem(item) {
        const itemElement = this._renderer(item);
        this._container.append(itemElement);
    }

    prependItem(item) {
        const itemElement = this._renderer(item);
        this._container.prepend(itemElement);
    }
}

export { Section };