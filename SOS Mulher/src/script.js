/*
  Arquivo JavaScript do site SOS Mulher.

  JavaScript é a linguagem que faz a página reagir depois que ela abre:
  menu de celular, carrossel, perguntas frequentes, ícones e imagens.

  Mini glossário para estudar:
  - document: representa a página HTML inteira.
  - querySelector: procura o primeiro elemento que combina com um seletor.
    Exemplo: ".botao-menu" procura class="botao-menu".
  - querySelectorAll: procura todos os elementos que combinam com um seletor.
  - addEventListener: "escuta" uma ação, como click, load, error ou resize.
  - classList: permite adicionar, remover ou alternar classes de um elemento.
  - Bootstrap Icons: biblioteca de ícones usada com classes como bi bi-telephone e bi bi-whatsapp.
  - data-*: atributos personalizados do HTML. Exemplo: data-carrossel.
  - dataset: forma de acessar atributos data-* pelo JavaScript.
  - hidden: atributo HTML que esconde um elemento.
  - return: encerra a função naquele ponto.
*/

// Os ícones do Bootstrap Icons ficam direto no HTML.
// Exemplo: <span class="icone bi bi-whatsapp" aria-hidden="true"></span>
// Assim, o JavaScript só troca classes quando precisa mudar o desenho, como no botão do menu.
// Controla a navegação principal quando ela vira menu de celular em telas pequenas.
function configurarMenuMobile() {
  // Procura no HTML o botão que abre o menu e a navegação principal.
  const botao = document.querySelector(".botao-menu");
  const menu = document.querySelector(".navegacao-principal");

  // Se algum elemento não existir na página, a função para para evitar erro.
  if (!botao || !menu) return;

  // Quando o usuário clicar no botão, abre ou fecha o menu.
  botao.addEventListener("click", () => {
    // toggle alterna a classe: se não tem, adiciona; se já tem, remove.
    const estaAberto = menu.classList.toggle("esta-aberto");
    document.body.classList.toggle("menu-aberto", estaAberto);
    // aria-expanded ajuda acessibilidade: indica se o menu está aberto.
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

// Faz os links internos, como #contato e #doacoes, rolarem suavemente até a seção.
function configurarRolagemSuave() {
  // a[href^="#"] significa: links cujo href começa com #, como href="#contato".
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (evento) => {
      const seletor = link.getAttribute("href");
      if (!seletor || seletor === "#") return;

      const destino = document.querySelector(seletor);
      if (!destino) return;

      // Impede o comportamento padrão do navegador, que pula direto para a seção.
      evento.preventDefault();
      // Rola a tela suavemente até a seção encontrada.
      destino.scrollIntoView({ behavior: "smooth", block: "start" });
      // Atualiza o endereço com #contato, #doacoes etc. sem recarregar a página.
      history.replaceState(null, "", seletor);
    });
  });
}

