document.addEventListener("DOMContentLoaded", function () {
    let quests = [];

    const container = document.getElementById("questsContainer");
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");

    function renderQuests(filteredQuests) {
        container.innerHTML = "";

        if (filteredQuests.length === 0) {
            container.innerHTML =
                '<div class="loading">Квесты не найдены</div>';
            return;
        }

        filteredQuests.forEach((quest) => {
            const card = document.createElement("a");
            card.className = "quest-card";
            card.href = quest.link || "#";

            let categoryClass = "";
            if (quest.title.includes("РТС")) categoryClass = "rts";
            else if (quest.title.includes("ИТ")) categoryClass = "it";
            else if (quest.title.includes("Химия")) categoryClass = "chemistry";

            card.innerHTML = `
        <div class="quest-image" style="background-image: url('${
            quest.image || "https://source.unsplash.com/random/600x400?quest"
        }')"></div>
        <div class="quest-content">
          <h3 class="quest-title">${quest.title}</h3>
          <p class="quest-author">${quest.author || "Автор не указан"}</p>
        </div>
        <div class="quest-footer">
          <div class="quest-category ${categoryClass}">${
                quest.category || "Другое"
            }</div>
        </div>
      `;

            container.appendChild(card);
        });
    }

    function filterQuests() {
        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;

        const filtered = quests.filter((quest) => {
            const matchesSearch =
                quest.title.toLowerCase().includes(searchTerm) ||
                (quest.author &&
                    quest.author.toLowerCase().includes(searchTerm));
            const matchesCategory = category
                ? quest.category === category
                : true;
            return matchesSearch && matchesCategory;
        });

        renderQuests(filtered);
    }

    fetch("cards.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Не удалось загрузить данные");
            }
            return response.json();
        })
        .then((data) => {
            quests = data;
            renderQuests(quests);

            // Добавляем слушатели для фильтров
            searchInput.addEventListener("input", filterQuests);
            categoryFilter.addEventListener("change", filterQuests);
        })
        .catch((error) => {
            console.error("Ошибка загрузки данных:", error);
            container.innerHTML =
                '<div class="loading">Ошибка загрузки квестов. Пожалуйста, попробуйте позже.</div>';
        });
});
