class Diziler {

    constructor(runtime) {
        this.runtime = runtime;
        this.memory = new Map(); // her array ayrı tutulur
    }

    // =========================
    // SAFE CREATE / SET
    // =========================
    set(name, array = []) {

        try {

            if (!name || typeof name !== "string") {
                throw new Error("Geçersiz dizi adı");
            }

            if (!Array.isArray(array)) {
                throw new Error("Dizi olmayan veri verildi");
            }

            if (this.memory.has(name)) {
                console.warn(`Uyarı: ${name} dizisi güncellendi`);
            }

            this.memory.set(name, {
                value: [...array],
                length: array.length,
                createdAt: Date.now()
            });

            return true;

        } catch (err) {
            console.error("Dizi set hatası:", err.message);
            return false;
        }
    }

    // =========================
    // SAFE GET
    // =========================
    get(name) {

        try {

            if (!this.memory.has(name)) {
                console.warn(`Tanımsız dizi: ${name}`);
                return null;
            }

            return this.memory.get(name).value;

        } catch (err) {
            console.error("Dizi get hatası:", err.message);
            return null;
        }
    }

    // =========================
    // PUSH (ELEMAN EKLE)
    // =========================
    push(name, value) {

        try {

            if (!this.memory.has(name)) {
                throw new Error("Dizi bulunamadı");
            }

            const arr = this.memory.get(name).value;

            arr.push(value);

            this.memory.set(name, {
                value: arr,
                length: arr.length,
                updatedAt: Date.now()
            });

            return arr;

        } catch (err) {
            console.error("Dizi push hatası:", err.message);
            return null;
        }
    }

    // =========================
    // POP (SON ELEMAN)
    // =========================
    pop(name) {

        try {

            if (!this.memory.has(name)) {
                return null;
            }

            const arr = this.memory.get(name).value;

            const removed = arr.pop();

            this.memory.set(name, {
                value: arr,
                length: arr.length,
                updatedAt: Date.now()
            });

            return removed;

        } catch (err) {
            console.error("Dizi pop hatası:", err.message);
            return null;
        }
    }

    // =========================
    // SIL
    // =========================
    delete(name) {

        try {

            if (!this.memory.has(name)) {
                return false;
            }

            this.memory.delete(name);
            return true;

        } catch (err) {
            console.error("Dizi delete hatası:", err.message);
            return false;
        }
    }

    // =========================
    // INDEX GET
    // =========================
    index(name, i) {

        try {

            if (!this.memory.has(name)) {
                return null;
            }

            const arr = this.memory.get(name).value;

            if (i < 0 || i >= arr.length) {
                console.warn("Geçersiz index");
                return null;
            }

            return arr[i];

        } catch (err) {
            console.error("Dizi index hatası:", err.message);
            return null;
        }
    }

    // =========================
    // LENGTH
    // =========================
    length(name) {

        try {

            if (!this.memory.has(name)) {
                return 0;
            }

            return this.memory.get(name).value.length;

        } catch (err) {
            console.error("Dizi length hatası:", err.message);
            return 0;
        }
    }

    // =========================
    // CLEAR ALL ARRAYS
    // =========================
    clear() {

        try {
            this.memory.clear();
            return true;
        } catch (err) {
            console.error("Dizi clear hatası:", err.message);
            return false;
        }
    }

    // =========================
    // DEBUG
    // =========================
    dump() {
        return Array.from(this.memory.entries());
    }
}

module.exports = Diziler;