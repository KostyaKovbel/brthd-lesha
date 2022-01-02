window.addEventListener('load', () => {
  const firstScreenWrapper = document.querySelector('#uklon-app .welcomePage')
  const firstScreenButton = document.querySelector('#uklon-app .welcomePageButton')
  const logo = document.querySelector('#uklon-app .logoSvg')
  const resultWrapper = document.querySelector('#uklon-app .result')
  const playAreaWrapper = document.querySelector('#uklon-app .playArea')
  const playPage = document.querySelector('#uklon-app .playPage')
  const resultButton = document.querySelector('#uklon-app .share')
  const bgImage = document.querySelector('#uklon-app .playBg')
  const playAreaWrapperHeight = playAreaWrapper.clientHeight - 16;
  const playAreaWrapperWidth = playAreaWrapper.clientWidth - 16;

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  let points = 0
  let items = 16
  let smCleaned = 0
  let mdCleaned = 0
  let lgCleaned = 0

  if (bgImage) {
    window.innerWidth > 990 ? bgImage.setAttribute('src', './assets/background.jpg') : bgImage.setAttribute('src', './assets/backgroundMobile.jpg')
  }

  if (firstScreenButton) {
    firstScreenButton.addEventListener('click', () => {
      firstScreenWrapper.classList.add('hidden')
      setTimeout(() => {
        logo.classList.add('visible')
        setTimeout(() => {
          logo.classList.remove('visible')
          playPage.classList.remove('hidden')
          setTimeout(() => {
            firstScreenWrapper.classList.add('removed')
            setTimeout(() => {
              createItems()
            }, 400);
          }, 500);
        }, 1000);
      }, 500);
    })
  }

  const createItems = () => {
    for (let i = 0; i <= items; i++) {
      if (i < 2) {
        createLgItem()
      } else if (i < 8) {
        createMdItem()
      } else {
        createSmItem()
      }
    }
  }

  const createLgItem = () => {
    const newEl = document.createElement('img')
    newEl.setAttribute('src', `./assets/big-${getRandomInt(1, 5)}.png`)
    const currentTop = Math.random() * playAreaWrapperHeight - 48 < 0 ? 16 : Math.random() * playAreaWrapperHeight - 48;
    const currentLeft = Math.random() * playAreaWrapperWidth - 120 < 0 ? 16 : Math.random() * playAreaWrapperWidth - 120;

    newEl.innerText = 'Реклама'
    newEl.classList.add('banner')
    newEl.classList.add('bannerLg')
    newEl.style.top = currentTop + "px";
    newEl.style.left = (currentLeft < 16 ? 16 : currentLeft) + "px";
    newEl.addEventListener('click', () => {
      playAudio()
      points += 20
      lgCleaned += 1
      resultWrapper.innerText = `Получено сумок: ${points}`
      newEl.classList.add('hidden')
      setTimeout(() => {
        newEl.remove()
      }, 300);
      setTimeout(() => {
        createLgItem()
      }, 5000);
    })

    playAreaWrapper.appendChild(newEl)
  }

  const createMdItem = () => {
    const newEl = document.createElement('img')
    newEl.setAttribute('src', `./assets/middle-${getRandomInt(1, 5)}.png`)
    const currentTop = Math.random() * playAreaWrapperHeight - 40 < 0 ? 16 : Math.random() * playAreaWrapperHeight - 40;
    const currentLeft = Math.random() * playAreaWrapperWidth - 88 < 0 ? 16 : Math.random() * playAreaWrapperWidth - 88;

    newEl.innerText = 'Реклама'
    newEl.classList.add('banner')
    newEl.classList.add('bannerMd')
    newEl.style.top = currentTop + "px";
    newEl.style.left = (currentLeft < 16 ? 16 : currentLeft) + "px";
    newEl.addEventListener('click', () => {
      playAudio()
      points += 13
      mdCleaned += 1
      resultWrapper.innerText = `Получено сумок: ${points}`
      newEl.classList.add('hidden')
      setTimeout(() => {
        newEl.remove()
      }, 300);
      setTimeout(() => {
        createMdItem()
      }, 5000);
    })

    playAreaWrapper.appendChild(newEl)
  }

  const createSmItem = () => {
    const newEl = document.createElement('img')
    newEl.setAttribute('src', `./assets/small-${getRandomInt(1, 5)}.png`)
    const currentTop = Math.random() * playAreaWrapperHeight - 28 < 0 ? 16 : Math.random() * playAreaWrapperHeight - 28;
    const currentLeft = Math.random() * playAreaWrapperWidth - 64 < 0 ? 16 : Math.random() * playAreaWrapperWidth - 64;

    newEl.innerText = 'Реклама'
    newEl.classList.add('banner')
    newEl.classList.add('bannerSm')
    newEl.style.top = currentTop + "px";
    newEl.style.left = (currentLeft < 16 ? 16 : currentLeft) + "px";
    newEl.addEventListener('click', () => {
      playAudio()
      points += 4
      smCleaned += 1
      resultWrapper.innerText = `Получено сумок: ${points}`
      newEl.classList.add('hidden')
      setTimeout(() => {
        setTimeout(() => {
          newEl.remove()
        }, 300);
        createSmItem()
      }, 5000);
    })

    playAreaWrapper.appendChild(newEl)
  }


  const copyResult = (event) => {
    event.preventDefault()
    const el = document.createElement('textarea');
    el.value = 'http://vctr.media/igra-skolko-sumok-mozhno-sdelat-iz-naruzhnoj-reklamy-66442';
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    resultButton.innerText = 'Cкопировано!'

    setTimeout(() => {
      resultButton.innerText = 'Поделитесь'
    }, 700);
  }

  const playAudio = () => {
    const audio = document.querySelector('audio')
    audio.currentTime = 0
    audio.play()
  }

  resultButton.addEventListener('click', copyResult)
})