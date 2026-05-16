const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {

    mainWindow = new BrowserWindow({

        width: 1600,
        height: 900,

        minWidth: 1200,
        minHeight: 700,

        title: "Göktürk Studio",

        webPreferences: {

            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile(
        path.join(__dirname, "UI", "index.html")
    );

    // 🔴 MENÜ KALDIR
    Menu.setApplicationMenu(null);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {
        app.quit();
    }
});