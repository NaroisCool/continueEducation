<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/${action}.js" type="text/javascript"></script>  
        <link rel="stylesheet" href="assets/flexpaper/css/flexpaper.css">      
        <script src="assets/flexpaper/js/flexpaper.js"></script>
        <script src="assets/flexpaper/js/flexpaper_handlers.js"></script>
        <title>${title}</title>
        <script>
            getname = '${other}';
        </script>
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
                                <h2 id="title"> ${title}</h2>
                            </div>
                            <div class="box-content">  
                                <div id="result" style="height: 600px;"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <%@include file="../jspf/foot.jspf" %>
    </body>
</html>
