const particleOptions = { 
  background: { 
    color: "rgb(10,10,25)", 
  }, 
  fpsLimit: 60, 
  particles: { 
    shape: { 
      type: "circle", 
    }, 
    size: { 
      random: { 
        enable: true, 
        minimumValue: 0.5, 
      }, 
      value: 1.4, 
    }, 
    color: { 
      value: "#f1f1f1", 
    }, 
    number: { 
      density: { 
        enable: true, 
        area: 1080, 
      }, 
      limit: 0, 
      value: 800, 
    }, 
    opacity: { 
      animation: { 
        enable: true, 
        minimumValue: 0.5, 
        speed: 1.6, 
        sync: false, 
      }, 
      random: { 
        enable: true, 
        minimumValue: 0.1, 
      }, 
      value: 1, 
    }, 
    interactivity: { 
      detectsOn: "canvas", 
      events: { 
        resize: true, 
      }, 
    }, 
  }, 
}
export default particleOptions;