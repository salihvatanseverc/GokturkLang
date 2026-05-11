class Lexer {

    constructor(input) {

        this.input = input;
        this.position = 0;
        this.tokens = [];
    }

    tokenize() {

        while (
            this.position <
            this.input.length
        ) {

            let char =
                this.input[this.position];

            // boşluk
            if (/\s/.test(char)) {
                this.position++;
                continue;
            }

            // sayı
            if (/[0-9]/.test(char)) {

                let number = "";

                while (
                    /[0-9]/.test(
                        this.input[this.position]
                    )
                ) {
                    number +=
                        this.input[this.position];

                    this.position++;
                }

                this.tokens.push({
                    type: "NUMBER",
                    value: number
                });

                continue;
            }

            // string
            if (char === '"') {

                this.position++;

                let string = "";

                while (
                    this.input[this.position] !== '"' &&
                    this.position <
                    this.input.length
                ) {

                    string +=
                        this.input[this.position];

                    this.position++;
                }

                this.position++;

                this.tokens.push({
                    type: "STRING",
                    value: string
                });

                continue;
            }

            // identifier
            if (
                /[a-zA-ZçğıöşüÇĞİÖŞÜ_]/.test(char)
            ) {

                let text = "";

                while (
                    /[a-zA-Z0-9çğıöşüÇĞİÖŞÜ_]/.test(
                        this.input[this.position]
                    )
                ) {

                    text +=
                        this.input[this.position];

                    this.position++;
                }

                if (text === "yazdır") {

                    this.tokens.push({
                        type: "YAZDIR",
                        value: text
                    });

                } else {

                    this.tokens.push({
                        type: "IDENTIFIER",
                        value: text
                    });
                }

                continue;
            }

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

                default:

                    throw new Error(
                        "Bilinmeyen karakter: " + char
                    );
            }

            this.position++;
        }

        return this.tokens;
    }
}

module.exports = Lexer;