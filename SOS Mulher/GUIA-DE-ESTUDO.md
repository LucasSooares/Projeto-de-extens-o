# Guia de estudo do projeto SOS Mulher

Este arquivo explica a funÃ§Ã£o das partes principais do site para ajudar o grupo a estudar, apresentar e fazer manutenÃ§Ã£o.

## Estrutura geral

- `index.html`: pÃ¡gina principal do site. ReÃºne inÃ­cio, quem somos, diretoria, rede de apoio, parceiros, voluntariado, eventos, doaÃ§Ãµes, contato e perguntas frequentes.
- `saude-bem-estar.html`: pÃ¡gina interna com temas de saÃºde fÃ­sica, saÃºde mental, autocuidado, sinais de atenÃ§Ã£o e rede de apoio.
- `lei-maria-da-penha.html`: pÃ¡gina interna sobre direitos, tipos de violÃªncia, medidas protetivas e contatos de emergÃªncia.
- `perguntas-frequentes.html`: pÃ¡gina interna com as perguntas frequentes abertas em uma pÃ¡gina prÃ³pria.
- `obrigado.html`: pÃ¡gina preparada para confirmaÃ§Ã£o de envio do formulÃ¡rio quando o FormSubmit estiver com redirecionamento configurado.
- `src/styles.css`: arquivo principal de estilos. Controla cores, tamanhos, espaÃ§amentos, responsividade, cards, carrossÃ©is, formulÃ¡rio e rodapÃ©.
- `src/script.js`: arquivo de interaÃ§Ãµes. Controla menu mobile, rolagem suave, perguntas frequentes, carrossÃ©is, carregamento de imagens e ano do rodapÃ©.
- `src/hero-template-claro-digital.css`: template alternativo do hero, salvo apenas como referÃªncia. Ele nÃ£o estÃ¡ conectado ao site.
- `src/img/`: pasta com imagens usadas pelo site.

## Como o HTML funciona

O HTML organiza o conteÃºdo em blocos chamados `section`. Cada seÃ§Ã£o tem uma classe para receber estilo do CSS e, em alguns casos, um `id` para ser acessada pelo menu.

Exemplo:

```html
<section class="secao fundo-azul-suave" id="rede-apoio">
```

- `section`: marca uma parte do site.
- `class="secao fundo-azul-suave"`: conecta essa parte ao CSS.
- `id="rede-apoio"`: permite que o menu vÃ¡ direto para essa parte com `href="#rede-apoio"`.

## CabeÃ§alho e menu

O cabeÃ§alho fica no inÃ­cio das pÃ¡ginas e contÃ©m:

- Logo da ONG.
- Nome SOS Mulher.
- Links de navegaÃ§Ã£o.
- BotÃ£o de menu para celular.

No computador, o menu aparece aberto na horizontal. No celular, o JavaScript usa o botÃ£o `.botao-menu` para abrir e fechar a navegaÃ§Ã£o.

## Botão de emergência

O botão `.botao-emergencia-flutuante` aparece fixo no canto inferior direito da tela. Ele usa `href="tel:153"`, então em celulares pode iniciar a ligação para a Guarda Civil Municipal.

No CSS, `position: fixed` mantém o botão parado na tela mesmo quando a página rola. A animação `pulso-emergencia` cria um destaque visual discreto para mostrar que é uma ação importante.

## PÃ¡gina principal

Na `index.html`, as principais seÃ§Ãµes sÃ£o:

- `inicio`: apresentaÃ§Ã£o principal do site, com chamada de acolhimento e botÃµes de aÃ§Ã£o.
- `quem-somos`: explica a histÃ³ria, atuaÃ§Ã£o, trajetÃ³ria e diretoria.
- `rede-apoio`: reÃºne telefones e serviÃ§os importantes.
- `seja-apoio`: mostra parceiros e chamada para novas parcerias.
- seÃ§Ã£o de voluntariado: explica como participar.
- `eventos`: mostra aÃ§Ãµes e fotos em carrossel.
- `doacoes`: mostra formas de contribuir.
- `contato`: mostra canais de atendimento e formulÃ¡rio.
- `perguntas-frequentes`: dÃºvidas comuns sobre atendimento.

## CSS e cores

O arquivo `src/styles.css` comeÃ§a com variÃ¡veis dentro de `:root`. Elas guardam cores, sombras e tamanhos usados no site inteiro.

