import cloneDeep from 'loadsh/cloneDeep'

/**
 * 获取单位值
 * @param {Array} arr
 */
export function getUnit(unit) {
  return unit?.split(/:|：/)?.[1] ?? ''
}

/**
 * 获取数组最大值
 * @param {Array} arr
 */
export function calMax(arr) {
  let max = 0
  arr.forEach(d => {
    if (d.name === 'hidden') return false
    d.data.forEach(v => {
      if (v.value || v.value === 0) {
        if (max < v.value) {
          max = Number(v.value)
        }
      }
    })
  })
  const maxint = Math.ceil(max / 9.5) // 不让最高的值超过最上面的刻度
  const maxval = maxint * 10 // 让显示的刻度是整数
  return maxval
}

/**
 * 获取数组最小值
 * @param {Array} arr
 */
export function calMin(arr) {
  let min = 0
  arr.forEach(d => {
    if (d.name === 'hidden') return false
    d.data.forEach(v => {
      if (!(v.value === undefined || v.value === '')) {
        if (min > v.value) {
          min = Number(v.value)
        }
      }
    })
  })
  const minint = Math.floor(min / 10)
  const minval = minint * 10 // 让显示的刻度是整数
  return minval
}

/**
 * 给颜色加透明度
 * @param {String} color
 * @param {Number} opacity
 */
export function setColorOpacity(color, opacity) {
  if (opacity > 1 || opacity < 0) {
    console.error('opacity should be between 0~1')
    return color
  }
  let result = ''
  if (color.startsWith('#')) {
    /* 透明度转换成二进制 */
    let opacityStr = parseInt(255 * opacity).toString(16)
    /* 颜色加透明度 */
    result = color + opacityStr
  } else if (color.startsWith('rgb(') || color.startsWith('hsl(')) {
    let arr = color.split(/\(|\)/g)
    result = `${arr[0]}a(${arr[1]}, ${opacity})`
  } else {
    result = color
  }

  return result
}

/**
 * 设置颜色
 * @param {String|Array} color
 * @param {String} type
 * @param {Array} derection [0, 0, 0, 1] 左 上 右 下
 */
export function setColor(color, type = 'linear', derection = [0, 0, 0, 1]) {
  let colorType = Object.prototype.toString.call(color)
  if (colorType === '[object Array]') {
    const [startColor, endColor] = color
    if (type === 'linear') {
      let [x, y, x2, y2] = derection
      return {
        type: 'linear',
        x,
        y,
        x2,
        y2,
        colorStops: [
          {
            offset: 0,
            color: startColor, // 0% 处的颜色
          },
          {
            offset: 1,
            color: endColor, // 100% 处的颜色
          },
        ],
        globalCoord: false, // 缺省为 false
      }
    } else if (type === 'radial') {
      let [x, y, r] = derection
      return {
        type: 'linear',
        x,
        y,
        r,
        colorStops: [
          {
            offset: 0,
            color: startColor, // 0% 处的颜色
          },
          {
            offset: 1,
            color: endColor, // 100% 处的颜色
          },
        ],
        globalCoord: false, // 缺省为 false
      }
    } else {
      return Array.isArray(color) ? color[0] : color
    }
  } else {
    return color
  }
}

/**
 * 设置颜色
 * @param {String|Array} color
 * @param {Number} length
 */
export function getGradientColorList(color, length) {
  let result = []
  for (let i = 0; i < length; i++) {
    result.push(setColorOpacity(color, ((i + 1) / length).toFixed(2)))
  }
  return result
}

/**
 * 格式化日期
 * yyyy-MM-dd hh:mm:ss.S
 * yyyy-M-d h:m:s.S
 * @param {Date} dateValue date
 * @param {String} fmt yyyy-MM-dd hh:mm:ss.S
 * @return {String} dateStr
 */
export function format(dateValue, fmt) {
  if (fmt === undefined) {
    fmt = 'yyyy-MM-dd hh:mm:ss'
  }
  let date = new Date(dateValue)

  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

/**
 * 格式化数组 排序
 * @param {Array} list
 */
export function formatList(list, sort, isNullZero) {
  if (!Array.isArray(list)) {
    console.error('formatList的参数必须为数组')
    return []
  }

  let res = cloneDeep(list)
  /* 获取到所有data里的name */
  let allNames = res.reduce((prev, cur) => {
    let names = cur.data.map(d => d.name)
    return prev.concat(names)
  }, [])
  /* 去重 */
  let filterName = Array.from(new Set(allNames))
  /* 排序 */
  if (sort) {
    if (Object.prototype.toString.call(sort) === '[object Function]') {
      filterName.sort(sort)
    } else {
      if (sort === 'date') {
        filterName.sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
      } else {
        console.warn('快速排序目前只支持date排序')
      }
    }
  }
  /* 补全 */
  res.forEach(d => {
    d.data = filterName.map(v => {
      let value = d.data.find(o => o.name === v)?.value ?? (isNullZero ? 0 : null)
      return {
        name: v,
        value,
      }
    })
  })

  return res
}
