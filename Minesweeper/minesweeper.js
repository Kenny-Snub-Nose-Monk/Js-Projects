const boardContainer = document.querySelector(".board")
export const board = []
export const minePositions = []
export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
}

export function createTiles(boardSize, numberOfMine) {
  minePositionCreate(boardSize, numberOfMine)
  for (let x = 0; x < boardSize; x++) {
    const row = []
    for (let y = 0; y < boardSize; y++) {
      const element = document.createElement("div")
      boardContainer.style.setProperty("--size", boardSize)
      element.dataset.status = TILE_STATUSES.HIDDEN
      element.classList.add("tile")

      const tile = {
        element,
        x,
        y,
        mine: minePositions.some(checkMinePosition.bind(null, { x, y })),
        get status() {
          return this.element.dataset.status
        },
        set status(value) {
          this.element.dataset.status = value
        },
      }
      boardContainer.appendChild(element)
      row.push(tile)
    }
    board.push(row)
  }

  return board
}

export function revealTile(board, tile) {
  if (tile.status !== TILE_STATUSES.HIDDEN) {
    return
  }

  if (tile.mine) {
    tile.status = TILE_STATUSES.MINE
    return
  }

  const adjacentTiles = nearbyTile(board, tile)

  tile.status = TILE_STATUSES.NUMBER
  const mineNumber = calculateMineNumber(adjacentTiles)
  // console.log(adjacentTiles)
  // console.log(mineNumber)
  if (mineNumber === 0) {
    adjacentTiles.forEach(revealTile.bind(null, board))
  } else {
    tile.element.textContent = calculateMineNumber(adjacentTiles)
  }

  // if (tile.element.dataset.status === TILE_STATIS.HIDDEN) {

  // }
}

export function markTile(board, tile) {
  if (tile.status === TILE_STATUSES.NUMBER) return

  if (tile.status === TILE_STATUSES.HIDDEN) {
    console.log(tile.status)
    console.log(TILE_STATUSES.MARKED)
    tile.status = TILE_STATUSES.MARKED
  } else {
    tile.status = TILE_STATUSES.HIDDEN
  }
}

export function winTheGame() {
  return board.every(row => {
    return row.every(tile => {
      return (
        tile.status === TILE_STATUSES.NUMBER ||
        (tile.mine &&
          (tile.status === TILE_STATUSES.HIDDEN ||
            tile.status === TILE_STATUSES.MARKED))
      )
    })
  })
}

export function lostTheGame() {
  return board.some(row => {
    return row.some(tile => tile.status === TILE_STATUSES.MINE)
  })
}

function minePositionCreate(boardSize, numberOfMine) {
  while (minePositions.length < numberOfMine) {
    const x = randomMinePosition(boardSize)
    const y = randomMinePosition(boardSize)

    if (!minePositions.some(checkMinePosition.bind(null, { x, y }))) {
      minePositions.push({ x, y })
    }
  }
}

function calculateMineNumber(tiles) {
  const totalNumber = tiles.reduce((prev, curr) => {
    return prev + curr.mine
  }, 0)

  return totalNumber !== 0 ? totalNumber : 0
}

function checkMinePosition(a, b) {
  return a.x === b.x && a.y === b.y
}

function randomMinePosition(boardSize) {
  return Math.floor(Math.random() * boardSize)
}

function nearbyTile(board, { x, y }) {
  const tiles = []
  for (let xOffset = -1; xOffset <= 1; xOffset++) {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      const tile = board[x + xOffset]?.[y + yOffset]
      if (tile) tiles.push(tile)
    }
  }
  return tiles
}
