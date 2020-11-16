//Kết nối dữ liệu backend dựa vào thư viện axios

var nvService = new NhanVienService();
var layDanhSachNhanVienVienApi = function () {

    var promise = nvService.layDanhSachNhanVien(); //Gọi đến backend lấy data

    //Xử lý cho trường hợp gọi thành công
    promise.then(function (result) {
        console.log('Kết quả', result.data);
        //Lấy dữ liệu server trả về gọi hàm tạo table
        renderTable(result.data)
    });

    //Xử lý cho trường hợp thất bại
    promise.catch(function (error) {
        console.log(error);
    })


}
var renderTable = function (arrNV) {
    //Từ mảng sinh viên tạo ra 1 chuỗi html nhiều thẻ tr dựa vào vòng lặp
    var noiDungTable = '';
    for (var index = 0; index < arrNV.length; index++) {
        //Mỗi lần lặp lấy ra 1 đối tượng sinhVien
        var nhanVien = arrNV[index];
        var nv= new NhanVien();
        nv.maNhanVien=nhanVien.maNhanVien;
        nv.tenNhanVien=nhanVien.tenNhanVien;
        nv.chucVu=nhanVien.chucVu;
        nv.heSoChucVu=nhanVien.heSoChucVu;
        nv.luongCoBan=nhanVien.luongCoBan;
        nv.soGioLamTrongThang=nhanVien.soGioLamTrongThang;
        console.log(nv);
        
        //Tạo ra 1 chuỗi + dồn vào nội dung <tr></tr>
        noiDungTable += `
                <tr>
                    <td>${nv.maNhanVien}</td>
                    <td>${nv.tenNhanVien}</td>
                    <td>${nv.chucVu}</td>
                    <td>${nv.luongCoBan}</td>
                    <td>${nv.tinhTongLuong()}</td>
                    <td>${nv.soGioLamTrongThang}</td>
                    <td>${nv.xepLoaiNhanVien()}</td>
                    <td><button class="btn btn-danger" onclick="xoaNhanVien('${nv.maNhanVien}')">Xóa</button></td>
                    <td><button class="btn btn-primary" onclick="chinhSua('${nv.maNhanVien}')">Chỉnh sửa</button></td>
                </tr>            
        `;  
    }
  
    document.querySelector('#tableNhanVien').innerHTML = noiDungTable;
}  

layDanhSachNhanVienVienApi();
var validate = new Validation();
document.querySelector('#btnXacNhan').onclick = function () {
    //Tạo ra đối tượng sinh viên chứa thông tin người dùng nhập vào từ giao diện
    var nv = new NhanVien()
    nv.maNhanVien=document.querySelector('#maNhanVien').value;
   nv.tenNhanVien= document.querySelector('#tenNhanVien').value;
   
   var tagChucVu = document.getElementById('chucVu');
    //Lấy ra mảng các thẻ option trong thẻ select
    var arrOption = tagChucVu.options;
    //Lấy thẻ option được chọn 
   nv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;
   nv.heSoChucVu= document.querySelector('#chucVu').value;
   nv.luongCoBan=document.querySelector('#luongCoBan').value;
   nv.soGioLamTrongThang=document.querySelector('#soGioLamTrongThang').value;

   var valid = true;
    //Kiểm tra rổng
    valid &= validate.kiemTraRong( nv.maNhanVien, 'Mã Nhân viên', '.kiemTraRong-maNhanVien') & validate.kiemTraRong(nv.tenNhanVien, 'Tên Nhân Viên', '.kiemTraRong-tenNhanVien') & validate.kiemTraRong(nv.luongCoBan, 'Lương Cơ Bản', '.kiemTraRong-luongCoBan') & validate.kiemTraRong( nv.soGioLamTrongThang, 'Giờ Làm Trong Tháng', '.kiemTraRong-soGioLamTrongThang') ;

    //Kiểm tra định dạng 
    //kiểm tra định dạng
    valid &= validate.kiemTraTatCaLaSo(nv.maNhanVien, 'Mã Nhân viên', '.kiemTraDinhDang-maNhanVien') & validate.kiemTraTatCaLaSo(nv.luongCoBan, 'Lương Cơ Bản ','.kiemTraDinhDang-luongCoBan') & validate.kiemTraTatCaLaSo(nv.soGioLamTrongThang, 'Số Giờ Làm Trong Tháng', '.kiemTraDinhDang-soGioLamTrongThang') ;
    valid &= validate.kiemTraTatCaKyTu(nv.tenNhanVien, 'Tên Nhân viên', '.kiemTraDinhDang-tenNhanVien');
    

   




    //Kiểm tra giá trị
    valid &= validate.kiemTraGiaTri(nv.luongCoBan, 'Lương Cơ Bản', '.kiemTraGiaTri-luongCoBan', 1000000, 20000000) & validate.kiemTraGiaTri(nv.soGioLamTrongThang, 'Giờ làm trong tháng', '.kiemTraGiaTri-soGioLamTrongThang', 50, 150) ;
    

    //Kiểm tra độ dài 
   
    valid &= validate.kiemTraDoDaiChuoi(nv.maNhanVien, 'Mã Nhân Viên', '.kiemTraDoDaiChuoi-maNhanVien', 4, 6);

    if (!valid) {
        return;
    }
    var promise = nvService.themNhanVien(nv);

    //Hàm thực thi khi gọi ajax thành công
    promise.then(function (result) {
        console.log(result.data);

        // location.reload();
        //Gọi phương thức lấy thông tin sinh viên tạo lại table mới
      layDanhSachNhanVienVienApi();
    });

    //Hàm thực thi khi lỗi xảy ra
    promise.catch(function (error) {
        console.log(error.response.data);
    })
    

    
   
   

}



