import datas from '../../db.json' assert { type: "json" };
let dataMenu = document.querySelector('#dataMenu')
const { categorys, products } = datas;
let title = categorys.map((p, index) => {
    return `
        <ul class="sub-nav" >
                    <li class="sub-nav__item">
                        <a href="" class="sub-nav__link heading">${p.name}</a>
                    </li>
                    <li class="sub-nav__item">
                        <a href="listProduct.html" class="sub-nav__link">${products[index].name}</a>
                    </li>
        </ul>
    `
}).join('')
dataMenu.innerHTML = title