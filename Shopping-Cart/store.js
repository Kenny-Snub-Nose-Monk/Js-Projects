import items from "./items.json"
import formatCurrency from "./util/formatCurrency.js"
import { addItemToCart } from "./shopcart.js"

const storeContainer = document.querySelector("[data-store-container]")
const STORE_IMAGE_SIZE_LENGTH = 420
const STORE_IMAGE_SIZE_WITH = 260

export function storeSetup() {
  if (storeContainer == null) return

  storeContainer.innerHTML = ""
  items.forEach(item => renderStore(item))

  addItemToCart()
}

function renderStore(item) {
  const storeItemTemplate = document
    .querySelector("#data-store-item-template")
    .content.cloneNode(true)

  const itemID = storeItemTemplate.querySelector("[data-store-item-id]")

  const itemPicture = storeItemTemplate.querySelector(
    "[data-store-item-picture]"
  )
  const itemCategory = storeItemTemplate.querySelector(
    "[data-store-item-category]"
  )
  const itemName = storeItemTemplate.querySelector("[data-store-item-name]")
  const itemPrice = storeItemTemplate.querySelector("[data-store-item-price]")

  itemID.setAttribute("data-store-item-id", item.id)

  //dummyimage.com/420x260/F00/F00
  itemPicture.src = `https://dummyimage.com/${STORE_IMAGE_SIZE_LENGTH}x${STORE_IMAGE_SIZE_WITH}/${item.imageColor}/${item.imageColor}`

  itemCategory.innerText = item.category
  itemName.innerText = item.name
  itemPrice.innerText = formatCurrency(item.price)
  // item.priceCents
  storeContainer.appendChild(storeItemTemplate)
}

// {
//   "id": 3,
//   "name": "Blue",
//   "category": "Primary Color",
//   "priceCents": 1200,
//   "imageColor": "00F"
// },
