class Yazdır {

    execute(value) {

        if (
            value === undefined ||
            value === null
        ) {

            console.log(
                "Boş değer"
            );

            return;
        }

        console.log(value);
    }
}

module.exports = Yazdır;