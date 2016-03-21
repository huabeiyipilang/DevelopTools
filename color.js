function Color() {
    this.mAlpha = ["9", "9"];
    this.mRed = ["f", "f"];
    this.mGreen = ["a", "a"];
    this.mBlue = ["c", "c"];
    //判断16进制数的有效性
    this.isHexValueValid = function (num) {
        if (num.length == 1) {
            num = "0" + num;
        }
        if (num.length !== 2) {
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
    this.isDecValueValid = function (num) {
        if (isNaN(num)) {
            return false;
        }

        if (num < 0 || num > 255) {
            return false;
        }

        return true;
    };
    this.dec2hex = function (num) {
        num = parseInt(num, 10);
        var res = ""
        if (num >= 0 && num < 16) {
            res = "0" + num.toString(16);
        } else {
            res = num.toString(16);
        }
        return res;
    };
    this.transHex2Array = function (num) {
        if (num.length == 1) {
            num = "0" + num;
        }
        return num;
    };
    //设置透明度 16进制
    this.setHexAlpha = function (value) {
        if (!this.isHexValueValid(value)) {
            return false;
        }
        this.mAlpha = this.transHex2Array(value).split("");
        return true;
    };
    //设置透明度 10进制
    this.setDecAlpha = function (value) {
        if (!this.isDecValueValid(value)) {
            return false;
        }
        return this.setHexAlpha(this.dec2hex(value));
    };
    //设置透明度 百分比
    this.setAlphaPercent = function (value) {
        if (isNaN(value)) {
            return false;
        }
        value = parseInt(value);
        if (value < 0 || value > 100) {
            return false;
        }
        return this.setDecAlpha(Math.ceil(value * 255 / 100));
    };
    //获取透明度 百分比
    this.getAlphaPercent = function () {
        return parseInt(this.getDecA() * 100 / 255);
    };
    //设置红色 16进制
    this.setHexRed = function (value) {
        if (!this.isHexValueValid(value)) {
            return false;
        }
        this.mRed = this.transHex2Array(value).split("");
        return true;
    };
    //设置红色 10进制
    this.setDecRed = function (value) {
        if (!this.isDecValueValid(value)) {
            return false;
        }
        return this.setHexRed(this.dec2hex(value));
    };
    //设置绿色 16进制
    this.setHexGreen = function (value) {
        if (!this.isHexValueValid(value)) {
            return false;
        }
        this.mGreen = this.transHex2Array(value).split("");
        return true;
    };
    //设置绿色 10进制
    this.setDecGreen = function (value) {
        if (!this.isDecValueValid(value)) {
            return false;
        }
        return this.setHexGreen(this.dec2hex(value));
    };
    //设置蓝色 16进制
    this.setHexBlue = function (value) {
        if (!this.isHexValueValid(value)) {
            return false;
        }
        this.mBlue = this.transHex2Array(value).split("");
        return true;
    };
    //设置蓝色 10进制
    this.setDecBlue = function (value) {
        if (!this.isDecValueValid(value)) {
            return false;
        }
        return this.setHexBlue(this.dec2hex(value));
    };
    //设置颜色 16进制
    this.setHexColor = function (color) {
        var indexSharp = color.indexOf("#", 0);
        var colorValue, alpha, red, green, blue;
        if (indexSharp === 0) {
            colorValue = color.substring(1);
        } else {
            colorValue = color;
        }
        var res = false;
        if (colorValue.length === 6) {
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
            var alpha = colorValue.substring(0, 2);
            res = this.setHexAlpha(alpha);
            if (!res) {
                return res;
            }
            var red = colorValue.substring(2, 4);
            res = this.setHexRed(red);
            if (!res) {
                return res;
            }
            var green = colorValue.substring(4, 6);
            res = this.setHexGreen(green);
            if (!res) {
                return res;
            }
            var blue = colorValue.substring(6, 8);
            res = this.setHexBlue(blue);
            return res;
        }
        return false;
    };
    this.getHexColor = function () {
        var hexColor = "#" + this.mAlpha.join("") + this.mRed.join("") + this.mGreen.join("") + this.mBlue.join("");
        return hexColor;
    };
    this.getHexColorWithoutAlpha = function () {
        var hexColor = "#" + this.mRed.join("") + this.mGreen.join("") + this.mBlue.join("");
        return hexColor;
    };

    this.getHexA = function () {
        return this.mAlpha.join("");
    };
    this.getDecA = function () {
        return parseInt(this.getHexA(), 16);
    };
    this.getHexR = function () {
        return this.mRed.join("");
    };
    this.getDecR = function () {
        return parseInt(this.getHexR(), 16);
    };
    this.getHexG = function () {
        return this.mGreen.join("");
    };
    this.getDecG = function () {
        return parseInt(this.getHexG(), 16);
    };
    this.getHexB = function () {
        return this.mBlue.join("");
    };
    this.getDecB = function () {
        return parseInt(this.getHexB(), 16);
    }
}

var currentColor = new Color();

function onLoad() {
    res = currentColor.setHexColor("#99aaddff");
    if (!res) {
        alert("Wrong value:" + value);
    }
    updateViews();
}

function updateViews() {
    var colorDisplayView = document.getElementById("color_display");
    colorDisplayView.style.backgroundColor = currentColor.getHexColorWithoutAlpha();
    colorDisplayView.style.opacity = currentColor.getDecA() / 255;

    var colorView = document.getElementById("value_argb");
    colorView.value = currentColor.getHexColor();

    var a16View = document.getElementById("value_a_16");
    a16View.value = currentColor.getHexA();

    var a10View = document.getElementById("value_a_10");
    a10View.value = currentColor.getDecA();

    var aPercentView = document.getElementById("value_a_percent");
    aPercentView.value = currentColor.getAlphaPercent();

    var r16View = document.getElementById("value_r_16");
    r16View.value = currentColor.getHexR();

    var g16View = document.getElementById("value_g_16");
    g16View.value = currentColor.getHexG();

    var b16View = document.getElementById("value_b_16");
    b16View.value = currentColor.getHexB();

    var r10View = document.getElementById("value_r_10");
    r10View.value = currentColor.getDecR();

    var g10View = document.getElementById("value_g_10");
    g10View.value = currentColor.getDecG();

    var b10View = document.getElementById("value_b_10");
    b10View.value = currentColor.getDecB();
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
    case "value_a_16":
        value = view.value;
        res = currentColor.setHexAlpha(value);
        break;
    case "value_a_10":
        value = view.value;
        res = currentColor.setDecAlpha(value);
        break;
    case "value_a_percent":
        value = view.value;
        res = currentColor.setAlphaPercent(value);
        break;
    case "value_r_16":
        value = view.value;
        res = currentColor.setHexRed(value);
        break;
    case "value_r_10":
        value = view.value;
        res = currentColor.setDecRed(value);
        break;
    case "value_g_16":
        value = view.value;
        res = currentColor.setHexGreen(value);
        break;
    case "value_g_10":
        value = view.value;
        res = currentColor.setDecGreen(value);
        break;
    case "value_b_16":
        value = view.value;
        res = currentColor.setHexBlue(value);
        break;
    case "value_b_10":
        value = view.value;
        res = currentColor.setDecBlue(value);
        break;
    }

    if (!res) {
        alert("Wrong value:" + value);
    }
    updateViews();
}