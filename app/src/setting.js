const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('ipaddress').value = await ipcRenderer.invoke('get-value', 'IPADDRESS');
    document.getElementById('port').value = await ipcRenderer.invoke('get-value', 'PORT');
    document.getElementById('username').value = await ipcRenderer.invoke('get-value', 'USER');
    document.getElementById('password').value = await ipcRenderer.invoke('get-value', 'PASSWORD');
    document.getElementById('path').value = await ipcRenderer.invoke('get-value', 'FFMPEG');


    document.getElementById('submit').addEventListener('click', async function (event) {
        event.preventDefault(); 
        await  ipcRenderer.invoke('set-value', 'FFMPEG', document.getElementById('path').value);
        await  ipcRenderer.invoke('set-value', 'USER', document.getElementById('username').value);
        await  ipcRenderer.invoke('set-value', 'PASSWORD', document.getElementById('password').value);
        await  ipcRenderer.invoke('set-value', 'IPADDRESS', document.getElementById('ipaddress').value);
        await  ipcRenderer.invoke('set-value', 'PORT', parseInt(document.getElementById('port').value)); 
    });
});