#include "../include/parser.hpp"
#include <iostream>

using namespace std;

void parse(vector<string> tokens) {

    for (int i = 0; i < tokens.size(); i++) {

        if (tokens[i] == "yaz") {

            if (i + 1 < tokens.size()) {
                cout << tokens[i + 1] << endl;
            }

        }

    }

}