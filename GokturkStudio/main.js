const {
    app,
    BrowserWindow,
    Menu,
    dialog
} = require("electron");

const path = require("path");

function createWindow() {

    const win = new BrowserWindow({

        width: 1400,
        height: 900,

        minWidth: 900,
        minHeight: 600,

        backgroundColor: "#1e1e1e",

        title: "Salih Language IDE",

        webPreferences: {

            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile("index.html");

    // GELİŞTİRİCİ ARAÇLARI
    win.webContents.openDevTools();

    // MENÜ

    const template = [

        {
            label: "Dosya",

            submenu: [

                {
                    label: "Yeni Dosya",

                    click() {

                        win.webContents.send(
                            "new-file"
                        );
                    }
                },

                {
                    label: "Kaydet",

                    click() {

                        win.webContents.send(
                            "save-file"
                        );
                    }
                },

                {
                    type: "separator"
                },

                {
                    label: "Çıkış",

                    click() {
                        app.quit();
                    }
                }
            ]
        },

        {
            label: "Çalıştır",

            submenu: [

                {
                    label: "Kodu Çalıştır",

                    accelerator: "F5",

                    click() {

                        win.webContents.send(
                            "run-code"
                        );
                    }
                }
            ]
        },

        {
            label: "Yardım",

            submenu: [

                {
                    label: "Hakkında",

                    click() {

                        dialog.showMessageBox(win, {

                            title: "Hakkında",

                            message:
                                "Salih Language IDE",

                            detail:
                                "Electron tabanlı özel programlama dili editörü."
                        });
                    }
                }
            ]
        }
    ];

    const menu =
    Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {

    createWindow();

    app.on("activate", () => {

        if (
            BrowserWindow.getAllWindows().length === 0
        ) {

            createWindow();
        }
    });
});

app.on("window-all-closed", () => {

    if (process.platform !== "darwin") {
        app.quit();
    }
});