// Abre e fecha a seção de perguntas frequentes e garante que só uma resposta fique aberta.
function configurarPerguntasFrequentes() {
  // data-secao-perguntas marca, no HTML, qual área será controlada por esta função.
  document.querySelectorAll("[data-secao-perguntas]").forEach((secao) => {
    const botaoDaSecao = secao.querySelector("[data-botao-perguntas]");
    const listaDePerguntas = secao.querySelector("[data-lista-perguntas]");
    const abreNoInicio = secao.hasAttribute("data-aberto-inicial");

    if (!botaoDaSecao || !listaDePerguntas) return;

    // Função auxiliar: recebe true para abrir e false para fechar.
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

// Define quantos cartões aparecem por vez no carrossel conforme o tamanho da tela.
function pegarQuantidadeVisivel(carrossel) {
  // window.innerWidth guarda a largura atual da tela em pixels.
  const larguraDaTela = window.innerWidth;

  // dataset.visivelCelular lê data-visivel-celular do HTML.
  if (larguraDaTela < 640) return Number(carrossel.dataset.visivelCelular || 1);
  if (larguraDaTela < 1024) return Number(carrossel.dataset.visivelTablet || 2);

  return Number(carrossel.dataset.visivelComputador || 3);
}

// Controla os carrosséis de parceiros e galeria: setas, bolinhas e rotação automática.
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
  // setProperty altera uma variável CSS pelo JavaScript.
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

    // O carrossel de parceiros usa rolagem contínua, sem setas.
    if (carrossel.dataset.rolagemContinua === "true") {
      configurarRolagemContinua(carrossel, trilho, slides);
      return;
    }

    // let é usado quando o valor muda durante a execução.
    let indiceAtual = 0;
    let temporizador = null;
    let quantidadeVisivel = pegarQuantidadeVisivel(carrossel);

    // Math.max garante que o resultado nunca será menor que zero.
    const pegarIndiceMaximo = () => Math.max(0, slides.length - quantidadeVisivel);

    const renderizar = () => {
      quantidadeVisivel = pegarQuantidadeVisivel(carrossel);
      const larguraDoSlide = 100 / quantidadeVisivel;

      // flexBasis define quanto espaço cada slide ocupa dentro do trilho.
      slides.forEach((slide) => {
        slide.style.flexBasis = `${larguraDoSlide}%`;
      });

      if (indiceAtual > pegarIndiceMaximo()) indiceAtual = 0;

      trilho.style.transform = `translateX(-${indiceAtual * larguraDoSlide}%)`;
      atualizarBolinhas();
    };

    // direcao = 1 avança. direcao = -1 volta.
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
      // clearInterval para uma repetição automática iniciada por setInterval.
      if (temporizador) window.clearInterval(temporizador);
      temporizador = null;
    };

    const iniciarAutomatico = () => {
      if (carrossel.dataset.automatico !== "true") return;

      pararAutomatico();
      // setInterval repete uma ação de tempos em tempos.
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
        // createElement cria um botão novo pelo JavaScript.
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

    // O ?. significa: só adiciona o evento se o botão existir.
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

// Exibe a foto de cada integrante quando o arquivo correspondente estiver disponível.
function configurarFotosDaDiretoria() {
  document.querySelectorAll("[data-foto-diretoria]").forEach((foto) => {
    const caminhoDaFoto = foto.dataset.src;
    if (!caminhoDaFoto) return;

    // Image cria uma imagem de teste na memória antes de mostrar no site.
    const testeDaImagem = new Image();

    // load acontece quando a imagem existe e carregou corretamente.
    testeDaImagem.addEventListener("load", () => {
      foto.src = caminhoDaFoto;
      foto.hidden = false;
    });

    // error acontece quando o arquivo não existe ou falhou ao carregar.
    testeDaImagem.addEventListener("error", () => {
      foto.hidden = true;
    });

    testeDaImagem.src = caminhoDaFoto;
  });
}

// Carrega fotos dos eventos só quando o arquivo existe; se não existir, mantém "Imagem em breve".
function configurarFotosDosEventos() {
  document.querySelectorAll("[data-foto-evento]").forEach((foto) => {
    const caminhoDaFoto = foto.dataset.src;
    if (!caminhoDaFoto) return;

    // Primeiro testa se a imagem existe. Só depois coloca a imagem na tela.
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

// Carrega logos de parceiros só quando o arquivo existe; se não existir, mantém a sigla.
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

// Atualiza automaticamente o ano no rodapé.
function atualizarAnoDoRodape() {
  document.querySelectorAll("[data-year]").forEach((elemento) => {
    elemento.textContent = String(new Date().getFullYear());
  });
}

// Ponto de entrada: tudo abaixo roda depois que o HTML terminou de carregar.
document.addEventListener("DOMContentLoaded", () => {
  // DOMContentLoaded significa que o navegador já leu o HTML.
  // Depois disso, o JavaScript consegue encontrar os elementos da página.
  configurarMenuMobile();
  configurarRolagemSuave();
  configurarPerguntasFrequentes();
  configurarCarrosseis();
  configurarFotosDaDiretoria();
  configurarFotosDosEventos();
  configurarLogosDosParceiros();
  atualizarAnoDoRodape();
});



