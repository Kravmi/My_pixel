let painting_box = document.querySelector('.painting_box')
let colors = document.querySelectorAll('.color')
let active_color = 'red'
let is_clicked = false 
let eraser = document.querySelector('.eraser')
let filling = document.querySelector('.filling')
let is_filling = false
let colors_cells = ['rgb(128, 128, 128)', "rgb(255, 0, 0)", "rgb(0, 128, 0)", 'rgb(0, 0, 255)', 'rgb(255, 255, 255)', 'rgb(255, 255, 0)']
function get_colors_from_cookie(){
    //1. Получить куки  2. Сплитануть по ; 3. Пройтись по массиву 
    // 4. if color_cells то вернуть его значение иначе вернуть 0
    let cookies = document.cookie.split('; ')
    console.log(cookies)
    for (let i = 0; i < cookies.length; i += 1) {
        let cookie = cookies[i].split('=')
        console.log(cookie)
        if (cookie[0] == 'colors_cells') {
            return cookie[1]
        }
    }
    return '0' * 450
}

for(let i=0; i < 450; i++){
    let cell = document.createElement('div')
    cell.classList.add('cell')
    cell.setAttribute('id', `${i}`)
    painting_box.appendChild(cell)
}
let cells = document.querySelectorAll('.cell')

setInterval(function(){
    let colors_cookie = ''
    for(let i=0; i < cells.length; i++){
            let colors_cell = getComputedStyle(cells[i]).getPropertyValue('background-color')
            colors_cookie += colors_cells.indexOf(colors_cell)
    }
    document.cookie = `colors_cells=${colors_cookie};`
    // console.log(document.cookie)
}, 20000)
eraser.addEventListener('click', function(){
    active_color = 'gray'
})

filling.addEventListener('click', function(){
    // for(let i=0; i<cells.length; i++){
    //     cells[i].style.backgroundColor = active_color
    // }
    is_filling = true
})

document.addEventListener('mousedown', function(){
    is_clicked = true
})
document.addEventListener('mouseup', function(){
    is_clicked = false
})

for(let i=0; i<colors.length; i++){
    colors[i].addEventListener('click', function(){
        active_color = getComputedStyle(colors[i]).getPropertyValue('background-color')
    })
}


for(let i=0; i<cells.length; i++){
    cells[i].addEventListener('click', function(){
        if(is_filling){
            is_filling = false
            // for(let i=0; i<cells.length; i++){
            //     cells[i].style.backgroundColor = active_color
            // }
            anime ({
                targets: '.cell',
                backgroundColor: active_color,
                delay: anime.stagger(200, {grid: [30, 15], from: 'center'}),
                duration: 500,
            })
        }
        else{cells[i].style.backgroundColor = active_color}
    })
    cells[i].addEventListener('mouseover', function(){
        if(is_clicked){
            cells[i].style.backgroundColor = active_color
        }
    })
}

document.querySelector('.save').addEventListener('click', function() {
    domtoimage.toJpeg(painting_box, {quality: 2})
    .then(function (dataUrl) {
        let img = new Image();
        img.src = dataUrl;
        let link = document.createElement('a');
        link.download = 'pixel.jpg';
        link.href = dataUrl;
        link.click();
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
})
