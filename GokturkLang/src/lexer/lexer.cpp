#include "../../include/lexer/lexer.hpp"
#include <sstream>

std::vector<std::string> tokenize(const std::string& code) {
    std::stringstream ss(code);
    std::string token;

    std::vector<std::string> tokens;

    while (ss >> token) {
        tokens.push_back(token);
    }

    return tokens;
}