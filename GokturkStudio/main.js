const {
    app,
    BrowserWindow,
    ipcMain
} = require("electron");

const Lexer =
require("./lexer");

const Parser =
require("./parser");

const Interpreter =
require("./interpreter");

let editorWindow;
let outputWindow;

function createWindows() {

    // EDITOR WINDOW
    editorWindow = new BrowserWindow({

        width: 900,
        height: 700,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    editorWindow.loadFile("index.html");

    // OUTPUT WINDOW
    outputWindow = new BrowserWindow({

        width: 500,
        height: 400,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    outputWindow.loadFile("output.html");
}

ipcMain.on("run-code", (event, code) => {

    try {

        // LEXER
        const lexer =
            new Lexer(code);

        const tokens =
            lexer.tokenize();

        // PARSER
        const parser =
            new Parser(tokens);

        const ast =
            parser.parse();

        // INTERPRETER
        const interpreter =
            new Interpreter();

        interpreter.run(ast);

        // TEST OUTPUT
        outputWindow.webContents.send(
            "output",
            "Kod çalıştı"
        );

    }
    catch (err) {

        outputWindow.webContents.send(
            "error",
            err.message
        );
    }
});

app.whenReady().then(createWindows);