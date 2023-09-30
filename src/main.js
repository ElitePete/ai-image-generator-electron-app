const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const { OpenAI } = require('openai').default;

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('src/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
      
    }
  })
})

ipcMain.on('generate-image', async (e, request) => {
  //TODO add DALL E logic
  

    const openai = new OpenAI({
      apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
    })
        
    
    async function createImage(request) {
      try {
          const response = await openai.images.generate({
              prompt: request,
              n: 1,
              size: "1024x1024",
          });
  
          const image_url = response.data[0].url;
          console.log(image_url);
          e.sender.send('update-output-src', image_url);
      } catch (error) {
          console.error(error);
      }
      // image_url = response.data.data[0].url;
      // console.log(response)
      
    }
    createImage(request);
  })
    










app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})