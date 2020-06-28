if('serviceWorker' in navigator){
	window.addEventListener('load',function(){
		navigator.serviceWorker.register('serviceWorkers.js')
		.then(reg=> console.log('Registro de SW exitoso',reg))
		.catch(err => console.warn('Error',err))
	})
}
let deferredInstallPrompt;
const installButton = document.getElementById('butInstall');
installButton.addEventListener('click', installPWA);

// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);

function saveBeforeInstallPromptEvent(evt) {
  // CODELAB: Add code to save event & show the install button.
  evt.preventDefault();
  deferredInstallPrompt = evt;
  installButton.removeAttribute('hidden');
}

function installPWA(evt) {
  deferredInstallPrompt.prompt();
  evt.srcElement.setAttribute('hidden', true);
}
window.onerror = function (message, url, lineNo){
    alert('Error: ' + message + '\n' + 'Line Number: ' + lineNo);
    //alert('Error!!');
    console.log('entre a error');
    return true;
}
//funcion para hacer vibrar el celular
function vibrar(){
	window.navigator.vibrate([10,10,10]);
}
