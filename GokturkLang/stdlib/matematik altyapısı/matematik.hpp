#ifndef MATEMATIK_HPP
#define MATEMATIK_HPP

#include <string>
#include <unordered_map>

namespace gokturklang {

class matematikyapisi {
public:
    // doğrudan iki ham sayıyı toplar (örni: 5 + 8)
    static int sayitopla(int sayi1, int sayi2) {
        return sayi1 + sayi2;
    }

    // bir değişken ile bir sayıyı veya iki değişkeni toplar
    static int degiskentopla(const std::string& degisken1, const std::string& degisken2, const std::unordered_map<std::string, int>& degiskenlerhavuzu) {
        int deger1 = 0;
        int deger2 = 0;

        // birinci parametre kontrolü (havuzda varsa değerini al)
        auto it1 = degiskenlerhavuzu.find(degisken1);
        if (it1 != degiskenlerhavuzu.end()) {
            deger1 = it1->second;
        }

        // ikinci parametre kontrolü (havuzda varsa değerini al)
        auto it2 = degiskenlerhavuzu.find(degisken2);
        if (it2 != degiskenlerhavuzu.end()) {
            deger2 = it2->second;
        }

        return deger1 + deger2;
    }
};

} // namespace gokturklang

#endif