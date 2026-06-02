#include "lexer.hpp"
#include <cctype>

Lexer::Lexer(const std::string& source)
    : src(source), index(0) {}

char Lexer::peek() const {
    if (index >= src.size()) return '\0';
    return src[index];
}

char Lexer::advance() {
    if (index >= src.size()) return '\0';
    return src[index++];
}

void Lexer::skipWhitespace() {
    while (std::isspace(static_cast<unsigned char>(peek()))) {
        advance();
    }
}

Token Lexer::stringToken() {
    std::string value;
    while (peek() != '"' && peek() != '\0') {
        value.push_back(advance());
    }
    if (peek() == '"') advance();
    return { TokenType::STRING, value };
}

Token Lexer::numberToken() {
    std::string value;
    while (std::isdigit(static_cast<unsigned char>(peek()))) {
        value.push_back(advance());
    }
    return { TokenType::NUMBER, value };
}

Token Lexer::identifierOrKeyword() {
    std::string value;

    while (true) {
        unsigned char c = peek();

        // Harf, rakam, alt çizgi veya UTF‑8 karakter
        if (std::isalnum(c) || c == '_' || (c & 0x80)) {
            value.push_back(advance());
        } else {
            break;
        }
    }

    if (value == "yazdır")
        return { TokenType::YAZDIR, value };

    if (value == "değişken")
        return { TokenType::DEGISKEN, value };

    return { TokenType::IDENTIFIER, value };
}

std::vector<Token> Lexer::tokenize() {
    std::vector<Token> tokens;

    while (true) {
        skipWhitespace();
        char c = peek();

        if (c == '\0') {
            tokens.push_back({ TokenType::EOF_TOKEN, "" });
            break;
        }

        if (c == '"') {
            advance();
            tokens.push_back(stringToken());
        }
        else if (std::isdigit(static_cast<unsigned char>(c))) {
            tokens.push_back(numberToken());
        }
        else if (std::isalpha(static_cast<unsigned char>(c)) || (c & 0x80)) {
            tokens.push_back(identifierOrKeyword());
        }
        else if (c == '(') {
            advance();
            tokens.push_back({ TokenType::PARANTEZ_AC, "(" });
        }
        else if (c == ')') {
            advance();
            tokens.push_back({ TokenType::PARANTEZ_KAPA, ")" });
        }
        else if (c == '=') {
            advance();
            tokens.push_back({ TokenType::ESITTIR, "=" });
        }
        else if (c == ',') {
            advance();
            tokens.push_back({ TokenType::VIRGUL, "," });
        }
        else {
            advance();
        }
    }

    return tokens;
}
