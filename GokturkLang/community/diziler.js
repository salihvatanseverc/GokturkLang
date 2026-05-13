class Diziler {

    // dizi oluştur
    static olustur(...elemanlar) {
        return [...elemanlar];
    }

    // eleman getir
    static al(dizi, index) {

        if (!Array.isArray(dizi)) {
            throw new Error("Dizi değil");
        }

        return dizi[index];
    }

    // eleman değiştir
    static degistir(dizi, index, deger) {

        if (!Array.isArray(dizi)) {
            throw new Error("Dizi değil");
        }

        dizi[index] = deger;
        return dizi;
    }

    // eleman ekle
    static ekle(dizi, deger) {

        if (!Array.isArray(dizi)) {
            throw new Error("Dizi değil");
        }

        dizi.push(deger);
        return dizi;
    }

    // eleman sil (sondan)
    static sil(dizi) {

        if (!Array.isArray(dizi)) {
            throw new Error("Dizi değil");
        }

        return dizi.pop();
    }

    // uzunluk
    static uzunluk(dizi) {

        if (!Array.isArray(dizi)) {
            throw new Error("Dizi değil");
        }

        return dizi.length;
    }

    // parça alma (slice)
    static parcala(dizi, baslangic, bitis) {

        if (!Array.isArray(dizi)) {
            throw new Error("Dizi değil");
        }

        return dizi.slice(baslangic, bitis);
    }

    // temizle
    static temizle(dizi) {

        if (!Array.isArray(dizi)) {
            throw new Error("Dizi değil");
        }

        dizi.length = 0;
        return dizi;
    }

    // içeriyor mu
    static iceriyor(dizi, deger) {

        if (!Array.isArray(dizi)) {
            throw new Error("Dizi değil");
        }

        return dizi.includes(deger);
    }
}

module.exports = Diziler;