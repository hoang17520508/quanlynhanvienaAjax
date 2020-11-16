//lớp đối tượng chứa các phương thức giao tiếp với backend (api)
var NhanVienService = function () {

    this.layDanhSachNhanVien = function () {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien', //BE cung cấp
            method: 'GET' //backend cung cấp
        })
        return promise; 
    }
    this.themNhanVien = function(nv) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien', //Api backend cung cấp
            method: 'POST', //giao thức backend cung cấp
            data: nv //Dữ liệu gửi đi (lưu ý: dữ liệu gửi đi phải đúng format dữ liệu của Backend yêu cầu)
        });
        return promise;
    }

    this.xoaNhanVien = function (maNhanVien) {
        var promise = axios({
            url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=` + maNhanVien,
            method: 'DELETE',
        })
        return promise;
    }

    this.suaNhanVien = function (maNhanVien) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=' + maNhanVien,
            method: 'GET'
        });
        return promise;
    }
    this.capNhatNhanVien = function (maNhanVien,nvCapNhat) {
        var promise = axios({
            url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien='+maNhanVien,
            method:'PUT',
            data:nvCapNhat 
        })
        return promise;
    }

}