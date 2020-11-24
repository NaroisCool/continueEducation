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
                                <img src="assets/images/s.gif" class="x-panel-inline-icon codes"><span class="x-panel-header-text">${title}</span>
                            </div>
                            <div class="box-content"> 
                                <div id="filter" class="row-fluid">
                                    <form id="export" action="action-admin-code-export?filter.isExported=0">                       
                                        <div class="filter op">
                                            <a id="query" class="btn btn-small"><i class="icon-search"></i> 查询</a> 
                                            <input type="reset" class="btn btn-small" style="display:none;" value="重置">
                                            <a id="reset" class="btn btn-small"><i class="icon-reset"></i> 重置</a>
                                        </div>
                                        <div class="filter"><span>添加年份:</span><input time="year" type="text" class="input-medium" name="filter.createYear"></div>
                                        <div class="filter"><span title="添加时间(起始)">添加起始:</span><input time="time" type="text" class="input-medium" name="filter.createTimeBegin"></div>
                                        <div class="filter"><span title="添加时间(结束)">添加结束:</span><input time="time" type="text" class="input-medium" name="filter.createTimeEnd"></div>
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
