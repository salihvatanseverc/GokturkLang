// =========================
// PARSER.JS
// =========================

const TOKENS = require("./tokens");

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

        if (this.match(TOKENS.PRINT)) {
            return this.printStatement();
        }

        return this.expression();
    }

    printStatement() {

        this.consume(TOKENS.LPAREN);

        const values = [];

        while (!this.check(TOKENS.RPAREN)) {

            values.push(
                this.expression()
            );

            if (!this.check(TOKENS.RPAREN)) {
                this.consume(TOKENS.COMMA);
            }
        }

        this.consume(TOKENS.RPAREN);

        return {

            type: "PrintStatement",
            values
        };
    }

    expression() {

        return this.primary();
    }

    primary() {

        if (this.match(TOKENS.NUMBER)) {

            return {

                type: "NumberLiteral",
                value: this.previous().value
            };
        }

        if (this.match(TOKENS.STRING)) {

            return {

                type: "StringLiteral",
                value: this.previous().value
            };
        }

        throw new Error(
            "Unexpected token"
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
            "Expected token: " + type
        );
    }

    check(type) {

        if (this.isAtEnd()) {
            return false;
        }

        return this.peek().type === type;
    }

    advance() {

        if (!this.isAtEnd()) {
            this.current++;
        }

        return this.previous();
    }

    isAtEnd() {

        return this.peek().type === TOKENS.EOF;
    }

    peek() {
        return this.tokens[this.current];
    }

    previous() {
        return this.tokens[this.current - 1];
    }
}

module.exports = Parser;