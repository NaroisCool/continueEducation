<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/${action}.js" type="text/javascript"></script>  
        <script type="text/javascript">
            var code = '${arags}';
            var now = '${other}';
        </script>
        <style type="text/css">
            .table-bordered{
                border-color: rgb(245, 245, 245);
            }
            body{
                background-color:white;
                padding: 20px;
                color: #333333
            }
            .page-header{
                text-align: center;
            }
            p{
                padding-left: 20px;
            }
            p b{
                margin-right: 20px;
            }
        </style>
    </head>
    <body>
        <div class="page-header">
            <h1>学员培训记录</h1>
        </div>
        <p>
            姓名：<b id="name"></b> 身份证号码：<b id="pid"></b> 从业资格证：<b id="ton"></b>
        </p>
        <div id="result"></div>
        <%@include file="../jspf/foot.jspf" %>
    </body>
</html>
