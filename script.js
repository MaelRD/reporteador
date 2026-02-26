// Current Date display
function updateDate() {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    document.getElementById('current-date').textContent = today.toLocaleDateString('es-ES', options);
}
updateDate();




// Dynamic Ticket Logic
let ticketCount = 0;
const ticketsContainer = document.getElementById('tickets-container');
const btnAddTicket = document.getElementById('btn-add-ticket');

function createTicketElement() {
    ticketCount++;
    const div = document.createElement('div');
    div.className = 'ticket-item';
    div.id = `ticket-${ticketCount}`;

    div.innerHTML = `
        <div class="ticket-header">
            <strong>Ticket #${ticketCount}</strong>
            <button type="button" class="btn-remove-ticket" onclick="removeTicket(${ticketCount})">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="ticket-fields">
            <div>
                <input type="text" class="ticket-id-input" placeholder="Ej: TICKET-1205" required>
            </div>
            <div>
                <select class="ticket-status-input">
                    <option value="🟢 Levantado (Nuevo)">🟢 Levantado (Nuevo)</option>
                    <option value="🟡 Pendiente Cliente">🟡 Pendiente Cliente</option>
                    <option value="🟠 En Proceso">🟠 En Proceso</option>
                    <option value="🔴 Bloqueado">🔴 Bloqueado</option>
                </select>
            </div>
        </div>
        <div class="action-field">
            <input type="text" class="ticket-action-input" placeholder="Ej: Revisar logs; el cliente reporta lentitud..." required>
        </div>
    `;
    return div;
}

// Add initial ticket automatically
ticketsContainer.appendChild(createTicketElement());

btnAddTicket.addEventListener('click', () => {
    ticketsContainer.appendChild(createTicketElement());
});

window.removeTicket = function (id) {
    const el = document.getElementById(`ticket-${id}`);
    if (el) {
        el.remove();
    }
}

// PDF Generation Logic
document.getElementById('btn-generate-pdf').addEventListener('click', async () => {
    // Collect specific fields
    const author = document.getElementById('report-author').value;
    const context = document.getElementById('report-context').value;
    const state = document.getElementById('report-state').value;
    const event = document.getElementById('report-event').value;
    const notes = document.getElementById('report-notes').value;

    if (!author || !context || !event) {
        alert("Por favor, completa Nombre, Contexto y Evento principal.");
        return;
    }

    // Change button state
    const btn = document.getElementById('btn-generate-pdf');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Generando PDF...';
    btn.disabled = true;

    try {
        // Populate PDF placeholders
        document.getElementById('pdf-date-text').textContent = new Date().toLocaleDateString('es-ES', { dateStyle: 'long' });
        document.getElementById('pdf-author-text').textContent = author;
        document.getElementById('pdf-footer-date').textContent = new Date().toLocaleString('es-ES');

        document.getElementById('pdf-context-text').textContent = context;
        document.getElementById('pdf-event-text').textContent = event;

        // Apply state styling to the PDF report
        const stateEl = document.getElementById('pdf-state-text');
        const stateSelect = document.getElementById('report-state');
        stateEl.textContent = stateSelect.options[stateSelect.selectedIndex].text;

        if (state === 'Tranquilo') {
            stateEl.style.backgroundColor = '#dcfce7';
            stateEl.style.color = '#166534';
            stateEl.style.border = '1px solid #bbf7d0';
        } else if (state === 'Normal') {
            stateEl.style.backgroundColor = '#e0f2fe';
            stateEl.style.color = '#075985';
            stateEl.style.border = '1px solid #bae6fd';
        } else if (state === 'Pesado') {
            stateEl.style.backgroundColor = '#fef08a';
            stateEl.style.color = '#854d0e';
            stateEl.style.border = '1px solid #fde047';
        } else {
            stateEl.style.backgroundColor = '#fee2e2';
            stateEl.style.color = '#991b1b';
            stateEl.style.border = '1px solid #fecaca';
        }

        // Build dynamic ticket rows
        const tbody = document.getElementById('pdf-tickets-table-body');
        tbody.innerHTML = '';

        const ticketItems = document.querySelectorAll('.ticket-item');
        if (ticketItems.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" style="text-align:center; color:#94a3b8; font-weight:500;">Ningún ticket levantado o resuelto</td></tr>';
        } else {
            ticketItems.forEach(item => {
                const tId = item.querySelector('.ticket-id-input').value || '-';
                const tStatus = item.querySelector('.ticket-status-input').value || '-';
                const tAction = item.querySelector('.ticket-action-input').value || '-';

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${tId}</strong></td>
                    <td>${tStatus}</td>
                    <td>${tAction}</td>
                `;
                tbody.appendChild(tr);
            });
        }

        // Manage Consultas y Capacitaciones visibility
        const queriesSection = document.getElementById('pdf-queries-section');
        if (notes.trim() === '') {
            queriesSection.style.display = 'none';
        } else {
            queriesSection.style.display = 'block';
            document.getElementById('pdf-notes-text').textContent = notes;
        }

        // Generate PDF
        const element = document.getElementById('pdf-template');

        // Include today's date in filename
        const todayStr = new Date().toISOString().split('T')[0];
        const opt = {
            margin: 0,
            filename: `EntregaTurno_${author.replace(/\s+/g, '')}_${todayStr}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, logging: false },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Render synchronous since container is securely off-screen
        await html2pdf().set(opt).from(element).save();

        // Show brief success alert
        setTimeout(() => alert("Reporte de entrega guardado en tus Descargas."), 500);

    } catch (err) {
        console.error("Error generating PDF:", err);
        alert("Ocurrió un error al generar el reporte.");
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});
