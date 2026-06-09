import { menuArray } from './data.js'
const menu = document.getElementById('menu')
const orderDetails = document.getElementById('order-details')
const orderItems = document.getElementById('order-items')
const orderTotal = document.getElementById('order-total')

let itemsAddedToOrder = []

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

                <img data-id="${id}" class="add-item-img" src="./images/add-btn.png">
            </div>
        `
    }).join('')

    menu.innerHTML = menuHtml;
}

renderMenu()

menu.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-item-img')) {
        const id = Number(e.target.dataset.id)

        if (!itemsAddedToOrder.some(item => item.id === id)) {
            itemsAddedToOrder.push(menuArray.find(item => item.id === id))
        }

        renderOrder()

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        })
    }
})

orderItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')) {
        const id = Number(e.target.dataset.id)
        itemsAddedToOrder = itemsAddedToOrder.filter(item => item.id !== id)
        renderOrder()
    }
})

function renderOrder() {
    if (itemsAddedToOrder.length === 0) {
        orderDetails.style.display = "none"
        return
    }

    const totalPrice = itemsAddedToOrder.reduce((total, item) => total + item.price, 0)

    let orderItemsHtml = ''
    orderItemsHtml = itemsAddedToOrder.map(item => {
        const { name, price, id } = item
        return `
            <div class="order-item">
                <h4>${name}</h4>
                <button data-id="${id}" class="remove-item-btn">remove</button>
                <h5>$${price}</h5>
            </div>
        `
    }).join('')

    orderItems.innerHTML = orderItemsHtml
    orderTotal.innerHTML = `
        <div class="total-price">
            <h4>Total price:</h4>
            <h4>$${totalPrice}</h4>
        </div>
    `

    orderDetails.style.display = "flex";
}