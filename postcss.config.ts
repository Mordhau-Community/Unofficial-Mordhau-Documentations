import { postcssIsolateStyles } from "vitepress";
import postcssRTLCSS from "postcss-rtlcss";

export default {
  plugins: [postcssIsolateStyles(), postcssRTLCSS()],
};
