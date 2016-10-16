$(document).ready(function() {
    $(".button-group").click(function(e) {
        console.log(this);
        var buttonId = $(this).attr("id");
        switch (buttonId) {
            case "about-me-button":
                scrollTo($("#about-me-section"), 1000);
                break;
            case "contact-me-button":
                scrollTo($("#contact-me-section"), 1000);
                break;
            case "portfolio-button":
                scrollTo($("#portfolio-section"), 1000);
                break;
            default:
                console.error("couldn't find buttonId" + buttonId);
        }

    })

    function scrollTo(element, speed) {
        $('html, body').animate({
            scrollTop: $(element).offset().top
        }, speed)
    }

    $("#load-example").click(function() {
        var self = this;
        $(".fa-spinner").css({
            "visibility": "visible"
        });
        var jqxhr = $.ajax({
                method: "GET",
                url: "/verse"
            })
            .done(function(msg) {
                $(".output-verse").html(msg);
                $(self).text("Complete!");
            })
            .fail(function() {
                $(self).text("Failed :(");
                console.error("GET request to ourmanna failed");
            })
            .always(function() {
                $(".fa-spinner").css({
                    "visibility": "hidden"
                })
            });

        setTimeout(function() {
            $(self).text("Click Me");
        }, 3000);
    });

    $('#email-form').submit(function(formText) {
        var name = formText.target.name.value || null;
        var email = formText.target.email.value || null;
        var phone = formText.target.phone.value || null;
        var message = formText.target.message.value || null;

        if(!(!!name)){
        	// forgot name
        	$(".invalid-form").text("Please fill out name");
        	setTimeout(function(){
        		$(".invalid-form").text("");
        	}, 3000);
        }

        if(!(!!email)){

        }

        if(!(!!phone)){

        }


        if(!(!!message)){

        }

        var loadingIcon = '<i class="fa fa-spinner fa-spin fa-3x fa-fw loadingemail"></i>';
        var self = $('#send-button');
        $(self).html(loadingIcon);
        console.log("Message received from: " + name);
        console.log("Email: " + email);
        console.log("Phone Number: " + phone);
        console.log("Message: " + message);

        var jqxhr = $.ajax({
                method: "POST",
                url: "/contact",
                data: {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message
                }
            })
            .done(function(msg) {
                console.log(msg);
                $(self).html("SUCCESS!");
                formFinished(true, "Successful! E-mail sent!", self);

            })
            .fail(function(err) {
                console.error("Couldn't send e-mail");
                console.error(err);
                $(self).html("Unsuccessful...");
                formFinished(false, "Unsuccessful, please try again", self);
            })
            .always(function() {

            });




        return false; // don't refresh the page!
    });

	function formFinished(success, text, btn){
		var time = 3000,
			successColor = "green",
			failureColor = "red";
		if(success){
			$(".status-form").css({color: successColor}).text(text).fadeIn().delay(time).fadeOut();
		} else{
			$(".status-form").css({color: failureColor}).text(text).fadeIn().delay(time).fadeOut();
		}
        setTimeout(function() {
            $(btn).html("SEND");
        }, time);
	}




});