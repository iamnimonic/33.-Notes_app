const btn = document.querySelector('.add-note-btn')
const body = document.querySelector('body')

const notes = JSON.parse(localStorage.getItem('notes'))

if (notes) {
    notes.forEach(note => addNote(note))
}


btn.addEventListener('click', () => addNote())

function addNote(text = '') {
    const note = document.createElement('div')
    const storage = window.localStorage

    
    note.classList.add('note')

    note.innerHTML = `
    <div class="tool-bar">
        <button class="convert"><i class="fas fa-file-export"></i><span class="tooltip tooltip-save">Save note</span></button>
        <button class="delete"><i class="far fa-trash-alt"></i><span class="tooltip tooltip-save">Delete note</span></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <div class="text-area">
        <textarea name="" class="text_area ${text ? "hidden" : ""}" cols="30" rows="10"></textarea>
    </div>`

    const save_el = note.childNodes[1].children[0] 
    const delete_el = note.childNodes[1].children[1]
    const main_el = note.querySelector('.main')
    const text_el = note.querySelector('.text_area')

    main_el.innerHTML = marked(text)
    text_el.value = text

    delete_el.addEventListener('click', () => {
        note.remove()

        updateLS()
    })
     
    save_el.addEventListener('click', () => {
        main_el.classList.toggle('hidden')
        text_el.classList.toggle('hidden')
        storage.setItem(main_el, text_el.value)
    })

    text_el.addEventListener('input', (e) => {
        const { value } = e.target
        main_el.innerHTML = marked(value)

        updateLS()
    })

    body.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')

    const notes = []

    notesText.forEach(note => notes.push(note.value))
    
    localStorage.setItem('notes', JSON.stringify(notes))
}