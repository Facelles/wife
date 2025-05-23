// Сервіс для визначення типу пристрою
export const DeviceType = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  DESKTOP: 'desktop'
}

export const useDevice = () => {
  const getDeviceType = () => {
    const userAgent = navigator.userAgent.toLowerCase()
    const width = window.innerWidth

    // Перевіряємо чи це iOS пристрій
    const isIOS = /iphone|ipad|ipod/.test(userAgent)
    
    // Перевіряємо чи це Android пристрій
    const isAndroid = /android/.test(userAgent)

    // Визначаємо тип пристрою на основі ширини екрану
    if (width <= 640) {
      return DeviceType.MOBILE
    } else if (width <= 1024) {
      return DeviceType.TABLET
    } else {
      return DeviceType.DESKTOP
    }
  }

  const isMobile = () => getDeviceType() === DeviceType.MOBILE
  const isTablet = () => getDeviceType() === DeviceType.TABLET
  const isDesktop = () => getDeviceType() === DeviceType.DESKTOP
  const isIOS = () => /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
  const isAndroid = () => /android/.test(navigator.userAgent.toLowerCase())

  return {
    getDeviceType,
    isMobile,
    isTablet,
    isDesktop,
    isIOS,
    isAndroid
  }
} 