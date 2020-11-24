<%-- 
    Document   : all
    Created on : 2013-11-20, 14:54:56
    Author     : shaopei
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<s:set name="id" value="other" /> 
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>证件打印</title> 
        <script>
            var n = 1;
            function prt() {
                n--;
                if (n == 0) {
                    window.print();
                }
            }
        </script>
    </head>
    <body>
        <!--<iframe src="admin-prints-reg?id=${id}&other=all" height="1130" width="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"  onload="prt();">-->
        <iframe src="admin-prints-ret?id=${id}&other=all" height="1130" width="100%" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no"  onload="prt();">
    </body>
</html>
