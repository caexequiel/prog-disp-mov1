/*Mayor que un número*/
function mayor() {
            // Obtener el valor del input
            let num1 = document.getElementById("num_1_1").value;
            let num2 = document.getElementById("num_1_2").value;
            let resp1 = "";

            // Convertimos el número a un número entero
            num1 = Number(num1);
            num2 = Number(num2);

            // Comparamos los números
            if (num1 > num2) {
                // El primer número es mayor
                resp1 ="El número mayor es: " + num1;
            } else if (num2 > num1) {
                // El segundo número es mayor
                resp1 = "El número mayor es: " + num2;
            } else if (isNaN(num2) || isNaN(num1)) {
                // El segundo número es mayor
                resp1 = "El número mayor es: " + num2;
            }
             else {
                // Los números son iguales
                resp1 = "Los números son iguales";
            }
            // Mostrar el resultado
            document.querySelector(".resultado1").textContent = resp1;
          }

    /*Categoría de edad*/
function categoriaEdad() { 
            // Obtener el valor del input
            let edad = document.getElementById("num_2").value;
            // Convertimos la edad a un número entero
            edad = Number(edad);

            let resp2 ="";

            // Determinamos la categoría de edad
            if (edad <= 0) {
              // Adolescente
              resp2 = "Todavía no naciste, coloca un número valido";
            }else if (edad < 18) {
                // Niño
                resp2 = "Eres un niño";
            } else if (edad < 25) {
                // Adolescente
                resp2 = "Eres un adolescente";
            } else if (edad < 65) {
                // Adulto
                resp2 = "Eres un adulto";
            } else {
                // Adulto mayor
                resp2 = "Eres un adulto mayor";
            }
            // Mostrar el resultado
            const elemento2 = document.getElementById("resultado2");
            elemento2.textContent = resp2;
        }

    /*Calculadora simple*/
function calculadora(operador) {
            // Obtener el valor del input
            let num1 = document.getElementById("num_3_1").value;
            let num2 = document.getElementById("num_3_2").value;

            let resp3;
            // Convertimos los números a números enteros
            num1 = Number(num1);
            num2 = Number(num2);

            // Realizamos la operación
            switch (operador) {
                case "+":
                  resp3 = num1 + num2;
                break;
                case "-":
                  resp3 = num1 - num2;
                break;
                case "*":
                  resp3 = num1 * num2;
                break;
                case "/":
                  resp3 = num1 / num2;
                break;
            }

            // Mostramos el resultado   
            const elemento = document.getElementById("resultado3");
            elemento.textContent = resp3;
    }

  /*Multiplicación*/

function tablaMultiplicar() {
    // Obtener el valor del input
    let numero = document.getElementById("num_4").value;

    // Convertimos el número a un número entero
    numero = Number(numero);
    let tabla = [];

    // Imprimimos la tabla de multiplicar
    for (let i = 1; i <= 10; i++) {
        tabla.push(numero + " x " + i + " = " + numero * i);
    }

    // Mostrar la tabla
    const elemento4 = document.getElementById("resultado4");

    // Eliminar los hijos
    while (elemento4.firstChild) {
      elemento4.removeChild(elemento4.firstChild);
    }
    for (let i = 0; i < tabla.length; i++) {
        const elemento = document.createElement("h4");
        elemento.textContent = tabla[i];
        elemento4.appendChild(elemento);
    }
}

/*Suma de números pares*/
function sumaDigitosPares() {
  // Obtener el valor del input
  const num3 = document.getElementById("num_5").value;

  // Convertimos el número a un número entero
  numero = Number(num3);
  const numero2 = numero;

  // Declaramos la variable para almacenar la suma de los dígitos pares
  let suma = 0;

  // Recorremos los dígitos del número
  for (let i = 0; numero > 0; i++) {
      // Obtenemos el dígito actual
      let digito = numero % 10;

      // Si el dígito es par, lo sumamos
      if (digito % 2 == 0) {
          suma += digito;
      }

      // Dividimos el número entre 10 para obtener el siguiente dígito
      //floor redondea en la parte entera del número
      numero = Math.floor(numero / 10);
  }

  // Mostrar la suma
  const elemento5 = document.getElementById("resultado5");
  elemento5.textContent = suma;
}  
    
    /*-----Carrusel vertical-----*/
