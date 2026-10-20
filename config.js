// Configuração opcional da conexão. Se este arquivo não existir, o site usa só STUN.

// Endereço que devolve credenciais TURN temporárias (recomendado).
// - Worker da Cloudflare deste repositório (veja turn-worker/README.md):
//     window.CALLZINHA_TURN_URL = 'https://janemba-turn.SEU-USUARIO.workers.dev';
// - ou API do Metered (metered.ca):
//     window.CALLZINHA_TURN_URL = 'https://SEU-APP.metered.live/api/v1/turn/credentials?apiKey=SUA_CHAVE';
window.CALLZINHA_TURN_URL = '';

// Servidores fixos extras (ex.: um coturn próprio).
// window.CALLZINHA_ICE_SERVERS = [
//   { urls: 'turn:meu-servidor.com:3478', username: 'usuario', credential: 'senha' },
// ];

// Servidor de sinalização próprio (opcional; sem isso usa 0.peerjs.com).
// window.CALLZINHA_PEER_OPTIONS = { host: 'meu-servidor.com', port: 443, path: '/', secure: true };
