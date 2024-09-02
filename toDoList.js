let darkModeButton = document.getElementById('darkModeButton')
darkModeButton.addEventListener('click', function darkMode(event) {
    event.preventDefault()
    document.body.classList.toggle('dark-mode')
})

let addButton = document.getElementById('button')
let atividades = []
let limparBtn = document.getElementById('limpar')

function criarAtividade(event) {

    event.preventDefault()

    let text = document.getElementById('atividade').value
    var list = document.querySelector('ul#list')
    let date = document.getElementById('dateInput').value
    let dataParaFormatar = new Date(date)
    let dataAtual = new Date()


    const atividade = {
        texto: text,
        data: date,
        finalizado: false
    } //mudar sistema para aparecer a data atual


    const atividadeExistente = atividades.find((atvd) => {
        return atividade.texto == atvd.texto 
    }) //entender melhor a lógica desse pedaço



    function validarAtividade() {
        if(text == '' || date == '' || Number(dataParaFormatar.getFullYear()) < Number(dataAtual.getFullYear())) {
            return alert('Atividade invalida')
            
        } else if (atividadeExistente) {
            return alert('Atividade já registrada')

        } else {
            atividades.push(atividade)
            console.log(atividades)

            var dataAtualizada = `${dayjs(dataParaFormatar).format('dddd') }, dia ${Number(dayjs(dataParaFormatar).format('DD')) + 1 } de ${dayjs(dataParaFormatar).format('MMMM') } (${dayjs(dataParaFormatar).format('YYYY')})`
            localStorage.setItem(atividade.texto, JSON.stringify(atividade.data))

            var indice = atividades.length

            list.innerHTML += `<li ${indice}> <input type="checkbox" class="checkbox" > ${text} <span class="data">${dataAtualizada}</span> <button class="apagar">Apagar</button></li>`
        }

        document.querySelectorAll('.apagar').forEach(deleteButton => {deleteButton.addEventListener('click', removeAtividade)})
        console.log(dataAtual)

    } 

    validarAtividade()
    return atividade
}

function removeAtividade(evento) {
    let tarefa = evento.target.closest('li')
    let idLi = tarefa.id

    atividades.splice(idLi, 1)

    tarefa.remove()

    localStorage.removeItem(localStorage.key(idLi))
}


function limparLista(event) {

    event.preventDefault()

    localStorage.clear()
    atividades = []
    list.innerHTML = ''
}

limparBtn.addEventListener('click', limparLista)
addButton.addEventListener('click', criarAtividade )
