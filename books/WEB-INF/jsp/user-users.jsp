<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/${action}.js" type="text/javascript"></script>  
        <script src="assets/js2/user-viewer.js" type="text/javascript"></script>  
        <title>${title}</title>
        <style>
            .modal-body{
                max-height: none;
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
                                <div id="result" class="span6">
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
