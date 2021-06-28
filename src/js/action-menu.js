
export const itemProducts = document.querySelectorAll('#item-product');

export function hideActionMenuBox() {
    const actionMenuBoxs = document.querySelectorAll('#action-menu-box');
    for(let actionMenuBox of actionMenuBoxs) {
        actionMenuBox.classList.add('hide-block');
        actionMenuBox.style.display = 'none';
    }
}
