class Interpreter {

    constructor() {

        this.globals = new Map();
        this.scopes = [this.globals];
    }

    run(program) {

        try {

            for (const statement of program.body) {
                this.execute(statement);
            }

        } catch (error) {

            console.error("Runtime Error:", error.message);
        }
    }

    execute(node) {

        switch (node.type) {

            case "PrintStatement":
                console.log(this.evaluate(node.value));
                break;

            case "VariableDeclaration":
                this.defineVariable(node.name, this.evaluate(node.value));
                break;

            case "BinaryExpression":
                return this.evaluateBinary(node);

            case "NumberLiteral":
                return node.value;

            case "StringLiteral":
                return node.value;

            case "Identifier":
                return this.lookupVariable(node.name);

            default:
                throw new Error("Unknown node type: " + node.type);
        }
    }

    evaluate(node) {
        return this.execute(node);
    }

    evaluateBinary(node) {

        const left = this.evaluate(node.left);
        const right = this.evaluate(node.right);

        switch (node.operator) {

            case "+":
                return left + right;

            case "-":
                return left - right;

            case "*":
                return left * right;

            case "/":

                if (right === 0) {
                    throw new Error("Division by zero error");
                }

                return left / right;
        }
    }

    defineVariable(name, value) {

        this.scopes[this.scopes.length - 1].set(name, value);
    }

    lookupVariable(name) {

        for (let i = this.scopes.length - 1; i >= 0; i--) {

            if (this.scopes[i].has(name)) {
                return this.scopes[i].get(name);
            }
        }

        throw new Error("Undefined variable: " + name);
    }
}

module.exports = Interpreter;