// LEXER.JS

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

            if (/\s/.test(char)) {
                this.position++;
                continue;
            }

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

            if (char === '"') {

                this.advance();

                let value = "";

                while (
                    this.peek() !== '"' &&
                    this.position < this.input.length
                ) {

                    value += this.advance();
                }

                this.advance();

                this.tokens.push({

                    type: TOKENS.STRING,
                    value
                });

                continue;
            }

            if (/[a-zA-Z_]/.test(char)) {

                let value = "";

                while (/[a-zA-Z_]/.test(this.peek())) {
                    value += this.advance();
                }

                value += this.advance();

                const keywords = {

                    print: TOKENS.PRINT,
                    if: TOKENS.IF,
                    else: TOKENS.ELSE
                };

                this.tokens.push({

                    type:
                        keywords[value],

                    value
                });

                continue;
            }

            if (char === ">") {

                this.tokens.push({

                    type: TOKENS.GREATER,
                    value: ">"
                });

                this.advance();
                continue;
            }

            if (char === "<") {

                this.tokens.push({

                    type: TOKENS.LESS,
                    value: "<"
                });

                this.advance();
                continue;
            }

            if (
                char === "=" &&
                this.input[this.position + 1] === "="
            ) {

                this.tokens.push({

                    type: TOKENS.EQUAL_EQUAL,
                    value: "=="
                });

                this.advance();
                this.advance();

                continue;
            }

            const symbols = {

                "(": TOKENS.LPAREN,
                ")": TOKENS.RPAREN,

                "{": TOKENS.LBRACE,
                "}": TOKENS.RBRACE
            };

            if (symbols[char]) {

                this.tokens.push({

                    type: symbols[char],
                    value: char
                });

                this.advance();
                continue;
            }

            throw new Error(
                "Unexpected character: " + char
            );
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