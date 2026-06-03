#include "Parser.hpp"
#include <stdexcept>

// Constructor (Kurucu Fonksiyon)
Parser::Parser(std::vector<Token> tokens) : m_tokens(std::move(tokens)), m_cursor(0) {}

// Mevcut konumdaki token'ı döner
Token Parser::currentToken() const {
    if (m_cursor < m_tokens.size()) {
        return m_tokens[m_cursor];
    }
    return Token{TOKEN_EOF, ""};
}

// Token beklenen tipteyse imleci bir ilerletir, yoksa hata fırlatır
void Parser::consume(TokenType type, const std::string& errorMessage) {
    if (currentToken().type == type) {
        m_cursor++;
    } else {
        throw std::runtime_error("Sözdizimi Hatası: " + errorMessage + " (Alınan: " + currentToken().value + ")");
    }
}

// Ana parse fonksiyonu
std::unique_ptr<ASTNode> Parser::parse() {
    // Şimdilik tek bir satırı/ifadeyi parse ediyoruz
    return parseStatement();
}

// İfadenin tipini belirleyen kontrol mekanizması
std::unique_ptr<ASTNode> Parser::parseStatement() {
    if (currentToken().type == TOKEN_KEYWORD && (currentToken().value == "let" || currentToken().value == "degisken")) {
        return parseVariableDeclaration();
    }
    throw std::runtime_error("Bilinmeyen ifade başlangıcı: " + currentToken().value);
}

// Değişken tanımlama kuralı: KEYWORD IDENTIFIER ASSIGN NUMBER
std::unique_ptr<ASTNode> Parser::parseVariableDeclaration() {
    // 1. "let" veya "degisken" kelimesini geç
    consume(TOKEN_KEYWORD, "Anahtar kelime bekleniyordu.");

    // 2. Değişken adını al ve kaydet
    Token idToken = currentToken();
    consume(TOKEN_IDENTIFIER, "Değişken ismi bekleniyordu.");

    // 3. "=" sembolünü geç
    consume(TOKEN_ASSIGN, "'=' sembolü bekleniyordu.");

    // 4. Değeri al (Şimdilik sadece düz sayıları destekliyoruz)
    Token valToken = currentToken();
    consume(TOKEN_NUMBER, "Bir sayı değeri bekleniyordu.");

    // Elde ettiğimiz verilerle AST Düğümünü oluşturup dönüyoruz
    return std::make_unique<VariableDeclarationNode>(idToken.value, valToken.value);
}