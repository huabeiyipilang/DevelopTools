function Color() {
    this.mAlpha = ["0", "0"];
    this.mRed = ["f", "f"];
    this.mGreen = ["a", "a"];
    this.mBlue = ["c", "c"];
    this.setHexAlpha = function (hexAlpha) {};
    this.isHexValue = function (num) {
        if (num.length != 2) {
            return false;
        }

        var num1 = num.charAt(0);
        var value1 = parseInt(num1, 16);
        if (value1 < 0 || value1 > 16) {
            return false;
        }
        if (isNaN(value1)) {
            return false;
        }

        var num2 = num.charAt(1);
        var value2 = parseInt(num2, 16);
        if (value2 < 0 || value2 > 16) {
            return false;
        }
        if (isNaN(value2)) {
            return false;
        }

        return true;
    };
    this.setHexRed = function (red) {
        if (!this.isHexValue(red)) {
            return false;
        }
        this.mRed = red.split("");
        return true;
    };
    this.setHexGreen = function (green) {
        if (!this.isHexValue(green)) {
            return false;
        }
        this.mGreen = green.split("");
        return true;
    };
    this.setHexBlue = function (blue) {
        if (!this.isHexValue(blue)) {
            return false;
        }
        this.mBlue = blue.split("");
        return true;
    };
    this.setHexColor = function (color) {
        var indexSharp = color.indexOf("#", 0);
        var colorValue;
        if (indexSharp == 0) {
            colorValue = color.substring(1);
        } else {
            colorValue = color;
        }
        var res = false;
        if (colorValue.length == 6) {
            var red = colorValue.substring(0, 2);
            res = this.setHexRed(red);
            if (!res) {
                return res;
            }
            var green = colorValue.substring(2, 4);
            res = this.setHexGreen(green);
            if (!res) {
                return res;
            }
            var blue = colorValue.substring(4, 6);
            res = this.setHexBlue(blue);
            return res;
        } else if (colorValue.length == 8) {
            return true;
        }
        return false;
    };
    this.getHexColor = function () {
        var hexColor = "#" + this.mRed.join("") + this.mGreen.join("") + this.mBlue.join("");
        return hexColor;
    };
    this.getHexR = function () {
        return this.mRed.join("");
    };
    this.getHexG = function () {
        return this.mGreen.join("");
    };
    this.getHexB = function () {
        return this.mBlue.join("");
    };
}

var currentColor = new Color();

function updateViews() {
    var colorDisplayView = document.getElementById("color_display");
    colorDisplayView.style.backgroundColor = currentColor.getHexColor();

    var colorView = document.getElementById("value_argb");
    colorView.value = currentColor.getHexColor();

    var r16View = document.getElementById("value_r_16");
    r16View.value = currentColor.getHexR();

    var g16View = document.getElementById("value_g_16");
    g16View.value = currentColor.getHexG();

    var b16View = document.getElementById("value_b_16");
    b16View.value = currentColor.getHexB();

    var r10View = document.getElementById("value_r_10");
    r10View.value = parseInt(currentColor.getHexR(), 16);

    var g10View = document.getElementById("value_g_10");
    g10View.value = parseInt(currentColor.getHexG(), 16);

    var b10View = document.getElementById("value_b_10");
    b10View.value = parseInt(currentColor.getHexB(), 16);
}

function onLoad() {
    res = currentColor.setHexColor("#aaddff");
    if (!res) {
        alert("Wrong value:" + value);
    }
    updateViews();
}

function isFullColorHex() {}

function isColorHex(color) {

}


function onValueChanged(view) {
    var res = false;
    var value = "";
    switch (view.id) {
    case "value_argb":
        value = view.value;
        res = currentColor.setHexColor(value);
        break;
    case "value_r_16":
        value = view.value;
        res = currentColor.setHexRed(value);
        break;
    case "value_r_10":
        break;
    case "value_g_16":
        value = view.value;
        res = currentColor.setHexGreen(value);
        break;
    case "value_g_10":
        break;
    case "value_b_16":
        value = view.value;
        res = currentColor.setHexBlue(value);
        break;
    case "value_b_10":
        break;
    case "":
        break;
    case "":
        break;
    case "":
        break;
    case "":
        break;
    case "":
        break;
    case "":
        break;
    }

    if (!res) {
        alert("Wrong value:" + value);
    }
    updateViews();
}