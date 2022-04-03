// 4. Check for win/lose

import {
  minePositions,
  createTiles,
  TILE_STATUSES,
  revealTile,
  markTile,
  winTheGame,
  lostTheGame,
} from "./minesweeper.js"

const boardContainer = document.querySelector(".board")
const minOfCount = document.querySelector("[data-mine-count]")
const gameResultDisplay = document.querySelector(".subtext")
const BOARD_SIZE = 10
const MINE_COUNT = 5

const board = createTiles(BOARD_SIZE, MINE_COUNT)
minOfCount.textContent = MINE_COUNT

board.forEach(row => {
  row.forEach(tile => {
    // boardContainer.append(tile.element)
    tile.element.addEventListener("click", () => {
      revealTile(board, tile)
      checkGameClose()
      // checkGameEnd()
    })
    tile.element.addEventListener("contextmenu", e => {
      e.preventDefault()
      markTile(board, tile)
      listMinesLeft()
    })
  })
})

function listMinesLeft() {
  const markedTilesCount = board.reduce((prev, curr) => {
    return (
      prev + curr.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    )
  }, 0)

  minOfCount.textContent = MINE_COUNT - markedTilesCount
}

function checkGameClose() {
  const win = winTheGame()
  const lost = lostTheGame()

  if (win || lost) {
    boardContainer.addEventListener("click", stopProp, { capture: true })
    boardContainer.addEventListener("contextmenu", stopProp, { capture: true })
  }

  if (winTheGame()) {
    gameResultDisplay.textContent = "Win the Game"
  }

  if (lostTheGame()) {
    gameResultDisplay.textContent = "Lose the Game"
    board.forEach(row => {
      row.forEach(tile => {
        if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
        if (tile.mine) revealTile(board, tile)
      })
    })
  }
}

function stopProp(e) {
  e.stopImmediatePropagation()
}

// document.addEventListener("click", e => {
//   board.forEach(row => {
//     row.forEach(tile => {
//       if (tile.element === e.target) {
//         revealTile(board, tile)
//       }
//     })
//   })
// })

// document.addEventListener("contextmenu", e => {
//   board.forEach(row => {
//     row.forEach(tile => {
//       if (tile.element === e.target) {
//         markTile(tile)
//       }
//     })
//   })
// })
