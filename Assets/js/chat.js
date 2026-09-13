const chatBotao = document.querySelector(".chat-botao");
        const chatContainer = document.querySelector(".chat-container");
        const closeChatBtn = document.querySelector(".icon-header-chat .material-symbols-outlined:last-child"); // ícone "close"
        const minimizeChatBtn = document.querySelector(".icon-header-chat .material-symbols-outlined:first-child"); // ícone "minimize"

        chatBotao.addEventListener("click", () => {
            chatContainer.classList.toggle("chat-active");
        });

        closeChatBtn.addEventListener("click", () => {
            chatContainer.classList.remove("chat-active");
        });

        minimizeChatBtn.addEventListener("click", () => {
            chatContainer.classList.remove("chat-active");
        });