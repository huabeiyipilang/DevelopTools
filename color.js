function Color() {
    this.mAlpha = ["0", "0"];
    this.mRed = ["f", "f"];
    this.mGreen = ["a", "a"];
    this.mBlue = ["c", "c"];
    this.setHexAlpha = function (hexAlpha) {};
    this.isHexValueValid = function (num) {
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
		if (num > 0 && num < 16) {
			res = "0" + num.toString(16);
		} else {
			res = num.toString(16);
		}
		return res;
	};
    this.setHexRed = function (red) {
        if (!this.isHexValueValid(red)) {
            return false;
        }
        this.mRed = red.split("");
        return true;
    };
    this.setDecRed = function (red) {
        if (!this.isDecValueValid(red)) {
            return false;
        }
        return this.setHexRed(this.dec2hex(red));
    };
    this.setHexGreen = function (green) {
        if (!this.isHexValueValid(green)) {
            return false;
        }
        this.mGreen = green.split("");
        return true;
    };
    this.setDecGreen = function (green) {
        if (!this.isDecValueValid(green)) {
            return false;
        }
        return this.setHexGreen(this.dec2hex(green));
    };
    this.setHexBlue = function (blue) {
        if (!this.isHexValueValid(blue)) {
            return false;
        }
        this.mBlue = blue.split("");
        return true;
    };
    this.setDecBlue = function (blue) {
        if (!this.isDecValueValid(blue)) {
            return false;
        }
        return this.setHexBlue(this.dec2hex(blue));
    };
    this.setHexColor = function (color) {
        var indexSharp = color.indexOf("#", 0);
        var colorValue;
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
	this.getDecR = function(){
		return parseInt(this.getHexR(), 16);
	};
    this.getHexG = function () {
        return this.mGreen.join("");
    };
	this.getDecG = function(){
		return parseInt(this.getHexG(), 16);
	};
    this.getHexB = function () {
        return this.mBlue.join("");
    };
	this.getDecB = function(){
		return parseInt(this.getHexB(), 16);
	}
}

var currentColor = new Color();

function onLoad() {
    res = currentColor.setHexColor("#aaddff");
    if (!res) {
        alert("Wrong value:" + value);
    }
    updateViews();
}

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