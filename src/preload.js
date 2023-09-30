const { ipcRenderer } = require('electron')


window.addEventListener('DOMContentLoaded', () => {
    console.log('doodoo');
    //Buttons
    const generateImageButton = document.getElementById('generate-image-btn');

    //input
    const userImageRequest = document.getElementById('image-request');

    //output
    const outputImage = document.getElementById('output-image');
    const outputDownloadLink = document.getElementById('download-link');

    generateImageButton.addEventListener('click', () => {
        const request = userImageRequest.value;
        ipcRenderer.send('generate-image', request);

        
    });

    ipcRenderer.on('update-output-src', (_, image_url) => {
        outputImage.src = image_url;
        outputDownloadLink.href = image_url;
    })


  })