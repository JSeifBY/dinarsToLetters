//Developped By JSeif ---- Ben Yedder Seifeddine
//Mail : benyedder.seifeddine@gmail.com
//Plugin Javascript pour la conversion d'un nombre decimal (En Dinars) en toute lettres

var plus, diz, s, un, mil, mil2, ent, deci, millimes, pl, conj;

var t=["","Un","Deux","Trois","Quatre","Cinq","Six","Sept","Huit","Neuf"];
var t2=["Dix","Onze","Douze","Treize","Quatorze","Quinze","Seize","Dix-sept","Dix-huit","Dix-neuf"];
var t3=["","","Vingt","Trente","Quarante","Cinquante","Soixante","Soixante","Quatre-vingt","Quatre-vingt"];





function dinarsToLetters(m){
    if(isNaN(m)){
        return "L'expression entrée n'est pas un nombre.";
    }
    return trans(m.toString());
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// traitement des deux parties du nombre;
function decint(n){

    switch(n.length){
        case 1 : return dix(n);
        case 2 : return dix(n);
        case 3 : return cent(n.charAt(0)) + " " + decint(n.substring(1));
        default: mil=n.substring(0,n.length-3);
            if(mil.length<4){
                un= (mil==1) ? "" : decint(mil);
                return un + mille(mil)+ " " + decint(n.substring(mil.length));
            }
            else{
                mil2=mil.substring(0,mil.length-3);
                return decint(mil2) + million(mil2) + " " + decint(n.substring(mil2.length));
            }
    }
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// traitement des nombres entre 0 et 99, pour chaque tranche de 3 chiffres;
function dix(n){
    if(n<10){
        return t[parseInt(n)]
    }
    else if(n>9 && n<20){
        return t2[n.charAt(1)]
    }
    else {
        plus= n.charAt(1)==0 && n.charAt(0)!=7 && n.charAt(0)!=9 ? "" : (n.charAt(1)==1 && n.charAt(0)<8) ? " et " : "-";
        diz= n.charAt(0)==7 || n.charAt(0)==9 ? t2[n.charAt(1)] : t[n.charAt(1)];
        s= n==80 ? "s" : "";

        return t3[n.charAt(0)] + s + plus + diz;
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// traitement des mots "cent", "mille" et "million"
function cent(n){
return n>1 ? t[n]+ " Cents" : (n==1) ? "Cent" : "";
}

function mille(n){
return n>1 ?" Milles" : (n==1) ? "Mille" : "";
}

function million(n){
return n>1 ?" Millions" : (n==1) ? " Million" : "";
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// conversion du nombre
function trans(n){

    // vérification de la valeur saisie
    if(!/^\d+[.,]?\d*$/.test(n)){
        return "L'expression entrée n'est pas un nombre ou un nombre négatif."
    }

    // séparation entier + décimales
    n=n.replace(/(^0+)|(\.0+$)/g,"");
    n=n.replace(/([.,]\d{3})\d+/,"$1");
    var n1 = n.replace(/[,.]\d*/, "");
    var n2 = n1 != n ? n.replace(/\d*[,.]/, "") : false;

    // variables de mise en forme
    ent= !n1 ? "" : decint(n1);
    deci= n2;

    if(deci != 0){
        while(deci / 100 <1 ){
            deci = deci * 10;
        }
    }

    if(!n1 && !n2){
        return  "Zéro"
    }
    conj= !n2 || !n1 ? "" : "  et ";
    var dinar = !n1 ? "" : !/[23456789]00$/.test(n1) ? " Dinar" : " Dinar";
    millimes= !n2 ? "" : " Millimes";
    pl=  n1>1 ? "s" : "";

    // expression complète en toutes lettres
    if(deci == 0){
        return ("" + ent + dinar + pl ).replace(/\s+/g," ").replace("cents E","cents E") ;
    }
    else{
        return ("" + ent + dinar + pl + conj + deci + millimes ).replace(/\s+/g," ").replace("cents E","cents E") ;
    }
}