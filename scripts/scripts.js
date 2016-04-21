/* hepl-mmi/meet-jquery
 *
 * /scripts/scripts.js - Main scripts (with jquery)
 *
 * coded by leny@flatLand!
 * started at 23/02/2016
 */

( function() {

    "use strict";

    var fTabLinkIsClicked,
        fFormIsSubmitted,
        $tabLinks,
        $tabPanes;// COntient tous les panels

    fFormIsSubmitted = function( oEvent ) {
        var $self = $( this ),
            sGivenEmail,
            sGivenName,
            sGivenComment,
            bAllIsOk = true,
            rCheckEmail = /^[a-z0-9-_\.]+@[a-z0-9-_\.]+\.[a-z]{2,3}$/i,
            sControlGroupe;

        // --- TODO: remove all .error from .control-group //Débloque la condition qu'il faut que ce soit bien rempli pour envoyer
        $( ".control-group" ) //Selection de la class="control-groups"
            //.filter( ".error" ) 
                .removeClass( "error" );

        // 1. email should be an email
        sGivenEmail = $self.find( "input[name=\"email\"]" ).val().trim();
        if ( rCheckEmail.test( sGivenEmail ) === false ) {
             //on affiche l'erreur a cote
            $self.find( "input[name=\"email\"]" ).parents(".control-group").addClass( "error" ); // TODO: add .error to email .control-group
            //parents = remonte 
            bAllIsOk = false;
        }

        // 2. name isn't empty
        sGivenName = $self.find( "input[name=\"name\"]" ).val().trim();
        if ( sGivenName === "" ) {
            // TODO: add .error to name .control-group
            $self.find( "input[name=\"name\"]" ).parents(" .control-group").addClass( "error" );
            bAllIsOk = false;
        }

        // 3. comment isn't empty and <= 140 chars
        sGivenComment = $self.find( "textarea[name=\"comment\"]" ).val().trim();
        if ( sGivenComment === "" || sGivenComment.length > 140 ) {
             // TODO: add .error to comment .control-group
            $self.find( "textarea[name=\"comment\"]" ).parents(" .control-group").addClass( "error" );
            bAllIsOk = false;
        }

        return bAllIsOk;
    };
    // FOnction quand toute la page est chargée, Fct Principale de Jquery
    fTabLinkIsClicked = function( oEvent ) {
        var $self = $( this );

        oEvent.preventDefault();

        // 0. do nothing if current link is already active
        if ( $self.parent().hasClass( "active" ) ) {
            return;
        }

        // 1. remove active class on pane
        // 2. get target pane
        // 3. add active class on target pane
        $tabPanes // all tab panes
            .filter( ".active" ) // only the .active class
                .removeClass( "active" )
                .end()              // tabPanes  Seulement avec ID active
            .filter( "#" + $self.data( "tab-target" ) ) // only one with target id
                .addClass( "active" );

        // 4. remove active class from link
        // 5. add active class on current link
        $tabLinks
            .parent()
                .filter( ".active" )
                    .removeClass( "active" )
                    .end()
                .has( $self )
                    .addClass( "active" );
    };

    $( function() { // Lancera la fct quand la page sera completement chargée


        // external
        $( "a[rel=\"external\"]" ).attr( "target", "_new" ); // Affiche nos liens récupérer dans un nvl onglet, plutot qu'une fenetre

        // tabs
        $tabPanes = $( ".tab-pane" ); // Reprends les el qui on tab-pane (onglet)
                                                // Récupere les liens et contenu des onglets
        ( $tabLinks = $( ".nav-tabs li a" ) ).on( "click", fTabLinkIsClicked );

    // Changer le texte au clique

        $( ".page-header h1 small" ).on( "click", function() {
            $( this ).html( "Un blog en <strong>mousse</strong>" );
        } );

    //Cacher toutes les img et qd on click sur h3 on voit la 1ere img

        $( "#trombino" )
            .find( "figure" ) // Trouve tt les img
                .hide() //Et les caches
                .first() //Selectione la 1ere figure
                    .fadeIn( 2500 ) //Et l'afficher avec animation (duree animation/slow !! MIEUX EN CSS
                    .end()
                .end()
            .find( "h3" )
                .on( "click", function() {
                    $( "#trombino figure:first" )
                        .css( "position", "relative" )
                        .animate( {
                            "left": -250
                        }, 2500 );
                } );

    // Verification de notre formulaire coté client au submit - Mieux que de require
        $( "form" ).on( "submit", fFormIsSubmitted );

    } );

} )();
