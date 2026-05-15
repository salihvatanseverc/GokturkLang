class Kosullar {

    constructor(runtime) {
        this.runtime = runtime;
        this.executedCount = 0;
    }

    // =========================
    // SAFE IF SYSTEM
    // =========================
    if(condition, callback) {

        try {

            if (typeof condition !== "boolean") {
                throw new Error("Koşul boolean olmalı");
            }

            if (typeof callback !== "function") {
                throw new Error("Callback fonksiyon olmalı");
            }

            if (condition) {

                this.executedCount++;

                try {
                    return callback();
                } catch (err) {
                    console.error("IF callback hatası:", err.message);
                    return null;
                }

            }

            return false;

        } catch (err) {
            console.error("IF sistemi hatası:", err.message);
            return false;
        }
    }

    // =========================
    // ELSE IF SYSTEM
    // =========================
    elseIf(prevCondition, condition, callback) {

        try {

            if (prevCondition) return false;

            if (typeof condition !== "boolean") {
                throw new Error("Koşul boolean olmalı");
            }

            if (typeof callback !== "function") {
                throw new Error("Callback fonksiyon olmalı");
            }

            if (condition) {

                this.executedCount++;

                try {
                    return callback();
                } catch (err) {
                    console.error("ELSE IF callback hatası:", err.message);
                    return null;
                }
            }

            return false;

        } catch (err) {
            console.error("ELSE IF hatası:", err.message);
            return false;
        }
    }

    // =========================
    // ELSE SYSTEM
    // =========================
    else(prevCondition, callback) {

        try {

            if (typeof callback !== "function") {
                throw new Error("Callback fonksiyon olmalı");
            }

            if (!prevCondition) {

                this.executedCount++;

                try {
                    return callback();
                } catch (err) {
                    console.error("ELSE callback hatası:", err.message);
                    return null;
                }
            }

            return false;

        } catch (err) {
            console.error("ELSE sistemi hatası:", err.message);
            return false;
        }
    }

    // =========================
    // DEBUG
    // =========================
    getExecutedCount() {
        return this.executedCount;
    }

    reset() {
        this.executedCount = 0;
        return true;
    }
}

module.exports = Kosullar;