<template>
  <!-- 外誆 -->
  <div class="flip" :class="flipClass" :style="flipClass.includes('go')?`animation-duration:${duration/1000}s`:''">
    <!-- 前面紙牌 -->
    <div class="digital front" :data-attr="frontCardText"></div>
    <!-- 後面紙牌 -->
    <div class="digital back" :data-attr="backCardText"></div>
  </div>
</template>

<script>
export default {
  name: 'FlipClock',
  props: {
    frontText: { // 前面紙牌文字
      type: [Number, String],
      default: 0
    },
    backText: { // 後面紙牌文字
      type: [Number, String],
      default: 1
    },
    duration: { // 動畫時間
      type: Number,
      default: 500
    }
  },
  data() {
    return {
      isFlipping: false,
      flipClass: '',
      frontCardText: 0,
      backCardText: 1,
    }
  },
  created() {
    this.frontCardText = this.frontText
    this.backCardText = this.backText
  },
  methods: {
    flip(type, front, back) {
      if (this.isFlipping) {return}
      this.setFont(front)
      this.setBack(back)
      this.flipClass = `go  ${type}`// 添加 控制翻轉動畫 class
      this.isFlipping = true // 翻轉狀態
      setTimeout(()=>{
        this.flipClass = '' // 清除 控制翻轉動畫 class
        this.isFlipping = false // 翻轉狀態
        this.setFont(back) // 前排文字為翻牌後當前文字
      }, this.duration)
    },
    flipDown(front, back) {
      this.flip('down',front, back)
    },
    setFont(str) {
      this.frontCardText = str
    },
    setBack(str) {
      this.backCardText = str
    },
    
  },
}
</script>

<style scoped>
/* 翻牌動畫 */
/* 目前數字上半部往下翻 */
@keyframes frontFlipDown {
  0% { transform: rotateX(0deg) }
  100% { transform: rotateX(-180deg) }
}
/* 下一個數字下半部往下翻 */
@keyframes backFlipDown {
  0% { transform: rotateX(180deg) }
  100% { transform: rotateX(0deg) }
}

/* 目前數字下半部往上翻 */
@keyframes frontFlipUp {
  0% { transform: rotateX(0deg) }
  100% { transform: rotateX(180deg) }
}
/* 前一個數字上半部往上翻 */
@keyframes backFlipUp {
  0% { transform: rotateX(-180deg) }
  100% { transform: rotateX(0deg) }
}
/* 翻牌基本樣式 */
.flip {
  @apply relative w-20px h-30px rounded-5px text-white text-center font-quantico mx-auto flex-1;
  box-shadow: 0 0 6px rgba(0, 0, 0, .5);
  .digital{
    &::before, &::after {
      @apply absolute left-0 right-0 bg-black overflow-hidden box-border text-5;
      content: attr(data-attr);
    }
    &::before {
      @apply top-0 bottom-1/2 rounded-t-5px border-b-1px border-b-solid border-#666 leading-30px;
      /* leading 半張紙牌高的兩倍 = 整個翻牌的高度 */
    }
    &::after {
      @apply bottom-0 top-1/2 rounded-b-5px leading-0;
    }
  }
  .front {
    &::before, &::after {
      @apply z-1;
    }
  }
}

/* 向下翻 之前*/
.flip.down {
  .front:before {
    @apply z-3;
  }
  .front:after {
    @apply z-1;
  }
  .back:before {
    @apply z-1;
  }
  /* 下一個數字的下半部 翻轉到上面 */
  .back:after {
    @apply z-2 origin-top rotate-x-180;
    perspective: 150px;
  }
}
/* 向上翻 之前*/
.flip.up {
  .front:before {
    @apply z-1;
  }
  .front:after {
    @apply z-3;
  }
  .back:before {
    @apply z-2 origin-bottom rotate-x-[-180];
    perspective: 150px;
  }
  .back:after {
    @apply z-1 ;
  }
}
/* 向下翻 */
.flip.down.go {
  .front:before {
    @apply origin-bottom;
    box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
    animation: frontFlipDown 0.5s ease-in-out both;
    backface-visibility: hidden;
  }
  .back:after {
    animation: backFlipDown 0.5s ease-in-out both;
  }
}
/* 向上翻 */
.flip.up.go {
  .front:after {
    @apply origin-top;
    box-shadow: 0 -2px 6px rgba(255, 255, 255, 0.3);
    animation: frontFlipUp 0.5s ease-in-out both;
    backface-visibility: hidden;
  }
  .back:before {
    animation: backFlipUp 0.5s ease-in-out both;
  }
}
</style>
