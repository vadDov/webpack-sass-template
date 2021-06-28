
export function isValid(elem, minElemLen, maxElemLen = 4) {
    
    if (elem.value.length <  minElemLen ||
        elem.value.length > maxElemLen)
        {
            if (elem.nextElementSibling) {
                elem.nextElementSibling.remove();
            }
            if (elem.getAttribute('name') !== 'photo') {
                elem.insertAdjacentHTML('afterend', `<p style="color: red">number of characters from ${minElemLen} to ${maxElemLen}</p>`);
                elem.style.border = '1px solid red';
                elem.style.borderRadius = '5px';
            }
        } else {
            elem.style.border = 'none';
            elem.style.borderRadius = '0';
            elem.style.borderBottom = '1.5px solid #ccc';

            if (elem.nextElementSibling) {
                elem.nextElementSibling.remove();
            }

        }

    if (elem.getAttribute('name') === 'photo') {
        
        let img = document.createElement('img');
        img.src = elem.value;
        
        if (img.height === 0) {
            elem.insertAdjacentHTML('afterend', `<p style="color: red">it is impossible to load the image on the specified path</p>`);
            elem.style.border = '1px solid red';
            elem.style.borderRadius = '5px';
        }
    }
}