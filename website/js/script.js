// APPEND TEXT TO PLACES (CHANGELOG, TODO LIST)
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('changelog-container');
    
    // Limpa o texto inicial
    container.textContent = '';
    
    let htmlGerado = '';
    
    // Usa diretamente a variável que criamos no outro arquivo
    changelogData.forEach(item => {
        htmlGerado += `
            <div class="changelog-item">
                <h3> -- ${item.date}</h3>
                <changelog-ul>
        `;
        
        item.changes.forEach(changes => {
            htmlGerado += `<li>${changes}</li>`;
        });
        
        htmlGerado += `
                </changelog-ul>
            </div>
        `;
    });
    
    // Insere tudo otimizado na tela
    container.insertAdjacentHTML('beforeend', htmlGerado);
});
