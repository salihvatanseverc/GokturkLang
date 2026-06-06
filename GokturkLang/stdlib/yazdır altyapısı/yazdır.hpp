#ifndef YAZDIR_HPP
#define YAZDIR_HPP

#include <iostream>
#include <string>
#include <unordered_map>

namespace gokturklang {

class yazdiraltyapisi {
public:
    // sadece degisken havuzundan degeri okur ve ekrana basar (hata kontrolü barındırmaz)
    static void calistir(const std::string& degiskenadi, const std::unordered_map<std::string, int>& degiskenlerhavuzu) {
        auto it = degiskenlerhavuzu.find(degiskenadi);
        if (it != degiskenlerhavuzu.end()) {
            std::cout << it->second << std::endl;
        } else {
            std::cout << "0" << std::endl; // degisken bulunamazsa varsayilan cikti
        }
    }

    // dogrudan ham metin veya sayi yazdırma fonksiyonu
    static void metinveyasayiyazdir(const std::string& cikti) {
        std::cout << cikti << std::endl;
    }
};

} // namespace gokturklang

#endif