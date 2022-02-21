var productUrl = ' http://localhost:3000/products';

function show() {

    axios.get(productUrl)
        .then(res => {
            // console.log(res.data)
            if (res.statusText === "OK") {
                document.querySelector('#pro').innerHTML = '';
                var data = res.data;
                var content = ``;
                data.forEach(pro => {
                    content += `<tr id="row-${pro.id}">
                            <td>${pro.id}</td>
                            <td>${pro.name}</td>
                            <td>
                                <img src="${pro.image}" width="100px" class="img img-avatar"/>
                            </td> 
                            <td>${pro.price}</td>
                            <td>${pro.type}</td>

                            <td>
                                
                                <button class="btn btn-sm btn-success"  onclick="editpro(${pro.id})" data-toggle="modal"
                                data-target="#edit">Sửa</button>  
                                <button class="btn btn-sm btn-danger"  onclick="removePro(${pro.id})">Xóa</button>  
 
                            </td>
            
                        </tr>`;
                });
                document.querySelector('#pro').innerHTML = content;
            }
        });
}

show();

function removePro(removeId) {
    // confirm
    Swal.fire({
        title: 'Chắc chắn xóa ?',
        text: "Một đi không trở lại!!",
        icon: 'danger',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý!',
        cancelButtonText: 'Không đồng ý!'
    }).then((result) => {
        if (result.value) {
            // gửi request lên server
            var deleteUrl = productUrl + "/" + removeId;
            axios.delete(deleteUrl)
                .then(response => {
                    console.log(response);
                })
                .then(() => {
                    var removeElement = document.querySelector('#row-' + removeId);
                    removeElement.remove();
                    Swal.fire({

                        icon: 'success',
                        title: 'Đã xóa',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        }
    })

}




const form = document.querySelector('#formadd');
const form_edit = document.querySelector('#form-edit');
const id_edit = document.querySelector('input[name=id]');
const name_edit = document.querySelector('#name_edit');
const image_edit = document.querySelector('#image_edit');
const price_edit = document.querySelector('#price_edit');
form.onsubmit = async function(e) {
    e.preventDefault();
    const name = document.querySelector('[name="name"]').value;
    const image = document.querySelector('[name="image"]').value;
    const price = document.querySelector('[name="price"]').value;
    const type = document.querySelector("#addProduct").value;
    let requestObj = {};
    let max;
    await axios.get(productUrl).then((res) => {
        max = parseInt(res.data[res.data.length - 1].id) + 1;
    });
    requestObj = {
        name: name,
        image: image,
        price: price,
        type: type,
        id: max

    };

    var option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestObj)
    }
    fetch(productUrl, option)
        .then(response => {
            return response.json();
        })
        .then(data => {
            $("#exampleModal").modal("hide");
            show();
            form.reset();
        })
}

function renderCategorys() {
    axios.get("http://localhost:3000/categorys").then((res) => {
        const contentHTML = res.data.reduce((content, item) => {
            content += `
            <option value="${item.name}">${item.name}</option>
            `;
            return content;
        }, "");
        document.getElementById("addProduct").innerHTML = contentHTML;
        document.getElementById("type").innerHTML = contentHTML;
    });
}
renderCategorys();
//sua thong tin san pham
function editpro(id) {
    console.log(type);

    // type.inner
    fetch(`${productUrl}/${id}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            id_edit.value = id;
            name_edit.value = data.name;
            image_edit.value = data.image;
            price_edit.value = data.price;
        })
    console.log(`${productUrl}/${id}`);
}
document.querySelector('#form-edit').addEventListener("submit", (e) => {
    e.preventDefault();
    axios.put(`${productUrl}/${document.querySelector('input[name=id]').value}`, {
            image: document.querySelector('#image_edit').value,
            name: document.querySelector('#name_edit').value,
            price: document.querySelector('#price_edit').value,
            type: document.querySelector('#type').value
        }).then((res) => {;
        })
        .then(data => {
            $("#edit").modal("hide");
            show();
            form.reset();
        });
});
// var validate = new Bouncer('#formadd');