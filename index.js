const { app, BrowserWindow, TouchBar, TouchBarScrubber } = require('electron');
const el = require('electron');

if (process.platform !== 'darwin') throw new Error('app only works on macOS');

const appleLogin = require('bindings')('main.node');

const signInWithApple = async (mainWindow) => {
  return await appleLogin.signInWithApple(mainWindow);
};


let mainWindow;
app.whenReady().then(async () => {
  mainWindow = new BrowserWindow({
    width: 1500,
    height: 75,
  });
  mainWindow.loadFile('./src/index.html');
  const nativeWindow = mainWindow.getNativeWindowHandle();
  try {
    // const data = await signInWithApple(nativeWindow);
    console.log('----', data);
    // {
    //   idToken: 'TOKEN',
    //   firstName: 'John',
    //   middleName: 'Chris',
    //   lastName: 'Doe',
    //   email: 'john.doe@example.com'
    // }
  } catch (err) {
    // { code: 1000, message: 'Error message' }
  }
});

// el.ipcMain.on('sign-in-with-apple', async () => {
//   const nativeWindow = mainWindow.getNativeWindowHandle();
//   try {
//     const data = await signInWithApple(nativeWindow);
//     // {
//     //   idToken: 'TOKEN',
//     //   firstName: 'John',
//     //   middleName: 'Chris',
//     //   lastName: 'Doe',
//     //   email: 'john.doe@example.com'
//     // }
//   } catch (err) {
//     // { code: 1000, message: 'Error message' }
//   }
// });
