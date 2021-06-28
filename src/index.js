import './styles/main.scss';
import { fetchOffers, createOffer } from "./js/offer-repository";
import { blockProducts, checkSearchError, getHTML, isNumber, showHint, hideHint, addPlaceholderToThePrices } from './js/function-product-block';
import { hideActionMenuBox } from './js/action-menu';
import { showOfferInformation, removeOffer, fillFieldInformation, hidePopup, nullStyleInput } from './js/form-offer-popup';
import { btnAddProduct, popupAddProduct, showAddProductPopup } from './js/add-offer-popup';


// (async () => {
//     await createOffer({
//         id: 15,
//         title: 'Samsung Galaxy A50 4GB/64GB (белый)',
//         description: 'Android, экран 6.4\" AMOLED (1080x2340), Exynos 9610, ОЗУ 4 ГБ, флэш-память 64 ГБ, карты памяти, камера 25 Мп, аккумулятор 4000 мАч, 2 SIM',
//         price: 519,
//         photo: 'https://content2.onliner.by/catalog/device/header/c93a1df6be27222912d27530201d7d7a.jpeg',
//         manufacturer: 'samsung'
//     })
// })();



(async () => {
    const offers = await fetchOffers();
    
    // ------ initialize the page -------
    initializeThePage();
    // ----------------------------------

    // --------- add events to search ------------
    const search = document.querySelector('#search');
    search.onsearch = () => {
        blockProducts.innerHTML = '';

        initializeThePage();
    }
    search.onkeyup = (event) => {
        
            blockProducts.innerHTML = '';
            let str = event.target.value.toLowerCase();
            let re = new RegExp(`^${str}`);

            for(let offer of offers){
                if(re.test(offer.title.toLowerCase())){
                    let html = getHTML(offer);
                    blockProducts.insertAdjacentHTML('beforeend', html);
                }
            }
            checkSearchError();
            addEventShowActionMenu()();
            addEventOfferInformation();
    }
    
    search.onblur = (event) => {
        event.target.value = '';
    }
    // --------------------------------

    const submit = document.querySelector('#btn');
    const prices = document.querySelectorAll('#price');
    
    for(let price of prices){
        price.addEventListener('keydown', isNumber);
        price.addEventListener('focus', showHint);
        price.addEventListener('blur', hideHint);
    }
    
    const minPrice = document.querySelector('.price__min');
    const maxPrice = document.querySelector('.price__max');
    

    submit.onclick = (event) => {
        event.preventDefault();
        addPlaceholderToThePrices();
        blockProducts.innerHTML = '';
        let checkboxs = document.querySelectorAll('#checkbox');
        let min_price = +minPrice.value;
        let max_price = +maxPrice.value;
        let counterOfSelected = 0;


        for(let checkbox of checkboxs){
                if(checkbox.checked && max_price !== 0){
                    counterOfSelected++;
                    let re = new RegExp(checkbox.value);
                    
                    for(let offer of offers){
                        if(re.test(offer.title.toLowerCase()) && offer.price >= min_price && offer.price <= max_price){
                            blockProducts.insertAdjacentHTML('beforeend', getHTML(offer));
                        }
                        
                    }
                }else if(checkbox.checked){
                    counterOfSelected++;
                    let re = new RegExp(checkbox.value);
                    
                    for(let offer of offers){
                        if(re.test(offer.title.toLowerCase()) && offer.price >= min_price){
                            blockProducts.insertAdjacentHTML('beforeend', getHTML(offer));
                        }
                        
                    }
                }
        }

        if(counterOfSelected === 0 && max_price !== 0){
            for(let offer of offers){
                if(offer.price >= min_price && offer.price <= max_price){
                    blockProducts.insertAdjacentHTML('beforeend', getHTML(offer));
                }
                
            }
        }else if(counterOfSelected === 0){
            for(let offer of offers){
                if(offer.price >= min_price){
                    blockProducts.insertAdjacentHTML('beforeend', getHTML(offer));
                }
                
            }
        }

        checkSearchError();

        minPrice.value = '';
        maxPrice.value = '';
        document.querySelectorAll('.js-price_small').forEach( elem => {
            elem.classList.add('hide');
        });

        checkboxs.forEach( t => {
            t.checked = false;
        })

        addEventShowActionMenu()();
        addEventOfferInformation();
    };

    function initializeThePage(){
        
        for(let offer of offers){
            blockProducts.insertAdjacentHTML('beforeend', getHTML(offer));
        }
        addEventShowActionMenu()();
        addEventOfferInformation();
    }

    // --------- action-menu-----------
    function addEventShowActionMenu() {
        const itemProducts = document.querySelectorAll('#item-product');
        return function() {
            for(let itemProduct of itemProducts) {
                itemProduct.addEventListener('click', showActionMenu);
                itemProduct.addEventListener('click', removeOffer);
            }
        }
    }
    
    
    let countActionMenu = 0;
    function showActionMenu(event){
            const elem = event.target;
            const parent = this;
            let actionsMenu = parent.firstElementChild;

                if(
                    elem.classList.contains('item-product__actions-menu') ||
                    elem.parentElement.classList.contains('item-product__actions-menu')
                ) {
                    hideActionMenuBox();
                    let actionMenuBox = parent.firstElementChild;
                    countActionMenu++;
                    actionMenuBox.classList.remove('hide-block');

                    document.body.addEventListener('click', addEventBody);

                    function addEventBody(event) {
                                if (event.target !== actionMenuBox &&
                                    event.target !== actionsMenu.nextElementSibling &&
                                    !event.target.classList.contains('item-product__circle')
                                    ) {
                                    countActionMenu = 0;
                                    actionMenuBox.classList.add('hide-block');
                                    actionMenuBox.style.display = 'none';
                                    document.body.removeEventListener('click', addEventBody);
                                }
                    }
                    
                    actionMenuBox.style.display = 'flex';
                    actionMenuBox.style.flexDirection = 'column';
                    actionMenuBox.style.justifyContent = 'space-around';

                    
                    if(countActionMenu === 2) {
                        actionsMenu = parent.firstElementChild;
                        actionsMenu.classList.add('hide-block');
                        actionsMenu.style.display = 'none';
                        countActionMenu = 0;
                    }                   
                
                }
    }



// ---------form-offer-popup----------

    function addEventOfferInformation(){
        let modifyBloks = document.querySelectorAll('#modify');
        for (let modify of modifyBloks) {
            modify.addEventListener('click', showOfferInformation);
            modify.addEventListener('click', fillFieldInformation);
        }
    }

    const buttonCancel = document.getElementById('button-cancel');
    buttonCancel.addEventListener('click', hidePopup);

// --------- add-offer-popup---------

    btnAddProduct.addEventListener('click', showAddProductPopup);
})();

