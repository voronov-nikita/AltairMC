document.addEventListener("DOMContentLoaded", function () {
    fetch("cards.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Не удалось загрузить данные");
            }
            return response.json();
        })
        .then((data) => {
            const container = document.getElementById("questsContainer");
            container.innerHTML = "";

            if (data.length === 0) {
                container.innerHTML =
                    '<div class="loading">Квесты не найдены</div>';
                return;
            }

            data.forEach((quest) => {
                const card = document.createElement("a");
                card.className = "quest-card";
                card.href = quest.link || "#";

                // Определяем класс категории
                let categoryClass = "";
                if (quest.title.includes("РТС")) categoryClass = "rts";
                else if (quest.title.includes("ИТ")) categoryClass = "it";
                else if (quest.title.includes("Химия"))
                    categoryClass = "chemistry";

                card.innerHTML = `
                            <div class="quest-image" style="background-image: url('${
                                quest.image ||
                                "https://source.unsplash.com/random/600x400?quest"
                            }')"></div>
                            <div class="quest-content">
                                <h3 class="quest-title">${quest.title}</h3>
                                <p class="quest-author">${
                                    quest.author || "Автор не указан"
                                }</p>
                            </div>
                            <div class="quest-footer">
                                <div class="quest-category ${categoryClass}">${
                    quest.category || "Другое"
                }</div>
                            </div>
                        `;

                container.appendChild(card);
            });
        })
        .catch((error) => {
            console.error("Ошибка загрузки данных:", error);
            document.getElementById("questsContainer").innerHTML =
                '<div class="loading">Ошибка загрузки квестов. Пожалуйста, попробуйте позже.</div>';
        });
});
