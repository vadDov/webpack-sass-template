import { hideActionMenuBox } from './action-menu';
import { deleteOffer, fetchOffers, modifyOffer } from './offer-repository';
import { isNumber } from './function-product-block';
import { popupAddProduct, formAddProduct } from './add-offer-popup';
import { isValid } from './validation';

const popup = document.getElementById('popup');
const informationPreviewBox = document.getElementById('information__preview-box');
const form = document.getElementById('information__correct');

// (async () => {
//     const offers = await fetchOffers();
// })();

const formPrice = document.getElementById('form-price');
formPrice.addEventListener('keydown', isNumber);

const buttonSave = document.getElementById('button-save');
buttonSave.addEventListener('click', makeChanges);

let formElem = [form.title, form.description, form.price, form.photo, form.manufacturer];

export function showOfferInformation(event) {
    scrollUnlock();
    hideActionMenuBox();
    nullStyleInput([form, formAddProduct]);
    informationPreviewBox.innerHTML = '';
    let itemProduct = this.parentElement.parentElement.parentElement.innerHTML;
    informationPreviewBox.insertAdjacentHTML('afterbegin', itemProduct);
    informationPreviewBox.firstElementChild.removeAttribute('id');

    for (let i = 0; i < 3; i++) {
        informationPreviewBox.firstElementChild.children[0].remove();
    }

    popup.classList.remove('hide-block');
    popup.style.transition = 'all 1s ease 0s';
    popup.style.opacity = '1';
    popup.addEventListener('click', hidePopup);
}

export function scrollUnlock() {
    document.body.style.overflowY = 'hidden';
}

export function scrollLock() {
    document.body.style.overflowY = 'auto';
}

export function hidePopup(event) {
    if( event.target.classList.contains('offer-form-popup') ||
        event.target.classList.contains('add-offer-popup') ||
        event.target.classList.contains('button-cancel')
    ) {
        event.preventDefault();
        nullStyleInput([form, formAddProduct]);
        popup.classList.add('hide-block');
        popupAddProduct.classList.add('hide-block');

        scrollLock();
    }
}

export function removeOffer(event) {
    if( event.target.classList.contains('action-menu-box-delete') ||
        event.target.classList.contains('delete')
        ) {
        let id = +this.getAttribute('value');
        deleteOffer(id);
        document.location.reload();
    }
}
export function fillFieldInformation() {
    let id = +this.parentElement.parentElement.getAttribute('value') - 1;
    
    // Array.from(form).forEach((formElem) => {
    //     // formElem.value = '';
        
    // })
    (async () => {
        const offers = await fetchOffers();
        let offer = offers[id];
        form.setAttribute('value', id + 1);
        form.title.value = offer.title;
        form.photo.value = offer.photo;
        form.description.value = offer.description;
        form.price.value = offer.price;
        form.manufacturer.value = offer.manufacturer;
    })();
}

function makeChanges(event) {
    let body = {};
    body.id = +form.getAttribute('value');
    body.title = form.title.value;
    body.photo = form.photo.value;
    body.description = form.description.value;
    body.price = form.price.value;
    body.manufacturer = form.manufacturer.value;

    let count = 0;


    isValid(form.title, 15, 45);
    isValid(form.photo, 1, 200);
    isValid(form.description, 20, 150);
    isValid(form.price, 1);
    isValid(form.manufacturer, 1, 20);

    for (let elem of formElem) {
        if (elem.nextElementSibling) {
            count++;
        }
    }
    

    if (count === 0) {
        modifyOffer(body);
    }else {
        event.preventDefault();
    }
}

export function nullStyleInput (arrForms) {
    for (let form of arrForms) {
        let arr = [form.title, form.description, form.price, form.photo, form.manufacturer];

        for (let elem of arr) {
            elem.style.border = 'none';
            elem.style.borderRadius = '0';
            elem.style.borderBottom = '1.5px solid #ccc';
            elem.value = '';

            elem.onfocus = () => {
                elem.style.border = 'none';
                elem.style.borderRadius = '0';
                elem.style.borderBottom = '1.5px solid blue';
                elem.previousElementSibling.style.color = 'blue';
                elem.previousElementSibling.lastElementChild.style.color = 'red';
            }

            elem.onblur = () => {
                
                elem.style.borderBottom = '1.5px solid #ccc';
                elem.previousElementSibling.style.color = '#808080';
                elem.previousElementSibling.lastElementChild.style.color = '#808080';
            }

            if (elem.nextElementSibling) {
                elem.nextElementSibling.remove();
            }
        }
    }
}