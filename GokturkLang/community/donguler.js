class donguler {

    constructor(variables) {
        this.variables = variables;
    }

    // FOR LOOP (count based)
    repeat(count, callback) {

        for (let i = 0; i < count; i++) {

            // loop variable (i)
            this.variables.define("i", i);

            callback(i);
        }
    }

    // WHILE LOOP (condition function)
    while(conditionFn, callback) {

        while (conditionFn()) {

            callback();
        }
    }

    // FOR EACH (array loop)
    forEach(array, callback) {

        if (!Array.isArray(array)) {
            throw new Error("Not an array");
        }

        for (let i = 0; i < array.length; i++) {

            this.variables.define("i", i);
            this.variables.define("value", array[i]);

            callback(array[i], i);
        }
    }

    // RANGE LOOP (start-end)
    range(start, end, callback) {

        for (let i = start; i < end; i++) {

            this.variables.define("i", i);

            callback(i);
        }
    }

    // BREAK helper (future interpreter support)
    breakFlag() {
        return { break: true };
    }
}

module.exports = Loops;