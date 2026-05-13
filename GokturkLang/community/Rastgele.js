class Rastgele {

    constructor() {}

    // 0 - 1 arası
    ORAN() {
        return Math.random();
    }

    // min - max arası tam sayı
    TAM(min, max) {

        if (min > max) {
            const temp = min;
            min = max;
            max = temp;
        }

        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;
    }

    // min - max arası ondalıklı
    ONDALIK(min, max) {

        if (min > max) {
            const temp = min;
            min = max;
            max = temp;
        }

        return Math.random() * (max - min) + min;
    }

    // liste içinden random seç
    SEC(liste) {

        if (!Array.isArray(liste)) {
            throw new Error("Liste değil");
        }

        const index =
            Math.floor(
                Math.random() * liste.length
            );

        return liste[index];
    }

    // boolean random
    BOOL() {
        return Math.random() < 0.5;
    }
}

module.exports = Rastgele;