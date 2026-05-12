class IfStatement {

    constructor(condition, body, elseBody) {

        this.type = "IfStatement";

        this.condition = condition;

        this.body = body;

        this.elseBody = elseBody;
    }
}

module.exports = {
    IfStatement
};