class Carousel {
    constructor(el, options = {}) {
      const DEFAULTS = {
        infinite : true,
        slideSelector: '.C-slide',
        initialSlideIndex: 0,
        vertical: false,
      };
      this.carousel = el;
      this.settings = {
        ...DEFAULTS,
        ...options,
      };
  
      this.slides = document.querySelectorAll(
        this.settings.slideSelector
      );
  
      this.state = {
        currentSlide: this.settings.initialSlideIndex,
      };
  
      this.track = null;
      this.navigation = null;
      this.navigationButtons = [];
  
      // Init
      this.init();
    }
  
    setState(newState, callback = () => undefined) {
      this.state = {
        ...this.state,
        ...newState,
      };
      this.updateCarousel();
      return callback();
    }
    
    getSettings = () => {
      return this.settings;
    }
  
    reInitWithOptions = (options = {}) => {
      this.carousel.classList.remove('initialized');
      this.track.classList.add('C-track--reinit');
      this.settings = {
        ...this.getSettings(),
        ...options,
      };
      
      this.init();
      this.onResizeActions();
      this.track.classList.remove('C-track--reinit');
    };
  
    init() {
      const {
        carousel,
        slides,
      } = this;
  
      const {
        vertical,
      } = this.settings;
  
      carousel.classList.remove('C-carousel--vertical');
      carousel.classList.remove('C-carousel--horizontal');
      if (vertical) {
        carousel.classList.add('C-carousel--vertical');
      } else {
        carousel.classList.add('C-carousel--horizontal');
        slides.forEach(slide => {
          slide.style.float = 'left';
        });
      }
  
      this.onInitActions();
  
      window.addEventListener('resize', () => {
        setTimeout(() => { this.onResizeActions(); }, 100);
      });
  
    }
  
    onInitActions() {
      this.createSlideTrack();
      this.createNavigation();
      this.createNavigationButtons();
      this.updateCarousel();
      this.carousel.classList.add('initialized');
    }
  
    onResizeActions() {
      this.setSlideTrackDimensions();
    }
  
    createSlideTrack() {
      const {
        slides,
        carousel,
        track,
      } = this;
      
      // Do not re-create track if it exists
      if(!track) {
        const track = document.createElement('div');
        track.classList.add('C-track');
        slides.forEach(slide => {
          track.appendChild(slide);
        });
  
        carousel.appendChild(track);
        this.track = track;
      }
      this.setSlideTrackDimensions();
    }
  
    setSlideTrackDimensions() {
  
      const {
        track,
        slides,
      } = this;
      slides.forEach(slide => {
        slide.style.transition = 'none';
      });
      const numberOfSlides = slides.length;
  
      if (!track) { return; }
  
      const {
        vertical,
      } = this.settings;
  
      const height = [...slides].reduce((acc, slide) => (
        acc + slide.offsetHeight
      ), 0);
      const width = [...slides].reduce((acc, slide) => (
        acc + slide.offsetWidth
      ), 0);
      
      track.style.transition = 'none';
  
      if (!!vertical) {
        track.style.width = width / numberOfSlides + 'px';
        track.style.height = height + 'px';
      } else {
        track.style.width = width + 'px';
        track.style.height = height / numberOfSlides + 'px';
      }
  
      track.style.transition = '';
      slides.forEach(slide => {
        slide.style.transition = '';
      });
    }
  
    updateTrackPosition() {
      const {
        slides,
        track,
      } = this;
  
      const numberOfSlides = slides.length;
      const basePercentage = 100 / numberOfSlides;
  
      const {
        vertical,
      } = this.settings;
  
      const {
        currentSlide,
      } = this.state;
  
      const translateValue = !!vertical
      ? `translateY(-${basePercentage * currentSlide}%)`
      : `translateX(-${basePercentage * currentSlide}%)`
  
      track.style.transform = translateValue;
  
    }
  
