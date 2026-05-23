/**
 * assets/js/utils/ui.js
 * 共享 UI 工具库
 */

window.App = window.App || {};

window.App.utils = {
  /**
   * 显示吐司通知
   * @param {string} msg 
   * @param {string} icon 
   */
  showToast(msg, icon = '✨') {
    if (typeof window.showToast === 'function') {
      window.showToast(msg, icon);
    } else {
      console.log(`[Toast] ${icon} ${msg}`);
    }
  },

  /**
   * 切换右侧 Tab
   * @param {HTMLElement} el 
   * @param {string} key 
   */
  switchRightTab(el, key) {
    if (typeof window.switchRightTab === 'function') {
      window.switchRightTab(el, key);
    }
  }
};
