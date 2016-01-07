'use strict';
// const electron = require('electron');
// const app = electron.app;  // Module to control application life.
// const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

var app = require('app')
var BrowserWindow = require('browser-window')
var path = require('path')
var ipc = require('ipc')
var dialog = require('dialog')
var shell = require('shell')
var powerSaveBlocker = require('electron').powerSaveBlocker

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

var frame = process.platform === 'win32'

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
      width: 875,
      height: 500,
      frame: true,
      show: true,
      transparent: false,
      resizable: false

  });



  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  ipc.on('close', function () {
      app.quit()
  })

  ipc.on('open-file-dialog', function () {
      var files = dialog.showOpenDialog({ properties: [ 'openFile', 'multiSelections' ]})
      if (files) win.send('add-to-playlist', files)
  })

  ipc.on('open-url-in-external', function (event, url) {
      shell.openExternal(url)
  })

  ipc.on('focus', function () {
      win.focus()
  })

  ipc.on('minimize', function () {
      win.minimize()
  })

  ipc.on('maximize', function () {
      win.maximize()
  })

  ipc.on('resize', function (e, message) {
      if (win.isMaximized()) return
      var wid = win.getSize()[0]
      var hei = (wid / message.ratio) | 0
      win.setSize(wid, hei)
  })

  ipc.on('enter-full-screen', function () {
      win.setFullScreen(true)
  })

  ipc.on('exit-full-screen', function () {
      win.setFullScreen(false)
      win.show()
  })

  ipc.on('ready', function () {
      ready = true
      if (link) win.send('add-to-playlist', [].concat(link))
      win.show()
  })

  ipc.on('prevent-sleep', function () {
      app.sleepId = powerSaveBlocker.start('prevent-display-sleep')
  })

  ipc.on('allow-sleep', function () {
      powerSaveBlocker.stop(app.sleepId)
  })
});
