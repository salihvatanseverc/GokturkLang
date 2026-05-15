class Rastgele {

    constructor(runtime) {
        this.runtime = runtime;
    }

    // =========================
    // RANDOM FLOAT
    // =========================
    float(min = 0, max = 1) {

        try {

            if (typeof min !== "number" || typeof max !== "number") {
                throw new Error("min ve max sayı olmalı");
            }

            if (min > max) {
                throw new Error("min max'tan büyük olamaz");
            }

            return Math.random() * (max - min) + min;

        } catch (err) {
            console.error("FLOAT random hatası:", err.message);
            return 0;
        }
    }

    // =========================
    // RANDOM INT
    // =========================
    int(min = 0, max = 10) {

        try {

            if (typeof min !== "number" || typeof max !== "number") {
                throw new Error("min ve max sayı olmalı");
            }

            if (min > max) {
                throw new Error("min max'tan büyük olamaz");
            }

            return Math.floor(Math.random() * (max - min + 1)) + min;

        } catch (err) {
            console.error("INT random hatası:", err.message);
            return 0;
        }
    }

    // =========================
    // RANDOM BOOLEAN
    // =========================
    bool() {

        try {
            return Math.random() < 0.5;
        } catch (err) {
            console.error("BOOL random hatası:", err.message);
            return false;
        }
    }

    // =========================
    // RANDOM ARRAY ITEM
    // =========================
    pick(array) {

        try {

            if (!Array.isArray(array)) {
                throw new Error("Dizi olmalı");
            }

            if (array.length === 0) {
                return null;
            }

            const index = Math.floor(Math.random() * array.length);
            return array[index];

        } catch (err) {
            console.error("PICK random hatası:", err.message);
            return null;
        }
    }

    // =========================
    // SHUFFLE ARRAY
    // =========================
    shuffle(array) {

        try {

            if (!Array.isArray(array)) {
                throw new Error("Dizi olmalı");
            }

            let arr = [...array];

            for (let i = arr.length - 1; i > 0; i--) {

                const j = Math.floor(Math.random() * (i + 1));

                [arr[i], arr[j]] = [arr[j], arr[i]];
            }

            return arr;

        } catch (err) {
            console.error("SHUFFLE hatası:", err.message);
            return [];
        }
    }
}

module.exports = Rastgele;