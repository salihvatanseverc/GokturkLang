class Donguler {

    constructor(runtime) {
        this.runtime = runtime;
        this.loops = 0;
    }

    // =========================
    // SAFE FOR LOOP
    // =========================
    forLoop(start, end, callback) {

        try {

            if (typeof start !== "number" || typeof end !== "number") {
                throw new Error("Başlangıç ve bitiş sayı olmalı");
            }

            if (typeof callback !== "function") {
                throw new Error("Callback fonksiyon olmalı");
            }

            this.loops++;

            for (let i = start; i < end; i++) {
                try {
                    callback(i);
                } catch (err) {
                    console.error("Loop callback hatası:", err.message);
                }
            }

            return true;

        } catch (err) {
            console.error("ForLoop hatası:", err.message);
            return false;
        }
    }

    // =========================
    // WHILE LOOP SAFE
    // =========================
    whileLoop(conditionFn, callbackFn, maxIterations = 10000) {

        try {

            if (typeof conditionFn !== "function") {
                throw new Error("Condition fonksiyon olmalı");
            }

            if (typeof callbackFn !== "function") {
                throw new Error("Callback fonksiyon olmalı");
            }

            let i = 0;

            while (conditionFn()) {

                if (i > maxIterations) {
                    console.warn("Loop limit aşıldı, durduruldu");
                    break;
                }

                try {
                    callbackFn(i);
                } catch (err) {
                    console.error("While callback hatası:", err.message);
                }

                i++;
                this.loops++;
            }

            return true;

        } catch (err) {
            console.error("WhileLoop hatası:", err.message);
            return false;
        }
    }

    // =========================
    // FOREACH SAFE
    // =========================
    forEach(arr, callback) {

        try {

            if (!Array.isArray(arr)) {
                throw new Error("Dizi olmalı");
            }

            if (typeof callback !== "function") {
                throw new Error("Callback fonksiyon olmalı");
            }

            arr.forEach((item, index) => {

                try {
                    callback(item, index);
                } catch (err) {
                    console.error("forEach callback hatası:", err.message);
                }

            });

            return true;

        } catch (err) {
            console.error("forEach hatası:", err.message);
            return false;
        }
    }

    // =========================
    // LOOP COUNT DEBUG
    // =========================
    getLoopCount() {
        return this.loops;
    }

    // =========================
    // RESET
    // =========================
    reset() {
        this.loops = 0;
        return true;
    }
}

module.exports = Donguler;