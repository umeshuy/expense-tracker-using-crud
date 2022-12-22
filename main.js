var expForm = document.getElementById("expense-form")

expForm.addEventListener("submit", save)


function save(event) {
    event.preventDefault();
    // console.log(event)
    const expenseAmount = document.getElementById('expenseAmount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const obj = {
        expenseAmount,
        description,
        category
    }
    axios.post("https://crudcrud.com/api/4183b8c8945e49138be4f942f20df992/expenseTrackerData", obj)
        .then((res) => {
            showExpenseDetails(res.data);
            //  console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })

    // localStorage.setItem(obj.description, JSON.stringify(obj));   
}
window.addEventListener('DOMContentLoaded', (event) => {
    axios.get("https://crudcrud.com/api/4183b8c8945e49138be4f942f20df992/expenseTrackerData")
        .then((res) => {
            for (var i = 0; i < res.data.length; i++) {
                showExpenseDetails(res.data[i])
            }
            // console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    // Object.keys(localStorage).forEach(key => {
    //     const user = JSON.parse(localStorage.getItem(key))
    //     showExpenseDetails(user);
    // })
})

function showExpenseDetails(user) {
    const parentNode = document.getElementById('listofusers');
    const childHtml = `<li id=${user._id}> ${user.expenseAmount} - ${user.description}-'${user.category}'
    <button onclick=deleteUser('${user._id}')> Delete User </button>
    <button onclick=editUserDetails('${user.description}','${user.expenseAmount}','${user.category}','${user._id}')>Edit User </button>
 </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHtml;

}


function deleteUser(userid) {
    axios.delete(`https://crudcrud.com/api/4183b8c8945e49138be4f942f20df992/expenseTrackerData/${userid}`)
    .then((res) => {
        removeItemFromScreen(userid);
    })
    .catch((err) => {
        console.log(err)
    })
    // localStorage.removeItem(description)
    // removeItemFromScreen(description)
}


function removeItemFromScreen(userid) {
    const parentNode = document.getElementById('listOfusers');
    const elem = document.getElementById(userid)
    parentNode.removeChild(elem)
}



function editUserDetails(description, expenseAmount, category,userid) {

    document.getElementById('description').value = description;
    document.getElementById('expenseAmount').value = expenseAmount;
    document.getElementById('category').value = category;
    deleteUser(userid)
}