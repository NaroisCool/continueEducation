<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/${action}.js" type="text/javascript"></script>  
        <title>${title}</title>
    </head>
    <body>
        <%@include file="../jspf/toolbar.jspf" %>
        <div class="container-fluid">
            <div class="row-fluid">                
                <%@include file="../jspf/leftMenu-admin.jspf" %>
                <div id="content" class="span10">  
                    <%@include file="../jspf/site.jspf" %>                      
                    <div class="row-fluid">
                        <div class="box span12">
                            <div class="box-header well">
                                <img src="assets/images/s.gif" class="x-panel-inline-icon house_star"><span class="x-panel-header-text">${title}</span>
                            </div>
                            <div class="box-content">  
                                <div id="result">
                                    <ul class="thumbnails gallery">
                                        <li class="thumbnail">
                                            <a href="admin-users-add"><img src="assets/images/usersadd.png"></a>
                                            <div class="well gallery-controls" style="margin-top: -1px;"><p>报名登记</p></div>
                                        </li>
                                        <li class="thumbnail">
                                            <a href="admin-users"><img src="assets/images/info.png"></a>
                                            <div class="well gallery-controls" style="margin-top: -1px;"><p>信息管理</p></div>
                                        </li>
                                        <li class="thumbnail">
                                            <a href="admin-users-query"><img src="assets/images/usertotal.png"></a>
                                            <div class="well gallery-controls" style="margin-top: -1px;"><p>入学统计</p></div>
                                        </li>
                                        <li class="thumbnail">
                                            <a href="admin-users-query-status"><img src="assets/images/status.png"></a>
                                            <div class="well gallery-controls" style="margin-top: -1px;"><p>状态查询</p></div>
                                        </li>
                                        <li class="thumbnail">
                                            <a href="javascript:void(0);" password="edit"><img src="assets/images/editpwd.png"></a>
                                            <div class="well gallery-controls" style="margin-top: -1px;"><p>密码修改</p></div>
                                        </li>
                                        <li class="thumbnail">
                                            <a href="javascript:void(0);" onclick="winBox('links.html', '友情链接', 540, 300);"><img src="assets/images/links.png"></a>
                                            <div class="well gallery-controls" style="margin-top: -1px;"><p>友情链接</p></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <%@include file="../jspf/foot.jspf" %>
    </body>
</html>
