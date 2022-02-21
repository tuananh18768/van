var newUrl = ' http://localhost:3000/News';

function show() {
    axios.get(newUrl)
        .then(res => {
            if (res.statusText === "OK") {
                document.querySelector('#news').innerHTML = '';
                var data = res.data;
                var content = ``;
                data.forEach(news => {
                    content += `<tr id="row-${news.id}">
                            <td>${news.id}</td>
                            <td>${news.name}</td>
                            <td>
                                <img src="${news.image}" width="100px" class="img img-avatar"/>
                            </td> 
                            <td>${news.content}</td>
                            <td>
                                
                                <button class="btn btn-sm btn-success"  onclick="editNew(${news.id})" data-toggle="modal"
                                data-target="#edit">Sửa</button>  
                                <button class="btn btn-sm btn-danger"  onclick="removeNew(${news.id})">Xóa</button>  
 
                            </td>
            
                        </tr>`;
                });
                document.querySelector('#news').innerHTML = content;
            }
        });
}
show();

function removeNew(removeId) {
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
            var deleteUrl = newUrl + "/" + removeId;
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
const form_edit = document.querySelector('#form_edit');
const id_edit = document.querySelector('input[name=id]');
const name_edit = document.querySelector('#name_edit');
const image_edit = document.querySelector('#image_edit');
const content_edit = document.querySelector('#content_edit');
//them
form.onsubmit = async function(e) {
        e.preventDefault();
        const name = document.querySelector('[name="name"]').value;
        const image = document.querySelector('[name="image"]').value;
        const content = document.querySelector('[name="content"]').value;
        let max;
        await axios.get(newUrl).then((res) => {
            max = parseInt(res.data[res.data.length - 1].id) + 1;
        });
        const requestObj = {
            name: name,
            image: image,
            content: content,
            id: max
        };
        console.log(requestObj);
        var option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestObj)
        }
        fetch(newUrl, option)
            .then(response => {
                return response.json();
            })
            .then(data => {

                $("#add_new").modal("hide");
                show();
                form.reset();
            })
    }
    //sua thong tin san pham
function editNew(id) {

    fetch(`${newUrl}/${id}`)
        .then(res => {
            return res.json()
        })
        .then(data => {
            id_edit.value = id;
            name_edit.value = data.name;
            image_edit.value = data.image;
            content_edit.value = data.content;

        })
    console.log(`${newUrl}/${id}`);


}
document.querySelector('#form_edit').addEventListener("submit", (e) => {
    e.preventDefault();
    axios.put(`${newUrl}/${document.querySelector('input[name=id]').value}`, {
            image: document.querySelector('#image_edit').value,
            name: document.querySelector('#name_edit').value,
            content: document.querySelector('#content_edit').value
        }).then((res) => {
            console.log(res.data);

        })
        .then(data => {

            $("#edit").modal("hide");
            show();
            form.reset();
        });
});