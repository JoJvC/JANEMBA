# JANEMBA / CallZinha

Chamada em grupo por áudio, com tela compartilhada.

- **Site:** https://erosxv.github.io/JANEMBA/ (os arquivos da raiz: `index.html`, `sw.js`, `manifest.webmanifest`, `icons/`)
- **Windows e Linux:** app com [Electron](https://www.electronjs.org/) (`electron/main.js`)
- **Android e iOS:** app com [Capacitor](https://capacitorjs.com/) (pastas `android/` e `ios/`)

Os apps usam o mesmo `index.html` do site. O comando `npm run build:web` copia o site pra pasta `www/`, e é dela que os apps leem.

## Primeira vez

```bash
npm install
```

## Desktop

| Comando | O que faz |
| --- | --- |
| `npm start` | Abre o app pra testar |
| `npm run dist:win` | Gera o instalador do Windows em `dist/` |
| `npm run dist:linux` | Gera o app do Linux em `dist/` (o AppImage e o .deb só saem num Linux ou pelo GitHub Actions) |

## Celular

| Comando | O que faz |
| --- | --- |
| `npm run android` | Atualiza o projeto e abre no Android Studio (precisa do Android Studio instalado) |
| `npm run ios` | Atualiza o projeto e abre no Xcode (só dá num Mac) |

No celular não tem como compartilhar a tela; o botão some sozinho.

## Gerar tudo pelo GitHub

O arquivo `.github/workflows/build-apps.yml` gera o instalador do Windows, os arquivos do Linux e o APK do Android nos servidores do GitHub:

- **Na mão:** Actions → "Gerar apps" → Run workflow. Os arquivos aparecem em Artifacts.
- **Por versão:** mande uma tag (`git tag v1.2.0` e depois `git push --tags`). Os arquivos vão pra uma Release.

O iOS não está nesse fluxo: pra instalar num iPhone é preciso de um Mac com Xcode e de uma conta de desenvolvedor da Apple.
