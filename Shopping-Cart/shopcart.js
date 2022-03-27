import items from "./items.json"
import formatCurrency from "./util/formatCurrency.js"
import addGlobalEventListener from "./util/addGlobalEventListener.js"

const cartContainer = document.querySelector("[data-cart-container]")
const cartItemsContainer = document.querySelector("[data-cart-items-container]")
const cartItems = document.querySelector("[data-cart-items]")
const cartBtn = document.querySelector("[data-cart-btn]")
const cartItemsTotal = document.querySelector("[data-cart-total]")
const priceTotal = document.querySelector("[data-price-total]")

const STORE_IMAGE_SIZE_LENGTH = 210
const STORE_IMAGE_SIZE_WITH = 130
// const SESSION_KEY
const SESSION_STORAGE_KEY = "SHOPPING_CART-cart"
let itemsinCart = []

export function shopcartSetup() {
  cartBtn.addEventListener("click", e => {
    cartItemsContainer.classList.toggle("invisible")
  })

  renderCart()

  // const removeItemfromCartBtn = document.addEventListener("click", e => {
  //   if (e.target.matches("[data-remove-from-cart-button]")) {
  //     const id = parseInt(
  //       e.target
  //         .closest("[data-cart-item-id]")
  //         .getAttribute("data-cart-item-id")
  //     )
  //     removeItemFromCart(id)
  //   }
  // })
  addGlobalEventListener("click", "[data-remove-from-cart-button]", e => {
    const id = parseInt(
      e.target.closest("[data-cart-item-id]").getAttribute("data-cart-item-id")
    )
    removeItemFromCart(id)
  })
}

function renderCart() {
  cartItems.innerHTML = ""
  itemsinCart = loadCart()

  if (!itemsinCart.length) {
    cartContainer.classList.add("invisible")
  } else {
    cartContainer.classList.remove("invisible")
  }

  itemsinCart.forEach(item => {
    createItemtoCart(item.id)
    quantityDisplay(item, item.id)
  })
}

// Checking
function removeItemFromCart(id) {
  // remove item from Cart
  // Checking
  const existingItem = itemsinCart.find(entry => entry.id == id)
  if (existingItem == null) return
  itemsinCart = itemsinCart.filter(item => item.id != id)
  saveCart()
  renderCart()
}

export function addItemToCart() {
  const addItemBtns = document.querySelectorAll("[data-add-item-btn]")

  addItemBtns.forEach(itemBtn =>
    itemBtn.addEventListener("click", e => {
      const id = e.target
        .closest("[data-store-item-id]")
        .getAttribute("data-store-item-id")

      const targetItem = itemsinCart.find(item => item.id == id)
      const itemPrice = items.find(item => item.id == id).price
      if (targetItem) {
        targetItem.quantity = targetItem.quantity + 1
        quantityDisplay(targetItem, id)
      } else {
        createItemtoCart(id)
        itemsinCart.push({
          id: id,
          quantity: 1,
          price: parseInt(itemPrice),
        })
      }

      saveCart()
      renderCart()
    })
  )
}

function saveCart() {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(itemsinCart))
}

function loadCart() {
  const cart = sessionStorage.getItem(SESSION_STORAGE_KEY)
  return JSON.parse(cart) || []
}

// code improvement
function quantityDisplay(targetItem, id) {
  const quantity = targetItem.quantity > 1 ? `x${targetItem.quantity}` : ""
  const targetElement = cartItems.querySelector(`[data-cart-item-id="${id}"]`)
  targetElement.querySelector("[data-cart-item-count]").innerText = quantity

  const totalQuantity = itemsinCart.reduce(
    (previousValue, currentItem) => previousValue + currentItem.quantity,
    0
  )

  const totalPrice = itemsinCart.reduce(
    (previousValue, currentItem) =>
      previousValue + currentItem.price * currentItem.quantity,
    0
  )

  cartItemsTotal.innerText = totalQuantity
  priceTotal.innerText = formatCurrency(totalPrice)
}

function createItemtoCart(id) {
  const cartItemTemplate = document
    .querySelector("#data-cart-template")
    .content.cloneNode(true)

  const item = items.find(item => item.id == id)
  const itemID = cartItemTemplate.querySelector("[data-cart-item-id]")
  const itemPicture = cartItemTemplate.querySelector("[data-cart-item-picture]")
  const itemName = cartItemTemplate.querySelector("[data-cart-item-name]")
  const itemPrice = cartItemTemplate.querySelector("[data-cart-item-price]")

  itemID.setAttribute("data-cart-item-id", id)

  //dummyimage.com/420x260/F00/F00
  itemPicture.src = `https://dummyimage.com/${STORE_IMAGE_SIZE_LENGTH}x${STORE_IMAGE_SIZE_WITH}/${item.imageColor}/${item.imageColor}`
  itemName.innerText = item.name
  itemPrice.innerText = formatCurrency(item.price)
  cartItems.appendChild(cartItemTemplate)
}

// same item
