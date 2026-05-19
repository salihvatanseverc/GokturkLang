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

        if (this.match(TOKENS.IF)) {
            return this.ifStatement();
        }

        if (this.match(TOKENS.LET)) {
            return this.variableDeclaration();
        }

        return this.expression();
    }

    variableDeclaration() {

        const name =
            this.consume(TOKENS.IDENTIFIER).value;

        this.consume(TOKENS.EQUAL);

        const value =
            this.expression();

        return {

            type: "VariableDeclaration",
            name,
            value
        };
    }

    ifStatement() {

        this.consume(TOKENS.LPAREN);

        const left =
            this.expression();

        const operator =
            this.advance().value;

        const right =
            this.expression();

        this.consume(TOKENS.RPAREN);

        this.consume(TOKENS.LBRACE);

        const consequent = [];

        while (!this.check(TOKENS.RBRACE)) {
            consequent.push(this.statement());
        }

        this.consume(TOKENS.RBRACE);

        let alternate = null;

        if (this.match(TOKENS.ELSE)) {

            this.consume(TOKENS.LBRACE);

            alternate = [];

            while (!this.check(TOKENS.RBRACE)) {
                alternate.push(this.statement());
            }

            this.consume(TOKENS.RBRACE);
        }

        return {

            type: "IfStatement",

            test: {
                left,
                operator,
                right
            },

            consequent,
            alternate
        };
    }

    printStatement() {

        this.consume(TOKENS.LPAREN);

        const value =
            this.expression();

        this.consume(TOKENS.RPAREN);

        return {

            type: "PrintStatement",
            value
        };
    }

    expression() {

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

        if (this.match(TOKENS.TRUE)) {

            return {

                type: "BooleanLiteral",
                value: true
            };
        }

        if (this.match(TOKENS.FALSE)) {

            return {

                type: "BooleanLiteral",
                value: false
            };
        }

        if (this.match(TOKENS.IDENTIFIER)) {

            return {

                type: "Identifier",
                name: this.previous().value
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
            type + " expected"
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