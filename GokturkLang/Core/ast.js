class AST {

    // PROGRAM
    static Program(body = []) {

        return {
            type: "Program",
            body
        };
    }

    // PRINT
    static PrintStatement(value) {

        return {
            type: "PrintStatement",
            value
        };
    }

    // VARIABLE
    static VariableDeclaration(
        name,
        value
    ) {

        return {
            type:
                "VariableDeclaration",

            name,
            value
        };
    }

    // IDENTIFIER
    static Identifier(name) {

        return {
            type: "Identifier",
            name
        };
    }

    // NUMBER
    static NumberLiteral(value) {

        return {
            type: "NumberLiteral",
            value
        };
    }

    // STRING
    static StringLiteral(value) {

        return {
            type: "StringLiteral",
            value
        };
    }

    // BOOLEAN
    static BooleanLiteral(value) {

        return {
            type: "BooleanLiteral",
            value
        };
    }

    // BINARY
    static BinaryExpression(
        left,
        operator,
        right
    ) {

        return {
            type:
                "BinaryExpression",

            left,
            operator,
            right
        };
    }

    // IF
    static IfStatement(
        condition,
        body,
        elseBody = null
    ) {

        return {
            type: "IfStatement",
            condition,
            body,
            elseBody
        };
    }

    // LOOP
    static LoopStatement(
        condition,
        body
    ) {

        return {
            type: "LoopStatement",
            condition,
            body
        };
    }

    // FUNCTION
    static FunctionDeclaration(
        name,
        params,
        body
    ) {

        return {
            type:
                "FunctionDeclaration",

            name,
            params,
            body
        };
    }

    // CALL
    static CallExpression(
        callee,
        args
    ) {

        return {
            type: "CallExpression",
            callee,
            args
        };
    }

    // RETURN
    static ReturnStatement(value) {

        return {
            type:
                "ReturnStatement",

            value
        };
    }

    // ARRAY
    static ArrayExpression(
        elements = []
    ) {

        return {
            type:
                "ArrayExpression",

            elements
        };
    }

    // ARRAY ACCESS
    static ArrayAccess(
        array,
        index
    ) {

        return {
            type:
                "ArrayAccess",

            array,
            index
        };
    }
}

module.exports = AST;