#ifndef INTERPRETER_HPP
#define INTERPRETER_HPP

#include <string>
#include <unordered_map>
#include <vector>
#include <memory>
#include "../ast/ast.hpp" // ast düğüm tanımlarınız için

namespace gokturklang {

class interpreter {
private:
    // değişkenlerin saklandığı ana bellek havuzu
    std::unordered_map<std::string, int> degiskenlerhavuzu;

public:
    interpreter() = default;

    // tek bir ast düğümünü yorumlar ve çalıştırır
    int calistir(const astnode* node);

    // tüm programı (düğümler listesini) sırasıyla yürütür
    void programicalistir(const std::vector<std::unique_ptr<astnode>>& program);

    // değişken havuzuna dışarıdan erişim gerekirse referans döner
    const std::unordered_map<std::string, int>& havuzugetir() const {
        return degiskenlerhavuzu;
    }
};

} // namespace gokturklang

#endif