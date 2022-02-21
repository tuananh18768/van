let dataNews = document.querySelector('#renderData')
const contentNews = News.map((cuurent, index) => {
    return `
    <div class="col l-2 m-4 s-6">
                            <div class="product">
                                <div class="product__avt" style="background-image: url(${cuurent.image})">
                                </div>
                                <div class="product__info">
                                    <h3 class="product__name">${cuurent.name}</h3>
                                    <div class="product__price">
                                        <div class="price__old">340.000 <span class="price__unit">đ</span></div>
                                        <div class="price__new">320.000 <span class="price__unit">đ</span></div>
                                    </div>
                                </div>
                                <div class="product__sale">
                                    <span class="product__sale-percent">22%</span>
                                    <span class="product__sale-text">Giảm</span>
                                </div>
                                <a href="#" class="viewDetail">Xem chi tiết</a>
                                <a href="#" class="addToCart">Thêm vào giỏ</a>
                            </div>
                        </div>
    `
}).join('')
dataNews.innerHTML = contentNews
