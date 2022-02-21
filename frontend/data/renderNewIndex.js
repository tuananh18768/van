import datas from '../../db.json' assert { type: "json" };
let eleNew = document.querySelector('.owl-carousel.news')
const { News } = datas;
let title = News.map((p, index) => {
    return `
    <a href="news.html" class="news">
    <div class="news__img">
        <img src="${p.image}" alt="">
    </div>
    <div class="news__body">
        <h3 class="news__body-title">${p.name}</h3>
        <div class="new__body-date">13/6/2021</div>
        <p class="news__description">
            ${p.content}
        </p>
    </div>
</a>
    `
}).join('')
eleNew.innerHTML = title
$('.owl-carousel.news').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 2
        }
    }
})