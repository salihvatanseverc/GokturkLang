#ifndef LEXER_HPP
#define LEXER_HPP

#include <string>
#include <vector>

enum class TokenType {
    YAZDIR,
    DEGISKEN,
    IDENTIFIER,
    NUMBER,
    STRING,
    PARANTEZ_AC,
    PARANTEZ_KAPA,
    ESITTIR,
    VIRGUL,
    EOF_TOKEN
};

struct Token {
    TokenType type;
    std::string value;
};

class Lexer {
public:
    Lexer(const std::string& source);
    std::vector<Token> tokenize();

private:
    std::string src;
    size_t index;

    char peek() const;
    char advance();
    void skipWhitespace();
    Token stringToken();
    Token numberToken();
    Token identifierOrKeyword();
};

#endif
