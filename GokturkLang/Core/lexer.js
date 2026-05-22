// core/lexer.js

const TOKENS = require("./tokens");

class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.tokens = [];
    }

    tokenize() {
        while (!this.isAtEnd()) {
            let char = this.peek();

            // whitespace
            if (/\s/.test(char)) {
                this.advance();
                continue;
            }

            // comments //
            if (char === "/" && this.peekNext() === "/") {
                this.skipLineComment();
                continue;
            }

            // numbers (int + float)
            if (this.isDigit(char)) {
                this.tokens.push(this.number());
                continue;
            }

            // strings
            if (char === '"') {
                this.tokens.push(this.string());
                continue;
            }

            // identifiers / keywords
            if (this.isAlpha(char)) {
                this.tokens.push(this.identifier());
                continue;
            }

            // operators (2 char first)
            const twoChar = char + this.peekNext();

            const twoCharOps = {
                "==": TOKENS.EQUAL_EQUAL,
                "!=": TOKENS.NOT_EQUAL,
                ">=": TOKENS.GREATER_EQUAL,
                "<=": TOKENS.LESS_EQUAL,
                "&&": TOKENS.AND,
                "||": TOKENS.OR
            };

            if (twoCharOps[twoChar]) {
                this.addToken(twoCharOps[twoChar], twoChar);
                this.advance();
                this.advance();
                continue;
            }

            // single char operators
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
                this.addToken(singleOps[char], char);
                this.advance();
                continue;
            }

            throw new Error(`Unexpected character: ${char}`);
        }

        this.tokens.push({ type: TOKENS.EOF });
        return this.tokens;
    }

    // ---------- token builders ----------

    number() {
        let value = "";

        while (this.isDigit(this.peek())) {
            value += this.advance();
        }

        // float support
        if (this.peek() === "." && this.isDigit(this.peekNext())) {
            value += this.advance(); // .
            while (this.isDigit(this.peek())) {
                value += this.advance();
            }
        }

        return {
            type: TOKENS.NUMBER,
            value: Number(value)
        };
    }

    string() {
        this.advance(); // "

        let value = "";
        while (!this.isAtEnd() && this.peek() !== '"') {

            // escape sequences
            if (this.peek() === "\\") {
                this.advance();
                const esc = this.advance();

                const map = {
                    n: "\n",
                    t: "\t",
                    '"': '"',
                    "\\": "\\"
                };

                value += map[esc] || esc;
                continue;
            }

            value += this.advance();
        }

        this.advance(); // closing "

        return {
            type: TOKENS.STRING,
            value
        };
    }

    identifier() {
        let value = "";

        while (this.isAlphaNumeric(this.peek())) {
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
            type: keywords[value] || TOKENS.IDENTIFIER,
            value
        };
    }

    // ---------- helpers ----------

    skipLineComment() {
        while (!this.isAtEnd() && this.peek() !== "\n") {
            this.advance();
        }
    }

    addToken(type, value) {
        this.tokens.push({ type, value });
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

    isDigit(c) {
        return /[0-9]/.test(c);
    }

    isAlpha(c) {
        return /[a-zA-Z_]/.test(c);
    }

    isAlphaNumeric(c) {
        return /[a-zA-Z0-9_]/.test(c);
    }
}

module.exports = Lexer;