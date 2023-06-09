function chonKichThuoc() {
    var gray = '#f0f0f0';
    var red = 'red';
    var white = 'white';
    var black = 'black';

    function sizeNumb() {
        for (var i = 38; i < 43; i++) {
            document.getElementById(`size-numb-${i}`).style.color = black;
            document.getElementById(`size-numb-${i}`).style.backgroundColor = gray;
        }
    }

    document.getElementById('size-numb-38').onclick = function() {
        sizeNumb()
        document.getElementById('size-numb-38').style.color = white;
        document.getElementById('size-numb-38').style.backgroundColor = black;
    }

    document.getElementById('size-numb-39').onclick = function() {
        sizeNumb()
        document.getElementById('size-numb-39').style.color = white;
        document.getElementById('size-numb-39').style.backgroundColor = black;
    }

    document.getElementById('size-numb-40').onclick = function() {
        sizeNumb()
        document.getElementById('size-numb-40').style.color = white;
        document.getElementById('size-numb-40').style.backgroundColor = black;
    }

    document.getElementById('size-numb-41').onclick = function() {
        sizeNumb()
        document.getElementById('size-numb-41').style.color = white;
        document.getElementById('size-numb-41').style.backgroundColor = black;
    }

    document.getElementById('size-numb-42').onclick = function() {
        sizeNumb()
        document.getElementById('size-numb-42').style.color = white;
        document.getElementById('size-numb-42').style.backgroundColor = black;
    }
}

function soLuongSanPham() {
    var soLuong = 1;
    var soLayDuoc = +document.getElementById('get-price').innerHTML;
    
    document.getElementById('btn-plus').onclick = function() {
        soLuong++;  
        document.getElementById('quantity').innerHTML = soLuong;
        document.getElementById('get-price').innerHTML =  soLayDuoc*soLuong;
    }

    document.getElementById('btn-minus').onclick = function() {
        if (soLuong >= 2) {
            soLuong--;
            document.getElementById('quantity').innerHTML = soLuong;
    
        }
        else {
            document.getElementById('quantity').innerHTML = '1';
        }
        document.getElementById('get-price').innerHTML =  soLayDuoc*soLuong;
    }

    
    
}

function renderTableSanPham(arrSanPham, myParam) {
    var htmlString1 = '';
    var htmlString2 = '';
    var htmlString3 = '';
    var htmlString4 = '';

    myParam = myParam - 1;

    var sp = arrSanPham[myParam];
    const arrRelated = JSON.parse(sp.relatedProducts);
    var related0 = arrSanPham[arrRelated[0]-1];

    console.log(arrRelated);
    console.log(related0);

    
    

    htmlString1 = `<img src="${sp.image}" alt="..." />`;
    htmlString2 = `<h1>${sp.name}</h1>
                    <p>
                        ${sp.description}
                    </p>

                    <h2>Available size</h2>

                    <div class="shoes-size" >
                        <button class="size-38" id="size-numb-38" value="38">38</button>
                        <button class="size-39" id="size-numb-39" value="39">39</button>
                        <button class="size-40" id="size-numb-40" value="40">40</button>
                        <button class="size-41" id="size-numb-41" value="41">41</button>
                        <button class="size-42" id="size-numb-42" value="42">42</button>
                    </div>

                    <div class="prices">
                        <p id="get-price">${sp.price}</p>
                        <p>$</p>
                    </div>

                    <div class="shoes-quantity">
                        <button class="btn-plus" id="btn-plus">
                            <i class="fa fa-plus"></i>
                        </button>
                        <p id="quantity">1</p>
                        <button class="btn-plus" id="btn-minus">
                            <i class="fa fa-minus"></i>
                        </button>
                    </div>

                    
                    <button class="btn-add-to-cart">
                        Add to cart
                    </button>
    `; 

    for (var index = 0; index < arrRelated.length; index++) {
        var spRelatedIndex = arrRelated[index]-1;
        var spRelated = arrSanPham[arrRelated[index]-1];
        console.log(spRelatedIndex);

        htmlString4 += `
            <div class="col">
                <div class="card item-${spRelatedIndex}" id="related-item-${spRelatedIndex}">
                    <img src="${spRelated.image}" alt="..."/>

                    <div class="card-body">
                        <div class="name-price">
                            <h1 class="name">
                                ${spRelated.name}
                                <br/>
                                <i>${spRelated.shortDescription}</i>
                            </h1>
                        </div>

                        <div class="rating-button">
                            <button class="btn-buy">
                                <a href="/detail_folder/detail.html?id=${spRelated.id}">Buy now</a>
                            </button>
                            <p class="price">${spRelated.price}$</p>
                        </div>
                    </div>
                </div>
            </div>  
        `;
    
    }

    // htmlString3 = `
    //     <img src="${related0.image}" alt="..."/>

    //     <div class="card-body">
    //         <div class="name-price">
    //             <h1 class="name">
    //                 ${related0.name}
    //                 <br/>
    //                 <i>${related0.shortDescription}</i>
    //             </h1>
    //         </div>
    //         <div class="rating-button">
    //             <button class="btn-buy">
    //                 <a href="/detail_folder/detail.html?id=${related0.id}">Buy now</a>
    //             </button>
    //             <p class="price">${related0.price}$</p>
    //         </div>
    //     </div>    
    // `;
    

    document.getElementById('image00').innerHTML = htmlString1;
    document.getElementById('title00').innerHTML = htmlString2;
    // document.getElementById('related-item-1').innerHTML = htmlString3;
    document.getElementById('extra-relatedSP').innerHTML = htmlString4;
    
    chonKichThuoc();
    soLuongSanPham();

    return htmlString1, htmlString2, htmlString3, htmlString4;
}

function layDanhSachSanPham(myParam) {
    //Call API
    var promise = axios({
        url: 'https://shop.cyberlearn.vn/api/Product/', //Đường link API hoặc file local
        method: 'GET',
        responseType: 'json',
    })

    //Thành công
    promise.then(function(res){
        renderTableSanPham(res.data.content, myParam);  
        console.log(res.data.content);      
    })

    //Thất bại
    promise.catch(function(err) {
        console.error(err);
    })
}

window.onload = function() {
    //Sự kiện khi browser load xong dữ liệu.
    
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('id');
    console.log('params',myParam)

    //call api load lên giao diện
    layDanhSachSanPham(myParam);
}








