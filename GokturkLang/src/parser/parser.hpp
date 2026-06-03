#ifndef AST_HPP
#define AST_HPP

#include <string>
#include <vector>
#include <memory>
#include <iostream>

// ==========================================
// 1. TEMEL AST DÜĞÜMÜ (Ağacın Kökü)
// ==========================================
struct ASTNode {
    virtual ~ASTNode() = default;
    virtual void print(int indent = 0) const = 0; // Ağacı hiyerarşik görmek için indent (girinti) ekledik
};

// Yardımcı fonksiyon: Girinti oluşturmak için space basar
inline void printIndent(int indent) {
    for (int i = 0; i < indent; ++i) std::cout << "  ";
}

// ==========================================
// 2. İFADE DÜĞÜMLERİ (Değer Döndüren Yapılar)
// ==========================================

// Sayı Düğümleri (Örn: 5, 42)
struct NumberLiteralNode : public ASTNode {
    std::string value;

    explicit NumberLiteralNode(std::string val) : value(std::move(val)) {}

    void print(int indent) const override {
        printIndent(indent);
        std::cout << "Sayı Literal -> " << value << "\n";
    }
};

// Değişken Adı Düğümleri (Örn: sayi, x)
struct IdentifierNode : public ASTNode {
    std::string name;

    explicit IdentifierNode(std::string n) : name(std::move(n)) {}

    void print(int indent) const override {
        printIndent(indent);
        std::cout << "Değişken Adı -> " << name << "\n";
    }
};

// İkili İşlem Düğümleri (Örn: 5 + 10, x * 2)
struct BinaryExpressionNode : public ASTNode {
    std::string op; // "+", "-", "*", "/"
    std::unique_ptr<ASTNode> left;
    std::unique_ptr<ASTNode> right;

    BinaryExpressionNode(std::string o, std::unique_ptr<ASTNode> l, std::unique_ptr<ASTNode> r)
        : op(std::move(o)), left(std::move(l)), right(std::move(r)) {}

    void print(int indent) const override {
        printIndent(indent);
        std::cout << "İkili İşlem -> Oparatör: " << op << "\n";
        left->print(indent + 1);
        right->print(indent + 1);
    }
};

// ==========================================
// 3. KOMUT DÜĞÜMLERİ (Satırlar / Statements)
// ==========================================

// Değişken Tanımlama Düğümü (Örn: degisken x = 5 + 2)
struct VariableDeclarationNode : public ASTNode {
    std::string identifier;
    std::unique_ptr<ASTNode> initializer; // Sadece sayı değil, işlem de alabilsin diye ASTNode yaptık

    VariableDeclarationNode(std::string id, std::unique_ptr<ASTNode> init)
        : identifier(std::move(id)), initializer(std::move(init)) {}

    void print(int indent) const override {
        printIndent(indent);
        std::cout << "[Komut] Değişken Tanımlama -> Ad: " << identifier << "\n";
        if (initializer) {
            initializer->print(indent + 1);
        }
    }
};

// Ekrana Yazdırma Düğümü (Örn: yazdir(x + 5))
struct PrintStatementNode : public ASTNode {
    std::unique_ptr<ASTNode> expression;

    explicit PrintStatementNode(std::unique_ptr<ASTNode> expr) : expression(std::move(expr)) {}

    void print(int indent) const override {
        printIndent(indent);
        std::cout << "[Komut] Yazdır Fonksiyonu\n";
        expression->print(indent + 1);
    }
};

// ==========================================
// 4. PROGRAM DÜĞÜMÜ (Tüm Kod Dosyası)
// ==========================================
// Satır satır tüm komutları içinde tutan en üst katman düğüm
struct ProgramNode : public ASTNode {
    std::vector<std::unique_ptr<ASTNode>> statements;

    void print(int indent) const override {
        std::cout << "=== GÖKTÜRK AST AĞACI ===\n";
        for (const auto& stmt : statements) {
            stmt->print(indent);
        }
        std::cout << "=========================\n";
    }
};

#endif // AST_HPP