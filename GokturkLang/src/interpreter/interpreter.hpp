#ifndef INTERPRETER_HPP
#define INTERPRETER_HPP

#include "ast.hpp"
#include <map>
#include <string>
#include <memory>

class Interpreter {
public:
    Interpreter() = default;

    // Ana çalıştırma fonksiyonu (Ağacın kökünü alır ve başlatır)
    void interpret(const ASTNode* root);

private:
    // Değişkenleri ve değerlerini tuttuğumuz yerli belleğimiz (Sembol Tablosu)
    std::map<std::string, int> m_memory;

    // Yardımcı fonksiyonlar: Her düğüm tipini ayrı ayrı işler
    int evaluate(const ASTNode* node); // Değer döndüren ifadeler için (Sayı, İşlem)
    void execute(const ASTNode* node);  // Komutlar için (Değişken tanımlama, Yazdır)
};

#endif // INTERPRETER_HPP