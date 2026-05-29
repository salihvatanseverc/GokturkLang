#include "../include/lexer.hpp"
#include "../include/parser.hpp"

using namespace std;

int main() {

    string kod = "yaz Merhaba";

    vector<string> tokens = tokenize(kod);

    parse(tokens);

    return 0;
}