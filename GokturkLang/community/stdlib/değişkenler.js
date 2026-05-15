class Degiskenler {

    constructor(runtime) {
        this.runtime = runtime;
        this.memory = new Map(); // değişken hafızası
    }

    // =========================
    // SAFE SET
    // =========================
    set(name, value) {

        try {

            if (!name || typeof name !== "string") {
                throw new Error("Geçersiz değişken adı");
            }

            // overwrite koruması
            if (this.memory.has(name)) {
                console.warn(`Uyarı: ${name} değişkeni güncellendi`);
            }

            this.memory.set(name, {
                value: value,
                type: typeof value,
                createdAt: Date.now()
            });

            return true;

        } catch (err) {
            console.error("Degisken set hatası:", err.message);
            return false;
        }
    }

    // =========================
    // GET SAFE
    // =========================
    get(name) {

        try {

            if (!this.memory.has(name)) {
                console.warn(`Tanımsız değişken: ${name}`);
                return null;
            }

            return this.memory.get(name).value;

        } catch (err) {
            console.error("Degisken get hatası:", err.message);
            return null;
        }
    }

    // =========================
    // DELETE SAFE
    // =========================
    delete(name) {

        try {

            if (!this.memory.has(name)) {
                return false;
            }

            this.memory.delete(name);
            return true;

        } catch (err) {
            console.error("Degisken delete hatası:", err.message);
            return false;
        }
    }

    // =========================
    // EXISTS CHECK
    // =========================
    exists(name) {
        return this.memory.has(name);
    }

    // =========================
    // CLEAR ALL (SAFE RESET)
    // =========================
    clear() {

        try {
            this.memory.clear();
            return true;
        } catch (err) {
            console.error("Memory clear hatası:", err.message);
            return false;
        }
    }

    // =========================
    // DEBUG DUMP
    // =========================
    dump() {
        return Array.from(this.memory.entries());
    }
}

module.exports = Degiskenler;