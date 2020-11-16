
var NhanVien = function (maNV,tenNV,cv,hsCV,lCB,gioLam){

    this.maNhanVien=maNV;
    this.tenNhanVien=tenNV;
    this.chucVu=cv;
    this.heSoChucVu=hsCV;
    this.luongCoBan=lCB;
    this.soGioLamTrongThang=gioLam;
    this.tinhTongLuong=function(){
        if(Number(this.heSoChucVu)===1)
        {
            return Number(this.luongCoBan);
        }
        if(Number(this.heSoChucVu)===2)
        {
            return Number(this.luongCoBan)*2;
        }
        if(Number(this.heSoChucVu)===3)
        {
            return Number(this.luongCoBan)*3;
        }
    }
    this.xepLoaiNhanVien=function(){
        if(Number(this.soGioLamTrongThang)>=50&&Number(this.soGioLamTrongThang)<=80)
        {
            return ' Nhân viên trung bình';
        }
        if(Number(this.soGioLamTrongThang)>80&&Number(this.soGioLamTrongThang)<=100)
        { 
            return ' Nhân viên khá';

        }
        if(Number(this.soGioLamTrongThang)>100&&Number(this.soGioLamTrongThangg)<=120)
        {
            return ' Nhân viên giỏi';
        }
        if(Number(this.soGioLamTrongThang)>=120)
        {
            return ' Nhân viên xuất sắc';
        }
        else{
            return' Không xác định';
        }
    }
}
