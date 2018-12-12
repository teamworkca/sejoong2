<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
  <%@include file="../layout/content-header.jsp" %>
</head>

<body>
<div class="container-scroller">
	<!-- partial:partials/_navbar.html -->
	<%@include file="../layout/menu-header.jsp"%>
	<!-- partial -->
	<div class="container-fluid page-body-wrapper">

		<!-- Menu dọc hiển thị nội dung chính -->
		<%@include file="../layout/menu-vertical.jsp"%>
		<!-- partial -->
		<div class="main-panel">
		
				<div class="card">
                    <div class="card-body">
                      <h4 >Đổi mật khẩu</h4>
                    
                      <form class="forms-sample">
                      <div class="form-group">
                          <label for="exampleInputEmail1">Tài khoản</label>
                          <input type="text" class="form-control" id="username" placeholder="User Name" readonly="readonly">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputEmail1">Mật khẩu cũ</label>
                          <input type="password" class="form-control" id="passwordOld" placeholder="Password old">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Mật khẩu mới</label>
                          <input type="password" class="form-control" id="passwordNew" placeholder="password new">
                        </div>
                        <button type="submit" class="btn btn-success mr-2">Đổi</button>
                        <button class="btn btn-light">Hủy bỏ</button>
                      </form>
                    </div>
                  </div>
			<!-- content-wrapper ends -->
			<!-- partial:partials/_footer.html -->
			<%@include file="../layout/content-footer.jsp"%>
			

			<!-- partial -->
		</div>
		<!-- main-panel ends -->
	</div>
	<!-- page-body-wrapper ends -->
</div>

</body>

</html>



