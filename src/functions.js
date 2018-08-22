/**
 * Rupiah denominate
 * 
 * @author Agun Buhori <agun@buhori.com>
 * @since 2018
 */

const fractions = [100000, 50000, 20000, 10000, 5000, 1000, 500, 100, 50, 10];
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
        this.countedFractions = [];
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
     * Get parsed fractions
     * 
     * @return void
     */
    getFractions() {
        // check the fractions from max to min by loop
        for (var i = 0; i < fractions.length; i++) {
            // get rest of nominal after modulus by max fraction value
            var rest = this.nominal % fractions[i];
            // get count current fraction
            var count = (this.nominal - rest) / fractions[i];
            // if has fraction, push the fraction to counted fractions
            if (count > 0)
                this.countedFractions.push({ nominal: fractions[i], count: count });

            // change nominal value to rest
            this.nominal = rest;
        }   
    }

    /**
     * Start parsing process
     * 
     * @return array
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
                    lastNominal: this.nominal,
                    countedFractions: this.countedFractions
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