### line-height
利用 line-height 的特性達到排版的顯示效果
上半部牌面： 只顯示上半截號碼，設定 line-height 為容器高的兩倍
下半部牌面： 只顯示下半截號碼，設定 line-height 為 0

![image](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/11/24/16e9c7613684cea7~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)
### 新增字體
  > step 1: 加入字體
    將字體的 ttf 檔放入 src/assets/font 中

  > step 2: App.vue 引用字體
  ``` css
  @font-face {
    font-family: 'Quantico';  
    src: 
    url('../src/assets/font/Quantico-Regular.ttf') format('truetype'),
    url('../src/assets/font/Quantico-Bold.ttf') format('truetype'),
    url('../src/assets/font/Quantico-BoldItalic.ttf') format('truetype'),
    url('../src/assets/font/Quantico-Italic.ttf') format('truetype'); 
  }
  ```

  > step 3: uno.config.js 設定

  ``` js
    theme: {
      fontFamily: {
        quantico: 'Quantico',
      },
    }
  ```
  #### 實際使用
  ``` HTML
  <p class="ont-quantico"> </p>
  ```