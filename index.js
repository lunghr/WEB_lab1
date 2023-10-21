
const userForm = document.getElementById("user_input");
const response = document.getElementById("response");
const X=document.querySelectorAll('.x-button');
const yError = document.getElementById("y-error");
const submitButton = document.getElementById("submit-button");


const yInput=document.getElementById("y-input-field");
const rInput = document.getElementById("r-input-field");
const rError =document.getElementById("r-error");
const time = document.getElementById("time");
const executionTime = document.getElementById("execution-time");
const history = document.getElementById("history");
let markerY = false;
let markerR=false;
const flower = document.getElementById("flower");
X.forEach(function (button){
    button.addEventListener("click", function (){
        X.forEach(function (btn){
            btn.disabled=false;
            btn.classList.remove("disabled");
        })
        button.disabled = true;
        button.classList.add("disabled");

    })
})


userForm.addEventListener("submit", function (e){
    e.preventDefault();
    const y = document.getElementById("y-input-field").value;
    const r = document.getElementById("r-input-field").value;
    const x = document.querySelector(".x-button:disabled").value;

    const input_data = x+','+y+','+r;
    const url = "checker.php?input_data="+input_data;

    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200){

            let tmpArray=req.responseText.split(",");
            if (tmpArray[0] ===  "The point fell into the area!!!"){
                flower.src="images/2.jpg";
                flower.style.visibility="visible";
                response.style.color="#406719";
                response.style.border="4px solid #3f6619"
                response.style.fontWeight="900";
                response.style.background="#a8c28b";

            }else{
                flower.src="images/1.jpg";
                flower.style.visibility="visible";
                response.style.color="#5b0505";
                response.style.border ="4px solid #5b0505";
                response.style.background="#c07373"
                response.style.fontWeight="900";

            }





            controlHistory(tmpArray)
            controlExecutionTime(tmpArray);
            controlTime(tmpArray);
            response.textContent = tmpArray[0];
            response.style.visibility="visible";
        }
    };

    req.open("GET",url, true);
    req.send();
    return false;
})

yInput.addEventListener("input", function (){
    const tmpY = yInput.value;

    if (isValidY(tmpY)){
        yError.style.visibility="hidden";
        submitButton.disabled = !markerR;
        flower.src="images/waiting1.gif";
        yInput.style.background="#cccce1"
        markerY=true;
    }else{
        yError.style.visibility = "visible";
        submitButton.disabled = "true";
        markerY=false;
        flower.src="images/4.jpg";
        yInput.style.background="#eab6b6"
    }
})

rInput.addEventListener("input", function (){
    const tmpR = rInput.value;

    if (isValidR(tmpR)){
        rError.style.visibility="hidden";
        submitButton.disabled = !markerY;
        flower.src="images/waiting1.gif"
        rInput.style.background="#cccce1"
        markerR=true;
    }else{
        rError.style.visibility = "visible";
        submitButton.disabled = "true";
        flower.src="images/4.jpg";
        markerR=false;
        rInput.style.background="#eab6b6"
    }
})
function isValidY(a){
    return  a>= -5 && a <= 3 && !(a.trim()==="");
}
function isValidR(a){
    return  a >= 1 && a <= 4 && !(a.trim()==="");
}
function scaleButton(button, scale) {
    button.style.transform = `scale(${scale})`;
    button.classList.add("onMouse");
}

function scaleButtonOut(button, scale) {
    button.style.transform = `scale(${scale})`;
    button.classList.remove("onMouse");
}

function controlHistory(tmpArray){
    const historyEl = document.createElement("div");
    historyEl.textContent = "x:"+tmpArray[3]+" y:"+tmpArray[4]+" r:"+tmpArray[5];
    history.insertBefore(historyEl, history.firstChild);
    if (history.children.length>10){
        history.removeChild(history.lastChild);
    }
}

function controlExecutionTime(tmpArray){
    const exTimeEl = document.createElement("div");
    exTimeEl.textContent = tmpArray[2]
    executionTime.insertBefore(exTimeEl, executionTime.firstChild);
    if (executionTime.children.length>10){
        executionTime.removeChild(executionTime.lastChild);
    }
}

function controlTime(tmpArray){
    const timeEl = document.createElement("div");
    timeEl.textContent = tmpArray[1];
    time.insertBefore(timeEl, time.firstChild);
    if (time.children.length>10){
        time.removeChild(time.lastChild);
    }
}


