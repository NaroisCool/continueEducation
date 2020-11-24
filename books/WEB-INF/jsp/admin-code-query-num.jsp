<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <script src="assets/js2/${action}.js" type="text/javascript"></script>  
        <script src="assets/js2/filter.js" type="text/javascript"></script>  
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
                                <div id="filter" class="row-fluid">
                                    <form id="export" action="action-admin-user-export">                           
                                        <div class="filter op">
                                            <a id="query" class="btn btn-small"><i class="icon-search"></i> 查询</a> 
                                            <input type="reset" class="btn btn-small" style="display:none;" value="重置">
                                            <a id="reset" class="btn btn-small"><i class="icon-reset"></i> 重置</a>
                                        </div>
                                       <div class="filter"><span>是否导出:</span><input type="text" class="input-medium" name="filter.isExported"></div>
                                        <div class="filter"><span title="导出时间(起始)">导出起始:</span><input time="time" type="text" class="input-medium" name="filter.exportTimeBegin"></div>
                                        <div class="filter"><span title="导出时间(结束)">导出结束:</span><input time="time" type="text" class="input-medium" name="filter.exportTimeEnd"></div>
                                    </form>
                                </div>  
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
