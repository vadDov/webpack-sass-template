import { scrollUnlock,  hidePopup, nullStyleInput } from './form-offer-popup';
import { createOffer, fetchOffers } from './offer-repository';
import { isNumber } from './function-product-block';
import { isValid } from './validation';

export const btnAddProduct = document.getElementById('btn-add-product');
export const popupAddProduct = document.getElementById('popup-add-product');
export const formAddProduct = document.getElementById('form-add-product');
const buttonAddProduct = document.getElementById('add-product');

popupAddProduct.addEventListener('click', hidePopup);
buttonAddProduct.addEventListener('click', addProduct);
formAddProduct.price.addEventListener('keydown', isNumber);



let form = [formAddProduct.title,
            formAddProduct.description,
            formAddProduct.price,
            formAddProduct.photo,
            formAddProduct.manufacturer
];

const formPopup = document.getElementById('information__correct');

export function showAddProductPopup() {
    popupAddProduct.classList.remove('hide-block');
    scrollUnlock();
    nullStyleInput([formAddProduct, formPopup]);
}
// formAddProduct.price.style.border = '1px solid red';
// formAddProduct.price.style.borderRadius = '5px';

function addProduct(event) {
    let body = {};
    let lastOfferId;

    (async () => {
        const offers = await fetchOffers();
        lastOfferId = offers[length - 1] + 1;
    })();

    body.id = lastOfferId;
    body.title = formAddProduct.title.value;
    body.description = formAddProduct.description.value;
    body.price = formAddProduct.price.value;
    body.photo = formAddProduct.photo.value;
    body.manufacturer = formAddProduct.manufacturer.value;

    
    let count = 0;


    isValid(formAddProduct.title, 15, 45);
    isValid(formAddProduct.photo, 1, 200);
    isValid(formAddProduct.description, 20, 150);
    isValid(formAddProduct.price, 1);
    isValid(formAddProduct.manufacturer, 1, 20);

    for (let elem of form) {
        if (elem.nextElementSibling) {
            count++;
        }
    }

    if (count === 0) {
        createOffer(body);
    }else {
        event.preventDefault();
    }
}

