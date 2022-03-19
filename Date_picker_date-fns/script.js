import {
  format,
  getUnixTime,
  fromUnixTime,
  addMonths,
  subMonths,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns"
import { createElement } from "parse5/lib/tree-adapters/default"
import render from "posthtml-render"

const datePickerBtn = document.querySelector(".date-picker-btn")
const nextMonthBtn = document.querySelector(".btn-next-month")
const previousMonthBtn = document.querySelector(".btn-previous-month")
const calendarContainer = document.querySelector(".calendar-container")
const dateGrid = document.querySelector(".date-grid")
const calendarHeader = document.querySelector(".calendar-header")
let currentDate = new Date()

datePickerBtn.addEventListener("click", e => {
  calendarContainer.classList.toggle("show")

  const selectedDate = fromUnixTime(datePickerBtn.dataset.selectedDate)

  currentDate = selectedDate
  // update calendar header

  // update alldate-grid
  renderDate(selectedDate)

  // Highlight selected date
  const allDateElment = [...document.querySelectorAll(".date")]

  allDateElment.forEach(element => {
    const datetimeElement = new Date(element.dataset.date)
    element.classList.remove("selected")
    console.log(selectedDate.toISOString().split("T")[0])
    if (
      datetimeElement.toISOString().split("T")[0] ===
      selectedDate.toISOString().split("T")[0]
    ) {
      console.log("s")
      element.classList.add("selected")
    }
  })
})

function renderDate(selectedDate) {
  //Step 1: clear all element in date-grid
  while (dateGrid.firstChild) {
    dateGrid.removeChild(dateGrid.firstChild)
  }
  //Step 2: calculate all date in calendar
  const intervalDays = eachDayOfInterval({
    start: startOfWeek(startOfMonth(selectedDate)),
    end: endOfWeek(endOfMonth(selectedDate)),
  })

  // Step 3: Create element and append to date-grid
  intervalDays.forEach(date => createDateEl(date, selectedDate))
}

function createDateEl(date, selectedDate) {
  const element = document.createElement("div")
  element.classList.add("date")
  if (isSameMonth(date, selectedDate)) {
    element.classList.add("date-this-month")
  } else {
    element.classList.add("date-not-this-month")
  }
  element.dataset.date = date
  element.textContent = date.getDate()
  dateGrid.appendChild(element)
}

function setDate(date) {
  datePickerBtn.innerText = format(date, "MMMM do, yyyy")
  datePickerBtn.dataset.selectedDate = getUnixTime(date)
}

function setCalendarHeader(date) {
  calendarHeader.textContent = format(date, "MMMM-yyyy")
}

document.addEventListener("click", e => {
  if (
    e.target.classList.contains("date-this-month") ||
    e.target.classList.contains("date-not-this-month")
  ) {
    setDate(new Date(e.target.dataset.date))
    calendarContainer.classList.toggle("show")
  }
})

previousMonthBtn.addEventListener("click", () => {
  const previousMonthDate = startOfMonth(subMonths(currentDate, 1))
  renderDate(previousMonthDate)
  setCalendarHeader(previousMonthDate)
  currentDate = previousMonthDate
})

nextMonthBtn.addEventListener("click", () => {
  const nextMonthDate = startOfMonth(addMonths(currentDate, 1))
  console.log(nextMonthDate)
  renderDate(nextMonthDate)
  setCalendarHeader(nextMonthDate)
  currentDate = nextMonthDate
})

setDate(new Date())
