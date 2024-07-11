<template>
  <div>
    <p>時鐘翻牌</p>
    <div class="flex justify-between items-center w-150px gap-2px">
      <flipper ref="flipperHour1" />
      <flipper ref="flipperHour2" />
      <span>:</span>
      <flipper ref="flipperMinute1" />
      <flipper ref="flipperMinute2" />
      <span>:</span>
      <flipper ref="flipperSecond1" />
      <flipper ref="flipperSecond2" />
    </div>
  </div>
</template>

<script>
import Flipper from './Flipper.vue';
export default {
  name: 'FlipClock',
  components: { Flipper },
  data() {
    return {
      timer: null,
      flipObjs: [] // 存放各時間的 Flipper ref
    }
  },
  mounted() {
    this.init()
    // this.run()
  },
  methods: {
    // 初始化 時間的數字
    init() {
      // 建立 refs 以供使用子層的方法
      this.flipObjs = [
        this.$refs.flipperHour1,
        this.$refs.flipperHour2,
        this.$refs.flipperMinute1,
        this.$refs.flipperMinute2,
        this.$refs.flipperSecond1,
        this.$refs.flipperSecond2,
      ]
      const now = new Date()
      const nowStr = this.formatDate(now,'hhiiss')
      this.flipObjs.forEach((item, index)=>{
        item.setFont(nowStr[index]) // 使用子層的方法
      })
    },
    // 開始計時
    run() { 
      this.timer = setInterval(()=>{
        const now = Date.now() // 取得 毫秒數
        // 前一秒時間 (翻牌前牌面)
        const frontCardText = this.formatDate(new Date(now),'hhiiss')
        // 現在時間 (翻牌後牌面) 
        const backCardText = this.formatDate(new Date(now + 1000),'hhiiss')
        this.flipObjs.forEach((item, index)=>{
          if (frontCardText[index] === backCardText[index]) return 
          item.flipDown(frontCardText[index], backCardText[index])
        })

      }, 1000)
    },

    // 正则格式化日期
    formatDate(date, dateFormat) {
      /* 单独格式化年份，根据y的字符数量输出年份
     * 例如：yyyy => 2019
            yy => 19
            y => 9
     */
      if (/(y+)/.test(dateFormat)) {
        dateFormat = dateFormat.replace(
          RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
      }
      // 格式化月、日、时、分、秒
      let getDateData = {
        'm+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'i+': date.getMinutes(),
        's+': date.getSeconds()
      }

      for (let k in getDateData) {
        if (new RegExp(`(${k})`).test(dateFormat)) {
          // 取出对应的值
          let str = getDateData[k].toString()
          /* 根据设置的格式，输出对应的字符
           * 例如: 早上8时，hh => 08，h => 8
           * 但是，当数字>=10时，无论格式为一位还是多位，不做截取，这是与年份格式化不一致的地方
           * 例如: 下午15时，hh => 15, h => 15
           */
          dateFormat = dateFormat.replace(
            RegExp.$1,
            RegExp.$1.length === 1? str : str.padStart(2, '0') // 補0
          )
        }
      }
      return dateFormat
    },
  },

}
</script>

<style>
</style>