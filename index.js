
const userForm = document.getElementById("user_input");
const response = document.getElementById("response");
const X=document.querySelectorAll('.x-button');
const yError = document.getElementById("y-error");
const submitButton = document.getElementById("submit-button");

const xClick = document.querySelector(".x-button:disabled");
const yInput=document.getElementById("y-input-field");
const rInput = document.getElementById("r-input-field");
const rError =document.getElementById("r-error");
const time = document.getElementById("time");
const executionTime = document.getElementById("execution-time");
const history = document.getElementById("history");
const hitting = document.getElementById("hitting");

let tableData = [];
let markerY = false;
let markerR=false;
let markerX = true;
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
window.onload = function (){
    restoreTable();
}
userForm.addEventListener("submit", function (e){
    e.preventDefault();
    const y = document.getElementById("y-input-field").value.replace(",", ".");
    let r = document.getElementById("r-input-field").value.replace(",", ".");
    const x = document.querySelector(".x-button:disabled").value;

    if (isNaN(parseFloat(x))){
        return;
    }
    else if(parseFloat(x)< -5 || parseFloat(x)>3){
        return;
    }

    const input_data = x+','+y+','+r;
    const url = "checker.php?input_data="+input_data;

    const req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {

            let tmpArray = req.responseText.split(",");
            tableData.push(tmpArray);
            saveTable()
            if (tmpArray[0] === "Invalid input") {
                response.textContent=tmpArray[0];
                response.style.visibility="visible";
            } else
            {
                if (tmpArray[0] === "The point fell into the area!!!") {
                    flower.src = "images/2.jpg";
                    flower.style.visibility = "visible";
                    response.style.color = "#406719";
                    response.style.border = "4px solid #3f6619"
                    response.style.fontWeight = "900";
                    response.style.background = "#a8c28b";

                } else {
                    flower.src = "images/1.jpg";
                    flower.style.visibility = "visible";
                    response.style.color = "#5b0505";
                    response.style.border = "4px solid #5b0505";
                    response.style.background = "#c07373"
                    response.style.fontWeight = "900";

                }


                addRow(tmpArray)
               // controlLocalStorage(tmpArray)
                response.textContent = tmpArray[0];
                response.style.visibility = "visible";

            }
        }
    };

    req.open("GET",url, true);
    req.send();
    return false;
})

// xClick.addEventListener("click", function (){
//     const tmpX = X.value;
//     if (isNaN(parseFloat(tmpX))) {
//         markerX = false
//     }
// })

yInput.addEventListener("input", function (){
    let tmpY = yInput.value;
    tmpY = tmpY.replace(",", ".")


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
    let tmpR = rInput.value;
    tmpR = tmpR.replace(",", ".")

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
    return  a>= -5 && a <= 3 && !(a.trim()==="") && !isNaN(parseFloat(a));
}
function isValidR(a){
    return  a >= 1 && a <= 4 && !(a.trim()==="") && !isNaN(parseFloat(a));
}



let keys = 0;

// function controlLocalStorage(tmpArray){
//     // keys += 1;
//     // localStorage.setItem(keys.toString(), JSON.stringify(tmpArray));
//     // if (localStorage.length >= 10) {
//     //     localStorage.removeItem(localStorage.key(localStorage.length - 1));
//     // }
//     // keys += 1;
//     //
//     // const timestamp = Date.now() + keys; // Создаем уникальный timestamp
//     // localStorage.setItem(timestamp.toString(), JSON.stringify(tmpArray));
//     // if (localStorage.length > 10) {
//     //     localStorage.removeItem(localStorage.key(localStorage.length - 1));
//     //}
//     for (let i = localStorage.length - 1; i >= 0; i--) {
//         const key = localStorage.key(i);
//         const updatedArray = JSON.parse(localStorage.getItem(key));
//         localStorage.removeItem(key);
//         localStorage.setItem((i+1).toString(), JSON.stringify(updatedArray));
//     }
//
//     localStorage.setItem("0", JSON.stringify(tmpArray));
//
//     if (localStorage.length > 10) {
//         localStorage.removeItem("10");
//     }
//
//
// }
//
// function showHistory (){
//     const tmpK = Object.keys(localStorage).sort();
//     for (let i = 0; i <= tmpK.length; i++) {
//         const key = tmpK[i];
//         const jsonString = localStorage.getItem(key);
//         const tmpArray = JSON.parse(jsonString);
//
//         controlTime(tmpArray);
//         controlExecutionTime(tmpArray);
//         controlHistory(tmpArray);
//         controlHitting(tmpArray);
//     }
//
// }

const TABLE_SAVE_LOCATION = "lab_1_table_data";

const saveField = (name, value) => {
    localStorage.setItem(name, value);
}
function saveTable (){
    saveField(TABLE_SAVE_LOCATION, btoa(JSON.stringify(tableData)))
    console.log("lll")
}
const getField = name => {
    return localStorage.getItem(name)
}

const restoreTable = () => {
    const rawTableData = getField(TABLE_SAVE_LOCATION)
    if (!rawTableData) {
        return
    }
    const data = JSON.parse(atob(rawTableData))
    tableData = data
    data.forEach(it => addRow(it))
    console.log("llllllllll")
}
function controlHistory(tmpArray){
    const historyEl = document.createElement("div");
    historyEl.textContent = "x:"+tmpArray[3]+" y:"+tmpArray[4]+" r:"+tmpArray[5];
    history.insertBefore(historyEl, history.firstChild);
    if (history.children.length>10){
        history.removeChild(history.lastChild);
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
function controlExecutionTime(tmpArray){
    const exTimeEl = document.createElement("div");
    exTimeEl.textContent = tmpArray[2]
    executionTime.insertBefore(exTimeEl, executionTime.firstChild);
    if (executionTime.children.length>10){
        executionTime.removeChild(executionTime.lastChild);
    }
}

function controlHitting(tmpArray){
    const hittingEl = document.createElement("div");
    hittingEl.textContent = tmpArray[6];
    hitting.insertBefore(hittingEl, hitting.firstChild);
    if (hitting.children.length>10){
        hitting.removeChild(hitting.lastChild);
    }
}

const addRow = tmpArray => {
    controlHistory(tmpArray);
    controlTime(tmpArray);
    controlExecutionTime(tmpArray);
    controlHitting(tmpArray);
}


function scaleButton(button, scale) {
    button.style.transform = `scale(${scale})`;
}

function scaleButtonOut(button, scale) {
    button.style.transform = `scale(${scale})`;
}

