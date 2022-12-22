var state={
    balance:1000,
    income:2000,
    expense:1000,
    transactions:[
        // {id:uniqueId(),name:'Salary',amount: 2000,type:"in"},
        // {id:uniqueId(),name:'Grocery',amount: 1000,type:"ex"},
        // {id:uniqueId(),name:'Grocery2',amount: 500,type:"ex"},
    ]
}

var balanceRem=document.querySelector("#bal");
var incomeRem=document.querySelector("#in");
var expenseRem=document.querySelector("#ex");
var transactionsRem=document.querySelector('.history-list');

var inbtn=document.querySelector("#in-btn");
var exbtn=document.querySelector("#ex-btn");
var nameinput=document.querySelector("#name");
var amountinput=document.querySelector("#amount");

function init(){
    updatestate();
    initListener();
    // running();
}

function initListener(){
    inbtn.addEventListener('click',onAddIncomeClick);
    exbtn.addEventListener('click',onAddExpenseClick);
}

function onAddIncomeClick(){
    // console.log("in "+nameinput.value+" "+amountinput.value);
    if(nameinput.value=="" || amountinput.value==""){
        alert('Enter the valid details');
    }
    else{
        var transaction={name:nameinput.value,amount:parseInt(amountinput.value),type:"in"};
        state.transactions.push(transaction);
        updatestate();
    }   
    nameinput.value='';
    amountinput.value='';
}

function onAddExpenseClick(){
    // console.log("ex");
    if(nameinput.value=="" || amountinput.value==""){
        alert('Enter the valid details');
    }
    else{
        var transaction={id: uniqueId(),name:nameinput.value,amount:parseInt(amountinput.value),type:"ex"};
        state.transactions.push(transaction);
        updatestate();
    }
    nameinput.value='';
    amountinput.value='';
}

function updatestate(){
    var balance=0;
    var income=0;
    var expense=0;
    var item;

    for(var i=0;i<state.transactions.length;i++){
        item=state.transactions[i];
        if(item.type=='in'){
            income+=item.amount;
        }
        if(item.type=='ex'){
            expense+=item.amount;
        }
    }
    balance=income-expense;
    // console.log(balance+" "+income +" "+expense);
    state.balance=balance;
    state.income=income;
    state.expense=expense;

    running();
}

function trash(event){
    // console.log(event.target);
    var id=event.target.getAttribute('id');
    var deletein;
    for(var i=0;i<state.transactions.length;i++){
        if(state.transactions[i].id===parseInt(id)){
            deletein=i;
            break;
        }
    }
    state.transactions.splice(deletein,1);
    updatestate();
}

function uniqueId(){
    return Math.round(Math.random()*100000);
}

function running(){
    balanceRem.innerHTML=`₹${state.balance}`;
    incomeRem.innerHTML=`₹${state.income}`;
    expenseRem.innerHTML=`₹${state.expense}`;

    var transactionRem;

    transactionsRem.innerHTML=``;//most important step you first need to clear the previous UI and reframe the current UI

    for(var i=0;i<state.transactions.length;i++){
        state.transactions[i].id=uniqueId();
        transactionRem=document.createElement('article');
        transactionRem.classList.add('.history-item');
        transactionRem.innerHTML=`
        <p class="title">${state.transactions[i].name}</p>
        <div class="btn-container">
        <p class="${state.transactions[i].type}-amt">${state.transactions[i].amount}</p>
        <button type="button" class="delete-btn" id="${state.transactions[i].id}">
            <i class="fas fa-trash"></i>
        </button>
        </div>
        `;
        transactionsRem.appendChild(transactionRem);
        // transactionRem.append(state.transactions[i].name);

        // state.transactions[i].id=uniqueId();
        var delbtn=document.querySelector('.delete-btn');
        // delbtn.setAttribute('data-id',state.transactions[i].id);
        delbtn.addEventListener('click',trash);//which button to access so we need identity that is the id
    }
}
init();


