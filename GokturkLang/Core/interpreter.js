class Interpreter {

    constructor(modules) {

        this.variables =
            modules.variables;

        this.functions =
            modules.functions;

        this.loops =
            modules.loops;

        this.conditions =
            modules.conditions;

        this.matematik =
            modules.matematik;

        this.stringler =
            modules.stringler;

        this.arrays =
            modules.arrays;

        this.random =
            modules.random;

        this.yazdir =
            modules.yazdir;
    }

    run(ast) {

        if (!ast || !ast.body) {
            throw new Error("Geçersiz AST");
        }

        for (const node of ast.body) {
            this.execute(node);
        }
    }

    execute(node) {

        switch (node.type) {

            // ======================
            // PRINT
            // ======================

            case "PrintStatement":

                this.yazdir.yaz(
                    this.evaluate(node.value)
                );

                break;



            // ======================
            // VARIABLE
            // ======================

            case "VariableDeclaration":

                this.variables.tanimla(
                    node.name,
                    this.evaluate(node.value)
                );

                break;



            // ======================
            // BINARY
            // ======================

            case "BinaryExpression":

                return this.binary(node);



            // ======================
            // NUMBER
            // ======================

            case "NumberLiteral":

                return node.value;



            // ======================
            // STRING
            // ======================

            case "StringLiteral":

                return node.value;



            // ======================
            // IDENTIFIER
            // ======================

            case "Identifier":

                return this.variables.al(
                    node.name
                );



            default:

                throw new Error(
                    "Bilinmeyen node: " +
                    node.type
                );
        }
    }

    evaluate(node) {
        return this.execute(node);
    }

    binary(node) {

        const left =
            this.evaluate(node.left);

        const right =
            this.evaluate(node.right);

        switch (node.operator) {

            case "+":
                return this.matematik.TOPLA(
                    left,
                    right
                );

            case "-":
                return this.matematik.CIKAR(
                    left,
                    right
                );

            case "*":
                return this.matematik.CARP(
                    left,
                    right
                );

            case "/":
                return this.matematik.BOL(
                    left,
                    right
                );

            case ">":
                return this.conditions.evaluate(
                    left,
                    ">",
                    right
                );

            case "<":
                return this.conditions.evaluate(
                    left,
                    "<",
                    right
                );

            case "==":
                return this.conditions.evaluate(
                    left,
                    "==",
                    right
                );

            default:

                throw new Error(
                    "Geçersiz operator: " +
                    node.operator
                );
        }
    }
}

module.exports = Interpreter;