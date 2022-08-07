

function DanhSachNhanVien(){
    this.mangNV = [];

    //phương thức
    //them NV
    this.themNV = function(nv){
        this.mangNV.push(nv);
    };

    // Tim1 vi tri 
    this.timViTri = function(taiKhoan){
        var viTri = -1;
        this.mangNV.map(function(nv, index){
            if(nv.taiKhoan === taiKhoan){
                viTri = index;
            }
        });
        return viTri;
    };

    //xoa NV
    this.xoaNhanVien = function(taiKhoan){
        var viTri = this.timViTri(taiKhoan);
        if(viTri >-1){
            this.mangNV.splice(viTri, 1);
        }
    };

    //cap nhat NV
    this.capNhatNV =  function(nv){
        var viTri = this.timViTri(nv.taiKhoan);
        if(viTri >-1){
            dsnv.mangNV[viTri]= nv;
        }
    }
}