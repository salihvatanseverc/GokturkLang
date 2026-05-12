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

            case "Identifier":

                return this.variables[
                    node.name
                ];

            case "VariableDeclaration":

                this.variables[node.name] =
                    this.evaluate(node.value);

                return;

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

            case "IfStatement":

                const l =
                    this.evaluate(
                        node.condition.left
                    );

                const r =
                    this.evaluate(
                        node.condition.right
                    );

                let result = false;

                switch (
                    node.condition.operator
                ) {

                    case ">":
                        result = l > r;
                        break;

                    case "<":
                        result = l < r;
                        break;
                }

                if (result) {

                    for (const stmt of node.body) {
                        this.evaluate(stmt);
                    }

                } else {

                    for (const stmt of node.elseBody) {
                        this.evaluate(stmt);
                    }
                }

                return;
        }
    }
}

module.exports = Interpreter;