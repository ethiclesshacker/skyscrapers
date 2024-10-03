import { levels } from "./levels.js"
// import { characters } from "./characters.js"
import { buildings } from "./buildings.js"

let currentLevel = 1;

const l1_start = {
    x: 80.6338,
    y: 83.0801
}

const l1_end = {
    x: 351.864,
    y: 220.552
}

const l2_start = {
    x: 162.855,
    y: 41.0732
}

const l2_end = {
    x: 436.071,
    y: 178.403
}

const l3_start = {
    x: 0,
    y: 0
}

const l3_end = {
    x: 0,
    y: 0
}

const l4_start = {
    x: 0,
    y: 0
}

const l4_end = {
    x: 0,
    y: 0
}

let flag = 1;

function setup() {
    const levelDivs = levels[currentLevel]["max"];
    var l1_x_len = (l1_end.x - l1_start.x)
    var l1_y_len = (l1_end.y - l1_start.y)
    var l1_points = [{ x: l1_start.x, y: l1_start.y }]

    var l2_x_len = (l2_end.x - l2_start.x)
    var l2_y_len = (l2_end.y - l2_start.y)
    var l2_points = [{ x: l2_start.x, y: l2_start.y }]

    for (var i = 1; i <= levelDivs; i++) {
        l1_points.push({
            x: l1_start.x + (l1_x_len / levelDivs) * i,
            y: l1_start.y + (l1_y_len / levelDivs) * i
        })
        l2_points.push({
            x: l2_start.x + (l2_x_len / levelDivs) * i,
            y: l2_start.y + (l2_y_len / levelDivs) * i
        })
    }
    document.querySelector(".background").innerHTML = "";
    document.querySelector(".sizes").innerHTML = "";
    document.querySelector("#level-number").innerHTML = ` ${currentLevel}`;

    // Adding number of elements to the both grids.
    for (var i = 0; i < levelDivs; i++) {
        document.querySelector(".background").innerHTML += `<path id="building-block-${i}" class="grid-block" d="M${l1_points[i].x} ${l1_points[i].y}L${l1_points[i + 1].x} ${l1_points[i + 1].y}L${l2_points[i + 1].x} ${l2_points[i + 1].y}L${l2_points[i].x} ${l2_points[i].y}Z" fill="#79AD51" stroke="#d1ffa1" stroke-width="3" stroke-miterlimit="10"/>`;
        document.querySelector(".sizes").innerHTML += `<div id="grid-element-${i}" class="grid-element">0</div>`;
        document.querySelector(".background").innerHTML += `<g transform="translate(${l1_points[i].x + 40},${l1_points[i].y - 138})"><g id="building-location-${i}" transform="scale(1)">  </g></g>`
    }
    // document.querySelector(".sizes").insertAdjacentHTML("beforebegin",characters.alice);
    // document.querySelector(".top-view").innerHTML += characters.bob;
    document.querySelector("#alice-text-top").innerHTML = levels[currentLevel]["a"];
    document.querySelector("#bob-text-top").innerHTML = levels[currentLevel]["b"];


    document.querySelectorAll(".grid-element").forEach((item) => {
        item.addEventListener("click", handleBlockClick);
    })
}

function handleBlockClick(event) {
    var levelDivs = levels[currentLevel]["max"];
    event.preventDefault();
    // console.log("Click!");
    // console.log(event.target);
    event.target.innerText = (parseInt(event.target.innerText) + 1) % (levelDivs + 1);
    let pos = Array.prototype.indexOf.call(event.target.parentNode.childNodes, event.target)
    console.log(pos);
    document.querySelector(`#building-location-${pos}`).innerHTML = buildings[event.target.innerText];
    boardState();
    // console.log(flag)
}
// for (var i = 1; i <= divs; i++) {
// }


// var l1_string = l1_points.map((point) => `${point.x} ${point.y}`).join("L")
// var l2_string = l2_points.map((point) => `${point.x} ${point.y}`).join("L")

// console.log(`<path d="M${l2_string}" fill="#79AD51"/>`)

