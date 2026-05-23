/**
 * assets/js/core/state.js
 * 全局状态桥接层 - 负责将旧的全局变量与新的模块系统连接
 */

window.App = window.App || {};

// 初始化或桥接现有的全局变量
window.App.state = {
  // 图片数据
  get imgs() { return window._imgs || []; },
  set imgs(val) { window._imgs = val; },

  // 珠宝历史
  get jewelryHistory() { return window._jHistory || []; },
  set jewelryHistory(val) { window._jHistory = val; },

  // 视频配置
  get vdoRatio() { return window._vdoRatio || '9:16'; },
  set vdoRatio(val) { window._vdoRatio = val; },
  
  get vdoStyle() { return window._vdoStyle || 'ugc'; },
  set vdoStyle(val) { window._vdoStyle = val; }
};

console.log('专业前端架构：State Bridge 已就绪');
