class Section {
    constructor(renderer, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    clear() {
        this._container.innerHTML = '';
    }

    render(items) {
        this.clear();
        items.forEach(item => {
            this.addItem(item);
        });
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