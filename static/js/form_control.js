function passwordControl() {
    $("#password_confirm, #password").on('focus', function () {
        $(".password-info").show();
    });
    $("#password_confirm, #password").on('focusout', function () {
        $(".password-info").hide();
    });

    $("#password_confirm, #password").on('keyup', function () {
        var pass1 = $("#password").val();
        var pass2 = $("#password_confirm").val();
        if (pass1 !== pass2 && pass2 !== "") {
            $(".pwd-match-alert").show();
        } else {
            $(".pwd-match-alert").hide();
        }
    })
}

function usernameControl() {
    $("#username").on('focus', function () {

        $(".username-info").show();

    });
    $("#username").on('focusout', function () {

        $(".username-info").hide();

    })
}

$(document).ready(function () {
    passwordControl();
    usernameControl();
});

// pattern
