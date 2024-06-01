
import axios from "axios";

export async function fetchPrices(one, two){
    const res = await axios.get('/api/getPrice', {
        params : {
            addressOne : one,
            addressTwo : two,
        }
    });

    console.log(res.data);
    setPrices(res.data);
}
