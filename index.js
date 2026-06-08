import { menuArray } from './data.js'
const menu = document.getElementById('menu')

function renderMenu() {
    let menuHtml = ''

    menuHtml = menuArray.map((foodItem) => {

        const { name, ingredients, id, price, emoji } = foodItem

        return `
            <div class="menu-item">
                <p class="food-emoji">${emoji}</p>

                <div class="menu-info">
                    <h2>${name}</h2>
                    <h3>${ingredients}</h3>
                    <h4>$${price}</h4>
                </div>

                <img class="add-item-img" src="./images/add-btn.png">
            </div>
        `
    }).join('')

    menu.innerHTML = menuHtml;
}

renderMenu()
