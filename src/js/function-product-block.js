export const blockProducts = document.querySelector('#content');

export function checkSearchError(){
    if(blockProducts.innerHTML === ''){
        let html = `<div id="search-error" class="products__search-error hide-block">
        <p class="products__search-error-title">search did not return any result</p>
        <img src="/icons/grustnyy-smaylik.jpg" class="products__search-error-image"></img>
    </div>`;
        blockProducts.insertAdjacentHTML('afterbegin', html);
        document.getElementById('search-error').classList.remove('hide-block');
    }
}

export function getHTML(nameElem){
    const html = `<div class="products__column">
                    <div id="item-product" class="item-product" value="${nameElem.id}">
                        <div id="action-menu-box" class="action-menu-box hide-block">
                            <div id="modify" class="action-menu-box-modify"><span><img src="/icons/modify.png" alt=""></span>Modify</div>
                            <div class="action-menu-box-delete"><span class="delete"><img class="delete" src="/icons/trash.png" alt=""></span>Delete</div>
                        </div>
                        <div id="actions-menu" class="item-product__actions-menu">
                            <span class="item-product__circle"></span>
                            <span class="item-product__circle"></span>
                            <span class="item-product__circle"></span>
                        </div>
                        <div class="action-menu-window hide-block"></div>
                        <div class="item-product__title">${nameElem.title}</div>
                        <div class="item-product__image"><img src="${nameElem.photo}" alt=""></div>
                        <div class="item-product__desc">${nameElem.description}</div>
                        <p class="item-product__price">Price ${nameElem.price} rub</p>
                        <div class="item-product__button">
                            <span>Basket</span>
                        </div>
                    </div>
                </div>`;
    return html;
}

export function isNumber(event){
    if(event.target.value.length <= 3){
        if(isNaN(+event.key) & event.key !== 'Backspace'){
            event.preventDefault();
        }
    }else if(event.key !== 'Backspace'){
        event.preventDefault();
    }
}
export function showHint(event) {
    event.target.previousElementSibling.classList.remove('hide');
    event.target.removeAttribute('placeholder');
    console.log(event.target);
}
export function hideHint(event) {
    let elem = event.target;
    if(elem.value == '') {

        elem.previousElementSibling.classList.add('hide');
    
        elem.classList.contains('price__min') ?
        elem.setAttribute('placeholder', 'min price') :
        elem.setAttribute('placeholder', 'max price');
        
    }
}

export function addPlaceholderToThePrices() {
    const prices = document.querySelectorAll('#price');

    for(let price of prices) {
        price.classList.contains('price__min') ?
        price.setAttribute('placeholder', 'min price') :
        price.setAttribute('placeholder', 'max price');
    }
}