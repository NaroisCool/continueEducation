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
                                        <div class="filter"><span>学员姓名:</span><input type="text" class="input-medium" name="filter.name"></div>
                                        <div class="filter"><span>身份证号:</span><input type="text" class="input-medium" name="filter.idCard"></div>
                                        <div class="filter"><span>从业证号:</span><input type="text" class="input-medium" name="filter.ton"></div>
                                        <div class="filter"><span>联系电话:</span><input type="text" class="input-medium" name="filter.tel"></div>
                                        <div class="filter"><span>培训类型:</span><input type="text" class="input-medium" name="filter.studyType"></div>
                                        <div class="filter"><span>教学类型:</span><input type="text" class="input-medium" name="filter.studyTypes"></div>
                                        <div class="filter"><span>班级名称:</span><input type="text" class="input-medium" name="filter.className"></div>
                                        <div class="filter"><span>预约时间</span><input time="time" type="text" class="input-medium" name="filter.reserveTime"></div>
                                        <div class="filter"><span title="报名时间(起始)">报名起始:</span><input time="time" type="text" class="input-medium" name="filter.signupTimeBegin"></div>
                                        <div class="filter"><span title="报名时间(结束)">报名结束:</span><input time="time" type="text" class="input-medium" name="filter.signupTimeEnd"></div>
                                        <div class="filter"><span>所属驾校:</span><input type="text" class="input-medium" name="filter.agencyId"></div>
                                        <div class="filter"><span>现场学业:</span><input type="text" class="input-medium" name="filter.isGraduation"></div>
                                        <div class="filter"><span>网络学业:</span><input type="text" class="input-medium" name="filter.isCompleted2"></div>
                                        <div class="filter"><span>是否结业:</span><input type="text" class="input-medium" name="filter.isCompleted"></div>
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