// document.querySelector(".background").innerHTML += `<path d="M${l2_string}" stroke="red" stroke-width="3" stroke-miterlimit="10"/>`;


// console.log(`<path d="M${l1_string}" fill="#79AD51"/>`)

// document.querySelector(".background").innerHTML += `<path d="M${l1_string}" stroke="red" stroke-width="3" stroke-miterlimit="10"/>`;



// for (var i = 0; i < divs; i++) {
//     document.querySelector(".background").innerHTML += `<g transform="translate(${l1_points[i].x + 40},${l1_points[i].y - 138})"><g id="building-location-${i}" transform="scale(1)">  </g></g>`
// }


// document.querySelector(".background").innerHTML += `<path d="M${l1_points[0].x} ${l1_points[i].x}L${l1_points[i+1].x} ${l1_points[i+1].x}L${l2_points[i+1].x} ${l2_points[i+1].x}L${l2_points[i].x} ${l2_points[i].x}Z" stroke="yellow" stroke-width="3" stroke-miterlimit="10"/>`

function boardState() {
    flag = 1;
    const numString = document.querySelector(".sizes").textContent.trim();
    for (let i = 0; i < numString.length; i++) {
        var currentNum = parseInt(numString[i]);

        if ((numString.indexOf(currentNum) == numString.lastIndexOf(currentNum)) || currentNum === 0) {
            document.getElementById(`grid-element-${i}`).style.color = "black"
            document.getElementById(`grid-element-${i}`).style.backgroundColor = "white"
        } else {
            document.getElementById(`grid-element-${i}`).style.color = "white"
            document.getElementById(`grid-element-${i}`).style.backgroundColor = "red"
            flag = 0;
        }
    }
}

function countIncreasingFromLeft(numString) {
    let count = 1;
    let prevNum = parseInt(numString[0]);

    for (let i = 1; i < numString.length; i++) {
        const currentNum = parseInt(numString[i]);
        if (currentNum > prevNum) {
            count++;
            prevNum = currentNum;
        } else {
            break;
        }
    }

    return count;
}

function countIncreasingNumbers(input) {
    if (input.length === 0) return 0;

    let count = 1;
    let prevDigit = parseInt(input[0]);

    for (let i = 1; i < input.length; i++) {
        const currentDigit = parseInt(input[i]);
        if (currentDigit > prevDigit) {
            count++;
            prevDigit = currentDigit;
        }
    }

    return count;
}

function countIncreasingNumbersRightToLeft(input) {
    if (input.length === 0) return 0;

    let count = 1;
    let prevDigit = parseInt(input[input.length - 1]);

    for (let i = input.length - 2; i >= 0; i--) {
        const currentDigit = parseInt(input[i]);
        if (currentDigit > prevDigit) {
            count++;
            prevDigit = currentDigit;
        }
    }

    return count;
}

function countIncreasingFromRight(numString) {
    let count = 1;
    let prevNum = parseInt(numString[numString.length - 1]);

    for (let i = numString.length - 2; i >= 0; i--) {
        const currentNum = parseInt(numString[i]);
        if (currentNum > prevNum) {
            count++;
            prevNum = currentNum;
        } else {
            break;
        }
    }

    return count;
}


function checkSolution() {
    console.log("Checking solution!")
    const userAnswer = document.querySelector(".sizes").textContent.trim();
    // if (levels[currentLevel]["correctAnswerString"] === userAnswer) {
    console.log(countIncreasingNumbers(userAnswer), countIncreasingNumbersRightToLeft(userAnswer));
    if (levels[currentLevel]["a"] === countIncreasingNumbers(userAnswer) && levels[currentLevel]["b"] === countIncreasingNumbersRightToLeft(userAnswer) && flag == 1) {
        alert("Correct Answer!!");
        currentLevel += 1;
        setup();
    } else {
        // console.log(levels[currentLevel]["correctAnswerString"], userAnswer)
        alert("Oops! Try Again!!")
    }

}

document.querySelector("button#submit").addEventListener("click", checkSolution)

setup();