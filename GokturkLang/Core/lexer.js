class Lexer {

    constructor(input) {

        this.input = input;
        this.current = 0;
        this.tokens = [];
    }

    tokenize() {

        while (!this.isAtEnd()) {

            let char = this.peek();

            // boşluk
            if (/\s/.test(char)) {
                this.advance();
                continue;
            }

            // sayı
            if (/[0-9]/.test(char)) {
                this.tokens.push(
                    this.number()
                );
                continue;
            }

            // string
            if (char === '"') {
                this.tokens.push(
                    this.string()
                );
                continue;
            }

            // identifier
            if (/[a-zA-ZçğıöşüÇĞİÖŞÜ_]/.test(char)) {
                this.tokens.push(
                    this.identifier()
                );
                continue;
            }

            // operatörler
            switch (char) {

                case "+":
                    this.tokens.push({
                        type: "PLUS",
                        value: "+"
                    });
                    break;

                case "-":
                    this.tokens.push({
                        type: "MINUS",
                        value: "-"
                    });
                    break;

                case "*":
                    this.tokens.push({
                        type: "STAR",
                        value: "*"
                    });
                    break;

                case "/":
                    this.tokens.push({
                        type: "SLASH",
                        value: "/"
                    });
                    break;

                case "=":
                    this.tokens.push({
                        type: "EQUALS",
                        value: "="
                    });
                    break;

                case "(":
                    this.tokens.push({
                        type: "LPAREN",
                        value: "("
                    });
                    break;

                case ")":
                    this.tokens.push({
                        type: "RPAREN",
                        value: ")"
                    });
                    break;

                case "{":
                    this.tokens.push({
                        type: "LBRACE",
                        value: "{"
                    });
                    break;

                case "}":
                    this.tokens.push({
                        type: "RBRACE",
                        value: "}"
                    });
                    break;

                case "[":
                    this.tokens.push({
                        type: "LBRACKET",
                        value: "["
                    });
                    break;

                case "]":
                    this.tokens.push({
                        type: "RBRACKET",
                        value: "]"
                    });
                    break;

                case ",":
                    this.tokens.push({
                        type: "COMMA",
                        value: ","
                    });
                    break;

                case ">":
                    this.tokens.push({
                        type: "GREATER",
                        value: ">"
                    });
                    break;

                case "<":
                    this.tokens.push({
                        type: "LESS",
                        value: "<"
                    });
                    break;

                default:
                    throw new Error(
                        "Bilinmeyen karakter: " + char
                    );
            }

            this.advance();
        }

        return this.tokens;
    }

    number() {

        let value = "";

        while (
            !this.isAtEnd() &&
            /[0-9]/.test(this.peek())
        ) {
            value += this.advance();
        }

        return {
            type: "NUMBER",
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
            value += this.advance();
        }

        this.advance();

        return {
            type: "STRING",
            value
        };
    }

    identifier() {

        let value = "";

        while (
            !this.isAtEnd() &&
            /[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]/.test(this.peek())
        ) {
            value += this.advance();
        }

        // keyword kontrolü
        const keywords = {

            "yazdır": "YAZDIR",
            "eğer": "IF",
            "değilse": "ELSE",
            "döngü": "LOOP",
            "fonksiyon": "FUNCTION",
            "return": "RETURN"
        };

        return {
            type:
                keywords[value] ||
                "IDENTIFIER",

            value
        };
    }

    peek() {
        return this.input[this.current];
    }

    advance() {
        return this.input[this.current++];
    }

    isAtEnd() {
        return this.current >= this.input.length;
    }
}

module.exports = Lexer;