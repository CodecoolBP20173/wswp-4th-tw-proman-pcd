function formControl() {
    $("#password_confirm, #password").on('keyup', function () {
        var pass1 = $("#password").val();
        var pass2 = $("#password_confirm").val();
        if (pass1 !== pass2 && pass2 !== "") {
            $(".pwd-match-alert").show();
        } else {
            $(".pwd-match-alert").hide();
        }
    })
};

$(document).ready(function () {
    formControl();
});

// pattern
