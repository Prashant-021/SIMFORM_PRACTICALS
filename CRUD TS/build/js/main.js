"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Could not find element`);
    }
    return element;
}
let initialObj = {
    products: [],
};
const inputName = getElement('inputName');
const inputDescription = getElement('inputDescription');
const inputPrice = getElement('inputPrice');
const inputImage = getElement('inputImage');
const submitBtn = getElement('submitBtn');
const addProductModal = getElement('productAdd');
const viewProductModal = getElement('productView');
const savedData = localStorage.getItem('ProductList');
const productData = getElement('productData');
const toastLiveExample = getElement('liveToast');
const toast = new bootstrap.Toast(toastLiveExample);
if (savedData != null) {
    initialObj.products = JSON.parse(savedData);
}
const oninputError = (id) => {
    let element = getElement(id);
    element.style.borderColor = "red";
    setTimeout(() => {
        element.style.borderColor = "";
    }, 1500);
};
const validateData = (product, ...args) => {
    let isValid = true;
    if (product.productName === "") {
        oninputError(args[0]);
        isValid = false;
    }
    if (product.productDescription === "") {
        oninputError(args[1]);
        isValid = false;
    }
    if (isNaN(product.productPrice)) {
        oninputError(args[2]);
        isValid = false;
    }
    return isValid;
};
const clearInputs = () => {
    inputName.value = "";
    inputDescription.value = "";
    inputPrice.value = "";
    inputImage.value = "";
};
const compressImage = (imgFile, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            if (img.height > img.width) {
                canvas.width = 900;
                canvas.height = 1125;
            }
            else if (img.height < img.width) {
                canvas.width = 900;
                canvas.height = 506.25;
            }
            else {
                canvas.width = 300;
                canvas.height = 300;
            }
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob) => {
                    callback(blob);
                }, 'image/jpeg', 0.5);
            }
            else {
                callback(null);
            }
        };
    });
    reader.readAsDataURL(imgFile);
};
////////////////////////////////
//Create Product
////////////////////////////////
const getProduct = () => {
    let product = {
        productName: inputName.value,
        productDescription: inputDescription.value,
        productPrice: parseInt(inputPrice.value),
    };
    if (validateData(product, "inputName", "inputDescription", "inputPrice"))
        return product;
};
const addProduct = (product, compressedImage) => {
    if (!compressedImage) {
        console.error('Error compressing image.');
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(compressedImage);
    reader.onload = () => {
        if (product) {
            product.productImage = reader.result;
            initialObj.products.push(product);
            localStorage.setItem('ProductList', JSON.stringify(initialObj.products));
            getElement('toastMessage').innerHTML = "Product added successfully!!!";
            toast.show();
            getElement('closeAddBtn').click();
            showProducts();
        }
    };
};
submitBtn.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    e.preventDefault();
    let product = getProduct();
    let imageFile = (_a = inputImage.files) === null || _a === void 0 ? void 0 : _a[0];
    if (typeof product === "undefined" || inputImage.files === null)
        return;
    if (imageFile) {
        compressImage(imageFile, (compressedImage) => {
            addProduct(product, compressedImage);
        });
    }
}));
addProductModal.addEventListener('hide.bs.modal', function () {
    clearInputs();
    showProducts();
});
////////////////////////////////
//Read Product
////////////////////////////////
const showProducts = () => {
    if (!productData)
        return;
    productData.innerHTML = "";
    initialObj.products.forEach((data, index) => {
        if (!productData)
            return;
        productData.innerHTML += `
        <tr>
        <td scope="row">${index + 1}</td>
        <td class="nameCol">${data.productName}</td>
        <td class="descCol">${data.productDescription}</td>
        <td class="priceCol">${data.productPrice}</td>
        <td class="imgCol"><img src="${data.productImage}" height=auto width=100px></img></td>
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
        </tr>`;
    });
};
////////////////////////////////
//Update Product
////////////////////////////////
const productInfo = (index) => {
    if (typeof index === 'string')
        return;
    getElement('updateName').value = initialObj.products[index].productName;
    getElement('updateDescription').value = initialObj.products[index].productDescription;
    getElement('updatePrice').value = String(initialObj.products[index].productPrice);
    getElement('viewImage').innerHTML = `
    <img src="${initialObj.products[index].productImage}" class="img img-fluid"></img>`;
    getElement('updateBtn').onclick = () => {
        if (inputImage.files === null) {
            return;
        }
        updateData(index);
    };
};
const updateData = (index) => {
    var _a;
    const pName = (getElement('updateName')).value;
    const pDescription = (getElement('updateDescription')).value;
    const pPrice = (getElement('updatePrice')).value;
    const pImage = (_a = (getElement('updateImage')).files) === null || _a === void 0 ? void 0 : _a[0];
    const productDetails = initialObj.products;
    let product = {
        productName: pName,
        productDescription: pDescription,
        productPrice: parseInt(pPrice),
    };
    if (validateData(product, "updateName", "updateDescription", "updatePrice")) {
        productDetails[index].productName = pName;
        productDetails[index].productDescription = pDescription;
        productDetails[index].productPrice = parseInt(pPrice);
        const reader = new FileReader();
        if (pImage) {
            compressImage(pImage, (compressedImage) => {
                if (compressedImage) {
                    reader.readAsDataURL(compressedImage);
                    reader.onload = () => {
                        productDetails[index].productImage = reader.result;
                        localStorage.setItem('ProductList', JSON.stringify(productDetails));
                        getElement('toastMessage').innerHTML = "Product added successfully!!!";
                        toast.show();
                        getElement('closeAddBtn').click();
                        showProducts();
                        return;
                    };
                }
            });
        }
        document.getElementById('toastMessage').innerHTML = "Product Updated successfully!!!";
        toast.show();
        getElement('closeBtn').click();
    }
};
viewProductModal.addEventListener('hide.bs.modal', function () {
    getElement('updateImage').value = "";
    showProducts();
});
////////////////////////////////
//Delete Product
////////////////////////////////
const deleteProduct = (index) => {
    if (confirm('Are you sure you want to delete?')) {
        initialObj.products.splice(index, 1);
        localStorage.setItem('ProductList', JSON.stringify(initialObj.products));
        getElement('toastMessage').innerHTML = "Product Deleted successfully!!!";
        toast.show();
        showProducts();
    }
    else {
        return;
    }
};
const deleteAllBtn = getElement('deleteAllBtn');
deleteAllBtn.onclick = () => {
    if (confirm('Are you sure you want to delete all products?')) {
        setTimeout(() => {
            localStorage.clear();
            document.getElementById('toastMessage').innerHTML = "All Products Deleted!!!";
            toast.show();
        }, 0);
    }
    location.reload();
};
////////////////////////////////
//Search Product
////////////////////////////////
const table = document.getElementById("displayTable");
const filterData = () => {
    const input = document.getElementById("sortInput");
    const filter = input.value.toUpperCase();
    const tr = table === null || table === void 0 ? void 0 : table.querySelectorAll("tr");
    for (let i = 0; i < tr.length; i++) {
        const td = tr[i].querySelectorAll("td")[1];
        if (td) {
            const txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }
            else {
                tr[i].style.display = "none";
            }
        }
    }
};
function debounceFunc(fn, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn();
        }, delay);
    };
}
const searchProduct = debounceFunc(filterData, 800);
////////////////////////////////
//sort Product
////////////////////////////////
const sortData = (column) => {
    var _a;
    let rows, switching, i, row1, row2, shouldSwitch, dir, switchcount = 0;
    const table = getElement("displayTable");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table === null || table === void 0 ? void 0 : table.rows;
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
                }
                else {
                    if (row1.innerHTML.toLowerCase() > row2.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            else if (dir == "desc") {
                if (column == 3 || column == 0) {
                    if (Number(row1.innerHTML) < Number(row2.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
                else {
                    if (row1.innerHTML.toLowerCase() < row2.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            (_a = rows[i].parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        }
        else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
};
showProducts();
