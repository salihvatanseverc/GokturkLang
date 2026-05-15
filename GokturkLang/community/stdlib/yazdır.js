class Yazdir {

    constructor(runtime) {
        this.runtime = runtime;
        this.outputBuffer = [];
        this.callCount = 0;
    }

    // =========================
    // SAFE PRINT
    // =========================
    yazdir(value) {

        try {

            this.callCount++;

            let output;

            if (typeof value === "object") {
                output = JSON.stringify(value, null, 2);
            } else {
                output = String(value);
            }

            this.outputBuffer.push(output);

            // runtime varsa console veya UI’ya bas
            if (this.runtime && this.runtime.print) {
                this.runtime.print(output);
            } else {
                console.log(output);
            }

            return true;

        } catch (err) {
            console.error("YAZDIR hatası:", err.message);
            return false;
        }
    }

    // =========================
    // PRINT LINE
    // =========================
    yazdirLn(value) {

        try {
            return this.yazdir(value + "\n");
        } catch (err) {
            console.error("YAZDIRLN hatası:", err.message);
            return false;
        }
    }

    // =========================
    // CLEAR OUTPUT
    // =========================
    clear() {

        try {

            this.outputBuffer = [];

            if (this.runtime && this.runtime.clearOutput) {
                this.runtime.clearOutput();
            }

            console.clear();
            return true;

        } catch (err) {
            console.error("CLEAR hatası:", err.message);
            return false;
        }
    }

    // =========================
    // GET OUTPUT
    // =========================
    getOutput() {
        return this.outputBuffer.join("\n");
    }

    // =========================
    // DEBUG INFO
    // =========================
    getCallCount() {
        return this.callCount;
    }
}

module.exports = Yazdir;