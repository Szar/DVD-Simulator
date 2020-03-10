const {
	app,
	BrowserWindow
} = require('electron')
const path = require('path')

app.commandLine.appendSwitch("disable-gpu")
app.commandLine.appendSwitch('disable-gpu-compositing')
app.commandLine.appendSwitch('disable-accelerated-video-decode')
app.commandLine.appendSwitch('disable-accelerated-video-encode')

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			nodeIntegration: true
		}
	})
	mainWindow.loadFile('index.html')
}



app.on('ready', createWindow)
app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function() {
	if (BrowserWindow.getAllWindows().length === 0) createWindow()
})