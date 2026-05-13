class Mantiksal {

    constructor() {}

    // VE (AND)
    VE(a, b) {
        return a && b;
    }

    // VEYA (OR)
    VEYA(a, b) {
        return a || b;
    }

    // DEGIL (NOT)
    DEGIL(a) {
        return !a;
    }

    // KARŞILAŞTIRMA
    KARSILASTIR(a, operator, b) {

        switch (operator) {

            case ">":
                return a > b;

            case "<":
                return a < b;

            case "==":
                return a == b;

            case "!=":
                return a != b;

            case ">=":
                return a >= b;

            case "<=":
                return a <= b;

            default:
                throw new Error(
                    "Bilinmeyen operator: " + operator
                );
        }
    }

    // KOŞUL DEĞERLENDİR
    DEGEREVET(condition) {
        return !!condition;
    }
}

module.exports = Mantiksal;