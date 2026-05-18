class GöktürkError extends Error {

    constructor(message, type = "RuntimeError", line = null, column = null) {

        super(message);

        this.name = type;
        this.line = line;
        this.column = column;
    }

    format() {

        let loc = "";

        if (this.line !== null) {
            loc += ` (Line: ${this.line}`;
        }

        if (this.column !== null) {
            loc += `, Column: ${this.column})`;
        } else if (loc !== "") {
            loc += `)`;
        }

        return `[${this.name}] ${this.message}${loc}`;
    }
}

module.exports = GöktürkError;