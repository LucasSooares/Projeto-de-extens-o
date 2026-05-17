// Mapa que liga os nomes usados no HTML em data-icone aos nomes técnicos da fonte Material Symbols.
// Exemplo: <span data-icone="telefone"></span> vira o ícone "call" na tela.
const nomesDosIconesMaterial = {
  "atividade": "monitor_heart",
  "alerta-circulo": "error",
  "alerta-triangulo": "warning",
  "seta-voltar": "arrow_back",
  "premio": "workspace_premium",
  "cerebro": "psychology",
  "maleta": "work",
  "predio": "business",
  "calendario": "calendar_month",
  "livro-aberto": "menu_book",
  "confirmacao-circulo": "check_circle",
  "seta-baixo": "expand_more",
  "seta-esquerda": "chevron_left",
  "seta-direita": "chevron_right",
  "relogio": "schedule",
  "cartao-credito": "credit_card",
  "dinheiro": "attach_money",
  "formatura": "school",
  "aperto-maos": "handshake",
  "coracao": "favorite",
  "ajuda": "help",
  "casa": "home",
  "imagem": "image",
  "instagram": "photo_camera",
  "email": "mail",
  "mapa": "location_on",
  "menu": "menu",
  "mensagem": "chat",
  "pacote": "inventory_2",
  "telefone": "call",
  "codigo-qr": "qr_code_2",
  "balanca": "balance",
  "escudo": "shield",
  "escudo-confirmado": "verified_user",
  "celular": "smartphone",
  "usuario-adicionar": "person_add",
  "usuario-bloqueado": "person_off",
  "pessoas": "groups",
  "fechar": "close"
};

function buscarNomeDoIcone(nome) {
  return nomesDosIconesMaterial[nome] || nome.replace(/-/g, "_");
}

// Procura todos os elementos com data-icone e troca o texto pelo ícone correto.
function aplicarIcones(raiz = document) {
  raiz.querySelectorAll("[data-icone]").forEach((elemento) => {
    const nome = elemento.getAttribute("data-icone");
    elemento.classList.add("material-symbols-rounded");
    elemento.setAttribute("aria-hidden", "true");
    elemento.textContent = buscarNomeDoIcone(nome);
  });
}

// Controla a navegação principal quando ela vira menu de celular em telas pequenas.
function configurarMenuMobile() {
  const botao = document.querySelector(".botao-menu");
  const menu = document.querySelector(".navegacao-principal");

  if (!botao || !menu) return;

  botao.addEventListener("click", () => {
    const estaAberto = menu.classList.toggle("esta-aberto");
    document.body.classList.toggle("menu-aberto", estaAberto);
    botao.setAttribute("aria-expanded", String(estaAberto));

    const icone = botao.querySelector("[data-icone]");
    if (icone) {
      icone.setAttribute("data-icone", estaAberto ? "fechar" : "menu");
      aplicarIcones(botao);
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("esta-aberto");
      document.body.classList.remove("menu-aberto");
      botao.setAttribute("aria-expanded", "false");

      const icone = botao.querySelector("[data-icone]");
      if (icone) {
        icone.setAttribute("data-icone", "menu");
        aplicarIcones(botao);
      }
    });
  });
}

// Faz os links internos, como #contato e #doacoes, rolarem suavemente até a seção.
function configurarRolagemSuave() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (evento) => {
      const seletor = link.getAttribute("href");
      if (!seletor || seletor === "#") return;

      const destino = document.querySelector(seletor);
      if (!destino) return;

      evento.preventDefault();
      destino.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", seletor);
    });
  });
}

