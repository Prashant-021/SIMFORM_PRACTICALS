const productAdded = document.getElementById('submitBtn');
let productDetails = [];

const inputName = document.getElementById('inputName');
const inputDescription = document.getElementById('inputDescription');
const inputPrice = document.getElementById('inputPrice');
const inputImage = document.getElementById('inputImage');

if (localStorage.getItem('addProduct') != null) {
    productDetails = JSON.parse(localStorage.getItem('addProduct'));
}


const addProduct = () => {
    const pName = inputName.value;
    const pDescription = inputDescription.value;
    const pPrice = inputPrice.value;
    const pImage = inputImage;

    if (!pName) {
        alert('Please enter product name');
        return;
    }
    if (!pDescription) {
        alert('Please enter product description');
        return;
    }
    if (!pPrice) {
        alert('Please enter product price');
        return;
    }
    if (!pImage.value) {
        alert('Please select image');
        return;
    }
    const reader = new FileReader();
    const size =
        (pImage.files[0].size / 1024 / 1024).toFixed(2);
    console.log(size);
    if (size > 0.5) {
        alert('Image size should be less than 500kb');
        return;
    }
    reader.readAsDataURL(pImage.files[0]);
    reader.addEventListener('load', () => {
        productDetails.push(
            {
                pName: pName,
                pDescription: pDescription,
                pPrice: pPrice,
                pImage: reader.result
            }
        );

        try {
            localStorage.setItem('addProduct', JSON.stringify(productDetails));
        }
        catch (err) {
            alert("Storage full!! Please remove some products from your List.");
            getProduct();
        }
        inputName.value = "";
        inputDescription.value = "";
        inputPrice.value = "";
        inputImage.value = "";
    })
    document.querySelector('#close').click();
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete?')) {
        productDetails.splice(index, 1);
        localStorage.setItem('addProduct', JSON.stringify(productDetails));
        getProduct();
    } else {
        return;
    }
}

function productInfo(index) {
    document.getElementById('updateName').value = productDetails[index].pName;
    document.getElementById('updateDescription').value = productDetails[index].pDescription;
    document.getElementById('updatePrice').value = productDetails[index].pPrice;
    document.getElementById('viewImage').innerHTML = `
    <img src="${productDetails[index].pImage}" class="img img-fluid"></img>`;
    document.getElementById('updateBtn').onclick = () => {
        updateData(index);
    }
}
function updateData(index) {
    const pName = document.getElementById('updateName').value;
    const pDescription = document.getElementById('updateDescription').value;
    const pPrice = document.getElementById('updatePrice').value;
    const pImage = document.getElementById('updateImage');
    if (pName === "" || pDescription === "" || pPrice === "") {
        alert('Please enter value for product');
        return 0;
    } else {
        productDetails[index].pName = pName;
        productDetails[index].pDescription = pDescription;
        productDetails[index].pPrice = pPrice;
        const reader = new FileReader();
        if (pImage.value !== "") {
            reader.readAsDataURL(pImage.files[0]);
            reader.addEventListener('load', () => {
                productDetails[index].pImage = reader.result;
                localStorage.setItem('addProduct', JSON.stringify(productDetails));
                getProduct();
            });
        }
        localStorage.setItem('addProduct', JSON.stringify(productDetails));
        getProduct();
        alert(`Product Updated`);
    }
    document.querySelector('#closeBtn').click();
}


let productData = document.getElementById('productData');

function getProduct() {
    productData.innerHTML = "";
    productDetails.forEach((data, index) => {
        productData.innerHTML += `
        <tr>
            <td scope="row">${index + 1}</td>
            <td class="nameCol">${data.pName}</td>
            <td class="descCol">${data.pDescription}</td>
            <td class="priceCol">${data.pPrice}</td>
            <td class="imgCol"><img src="${data.pImage}" height=auto width=100px></img></td>
            <td class="btnCol">
                 <button  type="button" class="btn editBtn"  data-bs-toggle="modal" data-bs-target="#productView"  data-bs-whatever="update" onclick="productInfo(${index})">
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                 <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
                 <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/>
               </svg>
                </button>
                <button type="button" class="btn delBtn" onclick="deleteProduct(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                    </svg></i>
                </button>
            </td>
        </tr>`
    });
}

const table = document.getElementById("displayTable");
const filterData = () => {
    const input = document.getElementById("sortInput");
    const filter = input.value.toUpperCase();
    const tr = table.querySelectorAll("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].querySelectorAll("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function debounceFunc(fn, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, delay);
    }

}
const searchProduct = debounceFunc(filterData, 800);

function sortData(column) {
    var rows, switching, i, row1, row2, shouldSwitch, dir, switchcount = 0;

    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            row1 = rows[i].getElementsByTagName("TD")[column];
            row2 = rows[i + 1].getElementsByTagName("TD")[column];

            if (dir == "asc") {
                if (column == 3 || column == 0) {
                    if (Number(row1.innerHTML) > Number(row2.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (row1.innerHTML.toLowerCase() > row2.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (dir == "desc") {
                if (column == 3 || column == 0) {
                    if (Number(row1.innerHTML) < Number(row2.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {

                    if (row1.innerHTML.toLowerCase() < row2.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }

}
getProduct();