Exemplo:

```css
--cor-principal: #f20573;
--fundo-azul-suave: #f4f8fb;
--fundo-verde-suave: #f4faf7;
```

Isso facilita a manutenÃ§Ã£o: se a cor principal mudar, basta alterar a variÃ¡vel.

As classes de fundo ajudam a intercalar as cores do site:

- `.fundo-branco`: fundo branco.
- `.fundo-suave`: fundo quase branco.
- `.fundo-rosa-suave`: rosa claro ligado Ã  identidade da ONG.
- `.fundo-azul-suave`: azul claro para confianÃ§a e orientaÃ§Ã£o.
- `.fundo-verde-suave`: verde claro para cuidado e bem-estar.

## JavaScript

O arquivo `src/script.js` nÃ£o cria o conteÃºdo principal. Ele melhora a interaÃ§Ã£o do site.

Principais funÃ§Ãµes:

- `configurarMenuMobile()`: abre e fecha o menu no celular.
- `configurarRolagemSuave()`: faz os links internos rolarem suavemente atÃ© a seÃ§Ã£o.
- `configurarPerguntasFrequentes()`: abre e fecha respostas das perguntas frequentes.
- `configurarCarrosseis()`: controla carrossÃ©is de parceiros e eventos.
- `configurarFotosDaDiretoria()`: sÃ³ exibe a foto da diretoria se o arquivo existir.
- `configurarFotosDosEventos()`: sÃ³ exibe a foto do evento se o arquivo existir; se nÃ£o existir, mantÃ©m â€œImagem em breveâ€.
- `configurarLogosDosParceiros()`: sÃ³ exibe a logo do parceiro se o arquivo existir; se nÃ£o existir, mantÃ©m a sigla.
- `atualizarAnoDoRodape()`: atualiza automaticamente o ano no rodapÃ©.

Os ícones do site usam Bootstrap Icons. Eles aparecem direto no HTML por classes como `bi bi-telephone`, sem precisar de uma função no JavaScript para montar o ícone.

## FormulÃ¡rio de contato

O formulÃ¡rio usa FormSubmit:

```html
<form action="https://formsubmit.co/sosmulher.oficialsjc@gmail.com" method="POST">
```

Isso envia a mensagem para o e-mail da ONG sem precisar de servidor prÃ³prio.

Campos ocultos usados:

- `_subject`: define o assunto do e-mail.
- `_template`: organiza o e-mail em formato de tabela.
- `_captcha`: desativa o captcha padrÃ£o.
- `_honey`: campo escondido para ajudar contra spam.

A pÃ¡gina `obrigado.html` jÃ¡ estÃ¡ pronta. Para usÃ¡-la depois de publicar o site, adicione no formulÃ¡rio o campo `_next` com o link completo:

```html
<input type="hidden" name="_next" value="https://seudominio.com/obrigado.html" />
```

## Imagens

As imagens principais ficam em `src/img/`.

Arquivos importantes:

- `logo.png`: logo pequena do cabeÃ§alho e rodapÃ©.
- `logo-principal.png`: imagem principal do hero.
- `Mulheres.png`: imagem usada na seÃ§Ã£o Quem Somos.
- `foto-beth-montezano.png`: foto da presidente.
- `foto-ana-cristina.png`: foto da vice-presidenta.
- `eventos/`: fotos do carrossel de eventos.
- `parceiros/`: logos dos parceiros.
- `qrcode-pix/qrcode-pix.svg`: QR Code usado na Ã¡rea de doaÃ§Ãµes.
- `New folder/`: pasta mantida como referÃªncia de imagens salvas. Ela nÃ£o estÃ¡ conectada diretamente ao site.

## Template


- `src/hero-template-claro-digital.css`, porque Ã© um template salvo como referÃªncia.

## Pontos para conferir antes da apresentaÃ§Ã£o

- Confirmar o nome do banco em DoaÃ§Ãµes, pois ainda aparece como dado pendente se nÃ£o for preenchido.
- Testar o primeiro envio do FormSubmit, porque ele pode pedir confirmaÃ§Ã£o no e-mail da ONG.
- Conferir se todas as fotos e logos aparecem corretamente.
- Testar no celular: menu, carrossel, formulÃ¡rio e rodapÃ©.
- Confirmar se o link da pÃ¡gina `obrigado.html` serÃ¡ ativado depois da publicaÃ§Ã£o.

