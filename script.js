const list = document.querySelector(".list");
const htmlFirst = document.querySelector(".first");
const htmlLast = document.querySelector(".last");
const htmlNext = document.querySelector(".next");
const htmlPrev = document.querySelector(".prev");
const numbers = document.querySelector(".numbers")
let itemPerPage = 10;
let sizeListItems = 50;

const data = Array.from({ length: sizeListItems }).map(
  (_, v) => `item ${v + 1}`
);

// ========================================================

const statePage = {
  page: 1,
  itemPerPage,
  totalPages: Math.ceil(
    data.length / itemPerPage
  ),
  totalVisibleButtons: 3
};

// funções dentro de um escopo de objeto
const controllers = {
  next() {
    statePage.page++;

    const lastPage = statePage.page > statePage.totalPages;
    if (lastPage) {
      statePage.page--;
    }
  },
  prev() {
    statePage.page--;
    if (statePage.page < 1) {
      statePage.page++;
    }
  },
  goTo(page) {
    statePage.page = +page; /* '+' converte para inteiro */
    if (page > statePage.totalPages) {
      statePage.page = statePage.totalPages;
    }
  },
  createListeners() {
    // primeira página
    htmlFirst.addEventListener("click", () => {
      controllers.goTo(1);
      updateListeners()
    });

    // ultima página
    htmlLast.addEventListener("click", () => {
      controllers.goTo(statePage.totalPages);
      updateListeners()
    });

    // próxima página
    htmlNext.addEventListener("click", () => {
      this.next();
      updateListeners()
    });

    // página anterior
    htmlPrev.addEventListener("click", () => {
      this.prev();
      updateListeners()
    });
  },
};

const objList = {   
  update() {
    list.innerText = ""

    let page = statePage.page - 1
    let initial = page * statePage.itemPerPage /* 0 x 10 */
    let end = initial + statePage.itemPerPage  /* 0 + 10 */
    
    const sliceItems = data.slice(initial, end)
    const { maxLeft, maxRight } = objList.maxVisibleButtons()

    for(let maxLeftPage = maxLeft; maxLeftPage <= maxRight; maxLeftPage++){

      const btns = document.createElement('div')
      btns.classList.add('totalPage')
      btns.innerText += maxLeftPage

      if (statePage.page == maxLeftPage) {
        btns.classList.add('active')
      }

      btns.addEventListener('click', (e) => {
        const eventPage = e.target.innerText
        controllers.goTo(eventPage)
        updateListeners()
      })

      numbers.appendChild(btns)

    }


    sliceItems.map(sliceItem => {
      const divItem = document.createElement('div')
      divItem.classList.add('item')
      divItem.innerText = sliceItem

      list.appendChild(divItem)
    })
  },

  maxVisibleButtons() {
    // Math.floor -> arredonda para baixo um valor inteiro
    const { totalVisibleButtons } = statePage
    let maxLeft = (statePage.page - Math.floor(totalVisibleButtons/2))
    let maxRight = (statePage.page + Math.floor(totalVisibleButtons/2))

    if (maxLeft < 1) {
      maxLeft = 1
      maxRight = totalVisibleButtons
    }

    if (maxRight > statePage.totalPages) {
        maxLeft = statePage.totalPages - (totalVisibleButtons - 1)
        maxRight = statePage.totalPages

        if(maxLeft < 1) maxLeft =1
      
    } 

    return {maxLeft, maxRight}

  }
}

function updateListeners() {
  numbers.innerHTML = ""
  objList.update()

}

function start() {
  updateListeners()
  controllers.createListeners();
}


// start code
start()