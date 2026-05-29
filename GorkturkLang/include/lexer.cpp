#include "../include/lexer.hpp"
#include <sstream>

using namespace std;

vector<string> tokenize(string kod) {

    stringstream ss(kod);

    string token;

    vector<string> tokens;

    while (ss >> token) {
        tokens.push_back(token);
    }

    return tokens;
}