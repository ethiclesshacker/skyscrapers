const data = {
    "shape": {
        "rows": 5,
        "cols": 5
    },
    "options": {
        1: 1,
        2: 1,
        3: 1,
        4: 1,
        5: 1
    },
    "correctAnswer":[1,2,3,4,5],
    "level": 5
}

function handleBlockClick(event){
    console.log("Click!")
    event.target.innerText = (parseInt(event.target.innerText) + 1) % (data.level+1);
}

function setupGrid() {
    const gridParent = document.querySelector(".layout");
    for (var i = 0; i < data.shape.rows; i++) {
        for (var j = 0; j < data.shape.cols; j++) {
            var newElem = document.createElement("div");
            newElem.setAttribute("class","gridElement");
            newElem.addEventListener("click",handleBlockClick);
            newElem.innerText = 0;
            gridParent.appendChild(newElem)
        }
    }
}

setupGrid()