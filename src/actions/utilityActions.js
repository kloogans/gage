export const scrollToTop = () => window.scroll({ top: 0, behavior: 'smooth' })

export const formatNum = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
