let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;


//get total
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#5efc20';
    }else{
        total.innerHTML = '';
        total.style.background = '#fc2020';
    }
}


// create product
let datePro;

if (localStorage.product != null){
    datePro = JSON.parse(localStorage.product);
} else {
    datePro = [];
}

showData();

submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    // count
    if (title.value != ''
        &&price.value != ''
        &&category.value != ''
        &&newPro.count < 100 ) {
        if (mood === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    datePro.push(newPro);
                }
            }else{
                datePro.push(newPro);
            }
        }else{
            datePro[tmp] = newPro;
            mood = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
    }

    // save to local storage :)
    localStorage.setItem('product', JSON.stringify(datePro));

    showData();
}

// clear inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// read
function showData() {
    getTotal();
    let table = '';
    for (let i = 0; i < datePro.length; i++) {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${datePro[i].title}</td>
                <td>${datePro[i].price}</td>
                <td>${datePro[i].taxes}</td>
                <td>${datePro[i].ads}</td>
                <td>${datePro[i].discount}</td>
                <td>${datePro[i].total}</td>
                <td>${datePro[i].category}</td>
                <td><button onclick="updateData(${i})" class="update-btn">update</button></td>
                <td><button onclick="deleteData(${i})" class="delete-btn">delete</button></td>
            </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteALL');
    if (datePro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()" >Delete All (${datePro.length})</button>`
    }else{
        btnDelete.innerHTML = '';
    }
}


// delete
function deleteData(i) {
    datePro.splice(i,1);
    localStorage.product = JSON.stringify(datePro);
    showData();
}

function deleteAll(){
    localStorage.clear();
    datePro.splice(0);
    showData();
}

// update
function updateData(i) {
    title.value = datePro[i].title;
    price.value = datePro[i].price;
    taxes.value = datePro[i].taxes;
    ads.value = datePro[i].ads;
    discount.value = datePro[i].discount;
    category.value = datePro[i].category;

    count.style.display = 'none';
    submit.innerHTML = 'update';

    mood = 'Update';
    tmp = i;
    scroll({
        top:0
    });

    getTotal();
}


// search
let searchMood = 'title';
function getSreachMood(id) {
    let searchBar = document.getElementById('search');

    if (id == 'searchTitle') {
        searchMood = 'title';
    }else{
        searchMood = 'category';
    }
    searchBar.placeholder = 'Search By '+ searchMood;

    searchBar.value = '';
    searchBar.focus();
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < datePro.length; i++) {
    if (searchMood == 'title') {
            if (datePro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datePro[i].title}</td>
                        <td>${datePro[i].price}</td>
                        <td>${datePro[i].taxes}</td>
                        <td>${datePro[i].ads}</td>
                        <td>${datePro[i].discount}</td>
                        <td>${datePro[i].total}</td>
                        <td>${datePro[i].category}</td>
                        <td><button onclick="updateData(${i})" class="update-btn">update</button></td>
                        <td><button onclick="deleteData(${i})" class="delete-btn">delete</button></td>
                    </tr>`;
        }
    } else {
            if (datePro[i].category.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${datePro[i].title}</td>
                        <td>${datePro[i].price}</td>
                        <td>${datePro[i].taxes}</td>
                        <td>${datePro[i].ads}</td>
                        <td>${datePro[i].discount}</td>
                        <td>${datePro[i].total}</td>
                        <td>${datePro[i].category}</td>
                        <td><button onclick="updateData(${i})" class="update-btn">update</button></td>
                        <td><button onclick="deleteData(${i})" class="delete-btn">delete</button></td>
                    </tr>`;
            }
    }
}

    document.getElementById('tbody').innerHTML = table;
}



// clean data
