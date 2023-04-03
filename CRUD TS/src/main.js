function getElement(id) {
    var element = document.getElementById(id);
    if (!element) {
        throw new Error("Could not find element");
    }
    return element;
}
var initialObj = {
    products: [],
};
var inputName = getElement('inputName');
var inputDescription = getElement('inputDescription');
var inputPrice = getElement('inputPrice');
var inputImage = getElement('inputImage');
var submitBtn = getElement('submitBtn');
var addProductModal = getElement('productAdd');
var viewProductModal = getElement('productView');
var savedData = localStorage.getItem('ProductList');
var productData = getElement('productData');
var toastLiveExample = getElement('liveToast');
var toast = new bootstrap.Toast(toastLiveExample);
if (savedData != null) {
    initialObj.products = JSON.parse(savedData);
}
var oninputError = function (id) {
    var element = getElement(id);
    element.style.borderColor = "red";
    setTimeout(function () {
        element.style.borderColor = "";
    }, 1500);
};
var validateData = function (product) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var isValid = true;
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
    // if (!product.productImage) {
    //     oninputError(args[3]);
    //     isValid = false;
    // }
    return isValid;
};
var clearInputs = function () {
    inputName.value = "";
    inputDescription.value = "";
    inputPrice.value = "";
    inputImage.value = "";
};
// const compressImage = (imgFile: File, callback: (blob: Blob | null) => void): void => {
//     const reader: FileReader = new FileReader();
//     reader.addEventListener('load', () => {
//         const img: HTMLImageElement = new Image();
//         img.src = reader.result as string;
//         img.onload = (): void => {
//             const canvas: HTMLCanvasElement = document.createElement('canvas');
//             if (img.height > img.width) {
//                 canvas.width = 900;
//                 canvas.height = 1125;
//             } else if (img.height < img.width) {
//                 canvas.width = 900;
//                 canvas.height = 506.25;
//             } else {
//                 canvas.width = 300;
//                 canvas.height = 300;
//             }
//             const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
//             ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//             canvas.toBlob((blob: Blob | null): void => callback(blob), 'image/jpeg', 0.5);
//         };
//     });
//     reader.readAsDataURL(imgFile);
// };
// const convertImageToString = (): string | null => {
//     const imageFile = inputImage.files ? inputImage.files[0] : null;
//     const reader = new FileReader();
//     if (imageFile) {
//         reader.readAsDataURL(imageFile)
//         reader.onload = () => {
//             return reader.result
//         }            
//     }
//     null
// }
////////////////////////////////
//Create Product
////////////////////////////////
var getProduct = function () {
    var product = {
        productName: inputName.value,
        productDescription: inputDescription.value,
        productPrice: parseInt(inputPrice.value),
    };
    if (validateData(product, "inputName", "inputDescription", "inputPrice"))
        return product;
};
// const addProduct = (product: Product): void => {
//     if (typeof product.productImage === 'undefined') return
//     compressImage(product.productImage, (compressedBlob) => {
//         if (!compressedBlob) return;
//         const compressedReader = new FileReader();
//         compressedReader.addEventListener('load', () => {
//             const compressedImageData = compressedReader.result as string;
//             initialObj.products.push(product);
//             try {
//                 localStorage.setItem('addProduct', JSON.stringify(initialObj.products));
//                 getProduct();
//             } catch (err) {
//                 alert("Storage full!! Please remove some products from your List.");
//                 return;
//             }
//             getElement('toastMessage').innerHTML = "Product added successfully!!!";
//             toast.show();
//             clearInputs();
//             getElement('closeAddBtn').click();
//         });
//         // if(typeof compressedBlob == 'null') return
//         compressedReader.readAsDataURL(compressedBlob);
//     });
// }
var addProduct = function (product, imageFile) {
    if (imageFile === undefined) {
        oninputError('inputImage');
        return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = function () {
        product.productImage = reader.result;
        initialObj.products.push(product);
        localStorage.setItem('ProductList', JSON.stringify(initialObj.products));
        getElement('toastMessage').innerHTML = "Product added successfully!!!";
        toast.show();
        getElement('closeAddBtn').click();
        showProducts();
    };
};
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var product = getProduct();
    if (typeof product === "undefined" || inputImage.files === null)
        return;
    addProduct(product, inputImage.files[0]);
});
addProductModal.addEventListener('hide.bs.modal', function () {
    clearInputs();
    showProducts();
});
////////////////////////////////
//Read Product
////////////////////////////////
var showProducts = function () {
    if (!productData)
        return;
    productData.innerHTML = "";
    initialObj.products.forEach(function (data, index) {
        if (!productData)
            return;
        productData.innerHTML += "\n        <tr>\n        <td scope=\"row\">".concat(index + 1, "</td>\n        <td class=\"nameCol\">").concat(data.productName, "</td>\n        <td class=\"descCol\">").concat(data.productDescription, "</td>\n        <td class=\"priceCol\">").concat(data.productPrice, "</td>\n        <td class=\"imgCol\"><img src=\"").concat(data.productImage, "\" height=auto width=100px></img></td>\n            <td class=\"btnCol\">\n                 <button  type=\"button\" class=\"btn editBtn\"  data-bs-toggle=\"modal\" data-bs-target=\"#productView\"  data-bs-whatever=\"update\" onclick=\"productInfo(").concat(index, ")\">\n                 <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-box-arrow-up-right\" viewBox=\"0 0 16 16\">\n                 <path fill-rule=\"evenodd\" d=\"M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z\"/>\n                 <path fill-rule=\"evenodd\" d=\"M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z\"/>\n               </svg>\n                </button>\n                <button type=\"button\" class=\"btn delBtn\" onclick=\"deleteProduct(").concat(index, ")\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash3\" viewBox=\"0 0 16 16\">\n                    <path d=\"M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z\"/>\n                    </svg></i>\n                </button>\n            </td>\n        </tr>");
    });
};
////////////////////////////////
//Update Product
////////////////////////////////
var productInfo = function (index) {
    if (typeof index === 'string')
        return;
    getElement('updateName').value = initialObj.products[index].productName;
    getElement('updateDescription').value = initialObj.products[index].productDescription;
    getElement('updatePrice').value = String(initialObj.products[index].productPrice);
    getElement('viewImage').innerHTML = "\n    <img src=\"".concat(initialObj.products[index].productImage, "\" class=\"img img-fluid\"></img>");
    getElement('updateBtn').onclick = function () {
        if (inputImage.files === null) {
            return;
        }
        updateData(index);
    };
};
var updateData = function (index) {
    var _a;
    var pName = (getElement('updateName')).value;
    var pDescription = (getElement('updateDescription')).value;
    var pPrice = (getElement('updatePrice')).value;
    var pImage = (_a = (getElement('updateImage')).files) === null || _a === void 0 ? void 0 : _a[0];
    var productDetails = initialObj.products;
    var product = {
        productName: pName,
        productDescription: pDescription,
        productPrice: parseInt(pPrice),
    };
    if (validateData(product, "updateName", "updateDescription", "updatePrice")) {
        productDetails[index].productName = pName;
        productDetails[index].productDescription = pDescription;
        productDetails[index].productPrice = parseInt(pPrice);
        var reader_1 = new FileReader();
        if (pImage) {
            reader_1.readAsDataURL(pImage);
            reader_1.onload = function () {
                productDetails[index].productImage = reader_1.result;
                localStorage.setItem('ProductList', JSON.stringify(productDetails));
                getElement('toastMessage').innerHTML = "Product added successfully!!!";
                toast_1.show();
                getElement('closeAddBtn').click();
                showProducts();
                return;
            };
        }
        // if (pImage) {
        //     compressImage(pImage, (compressedBlob: Blob) => {
        //         const compressedReader = new FileReader();
        //         compressedReader.addEventListener('load', () => {
        //             const compressedImageData = compressedReader.result;
        //             productDetails[index].pImage = compressedImageData;
        //             localStorage.setItem('productList', JSON.stringify(productDetails));
        //             getProduct();
        //         });
        //         compressedReader.readAsDataURL(compressedBlob);
        //     });
        // }
        // localStorage.setItem('ProductList', JSON.stringify(productDetails));
        var toastLiveExample_1 = document.getElementById('liveToast');
        var toast_1 = new bootstrap.Toast(toastLiveExample_1);
        document.getElementById('toastMessage').innerHTML = "Product Updated successfully!!!";
        toast_1.show();
        getElement('closeBtn').click();
    }
};
viewProductModal.addEventListener('hide.bs.modal', function () {
    showProducts();
});
////////////////////////////////
//Delete Product
////////////////////////////////
var deleteProduct = function (index) {
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
var deleteAllBtn = getElement('deleteAllBtn');
deleteAllBtn.onclick = function () {
    if (confirm('Are you sure you want to delete all products?')) {
        setTimeout(function () {
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
var table = document.getElementById("displayTable");
var filterData = function () {
    var input = document.getElementById("sortInput");
    var filter = input.value.toUpperCase();
    var tr = table === null || table === void 0 ? void 0 : table.querySelectorAll("tr");
    for (var i = 0; i < tr.length; i++) {
        var td = tr[i].querySelectorAll("td")[1];
        if (td) {
            var txtValue = td.textContent || td.innerText;
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
    var timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn();
        }, delay);
    };
}
var searchProduct = debounceFunc(filterData, 800);
////////////////////////////////
//sort Product
////////////////////////////////
var sortData = function (column) {
    var _a;
    var rows, switching, i, row1, row2, shouldSwitch, dir, switchcount = 0;
    var table = getElement("displayTable");
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
