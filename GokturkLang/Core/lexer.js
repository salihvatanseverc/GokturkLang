const TOKENS = require("./tokens");

class Lexer {

    constructor(input) {
        this.input = input;
        this.position = 0;
        this.tokens = [];
    }

    tokenize() {

        let guard = 0;

        while (!this.isAtEnd()) {

            guard++;

            if (guard > 100000) {
                throw new Error("Infinite loop detected");
            }

            let char = this.peek();

            // whitespace
            if (/\s/.test(char)) {
                this.advance();
                continue;
            }

            // comments
            if (
                char === "/" &&
                this.peekNext() === "/"
            ) {
                this.skipComment();
                continue;
            }

            // numbers
            if (this.isDigit(char)) {
                this.tokens.push(this.number());
                continue;
            }

            // strings
            if (char === '"') {
                this.tokens.push(this.string());
                continue;
            }

            // identifiers
            if (this.isAlpha(char)) {
                this.tokens.push(this.identifier());
                continue;
            }

            // double operators
            const doubleOps = {
                "==": TOKENS.EQUAL_EQUAL,
                "!=": TOKENS.NOT_EQUAL,
                ">=": TOKENS.GREATER_EQUAL,
                "<=": TOKENS.LESS_EQUAL,
                "&&": TOKENS.AND,
                "||": TOKENS.OR
            };

            const pair =
                char + this.peekNext();

            if (doubleOps[pair]) {

                this.tokens.push({
                    type: doubleOps[pair],
                    value: pair
                });

                this.advance();
                this.advance();

                continue;
            }

            // single operators
            const singleOps = {

                "+": TOKENS.PLUS,
                "-": TOKENS.MINUS,
                "*": TOKENS.STAR,
                "/": TOKENS.SLASH,

                "=": TOKENS.EQUAL,
                ">": TOKENS.GREATER,
                "<": TOKENS.LESS,
                "!": TOKENS.BANG,

                "(": TOKENS.LPAREN,
                ")": TOKENS.RPAREN,

                "{": TOKENS.LBRACE,
                "}": TOKENS.RBRACE,

                ";": TOKENS.SEMICOLON
            };

            if (singleOps[char]) {

                this.tokens.push({
                    type: singleOps[char],
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

    number() {

        let value = "";

        while (
            !this.isAtEnd() &&
            this.isDigit(this.peek())
        ) {
            value += this.advance();
        }

        // float
        if (
            this.peek() === "." &&
            this.isDigit(this.peekNext())
        ) {

            value += this.advance();

            while (
                !this.isAtEnd() &&
                this.isDigit(this.peek())
            ) {
                value += this.advance();
            }
        }

        return {
            type: TOKENS.NUMBER,
            value: Number(value)
        };
    }

    string() {

        this.advance();

        let value = "";

        while (
            !this.isAtEnd() &&
            this.peek() !== '"'
        ) {

            // escape support
            if (this.peek() === "\\") {

                this.advance();

                const esc =
                    this.advance();

                const escapes = {

                    n: "\n",
                    t: "\t",
                    '"': '"',
                    "\\": "\\"
                };

                value += escapes[esc] || esc;
                continue;
            }

            value += this.advance();
        }

        if (this.isAtEnd()) {
            throw new Error("Unterminated string");
        }

        this.advance();

        return {
            type: TOKENS.STRING,
            value
        };
    }

    identifier() {

        let value = "";

        while (
            !this.isAtEnd() &&
            this.isAlphaNumeric(this.peek())
        ) {
            value += this.advance();
        }

        const keywords = {

            print: TOKENS.PRINT,
            if: TOKENS.IF,
            else: TOKENS.ELSE,

            let: TOKENS.LET,

            true: TOKENS.TRUE,
            false: TOKENS.FALSE
        };

        return {
            type:
                keywords[value] ||
                TOKENS.IDENTIFIER,

            value
        };
    }

    skipComment() {

        while (
            !this.isAtEnd() &&
            this.peek() !== "\n"
        ) {
            this.advance();
        }
    }

    peek() {
        return this.input[this.position];
    }

    peekNext() {
        return this.input[this.position + 1];
    }

    advance() {
        return this.input[this.position++];
    }

    isAtEnd() {
        return this.position >= this.input.length;
    }

    isDigit(char) {
        return /[0-9]/.test(char);
    }

    isAlpha(char) {
        return /[a-zA-Z_]/.test(char);
    }

    isAlphaNumeric(char) {
        return /[a-zA-Z0-9_]/.test(char);
    }
}

module.exports = Lexer;