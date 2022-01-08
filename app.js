window.addEventListener('load', () => {
  const firstScreenWrapper = document.querySelector('#uklon-app .welcomePage')
  const firstScreenButton = document.querySelector('#uklon-app .welcomePageButton')
  const resultWrapper = document.querySelector('#uklon-app .result')
  const playAreaWrapper = document.querySelector('#uklon-app .playArea')
  const playPage = document.querySelector('#uklon-app .playPage')
  const playAreaWrapperHeight = playAreaWrapper.clientHeight - 16;
  const playAreaWrapperWidth = playAreaWrapper.clientWidth - 16;
  const hpBar = document.querySelector('.hpBar')
  const hpBarInner = document.querySelector('.hpBarInner')
  const timeBar = document.querySelector('.timeBar')
  const timeBarInner = document.querySelector('.timeBarInner')
  const arrowsWrapper = document.querySelector('.keys')
  const leftButton = document.getElementById('ArrowLeft')
  const keys = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft']
  let currentActiveButton = 'ArrowLeft'

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  let items = 10
  let smCleaned = 0
  let isGameStarted = false
  let bossHp = 20

  if (firstScreenButton) {
    firstScreenButton.addEventListener('click', () => {
      firstScreenWrapper.classList.add('hidden')
      isGameStarted = true
      setTimeout(() => {
        playPage.classList.remove('hidden')
        triggerMainSound()
        setTimeout(() => {
          firstScreenWrapper.classList.add('removed')
          setTimeout(() => {
            createItems()
          }, 400);
        }, 500);
      }, 250);
    })
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !isGameStarted) {
      isGameStarted = true
      firstScreenWrapper.classList.add('hidden')
      setTimeout(() => {
        playPage.classList.remove('hidden')
        triggerMainSound()
        setTimeout(() => {
          firstScreenWrapper.classList.add('removed')
          setTimeout(() => {
            createItems()
          }, 400);
        }, 500);
      }, 250);
    }
  })

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
      triggerSpidersSound()
      newEl.classList.add('hidden')
      if (smCleaned < 5) {
        setTimeout(() => {
          setTimeout(() => {
            newEl.remove()
          }, 300);
          createSmItem()
        }, 5000);
      } else {
        setTimeout(() => {
          setTimeout(() => {
            newEl.remove()
          }, 300);
        }, 5000);
      }
      if (smCleaned >= 15) {
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

  const triggerSpidersSound = () => {
    const sound = document.createElement('audio')
    sound.setAttribute('src', './audio/spiderSound.mp3')
    document.body.appendChild(sound)
    sound.style.opacity = 0
    sound.style.position = 'absolute'
    sound.play()
    sound.volume = 0.1
    setTimeout(() => {
      sound.remove()
    }, 1000);
  }

  const triggerMainSound = () => {
    const sound = document.createElement('audio')
    sound.setAttribute('src', './audio/intro.mp3')
    sound.setAttribute('id', 'intro')
    document.body.appendChild(sound)
    sound.style.opacity = 0
    sound.style.position = 'absolute'
    sound.play()
    sound.volume = 0.05
  }

  const bossFightSound = () => {
    const sound = document.createElement('audio')
    sound.setAttribute('src', './audio/battle.mp3')
    document.body.appendChild(sound)
    sound.style.opacity = 0
    sound.style.position = 'absolute'
    sound.play()
    sound.volume = 0.2
  }

  const bossFightTrigger = () => {
    arrowsWrapper.classList.remove('keysHidden')
    timeBar.style.opacity = 1
    timeBarInner.style.transition = '10s all linear'
    timeBarInner.style.transform = 'translateX(-100%)'
    leftButton.classList.add(currentActiveButton)

    document.addEventListener('keydown', (event) => {
      if (event.key === currentActiveButton) {
        bossHp -= 1

        if (bossHp < 1) {
          hpBarInner.style.transform = `translateX(-100%)`
          arrowsWrapper.classList.add('keysHidden')

          const bossSecondTextReply = document.createElement('div')
          bossSecondTextReply.innerText = `ShhhhhSHhsh... Youuu win....`
          bossSecondTextReply.classList.add('bossText', 'bossText2')

          setTimeout(() => {
            hpBar.style.opacity = 0
            timeBar.style.opacity = 0
          }, 500);

          setTimeout(() => {
            const lastPage = document.querySelector('.lastPage')
            lastPage.style.opacity = 1
            lastPage.style.zIndex = 100
            lastPage.style.pointerEvents = 'all'
          }, 1500);
        } else {
          const currKey = document.getElementById(currentActiveButton)
          currKey.classList.remove(currentActiveButton)
          timeBarInner.style.transition = '1s all linear'
          timeBarInner.style.transform = 'translateX(0)'
          const nextArrow = keys[getRandomInt(0, keys.length - 1)]
          currentActiveButton = nextArrow
          console.log(((20 - bossHp) / 2) * 10, 'hp');
          hpBarInner.style.transform = `translateX(-${((20 - bossHp) / 2) * 10}%)`
          setTimeout(() => {
            timeBarInner.style.transition = '10s all linear'
            timeBarInner.style.transform = 'translateX(-100%)'
            const nextKey = document.getElementById(currentActiveButton)
            nextKey.classList.add(currentActiveButton)
          }, 1000);
        }
      }
    })
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
              bossFightSound()
              hpBarInner.style.transform = `translateX(0)`
              hpBar.classList.remove('textDestroy')
              bossSecondTextReply.remove()
              bossFightTrigger()
            }, 350);
          }, 2000);
        }, 350);
      }, 5000);
    }, 2300);
  }

  tremorRandomItem()

})