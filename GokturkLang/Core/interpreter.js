// INTERPRETER.JS

class Interpreter {

    constructor() {

        this.variables = {};
    }

    run(program) {

        for (const stmt of program.body) {
            this.execute(stmt);
        }
    }

    execute(node) {

        switch (node.type) {

            case "VariableDeclaration":

                this.variables[node.name] =
                    this.evaluate(node.value);

                break;

            case "PrintStatement":

                console.log(
                    this.evaluate(node.value)
                );

                break;

            case "IfStatement":

                const result =
                    this.evaluateCondition(node.test);

                if (result) {

                    for (const stmt of node.consequent) {
                        this.execute(stmt);
                    }

                } else if (node.alternate) {

                    for (const stmt of node.alternate) {
                        this.execute(stmt);
                    }
                }

                break;

            case "Identifier":

                if (
                    this.variables.hasOwnProperty(node.name)
                ) {

                    return this.variables[node.name];
                }

                throw new Error(
                    "Undefined variable: " + node.name
                );

            case "NumberLiteral":
                return node.value;

            case "StringLiteral":
                return node.value;

            case "BooleanLiteral":
                return node.value;
        }
    }

    evaluate(node) {
        return this.execute(node);
    }

    evaluateCondition(test) {

        const left =
            this.evaluate(test.left);

        const right =
            this.evaluate(test.right);

        switch (test.operator) {

            case ">":
                return left > right;

            case "<":
                return left < right;

            case ">=":
                return left >= right;

            case "<=":
                return left <= right;

            case "==":
                return left == right;

            case "!=":
                return left != right;

            case "&&":
                return left && right;

            case "||":
                return left || right;
        }

        return false;
    }
}

module.exports = Interpreter;