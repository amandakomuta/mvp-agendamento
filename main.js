document.addEventListener('DOMContentLoaded', function () {
    setupEventListeners();
    updateCalendarHeader();
});

// Configura eventos
function setupEventListeners() {
    const form = document.getElementById('schedule-form');
    const timeSlots = document.querySelectorAll('.time-slot');

    // Seleção de horários
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            if (!slot.classList.contains('unavailable')) {
                document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
                slot.classList.add('selected');
            }
        });
    });

    // Envio do formulário
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const candidate = document.getElementById('candidate').value;
        const interviewType = document.getElementById('interview-type').value;
        const date = document.querySelector('.calendar-cell.today')?.textContent || '';
        const selectedTime = document.querySelector('.time-slot.selected')?.textContent || '';
        const notes = document.getElementById('notes').value;

        if (!candidate || !interviewType || !date || !selectedTime) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        showNotification(`Entrevista de ${candidate} confirmada em ${date}/09 às ${selectedTime}.`);
        form.reset();
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
    });
}

// Atualiza cabeçalho do calendário
function updateCalendarHeader() {
    const months = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const now = new Date();
    const header = document.querySelector('.calendar-header h3');
    header.textContent = `${months[now.getMonth()]} ${now.getFullYear()}`;
}

// Exibe notificação
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');

    notificationText.textContent = message;
    notification.classList.remove('hidden');

    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}



