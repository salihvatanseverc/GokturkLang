#include <iostream>
#include <vector>

using namespace std;

vector<string> tokenize(string kod);

int main() {
    string kod = "yaz merhaba";

    vector<string> sonuc = tokenize(kod);

    for (string t : sonuc) {
        cout << t << endl;
    }

    return 0;
}