#include "../include/lexer/lexer.hpp"
#include "../include/parser/parser.hpp"

int main() {

    std::string code = "yaz Merhaba";

    auto tokens = tokenize(code);

    parse(tokens);

    return 0;
}