const GöktürkError = require("./errors");

class Interpreter {

    run(program) {

        try {

            for (const stmt of program.body) {
                this.execute(stmt);
            }

        } catch (error) {

            if (error instanceof GöktürkError) {

                console.error(
                    error.format()
                );

            } else {

                console.error(
                    "[UnknownError]",
                    error.message
                );
            }
        }
    }

    execute(node) {

        switch (node.type) {

            case "PrintStatement":

                const output =
                    node.values.map(v =>
                        this.evaluate(v)
                    );

                console.log(...output);

                break;

            case "NumberLiteral":
                return node.value;

            case "StringLiteral":
                return node.value;

            default:

                throw new GöktürkError(
                    "Unknown node type: " + node.type,
                    "RuntimeError"
                );
        }
    }

    evaluate(node) {
        return this.execute(node);
    }
}

module.exports = Interpreter;