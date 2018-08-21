/**
 * Rupiah denominate
 * 
 * @author Agun Buhori <agun@buhori.com>
 * @since 2018
 */

const fractions = [50, 100, 500, 1000, 5000, 10000, 20000, 50000, 100000];
const validCurrencyPattern = /^(Rp)?( )?((\d{1,3}){1}((\.\d{3})+(\,00)?)|\d+)$/;
const currencyCharsPattern = /[Rp\. ]+/g;

class FractionParser {
    /**
     * Class constructor
     * 
     * @param string nominal 
     */
    constructor(nominal) {
        this.nominal = nominal;
        this.selectedFractions = [];
        this.leftFraction = 0;
    }

    /**
     * Validate nominal input by currency format
     * 
     * @return bool
     */
    validateCurrency() {
        return this.nominal.match(validCurrencyPattern);
    }

    /**
     * Convert currency format to decimal
     * 
     * @return void
     */
    removeCurrencyChars() {
        this.nominal = parseInt(this.nominal.replace(currencyCharsPattern, ""));
    }

    /**
     * Count same fraction
     * 
     * @return array
     */
    countSameFraction() {
        var selectedFractions = this.selectedFractions;
        var countedArray = [];

        // Filter same array function
        function filterArrayUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        // Merge same array value by filter
        var arrayUnique = selectedFractions.filter(filterArrayUnique);

        // loop for matching arrays
        for (var i = 0; i < arrayUnique.length; i++) {
            // the default number of arrays in a unique array item is 0
            countedArray[i] = {nominal: arrayUnique[i], count: 0};

            for (var j = 0; j < selectedFractions.length; j++)
                // add 1 if one array of fractions is in a unique array
                if (arrayUnique[i] === selectedFractions[j])
                    countedArray[i].count++;
        }


        return countedArray;
                    
    }

    /**
     * Get parsed fractions
     * 
     * @return array
     */
    getFractions() {
        // the repetition position is set based on the number of fractions
        var loop = fractions.length;
        var maxFraction = fractions[loop-1];

        while (loop > 0)
            // if the last nominal value is still higher than the biggest value fraction, 
            if (this.nominal >= maxFraction) {
                // reduce nominal and enter the biggest value fraction in the selected fraction list
                this.nominal -= maxFraction;
                // and the loop will always be in the biggest value fractional position
                this.selectedFractions.push(maxFraction);

            // if the nominal is smaller than the biggest value fraction, 
            } else {
                // reduce the loop position to the smaller
                loop--;
                // then move the position of the biggest fraction to the smaller, 
                maxFraction = fractions[loop-1];
            }
    }

    /**
     * Start parsing process
     * 
     * @return void
     */
    doParse() {
        // if currency is valid format, clean currency and do parsing
        if (this.validateCurrency()) {
            this.removeCurrencyChars();
            this.getFractions();

            // return parsed result
            return {
                status: 'success',
                data: {
                    selectedFractions: this.selectedFractions, 
                    leftFraction: this.nominal,
                    countedFraction: this.countSameFraction()
                }
            }
        }
        
        // return error status if input format is invalid
        return {
            status: 'failed'
        }
    }
}

export function parseFractions(nominal) {
    var fractionParser = new FractionParser(nominal);
    return fractionParser.doParse();
}