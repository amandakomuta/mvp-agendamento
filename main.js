// Elementos DOM
        const timeSlots = document.querySelectorAll('.time-slot');
        const calendarDates = document.querySelectorAll('.calendar-cell.date');
        const sendInviteBtn = document.getElementById('send-invite-btn');
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');

        // Variáveis para armazenar dados
        let selectedTime = "15:00";
        let selectedDate = "2023-06-12";

        // Inicializar a aplicação
        document.addEventListener('DOMContentLoaded', function() {
            setupEventListeners();
        });

        // Configurar listeners de eventos
        function setupEventListeners() {
            // Selecionar horário
            timeSlots.forEach(slot => {
                if (!slot.classList.contains('unavailable')) {
                    slot.addEventListener('click', function() {
                        timeSlots.forEach(s => s.classList.remove('selected'));
                        this.classList.add('selected');
                        selectedTime = this.textContent;
                    });
                }
            });

            // Selecionar data
            calendarDates.forEach(date => {
                if (!date.classList.contains('unavailable')) {
                    date.addEventListener('click', function() {
                        // Obter o dia selecionado
                        const day = this.textContent.padStart(2, '0');
                        const selected = new Date(`${selectedDate.substring(0, 8)}${day}`);
                        // Definir data mínima permitida: 22/09/2025
                        const today = new Date(2025, 8, 22); // mês 8 = setembro (zero-based)
                        today.setHours(0, 0, 0, 0); // Zerar horas para comparar apenas datas

                        if (selected < today) {
                            showNotification('Não é possível selecionar datas anteriores a 22/09/2025.', 'error');
                            return;
                        }

                        calendarDates.forEach(d => d.classList.remove('selected'));
                        this.classList.add('selected');
                        selectedDate = "2023-06-" + day;
                        updateAvailableTimes();
                    });
                }
            });

            // Enviar convite
            sendInviteBtn.addEventListener('click', sendInviteToCandidate);
        }

        // Simular atualização de horários disponíveis
        function updateAvailableTimes() {
            // Esta função simulada atualizaria os horários com base na data selecionada
            // Em uma implementação real, faria uma chamada para a API da Lever
            
            timeSlots.forEach(slot => {
                slot.classList.remove('unavailable');
                slot.classList.remove('selected');
                
                // Simular que alguns horários estão indisponíveis
                if (Math.random() > 0.7) {
                    slot.classList.add('unavailable');
                }
            });
            
            // Selecionar o primeiro horário disponível
            const firstAvailable = document.querySelector('.time-slot:not(.unavailable)');
            if (firstAvailable) {
                firstAvailable.classList.add('selected');
                selectedTime = firstAvailable.textContent;
            }
            
            showNotification(`Horários atualizados para ${selectedDate}`);
        }

        // Simular envio de convite para o candidato
        function sendInviteToCandidate() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const position = document.getElementById('position').value;
            const interviewType = document.getElementById('interview-type').value;
            
            // Validação simples
            if (!name || !email || !position || !interviewType || !selectedTime) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Simular integração com a Lever
            simulateLeverIntegration(name, email, position, interviewType);
        }

        // Simular integração com a Lever
        function simulateLeverIntegration(name, email, position, interviewType) {
            // Mostrar estado de carregamento
            sendInviteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Conectando com a Lever...';
            sendInviteBtn.disabled = true;
            
            // Simular tempo de espera para a integração
            setTimeout(() => {
                // Simular sucesso na integração
                showNotification(`Convite enviado para ${name} (${email})`);
                
                // Simular atualização no estágio do candidato na Lever
                document.getElementById('lever-stage').value = 'interview';
                
                // Restaurar botão
                sendInviteBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Convite para o Candidato';
                sendInviteBtn.disabled = false;
                
                // Simular criação de evento no calendário
                simulateCalendarIntegration(name, email, position, interviewType);
            }, 2000);
        }

        // Simular integração com calendário
        function simulateCalendarIntegration(name, email, position, interviewType) {
            // Simular criação de evento no Google Calendar/Outlook
            setTimeout(() => {
                showNotification(`Evento criado no calendário para ${selectedDate} às ${selectedTime}`);
            }, 1000);
        }

        // Mostrar notificação
        function showNotification(message, type = 'success') {
            notificationText.textContent = message;
            notification.className = 'notification show';
            
            if (type === 'error') {
                notification.classList.add('error');
            } else {
                notification.classList.remove('error');
            }
            
            setTimeout(() => {
                notification.className = 'notification';
            }, 3000);
        }