class Matematik {

    topla(a,b){

        if(
            isNaN(a) ||
            isNaN(b)
        ){

            throw new Error(
                "Toplama işlemi yalnızca sayısal değerler ile gerçekleştirilebilir."
            );
        }

        return a + b;
    }

    cikar(a,b){

        if(
            isNaN(a) ||
            isNaN(b)
        ){

            throw new Error(
                "Çıkarma işlemi yalnızca sayısal değerler ile gerçekleştirilebilir."
            );
        }

        return a - b;
    }

    carp(a,b){

        if(
            isNaN(a) ||
            isNaN(b)
        ){

            throw new Error(
                "Çarpma işlemi yalnızca sayısal değerler ile gerçekleştirilebilir."
            );
        }

        return a * b;
    }

    bol(a,b){

        if(
            isNaN(a) ||
            isNaN(b)
        ){

            throw new Error(
                "Bölme işlemi yalnızca sayısal değerler ile gerçekleştirilebilir."
            );
        }

        if(
            b === 0
        ){

            throw new Error(
                "Bir sayı sıfıra bölünemez."
            );
        }

        return a / b;
    }

    kok(a){

        if(
            isNaN(a)
        ){

            throw new Error(
                "Karekök işlemi yalnızca sayısal değerler ile gerçekleştirilebilir."
            );
        }

        if(
            a < 0
        ){

            throw new Error(
                "Negatif sayıların karekökü gerçek sayılar kümesinde tanımlı değildir."
            );
        }

        return Math.sqrt(a);
    }
}

module.exports =
Matematik;