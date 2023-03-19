var socket;
var token;
$(document).ready(function() {
    token = localStorage.getItem("token");
    let payload = {
        body: JSON.stringify({
            token: token,
        }),
        method: "post",
        headers: {
            "content-type": "application/json",
        },
    };
    fetch("/checkToken", payload)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.message == false) {
                window.location.href = "/signIn.html";
            }
        });
});

function changeMode(id) {
    $(".modeSetter").each(function() {
        if ($(this).attr("id") == id) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function hexToRGB(color) {
    color = color.slice(1);
    let aRgbHex = color.match(/.{1,2}/g); //parse hex to RGB
    console.log(aRgbHex);
    let aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16),
    ];
    return aRgb
}

function solidColor() {
    let color = $("input#solidColorPicker").val();
    let aRgb = hexToRGB(color)
    let payload = {
        body: JSON.stringify({
            token: localStorage.getItem("token"),
            data: aRgb,
        }),
        method: "post",
        headers: {
            "content-type": "application/json",
        },
    };

    fetch("/solidColor", payload)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.message == false) {
                window.location.href = "/signIn.html";
            }
        });

    console.log(aRgb);
}

function switchColor() {
    let color1 = $("input#color1").val()
    let color1RGB = hexToRGB(color1)
    let color2 = $('input#color2').val()
    let color2RGB = hexToRGB(color2)

    let payload = {
        body: JSON.stringify({
            token: localStorage.getItem("token"),
            color1: color1RGB,
            color2: color2RGB
        }),
        method: "post",
        headers: {
            "content-type": "application/json",
        },
    }

    fetch("/switchColors", payload)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            if (res.message == false) {
                window.location.href = "/signIn.html";
            }
        });
}

function startRainbow() {
    let payload = {
        body: JSON.stringify({
            token: localStorage.getItem("token"),
        }),
        method: "post",
        headers: {
            "content-type": "application/json",
        },
    }
    fetch("/rainbow", payload)
        .then((res) => res.json)
        .then((res) => {
            console.log(res)
            if (res.message == false) {
                window.location.href = "/signIn.html";
            }
        })
}