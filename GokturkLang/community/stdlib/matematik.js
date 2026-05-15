class Matematik {

    constructor(runtime) {
        this.runtime = runtime;
    }

    // =========================
    // SAFE ADD
    // =========================
    add(a, b) {

        try {

            if (typeof a !== "number" || typeof b !== "number") {
                throw new Error("Toplama sadece sayı kabul eder");
            }

            return a + b;

        } catch (err) {
            console.error("ADD hatası:", err.message);
            return 0;
        }
    }

    // =========================
    // SAFE SUB
    // =========================
    sub(a, b) {

        try {

            if (typeof a !== "number" || typeof b !== "number") {
                throw new Error("Çıkarma sadece sayı kabul eder");
            }

            return a - b;

        } catch (err) {
            console.error("SUB hatası:", err.message);
            return 0;
        }
    }

    // =========================
    // MULTIPLY
    // =========================
    mul(a, b) {

        try {

            if (typeof a !== "number" || typeof b !== "number") {
                throw new Error("Çarpma sadece sayı kabul eder");
            }

            return a * b;

        } catch (err) {
            console.error("MUL hatası:", err.message);
            return 0;
        }
    }

    // =========================
    // DIVIDE SAFE
    // =========================
    div(a, b) {

        try {

            if (typeof a !== "number" || typeof b !== "number") {
                throw new Error("Bölme sadece sayı kabul eder");
            }

            if (b === 0) {
                console.warn("Sıfıra bölme engellendi");
                return null;
            }

            return a / b;

        } catch (err) {
            console.error("DIV hatası:", err.message);
            return null;
        }
    }

    // =========================
    // POWER
    // =========================
    pow(a, b) {

        try {

            if (typeof a !== "number" || typeof b !== "number") {
                throw new Error("Üs alma sadece sayı kabul eder");
            }

            return Math.pow(a, b);

        } catch (err) {
            console.error("POW hatası:", err.message);
            return 0;
        }
    }

    // =========================
    // RANDOM SAFE
    // =========================
    random(min = 0, max = 1) {

        try {

            if (typeof min !== "number" || typeof max !== "number") {
                throw new Error("Random için sayı gerekli");
            }

            return Math.random() * (max - min) + min;

        } catch (err) {
            console.error("RANDOM hatası:", err.message);
            return 0;
        }
    }

    // =========================
    // ROUND
    // =========================
    round(a) {

        try {

            if (typeof a !== "number") {
                throw new Error("Round sadece sayı kabul eder");
            }

            return Math.round(a);

        } catch (err) {
            console.error("ROUND hatası:", err.message);
            return 0;
        }
    }
}

module.exports = Matematik;