    createNavigation () {
      const {
        slides,
        carousel,
        navigation,
      } = this;
      
      if (!navigation) {
        const navigationContainer = document.createElement('div');
        navigationContainer.classList.add('C-navigation');
        [...slides].forEach((slide, index) => {
          navigationContainer.appendChild(this.createNavigationDot(index));
        });
        carousel.appendChild(navigationContainer);
        this.navigation = navigationContainer; 
      }
    }
  
    createNavigationDot(index) {
      const { currentSlide } = this.state;
      const navigationDot = document.createElement('div');
      navigationDot.classList.add('C-navigation__dot');
      navigationDot.setAttribute('data-slideIndex', index);
      navigationDot.addEventListener('click', () => {
        this.goTo(index);
      });
  
      return navigationDot;
    }
  
    createNavigationButtons() {
      const createNavigationButton = (buttonType) => {
        const { carousel } = this;
        const navigationButton = document.createElement('button');
        navigationButton.setAttribute('type', 'button');
        navigationButton.classList.add('C-carousel-navigation-button');
        navigationButton.classList.add(`C-carousel-navigation-button--${buttonType}`);
        navigationButton.addEventListener('click', () => {
          const { slides } = this;
          const { currentSlide } = this.state;
          const numberOfSLides = slides.length;
          const lastSlideIndex = numberOfSLides - 1;
          
          if (buttonType === 'next') {
            const slideToGo = currentSlide + 1;
            if (slideToGo > lastSlideIndex) {
              if(!!this.settings.infinite) {
                return this.goTo(0);
              }
              return;
            } else {
              this.goTo(slideToGo);
            }
            
          } else {
            const slideToGo = currentSlide - 1;
            if (slideToGo < 0) {
              if(!!this.settings.infinite) {
                return this.goTo(lastSlideIndex);
              }
              return;
            } else {
              this.goTo(slideToGo);
            }
          }
        });
        
        navigationButton.textContent = buttonType;
        carousel.appendChild(navigationButton);
        this.navigationButtons.push(navigationButton);
      }
      
      if (this.navigationButtons.length <= 0) {
        createNavigationButton('next');
        createNavigationButton('prev');
      } 
    }
  
    updateNavigation() {
      const {
        navigation,
      } = this;
  
      const {
        currentSlide,
      } = this.state;
  
      const navigationDots = navigation.querySelectorAll('.C-navigation__dot');
      navigationDots.forEach(dot => {
        const dotIndex = parseInt(dot.getAttribute('data-slideIndex'), 10);
        if (dotIndex === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  
    updateSlides() {
      const {
        slides,
      } = this;
  
      const {
        currentSlide,
      } = this.state;
  
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    }
  
    goTo = (index) => {
      this.setState({
        currentSlide: index,
      }, () => {
        //console.log('Current slide is now: ', this.state.currentSlide);
      });
    }
  
    updateCarousel() {
      this.updateTrackPosition();
      this.updateNavigation();
      this.updateSlides();
    }
  
  }
  
  const registeredCarousels = [];
  const carousels = document.querySelectorAll('.C-carousel');
  carousels.forEach((carousel, index) => {
    registeredCarousels.push({  
      id: `C-carousel-${index}`,
      carousel: new Carousel(carousel, {
        vertical: true,
      }),
    })
  });
  
  const changeCarouselDirectionButton = document.querySelector('.js-change-carousel-direction');
  changeCarouselDirectionButton.addEventListener('click', function(event) {
    const carouselId = this.getAttribute('data-carousel-id');
    const carouselToChange = registeredCarousels.find(carousel => carousel.id === carouselId);
    const settings = carouselToChange.carousel.getSettings();
    const { vertical } = settings;
    carouselToChange.carousel.reInitWithOptions({
      vertical: !vertical,
    });
  
  })
