window.addEventListener('load', () => {
  const firstScreenWrapper = document.querySelector('#uklon-app .welcomePage')
  const firstScreenButton = document.querySelector('#uklon-app .welcomePageButton')
  const resultWrapper = document.querySelector('#uklon-app .result')
  const playAreaWrapper = document.querySelector('#uklon-app .playArea')
  const playPage = document.querySelector('#uklon-app .playPage')
  const playAreaWrapperHeight = playAreaWrapper.clientHeight - 16;
  const playAreaWrapperWidth = playAreaWrapper.clientWidth - 16;
  const hpBarInner = document.querySelector('.hpBarInner')
  const hpBar = document.querySelector('.hpBar')

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
      if (smCleaned < 5) {
        setTimeout(() => {
          setTimeout(() => {
            newEl.remove()
          }, 300);
          createSmItem()
        }, 5000);
      } else if (smCleaned >= 15) {
        hpBar.classList.add('textDestroy')

        setTimeout(() => {
          triggerBoss()
        }, 300);
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

  const text = 'Welcome to the Hogwarts security system'

  const buildWelcomeText = (text) => {
    const wrapper = document.createElement('h2')

    for (const i of text) {
      const separateElement = document.createElement('span')
      separateElement.innerText = i


    }


  }

  const triggerBoss = () => {
    const bossWrapper = document.createElement('div')
    bossWrapper.classList.add('boss', 'bossAppear')
    const bossImage = document.createElement('img')
    bossImage.setAttribute('src', './assets/boss.png')
    bossWrapper.appendChild(bossImage)
    document.body.appendChild(bossWrapper)

    const bossFirstTextReply = document.createElement('div')
    const bossSecondTextReply = document.createElement('div')
    bossFirstTextReply.innerText = `Once upon a time, someone like you came here... with a scar, though not as grumpy as you, and without a beard, he caused a lot of trouble for my kids...`
    bossSecondTextReply.innerText = `I will not let you make them suffer again! Arghhh!!!!`
    bossFirstTextReply.classList.add('bossText')
    bossSecondTextReply.classList.add('bossText', 'bossText2')


    setTimeout(() => {
      bossWrapper.appendChild(bossFirstTextReply)

      setTimeout(() => {
        bossFirstTextReply.classList.add('textDestroy')
        setTimeout(() => {
          bossFirstTextReply.remove()
          bossWrapper.appendChild(bossSecondTextReply)

          setTimeout(() => {
            bossSecondTextReply.classList.add('textDestroy')
            setTimeout(() => {
              bossWrapper.classList.add('bossTrigger')
              hpBarInner.style.transform = `translateX(0)`
              hpBar.classList.remove('textDestroy')
              bossSecondTextReply.remove()
            }, 350);
          }, 2000);
        }, 350);
      }, 5000);
    }, 2300);
  }

  tremorRandomItem()

})