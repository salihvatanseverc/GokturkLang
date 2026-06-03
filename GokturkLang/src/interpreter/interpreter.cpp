#include "interpreter.hpp"
#include <iostream>
#include <stdexcept>

// İfadeleri (Expression) değerlendirip sayısal sonuç dönen fonksiyon
int Interpreter::evaluate(const ASTNode* node) {
    if (!node) return 0;

    // 1. Eğer düğüm bir Sayı ise, doğrudan integer'a çevirip dön
    if (auto numNode = dynamic_cast<const NumberLiteralNode*>(node)) {
        return std::stoi(numNode->value);
    }

    // 2. Eğer düğüm bir Değişken Adı ise, hafızadan değerini bul
    if (auto idNode = dynamic_cast<const IdentifierNode*>(node)) {
        if (m_memory.find(idNode->name) == m_memory.end()) {
            throw std::runtime_error("Çalışma Zamanı Hatası: Tanımlanmamış değişken '" + idNode->name + "'");
        }
        return m_memory[idNode->name];
    }

    // 3. Eğer düğüm bir Matematiksel İşlem ise, sol ve sağ tarafı çözüp işlemi yap
    if (auto binNode = dynamic_cast<const BinaryExpressionNode*>(node)) {
        int leftVal = evaluate(binNode->left.get());
        int rightVal = evaluate(binNode->right.get());

        if (binNode->op == "+") return leftVal + rightVal;
        if (binNode->op == "-") return leftVal - rightVal;
        if (binNode->op == "*") return leftVal * rightVal;
        if (binNode->op == "/") {
            if (rightVal == 0) throw std::runtime_error("Çalışma Zamanı Hatası: Sıfıra bölme hatası!");
            return leftVal / rightVal;
        }
    }

    return 0;
}

// Komutları (Statement) sırayla çalıştıran fonksiyon
void Interpreter::execute(const ASTNode* node) {
    if (!node) return;

    // 1. Değişken Tanımlama Komutu gelirse
    if (auto varDecl = dynamic_cast<const VariableDeclarationNode*>(node)) {
        int value = 0;
        if (varDecl->initializer) {
            value = evaluate(varDecl->initializer.get()); // Eşittir'in sağını hesapla
        }
        m_memory[varDecl->identifier] = value; // Hafızaya kaydet
        return;
    }

    // 2. Yazdır Komutu gelirse
    if (auto printStmt = dynamic_cast<const PrintStatementNode*>(node)) {
        int value = evaluate(printStmt->expression.get()); // Yazdırılacak değeri hesapla
        std::cout << value << "\n"; // Konsola bas!
        return;
    }

    // 3. Tüm Program (Çoklu satır) gelirse
    if (auto progNode = dynamic_cast<const ProgramNode*>(node)) {
        for (const auto& stmt : progNode->statements) {
            execute(stmt.get()); // Her satırı sırayla çalıştır
        }
        return;
    }
}

// Dışarıdan çağrılan ana yorumlayıcı tetikleyicisi
void Interpreter::interpret(const ASTNode* root) {
    try {
        execute(root);
    } catch (const std::exception& e) {
        std::cerr << e.what() << std::endl;
    }
}