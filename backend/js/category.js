var cateUrl = "http://localhost:3000/categorys";
async function show() {
    console.log('helo')
    await axios.get(cateUrl).then((res) => {
      if (res.statusText === "OK") {
        document.querySelector("#cate").innerHTML = "";
        var data = res.data;
        var content = ``;
        data.forEach((cate) => {
          content += `<tr id="row-${cate.id}">
                            <td>${cate.id}</td>
                            <td>${cate.name}</td>
                            <td>
                                <img src="${cate.image}" width="100px" class="img img-avatar"/>
                            </td> 
                            
                            <td>
                                
                                <button class="btn btn-sm btn-success"  onclick="editCate(${cate.id})" data-toggle="modal"
                                data-target="#edit">Sửa</button>  
                                <button class="btn btn-sm btn-danger"  onclick="removeCate(${cate.id})">Xóa</button>  
 
                            </td>
            
                        </tr>`;
        });
        document.querySelector("#cate").innerHTML = content;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
show();
function removeCate(removeId) {
  // confirm
  Swal.fire({
    title: "Chắc chắn xóa ?",
    text: "Một đi không trở lại!!",
    icon: "danger",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đồng ý!",
    cancelButtonText: "Không đồng ý!",
  }).then((result) => {
    if (result.value) {
      // gửi request lên server
      var deleteUrl = cateUrl + "/" + removeId;
      axios
        .delete(deleteUrl)
        .then((response) => {
          console.log(response);
        })
        .then(() => {
          var removeElement = document.querySelector("#row-" + removeId);
          removeElement.remove();
          Swal.fire({
            icon: "success",
            title: "Đã xóa",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
  });
}

const form = document.querySelector("#formadd");
const form_edit = document.querySelector("#form-edit");
const id_edit = document.querySelector("input[name=id]");
const name_edit = document.querySelector("#name_edit");
const image_edit = document.querySelector("#image_edit");

//them
form.onsubmit = async function (e) {
  e.preventDefault();
  const name = document.querySelector('[name="name"]').value;
  const image = document.querySelector('[name="image"]').value;
  let requestObj = {};
  let max;
  await axios.get(cateUrl).then((res) => {
        max = parseInt(res.data[res.data.length - 1].id) + 1;
    });
  // const price = document.querySelector('[name="price"]').value;
  requestObj = {
    name: name,
    image: image,
    id: max,
  };

  var option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestObj),
  };
  fetch(cateUrl, option)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      $("#add_new").modal("hide");
      show();
      form.reset();
    });
};

//sua thong tin danh muc
function editCate(id) {
  fetch(`${cateUrl}/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      id_edit.value = id;
      name_edit.value = data.name;
      image_edit.value = data.image;
    });
  console.log(`${cateUrl}/${id}`);
}
document.querySelector("#form-edit").addEventListener("submit", (e) => {
  e.preventDefault();
  axios
    .put(`${cateUrl}/${document.querySelector("input[name=id]").value}`, {
      image: document.querySelector("#image_edit").value,
      name: document.querySelector("#name_edit").value,
    })
    .then((res) => {
      console.log(res.data);
    })
    .then((data) => {
      $("#edit").modal("hide");
      show();
      form.reset();
    });
});
