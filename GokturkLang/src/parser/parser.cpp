#include "../../include/parser/parser.hpp"
#include <iostream>

void parse(const std::vector<std::string>& tokens) {

    for (int i = 0; i < tokens.size(); i++) {

        if (tokens[i] == "yaz") {

            if (i + 1 < tokens.size()) {
                std::cout << tokens[i + 1] << std::endl;
            }

        }

    }
}