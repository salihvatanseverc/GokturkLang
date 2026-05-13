class Fonksiyonlar {

    constructor(variables) {

        this.variables = variables;

        this.functions = {};
    }

    // define function
    define(name, params, body) {

        this.functions[name] = {
            params: params,
            body: body
        };
    }

    // call function
    call(name, args) {

        const fn = this.functions[name];

        if (!fn) {
            throw new Error("Function not found: " + name);
        }

        // new scope
        this.variables.newScope();

        // assign parameters
        for (let i = 0; i < fn.params.length; i++) {

            const param = fn.params[i];
            const value = args[i];

            this.variables.define(param, value);
        }

        let returnValue = null;

        // execute body
        for (let i = 0; i < fn.body.length; i++) {

            const node = fn.body[i];

            // return
            if (node.type === "RETURN") {
                returnValue = node.value;
                break;
            }

            // print example
            if (node.type === "PRINT") {
                console.log(node.value);
            }
        }

        // close scope
        this.variables.endScope();

        return returnValue;
    }

    // check function exists
    exists(name) {
        return this.functions.hasOwnProperty(name);
    }

    // list all functions
    list() {
        return this.functions;
    }

    // reset
    clear() {
        this.functions = {};
    }
}

module.exports = Functions;