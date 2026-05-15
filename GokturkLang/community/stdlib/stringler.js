class Stringler {

    constructor(runtime) {
        this.runtime = runtime;
    }

    // =========================
    // SAFE LENGTH
    // =========================
    length(str) {

        try {

            if (typeof str !== "string") {
                throw new Error("String olmalı");
            }

            return str.length;

        } catch (err) {
            console.error("LENGTH hatası:", err.message);
            return 0;
        }
    }

    // =========================
    // TO UPPER
    // =========================
    upper(str) {

        try {

            if (typeof str !== "string") {
                throw new Error("String olmalı");
            }

            return str.toUpperCase();

        } catch (err) {
            console.error("UPPER hatası:", err.message);
            return "";
        }
    }

    // =========================
    // TO LOWER
    // =========================
    lower(str) {

        try {

            if (typeof str !== "string") {
                throw new Error("String olmalı");
            }

            return str.toLowerCase();

        } catch (err) {
            console.error("LOWER hatası:", err.message);
            return "";
        }
    }

    // =========================
    // CONCAT
    // =========================
    concat(a, b) {

        try {

            if (typeof a !== "string" || typeof b !== "string") {
                throw new Error("İki parametre de string olmalı");
            }

            return a + b;

        } catch (err) {
            console.error("CONCAT hatası:", err.message);
            return "";
        }
    }

    // =========================
    // INCLUDE CHECK
    // =========================
    includes(str, search) {

        try {

            if (typeof str !== "string" || typeof search !== "string") {
                throw new Error("String olmalı");
            }

            return str.includes(search);

        } catch (err) {
            console.error("INCLUDES hatası:", err.message);
            return false;
        }
    }

    // =========================
    // SPLIT
    // =========================
    split(str, sep = " ") {

        try {

            if (typeof str !== "string") {
                throw new Error("String olmalı");
            }

            return str.split(sep);

        } catch (err) {
            console.error("SPLIT hatası:", err.message);
            return [];
        }
    }

    // =========================
    // REPLACE SAFE
    // =========================
    replace(str, target, value) {

        try {

            if (typeof str !== "string") {
                throw new Error("String olmalı");
            }

            return str.replace(target, value);

        } catch (err) {
            console.error("REPLACE hatası:", err.message);
            return "";
        }
    }

    // =========================
    // TRIM
    // =========================
    trim(str) {

        try {

            if (typeof str !== "string") {
                throw new Error("String olmalı");
            }

            return str.trim();

        } catch (err) {
            console.error("TRIM hatası:", err.message);
            return "";
        }
    }
}

module.exports = Stringler;