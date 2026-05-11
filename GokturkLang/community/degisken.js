class Degisken {

    constructor() {
        this.variables = {};
    }

    set(name, value) {
        this.variables[name] = value;
    }

    get(name) {
        return this.variables[name];
    }
}

module.exports = Degisken;