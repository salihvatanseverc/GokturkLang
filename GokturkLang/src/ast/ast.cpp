#include "ast.hpp"
#include <iostream>

// Yardımcı fonksiyon: Girinti oluşturur
static void printIndent(int indent) {
    for (int i = 0; i < indent; ++i) std::cout << "  ";
}

// NumberLiteralNode
NumberLiteralNode::NumberLiteralNode(std::string val) : value(std::move(val)) {}
void NumberLiteralNode::print(int indent) const {
    printIndent(indent);
    std::cout << "Sayı: " << value << "\n";
}

// IdentifierNode
IdentifierNode::IdentifierNode(std::string n) : name(std::move(n)) {}
void IdentifierNode::print(int indent) const {
    printIndent(indent);
    std::cout << "Değişken Adı: " << name << "\n";
}

// BinaryExpressionNode
BinaryExpressionNode::BinaryExpressionNode(std::string o, std::unique_ptr<ASTNode> l, std::unique_ptr<ASTNode> r)
    : op(std::move(o)), left(std::move(l)), right(std::move(r)) {}
void BinaryExpressionNode::print(int indent) const {
    printIndent(indent);
    std::cout << "İşlem (" << op << ")\n";
    left->print(indent + 1);
    right->print(indent + 1);
}

// VariableDeclarationNode
VariableDeclarationNode::VariableDeclarationNode(std::string id, std::unique_ptr<ASTNode> init)
    : identifier(std::move(id)), initializer(std::move(init)) {}
void VariableDeclarationNode::print(int indent) const {
    printIndent(indent);
    std::cout << "[Komut] Değişken Tanımlama -> Ad: " << identifier << "\n";
    if (initializer) {
        initializer->print(indent + 1);
    }
}

// PrintStatementNode
PrintStatementNode::PrintStatementNode(std::unique_ptr<ASTNode> expr) : expression(std::move(expr)) {}
void PrintStatementNode::print(int indent) const {
    printIndent(indent);
    std::cout << "[Komut] Ekrana Yazdır\n";
    expression->print(indent + 1);
}

// ProgramNode
void ProgramNode::print(int indent) const {
    std::cout << "========= GÖKTÜRK AST AĞACI =========\n";
    for (const auto& stmt : statements) {
        stmt->print(indent);
    }
    std::cout << "=====================================\n";
}