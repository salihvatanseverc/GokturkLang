#include "interpreter.hpp"
#include "../yazdır altyapısı/yazdir.hpp"
#include "../matematik yapısı/matematik.hpp"

namespace gokturklang {

int interpreter::calistir(const astnode* node) {
    if (!node) return 0;

    // 1. durum: doğrudan sayı düğümü ise değerini dön
    if (auto numnode = dynamic_cast<const numbernode*>(node)) {
        return numnode->value;
    }

    // 2. durum: değişken düğümü ise havuzdan değerini getir
    if (auto varnode = dynamic_cast<const variablenode*>(node)) {
        auto it = degiskenlerhavuzu.find(varnode->name);
        if (it != degiskenlerhavuzu.end()) {
            return it->second;
        }
        return 0; // değişken bulunamazsa varsayılan 0 döner
    }

    // 3. durum: atama işlemi (örneğin: x = 5)
    if (auto assignnode = dynamic_cast<const assignmentnode*>(node)) {
        int deger = calistir(assignnode->value.get());
        degiskenlerhavuzu[assignnode->name] = deger;
        return deger;
    }

    // 4. durum: matematiksel toplama işlemi (örneğin: 5 + 8 veya x + y)
    if (auto binnode = dynamic_cast<const binaryopnode*>(node)) {
        if (binnode->op == "+") {
            int sol = calistir(binnode->left.get());
            int sag = calistir(binnode->right.get());
            return matematikyapisi::sayitopla(sol, sag);
        }
    }

    // 5. durum: yazdır komutu (örneğin: yazdir x veya yazdir 13)
    if (auto yazdirnode = dynamic_cast<const yazdirnode*>(node)) {
        // eğer yazdırılacak şey bir değişken adı ise doğrudan altyapıyı çağırırız
        if (auto varnode = dynamic_cast<const variablenode*>(yazdirnode->expression.get())) {
            yazdiraltyapisi::calistir(varnode->name, degiskenlerhavuzu);
        } else {
            // eğer yazdırılacak şey doğrudan bir işlem veya sayı ise önce hesaplar sonra basarız
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