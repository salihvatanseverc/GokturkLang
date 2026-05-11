class Program {

    constructor(body) {
        this.type = "Program";
        this.body = body;
    }
}

class PrintStatement {

    constructor(value) {
        this.type = "PrintStatement";
        this.value = value;
    }
}

class NumberLiteral {

    constructor(value) {
        this.type = "NumberLiteral";
        this.value = value;
    }
}

class StringLiteral {

    constructor(value) {
        this.type = "StringLiteral";
        this.value = value;
    }
}

class Identifier {

    constructor(name) {
        this.type = "Identifier";
        this.name = name;
    }
}

class VariableDeclaration {

    constructor(name, value) {
        this.type = "VariableDeclaration";
        this.name = name;
        this.value = value;
    }
}

class BinaryExpression {

    constructor(left, operator, right) {
        this.type = "BinaryExpression";
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}

module.exports = {
    Program,
    PrintStatement,
    NumberLiteral,
    StringLiteral,
    Identifier,
    VariableDeclaration,
    BinaryExpression
};