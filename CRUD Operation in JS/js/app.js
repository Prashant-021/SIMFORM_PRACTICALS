const productAdded = document.getElementById('submitBtn');
let productDetails = []; 
const emptyProductList = document.querySelector('.emptyProductList')


const inputName = document.getElementById('inputName');
const inputDescription = document.getElementById('inputDescription');
const inputPrice = document.getElementById('inputPrice');
const inputImage = document.getElementById('inputImage');
let flag = true;
if (localStorage.getItem('addProduct') != null) {
    productDetails = JSON.parse(localStorage.getItem('addProduct'));
}

const clearInputs = () => {
    inputName.value = "";
    inputDescription.value = "";
    inputPrice.value = "";
    inputImage.value = "";
}

let success = true;
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
            } else if (img.height < img.width) {
                canvas.width = 900;
                canvas.height = 506.25;
            } else {
                canvas.width = 300;
                canvas.height = 300;
            }
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            canvas.toBlob((blob) => {
                callback(blob);
            }, 'image/jpeg', 0.5);
        };
    });

    reader.readAsDataURL(imgFile);
};

// Function to add product
const addProduct = () => {
    const pName = inputName.value;
    const pDescription = inputDescription.value;
    const pPrice = inputPrice.value;
    const pImage = inputImage.files[0];

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
    if (!pImage) {
        alert('Please select image');
        return;
    }

    compressImage(pImage, (compressedBlob) => {
        const compressedReader = new FileReader();

        compressedReader.addEventListener('load', () => {
            const compressedImageData = compressedReader.result;
            productDetails.push({
                pName: pName,
                pDescription: pDescription,
                pPrice: pPrice,
                pImage: compressedImageData
            });

            try {
                localStorage.setItem('addProduct', JSON.stringify(productDetails));
                getProduct();
            } catch (err) {
                alert("Storage full!! Please remove some products from your List.");
                return;
            }

            const toastLiveExample = document.getElementById('liveToast')
            const toast = new bootstrap.Toast(toastLiveExample)
            document.getElementById('toastMessage').innerHTML = "Product added successfully!!!";
            toast.show()

            clearInputs();
            document.querySelector('#closeAddBtn').click();
        });

        compressedReader.readAsDataURL(compressedBlob);
    });
};


const deleteProduct = (index) => {
    if (confirm('Are you sure you want to delete?')) {
        productDetails.splice(index, 1);
        localStorage.setItem('addProduct', JSON.stringify(productDetails));

        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)
        document.getElementById('toastMessage').innerHTML = "Product Deleted successfully!!!";
        toast.show()
        getProduct();
    } else {
        return;
    }
}

const productInfo = (index) => {
    document.getElementById('updateName').value = productDetails[index].pName;
    document.getElementById('updateDescription').value = productDetails[index].pDescription;
    document.getElementById('updatePrice').value = productDetails[index].pPrice;
    document.getElementById('viewImage').innerHTML = `
    <img src="${productDetails[index].pImage}" class="img img-fluid"></img>`;
    document.getElementById('updateBtn').onclick = () => {
        updateData(index);
    }
}
const updateData = (index) => {
    const pName = document.getElementById('updateName').value;
    const pDescription = document.getElementById('updateDescription').value;
    const pPrice = document.getElementById('updatePrice').value;
    const pImage = document.getElementById('updateImage').files[0];
    if (pName === "" || pDescription === "" || pPrice === "") {
        alert('Please enter value for product');
        return 0;
    } else {

        productDetails[index].pName = pName;
        productDetails[index].pDescription = pDescription;
        productDetails[index].pPrice = pPrice;
        if (pImage) {
            compressImage(pImage, (compressedBlob) => {
                const compressedReader = new FileReader();

                compressedReader.addEventListener('load', () => {
                    const compressedImageData = compressedReader.result;
                    productDetails[index].pImage = compressedImageData;
                    localStorage.setItem('addProduct', JSON.stringify(productDetails));
                    getProduct();

                });

                compressedReader.readAsDataURL(compressedBlob);
            });
        }
        localStorage.setItem('addProduct', JSON.stringify(productDetails));
        getProduct();
        const toastLiveExample = document.getElementById('liveToast')
        const toast = new bootstrap.Toast(toastLiveExample)
        document.getElementById('toastMessage').innerHTML = "Product Updated successfully!!!";
        toast.show()
        getProduct();
    }
    document.querySelector('#closeBtn').click();
}

const noProducts = () => {
    if (productDetails.length === 0) {
        emptyProductList.innerHTML += `
        <div>
        <img src="./img/noProduct.webp" width="40%" height="auto" alt="">
                    
            <h2><strong>No Product Data to show</strong></h2> 
        </div>`;
    }
    else {
        emptyProductList.innerHTML = "";
    }
}

let productData = document.getElementById('productData');

const clearList = () => {
    if(confirm('Are you sure you want to delete all products?')){
        localStorage.clear();
        window.location.reload();
    }
}

const getProduct = () => {
    noProducts()
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

const sortData = (column) => {
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

const addProductModal = document.getElementById('productAdd');
addProductModal.addEventListener('hide.bs.modal', function () {
    clearInputs();
})

getProduct();