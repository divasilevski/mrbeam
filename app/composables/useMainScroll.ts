export default function () {
  const getScrollElement = () => {
    const simplebar = document.querySelector('#main-scroll')
    return simplebar?.querySelector('.simplebar-content-wrapper')
  }

  const scrollTo = (options: ScrollToOptions) => {
    const el = getScrollElement()
    el?.scrollTo(options)
  }

  return { scrollTo, getScrollElement }
}
