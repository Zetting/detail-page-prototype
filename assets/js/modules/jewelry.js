/**
 * assets/js/modules/jewelry.js
 * 珠宝模块逻辑
 */

(function() {
  const JEWELRY_DATA = {
    ring: [
      'https://sc01.alicdn.com/kf/A23de92a4dce7473ab9ca70c955cd7b34s.png',
      'https://sc01.alicdn.com/kf/A5a137d6359ac4757963406c0da65c9cbq.png'
    ],
    neck: [
      'https://sc01.alicdn.com/kf/A782fda6103d441fea26aca3880c0abe4b.png',
      'https://sc01.alicdn.com/kf/A13a52a95127c4fedb72e6f7c6aae6653Z.png',
      'https://sc01.alicdn.com/kf/Aa5cbb14087a64bb8a13268d6e86741bbQ.png',
      'https://sc01.alicdn.com/kf/A31cb120e0749445d8185cf16abdf16d5f.png'
    ],
    ear: [
      'https://sc01.alicdn.com/kf/A696dc8b68a204c669013969e04f97513m.png'
    ],
    wrist: [
      'https://sc01.alicdn.com/kf/A23de92a4dce7473ab9ca70c955cd7b34s.png',
      'https://sc01.alicdn.com/kf/A5a137d6359ac4757963406c0da65c9cbq.png'
    ],
    foot: [
      'https://sc01.alicdn.com/kf/A5d0c1208456a4885918fc16d557671fbf.png'
    ]
  };

  let selectedCat = 'ring';

  const JewelryModule = {
    init() {
      this.renderModels('ring');
    },

    renderModels(cat, genderFilter = 'all') {
      selectedCat = cat;
      const grid = document.getElementById('jewelryModelGrid');
      if (!grid) return;
      
      let baseData = JEWELRY_DATA[cat] || [];
      let displayData = [];
      for(let i=0; i<50; i++) {
        const url = baseData[i % baseData.length];
        const gender = (i % 3 === 0) ? 'male' : 'female';
        if(genderFilter === 'all' || genderFilter === gender) {
          displayData.push({url, gender});
        }
      }

      grid.innerHTML = displayData.map(item => `
        <div class="j-model-item" onclick="jewelryModule.selectModel(this, '${item.url}')">
          <div style="background:url('${item.url}') center/cover; width:100%; height:100%;"></div>
          <div class="j-check-overlay"></div>
          <div style="position:absolute; top:4px; right:4px; font-size:9px; background:rgba(0,0,0,0.3); color:#fff; padding:2px 4px; border-radius:4px;">${item.gender==='male'?'男':'女'}</div>
        </div>
      `).join('');
      
      const first = grid.querySelector('.j-model-item');
      if(first && genderFilter === 'all') this.selectModel(first, displayData[0].url);
    },

    selectModel(el, url) {
      const grids = [document.getElementById('jewelryModelGrid'), document.getElementById('jewelryMyModelGrid')];
      grids.forEach(g => {
        if(g) g.querySelectorAll('.j-check-overlay').forEach(o => o.style.display = 'none');
      });
      
      const check = el.querySelector('.j-check-overlay');
      if (check) check.style.display = 'flex';
      
      const bg = document.getElementById('jModelBg');
      if(bg && url) {
        bg.style.backgroundImage = `url('${url}')`;
        this.autoZoom(selectedCat);
      }
    },

    autoZoom(cat) {
      const bg = document.getElementById('jModelBg');
      if(!bg) return;
      if(cat === 'ring') bg.style.transform = 'scale(1.8) translateY(20%)';
      else if(cat === 'neck') bg.style.transform = 'scale(1.4) translateY(-10%)';
      else if(cat === 'ear') bg.style.transform = 'scale(2.2) translateY(-15%) translateX(10%)';
      else if(cat === 'wrist') bg.style.transform = 'scale(1.6) translateY(25%)';
      else if(cat === 'foot') bg.style.transform = 'scale(1.8) translateY(30%)';
      else bg.style.transform = 'scale(1)';
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
          const grid = document.getElementById('jewelryMyModelGrid');
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
    }
  };

  // 暴露给全局以便 legacy 代码调用
  window.jewelryModule = JewelryModule;
  // 兼容旧的函数名
  window.renderJewelryModels = (...args) => JewelryModule.renderModels(...args);
  window.selectJewelryModel = (...args) => JewelryModule.selectModel(...args);
  window.jewelryAddMyModel = (...args) => JewelryModule.addMyModel(...args);
})();
