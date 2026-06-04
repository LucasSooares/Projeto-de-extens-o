/*
  Arquivo JavaScript do site SOS Mulher.

  JavaScript Ã© a linguagem que faz a pÃ¡gina reagir depois que ela abre:
  menu de celular, carrossel, perguntas frequentes, Ã­cones e imagens.

  Mini glossÃ¡rio para estudar:
  - document: representa a pÃ¡gina HTML inteira.
  - querySelector: procura o primeiro elemento que combina com um seletor.
    Exemplo: ".botao-menu" procura class="botao-menu".
  - querySelectorAll: procura todos os elementos que combinam com um seletor.
  - addEventListener: "escuta" uma aÃ§Ã£o, como click, load, error ou resize.
  - classList: permite adicionar, remover ou alternar classes de um elemento.
  - Bootstrap Icons: biblioteca de ícones usada com classes como bi bi-telephone e bi bi-whatsapp.
  - data-*: atributos personalizados do HTML. Exemplo: data-carrossel.
  - dataset: forma de acessar atributos data-* pelo JavaScript.
  - hidden: atributo HTML que esconde um elemento.
  - return: encerra a funÃ§Ã£o naquele ponto.
*/

// Os ícones do Bootstrap Icons ficam direto no HTML.
// Exemplo: <span class="icone bi bi-whatsapp" aria-hidden="true"></span>
// Assim, o JavaScript só troca classes quando precisa mudar o desenho, como no botão do menu.
// Controla a navegaÃ§Ã£o principal quando ela vira menu de celular em telas pequenas.
function configurarMenuMobile() {
  // Procura no HTML o botÃ£o que abre o menu e a navegaÃ§Ã£o principal.
  const botao = document.querySelector(".botao-menu");
  const menu = document.querySelector(".navegacao-principal");

  // Se algum elemento nÃ£o existir na pÃ¡gina, a funÃ§Ã£o para para evitar erro.
  if (!botao || !menu) return;

  // Quando o usuÃ¡rio clicar no botÃ£o, abre ou fecha o menu.
  botao.addEventListener("click", () => {
    // toggle alterna a classe: se nÃ£o tem, adiciona; se jÃ¡ tem, remove.
    const estaAberto = menu.classList.toggle("esta-aberto");
    document.body.classList.toggle("menu-aberto", estaAberto);
    // aria-expanded ajuda acessibilidade: indica se o menu estÃ¡ aberto.
    botao.setAttribute("aria-expanded", String(estaAberto));

    const icone = botao.querySelector(".icone");
    if (icone) {
      // Troca o desenho do botão entre lista/menu e fechar.
      icone.classList.toggle("bi-list", !estaAberto);
      icone.classList.toggle("bi-x-lg", estaAberto);
    }
  });

  // Quando clicar em qualquer link do menu, fecha o menu no celular.
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("esta-aberto");
      document.body.classList.remove("menu-aberto");
      botao.setAttribute("aria-expanded", "false");

      const icone = botao.querySelector(".icone");
      if (icone) {
        icone.classList.add("bi-list");
        icone.classList.remove("bi-x-lg");
      }
    });
  });
}

// Faz os links internos, como #contato e #doacoes, rolarem suavemente atÃ© a seÃ§Ã£o.
function configurarRolagemSuave() {
  // a[href^="#"] significa: links cujo href comeÃ§a com #, como href="#contato".
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (evento) => {
      const seletor = link.getAttribute("href");
      if (!seletor || seletor === "#") return;

      const destino = document.querySelector(seletor);
      if (!destino) return;

      // Impede o comportamento padrÃ£o do navegador, que pula direto para a seÃ§Ã£o.
      evento.preventDefault();
      // Rola a tela suavemente atÃ© a seÃ§Ã£o encontrada.
      destino.scrollIntoView({ behavior: "smooth", block: "start" });
      // Atualiza o endereÃ§o com #contato, #doacoes etc. sem recarregar a pÃ¡gina.
      history.replaceState(null, "", seletor);
    });
  });
}

