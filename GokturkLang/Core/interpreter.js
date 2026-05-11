class Interpreter {

    constructor() {
        this.variables = {};
    }

    run(ast) {

        for (const node of ast.body) {
            this.evaluate(node);
        }
    }

    evaluate(node) {

        switch (node.type) {

            case "PrintStatement":

                console.log(
                    this.evaluate(node.value)
                );

                return;

            case "StringLiteral":
                return node.value;

            case "NumberLiteral":
                return node.value;

            case "VariableDeclaration":

                this.variables[node.name] =
                    this.evaluate(node.value);

                return;

            case "Identifier":

                return this.variables[
                    node.name
                ];

            case "BinaryExpression":

                const left =
                    this.evaluate(node.left);

                const right =
                    this.evaluate(node.right);

                switch (node.operator) {

                    case "+":
                        return left + right;

                    case "-":
                        return left - right;

                    case "*":
                        return left * right;

                    case "/":
                        return left / right;
                }

                return;

            default:

                throw new Error(
                    "Bilinmeyen node: " +
                    node.type
                );
        }
    }
}

module.exports = Interpreter;