var xoaNhanVien= function(maNV){
    var promise = nvService.xoaNhanVien(maNV);
     //Hàm xử lý thành công
     promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVienVienApi();
    })
    //Hàm xử lý thất bại
    promise.catch(function (error) {
        console.log(error.response.data);
    })
 ///kiểm tra hợp lệ
 
    
     
 }
 var chinhSua = function (maNV) {
    
    var promise=nvService.suaNhanVien(maNV);

      promise.then(function (result) {
        var nv = result.data;
        //Gán dữ liệu server trả về lên giao diện người dùng nhập thông tin
        document.querySelector('#maNhanVien').value = nv.maNhanVien;
        document.querySelector('#tenNhanVien').value = nv.tenNhanVien;
        document.querySelector('#luongCoBan').value = nv.luongCoBan
        document.querySelector('#soGioLamTrongThang').value = nv.soGioLamTrongThang;
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    });
   


}



//cap nhat thong tin
document.querySelector('#btnLuuThongTin').onclick = function () {

    //Lấy thông tin người dùng sau khi thay đổi gán vào đối tượng sinhVien
    var nv = new NhanVien()
    nv.maNhanVien=document.querySelector('#maNhanVien').value;
    nv.tenNhanVien= document.querySelector('#tenNhanVien').value;
   nv.luongCoBan=document.querySelector('#luongCoBan').value;
   var tagChucVu = document.getElementById('chucVu');
    //Lấy ra mảng các thẻ option trong thẻ select
    var arrOption = tagChucVu.options;
    //Lấy thẻ option được chọn 
   nv.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;
   nv.heSoChucVu= document.querySelector('#chucVu').value;
   nv.soGioLamTrongThang=document.querySelector('#soGioLamTrongThang').value;
   var valid = true;
    //Kiểm tra rổng
    valid &= validate.kiemTraRong( nv.maNhanVien, 'Mã Nhân viên', '.kiemTraRong-maNhanVien') & validate.kiemTraRong(nv.tenNhanVien, 'Tên Nhân Viên', '.kiemTraRong-tenNhanVien') & validate.kiemTraRong(nv.luongCoBan, 'Lương Cơ Bản', '.kiemTraRong-luongCoBan') & validate.kiemTraRong( nv.soGioLamTrongThang, 'Giờ Làm Trong Tháng', '.kiemTraRong-soGioLamTrongThang') ;

    //Kiểm tra định dạng 
    //kiểm tra định dạng
    valid &= validate.kiemTraTatCaLaSo(nv.maNhanVien, 'Mã Nhân viên', '.kiemTraDinhDang-maNhanVien') & validate.kiemTraTatCaLaSo(nv.luongCoBan, 'Lương Cơ Bản ','.kiemTraDinhDang-luongCoBan') & validate.kiemTraTatCaLaSo(nv.soGioLamTrongThang, 'Số Giờ Làm Trong Tháng', '.kiemTraDinhDang-soGioLamTrongThang') ;
    valid &= validate.kiemTraTatCaKyTu(nv.tenNhanVien, 'Tên Nhân viên', '.kiemTraDinhDang-tenNhanVien');
    

   




    //Kiểm tra giá trị
    valid &= validate.kiemTraGiaTri(nv.luongCoBan, 'Lương Cơ Bản', '.kiemTraGiaTri-luongCoBan', 1000000, 20000000) & validate.kiemTraGiaTri(nv.gioLamTrongThang, 'Giờ làm trong tháng', '.kiemTraGiaTri-soGioLamTrongThang', 50, 150) ;
    

    //Kiểm tra độ dài 
   
    valid &= validate.kiemTraDoDaiChuoi(nv.maNhanVien, 'Mã Nhân Viên', '.kiemTraDoDaiChuoi-maNhanVien', 4, 6);

    if (!valid) {
        return;
    }


    //Tìm trong mangSinhVien đối tượng cùng mã => cập lại giá trị
    
    var promise= nvService.capNhatNhanVien(nv.maNhanVien,nv);

    promise.then(function(result) {
        console.log(result.data);
        layDanhSachNhanVienVienApi();
    });


    promise.catch(function(error) {
        console.log(error.response.data);
    })
 
}