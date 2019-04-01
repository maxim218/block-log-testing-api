"use strict";

// init port number
const PORT = 5000;

////////////////////////////////////////////////////////////////////////////

// import module
const express = require("express");

////////////////////////////////////////////////////////////////////////////

// run server
const app = express();
const port = parseInt(PORT.toString());
app.listen(port);
console.log("Server port: " + port);

////////////////////////////////////////////////////////////////////////////

// set headers
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Team", "Main-42-Team");
    next();
});

////////////////////////////////////////////////////////////////////////////

// catch post query
app.post("/api/work", function (request, response) {
    // load body
    loadBody(request, response);
});

////////////////////////////////////////////////////////////////////////////

// load body
function loadBody(request, response) {
    // array for saving parts of body
    const buffer = [];
    request.on('data', (data) => {
        // add body part to array
        buffer.push(data);
    }).on('end', () => {
        // join all parts to string
        const bodyString = buffer.join("");
        // control body content
        let bodyObject = null;
        try {
            bodyObject = JSON.parse(bodyString);
        } catch (err) {
            bodyObject = null;
        }
        if(bodyObject === null) {
            // send error
            response.status(400);
            response.end("");
        } else {
            // continue working
            workWithObject(bodyObject, response);
        }
    });
}

////////////////////////////////////////////////////////////////////////////

// work with object
function workWithObject(bodyObject, response) {
    //
    // fake for DOM elements object
    const documentObject = {
        consoleBoxContentValuesBoxForInputData: {
            value: "",
            innerHTML: "",
            focus: () => {},
        },
        consoleBox: {
            value: "",
            innerHTML: "",
            focus: () => {},
        },
        consoleBoxContentValuesBox: {
            value: "",
            innerHTML: "",
            focus: () => {},
        },
        userPictureBox: {
            value: "",
            innerHTML: "",
            focus: () => {},
        },
        statBox: {
            value: "",
            innerHTML: "",
            focus: () => {},
        },
        testingOutputBox: {
            value: "",
            innerHTML: "",
            focus: () => {},
        },
        testInputForm: {
            value: "",
            innerHTML: "",
            focus: () => {},
        }
    };

    // get fake object element
    function getId(idString) {
        return documentObject[idString];
    }

    // init test array
    const TESTS_MAIN_ARRAY = bodyObject['testsArray'];

    let programContentBigString = "";

    let ansString = "";
    ansString = bodyObject["fileContent"];
    programContentBigString = ansString + "";
    //
    //
    let errorsFlag = false;
    //
    for(let i = 0; i < TESTS_MAIN_ARRAY.length; i++) {
        const TEST = TESTS_MAIN_ARRAY[i];
        getId("consoleBoxContentValuesBoxForInputData").value = TEST.inputArray.join(" ");
        getId("testingOutputBox").innerHTML += ("Input: " + TEST.inputArray.join(" ") + "<br>");
        let obj = null;
        try {
            obj = JSON.parse(programContentBigString);
        } catch (err) {
            obj = null;
        }
        try {
            testWork(obj, getId);
        } catch (err) {
            getId("consoleBoxContentValuesBox").value = "Ошибка в программе";
        }

        const outputString = getId("consoleBoxContentValuesBox").value;

        if(outputString === TEST.outputArray.join("  ") + "  ") {
            getId("testingOutputBox").innerHTML += ("Right output: " + TEST.outputArray.join("  ") + "<br>");
            getId("testingOutputBox").innerHTML += ("Your output: " + outputString + "<br>");
            getId("testingOutputBox").innerHTML += ("Test: OK" + "<br><br>");
        } else {
            getId("testingOutputBox").innerHTML += ("Right output: " + TEST.outputArray.join("  ") + "<br>");
            getId("testingOutputBox").innerHTML += ("Your output: " + outputString + "<br>");
            getId("testingOutputBox").innerHTML += ("Test: ERROR" + "<br><br>");
            errorsFlag = true;
        }
    }
    //
    //
    getId("testInputForm").innerHTML = "<hr>";
    //
    if(errorsFlag === true) {
        getId("testingOutputBox").innerHTML += "Status: ERROR";
    } else {
        getId("testingOutputBox").innerHTML += "Status: OK";
    }
    ////
    console.log("----------------------------------");
    const RESPONSE_TEXT = (getId("testingOutputBox").innerHTML + " ").split("<br>").join("\n").split("  ").join(" ");
    console.log(RESPONSE_TEXT);
    ////
    response.end(RESPONSE_TEXT + "")
}

