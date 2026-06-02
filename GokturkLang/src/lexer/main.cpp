#include "lexer.hpp"
#include <iostream>

int main() {
    std::string code = R"(
        değişken x = 10
        yazdır("Merhaba Göktürk!")
    )";

    Lexer lexer(code);
    auto tokens = lexer.tokenize();

    for (auto& t : tokens) {
        std::cout << (int)t.type << " : " << t.value << "\n";
    }
}
