class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
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

    addItem(item) {
        const itemElement = this._renderer(item);
        this._container.prepend(itemElement);
    }
}

export { Section };