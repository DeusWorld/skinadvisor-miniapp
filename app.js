// Получаем данные пользователя из Telegram
const user = Telegram.WebApp.initDataUnsafe.user;
const userId = user?.id;

document.getElementById("user-name").textContent = user?.first_name || "Клиент";

// Пример: запрос данных с бэкенда (опционально)
async function loadUserData() {
    try {
        const response = await fetch(`/api/user/${userId}`);
        const data = await response.json();
        document.getElementById("subscription-status").textContent = 
            `Подписка: ${data.subscription || "Нет"}`;
        // Заполни список анализов
        const list = document.getElementById("analysis-items");
        data.analyses?.forEach(analysis => {
            const li = document.createElement("li");
            li.textContent = analysis.type + " — " + new Date(analysis.date).toLocaleDateString();
            list.appendChild(li);
        });
    } catch (e) {
        console.warn("Данные с бэкенда не загружены (работает оффлайн)");
    }
}

// Кнопка закрытия
document.getElementById("close-btn").onclick = () => {
    Telegram.WebApp.close();
};

// Инициализация
Telegram.WebApp.ready();
loadUserData();