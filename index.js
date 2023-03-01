document.getElementById('expForm').addEventListener('submit', addExpense);

// initial array of expenses, reading from localStorage
window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/a34afc9e29b541bcb48011ff22ceb652/Expenses")
         .then((response)=>{
            for(let i=0;i<response.data.length;i++){
                showExpenses(response.data[i])
            }
          })
         .catch((err)=>{
            console.log(err)
          })

})

function showExpenses(exp){
    const parentNode = document.getElementById('ExpenseTable');
    const childHTML = `<li id=${exp._id}> ${exp.type} - ${exp.amount}
                            <button onclick="deleteExpense('${exp._id}')"> Delete </button>
                             
                         </li>`

    parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
function addExpense(e){
    e.preventDefault();

    // get type, name, date, and amount
    let type = document.getElementById('type').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;

    if(type != 'chooseOne' 
        && name.length > 0 
        && amount > 0){
        const expense = {
            type, 
            name, 
            amount

        }

        axios.post("https://crudcrud.com/api/a34afc9e29b541bcb48011ff22ceb652/Expenses",expense)
             .then((response)=>{
                showExpenses(expense)
                console.log(response)
                })
             .catch((err)=>{
                 document.body.innerHTML=document.body.innerHTML+"<h4>Something went wrong</h4>"
                 console.log(err)
                });
        console.log(expense);
        // localStorage 
        //localStorage.setItem('expenses', JSON.stringify(expenses));

    }

    //document.getElementById('expForm').reset();

}



function deleteExpense(expenseId){

    axios.delete(`https://crudcrud.com/api/a34afc9e29b541bcb48011ff22ceb652/Expenses/${expenseId}`)
         .then((response)=>{
             console.log("user deleted");
             removeExpense(expenseId)
             })
         .catch((err)=>{
             console.log(err)
             })

}



function editExpense(type,amount,expenseId){

        document.getElementById('type').value=type;
        document.getElementById('amount').value=amount;

        deleteExpense(expenseId);

}
function removeExpense(expenseId){
    const parentNode = document.getElementById('ExpenseTable');
    const childNodeToBeDeleted = document.getElementById(expenseId);

    parentNode.removeChild(childNodeToBeDeleted)
}    
