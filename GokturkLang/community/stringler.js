class StringIslemleri {

    constructor() {}

    // uzunluk
    UZUNLUK(str) {

        if (typeof str !== "string") {
            throw new Error("String değil");
        }

        return str.length;
    }

    // birleştirme
    BIRLESTIR(a, b) {

        return String(a) + String(b);
    }

    // küçük harf
    KUCUK(str) {

        return String(str).toLowerCase();
    }

    // büyük harf
    BUYUK(str) {

        return String(str).toUpperCase();
    }

    // alt dizi
    ALT(str, start, end) {

        return String(str).substring(start, end);
    }

    // içeriyor mu
    ICERIR(str, search) {

        return String(str).includes(search);
    }

    // değiştirme
    DEGISTIR(str, oldText, newText) {

        return String(str).replaceAll(oldText, newText);
    }

    // kırpma
    KIRP(str) {

        return String(str).trim();
    }

    // bölme
    BOL(str, ayirac) {

        return String(str).split(ayirac);
    }

    // tekrar etme
    TEKRAR(str, count) {

        return String(str).repeat(count);
    }
}

module.exports = StringIslemleri;