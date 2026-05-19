// gt-ui-core.js

class Aspect {
    before(widget) {}
    after(widget) {}
}

class Widget {
    constructor() {
        this.aspects = [];
        this.events = {};
    }

    addAspect(aspect) {
        this.aspects.push(aspect);
    }

    on(event, handler) {
        this.events[event] = handler;
    }

    trigger(event, data) {
        if (this.events[event]) {
            this.events[event](data);
        }
    }

    render() {
        for (const aspect of this.aspects) {
            aspect.before(this);
        }

        this._render();

        for (const aspect of this.aspects) {
            aspect.after(this);
        }
    }

    _render() {
        // override edilecek
    }
}