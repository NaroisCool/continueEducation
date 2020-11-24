<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <!--<script src="assets/js2/${action}.js" type="text/javascript"></script>-->  
        <title>${title}</title>
        <style>
            #result{
                text-align: center;
                padding: 40px;
            }
        </style>
    </head>
    <body>
        <%@include file="../jspf/toolbar.jspf" %>
        <div class="container-fluid">
            <div class="row-fluid">                
                <%@include file="../jspf/leftMenu-user.jspf" %>
                <div id="content" class="span10">     
                    <%@include file="../jspf/site.jspf" %>      
                    <div class="row-fluid">
                        <div class="box span12">
                            <div class="box-header well">
                                <h2> ${title}</h2>
                            </div>
                            <div class="box-content">  
                                <div id="result" class="span12">
                                    <ul class="thumbnails gallery">
                                        <li class="thumbnail">
                                            <a href="javascript:void(0);" onclick="winBox('yhxz.html', '用户须知', 540, 300);"><img src="assets/images/notice4.jpg"></a>
                                        </li>
                                        <li class="thumbnail">
                                            <a href="javascript:void(0);" onclick="winBox('czbz.html', '操作步骤', 540, 300);"><img src="assets/images/notice1.jpg"></a>
                                        </li>
                                        <li class="thumbnail">
                                            <a href="javascript:void(0);" onclick="winBox('bzys.html', '步骤演示', 540, 300);"><img src="assets/images/notice2.jpg"></a>
                                        </li>
                                        <li class="thumbnail">
                                            <a href="javascript:void(0);" onclick="winBox('cjwt.html', '常见问题', 540, 300);"><img src="assets/images/notice3.jpg"></a>
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
