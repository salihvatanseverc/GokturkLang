class Matematik {

    constructor() {}

    // TOPLAMA
    TOPLA(a, b) {
        return a + b;
    }

    // ÇIKARMA
    CIKAR(a, b) {
        return a - b;
    }

    // ÇARPMA
    CARP(a, b) {
        return a * b;
    }

    // BÖLME
    BOL(a, b) {

        if (b === 0) {
            throw new Error("0'a bölme hatası");
        }

        return a / b;
    }

    // ÜS ALMA
    US(a, b) {
        return Math.pow(a, b);
    }

    // KAREKÖK
    KAREKOK(a) {
        return Math.sqrt(a);
    }

    // MOD
    MOD(a, b) {
        return a % b;
    }

    // MAX
    MAX(a, b) {
        return Math.max(a, b);
    }

    // MIN
    MIN(a, b) {
        return Math.min(a, b);
    }
}

module.exports = Matematik;