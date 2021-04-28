const colors = [{
  themeId: 1,
  familyPrimary: '#B7A3FF',
  familySecondary: '#879FFF',
  sideBarTop: '#8981D8'
}, {
  themeId: 2,
  familyPrimary: '#FDC5C5',
  familySecondary: '#F070A0',
  sideBarTop: '#E7829F'
}, {
  themeId: 3,
  familyPrimary: '#414D6C',
  familySecondary: '#2D1E3C',
  sideBarTop: '#423C50'
}]


let myKey = 0
let customerColor = colors[myKey]

let cssText = `
.side-bar {
  background: linear-gradient(#B7A3FF, #879FFF) !important;
}

.side-bar .account-info {
  background: #8981D8 !important;
}`


function changeColor(text) {
  console.log(text)

  // 将 实际颜色值 #414D6C 替换成  familyPrimary
  let style = getStyleTemplate(text);
  console.log(style)

  writeNewStyle(style, customerColor)
}

/**
 * 实际颜色值 [#414D6C] 替换成 [familyPrimary]
 * @param {String} data
 * @returns
 */
function getStyleTemplate (data) {
  const colorMap = {
    '#B7A3FF': 'familyPrimary',
    '#879FFF': 'familySecondary',
    '#8981D8': 'sideBarTop'
  }
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })
  return data
}

/**
 *
 * @param {*} originalStyle
 * @param {*} colors
 */
function writeNewStyle (originalStyle, colors) {
  let oldEl = document.getElementById('temp-style')
  let cssText = originalStyle
  Object.keys(colors).forEach(key => {
    cssText = cssText.replace(new RegExp(key, 'ig'), colors[key])
  })
  const style = document.createElement('style')
  style.innerText = cssText
  style.id = 'temp-style'
  oldEl ? document.head.replaceChild(style, oldEl) : document.head.appendChild(style)
}

changeColor(cssText)

let btn = document.querySelector('.btn')
btn.addEventListener('click', function () {
  console.log(2)
  myKey = (myKey+1) % 3
  customerColor = colors[myKey]
  changeColor(cssText)
})
