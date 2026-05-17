// =========================
// INTERPRETER.JS
// =========================

class Interpreter {

    run(program) {

        try {

            for (const statement of program.body) {
                this.execute(statement);
            }

        } catch (error) {

            console.error(
                "Runtime Error:",
                error.message
            );
        }
    }

    execute(node) {

        switch (node.type) {

            case "PrintStatement":

                console.log(
                    this.evaluate(node.value)
                );

                break;

            case "NumberLiteral":
                return node.value;

            case "StringLiteral":
                return node.value;

            default:
                throw new Error(
                    "Unknown node type: " + node.type
                );
        }
    }

    evaluate(node) {
        return this.execute(node);
    }
}

module.exports = Interpreter;