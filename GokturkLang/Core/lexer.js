// =========================
// LEXER.JS
// =========================

const TOKENS = require("./tokens");

class Lexer {

    constructor(input) {

        this.input = input;
        this.position = 0;
        this.tokens = [];
    }

    tokenize() {

        while (this.position < this.input.length) {

            let char = this.input[this.position];

            // whitespace
            if (/\s/.test(char)) {
                this.position++;
                continue;
            }

            // numbers
            if (/[0-9]/.test(char)) {

                let value = "";

                while (/[0-9]/.test(this.peek())) {
                    value += this.advance();
                }

                value += this.advance();

                this.tokens.push({
                    type: TOKENS.NUMBER,
                    value: Number(value)
                });

                continue;
            }

            // strings
            if (char === '"') {

                this.advance();

                let value = "";

                while (this.peek() !== '"' && this.position < this.input.length) {
                    value += this.advance();
                }

                this.advance();

                this.tokens.push({
                    type: TOKENS.STRING,
                    value
                });

                continue;
            }

            // identifiers / keywords
            if (/[a-zA-Z_]/.test(char)) {

                let value = "";

                while (/[a-zA-Z_]/.test(this.peek())) {
                    value += this.advance();
                }

                value += this.advance();

                const keywords = {

                    print: TOKENS.PRINT,
                    if: TOKENS.IF,
                    else: TOKENS.ELSE,
                    variable: TOKENS.VARIABLE
                };

                this.tokens.push({

                    type: keywords[value] || TOKENS.IDENTIFIER,
                    value
                });

                continue;
            }

            // operators
            const operators = {

                "+": TOKENS.PLUS,
                "-": TOKENS.MINUS,
                "*": TOKENS.STAR,
                "/": TOKENS.SLASH,
                "=": TOKENS.EQUALS,
                "(": TOKENS.LPAREN,
                ")": TOKENS.RPAREN,
                "{": TOKENS.LBRACE,
                "}": TOKENS.RBRACE
            };

            if (operators[char]) {

                this.tokens.push({

                    type: operators[char],
                    value: char
                });

                this.advance();
                continue;
            }

            throw new Error("Unexpected character: " + char);
        }

        this.tokens.push({
            type: TOKENS.EOF
        });

        return this.tokens;
    }

    peek() {
        return this.input[this.position];
    }

    advance() {
        return this.input[this.position++];
    }
}

module.exports = Lexer;