class Parser {

    constructor(tokens) {

        this.tokens = tokens;
        this.current = 0;
    }

    parse() {

        const body = [];

        while (!this.isAtEnd()) {
            body.push(
                this.statement()
            );
        }

        return {
            type: "Program",
            body
        };
    }

    statement() {

        // yazdır(...)
        if (this.match("YAZDIR")) {
            return this.printStatement();
        }

        // değişken = değer
        if (
            this.check("IDENTIFIER") &&
            this.checkNext("EQUALS")
        ) {
            return this.variableDeclaration();
        }

        return this.expression();
    }

    // ======================
    // PRINT
    // ======================

    printStatement() {

        this.consume("LPAREN");

        const value =
            this.expression();

        this.consume("RPAREN");

        return {
            type: "PrintStatement",
            value
        };
    }

    // ======================
    // VARIABLE
    // ======================

    variableDeclaration() {

        const name =
            this.advance().value;

        this.consume("EQUALS");

        const value =
            this.expression();

        return {
            type:
                "VariableDeclaration",

            name,
            value
        };
    }

    // ======================
    // EXPRESSIONS
    // ======================

    expression() {
        return this.addition();
    }

    addition() {

        let expr =
            this.multiplication();

        while (
            this.match("PLUS") ||
            this.match("MINUS")
        ) {

            const operator =
                this.previous().value;

            const right =
                this.multiplication();

            expr = {
                type:
                    "BinaryExpression",

                left: expr,
                operator,
                right
            };
        }

        return expr;
    }

    multiplication() {

        let expr =
            this.primary();

        while (
            this.match("STAR") ||
            this.match("SLASH")
        ) {

            const operator =
                this.previous().value;

            const right =
                this.primary();

            expr = {
                type:
                    "BinaryExpression",

                left: expr,
                operator,
                right
            };
        }

        return expr;
    }

    // ======================
    // PRIMARY
    // ======================

    primary() {

        // sayı
        if (this.match("NUMBER")) {

            return {
                type: "NumberLiteral",
                value:
                    this.previous().value
            };
        }

        // string
        if (this.match("STRING")) {

            return {
                type: "StringLiteral",
                value:
                    this.previous().value
            };
        }

        // identifier
        if (this.match("IDENTIFIER")) {

            return {
                type: "Identifier",
                name:
                    this.previous().value
            };
        }

        throw new Error(
            "Beklenmeyen token"
        );
    }

    // ======================
    // HELPERS
    // ======================

    match(type) {

        if (this.check(type)) {

            this.advance();
            return true;
        }

        return false;
    }

    consume(type) {

        if (this.check(type)) {
            return this.advance();
        }

        throw new Error(
            type + " bekleniyordu"
        );
    }

    check(type) {

        if (this.isAtEnd()) {
            return false;
        }

        return (
            this.peek().type === type
        );
    }

    checkNext(type) {

        if (
            this.current + 1 >=
            this.tokens.length
        ) {
            return false;
        }

        return (
            this.tokens[
                this.current + 1
            ].type === type
        );
    }

    advance() {

        if (!this.isAtEnd()) {
            this.current++;
        }

        return this.previous();
    }

    isAtEnd() {
        return (
            this.current >=
            this.tokens.length
        );
    }

    peek() {
        return this.tokens[this.current];
    }

    previous() {
        return this.tokens[
            this.current - 1
        ];
    }
}

module.exports = Parser;