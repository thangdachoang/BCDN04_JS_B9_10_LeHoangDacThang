// khai báo lớp đối tượng nhân viên

function NhanVien(taiKhoan,hoTen,email,matKhau,ngayLam,luongCoBan,chucVu,gioLamTrongThang){

    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLamTrongThang = gioLamTrongThang;
    this.tongLuong = 0;
    this.loaiNhanVien = 0;

    this.tinhTongLuong = function (){
        if(this.chucVu=="Sếp"){
            this.tongLuong=this.luongCoBan * 3;
        }else if(this.chucVu =="Trưởng phòng"){
            this.tongLuong=this.luongCoBan * 2;
        }else if(this.chucVu == "Nhân viên")
            this.tongLuong=this.luongCoBan * 1;
    };

    this.xepLoai = function(){
        if(this.gioLamTrongThang >= 192){
            this.loaiNhanVien = "Xuất sắc";
        }else if(this.gioLamTrongThang >= 176){
            this.loaiNhanVien = "Giỏi";
        }else if(this.gioLamTrongThang >= 160){
            this.loaiNhanVien = "Khá";
        }else {
            this.loaiNhanVien = "Trung bình";
        }
    };
}