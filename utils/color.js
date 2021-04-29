//参考链接：https://www.zhangxinxu.com/wordpress/2010/03/javascript-hex-rgb-hsl-color-convert/

/**
 * RGB颜色转换为十六进制
 */
export function rgb2Hex(rgbColor) {
  //十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(rgbColor)) {
    let aColor = rgbColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',')
    let strHex = '#'
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16)
      if (hex.length < 2) {
        hex = '0' + hex
      }
      strHex += hex
    }
    if (strHex.length !== 7) {
      strHex = rgbColor
    }
    return strHex
  } else if (reg.test(rgbColor)) {
    let aNum = rgbColor.replace(/#/, '').split('')
    if (aNum.length === 6) {
      return rgbColor
    } else if (aNum.length === 3) {
      let numHex = '#'
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i]
      }
      return numHex
    }
  }
  return rgbColor
}

/**
 * 十六进制颜色转为RGB
 */
export function hex2Rgb(hexColor) {
  let sColor = hexColor.toLowerCase()
  //十六进制颜色值的正则表达式
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#'
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1))
      }
      sColor = sColorNew
    }
    //处理六位的颜色值
    let sColorChange = []
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)))
    }
    return 'RGB(' + sColorChange.join(',') + ')'
  }
  return sColor
}

/**
 * HSL颜色值转换为RGB.
 * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
 * h, s, 和 l 设定在 [0, 1] 之间
 * 返回的 r, g, 和 b 在 [0, 255]之间
 *
 * @param  String  hslColor hsl(232,79% ,62%)
 * @return  String  rgbColor  rgb(82,102,235)
 */
export function hsl2Rgb(hslColor) {
  let [h, s, l] = hslColor.replace(/(?:\(|\)|hsl|HSL|%)*/g, '').split(',')
  let r, g, b

  if (s == 0) {
    r = g = b = l // achromatic
  } else {
    let hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }

    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  let rgb = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
  return `rgb(${rgb.join(',')})`
}

/**
 * RGB 颜色值转换为 HSL.
 * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
 * r, g, 和 b 需要在 [0, 255] 范围内
 * 返回的 h, s, 和 l 在 [0, 1] 之间
 *
 * @param   String  rgbColor
 * @return  String   hslColor
 */
export function rgb2Hsl(rgbColor) {
  let [r, g, b] = rgbColor
    .replace(/(?:\(|\)|rgb|RGB)*/g, '')
    .split(',')
    .map(d => Number(d))

  ;(r /= 255), (g /= 255), (b /= 255)
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b)
  let h,
    s,
    l = (max + min) / 2

  if (max == min) {
    h = s = 0 // achromatic
  } else {
    let d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  h = (h * 360).toFixed(0)
  s = (s * 100).toFixed(1)
  l = (l * 100).toFixed(1)

  return `hsl(${h},${s}%,${l}%)`
}
