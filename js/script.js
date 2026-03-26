$(document).ready(function () {
    let $pokeCont = $("#pokeCont");

    $(document).on("allPokemonLoaded", function () {
        $pokeCont.isotope({
            itemSelector: ".pokemon",
            layoutMode: "fitRows",
            getSortData: {
                name: ".card-title",
                number: ".pokemon-number parseInt",
            },
        });
    });

    $(".btns-cont .filter").on("click", function () {
        let filterVal = $(this).data("filter");
        $pokeCont.isotope({
            filter: filterVal,
        });
    });

    $(".btns-cont .sort").on("click", function () {
        let sortVal = $(this).data("sortby");
        $pokeCont.isotope({
            sortBy: sortVal,
        });
    });
});
