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
            newElem.innerHTML = `<svg width="201" height="302" viewBox="0 0 201 302" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_5251_82466)"><path d="M200.51 251.28L100.43 301.83V201.23L200.51 150.68V251.28Z" fill="#BCC5DC"/><path d="M199.66 151.02L99.57 201.57L0 151.55L100.09 101L199.66 151.02Z" fill="white"/><path d="M100.4 301.829L0.320312 251.789V151.189L100.4 201.229V301.829Z" fill="#F2F5FF"/><path d="M87.8298 275.64L10.5498 237.17V176.57L87.8298 215.04V275.64Z" fill="#8FBBD8"/><path d="M7.49023 215.721L93.2802 257.261" stroke="#F2F5FF" stroke-width="5" stroke-miterlimit="10"/><path d="M7.49023 193.939L93.2802 235.469" stroke="#F2F5FF" stroke-width="5" stroke-miterlimit="10"/><path d="M28.9805 179.98V255.55" stroke="#F2F5FF" stroke-width="5" stroke-miterlimit="10"/><path d="M49.2305 190.869V266.449" stroke="#F2F5FF" stroke-width="5" stroke-miterlimit="10"/><path d="M69.4902 199.721V275.301" stroke="#F2F5FF" stroke-width="5" stroke-miterlimit="10"/><path d="M190.98 235.85L113.7 275.38V210.79L190.98 171.26V235.85Z" fill="#6F94A5"/><path d="M112.68 253.341L194.89 210.961" stroke="#BCC5DC" stroke-width="5" stroke-miterlimit="10"/><path d="M111.15 230.87L195.4 189.51" stroke="#BCC5DC" stroke-width="5" stroke-miterlimit="10"/><path d="M132.13 196.189V271.769" stroke="#BCC5DC" stroke-width="5" stroke-miterlimit="10"/><path d="M152.38 186.189V261.769" stroke="#BCC5DC" stroke-width="5" stroke-miterlimit="10"/><path d="M172.64 174.189V249.769" stroke="#BCC5DC" stroke-width="5" stroke-miterlimit="10"/></g><g clip-path="url(#clip1_5251_82466)"><path d="M200.51 150.28L100.43 200.83V100.23L200.51 49.6797V150.28Z" fill="#BCC5DC"/><path d="M199.66 50.02L99.57 100.57L0 50.55L100.09 0L199.66 50.02Z" fill="white"/><path d="M100.4 200.829L0.320312 150.789V50.1895L100.4 100.229V200.829Z" fill="#F2F5FF"/><path d="M87.8298 174.64L10.5498 136.17V75.5703L87.8298 114.04V174.64Z" fill="#8FBBD8"/><path d="M7.49023 114.721L93.2802 156.261" stroke="#F2F5FF" stroke-width="5" stroke-miterlimit="10"/><path d="M7.49023 92.9395L93.2802 134.469" stroke="#F2F5FF" stroke-width="5" stroke-miterlimit="10"/><path d="M28.9805 78.9805V154.55" stroke="#F2F5FF" stroke-width="5" stroke-miterlimit="10"/><path d="M49.2305 89.8691V165.449" stroke="#F2F5FF" stroke-width="5" stroke-miterlimit="10"/><path d="M69.4902 98.7207V174.301" stroke="#F2F5FF" stroke-width="5" stroke-miterlimit="10"/><path d="M190.98 134.85L113.7 174.38V109.79L190.98 70.2598V134.85Z" fill="#6F94A5"/><path d="M112.68 152.341L194.89 109.961" stroke="#BCC5DC" stroke-width="5" stroke-miterlimit="10"/><path d="M111.15 129.87L195.4 88.5098" stroke="#BCC5DC" stroke-width="5" stroke-miterlimit="10"/><path d="M132.13 95.1895V170.769" stroke="#BCC5DC" stroke-width="5" stroke-miterlimit="10"/><path d="M152.38 85.1895V160.769" stroke="#BCC5DC" stroke-width="5" stroke-miterlimit="10"/><path d="M172.64 73.1895V148.769" stroke="#BCC5DC" stroke-width="5" stroke-miterlimit="10"/></g><defs><clipPath id="clip0_5251_82466"><rect width="200.51" height="200.83" fill="white" transform="translate(0 101)"/></clipPath><clipPath id="clip1_5251_82466"><rect width="200.51" height="200.83" fill="white"/></clipPath></defs></svg>`;            
            gridParent.appendChild(newElem)
        }
    }
    document.querySelector(".circle.a").textContent = data.levels[level].a;
    document.querySelector(".circle.b").textContent = data.levels[level].b;
}

let level = 1;

setupGrid()