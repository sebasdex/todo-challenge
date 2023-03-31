const theme = document.querySelector('.dark');
const iconThem = document.getElementsByTagName('IMG');
const lgSize = window.matchMedia('(min-width: 1440px)');
const mobileSize = window.matchMedia('(max-width: 1440px)');
const footer = document.querySelector('.footer');
const info = document.querySelector('.info');
const full = document.querySelector('.full');
const main = document.getElementsByTagName('MAIN');
var count = localStorage.getItem('count');
//AddEvents
main[0].children[1].children[1].addEventListener('keyup', introKey);
main[0].children[2].addEventListener('click', deleteList);
main[0].children[2].addEventListener('click', check);
iconThem[0].addEventListener('click', () => {
    theme.classList.toggle('dark');
    theme.classList.toggle('light');
    localStorage.setItem('theme', theme.classList[0]);
    if (theme.classList.contains('light')) {
        localStorage.setItem('icon', iconThem[0].attributes[0].textContent = 'images/icon-moon.svg');
    } else {
        localStorage.setItem('icon', iconThem[0].attributes[0].textContent = 'images/icon-sun.svg');
    }
});
// AddEvents Full
full.children[0].addEventListener('click', (e) => {
    filterColor(e);
    filterAll();
});
full.children[1].addEventListener('click', (e) => {
    filterColor(e);
    filterActive();
});
full.children[2].addEventListener('click', (e) => {
    filterColor(e);
    filterCompleted();
});
//AdEvents Clear Completed
info.children[2].addEventListener('click', clearCompleted);
//If count
if (!count) {
    count = 0;
}
//------------Show theme in storage-----------------------
var localTheme = localStorage.getItem('theme');
var localIcon = localStorage.getItem('icon');
if (localTheme && localIcon) {
    if (!theme.classList.contains(localTheme)) {
        theme.classList.remove(...theme.classList);
        theme.classList.add(localTheme);
        iconThem[0].attributes[0].textContent = localIcon;
    }
}
//----------Show List----------------------------------
var listStorage = localStorage.getItem('list');
if (listStorage) {
    main[0].children[2].innerHTML = listStorage;
}
//-------Input Value --------------------
function introKey(e) {
    if (e.keyCode === 13 && e.target.value !== '') {
        createList(e);
        e.target.value = '';
    }
}
itemsLength();
//Create List elements
function createList(e) {
    const list = document.createElement('DIV');
    list.classList.add('list');
    list.setAttribute('data-id', count);
    list.innerHTML = `<div class="check-list"><div class="check"></div><p>${e.target.value}</p></div>
                         <img src="images/icon-cross.svg" alt="close" class="close">`;
    main[0].children[2].insertBefore(list, main[0].children[2].firstChild);
    count++;
    itemsLength();
    localStorage.setItem('count', count);
    localStorage.setItem('list', main[0].children[2].innerHTML);
}
//---------Delete list----------
function deleteList(e) {
    if (e.target.classList.contains('close')) {
        const a = main[0].children[2].children;
        const id = Number(e.target.parentElement.getAttribute('data-id'));
        for (let i = 0; i < a.length; i++) {
            if (Number(a[i].getAttribute('data-id')) === id) {
                a[i].remove();
                localStorage.setItem('list', main[0].children[2].innerHTML);
            }
        }
    }
}
//Select list checked
function check(e) {
    if (e.target.classList.contains('check')) {
        e.target.classList.remove('check');
        e.target.classList.add('checked');
        if (e.target.classList.contains('checked')) {
            e.target.parentElement.children[1].style = 'text-decoration-line: line-through; color:hsl(234, 11%, 52%)';
            localStorage.setItem('list', main[0].children[2].innerHTML);
            itemsLength();
        }
    }
    else if (e.target.classList.contains('checked')) {
        e.target.classList.remove('checked');
        e.target.classList.add('check');
        if (e.target.classList.contains('check')) {
            e.target.parentElement.children[1].style = 'none';
            localStorage.setItem('list', main[0].children[2].innerHTML);
            itemsLength();
        }
    }
}

//Functions Full
function filterColor(e) {
    if (!e.target.classList.contains('full')) {
        e.target.style.color = 'hsl(220, 98%, 61%)';
        colors(e);
    }
}
function colors(e) {
    var act = full.children;
    for (let i = 0; i < act.length; i++) {
        if (act[i].style.color) {
            act[i].style = 'none';
            e.target.style.color = 'hsl(220, 98%, 61%)';
        }
    }
}

function filterActive() {
    const listFilter = document.querySelector('SECTION');
    const elementos = listFilter.children;
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].children[0].children[0].classList.contains('checked')) {
            elementos[i].style.display = 'none';
            localStorage.setItem('list', main[0].children[2].innerHTML);
        }
        if (elementos[i].children[0].children[0].classList.contains('check')) {
            elementos[i].style.display = 'flex';
            localStorage.setItem('list', main[0].children[2].innerHTML);
        }
    }
}
function filterCompleted() {
    const listFilter = document.querySelector('SECTION');
    const elementos = listFilter.children;
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].children[0].children[0].classList.contains('checked')) {
            elementos[i].style.display = 'flex';
            localStorage.setItem('list', main[0].children[2].innerHTML);
        }
        if (elementos[i].children[0].children[0].classList.contains('check')) {
            elementos[i].style.display = 'none';
            localStorage.setItem('list', main[0].children[2].innerHTML);
        }
    }
}
function filterAll() {
    const listFilter = document.querySelector('SECTION');
    const elementos = listFilter.children;
    for (let i = 0; i < elementos.length; i++) {
        if (elementos[i].style.display === 'none') {
            elementos[i].style.display = 'flex';
            localStorage.setItem('list', main[0].children[2].innerHTML);
        }
    }
}
//Functions Clear Completed
function clearCompleted() {
    const listFilter = document.querySelector('SECTION');
    const elementos = listFilter.children;
    for (let i = 0; i < elementos.length; i++) {
        while (elementos[i].children[0].children[0].classList.contains('checked')) {
            elementos[i].remove();
            localStorage.setItem('list', main[0].children[2].innerHTML);
        }
    }
}

//Function itemLength
function itemsLength() {
    const listFilter = document.querySelectorAll('.check');
    info.children[0].textContent = `${listFilter.length - 1} items left`;
}




