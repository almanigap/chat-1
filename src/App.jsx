import React, { useEffect, useState, useRef } from 'react'

// Raw URLs provided by you — these reference your GitHub raw files
const ASSETS = {
  girl: 'https://raw.githubusercontent.com/almanigap/photo-sonnet/main/girl.png',
  boy: 'https://raw.githubusercontent.com/almanigap/photo-sonnet/main/boy.png',
  shadow: 'https://raw.githubusercontent.com/almanigap/photo-sonnet/main/saye_sefid.png',
  bg: 'https://raw.githubusercontent.com/almanigap/photo-sonnet/main/baground.jpg',
  zirmatn_girl: 'https://raw.githubusercontent.com/almanigap/photo-sonnet/main/zir_matn_banafsh_girl.png',
  zirmatn_boy: 'https://raw.githubusercontent.com/almanigap/photo-sonnet/main/zir_matn_banafsh_boy.png',
  font_comic: 'https://raw.githubusercontent.com/almanigap/font-sonnet/main/comic.ttf',
  font_iran: 'https://raw.githubusercontent.com/almanigap/font-sonnet/main/IRANSansDN.ttf'
}

// five sample slides (you asked me to create texts)
const SLIDES = [
  {
    girl: {
      de: 'Guten Morgen! Wie geht es dir?',
      pron: 'گوتِن مورگِن! وی گهت اس دیر؟',
      meaning: 'صبح بخیر! حالت چطوره؟'
    },
    boy: {
      de: 'Mir geht es gut, danke. Und dir?',
      pron: 'میر گهت اس گوت، دانکه. اونت دیر؟',
      meaning: 'من خوبم، ممنون. تو چطور؟'
    }
  },
  {
    girl: {
      de: 'Was machst du heute?',
      pron: 'واس ماخست دو هویته؟',
      meaning: 'امروز چکار می‌کنی؟'
    },
    boy: {
      de: 'Ich lerne Deutsch und höre Musik.',
      pron: 'ایش لرنه دویچ و هوره موزیک.',
      meaning: 'من آلمانی می‌خوانم و موسیقی گوش می‌دهم.'
    }
  },
  {
    girl: {
      de: 'Möchtest du später Kaffee trinken?',
      pron: 'مِش‌تِست دو شپترَ کافه ترینکن؟',
      meaning: 'دوست داری بعداً قهوه بخوریم؟'
    },
    boy: {
      de: 'Ja, gern. Um vier passt es mir.',
      pron: 'یا گِرن. اُم فیِر پاست اس میر.',
      meaning: 'بله خوشحال می‌شم. ساعت چهار برام مناسبه.'
    }
  },
  {
    girl: {
      de: 'Hast du Geschwister?',
      pron: 'هَست دو گِش‌ویستر؟',
      meaning: 'آیا خواهر/برادری داری؟'
    },
    boy: {
      de: 'Ja, ich habe eine Schwester und einen Bruder.',
      pron: 'یا، ایش هابه اینِه شوِستر اونت آی‌نِن بروودر.',
      meaning: 'بله، من یک خواهر و یک برادر دارم.'
    }
  },
  {
    girl: {
      de: 'Was ist dein Lieblingsessen?',
      pron: 'واس ایست داین لیبلینگز‌اسِن؟',
      meaning: 'غذای مورد علاقه‌ات چیه؟'
    },
    boy: {
      de: 'Ich mag Pizza und Schokolade.',
      pron: 'ایش ماگ پیستا اونت شُکولاتِه.',
      meaning: 'من پیتزا و شکلات دوست دارم.'
    }
  }
]

