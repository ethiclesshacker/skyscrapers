const data = {
    "levels": [
        {},
        {
            "level": 1,
            "shape": {
                "rows": 3,
                "cols": 1
            },
            "a": 3,
            "b": 1,
            "max": 3,
            "options": {
                1: 1,
                2: 1,
                3: 1,
            },
            "correctAnswer": [1, 2, 3],
            "correctAnswerString": "123",
        },
        {
            "level": 2,
            "shape": {
                "rows": 5,
                "cols": 1
            },
            "a": 3,
            "b": 3,
            "max": 5,
            "options": {
                1: 1,
                2: 1,
                3: 1,
                4: 1,
                5: 1
            },
            "correctAnswer": [1, 2, 5, 4, 3],
            "correctAnswerString": "12543",
        }
    ]
}

document.querySelector("button").addEventListener("click",(event)=>{
    event.preventDefault();
    checkSolution();
})

function checkSolution(){
    var gridValue = document.querySelector(".layout").textContent.trim();
    console.log(gridValue,data.levels[level].correctAnswerString);
    
    if(gridValue === data.levels[level].correctAnswerString){
        alert("Correct Answer")
        level = level + 1;
        document.querySelector(".layout").innerHTML = "";
        setupGrid();
    }
}

function handleBlockClick(event) {
    console.log("Click!")
    event.target.innerText = (parseInt(event.target.innerText) + 1) % (data.levels[level].max + 1);
    // checkSolution();
}

function setupGrid() {
    const gridParent = document.querySelector(".layout");
    for (var i = 0; i < data.levels[level].shape.rows; i++) {
        for (var j = 0; j < data.levels[level].shape.cols; j++) {
            var newElem = document.createElement("div");
            newElem.setAttribute("class", "gridElement");
            newElem.addEventListener("click", handleBlockClick);
            newElem.innerText = 0;
            gridParent.appendChild(newElem)
        }
    }
    document.querySelector(".circle.a").textContent = data.levels[level].a;
    document.querySelector(".circle.b").textContent = data.levels[level].b;
}

let level = 1;

setupGrid()