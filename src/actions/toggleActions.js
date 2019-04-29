import store from '../stores/store'

export const toggleInstaGrid = () => {
  store.animate = {
    left: true,
    right: false
  }
  store.toggle = {
    user: false,
    grid: true,
    menu: false
  }
}

export const toggleInstaUser = () => {
  store.animate = {
    left: false,
    right: true
  }
  store.toggle = {
    user: true,
    grid: false,
    menu: false
  }
}

export const toggleMenu = () => store.toggle.menu = !store.toggle.menu
