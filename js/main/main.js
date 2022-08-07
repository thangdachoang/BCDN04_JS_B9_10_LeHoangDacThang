var dsnv = new DanhSachNhanVien();

//JSON
function setLocalStorage() {
  localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
}

function getLocalStorage() {
  if (localStorage.getItem("DSNV") != undefined) {
    dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));
  }

  hieuThiNV(dsnv.mangNV);
}

getLocalStorage();

//function thêm nhân viên
function themNV() {
  var taiKhoan = document.getElementById("tknv").value;
  var hoTen = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matKhau = document.getElementById("password").value;
  var ngayLam = document.getElementById("datepicker").value;
  var luongCoBan = Number(document.getElementById("luongCB").value);
  var chucVu = document.getElementById("chucvu").value;
  var gioLamTrongThang = Number(document.getElementById("gioLam").value);

  var nv = new NhanVien(
    taiKhoan,
    hoTen,
    email,
    matKhau,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLamTrongThang
  );
  nv.tinhTongLuong();
  nv.xepLoai();

  dsnv.themNV(nv);

  hieuThiNV(dsnv.mangNV);
  setLocalStorage();

  resetForm();
}
document.getElementById("btnThemNV").onclick = themNV;

//function hiểu thị NV

function hieuThiNV(mangNV) {
  var content = "";
  mangNV.map(function (nv, index) {
    content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.loaiNhanVien}</td>
                <td>
                <button class="btn btn-info" data-toggle="modal"
                data-target="#myModal" onclick="xemChiTiet('${nv.taiKhoan}')" >Xem</button>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
                </td>
            </tr>
        
        `;
  });

  document.getElementById("tableDanhSach").innerHTML = content;
}

//Hàm xóa NV
function xoaNhanVien(taiKhoan) {
  dsnv.xoaNhanVien(taiKhoan);
  hieuThiNV(dsnv.mangNV);
  setLocalStorage();
}

// hàm xem thông tin
function xemChiTiet(taiKhoan) {
  var viTri = dsnv.timViTri(taiKhoan);
  if (viTri > -1) {
    var nvTim = dsnv.mangNV[viTri];

    document.getElementById("tknv").value = nvTim.taiKhoan;
    document.getElementById("tknv").disabled = true;
    document.getElementById("name").value = nvTim.hoTen;
    document.getElementById("email").value = nvTim.email;
    document.getElementById("password").value = nvTim.matKhau;
    document.getElementById("datepicker").value = nvTim.ngayLam;
    document.getElementById("luongCB").value = nvTim.luongCoBan;
    document.getElementById("chucvu").value = nvTim.chucVu;
    document.getElementById("gioLam").value = nvTim.gioLamTrongThang;
  }
}
//Hàm Cập nhật NV

function capNhatNV(nv) {
  var taiKhoan = document.getElementById("tknv").value;
  var hoTen = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var matKhau = document.getElementById("password").value;
  var ngayLam = document.getElementById("datepicker").value;
  var luongCoBan = Number(document.getElementById("luongCB").value);
  var chucVu = document.getElementById("chucvu").value;
  var gioLamTrongThang = Number(document.getElementById("gioLam").value);

  var nv = new NhanVien( taiKhoan,hoTen,email, matKhau, ngayLam,luongCoBan,chucVu, gioLamTrongThang );
  nv.tinhTongLuong();
  nv.xepLoai();

  dsnv.capNhatNV(nv);
  hieuThiNV(dsnv.mangNV);
  setLocalStorage();

  resetForm();
}
document.getElementById("btnCapNhat").onclick = capNhatNV;


function resetForm(){
    document.getElementById("myForm").reset();
    document.getElementById("tknv").disabled = false;
}

