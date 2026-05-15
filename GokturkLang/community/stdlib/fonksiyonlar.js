class Fonksiyonlar {

    constructor(runtime) {
        this.runtime = runtime;
        this.functions = new Map();
        this.callCount = 0;
    }

    // =========================
    // SAFE DEFINE FUNCTION
    // =========================
    define(name, params, body) {

        try {

            if (!name || typeof name !== "string") {
                throw new Error("Geçersiz fonksiyon adı");
            }

            if (!Array.isArray(params)) {
                throw new Error("Parametreler dizi olmalı");
            }

            if (typeof body !== "function") {
                throw new Error("Fonksiyon gövdesi function olmalı");
            }

            this.functions.set(name, {
                params,
                body,
                createdAt: Date.now()
            });

            return true;

        } catch (err) {
            console.error("Fonksiyon tanımlama hatası:", err.message);
            return false;
        }
    }

    // =========================
    // SAFE CALL FUNCTION
    // =========================
    call(name, args = []) {

        try {

            if (!this.functions.has(name)) {
                throw new Error("Fonksiyon bulunamadı: " + name);
            }

            const fn = this.functions.get(name);

            if (!Array.isArray(args)) {
                throw new Error("Args array olmalı");
            }

            this.callCount++;

            // scope izolasyonu
            const scope = {};

            // parametre bind
            fn.params.forEach((p, i) => {
                scope[p] = args[i];
            });

            let result = null;

            try {

                result = fn.body(scope);

            } catch (err) {
                console.error("Fonksiyon çalıştırma hatası:", err.message);
                return null;
            }

            return result;

        } catch (err) {
            console.error("Call hatası:", err.message);
            return null;
        }
    }

    // =========================
    // EXISTS CHECK
    // =========================
    exists(name) {
        return this.functions.has(name);
    }

    // =========================
    // DELETE FUNCTION
    // =========================
    delete(name) {

        try {

            if (!this.functions.has(name)) {
                return false;
            }

            this.functions.delete(name);
            return true;

        } catch (err) {
            console.error("Fonksiyon silme hatası:", err.message);
            return false;
        }
    }

    // =========================
    // DEBUG
    // =========================
    list() {
        return Array.from(this.functions.keys());
    }

    // =========================
    // CALL COUNT
    // =========================
    getCallCount() {
        return this.callCount;
    }

    resetCalls() {
        this.callCount = 0;
        return true;
    }
}

module.exports = Fonksiyonlar;