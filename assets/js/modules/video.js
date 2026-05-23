/**
 * assets/js/modules/video.js
 * 视频模块逻辑
 */

(function() {
  const VDO_MODELS = [
    'https://sc01.alicdn.com/kf/A31cb120e0749445d8185cf16abdf16d5f.png',
    'https://sc01.alicdn.com/kf/A782fda6103d441fea26aca3880c0abe4b.png',
    'https://sc01.alicdn.com/kf/A13a52a95127c4fedb72e6f7c6aae6653Z.png',
    'https://sc01.alicdn.com/kf/Aa5cbb14087a64bb8a13268d6e86741bbQ.png'
  ];

  const VideoModule = {
    init() {
      this.renderModels();
    },

    switchModelTab(el, key) {
      const wrap = el.parentElement;
      wrap.querySelectorAll('.vdo-tab').forEach(t => t.classList.remove('active'));
      el.classList.add('active');
      const lib = document.getElementById('vdoModelGrid');
      const mine = document.getElementById('vdoMyModelPanel');
      if(key === 'lib') {
        lib.style.display = 'flex';
        mine.style.display = 'none';
        this.renderModels();
      } else {
        lib.style.display = 'none';
        mine.style.display = 'block';
      }
    },

    renderModels() {
      const grid = document.getElementById('vdoModelGrid');
      if(!grid) return;
      grid.innerHTML = VDO_MODELS.map(url => `
        <div class="j-model-item" onclick="videoModule.selectModel(this, '${url}')">
          <div style="background:url('${url}') center/cover; width:100%; height:100%;"></div>
          <div class="j-check-overlay"></div>
        </div>
      `).join('');
      const first = grid.querySelector('.j-model-item');
      if(first) this.selectModel(first, VDO_MODELS[0]);
    },

    addMyModel() {
      var inp=document.createElement('input');
      inp.type='file'; inp.accept='image/*';
      inp.onchange = () => {
        const file = inp.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = ev => {
          const url = ev.target.result;
          const grid = document.getElementById('vdoMyModelGrid');
          const newItem = document.createElement('div');
          newItem.className = 'j-model-item';
          newItem.innerHTML = `
            <div style="background:url('${url}') center/cover; width:100%; height:100%;"></div>
            <div class="j-check-overlay"></div>
          `;
          newItem.onclick = () => this.selectModel(newItem, url);
          grid.insertBefore(newItem, grid.firstChild);
          this.selectModel(newItem, url);
        };
        reader.readAsDataURL(file);
      };
      inp.click();
    },

    selectModel(el, url) {
      const grids = [document.getElementById('vdoModelGrid'), document.getElementById('vdoMyModelGrid')];
      grids.forEach(g => {
        if(g) g.querySelectorAll('.j-check-overlay').forEach(o => o.style.display = 'none');
      });
      const overlay = el.querySelector('.j-check-overlay');
      if(overlay) overlay.style.display = 'flex';
      console.log('Selected video model:', url);
    }
  };

  window.videoModule = VideoModule;
  // 兼容旧函数
  window.switchVdoModelTab = (...args) => VideoModule.switchModelTab(...args);
  window.renderVdoModels = (...args) => VideoModule.renderModels(...args);
  window.vdoAddMyModel = (...args) => VideoModule.addMyModel(...args);
})();
