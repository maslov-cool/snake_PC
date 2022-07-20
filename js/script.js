const canvas=document.getElementById("games_window")
// достали canvas

const format=canvas.getContext("2d")
//getContext(). Этот метод генерирует контекст рисования, который будет связан с указанным холстом

const field=new Image()
field.src="img/playing_field.png"
//field-поле

const apple=new Image()
apple.src="img/apple.png"


const snakeHead=new Image()
snakeHead.src="https://raw.githubusercontent.com/komeilshahmoradi/Snake/main/Sprites/snake.png"


const length=32
// отвечает за ширину или высоту квадратика игрового поля

let score = 0
//счёт

let food={
    x:Math.floor(Math.random()*17+1)*length,
    y:Math.floor(Math.random()*15+3)*length
};
// координаты для еды змейки в px, начало отчёта(0,0) верхний левый угол Math.random возвращает псевдослучайное число 
// от 0 (включительно) до 1 (но не включая 1), получаем число меньшее или равное 15 или 17(число квадратов)
// при помощи Math.floor - округление в меньшую сторону+1  +3 чтобы не вылетало за карту потом *32-length-отвечает 
// за ширину или высоту квадратика игрового поля 

let snake=[{
    x:9*length,
    y:10*length
}]
snake[0]={
    x:9*length,
    y:10*length
}

document.addEventListener('keydown',direction)

let dir
//переменная для напраления змейки

function direction(e) {
 
    if(e.keyCode === 37 && dir!="right" && dir!="right-" && dir!="right=")
    {dir="left"}
    else if(e.keyCode === 40 && dir!="down" && dir!="down-" && dir!="down=")
    {dir="up"}
    else if(e.keyCode === 38 && dir!="up" && dir!="up-" && dir!="up=")
    {dir="down"}
    else if(e.keyCode === 39 && dir!="left" && dir!="left-" && dir!="left=")
    {dir="right"}
    else if(e.keyCode === 65 && dir!="right-" && dir!="right" && dir!="right=")
    {dir="left-"}
    else if(e.keyCode === 83 && dir!="down-" && dir!="down" && dir!="down=")
    {dir="up-"}
    else if(e.keyCode === 87 && dir!="up-" && dir!="up" && dir!="up=")
    {dir="down-"}
    else if(e.keyCode === 68 && dir!="left-" && dir!="left" && dir!="left=")
    {dir="right-"}
    else if(e.keyCode === 100 && dir!="right" && dir!="right-" && dir!="right=")
    {dir="left="}
    else if(e.keyCode === 98 && dir!="down" && dir!="down-" && dir!="down=")
    {dir="up="}
    else if(e.keyCode === 104 && dir!="up" && dir!="up-" && dir!="up=")
    {dir="down="}
    else if(e.keyCode === 102 && dir!="left" && dir!="left-" && dir!="left=")
    {dir="right="}
    
}
//&& dir!="left"  и т.д. для того, чтобы когда змейка двигалась влево не могла сразу повернуть вправо
//Свойство event.keyCode позволяет узнать нажатую клавишу при вводе текста
//курсор ← 37
//курсор ↑ 38
//курсор ↓ 40
//курсор → 39
let arr
let head

function eatHerself(head,arr) {
    for(let i=0;i<arr.length;i++){
if (head.x===arr[i].x && head.y===arr[i].y)  {
    clearInterval(game)
    alert(`Game over! Ваш счёт: ${snake.length} очков`)
}
 }
}
function AppleEatHerself(food,arr) {
    for(let i=0;i<arr.length;i++){
if (food.x===arr[i].x && food.y===arr[i].y)  {
    food={
        x:Math.floor(Math.random()*17+1)*length,
        y:Math.floor(Math.random()*15+3)*length
    }
}
 }
}
console.log('Всё вышло!')
function drawGameSnake(){
    canvas.height=608
    canvas.width=608
    format.drawImage(field,0,0)

    format.drawImage(apple,food.x,food.y)

    for (let i = 0; i < snake.length; i++) {
          format.fillStyle=i===0?"#FFFF00":"#FFD700"
          
          //Свойство CanvasRenderingContext2D.fillStyle, задаёт цвет или стиль, используемый при заливке фигур.
          format.fillRect(snake[i].x,snake[i].y,length,length)
          //Метод CanvasRenderingContext2D.fillRect(),рисует залитый прямоугольник в позиции (x, y),
          //размер которого определяется аргументами width и height, и стиль которого определяется атрибутом fillStyle. 
         
    }
    format.fillStyle="black"
    format.font="bold 40px cursive"
    //CanvasRenderingContext2D.font – свойство Canvas 2D API, определяющее  текущие стили рисуемого текста.'bold 48px serif'
    format.fillText(score,length*2.3,length*1.5)

    let snakeX=snake[0].x
    let snakeY=snake[0].y
    //переменные, в них помещаем координату самой змейки

    if (snakeX === food.x & snakeY === food.y ) {
        score++
        food={
            x:Math.floor(Math.random()*17+1)*length,
            y:Math.floor(Math.random()*15+3)*length
        }
        
    } else {
       snake.pop()
    }
      // Сразу после этого удаляем последний элемент из массива змейки, потому что она движется и постоянно особождает клетки после себя

if(snakeX < length||snakeX>length*17||snakeY<length*3||snakeY>length*17)
{clearInterval(game)
    //Глобальный clearInterval()метод отменяет рассчитанное по времени повторяющееся действие,
    // которое ранее было установлено вызовом setInterval().
    // Если предоставленный параметр не идентифицирует ранее установленное действие, этот метод ничего не делает.
      alert(`Game over! Ваш счёт: ${snake.length} очков`)
}

    if(dir ==="left"){
        snakeX-=length
    }
    if(dir ==="right"){
        snakeX+=length
    }
    if(dir ==="up"){
        snakeY+=length
    }
    if(dir ==="down"){
        snakeY-=length
    }
    if(dir ==="left-"){
        snakeX-=length
    }
    if(dir ==="right-"){
        snakeX+=length
    }
    if(dir ==="up-"){
        snakeY+=length
    }
    if(dir === "down-"){
        snakeY-=length
    }
    if(dir === "down="){
        snakeY-=length
    }
    if(dir === "up="){
        snakeY+=length
    }
    if(dir === "left="){
        snakeX-=length
    }
    if(dir === "right="){
        snakeX+=length
    }


    //-= вычитание  +=сложение

    const newHead={
        x:snakeX,
        y:snakeY
    }
    //создание новой головы,чтобы работали кнопки

  eatHerself(newHead,snake)

    snake.unshift(newHead)
    
}
//функция рисует field и apple внутри canvas
//Метод drawImage() рисует изображение, содержимое другого элемента <canvas> или видео.
//Также, метод drawImage() может нарисовать часть изображения и/или увеличить/уменьшить размер изображения.

const game=setInterval(drawGameSnake,100)
// Чтобы функция drawGameSnake() работала постоянно, запускаем её выполнение через setInterval().



//ДОБАВИТЬ МЕНЮ ГДЕ МОЖНО ВЫБРАТЬ ЕДУ И ЗМЕЙКУ



