#ifndef MATEMATIK_HPP
#define MATEMATIK_HPP

#include <string>
#include <unordered_map>

namespace gokturklang {

class matematikyapisi {
public:
    // toplama işlemi (5 + 8)
    static int sayitopla(int sayi1, int sayi2) {
        return sayi1 + sayi2;
    }

    // çıkarma işlemi (10 - 4)
    static int sayicikar(int sayi1, int sayi2) {
        return sayi1 - sayi2;
    }

    // çarpma işlemi (3 * 4)
    static int sayicarp(int sayi1, int sayi2) {
        return sayi1 * sayi2;
    }

    // bölme işlemi (20 / 5)
    static int sayibol(int sayi1, int sayi2) {
        if (sayi2 == 0) return 0; // sıfıra bölünme hatasını önlemek için varsayılan koruma
        return sayi1 / sayi2;
    }
};

} // namespace gokturklang

#endif