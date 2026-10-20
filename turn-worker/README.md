# Servidor TURN (Cloudflare)

Sem TURN, a chamada só funciona quando os dois lados conseguem se conectar direto.
Quem está atrás de CGNAT, 4G/5G, NAT simétrico ou roteador com duas operadoras
(balanceamento de carga) fica preso em "conectando". O TURN repassa o áudio nesses casos.

Este Worker gera credenciais temporárias do TURN da Cloudflare (Realtime TURN),
sem deixar o token da API visível no site.

## Configurar (uma vez)

1. No painel da Cloudflare: **Realtime → TURN Server → Create**. Anote o
   **Turn Token ID** e o **API Token**.
2. Publique o Worker:
   ```sh
   cd turn-worker
   npx wrangler login
   npx wrangler secret put TURN_KEY_ID          # cole o Turn Token ID
   npx wrangler secret put TURN_KEY_API_TOKEN   # cole o API Token
   npx wrangler deploy
   ```
   O deploy mostra o endereço, algo como `https://janemba-turn.SEU-USUARIO.workers.dev`.
3. Em `config.js`, na raiz do site:
   ```js
   window.CALLZINHA_TURN_URL = 'https://janemba-turn.SEU-USUARIO.workers.dev';
   ```
4. Se o site tiver outro domínio, ajuste `ALLOWED_ORIGINS` em `wrangler.toml`.

## Conferir

No site, entre numa chamada e abra **Configurações → Painel de diagnóstico**.
Quando a conexão direta não for possível, o tipo de candidato aparece como `relay`.