////////////////////////////////////////////////////////////////////////////

/*
    *********************************************************************************
    =================================================================================
    *********************************************************************************
    =================================================================================
    *********************************************************************************
    =================================================================================
    *********************************************************************************
    =================================================================================
    *********************************************************************************
    =================================================================================
    *********************************************************************************
    =================================================================================
    *********************************************************************************
    =================================================================================
    *********************************************************************************
    =================================================================================
    *********************************************************************************
    =================================================================================
    *********************************************************************************
    =================================================================================
*/

////////////////////////////////////////////////////////////////////////////

"use strict";

function testWork(objParam, getId) {
    function setEmptyTableCode() {
        // empty
    }
    const GLOBAL_MAIN_OBJECT = objParam;
    GLOBAL_MAIN_OBJECT.userCanvasMan = {
        drawLine: function() {},
        clearBackground: function() {},
    };
    function global() {
        return GLOBAL_MAIN_OBJECT;
    }
    const BOX = "box";
    const STR = "str";
    const STR_SECOND = "str_second";
    class DragControl {
        static inBox(boxX, boxY, boxW, boxH, xx, yy) {
            if (boxX <= xx && xx <= boxX + boxW) {
                if (boxY <= yy && yy <= boxY + boxH) {
                    return true;
                }
            }
            return false;
        }
    }
    const START_VALUE = 0;
    const CODE_OK = "x11111x11111x111xOKxCODEx11xMaxim";
    const CODE_ERROR = "x22222x222x2222xERRORxCODEx22xMaxim";
    const MAX_OPERATIONS_VALUE = 999999;
    let count = 0;
    class ProgramRunner {
        static setFocusToInputField() {
            getId("consoleBoxContentValuesBoxForInputData").focus();
        }
        constructor() {
            count += 1;
            console.log("Create ProgramRunner (number: " + count + ")");
            // set focus to input
            ProgramRunner.setFocusToInputField();
        }
        writeContent(content) {
            //
            this.textArrayForRender.push(content + "  ");
            //
        }
        static getContentArray() {
            const contentArrayGlobal = global().programContent;
            const contentArrayString = JSON.stringify(contentArrayGlobal);
            return JSON.parse(contentArrayString.toString());
        }
        findStartBlock() {
            const arr = this.arr;
            for (let i = 0; i < arr.length; i++) {
                const b = arr[i];
                if (b.startBloc) {
                    return b;
                }
            }
            return undefined;
        }
        clearConsole() {
            this.printIngBox = getId('consoleBoxContentValuesBox');
            this.printIngBox.value = "";
        }
        static hideConsole() {
            const consoleBoxId = 'consoleBox';
            ////
            getId(consoleBoxId).hidden = false;
        }
        initCopyVariablesObject() {
            this.variables = {};
            const objString = JSON.stringify(global().variablesContent);
            this.variables = JSON.parse(objString.toString());
        }
        runProgram() {
            this.arr = ProgramRunner.getContentArray();
            this.nowBlock = this.findStartBlock();
            // init variables
            this.variables = {};
            // init variables started
            this.initCopyVariablesObject();
            // clear console
            this.clearConsole();
            // hide console
            ProgramRunner.hideConsole();
            // start
            this.startWorking();
        }
        static getHitBlockTochka(xxx, yyy, b) {
            return DragControl.inBox(b.x, b.y, b.w, b.h, xxx, yyy) === true;
        }
        static getHitBlockPoint(xxx, yyy, b) {
            if (ProgramRunner.getHitBlockTochka(xxx, yyy, b) === true) return true;
            if (ProgramRunner.getHitBlockTochka(xxx - 10, yyy - 10, b) === true) return true;
            if (ProgramRunner.getHitBlockTochka(xxx + 10, yyy + 10, b) === true) return true;
            if (ProgramRunner.getHitBlockTochka(xxx + 10, yyy - 10, b) === true) return true;
            if (ProgramRunner.getHitBlockTochka(xxx - 10, yyy + 10, b) === true) return true;
            return null;
        }
        workWithContentOfBlock(nowBlock) {
            /////
            if (nowBlock.connection === true) {
                this.nowOperations += 0.2;
            } else {
                this.nowOperations++;
            }
            /////
            if (this.nowOperations >= this.maxOper) {
                return "VERY_MANY_OPERATIONS_PROBLEM";
            }
            /////
            if (nowBlock.drawingBlockABCZ === true) {
                ///
                this.operationsCountObj.paint++;
                return this.workPaintDrawBlock(nowBlock);
                ///
            } else if (nowBlock.readingDataBox === true) {
                ///
                this.operationsCountObj.read++;
                return this.workReadBlock(nowBlock);
                ///
            } else if (nowBlock.basic === true) {
                ///
                this.operationsCountObj.base++;
                return this.workBasic(nowBlock);
                ///
            } else if (nowBlock.printingVars === true) {
                ///
                this.operationsCountObj.write++;
                return this.workPrintingBlock(nowBlock);
                ///
            } else if (nowBlock.connection === true) {
                ///
                this.operationsCountObj.connect++;
                return true;
                ///
            } else if (nowBlock.vetvlenie === true) {
                ///
                this.operationsCountObj.ifelse++;
                return this.workWithIfElseBlock(nowBlock);
                ///
            }
            return true;
        }
        controlVariable(param) {
            // is it simple number
            const num = parseInt(param);
            if (isNaN(num) === false) {
                // it is simple number
                return num;
            }
            // it is not number
            // if it is simple variable
            if (param.indexOf("_") === -1) {
                if (this.variables[param] === undefined) {
                    this.variables[param] = START_VALUE;
                }
                return this.variables[param];
            }
            // if it is element of array
            const mass = param.split("_");
            const arrayName = mass[0];
            const arrayElem = mass[1];
            if (this.variables[arrayName] === undefined) {
                this.variables[arrayName] = [];
            }
            const n = parseInt(arrayElem);
            if (isNaN(n) === false) {
                // it is number
                return this.variables[arrayName][n];
            } else {
                const k = this.variables[arrayElem];
                return this.variables[arrayName][k];
            }
        }
        controlVariableFinish(param) {
            const resultVar = this.controlVariable(param);
            const resultInt = parseInt(resultVar);
            if (resultInt === null || resultInt === undefined || isNaN(resultInt) === true) {
                return START_VALUE;
            } else {
                return parseInt(resultInt.toString());
            }
        }
        workPaintDrawBlock(nowBlock) {
            let ax = this.controlVariableFinish("ax");
            let ay = this.controlVariableFinish("ay");
            let bx = this.controlVariableFinish("bx");
            let by = this.controlVariableFinish("by");
            let pen = this.controlVariableFinish("pen");
            this.paintFlag = true;
            if (pen === 1) {
                global().userCanvasMan.drawLine(ax, ay, bx, by, "#FF0000");
            } else if (pen === 2) {
                global().userCanvasMan.drawLine(ax, ay, bx, by, "#00FF00");
            } else {
                global().userCanvasMan.drawLine(ax, ay, bx, by, "#0000FF");
            }
        }
        workPrintingBlock(nowBlock) {
            if (nowBlock.action) {
                const action = nowBlock.action;
                const info = this.controlVariableFinish(action.info);
                this.writeContent(info);
                return true;
            }
        }
        workWithIfElseBlock(nowBlock) {
            if (nowBlock.action) {
                const action = nowBlock.action;
                let a = this.controlVariableFinish(action.firstElement);
                let b = this.controlVariableFinish(action.secondElement);
                const act = action.act;
                a = parseInt(a);
                b = parseInt(b);
                let resultFlag = false;
                if (act === "==") {
                    if (a === b) {
                        resultFlag = true;
                    }
                }
                if (act === "<") {
                    if (a < b) {
                        resultFlag = true;
                    }
                }
                if (act === "<=") {
                    if (a <= b) {
                        resultFlag = true;
                    }
                }
                if (resultFlag === true) {
                    return CODE_OK;
                } else {
                    return CODE_ERROR;
                }
            }
        }
        workReadBlock(nowBlock) {
            if (nowBlock.action) {
                const action = nowBlock.action;
                const read = action.read + "";
                const key = read.toString();
                this.controlVariableFinish(key);
                let value = parseInt(this.inpMass[0]);
                try {
                    this.inpMass.splice(0, 1);
                } catch (err) {
                    // err
                }
                if (value === null || value === undefined || isNaN(value) === true) {
                    value = parseInt(START_VALUE);
                }
                // if it is simple variable
                if (key.indexOf('_') === -1) {
                    this.variables[key] = parseInt(value);
                    return;
                }
                // if it is array element
                const mass = key.split("_");
                const arrayName = mass[0];
                const arrayElem = mass[1];
                this.controlVariableFinish(arrayElem);
                const n = parseInt(arrayElem);
                if (isNaN(n) === false) {
                    // it is number
                    this.variables[arrayName][n] = parseInt(value);
                } else {
                    const k = this.variables[arrayElem];
                    this.variables[arrayName][k] = parseInt(value);
                }
            }
        }
        workBasic(nowBlock) {
            if (nowBlock.action) {
                const action = nowBlock.action;
                const res = this.controlVariableFinish(action.tRes);
                const a = this.controlVariableFinish(action.tA);
                const b = this.controlVariableFinish(action.tB);
                const toDo = action.tAction;
                let answer = START_VALUE;
                switch (toDo) {
                    case "+":
                        answer = a + b;
                        break;
                    case "-":
                        answer = a - b;
                        break;
                    case "*":
                        answer = a * b;
                        break;
                    case "/":
                        answer = a / b;
                        break;
                    case "%":
                        answer = a % b;
                        break;
                }
                answer = parseInt(answer.toString());
                const name = action.tRes;
                if (name.indexOf("_") === -1) {
                    this.variables[name] = answer;
                } else {
                    const mass = name.split("_");
                    const arrayName = mass[0];
                    const arrayElem = mass[1];
                    this.controlVariableFinish(arrayElem);
                    const n = parseInt(arrayElem);
                    if (isNaN(n) === false) {
                        // it is number
                        this.variables[arrayName][n] = answer;
                    } else {
                        const k = this.variables[arrayElem];
                        this.variables[arrayName][k] = answer;
                    }
                }
            }
        }
        getVariablesFromInputConsole() {
            const consoleField = getId("consoleBoxContentValuesBoxForInputData");
            const consoleText = consoleField.value + "";
            const arr = consoleText.split(" ");
            this.inpMass = [];
            for (let i = 0; i < arr.length; i++) {
                const x = parseInt(arr[i]);
                if (x === null || x === undefined || isNaN(x) === true) {
                    this.inpMass.push(parseInt(START_VALUE));
                } else {
                    this.inpMass.push(parseInt(x));
                }
            }
            console.log("Input mass: " + this.inpMass);
        }
        initMaxOperationsValue() {
            this.maxOper = MAX_OPERATIONS_VALUE;
            return this.maxOper;
        }
        startWorking() {
            this.printIngBox.value = "";
            let nowBlock = this.nowBlock;
            let arr = this.arr;
            ////
            this.printIngBox.value = "";
            this.textArrayForRender = [];
            ////
            this.getVariablesFromInputConsole();
            ////
            global().userCanvasMan.clearBackground();
            ////
            this.paintFlag = false;
            ////
            // init max operations number
            this.initMaxOperationsValue();
            this.maxOper = parseInt(this.maxOper);
            // current operations number
            this.nowOperations = 0;
            // max operations number
            this.writeMaxOperationsValue();
            // no loop
            let alwaysLoop = false;
            // init operations count start
            this.initOperationsCountStart();
            while (true) {
                const workOutput = this.workWithContentOfBlock(nowBlock);
                if (workOutput === "VERY_MANY_OPERATIONS_PROBLEM") {
                    alwaysLoop = true;
                    ///
                    const cmdBoxID = "consoleBoxContentValuesBox";
                    const cmdBox = getId(cmdBoxID);
                    cmdBox.value += "";
                    cmdBox.value += "Превышено максимальное число операций";
                    cmdBox.value += "";
                    ///
                    break;
                }
                if (workOutput !== CODE_OK && workOutput !== CODE_ERROR) {
                    // not if else block
                    let found = false;
                    for (let i = 0; i < arr.length; i++) {
                        const b = arr[i];
                        if (ProgramRunner.getHitBlockPoint(nowBlock.strFinishX, nowBlock.strFinishY, b)) {
                            nowBlock = b;
                            found = true;
                            break;
                        }
                    }
                    if (found === false) {
                        break;
                    }
                } else {
                    // it is IfElse block
                    let found = false;
                    for (let i = 0; i < arr.length; i++) {
                        const b = arr[i];
                        if (workOutput === CODE_OK) {
                            if (ProgramRunner.getHitBlockPoint(nowBlock.strFinishX, nowBlock.strFinishY, b)) {
                                nowBlock = b;
                                found = true;
                                break;
                            }
                        } else {
                            if (ProgramRunner.getHitBlockPoint(nowBlock.strFinishXsecond, nowBlock.strFinishYsecond, b)) {
                                nowBlock = b;
                                found = true;
                                break;
                            }
                        }
                    }
                    if (found === false) {
                        break;
                    }
                }
            }
            if (this.paintFlag === true) {
                getId("userPictureBox").hidden = false;
            }
            // set focus to input
            ProgramRunner.setFocusToInputField();
            // print operations number obj
            this.printOperationsCountObj();
            if (alwaysLoop === false) {
                // set output box value
                const writeValuesString = this.textArrayForRender.join("");
                getId("consoleBoxContentValuesBox").value = writeValuesString + "";
                // set table value
                const tableCode = this.getTableCode();
                getId("statBox").innerHTML = tableCode.toString();
            } else {
                // set empty table code to element
                setEmptyTableCode();
                // clear user canvas
                global().userCanvasMan.clearBackground();
            }
            this.printVariablesObject();
        }
        printVariablesObject() {
            console.log("Variables: ");
            console.log(this.variables);
        }
        getTableCode() {
            let tableCode = "<b>Статистика</b><br><br>";
            tableCode = tableCode + "<table style = 'margin-left: 15px;'>";
            tableCode = tableCode + ("<tr><td><b>Название</b></td><td><b>Количество</b></td></tr>");
            tableCode = tableCode + ("<tr><td>Базовый</td><td>" + this.operationsCountObj.base + "</td></tr>");
            tableCode = tableCode + ("<tr><td>Ветвление</td><td>" + this.operationsCountObj.ifelse + "</td></tr>");
            tableCode = tableCode + ("<tr><td>Ввод</td><td>" + this.operationsCountObj.read + "</td></tr>");
            tableCode = tableCode + ("<tr><td>Печать</td><td>" + this.operationsCountObj.write + "</td></tr>");
            tableCode = tableCode + ("<tr><td>Рисование</td><td>" + this.operationsCountObj.paint + "</td></tr>");
            tableCode = tableCode + "</table>";
            return tableCode.toString();
        }
        printOperationsCountObj() {
            console.log("*************");
            //////
            console.log(this.operationsCountObj);
            //////
            console.log("*************");
        }
        initOperationsCountStart() {
            this.operationsCountObj = {
                base: 0,
                ifelse: 0,
                connect: 0,
                read: 0,
                write: 0,
                paint: 0,
            };
        }
        writeMaxOperationsValue() {
            console.log("===========");
            console.log("Max operations: " + this.maxOper);
            console.log("===========");
        }
    }
    global().saveAutoFunction = function() {
        // empty
    };
    /////////////
    global().programRunner = null;
    /////////////
    global().saveAutoFunction();
    /////////////
    global().programRunner = null;
    global().programRunner = new ProgramRunner();
    global().programRunner.runProgram();
    global().programRunner = null;
    /////////////
}
