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
                                            <a id="more" class="btn btn-small"><i class="icon-more"></i> 更多</a>
                                        </div>
                                        <div class="filter"><span>身份证号:</span><input type="text" class="input-medium" name="filter.idCard"></div>
                                        <div class="filter"><span>从业证号:</span><input type="text" class="input-medium" name="filter.ton"></div>
                                        <div class="filter"><span>学员姓名:</span><input type="text" class="input-medium" name="filter.name"></div>
                                        <div class="filter"><span>联系电话:</span><input type="text" class="input-medium" name="filter.tel"></div>
                                        <div class="filter"><span>激活码:</span><input type="text" class="input-medium" name="filter.code"></div>
                                        <div class="filter"><span>添加年份:</span><input time="year" type="text" class="input-medium" name="filter.createYear"></div>
                                        <div class="filter"><span>添加驾校:</span><input type="text" class="input-medium" name="filter.agencyId"></div>
                                        <div class="filter"><span title="驾校添加年份">添加年份:</span><input time="year" type="text" class="input-medium" name="filter.agencyAddYear"></div>
                                        <div class="filter"><span>激活年份:</span><input time="year" type="text" class="input-medium" name="filter.activeYear"></div>
                                        <div class="filter moreq"><span title="激活时间(起始)">激活起始:</span><input time="time" type="text" class="input-medium" name="filter.activeTimeBegin"></div>
                                        <div class="filter moreq"><span title="激活时间(结束)">激活结束:</span><input time="time" type="text" class="input-medium" name="filter.activeTimeEnd"></div>
                                        <div class="filter moreq"><span title="添加时间(起始)">添加起始:</span><input time="time" type="text" class="input-medium" name="filter.createTimeBegin"></div>
                                        <div class="filter moreq"><span title="添加时间(结束)">添加结束:</span><input time="time" type="text" class="input-medium" name="filter.createTimeEnd"></div>
                                        <div class="filter moreq"><span title="驾校添加时间(起始)">驾校起始:</span><input time="time" type="text" class="input-medium" name="filter.agencyAddTimeBegin"></div>
                                        <div class="filter moreq"><span title="驾校添加时间(结束)">驾校结束:</span><input time="time" type="text" class="input-medium" name="filter.agencyAddTimeEnd"></div>
                                        <div class="filter moreq"><span title="过期时间(起始)">过期起始:</span><input time="time" type="text" class="input-medium" name="filter.expiresTimeBegin"></div>
                                        <div class="filter moreq"><span title="过期时间(结束)">过期结束:</span><input time="time" type="text" class="input-medium" name="filter.expiresTimeEnd"></div>
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
