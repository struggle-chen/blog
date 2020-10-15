// 将表单中用户输入的内容转换为对象类型
function serializeArrayObj(obj) {
    // 处理结果对象
    var result = {};
    // [{name: 'username', value: '用户输入的内容'}, {name: 'password', value: '123456'}]
    var f = obj.serializeArray();
    f.forEach(function(item) {
        result[item.name] = item.value
    })
    return result;
}