// Abre e fecha a seÃ§Ã£o de Perguntas Frequentes e garante que sÃ³ uma resposta fique aberta.
function configurarPerguntasFrequentes() {
  // data-secao-perguntas marca, no HTML, qual Ã¡rea serÃ¡ controlada por esta funÃ§Ã£o.
  document.querySelectorAll("[data-secao-perguntas]").forEach((secao) => {
    const botaoDaSecao = secao.querySelector("[data-botao-perguntas]");
    const listaDePerguntas = secao.querySelector("[data-lista-perguntas]");
    const abreNoInicio = secao.hasAttribute("data-aberto-inicial");

    if (!botaoDaSecao || !listaDePerguntas) return;

    // FunÃ§Ã£o auxiliar: recebe true para abrir e false para fechar.
    const definirAberto = (aberto) => {
      botaoDaSecao.setAttribute("aria-expanded", String(aberto));
      listaDePerguntas.hidden = !aberto;
    };

    definirAberto(abreNoInicio);

    botaoDaSecao.addEventListener("click", () => {
      definirAberto(botaoDaSecao.getAttribute("aria-expanded") !== "true");
    });

    listaDePerguntas.querySelectorAll(".item-pergunta").forEach((item) => {
      const botao = item.querySelector("button");
      const resposta = item.querySelector("div");
      if (!botao || !resposta) return;

      botao.addEventListener("click", () => {
        const deveAbrir = botao.getAttribute("aria-expanded") !== "true";

        // Antes de abrir uma pergunta, fecha todas as outras.
        listaDePerguntas.querySelectorAll(".item-pergunta").forEach((outroItem) => {
          const outroBotao = outroItem.querySelector("button");
          const outraResposta = outroItem.querySelector("div");

          if (outroBotao && outraResposta && outroBotao !== botao) {
            outroBotao.setAttribute("aria-expanded", "false");
            outraResposta.hidden = true;
          }
        });

        botao.setAttribute("aria-expanded", String(deveAbrir));
        resposta.hidden = !deveAbrir;
      });
    });
  });
}

// Define quantos cartÃµes aparecem por vez no carrossel conforme o tamanho da tela.
function pegarQuantidadeVisivel(carrossel) {
  // window.innerWidth guarda a largura atual da tela em pixels.
  const larguraDaTela = window.innerWidth;

  // dataset.visivelCelular lÃª data-visivel-celular do HTML.
  if (larguraDaTela < 640) return Number(carrossel.dataset.visivelCelular || 1);
  if (larguraDaTela < 1024) return Number(carrossel.dataset.visivelTablet || 2);

  return Number(carrossel.dataset.visivelComputador || 3);
}

// Controla os carrossÃ©is de parceiros e galeria: setas, bolinhas e rotaÃ§Ã£o automÃ¡tica.
// Faz a faixa de parceiros andar sem pausas, duplicando os slides para criar um ciclo infinito.
function configurarRolagemContinua(carrossel, trilho, slides) {
  // Evita duplicar os slides mais de uma vez.
  if (trilho.dataset.slidesDuplicados === "true") return;

  slides.forEach((slide) => {
    // cloneNode(true) copia o slide inteiro, incluindo tudo que existe dentro dele.
    const copia = slide.cloneNode(true);
    copia.setAttribute("aria-hidden", "true");
    trilho.appendChild(copia);
  });

  trilho.dataset.slidesDuplicados = "true";
  trilho.classList.add("rolagem-continua");
  // setProperty altera uma variÃ¡vel CSS pelo JavaScript.
  trilho.style.setProperty("--duracao-rolagem", `${Number(carrossel.dataset.duracaoRolagem || 18)}s`);
}

function configurarCarrosseis() {
  // Cada bloco com data-carrossel no HTML vira um carrossel.
  document.querySelectorAll("[data-carrossel]").forEach((carrossel) => {
    const trilho = carrossel.querySelector(".trilho-carrossel");
    const slides = Array.from(carrossel.querySelectorAll(".slide-carrossel"));
    const botaoAnterior = carrossel.querySelector(".seta-carrossel.anterior");
    const botaoProximo = carrossel.querySelector(".seta-carrossel.proximo");
    const bolinhas = carrossel.querySelector(".pontos-carrossel");

    if (!trilho || slides.length === 0) return;

    // O carrossel de parceiros usa rolagem contÃ­nua, sem setas.
    if (carrossel.dataset.rolagemContinua === "true") {
      configurarRolagemContinua(carrossel, trilho, slides);
      return;
    }

    // let Ã© usado quando o valor muda durante a execuÃ§Ã£o.
    let indiceAtual = 0;
    let temporizador = null;
    let quantidadeVisivel = pegarQuantidadeVisivel(carrossel);

    // Math.max garante que o resultado nunca serÃ¡ menor que zero.
    const pegarIndiceMaximo = () => Math.max(0, slides.length - quantidadeVisivel);

    const renderizar = () => {
      quantidadeVisivel = pegarQuantidadeVisivel(carrossel);
      const larguraDoSlide = 100 / quantidadeVisivel;

      // flexBasis define quanto espaÃ§o cada slide ocupa dentro do trilho.
      slides.forEach((slide) => {
        slide.style.flexBasis = `${larguraDoSlide}%`;
      });

      if (indiceAtual > pegarIndiceMaximo()) indiceAtual = 0;

      trilho.style.transform = `translateX(-${indiceAtual * larguraDoSlide}%)`;
      atualizarBolinhas();
    };

    // direcao = 1 avanÃ§a. direcao = -1 volta.
    const irPara = (direcao) => {
      const indiceMaximo = pegarIndiceMaximo();

      if (indiceMaximo === 0) {
        indiceAtual = 0;
      } else {
        indiceAtual += direcao;
        if (indiceAtual > indiceMaximo) indiceAtual = 0;
        if (indiceAtual < 0) indiceAtual = indiceMaximo;
      }

      renderizar();
    };

    const pararAutomatico = () => {
      // clearInterval para uma repetiÃ§Ã£o automÃ¡tica iniciada por setInterval.
      if (temporizador) window.clearInterval(temporizador);
      temporizador = null;
    };

    const iniciarAutomatico = () => {
      if (carrossel.dataset.automatico !== "true") return;

      pararAutomatico();
      // setInterval repete uma aÃ§Ã£o de tempos em tempos.
      temporizador = window.setInterval(
        () => irPara(1),
        Number(carrossel.dataset.velocidade || 3000)
      );
    };

    const reiniciarAutomatico = () => {
      pararAutomatico();
      iniciarAutomatico();
    };

    function atualizarBolinhas() {
      if (!bolinhas) return;

      // Limpa as bolinhas antigas para recriar de acordo com a quantidade atual.
      bolinhas.innerHTML = "";

      for (let i = 0; i <= pegarIndiceMaximo(); i += 1) {
        // createElement cria um botÃ£o novo pelo JavaScript.
        const bolinha = document.createElement("button");
        bolinha.type = "button";
        bolinha.setAttribute("aria-label", `Ir para item ${i + 1}`);
        bolinha.className = i === indiceAtual ? "esta-ativo" : "";
        bolinha.addEventListener("click", () => {
          indiceAtual = i;
          renderizar();
          reiniciarAutomatico();
        });

        bolinhas.appendChild(bolinha);
      }
    }

    // O ?. significa: sÃ³ adiciona o evento se o botÃ£o existir.
    botaoAnterior?.addEventListener("click", () => {
      irPara(-1);
      reiniciarAutomatico();
    });

    botaoProximo?.addEventListener("click", () => {
      irPara(1);
      reiniciarAutomatico();
    });

    carrossel.addEventListener("mouseenter", pararAutomatico);
    carrossel.addEventListener("mouseleave", iniciarAutomatico);
    // Quando a tela muda de tamanho, o carrossel recalcula os slides.
    window.addEventListener("resize", renderizar);

    renderizar();
    iniciarAutomatico();
  });
}

