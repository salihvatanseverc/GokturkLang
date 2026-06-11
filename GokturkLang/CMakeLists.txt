cmake_minimum_required(VERSION 3.10)
project(GokturkLang)

set(CMAKE_CXX_STANDARD 17)

add_executable(gokturk_compiler
    src/lexer/lexer.cpp
    src/lexer/main.cpp
    src/parser/Parser.cpp
    src/ast/ast.cpp
    src/interpreter/interpreter.cpp # <-- Burayı ekledik!
)

target_include_directories(gokturk_compiler PRIVATE
    src/lexer
    src/parser
    src/ast
    src/interpreter # <-- Burayı ekledik!
)