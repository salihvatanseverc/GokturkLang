const Lexer = require("./Core/lexer");
const Parser = require("./Core/parser");

const code = `
değişken mesaj = "Merhaba"
`;

const lexer = new Lexer(code);
const tokens = lexer.tokenize();

console.log("TOKEN:", tokens);

const parser = new Parser(tokens);
const ast = parser.parse();

console.log("AST:", ast);