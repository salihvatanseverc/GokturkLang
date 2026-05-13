class kosul {

    constructor(variables) {
        this.variables = variables;
    }

    // evaluate condition
    evaluate(left, operator, right) {

        switch (operator) {

            case ">":
                return left > right;

            case "<":
                return left < right;

            case "==":
                return left == right;

            case "!=":
                return left != right;

            case ">=":
                return left >= right;

            case "<=":
                return left <= right;

            default:
                throw new Error(
                    "Unknown operator: " + operator
                );
        }
    }

    // execute if block
    run(condition, ifBlock, elseBlock = null) {

        if (condition) {

            return this.executeBlock(ifBlock);
        }

        if (elseBlock) {

            return this.executeBlock(elseBlock);
        }
    }

    // execute block
    executeBlock(block) {

        let result = null;

        for (let node of block) {

            if (node.type === "PRINT") {
                console.log(node.value);
            }

            if (node.type === "SET") {
                this.variables.define(
                    node.name,
                    node.value
                );
            }
        }

        return result;
    }
}

module.exports = Conditions;