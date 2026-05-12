const { app, BrowserWindow, ipcMain } =
require("electron");

let editorWindow;
let outputWindow;

function createWindows() {

    // EDITOR
    editorWindow = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    editorWindow.loadFile("index.html");

    // OUTPUT
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

// Kod gönderme olayı
ipcMain.on("run-code", (event, code) => {

    // burada ileride lexer/parser çalışacak
    console.log("Kod geldi:", code);

    outputWindow.webContents.send(
        "output",
        code
    );
});

app.whenReady().then(createWindows);