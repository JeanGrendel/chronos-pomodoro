self.onmessage = function(event) {
  console.log('WORKER Recebeu: ', event.data);

  switch (event.data) {
    case 'FAVOR': {
      self.postMessage('Sim, posso fazer um favor.');
      break
    }
    case 'FALA_OI': {
      self.postMessage('OK: OI!');
    }
    case 'FECHAR': {
      self.postMessage('Ta bom, irei fechar.');
      self.close();
      break;
    }
    default:
      self.postMessage('Não entendi.');
  }
};