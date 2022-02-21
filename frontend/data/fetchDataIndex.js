import datas from '../../db.json' assert { type: "json" };
let dataMenuIndex = document.getElementById('renderDataIndex')
let renderSPNoiBat = document.getElementById('renderSPNoiBat')

const { categorys, products, News } = datas
let contentIndex = News.map((news) =>{
    return `
    <div class="col l-2 m-4 s-6">
                                <div class="product">
                                    <div class="product__avt" style="background-image: url(${news.image});">
                                    </div>
                                    <div class="product__info">
                                        <h3 class="product__name">${news.name}</h3>
                                        <div class="product__price">
                                            <div class="price__old">
                                                300.000 đ
                                            </div>
                                            <div class="price__new">200.000 <span class="price__unit">đ</span></div>
                                        </div>
                                        <div class="product__sale">
                                            <span class="product__sale-percent">24%%</span>
                                            <span class="product__sale-text">Giảm</span>
                                        </div>
                                    </div>
                                    <a href="product.html" class="viewDetail">Xem chi tiết</a>
                                    <a href="cart.html" class="addToCart">Thêm vào giỏ</a>
                                </div>
                            </div>
    `
}).join('')
let contentSP = News.map((news) =>{
    return `
    <div class="product">
                        <div class="product__avt" style="background-image: url(${news.image});">
                        </div>
                        <div class="product__info">
                            <h3 class="product__name">${news.name}</h3>
                            <div class="product__price">
                                <div class="price__old">
                                    100.000 đ
                                </div>
                                <div class="price__new"> 70.000<span class="price__unit">đ</span></div>
                            </div>
                            <div class="product__sale">
                                <span class="product__sale-percent">23</span>
                                <span class="product__sale-text">Giảm</span>
                            </div>
                        </div>
                        <a href="product.html" class="viewDetail">Xem chi tiết</a>
                        <a href="cart.html" class="addToCart">Thêm vào giỏ</a>
                    </div>
    `
}).join('')
dataMenuIndex.innerHTML = contentIndex
renderSPNoiBat.innerHTML = contentSP
$('.owl-carousel.hight').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            dots: false,
            autoplay: true,
            autoplayTimeout: 3000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 2
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        })