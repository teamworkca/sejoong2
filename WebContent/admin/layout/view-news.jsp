<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@page import="java.util.ArrayList"%>

<%@page import="java.util.logging.Level"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.util.HashMap"%>
<%@page import="org.json.JSONException"%>
<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONArray"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="com.tuvi.utils.DBConnection"%>
<%@page import="com.tuvi.utils.DBUtil"%>
<%@page import="com.tuvi.dao.AdminAccount"%>
<div class="row">
		<div class="col-12 grid-margin">
			<div class="card">
				<div class="card-body">
					<h5 class="card-title mb-4">Danh sách quản lý</h5>
					<div class="fluid-container">
						<!--------------------------------------------------------------------------------- -->
						<%
							try {
								ArrayList<AdminAccount> list = (ArrayList<AdminAccount>) DBUtil
										.queryAdminAccount(DBConnection.getMySQLConnection());
								if (list.size() > 0) {
									for (AdminAccount adminAccount : list) {
										try {
										%>
										
						<div class="row ticket-card mt-3 pb-2 border-bottom pb-3 mb-3">
							<div class="col-md-1">
								<img class="img-sm rounded-circle mb-4 mb-md-0"
									src="images/faces/face1.jpg" alt="profile image">
							</div>
							<div class="ticket-details col-md-9">
								<div class="d-flex">
									<p class="text-dark font-weight-semibold mr-2 mb-0 no-wrap"><% out.println(adminAccount.getUserName().toString()); %>:</p>
									<p class="text-primary mr-1 mb-0">[<%if(adminAccount.getPermission()==1) out.print("Admin"); else out.print("Editor"); %>]</p>
									<p class="mb-0 ellipsis">Quản trị viên</p>
								</div>
								<p class="text-gray ellipsis mb-2">Ghi chú</p>
								<div class="row text-gray d-md-flex d-none">
									<div class="col-4 d-flex">
										<small class="mb-0 mr-2 text-muted text-muted">Thời
											gian đăng nhập cuối:</small> <small
											class="Last-responded mr-2 mb-0 text-muted text-muted">3
											giờ trước</small>
									</div>
									<div class="col-4 d-flex">
										<small class="mb-0 mr-2 text-muted text-muted">Thời
											gian tạo :</small> <small
											class="Last-responded mr-2 mb-0 text-muted text-muted">01/12/2018</small>
									</div>
								</div>
							</div>
							<div class="ticket-actions col-md-2">
								<div class="btn-group dropdown">
									<button type="button"
										class="btn btn-success dropdown-toggle btn-sm"
										data-toggle="dropdown" aria-haspopup="true"
										aria-expanded="false" >Tùy chọn</button>
									<div class="dropdown-menu">
										<a class="dropdown-item" href="${pageContext.request.contextPath}/CRUDAdmin?id=<%out.print(adminAccount.getUserId());%>&type=edit-info"> <i
											class="fa fa-reply fa-fw"></i>Sửa thông tin
										</a> <a class="dropdown-item" href="${pageContext.request.contextPath}/CRUDAdmin?id=<%out.print(adminAccount.getUserId());%>&type=edit-password"> <i
											class="fa fa-history fa-fw"></i>Đổi mật khẩu
										</a>
										<div class="dropdown-divider"></div>
										<a class="dropdown-item" href="${pageContext.request.contextPath}/CRUDAdmin?id=<%out.print(adminAccount.getUserId());%>&type=edit-delete" style="color: red;"> <i
											class="fa fa-times text-danger fa-fw"></i>Xóa tài khoản
										</a>
									</div>
								</div>
							</div>
						</div>
<% 
										
											System.out.println(adminAccount.getUserId());
											System.out.println(adminAccount.getUserName());
											System.out.println(adminAccount.getPassword());
											System.out.println(adminAccount.getPermission());
											
										} catch (Exception e) {
											// TODO Auto-generated catch block
											e.printStackTrace();
											continue;
										}
										// out.print(json.toString());
									}
								}
							} catch (ClassNotFoundException | SQLException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
								out.print(-1);
							}
						%>
						<!--------------------------------------------------------------------------------  -->
						

					</div>
				</div>
			</div>
		</div>
	</div>