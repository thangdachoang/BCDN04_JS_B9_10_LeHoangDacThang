var dsnv = new DanhSachNhanVien();
var Validation = new Validation();

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
  var luongCoBan = document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLamTrongThang = document.getElementById("gioLam").value;

  var isValid = true;

  //check TaiKhoan
  isValid &= Validation.checkEmpty(taiKhoan,"tbTKNV","Tài Khoản không được để trống") 
  && Validation.taiKhoanTrung(taiKhoan,"tbTKNV","Tài Khoản không đượctrùng",dsnv.mangNV) 
  && Validation.taiKhoanKyTu(taiKhoan,"tbTKNV","Tài Khoản có độ dài 4-6 ký tự");
  //check hoTen
  isValid &= Validation.checkEmpty(hoTen,"tbTen","Họ Tên không được để trống")
  && Validation.hoTen(hoTen,"tbTen","Họ Tên phải là chữ");
  //check email
  isValid &= Validation.checkEmpty(email,"tbEmail","Email không được để trống")
  && Validation.email(email,"tbEmail","Email không đúng định dạng");
  //check matkhau
  isValid &= Validation.checkEmpty(matKhau,"tbMatKhau","Mật khẩu không được để trống")
  && Validation.matKhau(matKhau,"tbMatKhau","Mật khẩu không đúng định dạng");
  //check Date
  isValid &= Validation.checkEmpty(ngayLam,"tbNgay","Ngày không được để trống")
  && Validation.dateFomats(ngayLam,"tbNgay","Ngày không đúng định dạng");
  // checkLuong
  isValid &= Validation.checkEmpty(luongCoBan,"tbLuongCB","Lương không được để trống")
  && Validation.checkLuong(luongCoBan,"tbLuongCB","Lương cở bản phải nằm trong khoảng 1 000 000 - 20 000 000");
  //checkChucVu
  isValid &= Validation.checkDropDown("chucvu","tbChucVu","Chức vụ chưa được chọn");
  //checkGioLam 
  isValid &= Validation.checkEmpty(gioLamTrongThang,"tbGiolam","Giờ làm không được để trống")
  && Validation.checkSoGioLam(gioLamTrongThang,"tbGiolam","Giờ làm phải nằm trong khoảng 80 - 200 ")


  if(isValid ){
      var nv = new NhanVien( taiKhoan,hoTen,email, matKhau, ngayLam,Number(luongCoBan),chucVu, Number(gioLamTrongThang) );
      nv.tinhTongLuong();
      nv.xepLoai();
    
      dsnv.themNV(nv);
      hieuThiNV(dsnv.mangNV);
      setLocalStorage();
      resetForm();
      console.log(dsnv.mangNV);
  }

  

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
  var luongCoBan = document.getElementById("luongCB").value;
  var chucVu = document.getElementById("chucvu").value;
  var gioLamTrongThang = document.getElementById("gioLam").value;

  var isValid = true;
    //check TaiKhoan
  isValid &= Validation.checkEmpty(taiKhoan,"tbTKNV","Tài Khoản không được để trống") 
    && Validation.taiKhoanTrung(taiKhoan,"tbTKNV","Tài Khoản không đượctrùng",dsnv.mangNV) 
    && Validation.taiKhoanKyTu(taiKhoan,"tbTKNV","Tài Khoản có độ dài 4-6 ký tự");
    //check hoTen
  isValid &= Validation.checkEmpty(hoTen,"tbTen","Họ Tên không được để trống")
    && Validation.hoTen(hoTen,"tbTen","Họ Tên phải là chữ");
    //check email
  isValid &= Validation.checkEmpty(email,"tbEmail","Email không được để trống")
    && Validation.email(email,"tbEmail","Email không đúng định dạng");
    //check matkhau
  isValid &= Validation.checkEmpty(matKhau,"tbMatKhau","Mật khẩu không được để trống")
    && Validation.matKhau(matKhau,"tbMatKhau","mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)");
    //check Date
  isValid &= Validation.checkEmpty(ngayLam,"tbNgay","Ngày không được để trống")
    && Validation.dateFomats(ngayLam,"tbNgay","Ngày không đúng định dạng");
    // checkLuong
  isValid &= Validation.checkEmpty(luongCoBan,"tbLuongCB","Lương không được để trống")
    && Validation.checkLuong(luongCoBan,"tbLuongCB","Lương cở bản phải nằm trong khoảng 1 000 000 - 20 000 000");
    //checkChucVu
  isValid &= Validation.checkDropDown("chucvu","tbChucVu","Chức vụ chưa được chọn");
    //checkGioLam 
  isValid &= Validation.checkEmpty(gioLamTrongThang,"tbGiolam","Giờ làm không được để trống")
    && Validation.checkSoGioLam(gioLamTrongThang,"tbGiolam","Giờ làm phải nằm trong khoảng 80 - 200 ")
  
  
  if(isValid ){

  var nv = new NhanVien( taiKhoan,hoTen,email, matKhau, ngayLam,Number(luongCoBan),chucVu,Number(gioLamTrongThang));
  nv.tinhTongLuong();
  nv.xepLoai();

  dsnv.capNhatNV(nv);
  hieuThiNV(dsnv.mangNV);
  setLocalStorage();

  resetForm();
  }
}
document.getElementById("btnCapNhat").onclick = capNhatNV;


function resetForm(){
    document.getElementById("myForm").reset();
    document.getElementById("tknv").disabled = false;
}

function timKiem(){
  var timKiem = document.getElementById("searchName").value;
  var mangTK = dsnv.timKiem(timKiem.trim());

  hieuThiNV(mangTK);
}
document.getElementById("btnTimNV").onclick = timKiem;
document.getElementById("searchName").onkeyup = timKiem;
