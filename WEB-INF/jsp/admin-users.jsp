<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<s:set name="atype" value="login.loginTypeName" /> 
<!DOCTYPE html>
<html lang="en">
    <head>
        <%@include file="../jspf/head.jspf" %>
        <s:if test="#atype == '系统管理员' || #atype == '运管账户'">  
            <script src="assets/js2/${action}2.js" type="text/javascript"></script>  
        </s:if>
        <s:else>
            <script src="assets/js2/${action}.js" type="text/javascript"></script>  
        </s:else>
        <script src="assets/js2/filter.js" type="text/javascript"></script>  
        <title>${title}</title>
        <style>
            [name="reserve"] {
                height:24px;
                margin-bottom: 0;
                padding: 0;
            }
            </style>
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
                                    <form id="export" action="action-admin-users-export">                           
                                        <div class="filter op">
                                            <a id="query" class="btn btn-small"><i class="icon-search"></i> 查询</a> 
                                            <input type="reset" class="btn btn-small" style="display:none;" value="重置">
                                            <a id="reset" class="btn btn-small"><i class="icon-reset"></i> 重置</a>
                                            <a id="more" class="btn btn-small"><i class="icon-more"></i> 更多</a>
                                        </div>
                                        <div class="filter"><span>学员姓名:</span><input type="text" class="input-medium" name="filter.name"></div>
                                        <div class="filter"><span>身份证号:</span><input type="text" class="input-medium" name="filter.idCard"></div>
                                        <div class="filter"><span>从业证号:</span><input type="text" class="input-medium" name="filter.ton"></div>
                                        <div class="filter moreq"><span>联系电话:</span><input type="text" class="input-medium" name="filter.tel"></div>
                                        <div class="filter"><span>培训类型:</span><input type="text" class="input-medium" name="filter.studyType"></div>
                                        <div class="filter"><span>教学类型:</span><input type="text" class="input-medium" name="filter.studyTypes"></div>
                                        <div class="filter"><span title="报名时间(起始)">报名起始:</span><input time="time" type="text" class="input-medium" name="filter.signupTimeBegin"></div>
                                        <div class="filter"><span title="报名时间(结束)">报名结束:</span><input time="time" type="text" class="input-medium" name="filter.signupTimeEnd"></div>
                                        <div class="filter"><span>所属驾校:</span><input type="text" class="input-medium" name="filter.agencyId"></div>
                                        <div class="filter"><span>班级名称:</span><input type="text" class="input-medium" name="filter.className"></div>
                                        <div class="filter"><span>网络学业:</span><input type="text" class="input-medium" name="filter.isCompleted2"></div>
                                        <div class="filter"><span>现场学业:</span><input type="text" class="input-medium" name="filter.isGraduation"></div>
                                        <div class="filter"><span>授课预约:</span><input type="text" class="input-medium" name="filter.reserveId"></div>
                                        <div class="filter"><span>是否预约1:</span><input type="text" class="input-medium" name="filter.isReserve1"></div>
                                        <div class="filter"><span>是否预约2:</span><input type="text" class="input-medium" name="filter.isReserve2"></div>
                                        <div class="filter moreq"><span>激活码:</span><input type="text" class="input-medium" name="filter.code"></div>
                                        <div class="filter moreq"><span>出生年月:</span><input time="year-month" type="text" class="input-medium" name="filter.birthday"></div>
                                        <div class="filter moreq"><span>学员性别:</span><input type="text" class="input-medium" name="filter.gender"></div>
                                        <div class="filter moreq"><span title="培训完成时间(起始)">完成起始:</span><input time="time" type="text" class="input-medium" name="filter.completedTimeBegin"></div>
                                        <div class="filter moreq"><span title="培训完成时间(结束)">完成结束:</span><input time="time" type="text" class="input-medium" name="filter.completedTimeEnd"></div>
                                        <div class="filter moreq"><span title="初次申领时间(起始)">申领起始:</span><input time="time" type="text" class="input-medium" name="filter.firstLicenseTimeBegin"></div>
                                        <div class="filter moreq"><span title="初次申领时间(结束)">申领结束:</span><input time="time" type="text" class="input-medium" name="filter.firstLicenseTimeEnd"></div>
                                        <div class="filter moreq"><span title="过期时间(起始)">过期起始:</span><input time="time" type="text" class="input-medium" name="filter.expiresTimeBegin"></div>
                                        <div class="filter moreq"><span title="过期时间(结束)">过期结束:</span><input time="time" type="text" class="input-medium" name="filter.expiresTimeEnd"></div>
                                        <div class="filter moreq"><span title="最近登陆时间(起始)">登陆起始:</span><input time="time" type="text" class="input-medium" name="filter.lastLoginTimeBegin"></div>
                                        <div class="filter moreq"><span title="最近登陆时间(结束)">登陆结束:</span><input time="time" type="text" class="input-medium" name="filter.lastLoginTimeEnd"></div>
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
