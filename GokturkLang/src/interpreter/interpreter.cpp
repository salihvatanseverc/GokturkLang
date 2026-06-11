#include "interpreter.hpp"
#include "..\..\yazdır altyapısı\yazdir.hpp"    // Ters bölü yapıldı
#include "..\..\matematik yapısı\matematik.hpp" // Ters bölü yapıldı

namespace gokturklang {

int interpreter::calistir(const astnode* node) {
    if (!node) return 0;

    // 1. durum: doğrudan sayı düğümü
    if (auto numnode = dynamic_cast<const numbernode*>(node)) {
        return numnode->value;
    }

    // 2. durum: değişken düğümü
    if (auto varnode = dynamic_cast<const variablenode*>(node)) {
        auto it = degiskenlerhavuzu.find(varnode->name);
        if (it != degiskenlerhavuzu.end()) {
            return it->second;
        }
        return 0;
    }

    // 3. durum: atama işlemi (x = 5)
    if (auto assignnode = dynamic_cast<const assignmentnode*>(node)) {
        int deger = calistir(assignnode->value.get());
        degiskenlerhavuzu[assignnode->name] = deger;
        return deger;
    }

    // 4. durum: matematiksel işlemler (+, -, *, /)
    if (auto binnode = dynamic_cast<const binaryopnode*>(node)) {
        int sol = calistir(binnode->left.get());
        int sag = calistir(binnode->right.get());

        if (binnode->op == "+") return matematikyapisi::sayitopla(sol, sag);
        if (binnode->op == "-") return matematikyapisi::sayicikar(sol, sag);
        if (binnode->op == "*") return matematikyapisi::sayicarp(sol, sag);
        if (binnode->op == "/") return matematikyapisi::sayibol(sol, sag);
    }

    // 5. durum: yazdır komutu
    if (auto yazdirnode = dynamic_cast<const yazdirnode*>(node)) {
        if (auto varnode = dynamic_cast<const variablenode*>(yazdirnode->expression.get())) {
            yazdiraltyapisi::calistir(varnode->name, degiskenlerhavuzu);
        } else {
            int sonuc = calistir(yazdirnode->expression.get());
            yazdiraltyapisi::metinveyasayiyazdir(std::to_string(sonuc));
        }
        return 0;
    }

    return 0;
}

void interpreter::programicalistir(const std::vector<std::unique_ptr<astnode>>& program) {
    for (const auto& node : program) {
        calistir(node.get());
    }
}

} // namespace gokturklang