const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('camera-opt').addEventListener('change', async function (evt) { 
        await ipcRenderer.invoke('camera-change', evt.target.value);
    }); 
});




