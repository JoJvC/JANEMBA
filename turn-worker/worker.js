// Cloudflare Worker: gera credenciais TURN temporárias da Cloudflare (Realtime TURN)
// sem expor o token da API no site.
// Variáveis (wrangler secret put ...): TURN_KEY_ID, TURN_KEY_API_TOKEN
// Variável opcional (wrangler.toml): ALLOWED_ORIGINS, separada por vírgula.

const TTL_SECONDS = 86400;

function cors(origin, allowed) {
  const ok = allowed.includes(origin);
  return {
    'Access-Control-Allow-Origin': ok ? origin : allowed[0],
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Vary': 'Origin',
  };
}

export default {
  async fetch(request, env) {
    const allowed = (env.ALLOWED_ORIGINS || 'https://erosxv.github.io').split(',').map(s => s.trim());
    const origin = request.headers.get('Origin') || '';
    const headers = cors(origin, allowed);

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers });
    if (request.method !== 'GET') return new Response('Método não permitido', { status: 405, headers });
    if (!allowed.includes(origin)) return new Response('Origem não permitida', { status: 403, headers });

    const r = await fetch(
      `https://rtc.live.cloudflare.com/v1/turn/keys/${env.TURN_KEY_ID}/credentials/generate-ice-servers`,
      {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${env.TURN_KEY_API_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ ttl: TTL_SECONDS }),
      }
    );
    if (!r.ok) return new Response('Falha ao gerar credenciais', { status: 502, headers });

    return new Response(await r.text(), {
      status: 200,
      headers: Object.assign({ 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }, headers),
    });
  },
};
