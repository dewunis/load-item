const grid = document.querySelector('.grid')
const loader = document.querySelector('.loader-container')
console.log(loader)

const apiKey = '9XnqlocPnCdZ5AuVr0X19ohxMohSlAQguSTZ1wZRBLUER9uNeO4qusVh'
const perPage = 20;
let currentPage = 1;
const ratio = .1

let loadingNumber = 1
let isLoading = false

const generateFakeItem = () => {

    if (isLoading == true) return

    let html = ``
    for (let i = 0; i < perPage; i++) {
        html += `<div class="card card_${loadingNumber}"><div class="img"></div></div>`
    }

    grid.innerHTML += html
}

const replaceFakeItem = (data) => {
    let fakeItem = [...document.querySelectorAll(`.card_${loadingNumber}`)]
    for (let i = 0; i < data.length; i++) {

        const images = data[i].src.large2x
        let item = fakeItem[i]

        item.querySelector('.img').remove()
        let img = document.createElement('img')

        img.classList.add('img')
        img.src = images
        item.append(img)

    }
}

const generateItem = () => {

    if (isLoading == true) return

    isLoading = true
    const f = fetch(`https://api.pexels.com/v1/curated?page=${currentPage}?&per_page=${perPage}`, {
        headers: {
            Authorization: apiKey
        }
    })

    f.then(res => res.json()).then((data) => {

        replaceFakeItem(data.photos)

        isLoading = false
        loadingNumber++
        currentPage++
    })
}

generateFakeItem()
generateItem()

loadNewItem = (entries, observe) => {
    entries.forEach(entry => {
        if (entry.intersectionRatio > ratio) {
            if(isLoading !== true){
                generateFakeItem()
                generateItem()
            }
        }else{
        }
    });
}

let options = {
    root: null,
    rootMargin: "0px",
    threshold: ratio,
};

let observer = new IntersectionObserver(loadNewItem, options);
observer.observe(loader)

