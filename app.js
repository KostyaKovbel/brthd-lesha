window.addEventListener('load', () => {
  const firstScreenWrapper = document.querySelector('#uklon-app .welcomePage')
  const firstScreenButton = document.querySelector('#uklon-app .welcomePageButton')
  const resultWrapper = document.querySelector('#uklon-app .result')
  const playAreaWrapper = document.querySelector('#uklon-app .playArea')
  const playPage = document.querySelector('#uklon-app .playPage')
  const playAreaWrapperHeight = playAreaWrapper.clientHeight - 16;
  const playAreaWrapperWidth = playAreaWrapper.clientWidth - 16;
  const hpBarInner = document.querySelector('.hpBarInner')

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  let items = 10
  let smCleaned = 0

  if (firstScreenButton) {
    firstScreenButton.addEventListener('click', () => {
      firstScreenWrapper.classList.add('hidden')
        setTimeout(() => {
          playPage.classList.remove('hidden')
          setTimeout(() => {
            firstScreenWrapper.classList.add('removed')
            setTimeout(() => {
              createItems()
            }, 400);
          }, 500);
        }, 250);
    })
  }

  const createItems = () => {
    for (let i = 0; i <= items; i++) {
      createSmItem()
    }
  }

  const createSmItem = () => {
    const newEl = document.createElement('img')
    newEl.setAttribute('src', `./assets/spider.png`)
    const currentTop = Math.random() * playAreaWrapperHeight - 28 < 0 ? 16 : Math.random() * playAreaWrapperHeight - 28;
    const currentLeft = Math.random() * playAreaWrapperWidth - 128 < 0 ? 16 : Math.random() * playAreaWrapperWidth - 128;

    newEl.classList.add('banner')
    newEl.classList.add('bannerSm')
    newEl.classList.add('appear')
    newEl.style.top = currentTop + "px";
    newEl.style.left = (currentLeft < 16 ? 16 : currentLeft) + "px";

    setTimeout(() => {
      newEl.classList.remove('appear')
    }, 500);

    newEl.addEventListener('click', () => {
      smCleaned += 1
      hpBarInner.style.transform = `translateX(-${smCleaned * 6.5}%)`

      newEl.classList.add('hidden')
      if (smCleaned <= 5) {
        setTimeout(() => {
        setTimeout(() => {
          newEl.remove()
        }, 300);
          createSmItem()
      }, 5000);
      }
    })

    playAreaWrapper.appendChild(newEl)
  }

  const tremorRandomItem = () => {

    setInterval(() => {
      const spiders = document.querySelectorAll('.banner')
      const currentSpider = spiders[getRandomInt(0, spiders.length - 1)]

      if (currentSpider) {
        currentSpider.classList.add('tremor')

        setTimeout(() => {
          currentSpider.classList.remove('tremor')
        }, 500);
      }

    }, 1000);
  }

  tremorRandomItem()

})