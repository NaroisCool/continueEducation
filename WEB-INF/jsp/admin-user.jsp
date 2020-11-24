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
                                <img src="assets/images/s.gif" class="x-panel-inline-icon users"><span class="x-panel-header-text">${title}</span>
                            </div>
                            <div class="box-content"> 
                                <!--                                <div class="alert alert-info">
                                                                    <h4 class="alert-heading">注意！</h4>
                                                                    添加用户指定的<b>激活码</b>不可修改，谨慎操作
                                                                </div>-->
                                <div id="result"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <%@include file="../jspf/foot.jspf" %>
    </body>
</html>
