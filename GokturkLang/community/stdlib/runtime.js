class Runtime {
    constructor() {
        this.env = new Map();
        this.errors = [];
        this.safeMode = true;
    }

    run(node) {
        try {
            return this._run(node);
        } catch (err) {
            this.handleError(err);
            return null;
        }
    }

    _run(node) {
        if (!node || typeof node !== "object") {
            throw new Error("Invalid AST node");
        }

        switch (node.type) {
            case "Program":
                for (const stmt of node.body) {
                    this.run(stmt);
                }
                break;

            case "VariableDeclaration":
                this.env.set(node.name, this.eval(node.value));
                break;

            case "PrintStatement":
                console.log(this.eval(node.value));
                break;

            default:
                this.eval(node);
        }
    }

    eval(node) {
        if (!node || typeof node !== "object") {
            throw new Error("Invalid node");
        }

        switch (node.type) {
            case "NumberLiteral":
            case "StringLiteral":
            case "BooleanLiteral":
                return node.value;

            case "Identifier":
                if (!this.env.has(node.name)) {
                    throw new Error("Undefined variable: " + node.name);
                }
                return this.env.get(node.name);

            case "BinaryExpression": {
                const left = this.eval(node.left);
                const right = this.eval(node.right);

                if (typeof left === "undefined" || typeof right === "undefined") {
                    throw new Error("Invalid binary expression");
                }

                switch (node.operator) {
                    case "+": return left + right;
                    case "-": return left - right;
                    case "*": return left * right;

                    case "/":
                        if (right === 0) {
                            throw new Error("Division by zero");
                        }
                        return left / right;

                    case ">": return left > right;
                    case "<": return left < right;
                    case "==": return left === right;
                    case "!=": return left !== right;

                    default:
                        throw new Error("Unknown operator: " + node.operator);
                }
            }

            default:
                throw new Error("Unknown node type: " + node.type);
        }
    }

    handleError(err) {
        this.errors.push(err.message);

        console.error("[Runtime Error]", err.message);

        // crash engelleme (safe mode)
        if (!this.safeMode) {
            throw err;
        }
    }
}

module.exports = Runtime;