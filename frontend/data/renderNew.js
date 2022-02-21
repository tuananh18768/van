import datas from '../../db.json' assert { type: "json" };
let eleNew = document.querySelector('.list-new');
const { News } = datas;
let title = News.map((p, index) => {
    return `
    <div href="#" class="new-item">
    <a href="#" class="new-item__img">
        <img src="${p.image}"
            alt="">
    </a>
    <div class="new-item__body">
        <a href="#" class="new-item__title">
            ${p.name}
        </a>
        <p class="new-item__time"> Ngày đăng: 27/5/2020</p>
        <p class="new-item__description">${p.content}</p>
        <a href="#" class="btn btn--default">Xem thêm</a>
    </div>
</div>
    `
}).join('')
eleNew.innerHTML = title