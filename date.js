function onDateValueChanged(view) {
    var value = view.value;
    var dateDisplay = document.getElementById("date_display");
    if (isNaN(value)) {
        dateDisplay.innerHTML = "请检测格式";
    } else {
        dateDisplay.innerHTML = getLocalTime(value);
    }
}

function getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

function onDateLoad() {
    var time_mili = Date.parse(new Date());
    var dateView = document.getElementById("date_input");
    console.log("time_mili:", time_mili);
    dateView.value = time_mili;
    onDateValueChanged(dateView);
}