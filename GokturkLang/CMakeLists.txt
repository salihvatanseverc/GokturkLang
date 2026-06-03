cmake_minimum_required(VERSION 3.10)
project(GokturkLang)

set(CMAKE_CXX_STANDARD 17)

# Projedeki bütün .cpp dosyaları (Şimdilik ast içinde sadece .hpp var)
add_executable(gokturk_compiler
    src/lexer/lexer.cpp
    src/lexer/main.cpp
    src/parser/Parser.cpp
)

# Derleyicinin başlık (.hpp) dosyalarını arayacağı klasörler arasına ast'ı da ekliyoruz
target_include_directories(gokturk_compiler PRIVATE
    src/lexer
    src/parser
    src/ast       # <-- Burayı ekledik!
)