// Abre e fecha a seção de Perguntas Frequentes e garante que só uma resposta fique aberta.
function configurarPerguntasFrequentes() {
  document.querySelectorAll("[data-secao-perguntas]").forEach((secao) => {
    const botaoDaSecao = secao.querySelector("[data-botao-perguntas]");
    const listaDePerguntas = secao.querySelector("[data-lista-perguntas]");
    const abreNoInicio = secao.hasAttribute("data-aberto-inicial");

    if (!botaoDaSecao || !listaDePerguntas) return;

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
  const larguraDaTela = window.innerWidth;

  if (larguraDaTela < 640) return Number(carrossel.dataset.visivelCelular || 1);
  if (larguraDaTela < 1024) return Number(carrossel.dataset.visivelTablet || 2);

  return Number(carrossel.dataset.visivelComputador || 3);
}

// Controla os carrosséis de parceiros e galeria: setas, bolinhas e rotação automática.
// Faz a faixa de parceiros andar sem pausas, duplicando os slides para criar um ciclo infinito.
function configurarRolagemContinua(carrossel, trilho, slides) {
  if (trilho.dataset.slidesDuplicados === "true") return;

  slides.forEach((slide) => {
    const copia = slide.cloneNode(true);
    copia.setAttribute("aria-hidden", "true");
    trilho.appendChild(copia);
  });

  trilho.dataset.slidesDuplicados = "true";
  trilho.classList.add("rolagem-continua");
  trilho.style.setProperty("--duracao-rolagem", `${Number(carrossel.dataset.duracaoRolagem || 18)}s`);
}

function configurarCarrosseis() {
  document.querySelectorAll("[data-carrossel]").forEach((carrossel) => {
    const trilho = carrossel.querySelector(".trilho-carrossel");
    const slides = Array.from(carrossel.querySelectorAll(".slide-carrossel"));
    const botaoAnterior = carrossel.querySelector(".seta-carrossel.anterior");
    const botaoProximo = carrossel.querySelector(".seta-carrossel.proximo");
    const bolinhas = carrossel.querySelector(".pontos-carrossel");

    if (!trilho || slides.length === 0) return;

    if (carrossel.dataset.rolagemContinua === "true") {
      configurarRolagemContinua(carrossel, trilho, slides);
      return;
    }

    let indiceAtual = 0;
    let temporizador = null;
    let quantidadeVisivel = pegarQuantidadeVisivel(carrossel);

    const pegarIndiceMaximo = () => Math.max(0, slides.length - quantidadeVisivel);

    const renderizar = () => {
      quantidadeVisivel = pegarQuantidadeVisivel(carrossel);
      const larguraDoSlide = 100 / quantidadeVisivel;

      slides.forEach((slide) => {
        slide.style.flexBasis = `${larguraDoSlide}%`;
      });

      if (indiceAtual > pegarIndiceMaximo()) indiceAtual = 0;

      trilho.style.transform = `translateX(-${indiceAtual * larguraDoSlide}%)`;
      atualizarBolinhas();
    };

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
      if (temporizador) window.clearInterval(temporizador);
      temporizador = null;
    };

    const iniciarAutomatico = () => {
      if (carrossel.dataset.automatico !== "true") return;

      pararAutomatico();
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

      bolinhas.innerHTML = "";

      for (let i = 0; i <= pegarIndiceMaximo(); i += 1) {
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
    window.addEventListener("resize", renderizar);

    renderizar();
    iniciarAutomatico();
  });
}

// Monta um e-mail com os dados digitados no formulário de contato.
function configurarFormulariosDeContato() {
  document.querySelectorAll("[data-formulario-contato]").forEach((formulario) => {
    formulario.addEventListener("submit", (evento) => {
      evento.preventDefault();

      const dados = new FormData(formulario);
      const nome = dados.get("nome") || "";
      const email = dados.get("email") || "";
      const mensagem = dados.get("mensagem") || "";
      const assunto = encodeURIComponent("Contato pelo site - SOS Mulher");
      const corpo = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\n\nMensagem:\n${mensagem}`);

      window.location.href = `mailto:sosmulher.oficialsjc@gmail.com?subject=${assunto}&body=${corpo}`;
      formulario.reset();
    });
  });
}

// Esconde fotos que ainda não existem e mostra as iniciais no lugar.
function configurarFotosDaDiretoria() {
  document.querySelectorAll("[data-foto-diretoria]").forEach((foto) => {
    const caminhoDaFoto = foto.dataset.src;
    if (!caminhoDaFoto) return;

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
// Carrega fotos dos eventos só quando o arquivo existe; se não existir, mantém "Imagem em breve".
function configurarFotosDosEventos() {
  document.querySelectorAll("[data-foto-evento]").forEach((foto) => {
    const caminhoDaFoto = foto.dataset.src;
    if (!caminhoDaFoto) return;

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
  aplicarIcones();
  configurarMenuMobile();
  configurarRolagemSuave();
  configurarPerguntasFrequentes();
  configurarCarrosseis();
  configurarFormulariosDeContato();
  configurarFotosDaDiretoria();
  configurarFotosDosEventos();
  configurarLogosDosParceiros();
  atualizarAnoDoRodape();
});
