class Yazdir {

    constructor(outputFn = console.log) {
        this.output = outputFn;
    }

    // temel yazdır
    YAZDIR(value) {
        this.output(String(value));
    }

    // satır yazdır
    SATIR(value) {
        this.output(String(value) + "\n");
    }

    // boş satır
    BOS() {
        this.output("");
    }

    // hata yazdır (kırmızı sistem için hazır)
    HATA(message, line = null) {

        if (line !== null) {
            this.output("[HATA] " + message + " (satır " + line + ")");
        } else {
            this.output("[HATA] " + message);
        }
    }

    // uyarı
    UYARI(message) {
        this.output("[UYARI] " + message);
    }
}

module.exports = Yazdir;