// uno.config.js
import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  // 有新增字體，在此設定後便可以在 uno 中使用
  theme: {
    fontFamily: {
      quantico: 'Quantico',
    },
  },
  presets: [
    presetAttributify(),
    presetUno(),

  ],
  transformers: [
    transformerVariantGroup(),
  ],
});