export default function App(){
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState('animating') // 'animating' | 'ready'
  const [underlineStep, setUnderlineStep] = useState(0) // 0 none,1 girl,2 boy
  const containerRef = useRef(null)
  const animTotal = 1500 * 4 // 4 steps each 1.5s

  useEffect(() => {
    // load fonts dynamically by injecting @font-face
    const style = document.createElement('style')
    style.innerHTML = `
      @font-face {
        font-family: 'ComicCustom';
        src: url('${ASSETS.font_comic}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'IRANSansDN';
        src: url('${ASSETS.font_iran}') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
    `
    document.head.appendChild(style)
    // start animation timer for initial slide
    setPhase('animating')
    setUnderlineStep(0)
    const t = setTimeout(()=> setPhase('ready'), animTotal)
    return ()=> {
      clearTimeout(t)
      document.head.removeChild(style)
    }
  }, [index])

  useEffect(() => {
    function onKey(e){
      if(e.key === 'ArrowRight'){
        if(phase !== 'ready') return
        if(underlineStep < 2){
          setUnderlineStep(s => Math.min(2, s+1))
        } else {
          // move to next slide
          setIndex(i => Math.min(SLIDES.length-1, i+1))
        }
      } else if (e.key === 'ArrowLeft'){
        if(phase !== 'ready') return
        if(underlineStep > 0){
          setUnderlineStep(s => Math.max(0, s-1))
        } else {
          setIndex(i => Math.max(0, i-1))
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return ()=> window.removeEventListener('keydown', onKey)
  }, [phase, underlineStep])

  function nextSlide(){
    setIndex(i => Math.min(SLIDES.length-1, i+1))
  }
  function prevSlide(){
    setIndex(i => Math.max(0, i-1))
  }

  function startPresentation(){
    // request fullscreen on container
    const el = containerRef.current
    if(!el) return
    if(document.fullscreenElement){
      document.exitFullscreen()
    } else {
      el.requestFullscreen?.()
    }
  }

  const slide = SLIDES[index]

  return (
    <div className="app" ref={containerRef}>
      <div className="controls">
        <button onClick={startPresentation}>Start Presentation (Toggle Fullscreen)</button>
        <button onClick={prevSlide} disabled={index===0}>Prev</button>
        <button onClick={nextSlide} disabled={index===SLIDES.length-1}>Next</button>
        <div className="status">Slide {index+1}/{SLIDES.length} — {phase}</div>
      </div>
      <div className="slide" style={{backgroundImage:`url(${ASSETS.bg})`}}>
        <div className={`bg-layer ${phase==='animating' ? 'step1' : 'visible'}`}></div>
        <div className={`characters ${phase==='animating' ? 'step2' : 'visible'}`}>
          <div className="left-character">
            <img className="shadow" src={ASSETS.shadow} alt="shadow"/>
            <img className="char" src={ASSETS.girl} alt="girl"/>
          </div>
          <div className="right-character">
            <img className="shadow" src={ASSETS.shadow} alt="shadow"/>
            <img className="char" src={ASSETS.boy} alt="boy"/>
          </div>
        </div>
        <div className={`text-bg ${phase==='animating' ? 'step3' : 'visible'}`}>
          <img className="zbg left" src={ASSETS.zirmatn_girl} alt="zbg-girl"/>
          <img className="zbg right" src={ASSETS.zirmatn_boy} alt="zbg-boy"/>
        </div>
        <div className={`texts ${phase==='animating' ? 'step4' : 'visible'}`}>
          <div className="text left">
            <div className={`quote ${underlineStep===1 ? 'underlined' : ''}`}>
              <div className="de">{slide.girl.de}</div>
              <div className="pron">{slide.girl.pron}</div>
              <div className="mean">{slide.girl.meaning}</div>
            </div>
          </div>
          <div className="text right">
            <div className={`quote ${underlineStep===2 ? 'underlined' : ''}`}>
              <div className="de">{slide.boy.de}</div>
              <div className="pron">{slide.boy.pron}</div>
              <div className="mean">{slide.boy.meaning}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="hint">Use Arrow keys — Right consumes underline steps then advances. Left reverses. Wait for animations to finish (about 6s) before using arrows.</div>
    </div>
  )
}
