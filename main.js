let names, prices, codes, amounts, pName, price, code, amount
let trnum = 0
let table = document.getElementById("table")
let content
let row
let columns
let updatePlace
let update = false
let columnNumber = document.createAttribute("columnNumber")
let trying = localStorage.getItem('hello')
let money
if (localStorage.getItem('names') == null) {
    names = []
    prices = []
    codes = []
    amounts = []
    money = 0
} else {
    names = localStorage.getItem('names').split(',')
    prices = localStorage.getItem('prices').split(',')
    codes = localStorage.getItem('codes').split(',')
    amounts = localStorage.getItem('amounts').split(',')
    money = localStorage.getItem('money')
    document.getElementById('money').innerText = 'monry you got: ' + money + '$'
    for (let jp = 0; jp < names.length; jp++) {
        if (amounts[jp] > 0) { createRow(names[jp], prices[jp] + ' $', codes[jp], amounts[jp]) } else { trnum++ }
    }
}
function createColumn(content) {
    columns = document.createElement("th")
    columns.appendChild(content)
    row.appendChild(columns)
}
function addContent(text) {
    let content = document.createTextNode(text)
    return content
}
function createRow(name, price, code, amount) {
    row = document.createElement("tr")
    row.setAttribute("id", 'h' + trnum)
    let button = document.createElement("button")
    button.textContent = 'U'
    button.setAttribute('columnNumber', trnum)
    button.onclick = function () {
        update = true
        document.getElementById('add').textContent = "update"
        let place = button.getAttribute('columnNumber')
        document.getElementById('name').value = names[place]
        document.getElementById('price').value = prices[place]
        document.getElementById('code').value = codes[place]
        document.getElementById('amount').value = amounts[place]
        updatePlace = place
    }
    createColumn(button)
    createColumn(addContent(name))
    columns.setAttribute("id", 'n' + trnum)
    createColumn(addContent(price))
    columns.setAttribute("id", 'p' + trnum)
    createColumn(addContent(code))
    columns.setAttribute("id", 'c' + trnum)
    createColumn(addContent(amount))
    columns.setAttribute("id", 'a' + trnum)
    let Dbutton = document.createElement("button")
    Dbutton.textContent = '$'
    Dbutton.setAttribute('columnNumber', trnum)
    Dbutton.onclick = function () {
        let place = Dbutton.getAttribute('columnNumber')
        let amount = document.getElementById('a' + place)
        let amountValue = amount.textContent
        amount.textContent = amountValue -= 1
        amounts[place] = amountValue
        money += +prices[place]
        document.getElementById('money').innerText = 'monry you got: ' + money + '$'
        if (amountValue <= 0) {
            document.getElementById('h' + place).style.display = 'none'
        }
        localStorage.setItem('amounts', amounts)
        localStorage.setItem('money', money)
    }
    createColumn(Dbutton)
    table.appendChild(row)
    trnum++
}
function addcheck() {
    pName = (document.getElementById('name').value).toLowerCase()
    price = document.getElementById('price').value
    code = document.getElementById('code').value
    amount = document.getElementById('amount').value
    if (pName == '' || price == '' || code == '' || amount == '') {
        document.getElementById('warning').style.display = 'block'
    } else {
        document.getElementById('warning').style.display = 'none'
        add()
    }
}
function add() {
    if (update) {
        pName = (document.getElementById('name').value).toLowerCase()
        price = document.getElementById('price').value
        code = document.getElementById('code').value
        amount = document.getElementById('amount').value
        names[updatePlace] = pName
        prices[updatePlace] = price
        codes[updatePlace] = code
        amounts[updatePlace] = amount
        document.getElementById('n' + updatePlace).textContent = pName
        document.getElementById('p' + updatePlace).textContent = price + ' $'
        document.getElementById('c' + updatePlace).textContent = code
        document.getElementById('a' + updatePlace).textContent = amount
        update = false
        document.getElementById('add').textContent = "add"
    } else {
        pName = (document.getElementById('name').value).toLowerCase()
        price = document.getElementById('price').value
        code = document.getElementById('code').value
        amount = document.getElementById('amount').value
        names.push(pName)
        prices.push(price)
        codes.push(code)
        amounts.push(amount)
        createRow(pName, price + ' $', code, amount)
    }
    localStorage.setItem('names', names)
    localStorage.setItem('prices', prices)
    localStorage.setItem('codes', codes)
    localStorage.setItem('amounts', amounts)
}