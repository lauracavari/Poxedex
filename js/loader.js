$(document).ready(function() {
    // Aqui dentro nuestro código

    let percentage = 0;
    let deltaTime = 20;

    function simulatedLoad() {
        if ( percentage < 100 ) {
            // percentage = percentage + 1;
            percentage++;
            $(".loader-text").text(percentage + "%");
            setTimeout(simulatedLoad, deltaTime);
        } else {
            $("#loader").fadeOut(500, function() {
                $("#content").fadeIn(500);
            });
        }      
    }
    
    //Iniciar la simulación de carga en cuanto se ejecute el script
    simulatedLoad();

});