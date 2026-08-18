

import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@0.25.0/dist/pocketbase.es.mjs';

const pb = new PocketBase('https://api.ulon.site')

function init() {

    async function getChangelogs() {

        const records = await pb.collection('uh_changelog').getFullList({
            sort: '-created',
        });

        console.log(records.length);

        const container = document.getElementById('changelog-container');
        if (!container) return;
        
        // Limpa o texto inicial
        container.textContent = '';
        
        let htmlGerado = '';
        

        for (let index = 0; index < records.length; index++) {
            const element = records[index];
            console.log(element);

            htmlGerado += `
                <div class="changelog-item">
                    <h3> -- ${element.date}</h3>
                    <changelog-ul>
            `;
            
            element.content.forEach(changes => {
                htmlGerado += `<li>${changes}</li>`;
            });

            htmlGerado += `
                    </changelog-ul>
                </div>
            `;
        }

        if (records.length == 0) {
            htmlGerado = "No Changelogs Found."
        }
        // Insere tudo otimizado na tela
        container.insertAdjacentHTML('beforeend', htmlGerado);
        
    }
    getChangelogs();

    async function getTodolist() {

        const records = await pb.collection('uh_todo_list').getFullList({
            sort: '-done, -created',
        });

        console.log(records.length);

        const container = document.getElementById('todo-container');
        if (!container) return;
        
        // Limpa o texto inicial
        container.textContent = '';
        
        let htmlGerado = '';
        

        for (let index = 0; index < records.length; index++) {
            const element = records[index];
            console.log(element);

            let isChecked = ''; 
            if (element.done) {
                isChecked = '<div class="checked">✓</div>'
            }

            htmlGerado += `<li><button>${isChecked}</button> ${element.content}</li>`;

        }

        if (records.length == 0) {
            htmlGerado = "No Tasks Found."
        }
        // Insere tudo otimizado na tela
        container.insertAdjacentHTML('beforeend', htmlGerado);
        
    }
    getTodolist();
};

// roda no load inicial
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}

// roda de novo depois de cada navegação via swup
swup.hooks.on('page:view', () => init());