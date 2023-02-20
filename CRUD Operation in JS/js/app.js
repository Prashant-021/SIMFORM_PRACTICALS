let productAdded = document.getElementById('addProductForm');
let productID = 0;


function addProduct(e) {
    e.preventDefault();
    productID++;
    let productdetails = [];
    let pName = document.getElementById('inputName');
    let pDescription = document.getElementById('inputDescription');
    let pPrice = document.getElementById('inputPrice');
    let pImage = document.getElementById('inputImage');

    console.log(pName.value);
    productdetails.push(
        {
            pName: pName.value,
            // pDescription: pDescription.value
            pPrice : pPrice.value,
        },
        // {pImage : pImage.value}
    );
    console.log(productdetails);
    // alert(`Product Added`);
}

productAdded.addEventListener('submit', addProduct);