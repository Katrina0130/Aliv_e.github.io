const siteContent = window.siteContent || {};
const defaultContent = {
  profile: {
    nameZh: '陈佳怡',
    nameEn: 'Chen Jiayi',
    titleZh: '莫待无花空折枝',
    titleEn: 'Gather flowers while they bloom',
    introBadgeZh: '尚在探索自我和世界中的生活文艺爱好者',
    introBadgeEn: 'A life & arts lover, still exploring self and world',
    summaryZh: '这里存放我的阅读、音乐、生活与不定期的思考。慢慢走，也慢慢记录。',
    summaryEn: 'A home for my reading, music, everyday life, and occasional thoughts. Moving slowly, and keeping notes along the way.'
  },
  modules: [],
  follow: [],
  sections: {}
};

const mergedContent = Object.assign({}, defaultContent, siteContent);

function renderHomePage() {
  const profile = mergedContent.profile || defaultContent.profile;

  const brand = document.querySelector('.brand');
  if (brand) {
    brand.dataset.zh = profile.nameZh;
    brand.dataset.en = profile.nameEn;
    brand.innerHTML = `${profile.nameZh}<small>CHEN JIAYI</small>`;
  }

  const badge = document.querySelector('.pill');
  if (badge) {
    badge.dataset.zh = profile.introBadgeZh;
    badge.dataset.en = profile.introBadgeEn;
    badge.textContent = profile.introBadgeZh;
  }

  const titleWord = document.querySelector('.hero-slogan');
  if (titleWord) {
    titleWord.dataset.zh = profile.titleZh;
    titleWord.dataset.en = profile.titleEn;
    titleWord.textContent = profile.titleZh;
  }

  const summary = document.querySelector('.summary');
  if (summary) {
    summary.dataset.zh = profile.summaryZh;
    summary.dataset.en = profile.summaryEn;
    summary.textContent = profile.summaryZh;
  }

  const moduleGrid = document.querySelector('.module-grid');
  if (moduleGrid && mergedContent.modules.length) {
    moduleGrid.innerHTML = mergedContent.modules.map(item => `
      <a class="module" href="${item.href}">
        <span class="icon">${item.icon}</span>
        <strong data-zh="${item.labelZh}" data-en="${item.labelEn}">${item.labelZh}</strong>
        <small data-zh="${item.captionZh}" data-en="${item.captionEn}">${item.captionZh}</small>
        <b>↗</b>
      </a>
    `).join('');
  }

  const followList = document.querySelector('.follow');
  if (followList && mergedContent.follow.length) {
    followList.innerHTML = mergedContent.follow.map(item => `
      <a href="${item.href || '#'}" target="${item.href && item.href.startsWith('http') ? '_blank' : '_self'}" rel="noreferrer">
        <span>${item.icon}</span>
        <small data-zh="${item.labelZh}" data-en="${item.labelEn}">${item.labelZh}</small>
      </a>
    `).join('');
  }

  Object.entries(mergedContent.sections || {}).forEach(([id, config]) => {
    const section = document.getElementById(id);
    if (!section) return;
    const eyebrow = section.querySelector('.eyebrow');
    if (eyebrow) {
      eyebrow.textContent = config.eyebrow;
    }

    const title = section.querySelector('.detail-title');
    if (title) {
      title.dataset.zh = config.titleZh;
      title.dataset.en = config.titleEn;
      title.textContent = config.titleZh;
    }

    const body = section.querySelector('.content-card p, .content-card .note');
    if (body) {
      body.dataset.zh = config.textZh;
      body.dataset.en = config.textEn;
      body.textContent = config.textZh;
    }

    const meta = section.querySelector('.content-card .meta');
    if (meta && config.metaZh) {
      meta.dataset.zh = config.metaZh;
      meta.dataset.en = config.metaEn || config.metaZh;
      meta.textContent = config.metaZh;
    }

    const link = section.querySelector('.content-card a');
    if (link && config.link) {
      link.href = config.link;
      link.target = '_blank';
      link.rel = 'noreferrer';
      link.textContent = config.linkLabelZh || config.link;
      link.dataset.zh = config.linkLabelZh || config.link;
      link.dataset.en = config.linkLabelEn || config.link;
    }

    const image = section.querySelector('.content-card img');
    if (image && config.image) {
      image.src = config.image;
      image.alt = config.titleZh || config.titleEn || 'image';
    }
  });
}

let language = localStorage.getItem('cjy-lang') || 'zh';

function changeLanguage(l) {
  language = l;
  document.documentElement.lang = l === 'zh' ? 'zh-CN' : 'en';
  document.querySelectorAll('[data-zh]').forEach(el => {
    el.innerHTML = el.dataset[l];
  });

  const brand = document.querySelector('.brand');
  if (brand) {
    brand.innerHTML = `${l === 'zh' ? mergedContent.profile.nameZh : mergedContent.profile.nameEn}<small>CHEN JIAYI</small>`;
  }

  const h1 = document.querySelector('.hero h1');
  if (h1) {
    const name = l === 'zh' ? mergedContent.profile.nameZh : mergedContent.profile.nameEn;
    const subtitle = l === 'zh' ? mergedContent.profile.titleZh : mergedContent.profile.titleEn;
    const heroName = h1.querySelector('.hero-name');
    if (heroName) {
      heroName.textContent = name;
      heroName.classList.toggle('multiline-name', l === 'zh');
    }
    const slogan = h1.querySelector('.hero-slogan');
    if (slogan) {
      slogan.dataset.zh = mergedContent.profile.titleZh;
      slogan.dataset.en = mergedContent.profile.titleEn;
      slogan.textContent = subtitle;
    }
  }

  const langButton = document.querySelector('.lang');
  if (langButton) {
    langButton.textContent = l === 'zh' ? 'EN' : '中文';
  }

  localStorage.setItem('cjy-lang', l);
}

document.addEventListener('DOMContentLoaded', () => {
  renderHomePage();
  const langButton = document.querySelector('.lang');
  if (langButton) {
    langButton.addEventListener('click', () => changeLanguage(language === 'zh' ? 'en' : 'zh'));
  }
  changeLanguage(language);
});

