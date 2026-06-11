# Guia de estudo do projeto SOS Mulher

Este arquivo explica a função das partes principais do site para ajudar o grupo a estudar, apresentar e fazer manutenção.

## Estrutura geral

- `index.html`: página principal do site. Reúne início, quem somos, diretoria, rede de apoio, parceiros, voluntariado, eventos, doações, contato e perguntas frequentes.
- `saude-bem-estar.html`: página interna com temas de saúde física, saúde mental, autocuidado, sinais de atenção e rede de apoio.
- `lei-maria-da-penha.html`: página interna sobre direitos, tipos de violência, medidas protetivas e contatos de emergência.
- `perguntas-frequentes.html`: página interna com as perguntas frequentes abertas em uma página própria.
- `obrigado.html`: página preparada para confirmação de envio do formulário quando o FormSubmit estiver com redirecionamento configurado.
- `src/styles.css`: arquivo principal de estilos. Controla cores, tamanhos, espaçamentos, responsividade, cards, carrosséis, formulário e rodapé.
- `src/script.js`: arquivo de interações. Controla menu mobile, rolagem suave, perguntas frequentes, carrosséis, carregamento de imagens e ano do rodapé.
- `src/hero-template-claro-digital.css`: template alternativo do hero, salvo apenas como referência. Ele não está conectado ao site.
- `src/img/`: pasta com imagens usadas pelo site.

## Como o HTML funciona

O HTML organiza o conteúdo em blocos chamados `section`. Cada seção tem uma classe para receber estilo do CSS e, em alguns casos, um `id` para ser acessada pelo menu.

Exemplo:

```html
<section class="secao fundo-azul-suave" id="rede-apoio">
```

- `section`: marca uma parte do site.
- `class="secao fundo-azul-suave"`: conecta essa parte ao CSS.
- `id="rede-apoio"`: permite que o menu vá direto para essa parte com `href="#rede-apoio"`.

## Cabeçalho e menu

O cabeçalho fica no início das páginas e contém:

- Logo da ONG.
- Nome SOS Mulher.
- Links de navegação.
- Botão de menu para celular.

No computador, o menu aparece aberto na horizontal. No celular, o JavaScript usa o botão `.botao-menu` para abrir e fechar a navegação.

## Botão de emergência

O botão `.botao-emergencia-flutuante` aparece fixo no canto inferior direito da tela. Ele usa `href="tel:153"`, então em celulares pode iniciar a ligação para a Guarda Civil Municipal.

No CSS, `position: fixed` mantém o botão parado na tela mesmo quando a página rola. A animação `pulso-emergencia` cria um destaque visual discreto para mostrar que é uma ação importante.

## Página principal

Na `index.html`, as principais seções são:

- `inicio`: apresentação principal do site, com chamada de acolhimento e botões de ação.
- `quem-somos`: explica a história, atuação, trajetória e diretoria.
- `rede-apoio`: reúne telefones e serviços importantes.
- `seja-apoio`: mostra parceiros e chamada para novas parcerias.
- seção de voluntariado: explica como participar.
- `eventos`: mostra ações e fotos em carrossel.
- `doacoes`: mostra formas de contribuir.
- `contato`: mostra canais de atendimento e formulário.
- `perguntas-frequentes`: dúvidas comuns sobre atendimento.

## CSS e cores

O arquivo `src/styles.css` começa com variáveis dentro de `:root`. Elas guardam cores, sombras e tamanhos usados no site inteiro.

Exemplo:

```css
--cor-principal: #f20573;
--fundo-azul-suave: #f4f8fb;
--fundo-verde-suave: #f4faf7;
```

Isso facilita a manutenção: se a cor principal mudar, basta alterar a variável.

As classes de fundo ajudam a intercalar as cores do site:

- `.fundo-branco`: fundo branco.
- `.fundo-suave`: fundo quase branco.
- `.fundo-rosa-suave`: rosa claro ligado à identidade da ONG.
- `.fundo-azul-suave`: azul claro para confiança e orientação.
- `.fundo-verde-suave`: verde claro para cuidado e bem-estar.

## JavaScript

O arquivo `src/script.js` não cria o conteúdo principal. Ele melhora a interação do site.

Principais funções:

- `configurarMenuMobile()`: abre e fecha o menu no celular.
- `configurarRolagemSuave()`: faz os links internos rolarem suavemente até a seção.
- `configurarPerguntasFrequentes()`: abre e fecha respostas das perguntas frequentes.
- `configurarCarrosseis()`: controla carrosséis de parceiros e eventos.
- `configurarFotosDaDiretoria()`: só exibe a foto da diretoria se o arquivo existir.
- `configurarFotosDosEventos()`: só exibe a foto do evento se o arquivo existir; se não existir, mantém "Imagem em breve".
- `configurarLogosDosParceiros()`: só exibe a logo do parceiro se o arquivo existir; se não existir, mantém a sigla.
- `atualizarAnoDoRodape()`: atualiza automaticamente o ano no rodapé.

Os ícones do site usam Bootstrap Icons. Eles aparecem direto no HTML por classes como `bi bi-telephone`, sem precisar de uma função no JavaScript para montar o ícone.

## Formulário de contato

O formulário usa FormSubmit:

```html
<form action="https://formsubmit.co/sosmulher.oficialsjc@gmail.com" method="POST">
```

Isso envia a mensagem para o e-mail da ONG sem precisar de servidor próprio.

Campos ocultos usados:

- `_subject`: define o assunto do e-mail.
- `_template`: organiza o e-mail em formato de tabela.
- `_captcha`: desativa o captcha padrão.
- `_honey`: campo escondido para ajudar contra spam.

A página `obrigado.html` já está pronta. Para usá-la depois de publicar o site, adicione no formulário o campo `_next` com o link completo:

```html
<input type="hidden" name="_next" value="https://seudominio.com/obrigado.html" />
```

## Imagens

As imagens principais ficam em `src/img/`.

Arquivos importantes:

- `logo.png`: logo pequena do cabeçalho e rodapé.
- `logo-principal.png`: imagem principal do hero.
- `Mulheres.png`: imagem usada na seção Quem somos.
- `foto-beth-montezano.png`: foto da presidente.
- `foto-ana-cristina.png`: foto da vice-presidenta.
- `eventos/`: fotos do carrossel de eventos.
- `parceiros/`: logos dos parceiros.
- `qrcode-pix/qrcode-pix.png`: QR Code usado na área de doações.
- `New folder/`: pasta mantida como referência de imagens salvas. Ela não está conectada diretamente ao site.

## Template


- `src/hero-template-claro-digital.css`, porque é um template salvo como referência.

## Pontos para conferir antes da apresentação

- Confirmar os dados bancários apenas se a ONG quiser publicá-los diretamente na página.
- Testar o primeiro envio do FormSubmit, porque ele pode pedir confirmação no e-mail da ONG.
- Conferir se todas as fotos e logos aparecem corretamente.
- Testar no celular: menu, carrossel, formulário e rodapé.
- Confirmar se o link da página `obrigado.html` será ativado depois da publicação.

