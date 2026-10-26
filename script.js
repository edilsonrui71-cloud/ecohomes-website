/* =========================================
   1. ELEMENTOS DO WEBSITE
========================================= */

const searchForm = document.getElementById("searchForm");

const locationInput = document.getElementById("location");

const propertyTypeSelect =
    document.getElementById("propertyType");

const propertyCards =
    document.querySelectorAll(".property-card");

const searchMessage =
    document.getElementById("searchMessage");

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


/* =========================================
   2. MENU PARA TELEMÓVEIS
========================================= */

menuToggle.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";

});


/* Fechar o menu depois de selecionar uma secção */

navLinks.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute("aria-label", "Abrir menu");

        menuToggle.textContent = "☰";

    });

});


/* =========================================
   3. PESQUISA DE PROPRIEDADES
========================================= */

searchForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const locationValue = locationInput.value
        .trim()
        .toLocaleLowerCase("pt");

    const propertyType = propertyTypeSelect.value;

    let visibleCount = 0;

    propertyCards.forEach(function (card) {

        const cardType = card.dataset.type;

        const cardLocation = card.dataset.location;

        /*
         * Verificar o tipo de propriedade.
         */

        const matchesType =
            propertyType === "" ||
            cardType === propertyType;

        /*
         * Verificar a localização.
         *
         * As localizações são dados de demonstração
         * definidos nos cartões HTML.
         */

        const matchesLocation =
            locationValue === "" ||
            cardLocation.includes(locationValue);

        /*
         * Mostrar apenas os cartões correspondentes.
         */

        const shouldShow =
            matchesType && matchesLocation;

        card.hidden = !shouldShow;

        if (shouldShow) {
            visibleCount++;
        }

    });


    /* =========================================
       4. MENSAGEM DE RESULTADOS
    ========================================= */

    if (visibleCount === 0) {

        searchMessage.textContent =
            "Não encontrámos propriedades com esses critérios. " +
            "Experimenta outra localização ou outro tipo.";

    } else {

        const propertyWord =
            visibleCount === 1
                ? "propriedade encontrada"
                : "propriedades encontradas";

        searchMessage.textContent =
            `${visibleCount} ${propertyWord}.`;

    }


    /* Ir para a secção de resultados */

    document.getElementById("casas").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


/* =========================================
   5. ANO AUTOMÁTICO NO RODAPÉ
========================================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* =========================================
   6. LIMPAR A MENSAGEM AO ALTERAR A PESQUISA
========================================= */

locationInput.addEventListener("input", function () {

    searchMessage.textContent = "";

});

propertyTypeSelect.addEventListener("change", function () {

    searchMessage.textContent = "";

});