// Exibe a foto de cada integrante quando o arquivo correspondente estiver disponÃ­vel.
function configurarFotosDaDiretoria() {
  document.querySelectorAll("[data-foto-diretoria]").forEach((foto) => {
    const caminhoDaFoto = foto.dataset.src;
    if (!caminhoDaFoto) return;

    // Image cria uma imagem de teste na memÃ³ria antes de mostrar no site.
    const testeDaImagem = new Image();

    // load acontece quando a imagem existe e carregou corretamente.
    testeDaImagem.addEventListener("load", () => {
      foto.src = caminhoDaFoto;
      foto.hidden = false;
    });

    // error acontece quando o arquivo nÃ£o existe ou falhou ao carregar.
    testeDaImagem.addEventListener("error", () => {
      foto.hidden = true;
    });

    testeDaImagem.src = caminhoDaFoto;
  });
}

// Carrega fotos dos eventos sÃ³ quando o arquivo existe; se nÃ£o existir, mantÃ©m "Imagem em breve".
function configurarFotosDosEventos() {
  document.querySelectorAll("[data-foto-evento]").forEach((foto) => {
    const caminhoDaFoto = foto.dataset.src;
    if (!caminhoDaFoto) return;

    // Primeiro testa se a imagem existe. SÃ³ depois coloca a imagem na tela.
    const testeDaImagem = new Image();

    testeDaImagem.addEventListener("load", () => {
      foto.src = caminhoDaFoto;
      foto.hidden = false;
    });

    testeDaImagem.addEventListener("error", () => {
      foto.hidden = true;
    });

    testeDaImagem.src = caminhoDaFoto;
  });
}

// Carrega logos de parceiros sÃ³ quando o arquivo existe; se nÃ£o existir, mantÃ©m a sigla.
function configurarLogosDosParceiros() {
  document.querySelectorAll("[data-logo-parceiro]").forEach((logo) => {
    const caminhoDaLogo = logo.dataset.src;
    if (!caminhoDaLogo) return;

    const testeDaImagem = new Image();

    testeDaImagem.addEventListener("load", () => {
      logo.src = caminhoDaLogo;
      logo.hidden = false;
    });

    testeDaImagem.src = caminhoDaLogo;
  });
}

// Atualiza automaticamente o ano no rodapÃ©.
function atualizarAnoDoRodape() {
  document.querySelectorAll("[data-year]").forEach((elemento) => {
    elemento.textContent = String(new Date().getFullYear());
  });
}

// Ponto de entrada: tudo abaixo roda depois que o HTML terminou de carregar.
document.addEventListener("DOMContentLoaded", () => {
  // DOMContentLoaded significa que o navegador jÃ¡ leu o HTML.
  // Depois disso, o JavaScript consegue encontrar os elementos da pÃ¡gina.
  configurarMenuMobile();
  configurarRolagemSuave();
  configurarPerguntasFrequentes();
  configurarCarrosseis();
  configurarFotosDaDiretoria();
  configurarFotosDosEventos();
  configurarLogosDosParceiros();
  atualizarAnoDoRodape();
});



