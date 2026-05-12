class Parser {

    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    parse() {

        const body = [];

        while (!this.isAtEnd()) {
            body.push(this.statement());
        }

        return {
            type: "Program",
            body
        };
    }

    statement() {

        if (this.match("YAZDIR")) {
            return this.printStatement();
        }

        if (this.match("EGER")) {
            return this.ifStatement();
        }

        if (
            this.check("IDENTIFIER") &&
            this.checkNext("EQUALS")
        ) {
            return this.variableDeclaration();
        }

        return this.expression();
    }

    ifStatement() {

        this.consume("LPAREN");

        const left =
            this.expression();

        const operator =
            this.advance().value;

        const right =
            this.expression();

        this.consume("RPAREN");

        this.consume("LBRACE");

        const body = [];

        while (!this.check("RBRACE")) {
            body.push(this.statement());
        }

        this.consume("RBRACE");

        let elseBody = [];

        if (this.match("DEGILSE")) {

            this.consume("LBRACE");

            while (!this.check("RBRACE")) {
                elseBody.push(
                    this.statement()
                );
            }

            this.consume("RBRACE");
        }

        return {
            type: "IfStatement",

            condition: {
                left,
                operator,
                right
            },

            body,
            elseBody
        };
    }

    variableDeclaration() {

        const name =
            this.advance().value;

        this.consume("EQUALS");

        const value =
            this.expression();

        return {
            type: "VariableDeclaration",
            name,
            value
        };
    }

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

    expression() {

        let left =
            this.primary();

        while (
            this.match("PLUS") ||
            this.match("MINUS") ||
            this.match("STAR") ||
            this.match("SLASH")
        ) {

            const operator =
                this.previous().value;

            const right =
                this.primary();

            left = {
                type: "BinaryExpression",
                left,
                operator,
                right
            };
        }

        return left;
    }

    primary() {

        if (this.match("STRING")) {
            return {
                type: "StringLiteral",
                value: this.previous().value
            };
        }

        if (this.match("NUMBER")) {
            return {
                type: "NumberLiteral",
                value: Number(
                    this.previous().value
                )
            };
        }

        if (this.match("IDENTIFIER")) {
            return {
                type: "Identifier",
                name: this.previous().value
            };
        }

        throw new Error(
            "Geçersiz ifade"
        );
    }

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

        return this.peek().type === type;
    }

    checkNext(type) {

        if (
            this.current + 1 >=
            this.tokens.length
        ) {
            return false;
        }

        return this.tokens[
            this.current + 1
        ].type === type;
    }

    advance() {

        if (!this.isAtEnd()) {
            this.current++;
        }

        return this.previous();
    }

    isAtEnd() {
        return this.current >= this.tokens.length;
    }

    peek() {
        return this.tokens[this.current];
    }

    previous() {
        return this.tokens[this.current - 1];
    }
}

module.exports = Parser;