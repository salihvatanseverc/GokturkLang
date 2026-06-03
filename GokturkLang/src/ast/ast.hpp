#ifndef AST_HPP
#define AST_HPP

#include <string>
#include <vector>
#include <memory>

struct ASTNode {
    virtual ~ASTNode() = default;
    virtual void print(int indent = 0) const = 0; 
};

struct NumberLiteralNode : public ASTNode {
    std::string value;
    explicit NumberLiteralNode(std::string val);
    void print(int indent) const override;
};

struct IdentifierNode : public ASTNode {
    std::string name;
    explicit IdentifierNode(std::string n);
    void print(int indent) const override;
};

struct BinaryExpressionNode : public ASTNode {
    std::string op;
    std::unique_ptr<ASTNode> left;
    std::unique_ptr<ASTNode> right;

    BinaryExpressionNode(std::string o, std::unique_ptr<ASTNode> l, std::unique_ptr<ASTNode> r);
    void print(int indent) const override;
};

struct VariableDeclarationNode : public ASTNode {
    std::string identifier;
    std::unique_ptr<ASTNode> initializer;

    VariableDeclarationNode(std::string id, std::unique_ptr<ASTNode> init);
    void print(int indent) const override;
};

struct PrintStatementNode : public ASTNode {
    std::unique_ptr<ASTNode> expression;
    explicit PrintStatementNode(std::unique_ptr<ASTNode> expr);
    void print(int indent) const override;
};

struct ProgramNode : public ASTNode {
    std::vector<std::unique_ptr<ASTNode>> statements;
    void print(int indent) const override;
};

#endif // AST_HPP