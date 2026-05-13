class Degiskenler {

    constructor() {

        // global scope
        this.global = {};

        // scope stack (bloklar için)
        this.scopes = [];
    }

    // yeni scope aç
    yeniScope() {
        this.scopes.push({});
    }

    // scope kapat
    kapatScope() {
        this.scopes.pop();
    }

    // değişken tanımla
    tanimla(isim, deger) {

        if (this.scopes.length > 0) {
            this.scopes[this.scopes.length - 1][isim] = deger;
        }
        else {
            this.global[isim] = deger;
        }
    }

    // değişken getir
    al(isim) {

        // önce scope içinde ara
        for (let i = this.scopes.length - 1; i >= 0; i--) {

            if (isim in this.scopes[i]) {
                return this.scopes[i][isim];
            }
        }

        // global kontrol
        if (isim in this.global) {
            return this.global[isim];
        }

        throw new Error("Tanımsız değişken: " + isim);
    }

    // değişken güncelle
    guncelle(isim, deger) {

        // scope içinde ara
        for (let i = this.scopes.length - 1; i >= 0; i--) {

            if (isim in this.scopes[i]) {
                this.scopes[i][isim] = deger;
                return;
            }
        }

        // global
        if (isim in this.global) {
            this.global[isim] = deger;
            return;
        }

        throw new Error("Değişken bulunamadı: " + isim);
    }

    // var mı kontrol
    varMi(isim) {

        for (let i = this.scopes.length - 1; i >= 0; i--) {
            if (isim in this.scopes[i]) return true;
        }

        return isim in this.global;
    }

    // hepsini temizle
    sifirla() {
        this.global = {};
        this.scopes = [];
    }
}

module.exports = Degiskenler;